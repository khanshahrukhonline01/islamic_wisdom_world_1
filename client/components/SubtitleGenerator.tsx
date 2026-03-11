import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SubtitleService,
  VideoProcessingService,
  type SubtitleSegment,
} from "@/lib/subtitle-services";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import {
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle,
  Download,
  Edit2,
  X,
} from "lucide-react";

export function SubtitleGenerator() {
  const { currentLanguage } = useLanguage();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [targetLanguages, setTargetLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [subtitles, setSubtitles] = useState<SubtitleSegment[]>([]);
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [videoMetadata, setVideoMetadata] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Validate video format
    if (!VideoProcessingService.canPlayVideo(file)) {
      setError("Unsupported video format. Please use MP4, WebM, or OGG.");
      return;
    }

    // Check file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      setError("File size exceeds 500MB limit.");
      return;
    }

    setVideoFile(file);

    // Get video metadata
    try {
      const metadata = await VideoProcessingService.getVideoMetadata(file);
      setVideoMetadata(metadata);
      setPreviewUrl(URL.createObjectURL(file));
    } catch (err) {
      setError("Failed to read video metadata");
    }
  };

  const handleGenerateSubtitles = async () => {
    if (!videoFile) {
      setError("Please select a video file");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await SubtitleService.generateSubtitles({
        videoFile,
        language: selectedLanguage,
        targetLanguages,
      });

      setSubtitles(response.segments);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate subtitles"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditSegment = (segmentId: string, newText: string) => {
    setSubtitles(
      subtitles.map((seg) =>
        seg.id === segmentId ? { ...seg, text: newText } : seg
      )
    );
    setEditingSegment(null);
  };

  const handleDeleteSegment = (segmentId: string) => {
    setSubtitles(subtitles.filter((seg) => seg.id !== segmentId));
  };

  const handleExport = (format: "srt" | "vtt") => {
    if (subtitles.length === 0) return;

    const track = {
      id: "generated",
      language: selectedLanguage,
      segments: subtitles,
      sourceLanguage: selectedLanguage,
      duration: videoMetadata?.duration || 0,
    };

    const content =
      format === "srt"
        ? SubtitleService.exportSRT(track)
        : SubtitleService.exportVTT(track);

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subtitles.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Video Upload Section - Mobile Optimized */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 sm:p-6 space-y-4">
        <h3 className="font-semibold text-foreground text-base sm:text-lg">
          📹 Upload Video
        </h3>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-primary/30 rounded-lg p-6 sm:p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="space-y-3">
            <Upload className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-primary/60" />
            <div>
              <p className="font-medium text-foreground text-sm sm:text-base">
                Tap to select video
              </p>
              <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                MP4, WebM, OGG (max 500MB)
              </p>
            </div>
          </div>
        </div>

        {/* Selected File Info */}
        {videoFile && (
          <div className="bg-white border border-primary/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm truncate">
                  {videoFile.name}
                </p>
                <p className="text-xs text-foreground/60 mt-1">
                  {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            </div>
            {videoMetadata && (
              <p className="text-xs text-foreground/60">
                Duration: {formatTime(videoMetadata.duration)}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Language Settings - Mobile Optimized */}
      {videoFile && (
        <div className="bg-white border border-primary/10 rounded-xl p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-foreground text-base sm:text-lg">
            🌐 Language Settings
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground/70 mb-2 block">
                Source Language
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.slice(0, 15).map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/70 mb-2 block">
                Additional Languages (Optional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.slice(0, 6).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setTargetLanguages(
                        targetLanguages.includes(lang.code)
                          ? targetLanguages.filter((l) => l !== lang.code)
                          : [...targetLanguages, lang.code]
                      );
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      targetLanguages.includes(lang.code)
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-foreground hover:bg-primary/20"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Generate Button */}
      {videoFile && !subtitles.length && (
        <Button
          onClick={handleGenerateSubtitles}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3 sm:py-4 font-semibold flex items-center justify-center gap-2 text-base sm:text-lg"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>✨</span>
          )}
          {loading ? "Generating..." : "Generate Subtitles"}
        </Button>
      )}

      {/* Subtitles Preview - Mobile Optimized */}
      {subtitles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">
              📝 Subtitles ({subtitles.length})
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport("srt")}
                className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                Download SRT
              </button>
              <button
                onClick={() => handleExport("vtt")}
                className="px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-xs font-medium hover:bg-secondary/20 transition-colors"
              >
                Download VTT
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {subtitles.map((segment) => (
              <div
                key={segment.id}
                className="bg-white border border-primary/10 rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-foreground/60">
                    {formatTime(segment.startTime)} → {formatTime(segment.endTime)}
                  </span>
                  <div className="flex gap-2">
                    {editingSegment !== segment.id && (
                      <>
                        <button
                          onClick={() => setEditingSegment(segment.id)}
                          className="p-1.5 hover:bg-primary/10 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDeleteSegment(segment.id)}
                          className="p-1.5 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {editingSegment === segment.id ? (
                  <div className="space-y-2">
                    <textarea
                      defaultValue={segment.text}
                      onBlur={(e) =>
                        handleEditSegment(segment.id, e.target.value)
                      }
                      autoFocus
                      className="w-full p-2 border border-primary/20 rounded text-sm resize-none"
                      rows={3}
                    />
                    <button
                      onClick={() => setEditingSegment(null)}
                      className="text-xs font-medium text-primary hover:text-primary/80"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <p className="text-foreground text-sm leading-relaxed">
                    {segment.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Reset Button */}
          <Button
            onClick={() => {
              setSubtitles([]);
              setVideoFile(null);
              setPreviewUrl("");
            }}
            variant="outline"
            className="w-full border-primary/30 hover:bg-primary/5 py-3"
          >
            Generate New Subtitles
          </Button>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
        <p className="font-semibold text-blue-900">💡 How it works:</p>
        <ol className="list-decimal list-inside space-y-1 text-blue-800 text-xs sm:text-sm">
          <li>Upload your video file</li>
          <li>Select the source language</li>
          <li>Optionally choose target languages</li>
          <li>Generate subtitles automatically</li>
          <li>Edit and export as SRT or VTT format</li>
        </ol>
      </div>
    </div>
  );
}

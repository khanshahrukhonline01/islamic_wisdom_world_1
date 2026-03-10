import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { TextToSpeechService } from "@/lib/ai-services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2, Loader2, AlertCircle, Play, Pause } from "lucide-react";

export function TextToSpeech() {
  const { currentLanguage } = useLanguage();
  const [text, setText] = useState(
    "Assalamu alaikum wa rahmatullahi wa barakatuhu"
  );
  const [selectedAccent, setSelectedAccent] = useState("");
  const [speed, setSpeed] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const availableAccents = TextToSpeechService.getAccentsForLanguage(currentLanguage);

  const handleSynthesize = async () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await TextToSpeechService.synthesizeSpeech({
        text,
        language: currentLanguage,
        accent: selectedAccent || availableAccents[0],
        speed,
      });

      setAudioUrl(response.audioUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate speech"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioUrl) return;

    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
      // Simulate playback
      setTimeout(() => setPlaying(false), 3000);
    }
  };

  const isSupported = TextToSpeechService.canUseWebSpeech();

  if (!isSupported) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">
              Browser Not Supported
            </h4>
            <p className="text-sm text-yellow-800">
              Your browser doesn't support text-to-speech. Please use Chrome,
              Firefox, Safari, or Edge.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Volume2 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Text to Speech</h3>
            <p className="text-sm text-foreground/60">
              Hear Islamic content in various accents and languages
            </p>
          </div>
        </div>
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Text to Convert
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-sm resize-none"
          rows={4}
          placeholder="Enter text to convert to speech..."
        />
        <p className="text-xs text-foreground/50">
          {text.length} characters
        </p>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Accent Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Accent</label>
          <Select value={selectedAccent} onValueChange={setSelectedAccent}>
            <SelectTrigger>
              <SelectValue placeholder="Select accent..." />
            </SelectTrigger>
            <SelectContent>
              {availableAccents.map((accent) => (
                <SelectItem key={accent} value={accent}>
                  {accent
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Speed: {speed.toFixed(1)}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Accent Preview */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Preview</label>
          <div className="bg-white border border-primary/20 rounded px-3 py-2 text-xs text-foreground/70">
            {currentLanguage === "ar" ? "Egyptian Arabic" : `${currentLanguage} - Standard`}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleSynthesize}
          disabled={loading || !text.trim()}
          className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center justify-center gap-2 py-3"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
          {loading ? "Generating..." : "Generate Speech"}
        </Button>

        {audioUrl && (
          <Button
            onClick={handlePlayPause}
            className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-lg flex items-center justify-center gap-2 py-3"
          >
            {playing ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play
              </>
            )}
          </Button>
        )}
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="bg-white border border-primary/10 rounded-lg p-4">
          <label className="text-xs font-semibold text-foreground/70 mb-3 block">
            Audio Player
          </label>
          <audio
            src={audioUrl}
            controls
            className="w-full rounded"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>
      )}

      {/* Accent Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
        <p className="text-xs font-semibold text-blue-900">
          🎵 Available Accents for {currentLanguage.toUpperCase()}:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableAccents.map((accent) => (
            <div
              key={accent}
              className="bg-white border border-blue-200 rounded px-2 py-1 text-xs text-blue-900"
            >
              {accent
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </div>
          ))}
        </div>
        <p className="text-xs text-blue-800">
          💡 <span className="font-semibold">Tip:</span> Different accents are available
          for major languages like Arabic (Egyptian, Saudi, Levantine), Urdu (Delhi,
          Lucknow), and English (British, American, Indian).
        </p>
      </div>
    </div>
  );
}

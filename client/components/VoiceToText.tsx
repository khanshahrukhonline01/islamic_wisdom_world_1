import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { VoiceToTextService } from "@/lib/ai-services";
import { Mic, Square, Loader2, AlertCircle } from "lucide-react";

export function VoiceToText() {
  const { currentLanguage } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tajweedSuggestions, setTajweedSuggestions] = useState<string[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartRecording = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setLoading(true);
        try {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });

          const result = await VoiceToTextService.transcribeAudio({
            audioBlob,
            language: currentLanguage,
          });

          setTranscribedText(result.text);
          if (result.tajweedSuggestions) {
            setTajweedSuggestions(result.tajweedSuggestions);
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to transcribe audio"
          );
        } finally {
          setLoading(false);
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to access microphone. Please check permissions."
      );
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleClear = () => {
    setTranscribedText("");
    setTajweedSuggestions([]);
    setError("");
  };

  const isSupported = VoiceToTextService.canUseWebSpeech();

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
              Your browser doesn't support speech recognition. Please use Chrome,
              Edge, or Safari.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Recording Controls */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              Voice to Text
            </h3>
            <p className="text-sm text-foreground/60">
              Speak in {currentLanguage === "ar" ? "Arabic" : "your language"} to
              transcribe
            </p>
          </div>
          {isRecording && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-red-600">Recording...</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {!isRecording ? (
            <Button
              onClick={handleStartRecording}
              disabled={loading}
              className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
              {loading ? "Processing..." : "Start Recording"}
            </Button>
          ) : (
            <Button
              onClick={handleStopRecording}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center justify-center gap-2 py-3"
            >
              <Square className="w-4 h-4" />
              Stop Recording
            </Button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Transcribed Text */}
      {transcribedText && (
        <div className="space-y-4">
          <div className="bg-white border border-primary/10 rounded-lg p-4">
            <label className="text-xs font-semibold text-foreground/70 mb-2 block">
              Transcribed Text
            </label>
            <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">
              {transcribedText}
            </p>
          </div>

          {/* Tajweed Suggestions */}
          {tajweedSuggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <label className="text-xs font-semibold text-blue-900 mb-3 block">
                💡 Tajweed Suggestions for Quran Recitation
              </label>
              <ul className="space-y-2">
                {tajweedSuggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-blue-900 flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleClear}
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/5 rounded-lg py-2"
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(transcribedText);
              }}
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/5 rounded-lg py-2"
            >
              Copy Text
            </Button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <p className="text-xs text-foreground/70">
          🎤 <span className="font-semibold">Tip:</span> For best results, speak clearly
          and ensure your microphone is working properly. For Quran recitation, this tool
          provides tajweed guidance based on your pronunciation.
        </p>
      </div>
    </div>
  );
}

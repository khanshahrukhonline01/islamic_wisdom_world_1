import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChatbotService, type ChatMessage } from "@/lib/ai-services";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2, MessageCircle } from "lucide-react";

export function TranslationChatbot() {
  const { currentLanguage } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [assistantLanguage, setAssistantLanguage] =
    useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await ChatbotService.sendMessage(
        input,
        currentLanguage,
        assistantLanguage
      );

      // Add both user and assistant messages
      setMessages([...messages, {
        id: `msg-${Date.now()}-user`,
        sender: "user",
        originalText: input,
        sourceLanguage: currentLanguage,
        targetLanguage: assistantLanguage,
        timestamp: new Date(),
        type: "question",
      }, response]);

      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageName = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    return lang?.name || code;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-primary/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-primary/10 p-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Islamic Knowledge Assistant</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="text-xs font-medium text-foreground/60 mb-1 block">
              Ask in {getLanguageName(currentLanguage)}
            </label>
            <div className="bg-white border border-primary/20 rounded px-3 py-1 text-sm text-foreground/70">
              {getLanguageName(currentLanguage)}
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-foreground/60 mb-1 block">
              Response Language
            </label>
            <Select value={assistantLanguage} onValueChange={setAssistantLanguage}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.slice(0, 10).map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="w-12 h-12 text-primary/20 mb-4" />
            <p className="text-foreground/60 font-medium mb-2">
              Ask a question about Islam
            </p>
            <p className="text-sm text-foreground/40 max-w-xs">
              Ask in your preferred language, and the assistant will respond in your chosen language.
              All responses are based on authentic Islamic sources.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-primary/10 text-foreground rounded-bl-none border border-primary/20"
                  }`}
                >
                  <p className="text-sm break-words">
                    {message.sender === "user"
                      ? message.originalText
                      : message.translatedText || message.originalText}
                  </p>
                  {message.type === "fatwa" && message.sender === "assistant" && (
                    <p className="text-xs mt-2 opacity-70">
                      💡 Based on Islamic sources
                    </p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-primary/10 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask your question..."
            className="flex-1 px-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            disabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 h-auto flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-foreground/50 mt-2">
          💬 All responses are moderated and verified against authentic Islamic sources
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
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
  getContent,
  getAvailableLanguages,
  getAvailableDialects,
  LocalizedContent as LocalizedContentType,
} from "@/lib/content";
import { SUPPORTED_LANGUAGES } from "@/lib/languages";
import { Globe } from "lucide-react";

interface LocalizedContentProps {
  contentId: string;
  contentType: "quran" | "hadith" | "lecture";
  showLanguageSwitcher?: boolean;
}

export function LocalizedContent({
  contentId,
  contentType,
  showLanguageSwitcher = true,
}: LocalizedContentProps) {
  const { currentLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [selectedDialect, setSelectedDialect] = useState<string>("");

  // Get content with selected language and dialect
  const content = getContent(contentId, selectedLanguage, selectedDialect);
  const availableLanguages = getAvailableLanguages(contentId);
  const availableDialects = getAvailableDialects(contentId, selectedLanguage);

  // Get language names for display
  const getLanguageName = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    return lang ? `${lang.name}` : code;
  };

  if (!content) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Content not found for selected language.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Language & Dialect Selector */}
      {showLanguageSwitcher && availableLanguages.length > 1 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Globe className="w-4 h-4 text-primary" />
            Available Languages & Dialects
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/70">
                Select Language
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {getLanguageName(lang)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dialect Selector */}
            {availableDialects.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/70">
                  Select Dialect (Optional)
                </label>
                <Select value={selectedDialect} onValueChange={setSelectedDialect}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={`${getLanguageName(selectedLanguage)} (Standard)`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">
                      {getLanguageName(selectedLanguage)} (Standard)
                    </SelectItem>
                    {availableDialects.map((dialect) => {
                      const dialectName = dialect
                        .split("-")
                        .map((part) => {
                          const lang = SUPPORTED_LANGUAGES.find((l) =>
                            l.code.includes(part)
                          );
                          return lang ? lang.name : part;
                        })
                        .join(" ");
                      return (
                        <SelectItem key={dialect} value={dialect}>
                          {dialectName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Language Badges */}
          <div className="flex flex-wrap gap-2">
            {availableLanguages.map((lang) => (
              <Button
                key={lang}
                variant={selectedLanguage === lang ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang)}
                className={`rounded-full ${
                  selectedLanguage === lang
                    ? "bg-primary text-white"
                    : "border-primary/20"
                }`}
              >
                {getLanguageName(lang)}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Content Display */}
      <div className="space-y-4 bg-white border border-primary/10 rounded-lg p-6">
        {/* Metadata */}
        <div className="space-y-2 pb-4 border-b border-primary/10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {content.title}
          </h2>
          <p className="text-foreground/70">{content.description}</p>
          {content.author && (
            <p className="text-sm text-foreground/60">
              <span className="font-semibold">Author:</span> {content.author}
            </p>
          )}
          {content.source && (
            <p className="text-sm text-foreground/60">
              <span className="font-semibold">Source:</span> {content.source}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="prose prose-sm max-w-none">
          <p className="text-base leading-relaxed text-foreground/80 whitespace-pre-wrap">
            {content.content}
          </p>
        </div>

        {/* Language Info */}
        <div className="mt-6 pt-4 border-t border-primary/10">
          <p className="text-sm text-foreground/60">
            Currently viewing in{" "}
            <span className="font-semibold text-foreground">
              {getLanguageName(selectedLanguage)}
            </span>
            {selectedDialect && (
              <>
                {" "}
                <span className="text-foreground/60">({selectedDialect})</span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* Educational Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          💡 <span className="font-semibold">Tip:</span> Switch between different
          languages and dialects to experience the content in your preferred language.
          Click the language badges above or use the dropdown selectors.
        </p>
      </div>
    </div>
  );
}

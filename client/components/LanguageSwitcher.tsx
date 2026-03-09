import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, supportedLanguages, t } = useLanguage();

  const currentLang = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-foreground hover:bg-primary/10"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-medium">
            {currentLang?.nativeName || currentLang?.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="max-h-96 overflow-y-auto w-56"
      >
        {supportedLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              currentLanguage === lang.code
                ? "bg-primary/10 text-primary font-semibold"
                : ""
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{lang.name}</span>
              <span className="text-xs text-foreground/60">{lang.nativeName}</span>
              {lang.region && (
                <span className="text-xs text-foreground/40">{lang.region}</span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

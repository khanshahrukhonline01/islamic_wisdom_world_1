import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocalizedContent } from "@/components/LocalizedContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";

export default function LearnContentPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const navigationLinks = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.sermons", href: "/sermons" },
    { labelKey: "nav.learn", href: "/learn" },
    { labelKey: "nav.community", href: "/community" },
    { labelKey: "nav.contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline">
                Islamic Preach
              </span>
            </Link>

            <nav className="hidden md:flex gap-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <Button className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-6">
                {t("nav.getStarted")}
              </Button>

              <button
                className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-primary" />
                ) : (
                  <Menu className="w-6 h-6 text-primary" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-foreground hover:text-primary transition-colors py-2 text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full mt-2">
                {t("nav.getStarted")}
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Explore Islamic Content
              </h1>
            </div>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Read Quranic verses, Hadiths, and lectures in your preferred language.
              Switch between different languages and dialects seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Quran Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Quran</h2>
                <p className="text-foreground/60">
                  Read the Holy Quran in your language
                </p>
              </div>
            </div>
            <LocalizedContent contentId="surah-yasin" contentType="quran" />
          </div>

          {/* Hadith Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Hadith</h2>
                <p className="text-foreground/60">
                  Learn from authentic sayings of the Prophet
                </p>
              </div>
            </div>
            <LocalizedContent contentId="hadith-charity" contentType="hadith" />
          </div>

          {/* Lecture Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Lectures</h2>
                <p className="text-foreground/60">
                  Explore in-depth lectures on Islamic topics
                </p>
              </div>
            </div>
            <LocalizedContent contentId="lecture-islam-science" contentType="lecture" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Localization Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                20+ Languages
              </h3>
              <p className="text-foreground/70">
                Read content in Arabic, English, Hindi, Urdu, Bengali, and more
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Dialect Variants
              </h3>
              <p className="text-foreground/70">
                Choose between Indian Urdu, Pakistani Urdu, and other regional variants
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Per-Section Switching
              </h3>
              <p className="text-foreground/70">
                Switch languages for each piece of content independently
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Explore More?
          </h2>
          <p className="text-lg text-foreground/70">
            Return to the main learning section to access even more content and features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 py-6 text-base font-semibold w-full sm:w-auto">
                Back to Learning
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border-primary/30 hover:bg-primary/5 w-full sm:w-auto"
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-sm">✨</span>
                </div>
                <span className="font-bold">Islamic Preach</span>
              </div>
              <p className="text-white/70 text-sm">{t("footer.aboutUs")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/sermons" className="hover:text-white transition-colors">
                    {t("nav.sermons")}
                  </Link>
                </li>
                <li>
                  <Link to="/learn" className="hover:text-white transition-colors">
                    {t("nav.learn")}
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="hover:text-white transition-colors">
                    {t("nav.community")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    {t("nav.contact")}
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.privacy")}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    {t("footer.terms")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.followUs")}</h4>
              <div className="flex gap-4 text-sm text-white/70">
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-sm text-white/60">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

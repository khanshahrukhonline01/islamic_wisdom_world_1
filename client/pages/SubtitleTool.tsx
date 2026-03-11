import { Link, useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SubtitleGenerator } from "@/components/SubtitleGenerator";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Film } from "lucide-react";

export default function SubtitleTool() {
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
      {/* Mobile-First Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-primary/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Touch Friendly */}
            <Link to="/" className="flex items-center gap-2 min-w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <span className="font-bold text-primary hidden sm:inline text-base">
                Islamic Preach
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 lg:gap-8">
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

            {/* Right Controls - Touch Friendly */}
            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher />

              <Button className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-6 text-sm">
                {t("nav.getStarted")}
              </Button>

              {/* Mobile Menu Button - Large Touch Target */}
              <button
                className="md:hidden p-2.5 hover:bg-primary/10 rounded-lg transition-colors"
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

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-3 border-t border-primary/10 mt-4 pt-4">
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
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full mt-2 py-2 text-sm">
                {t("nav.getStarted")}
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className={`space-y-3 sm:space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="flex items-center gap-2 sm:gap-3">
              <Film className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground">
                Smart Subtitle Generator
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-foreground/70 max-w-2xl">
              Generate, edit, and export subtitles in multiple languages instantly.
              Perfect for creating accessible Islamic content.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Mobile First Layout */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Features Grid - Mobile Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">
                Fast Processing
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm">
                Generate subtitles in seconds using advanced AI technology
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">🌐</div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">
                20+ Languages
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm">
                Translate subtitles to any language automatically
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">✏️</div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">
                Easy Editing
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm">
                Edit each subtitle segment and fix timing manually
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">💾</div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">
                Multiple Formats
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm">
                Export as SRT, VTT, or other subtitle formats
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">
                Mobile Friendly
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm">
                Works seamlessly on phones, tablets, and desktop
              </p>
            </div>

            <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl mb-3">♿</div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">
                Accessibility
              </h3>
              <p className="text-foreground/60 text-xs sm:text-sm">
                Make your content accessible to deaf and hard of hearing
              </p>
            </div>
          </div>

          {/* Subtitle Generator Component */}
          <div className="bg-white border border-primary/10 rounded-xl p-4 sm:p-6 lg:p-8">
            <SubtitleGenerator />
          </div>

          {/* Help Section - Mobile Optimized */}
          <div className="mt-8 sm:mt-12 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              FAQ
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <details className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-primary/20 transition-colors">
                <summary className="font-semibold text-foreground text-sm sm:text-base">
                  What video formats are supported?
                </summary>
                <p className="mt-3 text-foreground/70 text-xs sm:text-sm">
                  We support MP4, WebM, and OGG formats. Files up to 500MB are accepted.
                </p>
              </details>

              <details className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-primary/20 transition-colors">
                <summary className="font-semibold text-foreground text-sm sm:text-base">
                  How accurate are the generated subtitles?
                </summary>
                <p className="mt-3 text-foreground/70 text-xs sm:text-sm">
                  Our AI model achieves 95%+ accuracy. You can easily edit any mistakes
                  after generation.
                </p>
              </details>

              <details className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-primary/20 transition-colors">
                <summary className="font-semibold text-foreground text-sm sm:text-base">
                  Can I download the subtitles?
                </summary>
                <p className="mt-3 text-foreground/70 text-xs sm:text-sm">
                  Yes! Export your subtitles as SRT (SubRip) or VTT (WebVTT) format for use
                  in any video player or platform.
                </p>
              </details>

              <details className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 cursor-pointer hover:border-primary/20 transition-colors">
                <summary className="font-semibold text-foreground text-sm sm:text-base">
                  Is my video data private?
                </summary>
                <p className="mt-3 text-foreground/70 text-xs sm:text-sm">
                  Yes, your video files are processed securely and never stored on our
                  servers. They are deleted after processing.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-primary/5">
        <div className={`max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Make Your Content Accessible
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-foreground/70">
            Reach a wider audience by adding subtitles to your Islamic videos and
            lectures.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2">
            <Link to="/ai-tools">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-sm sm:text-base">
                Explore More AI Tools
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-semibold text-sm sm:text-base border-primary/30 hover:bg-primary/5"
              >
                Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-foreground/95 text-white py-8 sm:py-12 lg:py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-8 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-foreground font-bold text-sm">✨</span>
                </div>
                <span className="font-bold">Islamic Preach</span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">{t("footer.aboutUs")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/70">
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t("footer.support")}</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-white/70">
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">{t("footer.followUs")}</h4>
              <div className="flex gap-3 text-xs sm:text-sm text-white/70">
                <a href="#" className="hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <p className="text-center text-xs sm:text-sm text-white/60">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

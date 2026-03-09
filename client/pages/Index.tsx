import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  Heart,
  Users,
  Lightbulb,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: BookOpen,
      titleKey: "features.quran.title",
      descKey: "features.quran.desc",
    },
    {
      icon: Users,
      titleKey: "features.community.title",
      descKey: "features.community.desc",
    },
    {
      icon: Heart,
      titleKey: "features.growth.title",
      descKey: "features.growth.desc",
    },
    {
      icon: Lightbulb,
      titleKey: "features.knowledge.title",
      descKey: "features.knowledge.desc",
    },
  ];

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
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline">
                Islamic Preach
              </span>
            </Link>

            {/* Desktop Navigation */}
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

            {/* CTA Button, Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              <Button className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-6">
                {t("nav.getStarted")}
              </Button>

              {/* Mobile Menu Button */}
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

          {/* Mobile Navigation */}
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
      <section className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-32" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -ml-32" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {t("hero.welcome")}
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight">
                  {t("hero.title").split(" ").map((word, idx) => {
                    // Highlight the last word with gradient
                    if (idx === t("hero.title").split(" ").length - 1) {
                      return (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                        >
                          {" "}
                          {word}
                        </span>
                      );
                    }
                    return <span key={idx}>{word} </span>;
                  })}
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  {t("hero.subtitle")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 py-6 text-base font-semibold flex items-center gap-2">
                  {t("hero.startLearning")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold border-primary/20 hover:bg-primary/5"
                >
                  {t("hero.exploreCommittee")}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-foreground/60">{t("stats.learners")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-foreground/60">{t("stats.teachings")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-foreground/60">{t("stats.support")}</div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 sm:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📖</div>
                  <p className="text-lg font-semibold text-foreground">
                    {t("hero.welcome")}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {t("mission.authenticDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center space-y-4 mb-16 ${isRTL ? "text-right" : "text-left"}`}>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              {t("whyChoose.title")}
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              {t("whyChoose.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.titleKey}
                  className="group bg-white p-8 rounded-2xl border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-lg mb-4 group-hover:from-primary/30 group-hover:to-secondary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Preview Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {/* Content */}
            <div className="space-y-6">
              <div>
                <div className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {t("mission.title")}
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {t("mission.title")}
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {t("mission.subtitle")}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t("mission.authentic")}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {t("mission.authenticDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t("mission.instructors")}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {t("mission.instructorsDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t("mission.practical")}
                    </h3>
                    <p className="text-sm text-foreground/60">
                      {t("mission.practicalDesc")}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 py-6 text-base font-semibold flex items-center gap-2 w-fit">
                {t("mission.learnMore")}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Visual */}
            <div className="relative h-96 sm:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/10 rounded-3xl" />
              <div className="absolute inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl border border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🕌</div>
                  <p className="text-lg font-semibold text-foreground">
                    {t("features.community.title")}
                  </p>
                  <p className="text-sm text-foreground/60">
                    {t("features.community.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 py-6 text-base font-semibold flex items-center gap-2 justify-center">
              {t("cta.getStartedNow")}
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-semibold border-primary/30 hover:bg-primary/5"
            >
              {t("cta.scheduleDemo")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 ${isRTL ? "text-right" : "text-left"}`}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-sm">✨</span>
                </div>
                <span className="font-bold">Islamic Preach</span>
              </div>
              <p className="text-white/70 text-sm">
                {t("footer.aboutUs")}
              </p>
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

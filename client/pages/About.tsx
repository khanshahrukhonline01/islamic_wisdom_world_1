import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Heart, Globe, Users, BookOpen } from "lucide-react";
import { useState } from "react";

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const navigationLinks = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.sermons", href: "/sermons" },
    { labelKey: "nav.learn", href: "/learn" },
    { labelKey: "nav.community", href: "/community" },
    { labelKey: "nav.contact", href: "/contact" },
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Authentic Knowledge",
      description: "All teachings are rooted in Quran, Hadith, and scholarly consensus",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building a supportive global community of learners and believers",
    },
    {
      icon: Globe,
      title: "Accessible to All",
      description: "Making Islamic education available in 20+ languages worldwide",
    },
    {
      icon: Heart,
      title: "Sincere Purpose",
      description: "Dedicated to spiritual growth and authentic Islamic practice",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className={`space-y-16 ${isRTL ? "text-right" : "text-left"}`}>
          {/* Hero Section */}
          <section className="space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              About Islamic Preach
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Bringing authentic Islamic wisdom to the modern world through accessible, engaging, and multilingual education.
            </p>
          </section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-foreground/70 leading-relaxed">
                To make authentic Islamic knowledge accessible to everyone, regardless of their language, background, or location. We believe that understanding Islamic teachings through reliable sources strengthens faith and guides individuals toward meaningful spiritual growth.
              </p>
            </div>
            <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-foreground/70 leading-relaxed">
                To build a global community of Islamic learners united in seeking knowledge, practicing authentically, and supporting one another on their spiritual journeys. We envision a world where quality Islamic education is available in every language and accessible to every Muslim.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Our Core Values</h2>
              <p className="text-foreground/70">Principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-primary/10 rounded-lg p-6 space-y-3 hover:border-primary/30 transition-colors"
                  >
                    <IconComponent className="w-10 h-10 text-primary" />
                    <h3 className="font-bold text-foreground text-lg">{value.title}</h3>
                    <p className="text-sm text-foreground/70">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What We Offer */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">What We Offer</h2>
              <p className="text-foreground/70">Comprehensive Islamic learning for everyone</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">📖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Localized Content</h3>
                    <p className="text-sm text-foreground/70">
                      Access Quran, Hadith, and lectures in 20+ languages with dialect variants
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary font-bold">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">AI-Powered Tools</h3>
                    <p className="text-sm text-foreground/70">
                      Translation, voice recognition, and text-to-speech for seamless learning
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">🎮</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Gamified Learning</h3>
                    <p className="text-sm text-foreground/70">
                      Engage with interactive lessons, quizzes, and achievement badges
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary font-bold">🌍</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Global Community</h3>
                    <p className="text-sm text-foreground/70">
                      Connect with learners worldwide and share your spiritual journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="space-y-8 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Why Choose Islamic Preach?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">Authenticity</h3>
                <p className="text-foreground/70">
                  All content is verified against authentic Islamic sources and scholarly interpretations
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">Accessibility</h3>
                <p className="text-foreground/70">
                  Available in multiple languages with support for RTL scripts and diverse devices
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg">Engagement</h3>
                <p className="text-foreground/70">
                  Interactive lessons, gamification, and community features keep learning engaging
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out to us with any inquiries or feedback.
            </p>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 py-6">
                Contact Us
              </Button>
            </Link>
          </section>

          {/* Back Button */}
          <div className="pt-8 border-t border-primary/10 text-center">
            <Link to="/">
              <Button variant="outline" className="rounded-full px-8 py-6 border-primary/30 hover:bg-primary/5">
                {t("placeholder.backHome")}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-12 sm:py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    {t("footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="hover:text-white transition-colors">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About
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
              <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    {t("nav.contact")}
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@islamicpreach.com" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
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

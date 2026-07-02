import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function PrivacyPolicy() {
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
          {/* Header */}
          <div className="space-y-4 border-b border-primary/10 pb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Privacy Policy
            </h1>
            <p className="text-foreground/70">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/70 leading-relaxed">
              Welcome to Islamic Preach. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-foreground/70">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Personal Information
                </h3>
                <p>
                  We may collect personal information you voluntarily provide, such as:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Name and email address (when you contact us)</li>
                  <li>Account information (username, password)</li>
                  <li>Learning preferences and progress data</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Non-Personal Information
                </h3>
                <p>
                  We automatically collect certain non-personal information:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Browser type and operating system</li>
                  <li>IP address and location data</li>
                  <li>Pages visited and time spent</li>
                  <li>Referral source</li>
                  <li>Device information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/70">
              <li>To provide and maintain our services</li>
              <li>To improve and personalize your experience</li>
              <li>To process transactions and send related information</li>
              <li>To send promotional communications (with your consent)</li>
              <li>To comply with legal obligations</li>
              <li>To prevent fraud and enhance security</li>
              <li>To analyze usage patterns and improve our platform</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              3. Data Protection & Security
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure password storage using hashing algorithms</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Limited employee access to personal data</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              4. Cookies & Tracking Technologies
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We use cookies, web beacons, and similar tracking technologies to enhance your experience. These cookies help us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Remember your preferences and language settings</li>
              <li>Understand how you use our platform</li>
              <li>Provide personalized content</li>
              <li>Analyze traffic and usage patterns</li>
            </ul>
            <p className="text-foreground/70 mt-3">
              You can control cookie settings through your browser preferences. However, some features may not work properly if cookies are disabled.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              5. Third-Party Services
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Our platform may integrate with third-party services including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Google Analytics for usage analysis</li>
              <li>Google AdSense for advertising</li>
              <li>Payment processors for transactions</li>
              <li>Content delivery networks</li>
            </ul>
            <p className="text-foreground/70 mt-3">
              These services have their own privacy policies. We encourage you to review them.
            </p>
          </section>

          {/* User Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              6. Your Rights & Choices
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Depending on your location, you may have certain rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              7. Children's Privacy
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Our platform is not designed for children under 13. We do not knowingly collect personal information from children under 13. If we discover we have collected such information, we will promptly delete it.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              8. Contact Us
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              For questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-4 space-y-2">
              <p className="text-foreground">
                <span className="font-semibold">Islamic Preach</span>
              </p>
              <p className="text-foreground/70">Email: privacy@islamicpreach.com</p>
              <p className="text-foreground/70">Phone: +1 (XXX) XXX-XXXX</p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              9. Changes to This Policy
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of material changes by updating the "Last Updated" date. Your continued use of our platform constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Back Button */}
          <div className="pt-8 border-t border-primary/10">
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

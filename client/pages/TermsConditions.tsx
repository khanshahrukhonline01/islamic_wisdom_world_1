import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function TermsConditions() {
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
              Terms & Conditions
            </h1>
            <p className="text-foreground/70">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/70 leading-relaxed">
              Welcome to Islamic Preach. These Terms and Conditions ("Terms") govern your access and use of our website, applications, and services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.
            </p>
          </section>

          {/* Use License */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              1. Use License
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We grant you a limited, non-exclusive, non-transferable license to access and use our platform for personal, non-commercial purposes. This license does not permit you to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Modify or copy any content</li>
              <li>Use content for commercial purposes</li>
              <li>Attempt to gain unauthorized access</li>
              <li>Transmit viruses or harmful code</li>
              <li>Reverse engineer or decompile our services</li>
              <li>Circumvent security measures</li>
              <li>Harvest or scrape data without authorization</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              2. User Responsibilities
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              As a user of Islamic Preach, you are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Providing accurate and truthful information</li>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>Notifying us of unauthorized account access</li>
              <li>Complying with all applicable laws and regulations</li>
              <li>Respecting the intellectual property rights of others</li>
              <li>Not posting offensive, harmful, or illegal content</li>
              <li>Not engaging in harassment or abuse</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              3. Intellectual Property Rights
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              All content on Islamic Preach, including text, images, videos, audio, designs, and logos, is owned by or licensed to Islamic Preach and protected by international copyright and intellectual property laws. You may not reproduce, distribute, or transmit any content without our express written consent.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-3">
              User-generated content remains your property, but by submitting content to our platform, you grant us a non-exclusive, royalty-free license to use, display, and distribute such content.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              4. Disclaimers
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Our platform and all content are provided "as is" and "as available." We disclaim all warranties, express or implied, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Warranties of accuracy, completeness, or reliability of content</li>
              <li>Warranties of uninterrupted or error-free service</li>
            </ul>
            <p className="text-foreground/70 leading-relaxed mt-3">
              Islamic educational content is provided for informational purposes. We do not provide legal, financial, or professional advice. Consult qualified professionals before making decisions based on our content.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              5. Limitation of Liability
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              To the fullest extent permitted by law, Islamic Preach shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of or inability to use our platform, even if we have been advised of such damages.
            </p>
          </section>

          {/* Third-Party Content */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              6. Third-Party Content & Links
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Our platform may contain links to third-party websites and services. We are not responsible for their content, accuracy, or practices. Your use of third-party services is at your own risk and subject to their terms and conditions.
            </p>
          </section>

          {/* User Conduct */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              7. User Conduct
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Post offensive, defamatory, or hateful content</li>
              <li>Harass, threaten, or intimidate other users</li>
              <li>Engage in discrimination based on protected characteristics</li>
              <li>Spread misinformation or disinformation</li>
              <li>Violate others' privacy or security</li>
              <li>Engage in spam or unsolicited advertising</li>
              <li>Attempt to disrupt platform operations</li>
            </ul>
          </section>

          {/* Account Termination */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              8. Account Termination
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We reserve the right to terminate or suspend your account and access to our platform at any time for violations of these Terms or other misconduct. Upon termination, your rights to use the platform immediately cease.
            </p>
          </section>

          {/* Modifications to Service */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              9. Modifications to Service
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We may modify, suspend, or discontinue any aspect of our platform at any time. We will attempt to notify users of significant changes, but we are not obligated to do so.
            </p>
          </section>

          {/* Governing Law */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              10. Governing Law
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction in which Islamic Preach operates, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              11. Dispute Resolution
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Any disputes arising from these Terms shall be resolved through informal negotiation. If negotiation fails, disputes shall be settled through binding arbitration or court proceedings as permitted by law.
            </p>
          </section>

          {/* Contact Us */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              12. Contact Us
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              For questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-4 space-y-2">
              <p className="text-foreground">
                <span className="font-semibold">Islamic Preach</span>
              </p>
              <p className="text-foreground/70">Email: legal@islamicpreach.com</p>
              <p className="text-foreground/70">Phone: +1 (XXX) XXX-XXXX</p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              13. Changes to Terms
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting the updated Terms on our website. Your continued use of our platform constitutes acceptance of the modified Terms.
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

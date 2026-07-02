import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Disclaimer() {
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
          {/* Warning Banner */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 flex gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-yellow-900 mb-2">Important Disclaimer</h2>
              <p className="text-yellow-800 text-sm">
                Please read this disclaimer carefully before using Islamic Preach.
              </p>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-primary/10 pb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Disclaimer
            </h1>
            <p className="text-foreground/70">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* General Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">General Disclaimer</h2>
            <p className="text-foreground/70 leading-relaxed">
              The information, content, and materials provided on Islamic Preach (including educational content, teachings, and guidance) are provided "as is" without any representations or warranties of any kind. While we strive to ensure accuracy and quality, we make no guarantees regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>The accuracy, completeness, or reliability of any content</li>
              <li>The appropriateness of content for any particular use</li>
              <li>The absence of errors or omissions</li>
              <li>Continuous availability of the platform</li>
              <li>Freedom from viruses or harmful components</li>
            </ul>
          </section>

          {/* Religious Content Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Religious Content Disclaimer
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Islamic Preach provides Islamic educational content based on Quranic teachings, Hadith, and scholarly interpretations. However, we emphasize that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Different scholars may have varying interpretations</li>
              <li>Content should be supplemented with guidance from qualified religious scholars</li>
              <li>Personal religious matters should be discussed with knowledgeable Islamic advisors</li>
              <li>We do not provide formal religious fatwa or authoritative religious rulings</li>
              <li>Content is educational and informational in nature</li>
            </ul>
          </section>

          {/* No Professional Advice */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              No Professional Advice
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Islamic Preach does not provide:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Medical advice or health recommendations</li>
              <li>Legal advice or legal services</li>
              <li>Financial or investment advice</li>
              <li>Psychological or mental health counseling</li>
              <li>Professional therapeutic services</li>
            </ul>
            <p className="text-foreground/70 leading-relaxed mt-3">
              If you require professional advice in any of these areas, please consult with qualified professionals such as doctors, lawyers, financial advisors, or mental health specialists.
            </p>
          </section>

          {/* User-Generated Content */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              User-Generated Content
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Users may submit content to Islamic Preach including comments, discussions, and questions. We do not endorse or verify user-generated content. Islamic Preach is not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Accuracy or reliability of user submissions</li>
              <li>Offensive or inappropriate user content</li>
              <li>Claims made by other users</li>
              <li>Direct or indirect damages from user content</li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Third-Party Links & Services
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Islamic Preach may contain links to third-party websites and services. We are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Content on external websites</li>
              <li>Availability or functionality of third-party services</li>
              <li>Privacy practices of third parties</li>
              <li>Accuracy of information from external sources</li>
              <li>Downloads or interactions with third-party services</li>
            </ul>
          </section>

          {/* Use at Your Own Risk */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Use at Your Own Risk
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Your use of Islamic Preach is entirely at your own risk. You assume all responsibility for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Deciding whether content is appropriate for you</li>
              <li>Interpreting religious content in accordance with your faith</li>
              <li>Seeking professional advice for important decisions</li>
              <li>Protecting your personal information and account security</li>
              <li>Compliance with applicable laws in your jurisdiction</li>
            </ul>
          </section>

          {/* Health & Safety */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Health & Safety Disclaimer
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              If content on Islamic Preach touches upon health or wellness matters, please note:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>We are not providing medical advice</li>
              <li>Always consult healthcare professionals before making health decisions</li>
              <li>In medical emergencies, seek immediate professional medical help</li>
              <li>Do not rely solely on our platform for health-related concerns</li>
              <li>Individual health outcomes vary and depend on many factors</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Limitation of Liability
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              To the maximum extent permitted by law, Islamic Preach shall not be liable for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Any reliance on content provided</li>
              <li>Technical failures or service interruptions</li>
              <li>Actions or omissions of other users</li>
              <li>Third-party services or content</li>
            </ul>
          </section>

          {/* Indemnification */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Indemnification
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Islamic Preach and its operators from any claims, damages, or losses arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Your use of the platform</li>
              <li>Violation of these Terms</li>
              <li>Infringement of third-party rights</li>
              <li>Your user-generated content</li>
              <li>Actions taken based on our content</li>
            </ul>
          </section>

          {/* Changes to Content */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Changes to Content
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Islamic Preach reserves the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/70 mt-3">
              <li>Modify, update, or remove content at any time</li>
              <li>Correct errors or inaccuracies</li>
              <li>Change features or functionality</li>
              <li>Discontinue services or portions thereof</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Governing Law
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              This disclaimer is governed by the laws applicable to Islamic Preach's jurisdiction, without regard to conflict of law principles.
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="space-y-4 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground">
              Your Acknowledgment
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              By using Islamic Preach, you acknowledge that you have read, understood, and agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, please discontinue use of our platform immediately.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Questions?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              If you have questions about this disclaimer, please contact us:
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-4 space-y-2">
              <p className="text-foreground">
                <span className="font-semibold">Islamic Preach</span>
              </p>
              <p className="text-foreground/70">Email: disclaimer@islamicpreach.com</p>
              <p className="text-foreground/70">Phone: +1 (XXX) XXX-XXXX</p>
            </div>
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

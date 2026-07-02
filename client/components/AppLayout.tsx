import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  footerVariant?: "light" | "dark";
}

export function AppLayout({
  children,
  showFooter = true,
  footerVariant = "dark",
}: AppLayoutProps) {
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <span className="font-bold text-primary hidden sm:inline text-base">
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

            {/* Right Side Items */}
            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher />

              <Button className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-6 text-sm">
                {t("nav.getStarted")}
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2.5 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
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
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full mt-2">
                {t("nav.getStarted")}
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      {showFooter && (
        <footer
          className={`${
            footerVariant === "dark"
              ? "bg-foreground/95 text-white"
              : "bg-white border-t border-primary/10 text-foreground"
          } py-12 sm:py-16`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {/* Brand Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      footerVariant === "dark" ? "bg-secondary" : "bg-primary/20"
                    }`}
                  >
                    <span
                      className={`font-bold text-sm ${
                        footerVariant === "dark" ? "text-foreground" : "text-primary"
                      }`}
                    >
                      ✨
                    </span>
                  </div>
                  <span className="font-bold">Islamic Preach</span>
                </div>
                <p
                  className={`text-sm ${
                    footerVariant === "dark" ? "text-white/70" : "text-foreground/70"
                  }`}
                >
                  {t("footer.aboutUs")}
                </p>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul
                  className={`space-y-2 text-sm ${
                    footerVariant === "dark" ? "text-white/70" : "text-foreground/70"
                  }`}
                >
                  <li>
                    <Link
                      to="/privacy"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      {t("footer.privacy")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      {t("footer.terms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/disclaimer"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
                <ul
                  className={`space-y-2 text-sm ${
                    footerVariant === "dark" ? "text-white/70" : "text-foreground/70"
                  }`}
                >
                  <li>
                    <Link
                      to="/about"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/learn"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      {t("nav.learn")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/learn/modules"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      Learning Modules
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold mb-4">{t("footer.support")}</h4>
                <ul
                  className={`space-y-2 text-sm ${
                    footerVariant === "dark" ? "text-white/70" : "text-foreground/70"
                  }`}
                >
                  <li>
                    <Link
                      to="/contact"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      {t("nav.contact")}
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:support@islamicpreach.com"
                      className={`hover:${
                        footerVariant === "dark" ? "text-white" : "text-primary"
                      } transition-colors`}
                    >
                      Email Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div
              className={`border-t ${
                footerVariant === "dark"
                  ? "border-white/10 pt-8"
                  : "border-primary/10 pt-8"
              }`}
            >
              <p
                className={`text-center text-sm ${
                  footerVariant === "dark" ? "text-white/60" : "text-foreground/60"
                }`}
              >
                {t("footer.copyright")}
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

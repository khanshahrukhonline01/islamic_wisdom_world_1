import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TranslationChatbot } from "@/components/TranslationChatbot";
import { VoiceToText } from "@/components/VoiceToText";
import { TextToSpeech } from "@/components/TextToSpeech";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Sparkles } from "lucide-react";

export default function AITools() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chatbot" | "voice" | "tts">(
    "chatbot"
  );
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
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                AI-Powered Islamic Tools
              </h1>
            </div>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Powered by advanced AI technology. Ask questions in any language, speak
              Quranic verses, and listen to content in multiple accents.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 border-b border-primary/10 pb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("chatbot")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "chatbot"
                  ? "bg-primary text-white"
                  : "bg-primary/5 text-foreground hover:bg-primary/10"
              }`}
            >
              💬 Chatbot
            </button>
            <button
              onClick={() => setActiveTab("voice")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "voice"
                  ? "bg-primary text-white"
                  : "bg-primary/5 text-foreground hover:bg-primary/10"
              }`}
            >
              🎤 Voice to Text
            </button>
            <button
              onClick={() => setActiveTab("tts")}
              className={`px-6 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === "tts"
                  ? "bg-primary text-white"
                  : "bg-primary/5 text-foreground hover:bg-primary/10"
              }`}
            >
              🔊 Text to Speech
            </button>
            <Link
              to="/tools/subtitles"
              className="px-6 py-3 rounded-lg font-medium text-sm transition-all whitespace-nowrap bg-secondary/10 text-foreground hover:bg-secondary/20"
            >
              📹 Subtitles
            </Link>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === "chatbot" && (
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <TranslationChatbot />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-3">
                        About the Chatbot
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-900">
                        <li className="flex gap-2">
                          <span>✓</span>
                          <span>Real-time translation</span>
                        </li>
                        <li className="flex gap-2">
                          <span>✓</span>
                          <span>Ask in any language</span>
                        </li>
                        <li className="flex gap-2">
                          <span>✓</span>
                          <span>Response in your language</span>
                        </li>
                        <li className="flex gap-2">
                          <span>✓</span>
                          <span>Verified Islamic sources</span>
                        </li>
                        <li className="flex gap-2">
                          <span>✓</span>
                          <span>Expert moderation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-xs text-green-900">
                        <span className="font-semibold">🔒 Privacy:</span> Your questions
                        are processed securely and not stored permanently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "voice" && (
              <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <VoiceToText />
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                    <h4 className="font-semibold text-purple-900 mb-3">
                      Voice Features
                    </h4>
                    <ul className="space-y-2 text-sm text-purple-900">
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Speech recognition</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Quran recitation support</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Tajweed guidance</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>20+ languages</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Real-time feedback</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-xs text-orange-900">
                      <span className="font-semibold">📱 Tip:</span> Best results on mobile
                      with a quiet environment and good microphone.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tts" && (
              <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TextToSpeech />
                </div>
                <div className="space-y-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h4 className="font-semibold text-amber-900 mb-3">
                      Speech Features
                    </h4>
                    <ul className="space-y-2 text-sm text-amber-900">
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Multiple accents</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Speed control</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Regional variants</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>High quality audio</span>
                      </li>
                      <li className="flex gap-2">
                        <span>✓</span>
                        <span>Download support</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <p className="text-xs text-cyan-900">
                      <span className="font-semibold">🎵 Accents:</span> Arabic (5+),
                      Urdu (4+), English (5+), Hindi (4+), Bengali (3+).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 sm:py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Use Cases
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">🤔</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Ask Islamic Questions
              </h3>
              <p className="text-foreground/70 text-sm">
                Use the chatbot to ask questions about Islam in any language and get
                answers verified by Islamic scholars.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Learn Quran Properly
              </h3>
              <p className="text-foreground/70 text-sm">
                Record your Quranic recitation and get instant tajweed feedback to improve
                your pronunciation and understanding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">👂</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Listen to Content
              </h3>
              <p className="text-foreground/70 text-sm">
                Convert any Islamic text to speech in your preferred accent and language,
                perfect for learning while on the go.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-primary/10">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Generate Video Subtitles
              </h3>
              <p className="text-foreground/70 text-sm">
                Automatically generate and translate subtitles for your Islamic videos and
                lectures to reach more people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
          <h2 className="text-3xl font-bold text-foreground">
            Explore More Features
          </h2>
          <p className="text-lg text-foreground/70">
            From chatbots and voice recognition to text-to-speech and subtitle generation,
            our AI tools help make Islamic content accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tools/subtitles">
              <Button className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white rounded-full px-8 py-6 text-base font-semibold">
                Try Subtitle Generator
              </Button>
            </Link>
            <Link to="/learn/content">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-8 py-6 text-base font-semibold">
                Explore Content Library
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border-primary/30 hover:bg-primary/5"
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

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

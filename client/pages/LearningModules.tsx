import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { QuizGame } from "@/components/QuizGame";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LEARNING_MODULES,
  LearningProgressService,
  type UserProgress,
  type QuizResult,
} from "@/lib/learning-service";
import { Menu, X, BookOpen } from "lucide-react";

export default function LearningModules() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const { t, isRTL } = useLanguage();

  const navigationLinks = [
    { labelKey: "nav.home", href: "/" },
    { labelKey: "nav.sermons", href: "/sermons" },
    { labelKey: "nav.learn", href: "/learn" },
    { labelKey: "nav.community", href: "/community" },
    { labelKey: "nav.contact", href: "/contact" },
  ];

  const selectedModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId);
  const selectedLesson = selectedModule?.lessons.find(
    (l) => l.id === selectedLessonId
  );

  const handleStartModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    const module = LEARNING_MODULES.find((m) => m.id === moduleId);
    if (module) {
      setSelectedLessonId(module.lessons[0].id);
      setUserProgress(
        LearningProgressService.initializeProgress("user-1", moduleId)
      );
      setIsQuizMode(false);
    }
  };

  const handleStartQuiz = () => {
    if (!selectedLesson?.quiz || !userProgress) return;
    setIsQuizMode(true);
  };

  const handleQuizComplete = (results: QuizResult[]) => {
    if (!userProgress) return;

    const updatedProgress = LearningProgressService.updateProgressWithQuizResult(
      userProgress,
      results
    );
    setUserProgress(updatedProgress);
    setIsQuizMode(false);
  };

  const handleNextLesson = () => {
    if (!selectedModule) return;
    const currentIndex = selectedModule.lessons.findIndex(
      (l) => l.id === selectedLessonId
    );
    if (currentIndex < selectedModule.lessons.length - 1) {
      setSelectedLessonId(selectedModule.lessons[currentIndex + 1].id);
      setIsQuizMode(false);
    }
  };

  const handleBackToModules = () => {
    setSelectedModuleId(null);
    setSelectedLessonId(null);
    setUserProgress(null);
    setIsQuizMode(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Mobile First */}
      <header className="sticky top-0 z-50 bg-white border-b border-primary/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 min-w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <span className="font-bold text-primary hidden sm:inline text-base">
                Islamic Preach
              </span>
            </Link>

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

            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher />

              <Button className="hidden sm:inline-flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white rounded-full px-6 text-sm">
                {t("nav.getStarted")}
              </Button>

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
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {!selectedModuleId ? (
          // Module Selection View - Mobile First
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero */}
            <div className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="flex items-center gap-3">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
                <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
                  Learn Islamic Languages
                </h1>
              </div>
              <p className="text-sm sm:text-lg text-foreground/70 max-w-2xl">
                Master Arabic, Islamic etiquette, and Quranic recitation through
                interactive lessons and gamified quizzes.
              </p>
            </div>

            {/* Modules Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {LEARNING_MODULES.map((module) => (
                <div
                  key={module.id}
                  className="bg-white border border-primary/10 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-4 hover:border-primary/30 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="text-3xl sm:text-4xl">{module.icon}</div>
                    <h3 className="font-bold text-foreground text-base sm:text-lg">
                      {module.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/70">
                      {module.description}
                    </p>
                  </div>

                  {/* Module Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="bg-primary/5 rounded p-2 text-center">
                      <div className="font-bold text-primary">
                        {module.lessonCount}
                      </div>
                      <div className="text-foreground/60 text-xs">Lessons</div>
                    </div>
                    <div className="bg-secondary/5 rounded p-2 text-center">
                      <div className="font-bold text-secondary">
                        {module.estimatedDuration}
                      </div>
                      <div className="text-foreground/60 text-xs">Minutes</div>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground/60">Level</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        module.difficulty === "beginner"
                          ? "bg-green-100 text-green-800"
                          : module.difficulty === "intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {module.difficulty.charAt(0).toUpperCase() +
                        module.difficulty.slice(1)}
                    </span>
                  </div>

                  {/* Start Button */}
                  <Button
                    onClick={() => handleStartModule(module.id)}
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-2.5 sm:py-3 font-semibold text-sm sm:text-base"
                  >
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>

            {/* Info Sections */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-4">
              <h2 className="font-bold text-foreground text-base sm:text-lg">
                🎮 How Gamification Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div className="flex gap-2">
                  <span className="text-lg flex-shrink-0">⭐</span>
                  <div>
                    <p className="font-semibold text-foreground">Points</p>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                      Earn points for correct answers
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg flex-shrink-0">🏆</span>
                  <div>
                    <p className="font-semibold text-foreground">Badges</p>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                      Unlock achievements as you progress
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg flex-shrink-0">🔥</span>
                  <div>
                    <p className="font-semibold text-foreground">Streaks</p>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                      Learn daily to build your streak
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-lg flex-shrink-0">📊</span>
                  <div>
                    <p className="font-semibold text-foreground">Progress</p>
                    <p className="text-foreground/70 text-xs sm:text-sm">
                      Track your learning journey
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isQuizMode && selectedLesson?.quiz ? (
          // Quiz Mode
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setIsQuizMode(false)}
              className="mb-4 sm:mb-6 text-primary hover:text-primary/80 font-medium text-sm"
            >
              ← Back to Lesson
            </button>
            <QuizGame
              questions={selectedLesson.quiz}
              onComplete={handleQuizComplete}
              moduleName={selectedModule?.title || "Quiz"}
            />
          </div>
        ) : (
          // Lesson View - Mobile First
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <button
                onClick={handleBackToModules}
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                ← Back to Modules
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
                <span>{selectedModule?.icon}</span>
                {selectedModule?.title}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lesson Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-primary/10 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                      {selectedLesson?.title}
                    </h2>
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed whitespace-pre-line">
                      {selectedLesson?.content}
                    </p>
                  </div>

                  {/* Vocabulary */}
                  {selectedLesson?.vocabulary && selectedLesson.vocabulary.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-bold text-foreground">📖 Vocabulary</h3>
                      <div className="space-y-2">
                        {selectedLesson.vocabulary.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-primary/5 rounded p-3 sm:p-4 space-y-1"
                          >
                            <p className="font-semibold text-foreground text-sm sm:text-base">
                              {item.word}
                            </p>
                            <p className="text-xs sm:text-sm text-foreground/70">
                              <span className="font-medium">Pronunciation:</span>{" "}
                              {item.pronunciation}
                            </p>
                            <p className="text-xs sm:text-sm text-foreground/70">
                              <span className="font-medium">Translation:</span>{" "}
                              {item.translation}
                            </p>
                            <p className="text-xs sm:text-sm text-foreground/60 italic">
                              Example: {item.example}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-primary/10">
                    {selectedLesson?.quiz && (
                      <Button
                        onClick={handleStartQuiz}
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg py-3 font-semibold text-sm sm:text-base"
                      >
                        Take Quiz 🎯
                      </Button>
                    )}
                    {selectedModule &&
                      selectedModule.lessons.findIndex(
                        (l) => l.id === selectedLessonId
                      ) <
                        selectedModule.lessons.length - 1 && (
                        <Button
                          onClick={handleNextLesson}
                          variant="outline"
                          className="flex-1 border-primary/30 hover:bg-primary/5 rounded-lg py-3 font-semibold text-sm sm:text-base"
                        >
                          Next Lesson →
                        </Button>
                      )}
                  </div>
                </div>
              </div>

              {/* Progress Sidebar */}
              {userProgress && (
                <div className="lg:col-span-1">
                  <ProgressDashboard
                    progress={userProgress}
                    moduleName={selectedModule?.title || ""}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-foreground/95 text-white py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-6 sm:mb-8 ${
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
                  <Link to="/learn/content" className="hover:text-white transition-colors">
                    Content Library
                  </Link>
                </li>
                <li>
                  <Link to="/ai-tools" className="hover:text-white transition-colors">
                    AI Tools
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
          <div className="border-t border-white/10 pt-6 sm:pt-8 max-w-6xl mx-auto">
            <p className="text-center text-xs sm:text-sm text-white/60">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

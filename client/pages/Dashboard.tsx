import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { AppLayout } from "@/components/AppLayout";
import { UserProgressService, type UserProfile } from "@/lib/user-progress-service";
import {
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Award,
  Calendar,
  BookOpen,
  History,
} from "lucide-react";

export default function Dashboard() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState(UserProgressService.getUserStats(profile || { totalPoints: 0, currentLevel: 1, completedLessons: [], completedQuizzes: [], bookmarkedContent: [], recentlyViewed: [], streakDays: 0, lastStreakDate: new Date().toISOString().split("T")[0], createdAt: Date.now(), lastActiveAt: Date.now(), userId: "" }));

  useEffect(() => {
    const userProfile = UserProgressService.getOrCreateProfile();
    setProfile(userProfile);
    setStats(UserProgressService.getUserStats(userProfile));
  }, []);

  if (!profile) return null;

  const levelTitles = ["Novice", "Student", "Scholar", "Master", "Legend"];
  const currentLevelTitle = levelTitles[Math.min(profile.currentLevel - 1, levelTitles.length - 1)];
  const levelEmojis = ["📚", "📖", "🎓", "👨‍🎓", "👑"];
  const currentEmoji = levelEmojis[Math.min(profile.currentLevel - 1, levelEmojis.length - 1)];

  const progressToNextLevel = ((profile.totalPoints % 500) / 500) * 100;

  return (
    <AppLayout>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="space-y-2 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Your Learning Dashboard
          </h1>
          <p className="text-lg text-foreground/70">
            Track your progress and continue your journey
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Level Card */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Your Level</p>
                <h2 className="text-4xl font-bold text-foreground">
                  {currentLevelTitle}
                </h2>
              </div>
              <div className="text-6xl">{currentEmoji}</div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">Progress to next level</span>
                <span className="font-semibold text-primary">
                  {Math.round(progressToNextLevel)}%
                </span>
              </div>
              <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${progressToNextLevel}%` }}
                />
              </div>
              <p className="text-xs text-foreground/50">
                {500 - (profile.totalPoints % 500)} points to next level
              </p>
            </div>
          </div>

          {/* Points Card */}
          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 rounded-2xl p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Total Points</p>
                <h2 className="text-4xl font-bold text-foreground">
                  {profile.totalPoints}
                </h2>
              </div>
              <div className="p-4 bg-secondary/20 rounded-full">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
            </div>

            {/* Badges */}
            <div className="space-y-2">
              <p className="text-sm text-foreground/60">Badges Earned</p>
              <div className="flex items-center gap-2">
                {[...Array(Math.floor(profile.totalPoints / 250))].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-lg"
                  >
                    🏆
                  </div>
                ))}
                {Math.floor(profile.totalPoints / 250) === 0 && (
                  <p className="text-sm text-foreground/50">No badges yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white border border-primary/10 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <p className="text-sm text-foreground/60">Lessons</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.lessonCount}</p>
          </div>

          <div className="bg-white border border-primary/10 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary" />
              <p className="text-sm text-foreground/60">Quizzes</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.quizCount}</p>
          </div>

          <div className="bg-white border border-primary/10 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-foreground/60">Accuracy</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{Math.round(stats.accuracy)}%</p>
          </div>

          <div className="bg-white border border-primary/10 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <p className="text-sm text-foreground/60">Streak</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.streakDays}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-primary/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  Recently Viewed
                </h3>
              </div>

              {profile.recentlyViewed.length === 0 ? (
                <p className="text-center py-6 text-foreground/60">
                  No recent activity yet
                </p>
              ) : (
                <div className="space-y-3">
                  {profile.recentlyViewed.slice(0, 5).map((view, idx) => {
                    const date = new Date(view.timestamp);
                    const timeAgo = Math.floor((Date.now() - view.timestamp) / 60000);
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">
                            {view.title}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {timeAgo < 60
                              ? `${timeAgo} min ago`
                              : `${Math.floor(timeAgo / 60)} hours ago`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="w-16 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${view.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-primary whitespace-nowrap">
                            {Math.round(view.progress)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-white border border-primary/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Streak
              </h3>
              <div className="text-center space-y-2">
                <p className="text-4xl font-bold text-primary">
                  {profile.streakDays}
                </p>
                <p className="text-sm text-foreground/60">Days in a row</p>
                <p className="text-xs text-foreground/50">
                  Last active: {new Date(profile.lastStreakDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <Link to="/learn/modules" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3">
                Continue Learning 📚
              </Button>
            </Link>

            <Link to="/search" className="block">
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/5 rounded-lg py-3"
              >
                Discover Content 🔍
              </Button>
            </Link>

            <Link to="/learn/modules" className="block">
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/5 rounded-lg py-3"
              >
                Take Quiz 🎯
              </Button>
            </Link>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl text-center space-y-3">
          <Award className="w-8 h-8 text-primary mx-auto" />
          <h3 className="text-lg font-bold text-foreground">Keep it up!</h3>
          <p className="text-foreground/70">
            {profile.streakDays > 0
              ? `You're on a ${profile.streakDays}-day streak! Keep learning to unlock more achievements.`
              : "Start your learning journey today. Every step counts!"}
          </p>
        </div>
      </main>
    </AppLayout>
  );
}

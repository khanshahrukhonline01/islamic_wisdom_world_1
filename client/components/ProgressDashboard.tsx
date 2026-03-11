import { useEffect, useState } from "react";
import {
  GamificationService,
  LearningProgressService,
  type UserProgress,
} from "@/lib/learning-service";
import { Zap, Trophy, TrendingUp, Target } from "lucide-react";

interface ProgressDashboardProps {
  progress: UserProgress;
  moduleName: string;
}

export function ProgressDashboard({
  progress,
  moduleName,
}: ProgressDashboardProps) {
  const [nextBadge, setNextBadge] = useState({
    name: "",
    pointsNeeded: 0,
    percentage: 0,
  });

  useEffect(() => {
    const badge = GamificationService.getNextBadgeProgress(
      progress.totalScore
    );
    setNextBadge(badge);
  }, [progress.totalScore]);

  const accuracy = LearningProgressService.getAccuracyPercentage(progress);
  const level = LearningProgressService.getLevelName(progress.totalScore);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Level Card - Mobile Optimized */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm text-foreground/60 mb-1">
              Your Level
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {level}
            </h2>
          </div>
          <div className="text-4xl sm:text-5xl flex-shrink-0">
            {level === "Novice"
              ? "🌱"
              : level === "Student"
                ? "📚"
                : level === "Scholar"
                  ? "🎓"
                  : level === "Master"
                    ? "👑"
                    : "⭐"}
          </div>
        </div>

        {/* Score Display */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">Total Score</span>
            <span className="font-bold text-primary text-lg">
              {progress.totalScore}
            </span>
          </div>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{
                width: `${Math.min(100, (progress.totalScore / 2500) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Correct Answers */}
        <div className="bg-white border border-green-200 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-foreground/60">Correct</p>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {progress.correctAnswers}
          </p>
          <p className="text-xs text-foreground/50">answers</p>
        </div>

        {/* Accuracy */}
        <div className="bg-white border border-blue-200 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-foreground/60">Accuracy</p>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-blue-600">
            {accuracy}%
          </p>
          <p className="text-xs text-foreground/50">success rate</p>
        </div>

        {/* Streak */}
        <div className="bg-white border border-orange-200 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-foreground/60">Streak</p>
            <Zap className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-orange-600">
            {progress.streak}
          </p>
          <p className="text-xs text-foreground/50">day(s)</p>
        </div>

        {/* Total Questions */}
        <div className="bg-white border border-purple-200 rounded-lg p-3 sm:p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-foreground/60">Attempts</p>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-purple-600">
            {progress.totalQuestions}
          </p>
          <p className="text-xs text-foreground/50">questions</p>
        </div>
      </div>

      {/* Next Badge Progress */}
      {nextBadge.percentage < 100 && (
        <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">
              Next Achievement
            </h3>
            <Trophy className="w-5 h-5 text-primary" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/70">{nextBadge.name}</span>
              <span className="font-bold text-primary">
                {nextBadge.pointsNeeded} pts
              </span>
            </div>

            <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${nextBadge.percentage}%` }}
              />
            </div>

            <p className="text-xs text-foreground/60">
              {Math.round(nextBadge.percentage)}% progress to next badge
            </p>
          </div>
        </div>
      )}

      {/* Badges Earned */}
      {progress.badges.length > 0 && (
        <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 space-y-4">
          <h3 className="font-semibold text-foreground text-sm sm:text-base">
            🏆 Badges Earned ({progress.badges.length})
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {progress.badges.map((badge) => (
              <div
                key={badge.id}
                className={`border-2 rounded-lg p-3 sm:p-4 text-center space-y-2 ${
                  badge.rarity === "legendary"
                    ? "bg-yellow-50 border-yellow-300"
                    : badge.rarity === "epic"
                      ? "bg-purple-50 border-purple-300"
                      : badge.rarity === "rare"
                        ? "bg-blue-50 border-blue-300"
                        : "bg-gray-50 border-gray-300"
                }`}
              >
                <div className="text-2xl sm:text-3xl">{badge.icon}</div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  {badge.name}
                </p>
                <p
                  className={`text-xs ${
                    badge.rarity === "legendary"
                      ? "text-yellow-700"
                      : badge.rarity === "epic"
                        ? "text-purple-700"
                        : badge.rarity === "rare"
                          ? "text-blue-700"
                          : "text-gray-700"
                  }`}
                >
                  {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivation Quote */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 sm:p-6 text-center">
        <p className="text-sm sm:text-base text-foreground/80 italic">
          {progress.totalScore < 100
            ? "🌱 Great start! Keep learning and growing."
            : progress.totalScore < 500
              ? "📚 You're making excellent progress!"
              : progress.totalScore < 1000
                ? "🎓 You're becoming a scholar!"
                : progress.totalScore < 2500
                  ? "👑 You're on the path to mastery!"
                  : "⭐ You are a legend!"}
        </p>
      </div>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

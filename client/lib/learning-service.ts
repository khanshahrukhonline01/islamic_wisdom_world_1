// Gamified Language Learning Service
// Includes quizzes, badges, streaks, and progress tracking

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessonCount: number;
  estimatedDuration: number; // in minutes
  icon: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  vocabulary?: VocabularyItem[];
  quiz?: QuizQuestion[];
}

export interface VocabularyItem {
  word: string;
  pronunciation: string;
  translation: string;
  example: string;
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  completedLessons: string[];
  totalScore: number;
  correctAnswers: number;
  totalQuestions: number;
  streak: number;
  lastActivityDate: Date;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface QuizResult {
  questionId: string;
  answered: boolean;
  correct: boolean;
  userAnswer?: number;
  points: number;
}

// Sample Learning Modules
export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "arabic-basics",
    title: "Arabic Basics",
    description: "Learn the fundamentals of Arabic, the language of the Quran",
    language: "ar",
    difficulty: "beginner",
    lessonCount: 10,
    estimatedDuration: 120,
    icon: "📖",
    lessons: [
      {
        id: "lesson-1",
        title: "Arabic Alphabet (Alif-Ba-Ta)",
        content:
          "Learn the first three letters of the Arabic alphabet and how to write them.",
        vocabulary: [
          {
            word: "الألف",
            pronunciation: "Al-Alif",
            translation: "The letter Alif",
            example: "أحمد (Ahmad)",
          },
          {
            word: "الباء",
            pronunciation: "Al-Ba",
            translation: "The letter Ba",
            example: "بسم (Bismillah - In the name of)",
          },
        ],
        quiz: [
          {
            id: "q1",
            question: "Which letter comes first in the Arabic alphabet?",
            options: ["الباء", "الألف", "التاء", "الثاء"],
            correctAnswer: 1,
            explanation: "الألف (Al-Alif) is the first letter of the Arabic alphabet.",
            difficulty: "easy",
          },
          {
            id: "q2",
            question: "How many letters are in the basic Arabic alphabet?",
            options: ["24", "26", "28", "30"],
            correctAnswer: 2,
            explanation: "The Arabic alphabet has 28 letters.",
            difficulty: "easy",
          },
        ],
      },
      {
        id: "lesson-2",
        title: "Islamic Greetings",
        content: "Master common Islamic greetings used in daily life.",
        vocabulary: [
          {
            word: "السلام عليكم",
            pronunciation: "Assalamu alaikum",
            translation: "Peace be upon you",
            example: "Used when greeting someone",
          },
          {
            word: "وعليكم السلام",
            pronunciation: "Wa alaikum assalam",
            translation: "And upon you be peace",
            example: "Response to Assalamu alaikum",
          },
          {
            word: "الحمد لله",
            pronunciation: "Alhamdulillah",
            translation: "All praise is due to Allah",
            example: "When expressing gratitude",
          },
        ],
        quiz: [
          {
            id: "q3",
            question: "What does 'السلام عليكم' mean?",
            options: [
              "Good morning",
              "Peace be upon you",
              "Thank you",
              "Goodbye",
            ],
            correctAnswer: 1,
            explanation: "'Assalamu alaikum' is a greeting meaning 'Peace be upon you'",
            difficulty: "easy",
          },
        ],
      },
    ],
  },
  {
    id: "quran-recitation",
    title: "Quran Recitation (Tajweed)",
    description: "Learn proper Quranic pronunciation and tajweed rules",
    language: "ar",
    difficulty: "intermediate",
    lessonCount: 15,
    estimatedDuration: 180,
    icon: "📚",
    lessons: [
      {
        id: "lesson-3",
        title: "Rules of Noon Saakinah",
        content: "Master the pronunciation rules for Noon Saakinah in Quranic recitation.",
        vocabulary: [
          {
            word: "النون الساكنة",
            pronunciation: "Noon Saakinah",
            translation: "The quiescent Noon",
            example: "Rules for pronouncing ن when not voweled",
          },
        ],
        quiz: [
          {
            id: "q4",
            question: "What are the four rules of Noon Saakinah?",
            options: [
              "Izhar, Idghaam, Iqlab, Ikhfaa",
              "Only Izhar",
              "Izhar and Idghaam",
              "Iqlab only",
            ],
            correctAnswer: 0,
            explanation:
              "The four main rules are: Izhar (clarity), Idghaam (merging), Iqlab (conversion), and Ikhfaa (concealing).",
            difficulty: "medium",
          },
        ],
      },
    ],
  },
  {
    id: "islamic-etiquette",
    title: "Islamic Etiquette",
    description: "Learn proper Islamic manners and etiquette in daily life",
    language: "en",
    difficulty: "beginner",
    lessonCount: 8,
    estimatedDuration: 90,
    icon: "🤝",
    lessons: [
      {
        id: "lesson-4",
        title: "Greeting Etiquette",
        content: "Learn how to greet Muslims and non-Muslims respectfully.",
        vocabulary: [
          {
            word: "Greeting",
            pronunciation: "Salaam",
            translation: "Peace greeting in Islam",
            example: "Assalamu alaikum wa rahmatullahi wa barakatuhu",
          },
        ],
        quiz: [
          {
            id: "q5",
            question: "What is the Islamic way to greet someone?",
            options: [
              "Assalamu alaikum",
              "Good morning",
              "Hello",
              "How are you?",
            ],
            correctAnswer: 0,
            explanation:
              "The Islamic greeting is 'Assalamu alaikum' which means 'Peace be upon you'.",
            difficulty: "easy",
          },
        ],
      },
    ],
  },
];

// Gamification Service
export class GamificationService {
  static calculatePoints(
    difficulty: "easy" | "medium" | "hard",
    correct: boolean
  ): number {
    if (!correct) return 0;
    const basePoints = {
      easy: 10,
      medium: 25,
      hard: 50,
    };
    return basePoints[difficulty];
  }

  static calculateStreak(lastActivityDate: Date | null): number {
    if (!lastActivityDate) return 1;

    const today = new Date();
    const lastActivity = new Date(lastActivityDate);
    const diffTime = today.getTime() - lastActivity.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 1 ? 1 : 0; // Reset if more than 1 day has passed
  }

  static getBadgesForScore(totalScore: number): Badge[] {
    const badges: Badge[] = [];

    if (totalScore >= 100) {
      badges.push({
        id: "beginner",
        name: "Beginner",
        description: "Earned 100+ points",
        icon: "🌟",
        earnedDate: new Date(),
        rarity: "common",
      });
    }

    if (totalScore >= 500) {
      badges.push({
        id: "learner",
        name: "Dedicated Learner",
        description: "Earned 500+ points",
        icon: "📚",
        earnedDate: new Date(),
        rarity: "rare",
      });
    }

    if (totalScore >= 1000) {
      badges.push({
        id: "master",
        name: "Knowledge Master",
        description: "Earned 1000+ points",
        icon: "👑",
        earnedDate: new Date(),
        rarity: "epic",
      });
    }

    if (totalScore >= 2500) {
      badges.push({
        id: "legend",
        name: "Islamic Scholar",
        description: "Earned 2500+ points",
        icon: "⭐",
        earnedDate: new Date(),
        rarity: "legendary",
      });
    }

    return badges;
  }

  static getNextBadgeProgress(
    totalScore: number
  ): { nextBadge: string; pointsNeeded: number; percentage: number } {
    const milestones = [
      { points: 100, badge: "Beginner" },
      { points: 500, badge: "Dedicated Learner" },
      { points: 1000, badge: "Knowledge Master" },
      { points: 2500, badge: "Islamic Scholar" },
    ];

    const nextMilestone = milestones.find((m) => m.points > totalScore);

    if (!nextMilestone) {
      return {
        nextBadge: "Maximum Achievement",
        pointsNeeded: 0,
        percentage: 100,
      };
    }

    const previousMilestone = milestones
      .filter((m) => m.points <= totalScore)
      .pop();
    const previousPoints = previousMilestone?.points || 0;
    const rangeSize = nextMilestone.points - previousPoints;
    const pointsEarned = totalScore - previousPoints;
    const percentage = Math.min(100, (pointsEarned / rangeSize) * 100);

    return {
      nextBadge: nextMilestone.badge,
      pointsNeeded: nextMilestone.points - totalScore,
      percentage,
    };
  }
}

// Learning Progress Service
export class LearningProgressService {
  static initializeProgress(
    userId: string,
    moduleId: string
  ): UserProgress {
    return {
      userId,
      moduleId,
      completedLessons: [],
      totalScore: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      streak: 1,
      lastActivityDate: new Date(),
      badges: [],
    };
  }

  static updateProgressWithQuizResult(
    progress: UserProgress,
    results: QuizResult[]
  ): UserProgress {
    const correctCount = results.filter((r) => r.correct).length;
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0);

    return {
      ...progress,
      totalScore: progress.totalScore + totalPoints,
      correctAnswers: progress.correctAnswers + correctCount,
      totalQuestions: progress.totalQuestions + results.length,
      lastActivityDate: new Date(),
      badges: GamificationService.getBadgesForScore(
        progress.totalScore + totalPoints
      ),
    };
  }

  static getAccuracyPercentage(progress: UserProgress): number {
    if (progress.totalQuestions === 0) return 0;
    return Math.round((progress.correctAnswers / progress.totalQuestions) * 100);
  }

  static getLevelName(totalScore: number): string {
    if (totalScore < 100) return "Novice";
    if (totalScore < 500) return "Student";
    if (totalScore < 1000) return "Scholar";
    if (totalScore < 2500) return "Master";
    return "Legend";
  }
}

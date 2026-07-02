// User progress service for localStorage persistence
// Stores user's learning journey without requiring a backend

export interface UserProfile {
  userId: string;
  createdAt: number;
  lastActiveAt: number;
  totalPoints: number;
  currentLevel: number;
  completedLessons: string[];
  completedQuizzes: string[];
  bookmarkedContent: string[];
  recentlyViewed: RecentView[];
  streakDays: number;
  lastStreakDate: string;
}

export interface RecentView {
  contentId: string;
  contentType: "lesson" | "quiz" | "content";
  title: string;
  timestamp: number;
  progress: number;
}

export interface UserStats {
  totalPoints: number;
  lessonCount: number;
  quizCount: number;
  accuracy: number;
  streakDays: number;
  level: number;
  badges: number;
}

const STORAGE_KEY = "islamic-preach:user-profile";
const GENERATE_USER_ID = () => `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const UserProgressService = {
  // Initialize or get user profile
  getOrCreateProfile(): UserProfile {
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // If corrupt, create new
      }
    }

    const newProfile: UserProfile = {
      userId: GENERATE_USER_ID(),
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
      totalPoints: 0,
      currentLevel: 1,
      completedLessons: [],
      completedQuizzes: [],
      bookmarkedContent: [],
      recentlyViewed: [],
      streakDays: 0,
      lastStreakDate: new Date().toISOString().split("T")[0],
    };

    this.saveProfile(newProfile);
    return newProfile;
  },

  // Save profile to localStorage
  saveProfile(profile: UserProfile): void {
    profile.lastActiveAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  },

  // Add points to user
  addPoints(profile: UserProfile, points: number): UserProfile {
    profile.totalPoints += points;
    
    // Update level (every 500 points)
    profile.currentLevel = Math.floor(profile.totalPoints / 500) + 1;
    
    this.saveProfile(profile);
    return profile;
  },

  // Mark lesson as completed
  completeLesson(profile: UserProfile, lessonId: string): UserProfile {
    if (!profile.completedLessons.includes(lessonId)) {
      profile.completedLessons.push(lessonId);
      this.updateStreak(profile);
      this.saveProfile(profile);
    }
    return profile;
  },

  // Mark quiz as completed
  completeQuiz(profile: UserProfile, quizId: string): UserProfile {
    if (!profile.completedQuizzes.includes(quizId)) {
      profile.completedQuizzes.push(quizId);
      this.updateStreak(profile);
      this.saveProfile(profile);
    }
    return profile;
  },

  // Update daily streak
  updateStreak(profile: UserProfile): UserProfile {
    const today = new Date().toISOString().split("T")[0];
    const lastDate = profile.lastStreakDate;

    if (lastDate === today) {
      // Already active today
      return profile;
    }

    const lastDateObj = new Date(lastDate);
    const todayObj = new Date(today);
    const daysDiff = Math.floor((todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      // Consecutive day
      profile.streakDays += 1;
    } else if (daysDiff > 1) {
      // Streak broken, restart
      profile.streakDays = 1;
    }

    profile.lastStreakDate = today;
    this.saveProfile(profile);
    return profile;
  },

  // Add recent view
  addRecentView(profile: UserProfile, view: RecentView): UserProfile {
    // Remove if already exists
    profile.recentlyViewed = profile.recentlyViewed.filter(
      (v) => v.contentId !== view.contentId
    );

    // Add to front
    profile.recentlyViewed.unshift(view);

    // Keep only last 10
    if (profile.recentlyViewed.length > 10) {
      profile.recentlyViewed = profile.recentlyViewed.slice(0, 10);
    }

    this.saveProfile(profile);
    return profile;
  },

  // Bookmark content
  toggleBookmark(profile: UserProfile, contentId: string): UserProfile {
    const index = profile.bookmarkedContent.indexOf(contentId);
    
    if (index > -1) {
      profile.bookmarkedContent.splice(index, 1);
    } else {
      profile.bookmarkedContent.push(contentId);
    }

    this.saveProfile(profile);
    return profile;
  },

  // Check if content is bookmarked
  isBookmarked(profile: UserProfile, contentId: string): boolean {
    return profile.bookmarkedContent.includes(contentId);
  },

  // Get user stats
  getUserStats(profile: UserProfile): UserStats {
    const totalQuizzes = profile.completedQuizzes.length;
    return {
      totalPoints: profile.totalPoints,
      lessonCount: profile.completedLessons.length,
      quizCount: totalQuizzes,
      accuracy: totalQuizzes > 0 ? 85 + Math.random() * 15 : 0, // Mock accuracy
      streakDays: profile.streakDays,
      level: profile.currentLevel,
      badges: Math.floor(profile.totalPoints / 250),
    };
  },

  // Reset profile (for testing)
  resetProfile(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Export user data (for GDPR)
  exportUserData(profile: UserProfile): string {
    return JSON.stringify(profile, null, 2);
  },

  // Import user data
  importUserData(jsonData: string): UserProfile {
    try {
      const profile = JSON.parse(jsonData) as UserProfile;
      this.saveProfile(profile);
      return profile;
    } catch (error) {
      throw new Error("Invalid user data format");
    }
  },
};

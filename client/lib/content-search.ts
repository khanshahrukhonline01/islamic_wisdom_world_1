// Content search and filtering service
// Provides full-text search, filtering, and discovery features

import { CONTENT_ITEMS } from "./content";
import type { LocalizedContent, ContentTranslation } from "./content";

export interface SearchFilters {
  contentType?: "quran" | "hadith" | "lecture";
  language?: string;
  dialect?: string;
  searchTerm?: string;
  sortBy?: "relevance" | "date" | "popularity";
}

export interface SearchResult {
  id: string;
  title: string;
  contentType: string;
  language: string;
  excerpt: string;
  matchScore: number;
  matchedField: string;
}

// Simple fuzzy search implementation
const levenshteinDistance = (s1: string, s2: string): number => {
  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) matrix[i][0] = i;
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[len1][len2];
};

const calculateFuzzyMatch = (query: string, text: string): number => {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();

  // Exact match
  if (textLower === queryLower) return 100;

  // Contains match
  if (textLower.includes(queryLower)) return 90;

  // Word match
  const words = textLower.split(/\s+/);
  if (words.some((w) => w.includes(queryLower))) return 75;

  // Fuzzy match using Levenshtein distance
  const maxDistance = Math.max(queryLower.length, 20);
  const distance = levenshteinDistance(queryLower, textLower.substring(0, queryLower.length + 5));
  const similarity = Math.max(0, 100 - (distance * 100) / maxDistance);

  return similarity > 40 ? similarity : 0;
};

export const ContentSearchService = {
  // Search content by term
  search(filters: SearchFilters): SearchResult[] {
    const results: SearchResult[] = [];

    CONTENT_ITEMS.forEach((item) => {
      // Apply type filter
      if (filters.contentType && item.type !== filters.contentType) {
        return;
      }

      // Get translations for current language
      const translations = item.translations || {};
      const langKeys = Object.keys(translations);

      langKeys.forEach((lang) => {
        // Apply language filter
        if (filters.language && lang !== filters.language) {
          return;
        }

        const translation = translations[lang];
        if (!translation) return;

        // Calculate match score
        let titleScore = 0;
        let contentScore = 0;
        let matchedField = "";

        if (filters.searchTerm) {
          const query = filters.searchTerm.toLowerCase();

          // Search in title
          titleScore = calculateFuzzyMatch(query, translation.title);

          // Search in content
          contentScore = calculateFuzzyMatch(query, translation.content.substring(0, 200));

          // Only include if there's a match
          if (titleScore === 0 && contentScore === 0) {
            return;
          }

          // Prioritize title matches
          matchedField = titleScore > contentScore ? "title" : "content";
        }

        const finalScore = Math.max(titleScore, contentScore) || 50; // Default score if no search term

        results.push({
          id: item.id,
          title: translation.title,
          contentType: item.type,
          language: lang,
          excerpt: translation.content.substring(0, 150) + "...",
          matchScore: finalScore,
          matchedField,
        });
      });
    });

    // Apply sorting
    results.sort((a, b) => {
      switch (filters.sortBy) {
        case "date":
          return b.matchScore - a.matchScore;
        case "popularity":
          return b.matchScore - a.matchScore;
        case "relevance":
        default:
          return b.matchScore - a.matchScore;
      }
    });

    return results;
  },

  // Get content by ID and language
  getContent(contentId: string, language: string): LocalizedContent | null {
    const item = CONTENT_ITEMS.find((c) => c.id === contentId);
    if (!item) return null;

    const translation = item.translations?.[language];
    if (!translation) return null;

    return {
      id: item.id,
      type: item.type,
      title: translation.title,
      content: translation.content,
      source: translation.source,
      author: translation.author,
      translations: item.translations || {},
      dialects: item.dialects || {},
    };
  },

  // Get all content types
  getContentTypes(): string[] {
    const types = new Set(CONTENT_ITEMS.map((item) => item.type));
    return Array.from(types);
  },

  // Get available languages for content
  getAvailableLanguages(contentId?: string): string[] {
    if (contentId) {
      const item = CONTENT_ITEMS.find((c) => c.id === contentId);
      if (!item) return [];
      return Object.keys(item.translations || {});
    }

    const languages = new Set<string>();
    CONTENT_ITEMS.forEach((item) => {
      Object.keys(item.translations || {}).forEach((lang) => languages.add(lang));
    });
    return Array.from(languages);
  },

  // Autocomplete suggestions
  getSearchSuggestions(query: string, limit: number = 5): string[] {
    if (!query || query.length < 2) {
      return [];
    }

    const suggestions = new Set<string>();

    CONTENT_ITEMS.forEach((item) => {
      const translations = item.translations || {};
      Object.values(translations).forEach((translation) => {
        // Add title
        if (
          calculateFuzzyMatch(query, translation.title) > 40 &&
          suggestions.size < limit
        ) {
          suggestions.add(translation.title);
        }

        // Add author
        if (
          translation.author &&
          calculateFuzzyMatch(query, translation.author) > 40 &&
          suggestions.size < limit
        ) {
          suggestions.add(translation.author);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  },

  // Get recommended content based on recently viewed
  getRecommendations(
    recentlyViewed: string[],
    language: string,
    limit: number = 3
  ): SearchResult[] {
    if (recentlyViewed.length === 0) {
      // Return random suggestions
      const random = CONTENT_ITEMS.sort(() => Math.random() - 0.5).slice(0, limit);
      return random.map((item) => {
        const translation = item.translations?.[language];
        return {
          id: item.id,
          title: translation?.title || item.id,
          contentType: item.type,
          language,
          excerpt: translation?.content.substring(0, 100) + "..." || "",
          matchScore: 70,
          matchedField: "recommendation",
        };
      });
    }

    // Find similar content based on type
    const viewedItem = CONTENT_ITEMS.find((c) => c.id === recentlyViewed[0]);
    if (!viewedItem) return [];

    const similar = CONTENT_ITEMS.filter(
      (item) => item.type === viewedItem.type && item.id !== viewedItem.id
    )
      .slice(0, limit)
      .map((item) => {
        const translation = item.translations?.[language];
        return {
          id: item.id,
          title: translation?.title || item.id,
          contentType: item.type,
          language,
          excerpt: translation?.content.substring(0, 100) + "..." || "",
          matchScore: 65,
          matchedField: "similar",
        };
      });

    return similar;
  },

  // Trending content (mock - based on content type distribution)
  getTrendingContent(language: string, limit: number = 5): SearchResult[] {
    const types = this.getContentTypes();
    const trending: SearchResult[] = [];

    types.forEach((type) => {
      const items = CONTENT_ITEMS.filter((item) => item.type === type);
      if (items.length > 0) {
        const item = items[0];
        const translation = item.translations?.[language];
        if (translation) {
          trending.push({
            id: item.id,
            title: translation.title,
            contentType: type,
            language,
            excerpt: translation.content.substring(0, 100) + "...",
            matchScore: 80,
            matchedField: "trending",
          });
        }
      }
    });

    return trending.slice(0, limit);
  },
};

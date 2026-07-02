import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Bookmark, BookmarkCheck, Filter, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { UserProgressService } from "@/lib/user-progress-service";
import { ContentSearchService, type SearchResult, type SearchFilters } from "@/lib/content-search";

export default function ContentDiscovery() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [sortBy, setSortBy] = useState<"relevance" | "date" | "popularity">("relevance");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userProfile, setUserProfile] = useState(UserProgressService.getOrCreateProfile());
  const [activeTab, setActiveTab] = useState<"search" | "recent" | "bookmarks" | "trending">("search");

  const contentTypes = ["quran", "hadith", "lecture"];

  // Perform search
  useEffect(() => {
    const filters: SearchFilters = {
      searchTerm: searchTerm || undefined,
      contentType: filterType as any || undefined,
      sortBy,
    };

    const searchResults = ContentSearchService.search(filters);
    setResults(searchResults);

    // Show suggestions only if there's input
    if (searchTerm.length > 1) {
      setSuggestions(ContentSearchService.getSearchSuggestions(searchTerm));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, filterType, sortBy]);

  // Load different tabs
  const loadTab = (tab: string) => {
    setActiveTab(tab as any);

    if (tab === "trending") {
      const trending = ContentSearchService.getTrendingContent("en", 10);
      setResults(trending);
    } else if (tab === "bookmarks") {
      const bookmarkedIds = userProfile.bookmarkedContent;
      const filters: SearchFilters = { sortBy: "relevance" };
      const allResults = ContentSearchService.search(filters);
      const filtered = allResults.filter((r) => bookmarkedIds.includes(r.id));
      setResults(filtered);
    } else if (tab === "recent") {
      const recentIds = userProfile.recentlyViewed.map((v) => v.contentId);
      const filters: SearchFilters = { sortBy: "relevance" };
      const allResults = ContentSearchService.search(filters);
      const filtered = allResults.filter((r) => recentIds.includes(r.id));
      setResults(filtered.reverse());
    }
  };

  const toggleBookmark = (contentId: string) => {
    const updated = UserProgressService.toggleBookmark(userProfile, contentId);
    setUserProfile(updated);
  };

  const isBookmarked = (contentId: string) => {
    return UserProgressService.isBookmarked(userProfile, contentId);
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <AppLayout>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <div className="space-y-6 mb-12">
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Discover Content
            </h1>
            <p className="text-xl text-foreground/70">
              Search through Quran, Hadith, and lectures in multiple languages
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                className="w-full pl-12 pr-4 py-3 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-primary/10 rounded-lg shadow-lg z-10">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-primary/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Search className="w-4 h-4 inline mr-2 text-foreground/40" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-3 mt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-foreground/60" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  {contentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-primary/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Most Relevant</option>
                <option value="date">Newest</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 border-b border-primary/10 overflow-x-auto">
          <button
            onClick={() => loadTab("search")}
            className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
              activeTab === "search"
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Search Results
          </button>
          <button
            onClick={() => loadTab("trending")}
            className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "trending"
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
          <button
            onClick={() => loadTab("recent")}
            className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
              activeTab === "recent"
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => loadTab("bookmarks")}
            className={`px-4 py-3 font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === "bookmarks"
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Bookmarks ({userProfile.bookmarkedContent.length})
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Search className="w-16 h-16 mx-auto text-foreground/20" />
              <h3 className="text-lg font-semibold text-foreground">
                {activeTab === "search"
                  ? "No content found"
                  : `No ${activeTab} content`}
              </h3>
              <p className="text-foreground/60">
                {activeTab === "search"
                  ? "Try different search terms or filters"
                  : `Start ${activeTab === "bookmarks" ? "bookmarking" : "reading"} content`}
              </p>
            </div>
          ) : (
            results.map((result) => (
              <div
                key={`${result.id}-${result.language}`}
                className="bg-white border border-primary/10 rounded-lg p-6 hover:border-primary/30 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-foreground truncate">
                        {result.title}
                      </h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded whitespace-nowrap">
                        {result.contentType}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {result.excerpt}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleBookmark(result.id)}
                    className="flex-shrink-0 p-2 hover:bg-primary/10 rounded-lg transition-colors"
                    title={isBookmarked(result.id) ? "Remove bookmark" : "Add bookmark"}
                  >
                    {isBookmarked(result.id) ? (
                      <BookmarkCheck className="w-5 h-5 text-primary" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-foreground/40" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <span className="text-xs text-foreground/60">
                    Language: {result.language}
                  </span>
                  {result.matchScore > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${Math.min(result.matchScore, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-foreground/60">
                        {Math.round(result.matchScore)}% match
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/learn/content?contentId=${result.id}&language=${result.language}`}
                  className="inline-block mt-2"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg text-sm">
                    Read Full Content →
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {results.length > 0 && (
          <div className="mt-12 pt-8 border-t border-primary/10">
            <p className="text-center text-sm text-foreground/60">
              Showing {results.length} result{results.length !== 1 ? "s" : ""}
              {filterType && ` for ${filterType}`}
            </p>
          </div>
        )}
      </main>
    </AppLayout>
  );
}

import CoursesGrid from "@/components/course/CoursesGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCourses } from "@/hooks/Courses";
import {
  Filter,
  Search,
  X,
  BookOpen,
  TrendingUp,
  Award,
  DollarSign,
  Star,
  Grid3x3,
  List,
  SlidersHorizontal,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { m } from "framer-motion";

const Courses = () => {
  const {
    data: allCourses,
    isLoading: coursesLoading,
    isError: coursesError,
    refetch: refetchCourses,
    error: coursesErrorMessage,
  } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedLevel, setSelectedLevel] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Data Science",
  ];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const priceRanges = ["Free", "Under $50", "$50-$100", "$100+"];
  const ratings = ["4.5 & up", "4.0 & up", "3.5 & up"];

  const filteredCourses = allCourses?.data.filter((course) => {
    const matchesSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      course.category.name.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLevel = !selectedLevel || course.level === selectedLevel;

    let matchesPrice = true;
    if (priceRange === "Free") matchesPrice = course.price === 0;
    else if (priceRange === "Under $50") matchesPrice = course.price < 50;
    else if (priceRange === "$50-$100")
      matchesPrice = course.price >= 50 && course.price <= 100;
    else if (priceRange === "$100+") matchesPrice = course.price > 100;

    let matchesRating = true;
    // if (rating === "4.5 & up") matchesRating = course.rating >= 4.5;
    // else if (rating === "4.0 & up") matchesRating = course.rating >= 4.0;
    // else if (rating === "3.5 & up") matchesRating = course.rating >= 3.5;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesPrice &&
      matchesRating
    );
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedLevel("");
    setPriceRange("");
    setRating("");
    setSearchQuery("");
    setSearchParams({});
  };

  const activeFiltersCount = [
    selectedCategory,
    selectedLevel,
    priceRange,
    rating,
  ].filter(Boolean).length;

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    setSearchParams(params);
  }, [searchQuery, selectedCategory, setSearchParams]);

  if (coursesLoading && !allCourses) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border/50 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Explore Our Courses
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Discover Your Next Learning Adventure
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our extensive collection of courses and find the
              perfect match for your learning goals
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-2 shadow-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                  <Input
                    placeholder="Search for courses by title, instructor, or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-14 bg-background/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/50 text-base rounded-xl"
                  />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </m.section>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          {/* Filter Controls & View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden group hover:border-primary/50 transition-all duration-200"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="default" className="ml-2 h-5 px-1.5 min-w-5">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">
                  {filteredCourses?.length || 0}
                </span>
                <span>courses found</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-xl border border-border/50">
                <span className="text-sm font-medium text-muted-foreground mr-2">
                  Active filters:
                </span>
                {selectedCategory && (
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 group hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <BookOpen className="h-3 w-3" />
                      {selectedCategory}
                      <X
                        className="h-3 w-3 group-hover:text-destructive transition-colors"
                        onClick={() => setSelectedCategory("")}
                      />
                    </Badge>
                  </m.div>
                )}
                {selectedLevel && (
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 group hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <TrendingUp className="h-3 w-3" />
                      {selectedLevel}
                      <X
                        className="h-3 w-3 group-hover:text-destructive transition-colors"
                        onClick={() => setSelectedLevel("")}
                      />
                    </Badge>
                  </m.div>
                )}
                {priceRange && (
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 group hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <DollarSign className="h-3 w-3" />
                      {priceRange}
                      <X
                        className="h-3 w-3 group-hover:text-destructive transition-colors"
                        onClick={() => setPriceRange("")}
                      />
                    </Badge>
                  </m.div>
                )}
                {rating && (
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1.5 group hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <Star className="h-3 w-3" />
                      {rating}
                      <X
                        className="h-3 w-3 group-hover:text-destructive transition-colors"
                        onClick={() => setRating("")}
                      />
                    </Badge>
                  </m.div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto h-7 text-xs hover:text-destructive"
                >
                  Clear all
                </Button>
              </div>
            </m.div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <m.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-80 space-y-4 sticky top-8 self-start"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="default" className="h-5 px-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>

                {/* Category Filter */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Category</h4>
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center space-x-3 group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={(checked) =>
                            setSelectedCategory(checked ? category : "")
                          }
                          className="border-2"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Level Filter */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Level</h4>
                  </div>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <label
                        key={level}
                        className="flex items-center space-x-3 group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={level}
                          checked={selectedLevel === level}
                          onCheckedChange={(checked) =>
                            setSelectedLevel(checked ? level : "")
                          }
                          className="border-2"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                          {level}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Filter */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Price</h4>
                  </div>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range}
                        className="flex items-center space-x-3 group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={range}
                          checked={priceRange === range}
                          onCheckedChange={(checked) =>
                            setPriceRange(checked ? range : "")
                          }
                          className="border-2"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Rating Filter */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Rating</h4>
                  </div>
                  <div className="space-y-2">
                    {ratings.map((ratingOption) => (
                      <label
                        key={ratingOption}
                        className="flex items-center space-x-3 group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={ratingOption}
                          checked={rating === ratingOption}
                          onCheckedChange={(checked) =>
                            setRating(checked ? ratingOption : "")
                          }
                          className="border-2"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                          {ratingOption}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <>
                    <Separator className="my-6" />
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All Filters
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-blue-500/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  Quick Stats
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Courses</span>
                    <Badge variant="secondary">
                      {allCourses?.data.length || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Filtered</span>
                    <Badge variant="default">
                      {filteredCourses?.length || 0}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </m.aside>

          {/* Mobile Filter Overlay */}
          <AnimatePresence>
            {showFilters && (
              <>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                  onClick={() => setShowFilters(false)}
                />
                <m.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="lg:hidden fixed inset-y-0 left-0 w-full max-w-sm bg-background z-50 overflow-y-auto shadow-2xl border-r border-border"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Filter className="h-5 w-5 text-primary" />
                        Filters
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowFilters(false)}
                        className="hover:bg-muted"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {/* Category */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">
                            Category
                          </h4>
                        </div>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Level */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">
                            Level
                          </h4>
                        </div>
                        <Select
                          value={selectedLevel}
                          onValueChange={setSelectedLevel}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="All Levels" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="">All Levels</SelectItem>
                            {levels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Price */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">
                            Price
                          </h4>
                        </div>
                        <Select
                          value={priceRange}
                          onValueChange={setPriceRange}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="All Prices" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="">All Prices</SelectItem>
                            {priceRanges.map((range) => (
                              <SelectItem key={range} value={range}>
                                {range}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      {/* Rating */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="h-4 w-4 text-primary" />
                          <h4 className="font-semibold text-foreground">
                            Rating
                          </h4>
                        </div>
                        <Select value={rating} onValueChange={setRating}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="All Ratings" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="">All Ratings</SelectItem>
                            {ratings.map((ratingOption) => (
                              <SelectItem
                                key={ratingOption}
                                value={ratingOption}
                              >
                                {ratingOption}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-6 border-t border-border">
                        <Button
                          onClick={clearFilters}
                          variant="outline"
                          className="flex-1 h-11 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear All
                        </Button>
                        <Button
                          onClick={() => setShowFilters(false)}
                          className="flex-1 h-11 bg-primary hover:bg-primary/90"
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                </m.div>
              </>
            )}
          </AnimatePresence>

          {/* Courses Grid */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            {filteredCourses && filteredCourses.length > 0 ? (
              <CoursesGrid
                courses={filteredCourses}
                isLoading={coursesLoading}
                isError={coursesError}
                error={coursesErrorMessage?.message}
                refetch={refetchCourses}
              />
            ) : (
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-12 max-w-lg mx-auto">
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <Search className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No courses found
                  </h3>
                  <p className="text-muted-foreground mb-6 text-base">
                    We couldn't find any courses matching your criteria. Try
                    adjusting your filters or search terms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear all filters
                    </Button>
                    <Button
                      onClick={() => setSearchQuery("")}
                      variant="default"
                      className="gap-2"
                    >
                      <Search className="h-4 w-4" />
                      Clear search
                    </Button>
                  </div>
                </Card>
              </m.div>
            )}
          </m.div>
        </div>
      </div>
    </main>
  );
};

export default Courses;

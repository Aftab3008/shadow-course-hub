import CourseCard from "@/components/course/CourseCard";
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
import { useCourses } from "@/hooks/Courses";
import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedCategory}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedCategory("")}
                  />
                </Badge>
              )}
              {selectedLevel && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {selectedLevel}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedLevel("")}
                  />
                </Badge>
              )}
              {priceRange && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {priceRange}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setPriceRange("")}
                  />
                </Badge>
              )}
              {rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {rating}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setRating("")}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Courses"}
            </h1>
            <span className="text-muted-foreground">
              {filteredCourses.length} courses found
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-80 space-y-6">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Filters</h3>

                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-foreground">Category</h4>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategory === category}
                        onCheckedChange={(checked) =>
                          setSelectedCategory(checked ? category : "")
                        }
                      />
                      <label
                        htmlFor={category}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-foreground">Level</h4>
                  {levels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={selectedLevel === level}
                        onCheckedChange={(checked) =>
                          setSelectedLevel(checked ? level : "")
                        }
                      />
                      <label
                        htmlFor={level}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-foreground">Price</h4>
                  {priceRanges.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={range}
                        checked={priceRange === range}
                        onCheckedChange={(checked) =>
                          setPriceRange(checked ? range : "")
                        }
                      />
                      <label
                        htmlFor={range}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {range}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Rating</h4>
                  {ratings.map((ratingOption) => (
                    <div
                      key={ratingOption}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={ratingOption}
                        checked={rating === ratingOption}
                        onCheckedChange={(checked) =>
                          setRating(checked ? ratingOption : "")
                        }
                      />
                      <label
                        htmlFor={ratingOption}
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {ratingOption}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-background z-50 overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Filters
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Mobile filter content - similar to desktop but in mobile layout */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">
                      Category
                    </h4>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
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

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Level</h4>
                    <Select
                      value={selectedLevel}
                      onValueChange={setSelectedLevel}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
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

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Price</h4>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
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

                  <div>
                    <h4 className="font-medium text-foreground mb-3">Rating</h4>
                    <Select value={rating} onValueChange={setRating}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="">All Ratings</SelectItem>
                        {ratings.map((ratingOption) => (
                          <SelectItem key={ratingOption} value={ratingOption}>
                            {ratingOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="flex-1"
                    >
                      Clear All
                    </Button>
                    <Button
                      onClick={() => setShowFilters(false)}
                      className="flex-1"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            {filteredCourses.length > 0 ? (
              <CoursesGrid
                courses={filteredCourses}
                isLoading={coursesLoading}
                isError={coursesError}
                error={coursesErrorMessage?.message}
                refetch={refetchCourses}
              />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Courses;

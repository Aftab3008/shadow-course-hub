import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseById } from "@/hooks/Courses";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cart.store";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseHeader from "./CourseHeader";
import Curriculum from "./Curriculum";
import Instructor from "./Instructor";
import Overview from "./Overview";
import Reviews from "./Reviews";
import Sidecard from "./Sidecard";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  const { addToCart, isInCart, removeFromCart } = useCartStore();
  const courseInCart = isInCart(courseId);
  const { data: course, isLoading: isCourseLoading } = useCourseById(courseId);
  const currentTab = searchParams.get("tab") || "overview";

  const handleAddToCart = () => {
    if (courseInCart) {
      removeFromCart(courseId);
      toast({
        title: "Removed from cart",
        description: "Course has been removed from your cart.",
      });
    } else {
      addToCart({
        courseId: courseId,
        title: course?.data.title,
        price: course?.data.price,
        OriginalPrice: course?.data.OriginalPrice,
        thumbnail: course?.data.thumbnail,
        level: course?.data.level,
        instructor: {
          name: course?.data.instructor.name,
          profileUrl: course?.data.instructor.profileUrl,
        },
        duration: course?.data.duration,
      });
      toast({
        title: "Added to cart!",
        description: "Course has been added to your cart.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
          <div className="xl:col-span-2 space-y-8">
            <CourseHeader
              category={course?.data.category}
              level={course?.data.level}
              duration={course?.data.duration}
              description={course?.data.description}
              language={course?.data.language}
              title={course?.data.title}
              instructor={course?.data.instructor}
              reviewsLength={course?.data.reviews?.length || 0}
              enrollements={course?.data.enrollments?.length || 0}
              isLoading={isCourseLoading}
            />

            <div className="bg-card border border-border rounded-xl shadow-sm w-full">
              <Tabs
                value={currentTab}
                onValueChange={(value) => setSearchParams({ tab: value })}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-muted/50 m-2 rounded-lg h-auto p-1 mt-4">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 py-2 px-4 text-sm font-medium"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="curriculum"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 py-2 px-4 text-sm font-medium"
                  >
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 py-2 px-4 text-sm font-medium"
                  >
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 py-2 px-4 text-sm font-medium"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent
                    value="overview"
                    className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-300"
                  >
                    <Overview
                      briefDescription={course?.data.briefDescription}
                      objectives={course?.data.objectives}
                      requirements={course?.data.requirements}
                      isLoading={isCourseLoading}
                    />
                  </TabsContent>

                  <TabsContent
                    value="curriculum"
                    className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-300"
                  >
                    <Curriculum
                      isLoading={isCourseLoading}
                      courseDuration={course?.data.duration}
                      sections={course?.data.sections}
                    />
                  </TabsContent>

                  <TabsContent
                    value="instructor"
                    className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-300"
                  >
                    <Instructor
                      profileUrl={course?.data.instructor?.profileUrl}
                      name={course?.data.instructor?.name}
                      enrolledStudents={course?.data.enrollments?.length}
                      isLoading={isCourseLoading}
                    />
                  </TabsContent>

                  <TabsContent
                    value="reviews"
                    className="mt-0 animate-in fade-in-0 slide-in-from-right-1 duration-300"
                  >
                    <Reviews
                      reviews={course?.data.reviews}
                      isLoading={isCourseLoading}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          <div className="xl:col-span-1">
            <Sidecard
              id={courseId}
              level={course?.data.level}
              duration={course?.data.duration}
              thumbnail={course?.data.thumbnail}
              title={course?.data.title}
              price={course?.data.price}
              OriginalPrice={course?.data.OriginalPrice}
              isEnrolled={isEnrolled}
              courseInCart={courseInCart}
              isLoading={isCourseLoading}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;

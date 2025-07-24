import CourseDetailSkeleton from "@/components/shared/skeletons/CourseDetailSkeleton";
import CourseDetailsForm from "./CourseDetailsForm";

export default function CourseDetails({
  title,
  price,
  description,
  briefDescription,
  requirements,
  objectives,
  language,
  category,
  level,
  isLoading,
}: {
  title: string;
  price: number;
  description: string;
  briefDescription: string;
  requirements: string[];
  objectives: string[];
  language: string;
  category: { name: string };
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  return (
    <CourseDetailsForm
      title={title}
      price={price}
      description={description}
      category={category}
      level={level}
      briefDescription={briefDescription}
      requirements={requirements}
      objectives={objectives}
      language={language}
    />
  );
}

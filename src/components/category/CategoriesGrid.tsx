import { Category } from "@/types";
import CategoryCard from "./CategoryCard";

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid = ({ categories }: CategoriesGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
};

export default CategoriesGrid;

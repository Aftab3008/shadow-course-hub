
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/courses?category=${category.slug}`}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-border bg-card">
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground">{category.courses}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;

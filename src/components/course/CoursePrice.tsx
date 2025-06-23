
interface CoursePriceProps {
  price: number;
  originalPrice?: number;
}

const CoursePrice = ({ price, originalPrice }: CoursePriceProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-lg font-bold text-foreground">${price}</span>
      {originalPrice && (
        <span className="text-sm text-muted-foreground line-through">
          ${originalPrice}
        </span>
      )}
    </div>
  );
};

export default CoursePrice;

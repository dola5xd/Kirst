import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

function StarComponent({ ratingValue }: { ratingValue: number }) {
  const maxStars = 5;
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex space-x-1">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <BsStarFill className="fill-yellow-500" key={`full-${index}`} />
        ))}

      {hasHalfStar && <BsStarHalf key="half" className="fill-yellow-500" />}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <BsStar key={`empty-${index}`} />
        ))}
    </div>
  );
}

export default StarComponent;

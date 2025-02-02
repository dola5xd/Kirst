import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { SanityDocument } from "next-sanity";
import { urlFor } from "../_lib/client";

function CategoryCard({ category }: { category: SanityDocument }) {
  const { title, image } = category;

  const imageUrl = image
    ? urlFor(image)
        ?.width(278)
        .height(
          title === "Woman"
            ? 725
            : title === "Men"
              ? 350
              : title === "Shoes"
                ? 350
                : 460
        )
        .format("webp")
        .url()
    : null;

  return (
    <div className="h-[500px] w-full md:w-[calc(50%_-_25px)] xl:w-full py-3 xl:py-7 rounded-lg hover:scale-95 duration-700 flex flex-col justify-between bg-[#fafafa]">
      <h2
        className={`text-[#eaeaea] font-bold text-7xl xl:text-7xl text-center pointer-events-none`}
      >
        {title}
      </h2>

      <div className="relative w-full h-[75%] flex items-center justify-center overflow-hidden">
        {imageUrl && (
          <div
            className={`relative w-full h-full ${
              title === "Shoes"
                ? "rotate-[30deg] translate-x-10 -translate-y-10"
                : ""
            }`}
          >
            <Image
              src={imageUrl}
              fill
              className={`object-contain ${
                title === "Shoes" ? "scale-125" : "object-center"
              }`}
              alt={title}
            />
          </div>
        )}
      </div>

      <Link
        href={
          title === "Men"
            ? "/shop?category=Men%27s+Clothes"
            : title === "Woman"
              ? "/shop?category=Women%27s+Clothes"
              : title === "Kids"
                ? "/shop?category=kid%27s+Clothes"
                : "/shop?category=Footwear"
        }
        className="self-center"
      >
        <Button
          title={title}
          type="secondary"
          className="z-10 mb-7 py-3 px-12 text-lg scale-90 font-semibold rounded-lg ring-black hover:ring-transparent duration-500"
        >
          {title}
        </Button>
      </Link>
    </div>
  );
}

export default CategoryCard;

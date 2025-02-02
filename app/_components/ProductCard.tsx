"use client";

import Image from "next/image";
import { SanityDocument } from "next-sanity";
import { urlFor } from "../_lib/client";
import { haveDiscount } from "../_lib/productsApi";
import ProductBtns from "./ProductBtns";
import { useEffect, useState } from "react";

function ProductCard({
  bestSellar = false,
  product,
}: {
  bestSellar?: boolean;
  product: SanityDocument;
}) {
  const { title, price, description, image, inStock, _id } = product;
  const [discount, setDiscount] = useState<SanityDocument | null>(null);
  const [discountPrice, setDiscountPrice] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDiscount = async () => {
      const discountData = await haveDiscount(title);
      setDiscount(discountData);
      if (discountData) {
        setDiscountPrice(
          Number(price - (price * discountData.discount) / 100).toFixed(2)
        );
      }
    };

    fetchDiscount();
  }, [title, price]);

  const postImageUrl = image
    ? urlFor(image)?.width(309).height(309).url()
    : null;

  return (
    <div
      {...(!isMobile && { "data-aos": "zoom-in", "data-aos-mirror": "true" })}
      className={`w-full items-center px-10 xl:px-0 xl:items-start ${
        bestSellar
          ? "xl:w-[calc(100%_/_4_-_28px)]"
          : "xl:w-[calc(100%_/_3_-_28px)]"
      } ${!inStock ? "" : "backdrop-grayscale"} group gap-4 flex flex-col`}
    >
      <div
        className={`relative h-64 w-64 xl:w-full ${
          bestSellar ? "xl:h-2/4" : "xl:h-3/4"
        } aspect-square`}
      >
        <Image
          className="object-cover xl:object-contain -z-10 rounded-xl"
          alt={description}
          fill
          src={postImageUrl!}
        />
        <ProductBtns id={_id} />
      </div>
      <div className="flex flex-col text-center xl:items-start gap-y-2 xl:text-start">
        <h1 className="text-xl font-bold">{title}</h1>
        <h3 className="text-base">{String(description).slice(0, 75)}...</h3>
        <p className="flex items-center self-center gap-3 text-lg font-bold text-center xl:self-auto">
          {discount ? (
            <>
              <span>${discountPrice}</span>
              <span className="text-base text-gray-400 line-through decoration-gray-400 decoration-1">
                ${price}
              </span>
              <span className="text-base text-red-500">
                %{discount.discount}
              </span>
            </>
          ) : (
            <span className="text-center">${price}</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;

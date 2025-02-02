"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useUser } from "../context/UserContext";
import { getProductsByIds } from "../_lib/productsApi";
import { SanityDocument } from "next-sanity";
import AosSection from "./AosSection";
import Link from "next/link";

function WishlistProducts() {
  const { user } = useUser();
  const [wishlistProducts, setWishlistProducts] = useState<SanityDocument[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (!user?.wishlist) return null;
      try {
        const products = await getProductsByIds(user.wishlist);
        setWishlistProducts(products);
      } catch (err) {
        if (err instanceof Error) throw new Error("err.message");
        else throw new Error("An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center col-span-7 xl:col-span-8">
        <span className="block border-4 border-gray-300 rounded-full animate-spin h-14 w-14 border-r-indigo-500"></span>
      </div>
    );
  }

  return (
    <AosSection className="flex flex-wrap items-center justify-center col-span-12 md:col-span-8 gap-5 md:gap-10 px-5 md:px-10 py-10 rounded ring-1 ring-black/25">
      {wishlistProducts.length > 0 ? (
        wishlistProducts.map((product) => (
          <ProductCard bestSellar={false} key={product._id} product={product} />
        ))
      ) : (
        <p className="flex flex-col w-full gap-3 text-2xl md:text-3xl font-bold text-center">
          Your wishlist is empty.
          <Link href={"/shop"} className="text-indigo-500 underline">
            Let&apos;s add some!
          </Link>
        </p>
      )}
    </AosSection>
  );
}

export default WishlistProducts;

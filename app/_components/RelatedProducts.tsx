import { Suspense } from "react";
import Loading from "../loading";
import { getProductByCategory } from "../_lib/productsApi";
import ProductCard from "./ProductCard";

async function RelatedProducts({
  Category,
  currentID,
}: {
  Category: string[];
  currentID: string;
}) {
  const products = await getProductByCategory(Category, currentID);
  return (
    <>
      <h1 className="font-light text-4xl">Related Products</h1>
      <div
        data-aos="zoom-in"
        className="flex items-center xl:items-start flex-wrap justify-center gap-10 xl:gap-7"
      >
        <Suspense fallback={<Loading />}>
          {products?.map((product) => (
            <ProductCard bestSellar product={product} key={product._id} />
          ))}
        </Suspense>
      </div>
    </>
  );
}

export default RelatedProducts;

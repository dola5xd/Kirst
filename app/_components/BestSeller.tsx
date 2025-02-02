import { getBestRating } from "../_lib/productsApi";
import ProductCard from "./ProductCard";

async function BestSeller() {
  const products = await getBestRating();

  return (
    <>
      <h1 className="font-light text-4xl">Our Bestseller</h1>
      <div className="flex items-center xl:items-start flex-wrap xl:justify-between gap-10 xl:gap-7">
        {products?.map((product) => (
          <ProductCard bestSellar product={product} key={product._id} />
        ))}
      </div>
    </>
  );
}

export default BestSeller;

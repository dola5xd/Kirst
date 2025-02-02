import { getCategories } from "../_lib/productsApi";
import CategoryCard from "./CategoryCard";

async function ShopByCategory() {
  const categories = await getCategories();
  return (
    <div className="px-7 xl:px-20 py-10 flex flex-col gap-10">
      <h1 className="text-3xl">Shop By Categories</h1>
      <div
        className="flex flex-col md:flex-row md:flex-wrap justify-between xl:flex-nowrap gap-y-7 items-center xl:justify-between gap-4 md:px-20 xl:px-0"
        data-aos="zoom-in"
      >
        {categories?.map((category) => (
          <CategoryCard category={category} key={category._id} />
        ))}
      </div>
    </div>
  );
}

export default ShopByCategory;

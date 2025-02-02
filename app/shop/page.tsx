import { IoIosArrowForward } from "react-icons/io";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Services from "../_components/Services";
import Link from "next/link";
import Filters from "../_components/Filters";
import ProductCard from "../_components/ProductCard";
import { getProducts, getTotalProducts } from "../_lib/productsApi";
import { Suspense } from "react";
import Loading from "../loading";
import Select from "../_components/Select";
import AosSection from "../_components/AosSection";
import Pagination from "../_components/Pagination";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | number | undefined;
  }>;
}) {
  const category = ((await searchParams).category as string[]) || [];
  const sortBy = ((await searchParams).sort as string) || "latest";
  const minPrice = Number((await searchParams).min) || 0;
  const maxPrice = Number((await searchParams).max) || 1000;
  const pageNumber = Number((await searchParams).page) || 1;

  const products = await getProducts(
    pageNumber,
    category,
    minPrice,
    maxPrice,
    sortBy
  );

  const getTotalProductsLength = await getTotalProducts(
    category,
    minPrice,
    maxPrice,
    sortBy
  );
  const numberOfPages = Array.from(
    { length: Math.ceil(getTotalProductsLength / 15) },
    (_, i) => i + 1
  );

  return (
    <>
      <Header />
      <main className="w-full min-h-screen ">
        <section className="min-h-screen px-10 py-10 xl:px-20">
          <p className="flex items-center gap-1 text-xl">
            <Link href={"/shop"}>Shop</Link>
            <span>
              <IoIosArrowForward />
            </span>
            <Link href={"/shop"}>All product</Link>
          </p>

          <div className="grid items-start min-h-screen grid-cols-1 xl:grid-cols-4">
            <Filters />
            {products.length === 0 ? (
              <div className="flex flex-col col-span-1 xl:col-span-3 ">
                {" "}
                <p className="text-3xl text-center">
                  Sorry, our storage doesn&apos;t have
                  <span className="font-bold"> &quot;{category}&quot;</span>
                </p>
                <Link
                  href={"/shop"}
                  prefetch={true}
                  className="w-full text-3xl text-center text-indigo-500 underline"
                >
                  See what we have!
                </Link>
              </div>
            ) : (
              <div className="flex flex-col w-full h-full col-span-1 xl:col-span-3 ">
                <div className="flex items-center justify-between py-4">
                  <p>
                    Showing {(pageNumber - 1) * 15 + 1} -{" "}
                    {Math.min(pageNumber * 15, getTotalProductsLength)} of{" "}
                    {getTotalProductsLength} results
                  </p>
                  <Select />
                </div>

                <AosSection className="flex flex-wrap items-center gap-10 xl:items-start xl:gap-10">
                  <Suspense fallback={<Loading />}>
                    {products?.map((product) => (
                      <ProductCard
                        bestSellar={false}
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </Suspense>
                </AosSection>

                <Pagination
                  numberOfPages={numberOfPages}
                  pageNumber={pageNumber}
                />
              </div>
            )}
          </div>
        </section>
        <section className="py-20">
          <Services />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Page;

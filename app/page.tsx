import { FaArrowRight } from "react-icons/fa";
import Button from "./_components/Button";
import Header from "./_components/Header";
import Image from "next/image";
import Link from "next/link";
import SearchByCategory from "./_components/ShopByCategory";
import BestSeller from "./_components/BestSeller";
import ProductsCount from "./_components/ProductsCount";
import AosSection from "./_components/AosSection";
import Services from "./_components/Services";
import Footer from "./_components/Footer";

export default function Page() {
  return (
    <main className="w-full min-h-screen ">
      <Header />
      <AosSection className="px-4 bg-white">
        <div className="flex flex-col-reverse md:flex-row text-center md:text-start items-center py-20 md:py-0 gap-4 justify-between md:h-screen w-full md:px-10 bg-[#f3f3f3] relative">
          <div className="flex flex-col items-center gap-4 md:items-start md:gap-7 md:pl-20 md:w-1/2">
            <h3 data-aos="zoom-in" className="text-4xl font-semibold">
              Classic Exclusive
            </h3>
            <h1 data-aos="zoom-in" className="text-6xl font-bold">
              Women&apos;s Collection
            </h1>
            <h2 data-aos="zoom-in" className="font-semibold">
              UPTO 40% OFF
            </h2>
            <Link data-aos="zoom-in" href={"/shop"}>
              <Button title="Shop Now!" className="w-full px-4 py-4">
                <span className="flex items-center gap-4 text-base">
                  Shop Now <FaArrowRight />
                </span>
              </Button>
            </Link>
            <span className="text-[#fafafa] text-[150px] leading-loose font-bold absolute bottom-0 right-2/4 tracking-[2rem] select-none opacity-0 xl:opacity-100 pointer-events-none">
              BEST
            </span>
          </div>
          <div
            data-aos="zoom-in"
            className="relative w-full md:left-0 md:w-1/3 aspect-square md:aspect-auto md:h-screen"
          >
            <Image
              fill
              src={"/assets/background/home-bg.png"}
              alt="woman in Red jacket"
              className="object-contain select-none md:object-right "
            />
          </div>
        </div>
      </AosSection>
      <AosSection>
        <SearchByCategory />
      </AosSection>
      <AosSection className="flex flex-col w-full gap-10 py-10 text-center md:px-28">
        <BestSeller />
      </AosSection>
      <AosSection>
        <ProductsCount />
      </AosSection>
      <AosSection className="py-20">
        <Services />
      </AosSection>
      <Footer />
    </main>
  );
}

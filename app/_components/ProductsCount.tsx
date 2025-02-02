import Image from "next/image";
import Button from "./Button";
import { BiArrowToRight } from "react-icons/bi";
import Link from "next/link";

function ProductsCount() {
  return (
    <div
      data-aos="fade-in"
      className="flex flex-col-reverse xl:flex-row items-center justify-between gap-7 px-10 xl:px-32 py-20"
    >
      <div className="flex flex-col gap-7 xl:w-1/2">
        <h1 className="text-5xl font-bold">
          Welcome to
          <span className="text-red-600"> Krist</span>{" "}
        </h1>
        <p className="text-lg xl:text-balance">
          Your ultimate destination for stylish and affordable fashion. Discover
          our exclusive women&apos;s collection with up to 40% off on selected
          items. Whether you&apos;re looking for casual wear or something more
          elegant, we have a wide range of options to suit your style. Shop our
          bestsellers and explore our latest arrivals to find the perfect outfit
          for any occasion. Join us on our fashion journey and elevate your
          wardrobe with Krist. Happy shopping!
        </p>
        <Link href={"/shop"}>
          <Button
            title="View All Products"
            className="py-4 px-4 flex items-center gap-4 self-start"
          >
            View All Products <BiArrowToRight />
          </Button>
        </Link>
      </div>
      <div className="relative w-full xl:w-1/2 aspect-square">
        <Image
          src={"/assets/background/All-Products-bg.png"}
          alt="girl with black jacket"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default ProductsCount;

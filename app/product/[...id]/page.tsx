import AosSection from "@/app/_components/AosSection";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import ProductActions from "@/app/_components/ProductActions";
import RelatedProducts from "@/app/_components/RelatedProducts";
import Services from "@/app/_components/Services";
import StarComponent from "@/app/_components/StarComponent";
import TabsSection from "@/app/_components/TabsSection";
import { getProductByID, haveDiscount } from "@/app/_lib/productsApi";
import { urlFor } from "@/app/_lib/client";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const [productID] = (await params).id;

  const {
    title,
    inStock,
    price,
    image,
    description,
    Colors,
    rating,
    Category,
    _id,
  } = await getProductByID(String(productID));

  const discount = await haveDiscount(title);

  const ratingValue: number =
    rating && rating.length > 0
      ? rating.reduce(
          (prev: number, cur: { Rating: number }) => prev + (cur.Rating || 0),
          0
        ) / 2
      : 0;

  const discountPrice = discount
    ? Number(price - (price * discount?.discount) / 100).toFixed(2)
    : null;

  const imageSrc = urlFor(image)!.format("webp").url();

  return (
    <>
      <Header />
      <p className="flex items-center gap-2 capitalize px-4 *:text-pretty xl:px-10 pt-10 [&>a]:underline font-semibold xl:text-lg *:duration-500 hover:*:text-indigo-500">
        <Link href={"/"}>Home</Link>
        <IoIosArrowForward />
        <Link href={"/shop"}>Shop</Link>
        <IoIosArrowForward />
        {title}
      </p>
      <main className="flex flex-col w-full min-h-screen py-20 md:px-10 gap-y-10">
        <section className="flex flex-col items-start w-full px-10 xl:flex-row gap-7 xl:gap-20 xl:px-0">
          <div className="relative w-full rounded-lg md:self-center md:w-1/2 aspect-square">
            <Image
              src={imageSrc}
              fill
              alt={description}
              className="object-fill rounded-lg"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <ul className="flex flex-col xl:px-10 xl:py-20 gap-7">
              <li className="flex flex-col items-start justify-between gap-3 xl:flex-row xl:items-center">
                <h1 className="text-4xl font-bold">{title}</h1>
                <span
                  className={`px-4 py-2 rounded text-lg font-bold ${
                    inStock
                      ? "bg-green-300 text-green-700"
                      : "bg-red-300 text-red-700"
                  }`}
                >
                  {inStock ? "In Stock" : "Out Stock"}
                </span>
              </li>
              <li>
                <p className="xl:text-lg">{description}</p>
              </li>
              <li>
                <h3 className="text-xl font-bold">Rating</h3>
                <div className="flex items-center space-x-3 text-lg font-semibold">
                  <StarComponent ratingValue={ratingValue} />
                  <p className="text-gray-300">
                    {rating ? ratingValue : 0} ({rating ? rating.length : 0}{" "}
                    Reviews)
                  </p>
                </div>
              </li>
              <li>
                <p className="flex items-center self-center gap-3 text-2xl font-semibold text-center xl:self-auto">
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
              </li>
              <li className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Color</h3>
                <ul className="flex space-x-4">
                  {Colors?.map((color: string) => (
                    <li
                      style={{ backgroundColor: color }}
                      className={`block w-10 rounded h-10  ring-1 ring-black`}
                      key={color}
                    ></li>
                  ))}
                </ul>
              </li>
              <ProductActions id={productID} />
            </ul>
          </div>
        </section>
        <TabsSection desc={description} Colors={Colors} rating={rating} />
        <AosSection className="flex flex-col w-full gap-10 py-10 text-center xl:px-28">
          <RelatedProducts Category={Category} currentID={_id} />
        </AosSection>
        <AosSection>
          <Services />
        </AosSection>
      </main>
      <Footer />
    </>
  );
}

export default page;

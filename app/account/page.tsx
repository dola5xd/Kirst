import Link from "next/link";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import { BsBox2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

import {
  IoCardOutline,
  IoLocationOutline,
  IoPersonOutline,
} from "react-icons/io5";
import InformationForm from "../_components/InformationForm";
import WellcomeUser from "../_components/WellcomeUser";
import AllAddresses from "../_components/AllAddresses";
import WishlistProducts from "../_components/WishlistProducts";
import Cards from "../_components/Cards";
import Orders from "../_components/Orders";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ active: string }>;
}) {
  const activeLink = (await searchParams).active;
  return (
    <>
      <Header />
      <main className="flex flex-col py-10 gap-7 px-5 md:px-10 lg:px-20">
        <h1 className="text-2xl md:text-3xl font-light">My Account</h1>
        <section className="grid justify-center w-full h-full grid-cols-1 md:grid-cols-12 gap-5 md:gap-10">
          <div className="w-full min-h-full col-span-12 md:col-span-4 py-10 border rounded-lg">
            <div className="flex gap-4 pb-4 border-b px-5 md:px-7 border-b-black/50">
              <WellcomeUser pic={true} />
            </div>
            <ul className="flex flex-col gap-y-5 md:gap-y-7 [&>li>a]:duration-500 [&>li>a]:flex [&>li>a]:items-center [&>li>a]:gap-2 [&>li>a]:py-4 [&>li>a]:px-5 md:[&>li>a]:px-10 [&>li>a]:font-semibold [&>li>a]:cursor-pointer [&>li>a]:text-base pt-5">
              <li
                className={activeLink === "info" ? "bg-black text-white" : ""}
              >
                <Link href={"/account?active=info"}>
                  <span className="text-xl">
                    <IoPersonOutline />
                  </span>
                  Personal Information
                </Link>
              </li>
              <li
                className={activeLink === "orders" ? "bg-black text-white" : ""}
              >
                <Link href={"/account?active=orders"} prefetch={true}>
                  <span className="text-2xl">
                    <BsBox2 />
                  </span>
                  My Orders
                </Link>
              </li>
              <li
                className={
                  activeLink === "wishlist" ? "bg-black text-white" : ""
                }
              >
                <Link href={"/account?active=wishlist"} prefetch={true}>
                  <span className="text-2xl">
                    <FaRegHeart />
                  </span>
                  My Wishlists
                </Link>
              </li>
              <li
                className={
                  activeLink === "addresses" ? "bg-black text-white" : ""
                }
              >
                <Link href={"/account?active=addresses"} prefetch={true}>
                  <span className="text-2xl">
                    <IoLocationOutline />
                  </span>
                  Mangage Addresses
                </Link>
              </li>
              <li
                className={activeLink === "cards" ? "bg-black text-white" : ""}
              >
                <Link href={"/account?active=cards"} prefetch={true}>
                  <span className="text-2xl">
                    <IoCardOutline />
                  </span>
                  Saved Cards
                </Link>
              </li>
            </ul>
          </div>
          {activeLink === "info" ? (
            <InformationForm />
          ) : activeLink === "orders" ? (
            <Orders />
          ) : activeLink === "wishlist" ? (
            <WishlistProducts />
          ) : activeLink === "addresses" ? (
            <AllAddresses />
          ) : activeLink === "cards" ? (
            <Cards />
          ) : (
            <div className="flex flex-col items-center col-span-7 xl:col-span-8 border rounded border-black/25 py-7 gap-y-14 [&>h1>span]:text-2xl [&>h1]:text-5xl  [&>h1]:gap-5 ">
              <WellcomeUser />
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default page;

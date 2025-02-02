"use client";
import { CiShoppingCart } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { VscPreview } from "react-icons/vsc";
import { usePathname } from "next/navigation";

function CheckoutSteps() {
  const pathName = usePathname();
  return (
    <div className="w-full py-8 sm:px-6 lg:px-8">
      <ul className="flex items-center justify-between max-w-4xl mx-auto ">
        <li
          className={`flex-1 relative ${pathName === "/cart" ? "active" : ""}`}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors
              ${pathName === "/checkout" || pathName === "/cart" || pathName === "/review" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
            >
              <CiShoppingCart className="sm:text-2xl" />
            </span>
            <span
              className={`text-xs sm:text-sm text-nowrap font-medium ${pathName === "/checkout" || pathName === "/cart" || pathName === "/review" ? "text-black" : "text-gray-400"}`}
            >
              Shopping Cart
            </span>
          </div>
          {pathName === "/cart" ? (
            <div className="absolute w-full h-1 bg-gray-200 top-6 left-1/2 -z-10" />
          ) : pathName === "/checkout" ? (
            <div className="absolute w-full h-1 bg-black top-6 left-1/2 -z-10" />
          ) : (
            <div className="absolute w-full h-1 bg-black top-6 left-1/2 -z-10" />
          )}
        </li>

        <li
          className={`flex-1 relative ${pathName === "/checkout" ? "active" : ""}`}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors
              ${pathName === "/checkout" || pathName === "/review" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}
              ${pathName === "/review" ? "bg-black text-white" : ""}`}
            >
              <IoBagCheckOutline className="sm:text-2xl" />
            </span>
            <span
              className={`text-xs sm:text-sm font-medium 
              ${pathName === "/checkout" || pathName === "/review" ? "text-black" : "text-gray-400"}`}
            >
              Checkout
            </span>
          </div>
          {pathName === "/checkout" || pathName === "/cart" ? (
            <div className="absolute w-full h-1 bg-gray-200 top-6 left-1/2 -z-10" />
          ) : (
            pathName === "/review" && (
              <div className="absolute w-full h-1 bg-black top-6 left-1/2 -z-10" />
            )
          )}
        </li>

        <li
          className={`flex-1 relative ${pathName === "/review" ? "active" : ""}`}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors
              ${pathName === "/review" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}
            >
              <VscPreview className="sm:text-2xl" />
            </span>
            <span
              className={`text-xs sm:text-sm font-medium ${pathName === "/review" ? "text-black" : "text-gray-400"}`}
            >
              Review Order
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CheckoutSteps;

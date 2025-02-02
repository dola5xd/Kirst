"use client";

import Button from "./Button";
import { FaRegEye } from "react-icons/fa";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { addToCart, addToWishList } from "../_lib/userApi";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BsHeartFill } from "react-icons/bs";

function ProductBtns({ id }: { id: string }) {
  const { user, setUser } = useUser();
  const router = useRouter();
  const handleEdit = async () => {
    try {
      setUser(await addToWishList(id));
      if (user?.wishlist?.includes(id, 0))
        toast.success("This Product removed from wishlist successfully!");
      else toast.success("This Product Added to wishlist successfully!");
    } catch (error) {
      if (error instanceof Error)
        toast.error("Please login to be able to add to your wishlist!");
    }
  };

  const handleAddCart = async () => {
    try {
      const product = { id, quantity: 1, size: "s" };
      setUser(await addToCart(product));
      toast.success("This Product Added to your cart successfully!");
    } catch (error) {
      if (error instanceof Error)
        toast.error("Please login to be able to add to your cart!");
      router.push("/login");
    }
  };

  return (
    <div className="z-10 flex flex-col justify-between invisible h-full px-2 duration-700 opacity-0 bg-black/15 py-7 group-hover:visible group-hover:opacity-100 rounded-xl ">
      <div className="flex flex-col flex-grow self-end *:bg-white *:rounded-full *:h-12 *:w-12 *:duration-700 *:flex *:items-center *:justify-center gap-4">
        <Button
          title="Like!"
          type="secondary"
          onClick={handleEdit}
          className={`px-4 py-3 text-lg ${user?.wishlist?.includes(id, 0) ? "*:fill-red-500 *:hover:fill-white" : ""}`}
        >
          {user?.wishlist?.includes(id, 0) ? (
            <BsHeartFill />
          ) : (
            <IoIosHeartEmpty />
          )}
        </Button>
        <Link href={`/product/${id}`}>
          <button
            title="See Product!"
            type="button"
            className="*:hover:fill-red-600 *:duration-500 *:h-6 *:w-6"
          >
            <FaRegEye />
          </button>
        </Link>
      </div>
      {user?.cart?.some((item) => item.id === id) ? (
        <Link
          href="/cart"
          className="self-center py-3 font-bold text-center text-indigo-600 duration-500 bg-white rounded px-7 text-nowrap hover:bg-indigo-500 hover:text-white"
        >
          Visit your Cart!
        </Link>
      ) : (
        <Button
          onClick={handleAddCart}
          type="secondary"
          title="Add to Cart"
          className="self-center w-3/4 py-3"
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}

export default ProductBtns;

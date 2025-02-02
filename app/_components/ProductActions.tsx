"use client";
import { IoIosHeartEmpty } from "react-icons/io";
import Button from "./Button";
import Counter from "./Counter";
import { useUser } from "../context/UserContext";
import { addToCart, addToWishList } from "../_lib/userApi";
import { toast } from "react-toastify";
import SizeSelector from "./SizeSelector";
import { useState } from "react";
import Link from "next/link";
import { BsHeartFill } from "react-icons/bs";

function ProductActions({ id }: { id: string }) {
  const { user, setUser } = useUser();

  const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("S");
  const [quantity, setQuantity] = useState<number>(1);

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
      const product = { id, quantity: quantity, size };
      setUser(await addToCart(product));
      toast.success("This Product Added to your cart successfully!");
    } catch (error) {
      if (error instanceof Error)
        toast.error("Please login to be able to add to your wishlist!");
    }
  };

  return (
    <>
      <li className="flex flex-col gap-1 space-y-3">
        <h3 className="text-2xl font-bold">Size</h3>
        <SizeSelector size={size} setSize={setSize} />
      </li>
      <li>
        <div className="flex flex-wrap-reverse items-center justify-between w-full md:flex-nowrap gap-y-4 md:space-x-7">
          {user?.cart?.some((item) => item.id === id) ? (
            <Link
              href="/cart"
              className="self-center w-full py-3 font-bold text-center text-white duration-500 bg-indigo-500 rounded px-7 text-nowrap hover:bg-opacity-75"
            >
              Visit your Cart!
            </Link>
          ) : (
            <>
              <Counter
                onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
                initialNum={1}
              />
              <Button
                onClick={handleAddCart}
                title="Add to Cart"
                className="w-[calc(100%_-_75px)] px-10 py-3 md:w-2/3"
              >
                Add to Cart
              </Button>
            </>
          )}
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
        </div>
      </li>
    </>
  );
}

export default ProductActions;

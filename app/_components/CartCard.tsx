"use client";
import Image from "next/image";
import Counter from "../_components/Counter";
import { SanityDocument } from "next-sanity";
import { urlFor } from "../_lib/client";
import { updateCartQuantity } from "../_lib/userApi";
import { useUser } from "../context/UserContext";
import { auth } from "../_lib/firebase";
import { useRouter } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { useState } from "react";

function CartCard({
  cartProducts,
  onRemoveItem,
}: {
  cartProducts: SanityDocument;
  onRemoveItem: (itemID: string) => void;
}) {
  const { user, setUser } = useUser();
  const userAuth = auth.currentUser;
  const router = useRouter();

  const { image, title, inStock, price, quantity, _id, size } = cartProducts;

  const imageUrl = image ? urlFor(image)?.width(309).height(309).url() : null;

  const [subtotal, setSubtotal] = useState<number>(price * quantity);

  const handleQuantityChange = async (newQuantity: number) => {
    if (user) {
      const updatedData = await updateCartQuantity(_id, newQuantity);
      setUser(updatedData);
      setSubtotal(price * newQuantity);
    }
  };

  const handleRemoveItem = async () => {
    onRemoveItem(_id);
  };

  if (!userAuth) router.push("/login");

  return (
    <tr className="border-b">
      <th
        scope="row"
        className="flex items-center gap-4 px-4 py-3 sm:px-6 sm:py-4"
      >
        <Image
          alt={title}
          width={50}
          height={50}
          src={imageUrl!}
          className="rounded"
        />
        <div className="flex flex-col w-full font-normal">
          <h1 className="w-32 text-base font-bold truncate sm:text-sm sm:w-48">
            {title}
          </h1>
          <p className="text-xs sm:text-sm">Size: {size}</p>
        </div>
      </th>
      <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">${price}</td>
      <td className="w-1/12 py-3 sm:py-4">
        <Counter
          initialNum={quantity}
          onQuantityChange={handleQuantityChange}
        />
      </td>
      <td className="w-1/6 py-3 text-center sm:py-4 whitespace-nowrap">
        ${subtotal.toFixed(2)}
      </td>
      <td className="px-4 py-3 sm:px-6 sm:py-4">
        {inStock ? (
          <span className="text-green-600">In Stock</span>
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </td>
      <td
        className="px-4 py-3 text-red-500 underline cursor-pointer sm:px-6 sm:py-4"
        onClick={handleRemoveItem}
      >
        <CgClose />
      </td>
    </tr>
  );
}

export default CartCard;

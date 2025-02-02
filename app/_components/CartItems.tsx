"use client";
import CartCard from "../_components/CartCard";
import { Suspense } from "react";
import Loading from "../loading";
import { getProductByID, haveDiscount } from "../_lib/productsApi";
import { useEffect, useState } from "react";
import { SanityDocument } from "next-sanity";
import CheckoutSteps from "./CheckoutSteps";
import { getCart, removeCartItemById } from "../_lib/userApi";
import Link from "next/link";
import { toast } from "react-toastify";

function CartItems() {
  const [cartProducts, setCartProducts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCartProducts = async () => {
    const cartItems = await getCart();
    if (!cartItems) return;
    try {
      setLoading(true);
      const products = await Promise.all(
        cartItems.map(async (cartItem: SanityDocument) => {
          const product = await getProductByID(cartItem.id);
          const discount = await haveDiscount(product.title);
          const realPrice = discount
            ? Number(
                product.price - (product.price * discount.discount) / 100
              ).toFixed(2)
            : product.price;
          return {
            ...product,
            quantity: cartItem.quantity,
            size: cartItem.size,
            price: realPrice,
          };
        })
      );
      setCartProducts(products);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleRemoveItem = async (itemID: string) => {
    try {
      await removeCartItemById(itemID);
      await fetchCartProducts();
      toast.success("Removed successfully");
    } catch (error) {
      toast(error instanceof Error ? error.message : "Unknown Error");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center col-span-12 overflow-x-hidden sm:col-span-12">
        <span className="block border-4 border-gray-300 rounded-full animate-spin h-14 w-14 border-r-indigo-500"></span>
      </div>
    );

  return (
    <>
      <CheckoutSteps />
      <div className="col-span-12 overflow-x-auto sm:col-span-12">
        <table className="w-full text-sm text-left table-auto">
          <thead className="w-full tracking-wider uppercase border-b-2">
            <tr>
              <th scope="col" className="w-2/5 px-4 py-3 sm:px-6 sm:py-4">
                Products
              </th>
              <th scope="col" className="w-1/5 px-4 py-3 sm:px-6 sm:py-4">
                Price
              </th>
              <th scope="col" className="w-1/6 px-4 py-3 sm:px-6 sm:py-4">
                Quantity
              </th>
              <th scope="col" className="w-1/6 px-4 py-3 sm:px-6 sm:py-4">
                Subtotal
              </th>
              <th scope="col" className="w-1/6 px-4 py-3 sm:px-6 sm:py-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            <Suspense fallback={<Loading />}>
              {cartProducts.length > 0 ? (
                cartProducts.map((data: SanityDocument) => (
                  <CartCard
                    cartProducts={data}
                    key={data._id}
                    onRemoveItem={handleRemoveItem}
                  />
                ))
              ) : (
                <tr className="w-full border-b">
                  <td className="w-full py-10 text-xl text-center" colSpan={5}>
                    Sorry, no items in your cart!
                    <br />
                    <Link href={"/shop"} className="font-bold underline">
                      Let&apos;s add some!
                    </Link>
                  </td>
                </tr>
              )}
            </Suspense>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CartItems;

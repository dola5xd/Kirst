"use client";
import { DELIVRY_FEE } from "../_lib/Constants";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { SanityDocument } from "next-sanity";
import { getProductByID } from "../_lib/productsApi";
import Button from "./Button";
import { PaymentType } from "./CartOpertions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { newOrder, submitOrder } from "../_lib/userApi";

export interface orderType {
  id: number;
  paymentID: string;
  paymentAddressID: string;
  cartProducts: SanityDocument[];
  status: "Not Submitted" | "Submitted" | "Delivered" | "In Process";
}

function CartInformations({
  payment,
  step,
  orderID,
}: {
  payment?: PaymentType | null;
  step?: number;
  orderID?: number;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<SanityDocument[]>([]);
  const [submitModal, setSubmitModel] = useState<boolean>(false);
  useEffect(() => {
    const fetchCartProducts = async () => {
      if (!user?.cart) return;
      try {
        const products = await Promise.all(
          user.cart.map(async (cartItem) => {
            const product = await getProductByID(cartItem.id);
            return {
              ...product,
              quantity: cartItem.quantity,
              size: cartItem.size,
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
      }
    };

    fetchCartProducts();
  }, [user?.cart]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartProducts]);

  const handleReview = async () => {
    if (!payment?.Card) return toast.error("No card selected!");
    if (!payment?.Address) return toast.error("No address selected!");
    const id = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / 2);
    const order: orderType = {
      id,
      paymentID: payment.Card,
      paymentAddressID: payment.Address.id,
      cartProducts,
      status: "Not Submitted",
    };
    await newOrder(order);
    router.push(`/review?order=${id}`);
  };

  const SubmitOrder = async () => {
    try {
      await submitOrder(orderID!);
      setSubmitModel(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? "Faild to place Order" : "Unknown error"
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-auto xl:h-[400px] col-span-12 xl:col-span-4 px-4 xl:px-10 border border-black rounded-xl py-7">
        <h1 className="flex justify-between mb-4 font-bold">
          Subtotal{" "}
          <span>${totalPrice ? totalPrice.toFixed(2) : " ---------"}</span>
        </h1>
        <hr className="bg-black" />
        <div className="flex flex-col gap-4 my-4">
          <h4>Enter Discount Code</h4>
          <label
            htmlFor="discount"
            className="flex justify-between border border-black rounded h-14"
          >
            <input
              type="text"
              id="discount"
              placeholder="Enter Code here!"
              className="w-full p-3 rounded"
            />
            <button
              type="button"
              className="h-full text-white duration-500 bg-black rounded px-7 hover:bg-opacity-75"
              title="Apply"
            >
              Apply
            </button>
          </label>
          <h2 className="flex justify-between mb-4">
            Delivery Fee <span>${DELIVRY_FEE.toFixed(2)}</span>
          </h2>
        </div>
        <hr className="bg-black" />
        <h1 className="flex justify-between my-4 font-bold">
          Grand Total{" "}
          <span>
            ${totalPrice ? (totalPrice + DELIVRY_FEE).toFixed(2) : " ---------"}
          </span>
        </h1>

        {user?.cart?.length === 0 ? (
          <Link href={"/shop"}>
            <Button title="Checkout" className="w-full py-4 font-normal">
              Add some Products
            </Button>
          </Link>
        ) : step === 1 ? (
          <Link href={"/checkout"}>
            <Button title="Checkout" className="w-full py-4 font-normal">
              Proceed to Checkout
            </Button>
          </Link>
        ) : step === 2 ? (
          <Button
            title="Order"
            className="py-4 font-normal disabled:cursor-not-allowed disabled:hover:bg-red-500 disabled:hover:text-white"
            onClick={handleReview}
            disabled={!payment?.Card || !payment?.Address}
          >
            Place Order!
          </Button>
        ) : (
          <Button
            title="Order"
            className="py-4 font-normal"
            onClick={SubmitOrder}
          >
            Submit Order!
          </Button>
        )}
      </div>
      {submitModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black/25">
          <div className="flex flex-col items-center w-5/6 px-4 py-10 mb-8 text-center bg-white rounded-lg xl:w-1/3 xl:px-10">
            <div className="flex items-center justify-center w-12 h-12 mx-auto  duration-500 bg-black rounded-full hover:[&::after]:opacity-100 hover:[&::before]:opacity-100 before:opacity-50 after:opacity-50 before:content-[''] before:block before:w-20 before:h-20 before:mx-auto before:bg-black/10 before:absolute before:rounded-full before:duration-500 after:duration-500 after:content-[''] after:block after:w-16 after:h-16 after:mx-auto after:bg-black/25 after:absolute after:rounded-full [&>svg]:z-10 mb-10">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold">Your order is confirmed</h2>
            <p className="mb-6 text-gray-600">
              Thanks for shopping! Your order hasn&apos;t shipped yet, but we
              will send you an email when it&apos;s done.
            </p>

            <div className="flex flex-col justify-center w-full gap-4">
              <Link
                href={"/account?active=orders"}
                className="px-6 py-2 text-white transition bg-black rounded-lg hover:bg-black/75"
              >
                <button type="button">View Order</button>
              </Link>{" "}
              <Link
                href={"/"}
                className="px-6 py-2 transition border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <button type="button">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartInformations;

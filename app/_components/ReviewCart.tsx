"use client";

import { SanityDocument } from "next-sanity";
import { useCallback, useEffect, useState } from "react";
import { getOrder } from "../_lib/userApi";
import { toast } from "react-toastify";
import ReviewProduct from "./ReviewProduct";
import { useUser } from "../context/UserContext";
import Image from "next/image";
import { cardBrandLogos } from "../_lib/Constants";
import { CardType } from "./CheckoutCard";
import { useRouter } from "next/navigation";

function ReviewCart({ orderID }: { orderID: number }) {
  const { user } = useUser();
  const router = useRouter();
  const [orderData, setOrderData] = useState<SanityDocument | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<CardType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCards = useCallback(async () => {
    if (!orderData?.paymentID) {
      console.error("Payment ID is missing");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/payments/${orderData.paymentID}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch payment details: ${response.statusText}`
        );
      }
      const data = await response.json();
      setPaymentDetails(data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      toast.error("Failed to fetch payment details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [orderData?.paymentID]);

  useEffect(() => {
    const fetchOrderAndPayment = async () => {
      try {
        setLoading(true);
        const orderData = await getOrder(orderID);
        setOrderData(orderData);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Authentication required"
        ) {
          router.push("/");
        } else if (
          error instanceof Error &&
          error.message === "Failed to retrieve order"
        ) {
          router.push("/");
        } else {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to load order/payment details"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndPayment();
  }, [orderID, router]);

  useEffect(() => {
    if (user?.userID && orderData?.paymentID) {
      fetchCards();
    }
  }, [fetchCards, user?.userID, orderData?.paymentID]);

  if (loading) {
    return (
      <div className="flex items-center justify-center col-span-12 overflow-hidden">
        <span className="block border-4 border-gray-300 rounded-full animate-spin h-14 w-14 border-r-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-10 rounded">
      <div>
        <h1 className="text-xl font-bold">
          Estimated delivery:{" "}
          {new Date(
            new Date(orderData?.Created_At).getTime() + 7 * 24 * 60 * 60 * 1000
          ).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </h1>
        {orderData?.cartProducts.map((cartProduct: SanityDocument) => (
          <ReviewProduct
            className="border-b border-black/25"
            cartProduct={cartProduct}
            key={cartProduct._id}
          />
        ))}
      </div>

      <div className="flex flex-col border-b gap-7 border-b-black/25 pb-7">
        <h1 className="text-xl font-bold">Shipping Address:</h1>
        <div className="flex flex-col space-y-4">
          {user?.address?.map(
            (address) =>
              orderData?.paymentAddressID === address.id && (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg border-black/25 `}
                >
                  <h3 className="font-bold">{address.Name}</h3>
                  <p>{`${address.street}, ${address.city}, ${address.state} ${address.zip}`}</p>
                  <p>{address.phone}</p>
                </div>
              )
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Payment Method:</h1>
        <div className="flex flex-col space-y-4">
          {paymentDetails?.card ? (
            <div className="flex items-center justify-between p-10 duration-500 border rounded shadow-sm border-black/25 hover:shadow-lg ">
              <div>
                <p className="font-medium">
                  **** **** **** {paymentDetails.card.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {paymentDetails.card.exp_month}/
                  {paymentDetails.card.exp_year}
                </p>
              </div>
              <Image
                src={
                  cardBrandLogos[paymentDetails.card.brand.toLowerCase()] ||
                  cardBrandLogos.unknown
                }
                width={50}
                height={50}
                alt="Card brand logo"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              No payment method details available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewCart;

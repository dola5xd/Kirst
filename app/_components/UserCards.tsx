"use client";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "../context/UserContext";
import { cardBrandLogos } from "../_lib/Constants";
import Image from "next/image";

export interface CardType {
  id: string;
  card: {
    last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
  };
}

function UserCards() {
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [cards, setCards] = useState<CardType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchCards = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/getCards?customerID=${user?.customerID}`
      );
      const data = await response.json();

      if (response.ok) {
        setCards(data.cards || []);
      } else {
        setError(data.error || "Failed to fetch cards.");
      }
    } catch (error) {
      setError("An error occurred while fetching cards.");
      console.error("Error fetching cards:", error);
    } finally {
      setInitialLoading(false);
    }
  }, [user?.customerID]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not initialized.");
      return;
    }

    try {
      setError(null);
      setSuccess(false);
      setIsSubmitting(true);

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)!,
        });

      if (stripeError) {
        setError(stripeError.message || "An error occurred.");
        return;
      }

      const response = await fetch("/api/addCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerID: user?.customerID,
          paymentMethodId: paymentMethod?.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        await fetchCards();
      } else {
        setError(data.error || "Failed to add the card.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Error adding card:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.userID) {
      fetchCards();
    }
  }, [fetchCards, user?.userID]);

  if (initialLoading) {
    return (
      <div className="flex flex-col justify-center col-span-8 ring-1 ring-black/25">
        <span className="self-center block border-4 border-gray-300 rounded-full animate-spin h-14 w-14 border-r-indigo-500"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-12 md:col-span-8 px-5 md:px-10 py-10 rounded gap-y-14 ring-1 ring-black/25">
      <h1 className="text-xl font-bold">Your Cards</h1>

      {error && (
        <div className="flex items-center justify-between p-2 text-red-700 bg-red-100 rounded">
          {error}{" "}
          <button type="button" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {success && (
        <div className="p-2 text-green-700 bg-green-100 rounded">
          Card added successfully!{" "}
          <button type="button" onClick={() => setSuccess(false)}>
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center justify-between px-5 duration-500 border rounded shadow-sm py-7 md:p-10 border-black/25 hover:shadow-lg"
            >
              <div>
                <p className="font-medium">**** **** **** {card.card.last4}</p>
                <p className="text-sm text-gray-500">
                  Expires {card.card.exp_month}/{card.card.exp_year}
                </p>
              </div>
              <span className="text-4xl text-black">
                <Image
                  src={
                    cardBrandLogos[card.card.brand.toLowerCase()] ||
                    cardBrandLogos.unknown
                  }
                  width={50}
                  height={50}
                  alt="brandLogo"
                />
              </span>
            </div>
          ))
        ) : (
          <p>No cards found.</p>
        )}
      </div>

      <form className="flex flex-col max-w-md space-y-4" onSubmit={onSubmit}>
        <label htmlFor="cardElement" className="font-medium">
          Add a New Card
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={!stripe || isSubmitting}
          className="p-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding Card..." : "Add Card"}
        </button>
      </form>
    </div>
  );
}

export default UserCards;

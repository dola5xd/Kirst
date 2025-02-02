import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";
import { useUser } from "../context/UserContext";
import { cardBrandLogos } from "../_lib/Constants";
import Image from "next/image";
import { PaymentType } from "./CartOpertions";
import { toast } from "react-toastify";

export interface CardType {
  id: string;
  card: {
    last4: string;
    brand: string;
    exp_month: number;
    exp_year: number;
  };
}

function CheckoutCard({
  setPayment,
}: {
  setPayment: Dispatch<SetStateAction<null | PaymentType>>;
}) {
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/getCards?customerID=${user?.customerID}`
      );
      const data = await response.json();
      if (response.ok) setCards(data.cards || []);
      else setError(data.error || "Failed to fetch cards.");
    } catch (error) {
      setError("An error occurred while fetching cards.");
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.customerID]);

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return setError("Stripe is not initialized.");

    try {
      setError(null);
      setSuccess(false);
      setLoading(true);

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement)!,
        });

      if (stripeError || !paymentMethod)
        return setError(
          stripeError?.message || "Payment method creation failed."
        );

      const response = await fetch("/api/addCard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerID: user?.customerID,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await response.json();
      if (!response.ok) return setError(data.error || "Failed to add card.");

      setSuccess(true);
      fetchCards();
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast.error("Please select a payment card");
      return setError("Please select a payment card.");
    }
    setPayment((prev) => ({ ...prev!, Card: selectedCard }));
    setSuccess(true);
    toast.success("Card selected successfully");
  };

  useEffect(() => {
    if (user?.userID) fetchCards();
  }, [fetchCards, user?.userID]);

  return (
    <div className="flex flex-col col-span-6 px-4 py-10 rounded xl:px-10 gap-y-14 ring-1 ring-black/25">
      <h1 className="text-xl font-bold">Your Cards</h1>

      {error && (
        <div className="flex items-center justify-between p-2 text-red-700 bg-red-100 rounded">
          {error}
          <button type="button" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between p-2 text-green-700 bg-green-100 rounded">
          Operation successful!
          <button type="button" onClick={() => setSuccess(false)}>
            Dismiss
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`p-10 border border-black/25 rounded cursor-pointer shadow-sm flex justify-between items-center hover:shadow-lg duration-500 ${
              selectedCard === card.id ? "ring-2 ring-indigo-500" : ""
            }`}
            onClick={() => setSelectedCard(card.id)}
          >
            <div>
              <p className="font-medium">**** **** **** {card.card.last4}</p>
              <p className="text-sm text-gray-500">
                Expires {card.card.exp_month}/{card.card.exp_year}
              </p>
            </div>
            <Image
              src={
                cardBrandLogos[card.card.brand.toLowerCase()] ||
                cardBrandLogos.unknown
              }
              width={50}
              height={50}
              alt="brandLogo"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSubmitPayment}
        disabled={!selectedCard || loading}
        className="p-2 text-sm text-white bg-indigo-500 rounded xl:text-base hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Submit Payment with Selected Card"}
      </button>

      <form
        className="flex flex-col max-w-md space-y-4"
        onSubmit={handleAddCard}
      >
        <label htmlFor="cardElement" className="font-medium">
          Add a New Card
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="p-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Add New Card"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutCard;

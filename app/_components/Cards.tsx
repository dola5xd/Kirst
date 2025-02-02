"use client";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../_lib/stripe";
import UserCards from "./UserCards";

function Cards() {
  return (
    <Elements stripe={stripePromise}>
      <UserCards />
    </Elements>
  );
}

export default Cards;

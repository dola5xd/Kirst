"use client";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../_lib/stripe";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}

export default layout;

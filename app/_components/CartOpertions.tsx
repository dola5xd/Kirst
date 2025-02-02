"use client";

import { useState } from "react";
import CheckoutCard from "./CheckoutCard";
import CheckoutAddress from "./CheckoutAddress";
import { addressType } from "./AllAddresses";
import CartInformations from "./CartInformations";
import CheckoutSteps from "../_components/CheckoutSteps";

export type PaymentType = {
  Card: string;
  Address: addressType;
};

function CartOpertions() {
  const [payment, setPayment] = useState<PaymentType | null>(null);

  return (
    <>
      <div className="flex flex-col w-full col-span-12 xl:col-span-8">
        <CheckoutSteps />
        <div className="flex flex-col px-4 py-8 space-y-6 overflow-x-hidden bg-white rounded-lg shadow-lg sm:px-6 lg:px-8 xl:px-8 xl:py-12">
          <CheckoutCard setPayment={setPayment} />
          <CheckoutAddress setPayment={setPayment} />
        </div>
      </div>
      <div className="col-span-12 xl:col-span-4">
        <CartInformations step={2} payment={payment} />
      </div>
    </>
  );
}

export default CartOpertions;

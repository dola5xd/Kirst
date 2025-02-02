import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const customerID = searchParams.get("customerID");

  try {
    if (!customerID) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerID,
      type: "card",
    });

    return NextResponse.json({ cards: paymentMethods.data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cards" },
      { status: 500 }
    );
  }
}

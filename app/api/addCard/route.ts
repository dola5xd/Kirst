import { stripe } from "@/app/_lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { customerID, paymentMethodId } = await req.json();

    if (!customerID || !paymentMethodId) {
      return NextResponse.json(
        { error: "Missing userID or paymentMethodId" },
        { status: 400 }
      );
    }

    if (!customerID) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 }
      );
    }

    const customer = await stripe.customers.retrieve(customerID);
    if (customer.deleted) {
      return NextResponse.json(
        { error: "Customer is deleted" },
        { status: 404 }
      );
    }

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error adding card:", error);
    if (error instanceof stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown Error" },
      { status: 500 }
    );
  }
}

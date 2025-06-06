import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

export async function POST(req) {
  try {
    // 1. Verify the webhook event is from Stripe
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const body = await req.text();

    const signature = headers().get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    const { data, type } = event;

    // ✅ Grant access to the product
    if (type === "checkout.session.completed") {
      await connectMongo();

      const user = await User.findById(data.object.client_reference_id);

      user.hasAccess = true;
      user.customerId = data.object.customer;

      await user.save();

      return NextResponse.json({ message: "Access granted" });
    }

    return NextResponse.json({ message: "Webhook received" });
  } catch (error) {
    console.error("Stripe errror: " + error?.message);
  }
}

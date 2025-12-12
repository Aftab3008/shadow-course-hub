import { loadStripe, Stripe } from "@stripe/stripe-js";
import { api } from "./api";

export async function initiateStripe(
  stripePublishableKey: string
): Promise<{ success: boolean; message: string; stripe?: Stripe }> {
  try {
    const stripe = await loadStripe(stripePublishableKey);
    if (!stripe) {
      throw new Error("Stripe failed to initialize");
    }
    return {
      success: true,
      message: "Stripe initialized successfully",
      stripe,
    };
  } catch (error) {
    console.error("Error initializing Stripe:", error);
    return {
      success: false,
      message: "Failed to initialize Stripe",
    };
  }
}

export const initiateCheckout = async (): Promise<{
  success: boolean;
  message: string;
  sessionId?: string;
  url?: string;
  publicKey?: string;
}> => {
  try {
    const response = await api.post("/api/order/checkout/create-session", {
      successUrl: `${window.location.origin}/checkout/success`,
      cancelUrl: `${window.location.origin}/checkout/cancel`,
    });
    return {
      success: true,
      sessionId: response.data.sessionId,
      url: response.data.url,
      publicKey: response.data.publicKey,
      message: "Session created successfully",
    };
  } catch (error) {
    console.error("Error creating session:", error);
    return {
      success: false,
      message: "Failed to create session",
    };
  }
};

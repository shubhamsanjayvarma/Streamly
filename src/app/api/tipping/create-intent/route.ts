import { NextRequest, NextResponse } from "next/server";
import { DonationInputSchema } from "@/schemas/tipping";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = DonationInputSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          issues: validated.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { creatorSlug, amount, donorName, isAnonymous, message, paymentRoute } = validated.data;

    // Target creator UPI details (mocked registry / production store)
    const creatorUpiId = `${creatorSlug.toLowerCase()}@okhdfcbank`;
    const creatorName = creatorSlug.charAt(0).toUpperCase() + creatorSlug.slice(1);
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const note = encodeURIComponent(`Streamly Tip from ${isAnonymous ? "Supporter" : donorName}`);

    // Standard NPCI UPI URI Specification
    const baseUpiUri = `upi://pay?pa=${creatorUpiId}&pn=${encodeURIComponent(
      creatorName
    )}&am=${amount.toFixed(2)}&cu=INR&tn=${note}&tr=${transactionId}`;

    // App-specific deep links
    const appLinks = {
      GPAY: `gpay://upi/pay?pa=${creatorUpiId}&pn=${encodeURIComponent(creatorName)}&am=${amount.toFixed(2)}&cu=INR&tn=${note}`,
      PHONEPE: `phonepe://upi/pay?pa=${creatorUpiId}&pn=${encodeURIComponent(creatorName)}&am=${amount.toFixed(2)}&cu=INR&tn=${note}`,
      PAYTM: `paytmmp://upi/pay?pa=${creatorUpiId}&pn=${encodeURIComponent(creatorName)}&am=${amount.toFixed(2)}&cu=INR&tn=${note}`,
      UPI_INTENT: baseUpiUri,
    };

    return NextResponse.json({
      success: true,
      data: {
        transactionId,
        creatorSlug,
        creatorUpiId,
        amount,
        donorName: isAnonymous ? "Anonymous Supporter" : donorName,
        message: message || "",
        upiUri: baseUpiUri,
        targetAppLink: appLinks[paymentRoute as keyof typeof appLinks] || baseUpiUri,
        expirySeconds: 300,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error creating tipping intent:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

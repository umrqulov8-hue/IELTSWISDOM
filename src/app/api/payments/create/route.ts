import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { planName, amount } = await request.json();
        const tiyinAmount = Math.round(Number(amount) * 100); // TSPay expects amounts in tiyins (1 so'm = 100 tiyins)

        // 1. Create a pending payment record to get an order_id
        const { data: payment, error: paymentError } = await supabase
            .from("payments")
            .insert({
                user_id: user.id,
                amount: amount, // Keep original amount in database for reference
                plan_name: planName,
                status: "pending",
            })
            .select("order_id")
            .single();

        if (paymentError) {
            console.error("DEBUG: Failed to create payment record:", paymentError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // 2. Call TSPay to create a transaction
        const merchantId = process.env.TSPAY_MERCHANT_ID;
        const apiKey = process.env.TSPAY_API_KEY;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://ieltswisdom.com";
        const redirectUrl = `${baseUrl}/payment/success`;

        log(`Creating TSPay transaction for Order #${payment.order_id}, Amount: ${tiyinAmount} tiyins`);

        const res = await fetch("https://test.tspay.uz/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey || "",
            },
            body: JSON.stringify({
                merchant_id: merchantId,
                amount: tiyinAmount,
                order_id: Number(payment.order_id), // Send as Number
                redirect_url: redirectUrl,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error("DEBUG: TSPay API error detail:", {
                status: res.status,
                errorData,
                requestPayload: {
                    merchant_id: merchantId,
                    amount: tiyinAmount,
                    order_id: Number(payment.order_id),
                    redirect_url: redirectUrl
                }
            });
            return NextResponse.json({ 
                error: `TSPay Error (${res.status}): ${errorData.message || errorData.detail || JSON.stringify(errorData)}`
            }, { status: res.status });
        }

        const tspayData = await res.json();
        log("TSPay Response:", tspayData);

        return NextResponse.json({ payment_url: tspayData.payment_url });
    } catch (error: any) {
        console.error("DEBUG: Payment creation failed:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

function log(...args: any[]) {
    console.log("[TSPAY_CREATE]", ...args);
}

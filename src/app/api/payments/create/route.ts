import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
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

        // Use SERVICE ROLE KEY to bypass Row Level Security for inserting the payment
        // (Just in case the public.payments table doesn't have an INSERT policy for the user)
        const adminSupabase = createAdminClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // 1. Create a pending payment record to get an order_id
        const { data: payment, error: paymentError } = await adminSupabase
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

        const res = await fetch("https://api.tspay.uz/api/transactions/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey || "",
            },
            body: JSON.stringify({
                merchant_id: merchantId,
                amount: Number(amount), // Whole soums per docs
                order_id: Number(payment.order_id),
                redirect_url: redirectUrl,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error("DEBUG: TSPay API error detail:", {
                status: res.status,
                errorData,
            });

            // Extract message from various possible structures
            let msg = "Unknown error";
            if (Array.isArray(errorData.detail)) {
                msg = errorData.detail.map((e: any) => `${e.loc?.join('.')}: ${e.msg}`).join(', ');
            } else if (errorData.message) {
                msg = errorData.message;
            } else if (errorData.detail) {
                msg = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
            } else if (errorData.error) {
                msg = typeof errorData.error === 'object' ? errorData.error.message || JSON.stringify(errorData.error) : errorData.error;
            } else {
                msg = JSON.stringify(errorData);
            }

            return NextResponse.json({ 
                error: `TSPay Error (${res.status}): ${msg}`
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

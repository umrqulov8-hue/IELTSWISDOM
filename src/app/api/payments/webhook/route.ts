import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const headers = request.headers;
        
        // DEEP LOGGING FOR SIGNATURE DEBUGGING
        console.log("[TSPAY_WEBHOOK] FULL HEADERS:", Object.fromEntries(headers.entries()));
        console.log("[TSPAY_WEBHOOK] FULL BODY:", JSON.stringify(body, null, 2));

        const sig = headers.get("x-signature") || "";
        const ts = headers.get("x-timestamp") || "";
        const { params, method } = body;

        if (!params || !method) {
            return NextResponse.json({ allow: false, reason: "Invalid request structure" }, { status: 400 });
        }

        console.log(`[TSPAY_WEBHOOK] Received: ${method}`, params);

        // 1. Signature Verification
        const webhookSecret = (process.env.WEBHOOK_SECRET || process.env.TSPAY_API_KEY || "").trim();
        const orderId = String(params.order_id ?? "").trim();
        const amount = String(params.amount ?? "").trim();
        const timestamp = String(ts ?? "").trim();
        
        // Formula: order_id:amount:timestamp
        const dataToSign = `${orderId}:${amount}:${timestamp}`;
        const calculatedSig = "sha256=" + crypto
            .createHmac("sha256", webhookSecret)
            .update(dataToSign)
            .digest("hex");

        // DEBUG: Audit the signature components
        console.log("[TSPAY_WEBHOOK] Audit:", {
            received: sig,
            calculated: calculatedSig,
            stringTarget: dataToSign,
            secretUsed: webhookSecret.substring(0, 4) + "****"
        });

        const expectedBuffer = Buffer.from(calculatedSig);
        const sigBuffer = Buffer.from(sig);

        if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
            console.error("[TSPAY_WEBHOOK] Signature mismatch!");
            return NextResponse.json({ allow: false, reason: "Invalid signature" }, { status: 401 });
        }

        const supabase = await createClient();

        // 2. Handle Methods
        if (method === "checkPerform") {
            const { data: order, error } = await supabase
                .from("payments")
                .select("*")
                .eq("order_id", orderId)
                .single();

            if (error || !order) {
                return NextResponse.json({ allow: false, reason: "Buyurtma topilmadi" });
            }

            if (Number(order.amount) !== Number(amount)) {
                return NextResponse.json({ allow: false, reason: "Summa mos emas" });
            }

            return NextResponse.json({ allow: true, additional: { dbId: order.id } });
        }

        if (method === "createTransaction") {
            const { data: order, error: fetchError } = await supabase
                .from("payments")
                .select("*")
                .eq("order_id", orderId)
                .single();

            if (fetchError || !order) {
                return NextResponse.json({ success: false, error: "Order not found" });
            }

            if (order.cheque_id) {
                if (Number(order.amount) !== Number(amount)) {
                    return NextResponse.json({ error: { code: -31001, message: "Summa xato" } }, { status: 400 });
                }
                return NextResponse.json({ success: true, transaction_id: order.cheque_id });
            }

            if (Number(order.amount) !== Number(amount)) {
                return NextResponse.json({ error: { code: -31001, message: "Summa xato" } }, { status: 400 });
            }

            const { error: updateError } = await supabase
                .from("payments")
                .update({ cheque_id: params.cheque_id })
                .eq("order_id", orderId);

            if (updateError) {
                return NextResponse.json({ success: false });
            }

            return NextResponse.json({ success: true });
        }

        if (method === "performTransaction") {
            // Finalize payment
            const { data: payment, error: pError } = await supabase
                .from("payments")
                .update({ status: "success" })
                .eq("order_id", orderId)
                .select()
                .single();

            if (pError || !payment) {
                return NextResponse.json({ success: false });
            }

            // Grant 30 days subscription
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 30);

            const { error: sError } = await supabase
                .from("subscriptions")
                .upsert({
                    user_id: payment.user_id,
                    plan_name: payment.plan_name,
                    status: "active",
                    expires_at: expiresAt.toISOString(),
                });

            if (sError) {
                console.error("[TSPAY_WEBHOOK] Subscription Update Error:", sError);
                // We return success anyway because the payment is done, 
                // but we might want to flag this for manual review.
                return NextResponse.json({ success: true, note: "Subscription sync failed" });
            }

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ allow: false, reason: "Noma'lum metod" }, { status: 400 });

    } catch (error: any) {
        console.error("[TSPAY_WEBHOOK] Internal error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


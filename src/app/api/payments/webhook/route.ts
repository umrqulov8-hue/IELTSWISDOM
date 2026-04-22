import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const headers = request.headers;
        
        const sig = headers.get("x-signature") || "";
        const ts = headers.get("x-timestamp") || "";
        const { params, method } = body;

        if (!params || !method) {
            return NextResponse.json({ allow: false, reason: "Invalid request structure" }, { status: 400 });
        }

        const webhookSecret = (process.env.WEBHOOK_SECRET || "").trim();
        const orderId = String(params.order_id ?? "").trim();
        const amount = String(params.amount ?? "").trim();
        const timestamp = String(ts ?? "").trim();
        
        const dataToSign = `${orderId}:${amount}:${timestamp}`;
        const expected = "sha256=" + crypto
            .createHmac("sha256", webhookSecret)
            .update(dataToSign)
            .digest("hex");

        const expectedBuffer = Buffer.from(expected);
        const sigBuffer = Buffer.from(sig);

        if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
            return NextResponse.json({ allow: false, reason: "Invalid signature" }, { status: 401 });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        
        const supabase = createClient(supabaseUrl, supabaseKey);

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
            const { data: currentPayment, error: fetchError } = await supabase
                .from("payments")
                .select("*")
                .eq("order_id", orderId)
                .single();

            if (fetchError || !currentPayment) {
                return NextResponse.json({ success: false, reason: "Payment not found" });
            }

            if (currentPayment.status === "success") {
                return NextResponse.json({ success: true });
            }

            const { data: payment, error: pError } = await supabase
                .from("payments")
                .update({ status: "success" })
                .eq("order_id", orderId)
                .select()
                .single();

            if (pError || !payment) {
                return NextResponse.json({ success: false });
            }

            const { data: currentSub } = await supabase
                .from("subscriptions")
                .select("*")
                .eq("user_id", payment.user_id)
                .single();

            let expiresAt = new Date();
            if (currentSub && new Date(currentSub.expires_at) > new Date()) {
                expiresAt = new Date(currentSub.expires_at);
            }
            expiresAt.setDate(expiresAt.getDate() + 30);

            await supabase
                .from("subscriptions")
                .upsert({
                    user_id: payment.user_id,
                    plan_name: payment.plan_name,
                    status: "active",
                    expires_at: expiresAt.toISOString(),
                });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ allow: false, reason: "Noma'lum metod" }, { status: 400 });

    } catch (error: any) {
        console.error("Internal error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


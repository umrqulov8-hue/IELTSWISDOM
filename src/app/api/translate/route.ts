import { NextRequest, NextResponse } from "next/server";
import Bytez from "bytez.js";

const key = "26b2c8283a455ed739dc60e7385663fc";
const sdk = new Bytez(key);

// Simple server-side lock to ensure only 1 request at a time hits Bytez
// This is necessary for free-tier accounts
let isRequestPending = false;
const queue: (() => void)[] = [];

const processQueue = () => {
    if (queue.length > 0 && !isRequestPending) {
        const next = queue.shift();
        if (next) next();
    }
};

const waitForLock = () => {
    return new Promise<void>((resolve) => {
        queue.push(resolve);
        processQueue();
    });
};

export async function POST(req: NextRequest) {
    await waitForLock();
    isRequestPending = true;

    try {
        const body = await req.json();
        const { text, source = "en", target = "uz" } = body;

        if (!text) {
            return NextResponse.json({ error: "Missing required field: text" }, { status: 400 });
        }

        // Enforce 5000 character limit
        if (text.length > 5000) {
            return NextResponse.json({ error: "Text too long. Max 5000 characters." }, { status: 400 });
        }

        // Build translation prompt
        const sourceName = source === "en" ? "English" : "Uzbek";
        const targetName = target === "en" ? "English" : "Uzbek";

        // Use Qwen3-4B-Instruct-2507 chat model
        const model = sdk.model("Qwen/Qwen3-4B-Instruct-2507");

        let error: any = null;
        let output: any = null;
        let retries = 5;
        let backoff = 1000;

        while (retries > 0) {
            const res = await model.run([
                {
                    role: "user",
                    content: `Translate this text from ${sourceName} to ${targetName}. Only output the translation: ${text}`
                }
            ]);

            error = res.error;
            output = res.output;

            if (error && String(error).includes("Rate limited")) {
                retries--;
                if (retries === 0) break;
                console.log(`Rate limited by Bytez, retrying in ${backoff}ms... (${retries} retries left)`);
                await new Promise(resolve => setTimeout(resolve, backoff));
                backoff *= 2; // Exponential backoff
            } else {
                break; // Success or non-rate-limit error
            }
        }

        if (error) {
            console.error("Bytez Translation Error:", error);
            return NextResponse.json({ error: "Translation failed: " + error }, { status: 500 });
        }

        console.log("Bytez output received.");

        // Parse response - Qwen model returns a chat message object or generated text
        let translatedText = "";

        const getRawText = (obj: any) => {
            if (typeof obj === 'string') return obj;
            if (obj?.content) return obj.content;
            if (obj?.generated_text) return obj.generated_text;
            if (obj?.translation_text) return obj.translation_text;
            return JSON.stringify(obj);
        };

        if (Array.isArray(output) && output.length > 0) {
            translatedText = getRawText(output[0]);
        } else {
            translatedText = getRawText(output);
        }

        return NextResponse.json({ translatedText });

    } catch (error: any) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    } finally {
        isRequestPending = false;
        processQueue();
    }
}

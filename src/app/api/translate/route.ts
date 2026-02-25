import { NextRequest, NextResponse } from "next/server";
import Bytez from "bytez.js";

const key = "26b2c8283a455ed739dc60e7385663fc";
const sdk = new Bytez(key);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { text, source = "en", target = "uz" } = body;

        if (!text) {
            return NextResponse.json({ error: "Missing required field: text" }, { status: 400 });
        }

        // Build translation prompt
        const sourceName = source === "en" ? "English" : "Uzbek";
        const targetName = target === "en" ? "English" : "Uzbek";

        // Use Qwen3-4B-Instruct-2507 chat model
        const model = sdk.model("Qwen/Qwen3-4B-Instruct-2507");

        const { error, output } = await model.run([
            {
                role: "user",
                content: `Translate this text from ${sourceName} to ${targetName}. Only output the translation: ${text}`
            }
        ]);

        if (error) {
            console.error("Bytez Translation Error:", error);
            return NextResponse.json({ error: "Translation failed: " + error }, { status: 500 });
        }

        console.log("Bytez output:", { error, output });

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
    }
}

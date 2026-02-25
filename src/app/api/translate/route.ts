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

        // Choose the correct Helsinki-NLP model based on direction
        let modelId = "Helsinki-NLP/opus-mt-en-mul"; // default: en -> multilingual

        if (source === "en" && target === "uz") {
            modelId = "Helsinki-NLP/opus-mt-en-mul";
        } else if (source === "uz" && target === "en") {
            modelId = "Helsinki-NLP/opus-mt-mul-en";
        } else if (source === "en" && target === "ru") {
            modelId = "Helsinki-NLP/opus-mt-en-ru";
        } else if (source === "ru" && target === "en") {
            modelId = "Helsinki-NLP/opus-mt-ru-en";
        }

        const model = sdk.model(modelId);
        const { error, output } = await model.run(text);

        if (error) {
            console.error("Bytez Translation Error:", error);
            return NextResponse.json({ error: "Translation failed: " + error }, { status: 500 });
        }

        console.log("Bytez output:", JSON.stringify(output));

        // Parse various possible response shapes from Helsinki-NLP models
        let translatedText = "";
        if (Array.isArray(output) && output.length > 0) {
            if (typeof output[0] === "string") {
                translatedText = output[0];
            } else if (output[0]?.translation_text) {
                translatedText = output[0].translation_text;
            } else if (output[0]?.generated_text) {
                translatedText = output[0].generated_text;
            } else {
                translatedText = JSON.stringify(output[0]);
            }
        } else if (typeof output === "string") {
            translatedText = output;
        } else {
            translatedText = JSON.stringify(output);
        }

        return NextResponse.json({ translatedText });

    } catch (error: any) {
        console.error("API Route Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

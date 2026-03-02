import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function testTranscription() {
    const apiKey = process.env.IELTS_API_KEY?.trim();
    if (!apiKey) {
        console.error("IELTS_API_KEY not found in .env");
        process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("Testing Gemini with a simple prompt...");
    try {
        const result = await model.generateContent("Say 'Transcription logic is working'");
        console.log("Gemini Response:", result.response.text());
        console.log("Gemini API is accessible and key is valid.");
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

testTranscription();

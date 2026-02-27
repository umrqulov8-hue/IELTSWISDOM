import { NextRequest, NextResponse } from "next/server";
// @ts-ignore no types
import Bytez from "bytez.js";

export async function POST(request: NextRequest) {
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        // Use environment variable or fallback to the provided key
        const apiKey = process.env.IELTS_API_KEY?.trim() || "26b2c8283a455ed739dc60e7385663fc";

        const sdk = new Bytez(apiKey);
        const model = sdk.model("openai/gpt-5.2");

        const prompt = `You are a Senior IELTS Speaking Examiner. Evaluate the following student's answer based on the official IELTS Speaking Band Descriptors (9-4 bands).
        
        CRITERIA:
        1. Fluency and Coherence:
           - Band 9: Fluent with only very occasional repetition/self-correction. Topic development is fully coherent.
           - Band 8: Fluent with only occasional repetition/self-correction. Topic development is coherent.
           - Band 7: Long turns without noticeable effort. Coherent but with some repetition/self-correction.
           - Band 6: Willing to speak at length but may lose coherence due to repetition/hesitation.
           - Band 5: Usually able to keep going but relies on repetition and overuses certain markers.
           - Band 4: Unable to keep going without noticeable pauses.
        
        2. Lexical Resource:
           - Band 9: Total flexibility and precise use in all contexts. Idiomatic language.
           - Band 8: Wide resource, skilfully used idiomatic items. Effective paraphrase.
           - Band 7: Resource flexibly used to discuss a variety of topics. Some idiomatic items.
           - Band 6: Sufficient resource to discuss topics at length. Generally able to paraphrase.
           - Band 5: Sufficient resource for familiar topics but limited flexibility.
           - Band 4: Limited resource for familiar topics.
        
        3. Grammatical Range and Accuracy:
           - Band 9: Precise and accurate structures. Only native-speaker like mistakes.
           - Band 8: Wide range of structures, majority of sentences error-free.
           - Band 7: Range of structures flexibly used. Error-free sentences are frequent.
           - Band 6: Mix of short and complex forms but with limited flexibility. Errors persist.
           - Band 5: Basic sentence forms fairly well controlled. Complex structures are limited.
           - Band 4: Basic forms with frequent errors.
        
        4. Pronunciation:
           - Band 9: Full range of features, effortlessly understood. Accent has no effect.
           - Band 8: Wide range of features, sustained appropriately. Easy to understand.
           - Band 7: Positive features of Band 6 and some of Band 8.
           - Band 6: Generally understood though with some mispronunciations.
           - Band 5: Basic features but rhythm/stress issues affect clarity.
           - Band 4: Limited range of features, lapses cause strain for listener.

        Evaluate this transcript: "${text}"

        Provide a breakdown for each category (Band 9-4) and a final overall Band Score.
        
        Return the response in JSON format:
        {
            "bandScore": "value",
            "feedback": "value",
            "breakdown": {
                "fluency": "score",
                "lexical": "score",
                "grammar": "score",
                "pronunciation": "score"
            }
        }`;

        const { error, output } = await model.run([
            { role: "system", content: "You are an IELTS examiner. Always return JSON." },
            { role: "user", content: prompt }
        ]);

        if (error) {
            console.error("Bytez evaluate error:", error);
            return NextResponse.json({ error: String(error) }, { status: 500 });
        }

        const raw =
            typeof output === "string"
                ? output
                : (output as any)?.content
                ?? (output as any)?.choices?.[0]?.message?.content
                ?? JSON.stringify(output);

        if (!raw) {
            throw new Error("Empty response from Bytez AI");
        }

        // Extract JSON from the response
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("Invalid AI response format, expected JSON.");
        }

        const result = JSON.parse(jsonMatch[0]);
        return NextResponse.json(result);

    } catch (err) {
        console.error("Bytez Evaluate Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        return NextResponse.json({
            error: "Evaluation failed",
            details: errorMessage
        }, { status: 500 });
    }
}

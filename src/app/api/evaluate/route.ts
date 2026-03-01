import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    try {
        const { text } = await request.json();

        if (!text) {
            return NextResponse.json({ error: "No text provided" }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
        }

        const prompt = `You are a Senior IELTS Speaking Examiner. Evaluate the following student's transcript based on the official IELTS Speaking Band Descriptors.

        CRITERIA (Bands 9-4):

        1. Fluency and Coherence:
           - Band 9: Fluent with only very occasional repetition or self-correction. Any hesitation that occurs is used only to prepare the content of the next utterance and not to find words or grammar. Speech is situationally appropriate and cohesive features are fully acceptable. Topic development is fully coherent and appropriately extended.
           - Band 8: Fluent with only very occasional repetition or self-correction. Hesitation may occasionally be used to find words or grammar, but most will be content related. Topic development is coherent, appropriate and relevant.
           - Band 7: Able to keep going and readily produce long turns without noticeable effort. Some hesitation, repetition and/or self-correction may occur, often mid-sentence and indicate problems with accessing appropriate language. However, these will not affect coherence. Flexible use of spoken discourse markers, connectives and cohesive features.
           - Band 6: Able to keep going and demonstrates a willingness to produce long turns. Coherence may be lost at times as a result of hesitation, repetition and/or self-correction. Uses a range of spoken discourse markers, connectives and cohesive features though not always appropriately.
           - Band 5: Usually able to keep going, but relies on repetition and self-correction to do so and/or on slow speech. Hesitations are often associated with mid-sentence searches for fairly basic lexis and grammar. Overuse of certain discourse markers, connectives and other cohesive features. More complex speech usually causes disfluency but simpler language may be produced fluently.
           - Band 4: Unable to keep going without noticeable pauses. Speech may be slow with frequent repetition. Often self-corrects. Can link simple sentences but often with repetitious use of connectives. Some breakdowns in coherence.

        2. Lexical Resource:
           - Band 9: Total flexibility and precise use in all contexts. Sustained use of accurate and idiomatic language.
           - Band 8: Wide resource, readily and flexibly used to discuss all topics and convey precise meaning. Skilful use of less common and idiomatic items despite occasional inaccuracies in word choice and collocation. Effective use of paraphrase as required.
           - Band 7: Resource flexibly used to discuss a variety of topics. Some ability to use less common and idiomatic items and an awareness of style and collocation is evident though inappropriacies occur. Effective use of paraphrase as required.
           - Band 6: Resource sufficient to discuss topics at length. Vocabulary use may be inappropriate but meaning is clear. Generally able to paraphrase successfully.
           - Band 5: Resource sufficient to discuss familiar and unfamiliar topics but there is limited flexibility. Attempts paraphrase but not always with success.
           - Band 4: Resource sufficient for familiar topics but only basic meaning can be conveyed on unfamiliar topics. Frequent inappropriacies and errors in word choice. Rarely attempts paraphrase.

        3. Grammatical Range and Accuracy:
           - Band 9: Structures are precise and accurate at all times, apart from 'mistakes' characteristic of native speaker speech.
           - Band 8: Wide range of structures, flexibly used. The majority of sentences are error free. Occasional inappropriacies and non-systematic errors occur. A few basic errors may persist.
           - Band 7: A range of structures flexibly used. Error-free sentences are frequent. Both simple and complex sentences are used effectively despite some errors. A few basic errors persist.
           - Band 6: Produces a mix of short and complex sentence forms and a variety of structures with limited flexibility. Though errors frequently occur in complex structures, these rarely impede communication.
           - Band 5: Basic sentence forms are fairly well controlled for accuracy. Complex structures are attempted but these are limited in range, nearly always contain errors and may lead to the need for reformulation.
           - Band 4: Can produce basic sentence forms and some short utterances are error-free. Subordinate clauses are rare and, overall, turns are short, structures are repetitive and errors are frequent.

        4. Pronunciation:
           - Band 9: Uses a full range of phonological features to convey precise and/or subtle meaning. Flexible use of features of connected speech is sustained throughout. Can be effortlessly understood throughout. Accent has no effect on intelligibility.
           - Band 8: Uses a wide range of phonological features to convey precise and/or subtle meaning. Can sustain appropriate rhythm. Flexible use of stress and intonation across long utterances, despite occasional lapses. Can be easily understood throughout. Accent has minimal effect on intelligibility.
           - Band 7: Displays all the positive features of band 6, and some, but not all, of the positive features of band 8.
           - Band 6: Uses a range of phonological features, but control is variable. Chunking is generally appropriate, but rhythm may be affected by a lack of stress-timing and/or a rapid speech rate. Some effective use of intonation and stress, but this is not sustained. Individual words or phonemes may be mispronounced but this causes only occasional lack of clarity. Can generally be understood throughout without much effort.
           - Band 5: Displays all the positive features of band 4, and some, but not all, of the positive features of band 6.
           - Band 4: Uses some acceptable phonological features, but the range is limited. Produces some acceptable chunking, but there are frequent lapses in overall rhythm. Attempts to use intonation and stress, but control is limited. Individual words or phonemes are frequently mispronounced, causing lack of clarity. Understanding requires some effort and there may be patches of speech that cannot be understood.

        Note on Pronunciation: Since you are evaluating a text transcript from a speech-to-text model, base your Pronunciation score estimation on the grammatical flow, naturalness of expression, and absence of garbled transcriptions typically caused by poor pronunciation. Do not overly penalize pronunciation unless the transcript is incoherent.

        Evaluate this transcript: "${text}"

        Provide a breakdown for each category (Band 9-4) and a final overall Band Score (averaging the 4 criteria and rounding to the nearest 0.5).
        Furthermore, provide:
        - accuracyPercentage: A number from 0 to 100 representing the grammatical and natural accuracy of the speech.
        - polishedTranscript: A grammatically perfect, native-speaker rewrite of the student's answer.
        - wordAnalysis: An array dividing the original transcript strictly word-by-word. For each word, provide the "word" itself, a "status" ("correct", "minor_error", "major_error"), a simulated accuracy "percentage", and an optional "tip" if there is an error.
        - vocabulary: An object containing "complexity" ("A1 - Beginner" up to "C2 - Mastery") with a related "feedback" sentence, and "repetition" containing feedback on whether they repeated words.
        
        Return the response in JSON format. The JSON must exactly follow this schema:
        {
            "overallBand": 5.5,
            "accuracyPercentage": 85,
            "polishedTranscript": "native speaker version here",
            "wordAnalysis": [
                { "word": "Guys", "status": "correct", "percentage": 98 },
                { "word": "only", "status": "minor_error", "percentage": 54, "tip": "Use 'just' instead" }
            ],
            "vocabulary": {
                "complexity": { "level": "B2 - Upper Intermediate", "feedback": "Good vocabulary range" },
                "repetition": { "feedback": "No noticeable repetition! Great job!" }
            },
            "criteria": {
                "taskResponse": { "score": 6.0, "feedback": "Good response but slightly off-topic." },
                "fluency": { "score": 6.5, "feedback": "..." },
                "lexical": { "score": 5.5, "feedback": "..." },
                "grammar": { "score": 6.0, "feedback": "..." },
                "pronunciation": { "score": 6.0, "feedback": "..." }
            }
        }`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const raw = completion.choices[0].message.content;

        if (!raw) {
            throw new Error("Empty response from AI");
        }

        const result = JSON.parse(raw);
        return NextResponse.json(result);

    } catch (err) {
        console.error("OpenAI Evaluate Error:", err);
        const errorMessage = err instanceof Error ? err.message : "Internal server error";
        return NextResponse.json({
            error: "Evaluation failed",
            details: errorMessage
        }, { status: 500 });
    }
}

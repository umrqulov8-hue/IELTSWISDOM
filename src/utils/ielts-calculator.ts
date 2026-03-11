export type IELTSSection = "reading" | "listening" | "writing" | "speaking";

/**
 * Calculates IELTS band score for Reading/Listening based on raw correct answers (out of 40)
 */
export function calculateBandScore(rawScore: number, section: "reading" | "listening"): number {
    if (section === "listening") {
        if (rawScore >= 39) return 9.0;
        if (rawScore >= 37) return 8.5;
        if (rawScore >= 35) return 8.0;
        if (rawScore >= 32) return 7.5;
        if (rawScore >= 30) return 7.0;
        if (rawScore >= 26) return 6.5;
        if (rawScore >= 23) return 6.0;
        if (rawScore >= 18) return 5.5;
        if (rawScore >= 16) return 5.0;
        if (rawScore >= 13) return 4.5;
        if (rawScore >= 10) return 4.0;
        if (rawScore >= 8) return 3.5;
        if (rawScore >= 6) return 3.0;
        if (rawScore >= 4) return 2.5;
        return 0;
    } else {
        // Academic Reading
        if (rawScore >= 39) return 9.0;
        if (rawScore >= 37) return 8.5;
        if (rawScore >= 35) return 8.0;
        if (rawScore >= 33) return 7.5;
        if (rawScore >= 30) return 7.0;
        if (rawScore >= 27) return 6.5;
        if (rawScore >= 23) return 6.0;
        if (rawScore >= 19) return 5.5;
        if (rawScore >= 15) return 5.0;
        if (rawScore >= 13) return 4.5;
        if (rawScore >= 10) return 4.0;
        if (rawScore >= 8) return 3.5;
        if (rawScore >= 6) return 3.0;
        if (rawScore >= 4) return 2.5;
        return 0;
    }
}

/**
 * Rounds the overall average to the nearest 0.5
 */
export function calculateOverallBand(scores: number[]): number {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    // IELTS rounds to the nearest 0.5. Examples: 
    // 6.25 -> 6.5
    // 6.75 -> 7.0
    // 6.125 -> 6.0
    return Math.round(avg * 2) / 2;
}

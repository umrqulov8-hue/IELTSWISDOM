import { CONFIG } from "@/config";

export interface Question {
    id: number;
    type: "multiple-choice" | "true-false" | "fill-blank" | "matching";
    text: string;
    options?: string[];
    correctAnswer: string | number;
    image?: string;
}

export interface Passage {
    id: string;
    title: string;
    content: string;
    questionRange: { start: number; end: number };
}

export interface ReadingTest {
    id: string;
    title: string;
    content?: string;
    passages?: Passage[];
    questions: Question[];
    timeLimit?: number; // in seconds
}

export async function getReadingTest(id: string): Promise<ReadingTest | null> {
    try {
        const response = await fetch(`${CONFIG.DATA_BASE_URL}/reading/${id}.json`);
        if (!response.ok) {
            console.error(`Failed to fetch reading test ${id}: ${response.statusText}`);
            return null;
        }
        
        const data = await response.json();
        if (Array.isArray(data)) {
            return data.find(t => t.id === id) || data[0];
        }
        return data as ReadingTest;
    } catch (err) {
        console.error(`Error loading reading test ${id}:`, err);
        return null;
    }
}

// Registry for the export script
export const TEST_LOADERS: Record<string, () => Promise<any>> = {
    "fp-3": () => import("./readingFp3").then(m => m.readingFp3),
    "fp-4": () => import("./readingFp4").then(m => m.readingFp4),
    "fp-9": () => import("./readingFp9").then(m => m.readingFp9),
    "fp-10": () => import("./readingFp10").then(m => m.readingFp10),
    "fp-11": () => import("./readingFp11").then(m => m.readingFp11),
    "fp-12": () => import("./readingFp12").then(m => m.readingFp12),
    "fp-13": () => import("./readingFp13").then(m => m.readingFp13),
    "fp-14": () => import("./readingFp14").then(m => m.readingFp14),
    "fp-15": () => import("./readingFp15").then(m => m.readingFp15),
    "fp-16": () => import("./readingFp16").then(m => m.readingFp16),
    "fp-17": () => import("./readingFp17").then(m => m.readingFp17),
    "fp-18": () => import("./readingFp18").then(m => m.readingFp18),
    "fp-19": () => import("./readingFp19").then(m => m.readingFp19),
    "fp-20": () => import("./readingFp20").then(m => m.readingFp20),
    "fp-21": () => import("./readingFp21").then(m => m.readingFp21),
    "fp-22": () => import("./readingFp22").then(m => m.readingFp22),
    "fp-23": () => import("./readingFp23").then(m => m.readingFp23),
    "fp-24": () => import("./readingFp24").then(m => m.readingFp24),
    "mock-1": () => import("./mockTest1Reading").then(m => m.mockTest1Reading),
    "mock-2": () => import("./mockTest2").then(m => m.mockReadingTest2 || (m as any).readingTests),
};

// Deprecated: Use getReadingTest(id) instead for better performance
export const READING_TESTS: Record<string, ReadingTest> = {};


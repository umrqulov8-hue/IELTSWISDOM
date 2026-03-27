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

const TEST_LOADERS: Record<string, () => Promise<any>> = {
    // Special files
    "homers-literary-legacy": () => import("./homersLiteraryLegacy").then(m => m.homersLiteraryLegacyData),
    "the-rise-of-agribots": () => import("./theRiseOfAgribots").then(m => m.theRiseOfAgribotsData),
    "south-pole-adventurer": () => import("./southPoleAdventurer").then(m => m.southPoleAdventurerData),

    // FP tests
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

    // Mock tests (each contains an array of tests)
    "mock-1": () => import("./mockTest1").then(m => m.mockReadingTest1),
    "mock-1-p1": () => import("./mockTest1").then(m => m.mockReadingTest1),
    "mock-1-p2": () => import("./mockTest1").then(m => m.mockReadingTest1),
    "mock-1-p3": () => import("./mockTest1").then(m => m.mockReadingTest1),

    "mock-2": () => import("./mockTest2").then(m => m.mockReadingTest2),
    "mock-2-p1": () => import("./mockTest2").then(m => m.mockReadingTest2),
    "mock-2-p2": () => import("./mockTest2").then(m => m.mockReadingTest2),
    "mock-2-p3": () => import("./mockTest2").then(m => m.mockReadingTest2),

    "mock-3": () => import("./mockTest3").then(m => m.mockReadingTest3),
    "mock-3-p1": () => import("./mockTest3").then(m => m.mockReadingTest3),
    "mock-3-p2": () => import("./mockTest3").then(m => m.mockReadingTest3),
    "mock-3-p3": () => import("./mockTest3").then(m => m.mockReadingTest3),

    "mock-4": () => import("./mockTest4").then(m => m.mockReadingTest4),
    "mock-4-p1": () => import("./mockTest4").then(m => m.mockReadingTest4),
    "mock-4-p2": () => import("./mockTest4").then(m => m.mockReadingTest4),
    "mock-4-p3": () => import("./mockTest4").then(m => m.mockReadingTest4),

    "mock-5": () => import("./mockTest5").then(m => m.mockReadingTest5),
    "mock-5-p1": () => import("./mockTest5").then(m => m.mockReadingTest5),
    "mock-5-p2": () => import("./mockTest5").then(m => m.mockReadingTest5),
    "mock-5-p3": () => import("./mockTest5").then(m => m.mockReadingTest5),

    "mock-6": () => import("./mockTest6").then(m => m.mockReadingTest6),
    "mock-6-p1": () => import("./mockTest6").then(m => m.mockReadingTest6),
    "mock-6-p2": () => import("./mockTest6").then(m => m.mockReadingTest6),
    "mock-6-p3": () => import("./mockTest6").then(m => m.mockReadingTest6),

    "mock-7": () => import("./mockTest7").then(m => m.mockReadingTest7),
    "mock-7-p1": () => import("./mockTest7").then(m => m.mockReadingTest7),
    "mock-7-p2": () => import("./mockTest7").then(m => m.mockReadingTest7),
    "mock-7-p3": () => import("./mockTest7").then(m => m.mockReadingTest7),
};

export async function getReadingTest(id: string): Promise<ReadingTest | null> {
    const loader = TEST_LOADERS[id];
    if (!loader) return null;

    const data = await loader();
    if (Array.isArray(data)) {
        return data.find(t => t.id === id) || data[0];
    }
    return data;
}

// Deprecated: Use getReadingTest(id) instead for better performance
export const READING_TESTS: Record<string, ReadingTest> = {};

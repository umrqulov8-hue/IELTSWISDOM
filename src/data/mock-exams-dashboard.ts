export interface MockTestMeta {
    id: string;
    index: number;
    title: { en: string; uz: string };
    desc: { en: string; uz: string };
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    status: "completed" | "in-progress" | "locked" | "available";
    overall_band?: string;
    scores?: {
        reading: string;
        listening: string;
        writing: string;
        speaking: string;
    };
    isFavorite?: boolean;
}

export const MOCK_TESTS_DASHBOARD: MockTestMeta[] = Array.from({ length: 30 }, (_, i) => {
    const id = i + 1;
    let difficulty: "Beginner" | "Intermediate" | "Advanced" = "Beginner";
    if (id > 10) difficulty = "Intermediate";
    if (id > 20) difficulty = "Advanced";

    let status: MockTestMeta["status"] = "available";

    return {
        id: `mock-${id}`,
        index: i,
        title: { 
            en: id === 1 ? "Cambridge IELTS 20, Test 1" : `IELTS Mock Test ${id}`, 
            uz: id === 1 ? "Cambridge IELTS 20, Test 1" : `IELTS Mock Test ${id}` 
        },
        desc: { 
            en: `Complete practice test with all four skills - ${difficulty} level`, 
            uz: `To'rtta ko'nikmani qamrab oluvchi to'liq mock test - ${difficulty} darajasi` 
        },
        duration: "180 min",
        difficulty,
        status,
        overall_band: undefined,
        scores: undefined,
        isFavorite: false
    };
});

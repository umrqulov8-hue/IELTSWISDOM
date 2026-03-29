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

    // Demo statuses to match screenshots initially, but we'll reflect real data later
    let status: MockTestMeta["status"] = "available";
    if (id <= 8) status = "completed";
    if (id === 9 || id === 10) status = "available";
    if (id > 10) status = "available"; // Per user request "no locks", all are available

    const demoScores = [
        { reading: "39/40", listening: "35/40", writing: "36/40", speaking: "7.0", band: "8.4" },
        { reading: "30/40", listening: "33/40", writing: "33/40", speaking: "8.4", band: "6.9" },
        { reading: "32/40", listening: "39/40", writing: "28/40", speaking: "6.2", band: "6.9" },
        { reading: "38/40", listening: "37/40", writing: "35/40", speaking: "8.0", band: "7.8" },
        { reading: "35/40", listening: "40/40", writing: "32/40", speaking: "8.1", band: "8.3" },
        { reading: "38/40", listening: "40/40", writing: "33/40", speaking: "6.2", band: "6.6" },
        { reading: "35/40", listening: "36/40", writing: "31/40", speaking: "8.8", band: "7.9" },
        { reading: "31/40", listening: "37/40", writing: "36/40", speaking: "7.5", band: "6.3" },
    ];

    return {
        id: `mock-${id}`,
        index: i,
        title: { en: `IELTS Mock Test ${id}`, uz: `IELTS Mock Test ${id}` },
        desc: { 
            en: `Complete practice test with all four skills - ${difficulty} level`, 
            uz: `To'rtta ko'nikmani qamrab oluvchi to'liq mock test - ${difficulty} darajasi` 
        },
        duration: "180 min",
        difficulty,
        status,
        overall_band: id <= 8 ? demoScores[id-1].band : undefined,
        scores: id <= 8 ? {
            reading: demoScores[id-1].reading,
            listening: demoScores[id-1].listening,
            writing: demoScores[id-1].writing,
            speaking: demoScores[id-1].speaking
        } : undefined,
        isFavorite: [1, 4, 6].includes(id)
    };
});

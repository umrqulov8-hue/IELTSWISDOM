import type { ListeningTest } from "@/types/listening";

// Lazy-load map: each test is loaded only when requested
const TEST_LOADERS: Record<string, () => Promise<ListeningTest>> = {
    // Mock Tests
    "mt-1": () => import("./mockTest1Listening").then(m => m.mockTest1Listening),
    // Trainer 1
    "t1-1": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "t1-2": () => import("./trainer1Test2").then(m => m.trainer1Test2),
    "t1-3": () => import("./trainer1Test3").then(m => m.trainer1Test3),
    "t1-4": () => import("./trainer1Test4").then(m => m.trainer1Test4),
    "t1-5": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "t1-6": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    // Trainer 2
    "t2-1": () => import("./trainer2Test1").then(m => m.trainer2Test1),
    "t2-2": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "t2-3": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "t2-4": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "t2-5": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "t2-6": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    // Test Plus 3
    "tp3-1": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "tp3-2": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "tp3-3": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "tp3-4": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    // Authentic
    "cambridge-11-test-1": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "auth-1": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "auth-2": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "auth-3": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
};

// Cache loaded tests so they're only fetched once per session
const cache = new Map<string, ListeningTest>();

/**
 * Dynamically load a listening test by ID.
 * This avoids loading ALL test data at startup.
 */
export async function getListeningTest(id: string): Promise<ListeningTest | null> {
    if (cache.has(id)) return cache.get(id)!;

    const loader = TEST_LOADERS[id];
    if (!loader) return null;

    const test = await loader();
    cache.set(id, test);
    return test;
}

/** Check if a test ID exists */
export function hasListeningTest(id: string): boolean {
    return id in TEST_LOADERS;
}

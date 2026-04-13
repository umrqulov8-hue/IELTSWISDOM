import type { ListeningTest } from "@/types/listening";
import { CONFIG } from "@/config";

// Cache loaded tests so they're only fetched once per session
const cache = new Map<string, ListeningTest>();

/**
 * Dynamically load a listening test from the remote storage.
 */
export async function getListeningTest(id: string): Promise<ListeningTest | null> {
    if (cache.has(id)) return cache.get(id)!;

    try {
        const response = await fetch(`${CONFIG.DATA_BASE_URL}/listening/${id}.json`);
        if (!response.ok) {
            console.error(`Failed to fetch test ${id}: ${response.statusText}`);
            return null;
        }
        
        const test = await response.json();
        cache.set(id, test);
        return test;
    } catch (err) {
        console.error(`Error loading listening test ${id}:`, err);
        return null;
    }
}

/** Check if a test ID exists */
export function hasListeningTest(id: string): boolean {
    const VALID_IDS = ["cambridge-11-test-1", "cambridge-20-test-1", "mock-1", "mock-2", "mock-3", "mock-4", "mock-5", "t1-2", "t1-3", "t1-4", "t2-1"];
    return VALID_IDS.includes(id);
}

// Registry for the export script
export const TEST_LOADERS: Record<string, () => Promise<ListeningTest>> = {
    "cambridge-11-test-1": () => import("./cambridge11Test1").then(m => m.cambridge11Test1),
    "cambridge-20-test-1": () => import("./cambridge20Test1").then(m => m.cambridge20Test1),
    "mock-1": () => import("./mockTest1Listening").then(m => m.mockTest1Listening),
    "t1-2": () => import("./trainer1Test2").then(m => m.trainer1Test2),
    "t1-3": () => import("./trainer1Test3").then(m => m.trainer1Test3),
    "t1-4": () => import("./trainer1Test4").then(m => m.trainer1Test4),
    "t2-1": () => import("./trainer2Test1").then(m => m.trainer2Test1),
};


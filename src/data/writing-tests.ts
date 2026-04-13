import { WritingTest } from "@/types/writing";
import { CONFIG } from "@/config";

export async function getWritingTest(id: string): Promise<WritingTest | null> {
    try {
        const response = await fetch(`${CONFIG.DATA_BASE_URL}/writing/${id}.json`);
        if (!response.ok) {
            console.error(`Failed to fetch writing test ${id}: ${response.statusText}`);
            return null;
        }
        
        return await response.json();
    } catch (err) {
        console.error(`Error loading writing test ${id}:`, err);
        return null;
    }
}

// Registry for the export script
export const TEST_LOADERS: Record<string, () => Promise<WritingTest>> = {
    "mt-1": () => import("./mockTest1Writing").then(m => m.mockTest1Writing),
    "writing-test-9": () => import("./mockTest9Writing").then(m => m.mockTest9Writing),
};

// Deprecated: Use getWritingTest(id) instead
export const WRITING_TESTS: Record<string, WritingTest> = {};


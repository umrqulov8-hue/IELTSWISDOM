import { cambridge11Test1 } from "./cambridge11Test1";
import type { ListeningTest } from "@/types/listening";

// Map ALL test IDs to cambridge11Test1 to prevent "Test Not Found" errors
export const LISTENING_TESTS: Record<string, ListeningTest> = {
    // Trainer 1
    "t1-1": cambridge11Test1,
    "t1-2": cambridge11Test1,
    "t1-3": cambridge11Test1,
    "t1-4": cambridge11Test1,
    "t1-5": cambridge11Test1,
    "t1-6": cambridge11Test1,
    // Trainer 2
    "t2-1": cambridge11Test1,
    "t2-2": cambridge11Test1,
    "t2-3": cambridge11Test1,
    "t2-4": cambridge11Test1,
    "t2-5": cambridge11Test1,
    "t2-6": cambridge11Test1,
    // Test Plus 3
    "tp3-1": cambridge11Test1,
    "tp3-2": cambridge11Test1,
    "tp3-3": cambridge11Test1,
    "tp3-4": cambridge11Test1,
    // Authentic
    "cambridge-11-test-1": cambridge11Test1,
    "auth-1": cambridge11Test1,
    "auth-2": cambridge11Test1,
    "auth-3": cambridge11Test1,
};

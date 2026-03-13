import { WritingTest } from "@/types/writing";
import { mockTest1Writing } from "./mockTest1Writing";
import { mockTest9Writing } from "./mockTest9Writing";

export const WRITING_TESTS: Record<string, WritingTest> = {
    "mt-1": mockTest1Writing,
    "writing-test-9": mockTest9Writing,
    // Add more tests here
};

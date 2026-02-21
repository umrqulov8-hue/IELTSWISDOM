export type ListeningQuestionType = "fill-blank" | "multiple-choice" | "matching" | "multiple-choice-multiple";

export interface ListeningQuestion {
    id: number;
    type: ListeningQuestionType;
    text?: string;
    options?: string[];
    correctAnswer: string | number | string[];
}

export interface ListeningPart {
    id: string;
    title: string;
    instructions: string;
    audioUrl?: string;
    content: string;
    questions: ListeningQuestion[];
}

export interface ListeningTest {
    id: string;
    title: string;
    parts: ListeningPart[];
}

import { cambridge11Test1 } from "./cambridge-11-test-1";

export const LISTENING_TESTS: Record<string, ListeningTest> = {
    "cambridge-11-test-1": cambridge11Test1
};

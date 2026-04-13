export type ListeningQuestionType = "fill-blank" | "multiple-choice" | "matching" | "multiple-choice-multiple";

export interface ListeningQuestion {
    id: number;
    type: ListeningQuestionType;
    text?: string;
    options?: string[];
    correctAnswer: string | number | string[];
    pointValue?: number;
}

export interface ListeningPart {
    id: string;
    title: string;
    instructions: string;
    audioUrl?: string;
    youtubeId?: string;
    content: string;
    questions: ListeningQuestion[];
}

export interface ListeningTest {
    id: string;
    title: string;
    parts: ListeningPart[];
}

export interface SpeakingQuestion {
    id: number;
    text: string;
}

export interface SpeakingPart {
    id: number;
    title: string;
    instructions: string;
    questions: SpeakingQuestion[];
}

export interface SpeakingTest {
    id: string;
    title: string;
    parts: SpeakingPart[];
}

export const SPEAKING_TESTS: Record<string, SpeakingTest> = {
    "jan-1": {
        id: "jan-1",
        title: "January Speaking Practice Test 1",
        parts: [
            {
                id: 1,
                title: "Part 1",
                instructions: "Answer questions 1-6",
                questions: [
                    { id: 1, text: "How do most people find out about the news in your country?" },
                    { id: 2, text: "Do you think the news is important?" },
                    { id: 3, text: "What kind of news do you usually watch or read?" },
                    { id: 4, text: "How has the way we get news changed over the years?" },
                    { id: 5, text: "Do you prefer to read newspapers or get news online?" },
                    { id: 6, text: "Can we always trust the news we read on the internet?" },
                ]
            },
            {
                id: 2,
                title: "Part 2",
                instructions: "Describe a piece of good news you received",
                questions: [
                    { id: 7, text: "Describe a piece of good news you received.\n\nYou should say:\n- what the news was\n- when you received it\n- who gave you the news\n\nand explain how you felt about it." }
                ]
            },
            {
                id: 3,
                title: "Part 3",
                instructions: "Answer questions 8-11",
                questions: [
                    { id: 8, text: "How do people usually share good news in your culture?" },
                    { id: 9, text: "Is it always necessary to tell the truth, even if the news is bad?" },
                    { id: 10, text: "Do you think children should be exposed to bad news from a young age?" },
                    { id: 11, text: "How does the media influence the way we perceive news?" },
                ]
            }
        ]
    }
};

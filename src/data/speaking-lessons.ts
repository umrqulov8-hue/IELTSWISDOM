export interface SpeakingLesson {
    id: string;
    lessonNumber: number;
    title: string;
    description: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    status: "completed" | "in-progress" | "not-started";
    score?: number;
    typeBadge: "Overview" | "Part 1" | "Part 2" | "Part 3" | "Skills" | "Full Test";
    testId: string;
}

export const SPEAKING_LESSONS: SpeakingLesson[] = [
    {
        id: "s-lesson-1",
        lessonNumber: 1,
        title: "IELTS Speaking Overview",
        description: "Understand the test format, assessment criteria, and common myths",
        duration: "15 min",
        level: "Beginner",
        status: "not-started",
        typeBadge: "Overview",
        testId: "intro"
    },
    {
        id: "s-lesson-2",
        lessonNumber: 2,
        title: "Part 1: Introduction & Interviews",
        description: "Practice answering personal questions about your life and interests",
        duration: "20 min",
        level: "Beginner",
        status: "not-started",
        typeBadge: "Part 1",
        testId: "jan-1"
    },
    {
        id: "s-lesson-3",
        lessonNumber: 3,
        title: "Pronunciation & Fluency",
        description: "Master the sounds of English and learn to speak without hesitation",
        duration: "25 min",
        level: "Beginner",
        status: "not-started",
        typeBadge: "Skills",
        testId: "jan-1"
    },
    {
        id: "s-lesson-4",
        lessonNumber: 4,
        title: "Part 2: Individual Long Turn",
        description: "Learn how to structure your 2-minute talk using the cue card",
        duration: "30 min",
        level: "Intermediate",
        status: "not-started",
        typeBadge: "Part 2",
        testId: "jan-1"
    },
    {
        id: "s-lesson-5",
        lessonNumber: 5,
        title: "Storytelling Techniques",
        description: "Use narrative structures to make your Part 2 answers more engaging",
        duration: "30 min",
        level: "Intermediate",
        status: "not-started",
        typeBadge: "Skills",
        testId: "jan-1"
    },
    {
        id: "s-lesson-6",
        lessonNumber: 6,
        title: "Part 3: Two-way Discussion",
        description: "Develop abstract thinking and discuss complex topics with the examiner",
        duration: "35 min",
        level: "Advanced",
        status: "not-started",
        typeBadge: "Part 3",
        testId: "jan-1"
    },
    {
        id: "s-lesson-7",
        lessonNumber: 7,
        title: "Advanced Vocabulary & Idioms",
        description: "Boost your Lexical Resource score with high-level expressions",
        duration: "30 min",
        level: "Advanced",
        status: "not-started",
        typeBadge: "Skills",
        testId: "jan-1"
    },
    {
        id: "s-lesson-8",
        lessonNumber: 8,
        title: "Full Speaking Test Practice",
        description: "Complete 15-minute speaking test simulation with feedback",
        duration: "45 min",
        level: "Expert",
        status: "not-started",
        typeBadge: "Full Test",
        testId: "jan-1"
    }
];

export const MIGRATED_SPEAKING_TESTS = [
    { id: "jan-1", title: "January Speaking Test 1", duration: "15 min", level: "Expert" },
];

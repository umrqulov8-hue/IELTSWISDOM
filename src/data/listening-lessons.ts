export interface ListeningLesson {
    id: string;
    lessonNumber: number;
    title: string;
    description: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    typeBadge: "Overview" | "Section 1" | "Section 2" | "Section 3" | "Section 4" | "Skills" | "Full Test";
    videoUrl: string;
    testId?: string;
    status?: "completed" | "in-progress" | "not-started" | "locked";
    score?: number;
}

export const LISTENING_LESSONS: ListeningLesson[] = [
    {
        id: "l-lesson-1",
        lessonNumber: 1,
        title: "IELTS Listening Overview",
        description: "Understanding the test format and question types",
        duration: "15 min",
        level: "Beginner",
        typeBadge: "Overview",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-2",
        lessonNumber: 2,
        title: "Section 1: Social Context",
        description: "Conversations in everyday social contexts",
        duration: "25 min",
        level: "Beginner",
        typeBadge: "Section 1",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-3",
        lessonNumber: 3,
        title: "Note-taking Strategies",
        description: "Effective techniques for capturing key information",
        duration: "20 min",
        level: "Beginner",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-4",
        lessonNumber: 4,
        title: "Form Completion Tasks",
        description: "Practice filling out forms with listening information",
        duration: "30 min",
        level: "Beginner",
        typeBadge: "Section 1",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-5",
        lessonNumber: 5,
        title: "Section 2: Monologues",
        description: "Speech about general interest topics",
        duration: "25 min",
        level: "Intermediate",
        typeBadge: "Section 2",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-6",
        lessonNumber: 6,
        title: "Multiple Choice Questions",
        description: "Master different types of multiple choice tasks",
        duration: "35 min",
        level: "Intermediate",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-7",
        lessonNumber: 7,
        title: "Map and Plan Completion",
        description: "Navigate through maps and building plans",
        duration: "30 min",
        level: "Intermediate",
        typeBadge: "Section 2",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-8",
        lessonNumber: 8,
        title: "Section 3: Educational Context",
        description: "Conversations in educational and training contexts",
        duration: "25 min",
        level: "Intermediate",
        typeBadge: "Section 3",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-9",
        lessonNumber: 9,
        title: "Matching Tasks",
        description: "Connect speakers with opinions, actions, or characteristics",
        duration: "35 min",
        level: "Advanced",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-10",
        lessonNumber: 10,
        title: "Section 4: Academic Lectures",
        description: "Monologues on academic subjects",
        duration: "25 min",
        level: "Advanced",
        typeBadge: "Section 4",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-11",
        lessonNumber: 11,
        title: "Sentence Completion",
        description: "Complete sentences using words from the audio",
        duration: "30 min",
        level: "Advanced",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-12",
        lessonNumber: 12,
        title: "Summary Completion",
        description: "Fill gaps in summaries of listening passages",
        duration: "35 min",
        level: "Advanced",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-13",
        lessonNumber: 13,
        title: "Predicting and Preparing",
        description: "Techniques for anticipating content and answers",
        duration: "25 min",
        level: "Advanced",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-14",
        lessonNumber: 14,
        title: "Dealing with Distractors",
        description: "Recognize and avoid wrong answer traps",
        duration: "30 min",
        level: "Advanced",
        typeBadge: "Skills",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "l-lesson-15",
        lessonNumber: 15,
        title: "IELTS Listening Strategies",
        description: "Final tips and strategies for the test day",
        duration: "40 min",
        level: "Expert",
        typeBadge: "Full Test",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
];

export const MIGRATED_LISTENING_TESTS = [
    { id: "cambridge-11-test-1", title: "Cambridge IELTS 11, Test 1", duration: "40 min", level: "Advanced" },
    { id: "t1-2", title: "IELTS Trainer 1, Test 2", duration: "40 min", level: "Intermediate" },
    { id: "t1-3", title: "IELTS Trainer 1, Test 3", duration: "40 min", level: "Advanced" },
    { id: "t1-4", title: "IELTS Trainer 1, Test 4", duration: "40 min", level: "Advanced" },
    { id: "t2-1", title: "IELTS Trainer 2, Test 1", duration: "40 min", level: "Advanced" },
    { id: "cambridge-20-test-1", title: "Cambridge IELTS 20, Test 1", duration: "40 min", level: "Advanced" },
];

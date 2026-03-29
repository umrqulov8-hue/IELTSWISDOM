export interface WritingLesson {
    id: string;
    lessonNumber: number;
    title: string;
    description: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    status: "completed" | "in-progress" | "not-started";
    score?: number;
    typeBadge: "Theory" | "Task 1" | "Task 2" | "Full Test";
    testId: string;
}

export const WRITING_LESSONS: WritingLesson[] = [
    {
        id: "w-lesson-1",
        lessonNumber: 1,
        title: "IELTS Writing Overview",
        description: "Understanding Task 1 and Task 2 requirements and assessment criteria",
        duration: "20 min",
        level: "Beginner",
        status: "completed",
        score: 88,
        typeBadge: "Theory",
        testId: "intro"
    },
    {
        id: "w-lesson-2",
        lessonNumber: 2,
        title: "Task 1: Graph Description",
        description: "Learn to describe charts, graphs, and tables effectively",
        duration: "45 min",
        level: "Beginner",
        status: "completed",
        score: 82,
        typeBadge: "Task 1",
        testId: "mt-1"
    },
    {
        id: "w-lesson-3",
        lessonNumber: 3,
        title: "Task 1: Process Diagrams",
        description: "Master describing processes and how things work",
        duration: "40 min",
        level: "Intermediate",
        status: "not-started",
        typeBadge: "Task 1",
        testId: "mt-1"
    },
    {
        id: "w-lesson-4",
        lessonNumber: 4,
        title: "Task 1: Maps and Plans",
        description: "Learn to describe changes in maps and architectural plans",
        duration: "40 min",
        level: "Intermediate",
        status: "not-started",
        typeBadge: "Task 1",
        testId: "mt-1"
    },
    {
        id: "w-lesson-5",
        lessonNumber: 5,
        title: "Task 2: Essay Structure",
        description: "Build strong foundations with proper essay organization",
        duration: "35 min",
        level: "Beginner",
        status: "not-started",
        typeBadge: "Task 2",
        testId: "mt-1"
    },
    {
        id: "w-lesson-6",
        lessonNumber: 6,
        title: "Task 2: Opinion Essays",
        description: "Express and support your opinions clearly and convincingly",
        duration: "50 min",
        level: "Intermediate",
        status: "not-started",
        typeBadge: "Task 2",
        testId: "mt-1"
    },
    {
        id: "w-lesson-7",
        lessonNumber: 7,
        title: "Task 2: Discussion Essays",
        description: "Learn to analyze both sides of an argument balancedly",
        duration: "50 min",
        level: "Intermediate",
        status: "not-started",
        typeBadge: "Task 2",
        testId: "mt-1"
    },
    {
        id: "w-lesson-8",
        lessonNumber: 8,
        title: "Task 2: Problem-Solution Essays",
        description: "Address issues and propose effective solutions",
        duration: "50 min",
        level: "Advanced",
        status: "not-started",
        typeBadge: "Task 2",
        testId: "mt-1"
    },
    {
        id: "w-lesson-9",
        lessonNumber: 9,
        title: "Task 2: Double Question Essays",
        description: "Answering multiple questions within a single essay",
        duration: "40 min",
        level: "Advanced",
        status: "not-started",
        typeBadge: "Task 2",
        testId: "writing-test-9"
    },
    {
        id: "w-lesson-10",
        lessonNumber: 10,
        title: "Complete Writing Test Practice",
        description: "Full 60-minute writing test with both tasks",
        duration: "60 min",
        level: "Expert",
        status: "not-started",
        typeBadge: "Full Test",
        testId: "mt-1"
    }
];

export const MIGRATED_WRITING_TESTS = [
    { id: "mt-1", title: "Writing Mock Test 1", duration: "60 min", level: "Expert" },
    { id: "writing-test-9", title: "Writing Mock Test 9", duration: "60 min", level: "Expert" }
];

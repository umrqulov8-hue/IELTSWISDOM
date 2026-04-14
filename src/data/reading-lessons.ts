export interface ReadingLesson {
    id: string;
    lessonNumber: number;
    title: string;
    description: string;
    duration: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    status: "completed" | "in-progress" | "not-started" | "locked";
    score?: number;
    type: "lesson" | "test";
    categoryId?: string;
    testId: string;
}

export const READING_LESSONS: ReadingLesson[] = [
    {
        id: "lesson-1",
        lessonNumber: 1,
        title: "Academic Reading: Passage Types",
        description: "Learn about different types of academic passages and their structures",
        duration: "25 min",
        level: "Beginner",
        status: "not-started",
        type: "lesson",
        testId: "fp-10"
    },
    {
        id: "lesson-2",
        lessonNumber: 2,
        title: "Skimming and Scanning Techniques",
        description: "Master essential reading strategies for time management",
        duration: "30 min",
        level: "Beginner",
        status: "not-started",
        type: "lesson",
        testId: "fp-11"
    },
    {
        id: "lesson-3",
        lessonNumber: 3,
        title: "Multiple Choice Questions",
        description: "Practice with various multiple choice question types",
        duration: "35 min",
        level: "Intermediate",
        status: "not-started",
        type: "lesson",
        testId: "fp-12"
    },
    {
        id: "lesson-4",
        lessonNumber: 4,
        title: "True/False/Not Given Questions",
        description: "Learn to distinguish between these tricky question types",
        duration: "40 min",
        level: "Intermediate",
        status: "not-started",
        type: "lesson",
        testId: "fp-3"
    },
    {
        id: "lesson-5",
        lessonNumber: 5,
        title: "Matching Headings",
        description: "Develop skills for paragraph heading matching tasks",
        duration: "35 min",
        level: "Intermediate",
        status: "not-started",
        type: "lesson",
        testId: "fp-4"
    },
    {
        id: "lesson-6",
        lessonNumber: 6,
        title: "Summary Completion",
        description: "Practice completing summaries with given words",
        duration: "40 min",
        level: "Advanced",
        status: "not-started",
        type: "lesson",
        testId: "fp-9"
    },
    {
        id: "lesson-7",
        lessonNumber: 7,
        title: "Diagram Labeling",
        description: "Learn to label diagrams using passage information",
        duration: "30 min",
        level: "Advanced",
        status: "not-started",
        type: "lesson",
        testId: "south-pole-adventurer"
    },
    {
        id: "lesson-8",
        lessonNumber: 8,
        title: "Short Answer Questions",
        description: "Practice answering questions with word limits",
        duration: "35 min",
        level: "Advanced",
        status: "not-started",
        type: "lesson",
        testId: "homers-literary-legacy"
    },
    {
        id: "lesson-9",
        lessonNumber: 9,
        title: "Sentence Completion",
        description: "Complete sentences using words from the passage",
        duration: "40 min",
        level: "Advanced",
        status: "not-started",
        type: "lesson",
        testId: "the-rise-of-agribots"
    },
    {
        id: "lesson-10",
        lessonNumber: 10,
        title: "Table Completion",
        description: "Fill in tables with information from reading passages",
        duration: "35 min",
        level: "Advanced",
        status: "not-started",
        type: "lesson",
        testId: "fp-13"
    },
    {
        id: "lesson-11",
        lessonNumber: 11,
        title: "Reading Speed & Comprehension",
        description: "Improve reading speed while maintaining understanding",
        duration: "45 min",
        level: "Advanced",
        status: "not-started",
        type: "lesson",
        testId: "fp-14"
    },
    {
        id: "lesson-12",
        lessonNumber: 12,
        title: "Full Reading Test Practice",
        description: "Complete a full 60-minute reading test simulation",
        duration: "60 min",
        level: "Expert",
        status: "not-started",
        type: "lesson",
        testId: "mt-1"
    }
];

export const MIGRATED_TESTS = [
    { id: "homers-literary-legacy", categoryId: "premium-passages", title: "Homer's Literary Legacy", level: "Advanced", duration: "20 min" },
    { id: "the-rise-of-agribots", categoryId: "premium-passages", title: "The Rise of Agribots", level: "Advanced", duration: "20 min" },
    { id: "fp-9", categoryId: "free-passages", title: "Socially Responsible Businesses", level: "Intermediate", duration: "20 min" },
    { id: "south-pole-adventurer", categoryId: "free-passages", title: "South Pole Adventurer", level: "Intermediate", duration: "20 min" },
    { id: "fp-13", categoryId: "free-passages", title: "The Dover Bronze-Age Boat", level: "Intermediate", duration: "20 min" },
    { id: "fp-14", categoryId: "free-passages", title: "Verbal and Non-Verbal Message", level: "Intermediate", duration: "20 min" },
    { id: "fp-15", categoryId: "free-passages", title: "Katherine Mansfield", level: "Intermediate", duration: "20 min" },
    { id: "fp-16", categoryId: "free-passages", title: "Aphantasia", level: "Intermediate", duration: "20 min" },
    { id: "fp-17", categoryId: "free-passages", title: "Margaret Preston", level: "Intermediate", duration: "20 min" },
    { id: "fp-18", categoryId: "free-passages", title: "Villains, crooks and gangsters", level: "Intermediate", duration: "20 min" },
    { id: "fp-19", categoryId: "free-passages", title: "Fear of the Unknown", level: "Intermediate", duration: "20 min" },
    { id: "fp-20", categoryId: "free-passages", title: "Britain strong TV industry", level: "Intermediate", duration: "20 min" },
    { id: "fp-21", categoryId: "free-passages", title: "Way out of a food desert", level: "Intermediate", duration: "20 min" },
    { id: "fp-22", categoryId: "free-passages", title: "Insect decision-making", level: "Intermediate", duration: "20 min" },
    { id: "fp-23", categoryId: "free-passages", title: "History Of The Handshake", level: "Intermediate", duration: "20 min" },
    { id: "fp-24", categoryId: "free-passages", title: "Economic Evolution", level: "Intermediate", duration: "20 min" },
    { id: "fp-10", categoryId: "cambridge-ielts", title: "Crop-growing skyscrapers", level: "Advanced", duration: "20 min" },
    { id: "fp-11", categoryId: "cambridge-ielts", title: "The Falkirk Wheel", level: "Advanced", duration: "20 min" },
    { id: "fp-12", categoryId: "cambridge-ielts", title: "Climate Change Effects", level: "Advanced", duration: "20 min" },
    { id: "fp-3", categoryId: "cambridge-ielts", title: "Raising the Mary Rose", level: "Advanced", duration: "20 min" },
    { id: "fp-4", categoryId: "cambridge-ielts", title: "Easter Island Civilization", level: "Advanced", duration: "20 min" },
    { id: "mt-1", categoryId: "full-tests", title: "IELTS Reading Mock Test 1", level: "Expert", duration: "60 min" },
    { id: "mock-2-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 2", level: "Expert", duration: "60 min" },
    { id: "mock-3-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 3", level: "Expert", duration: "60 min" },
    { id: "mock-4-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 4", level: "Expert", duration: "60 min" },
    { id: "mock-5-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 5", level: "Expert", duration: "60 min" },
    { id: "mock-6-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 6", level: "Expert", duration: "60 min" },
    { id: "mock-7-full", categoryId: "full-tests", title: "IELTS Reading Mock Test 7", level: "Expert", duration: "60 min" },
];

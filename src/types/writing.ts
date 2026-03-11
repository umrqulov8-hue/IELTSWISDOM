export type WritingTaskType = "task-1" | "task-2";

export interface WritingTask {
    title: string;
    type: WritingTaskType;
    minWords: number;
    prompt: string;
    image?: string;
}

export interface WritingTest {
    id: string;
    title: string;
    type: "full-test" | "single-task";
    tasks: WritingTask[];
}

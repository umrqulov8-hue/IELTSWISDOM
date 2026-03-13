import { WritingTest } from "@/types/writing";

export const mockTest9Writing: WritingTest = {
    id: "writing-test-9",
    title: "March 10 Test",
    type: "full-test",
    tasks: [
        {
            title: "Writing Task 1",
            type: "task-1",
            minWords: 150,
            prompt: `
                <div class="space-y-4">
                    <p class="font-bold text-lg">You should spend about 20 minutes on this task.</p>
                    <p class="text-slate-700">The diagram below shows a simple system that turns water into clean water.</p>
                    <p class="text-slate-700">Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>
                    <p class="font-bold">Write at least 150 words.</p>
                </div>
                <div class="mt-8 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <img src="/image for writing test/photo_2026-03-13_19-59-13.jpg" alt="Water Cleaning System Diagram" class="max-w-full h-auto mx-auto rounded-md" />
                </div>
            `
        },
        {
            title: "Writing Task 2",
            type: "task-2",
            minWords: 250,
            prompt: `
                <div class="space-y-4">
                    <p class="font-bold text-lg">You should spend about 40 minutes on this task.</p>
                    <p class="text-slate-700">As major cities around the world are growing, so are their problems. What are these problems for young people living in cities? What are possible solutions for these problems?</p>
                    <p class="text-slate-700 font-bold">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p class="font-bold">Write at least 250 words.</p>
                </div>
            `
        }
    ]
};

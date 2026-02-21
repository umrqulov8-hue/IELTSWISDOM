export type ListeningQuestionType = "fill-blank" | "multiple-choice" | "matching";

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
    audioUrl?: string; // We'll put a placeholder audio if needed
    content: string; // HTML content for the questions (like reading)
    questions: ListeningQuestion[];
}

export interface ListeningTest {
    id: string;
    title: string;
    parts: ListeningPart[];
}

export const LISTENING_TESTS: Record<string, ListeningTest> = {
    "t1-1": {
        id: "t1-1",
        title: "IELTS Trainer 1, Test 1",
        parts: [
            {
                id: "part-1",
                title: "Part 1: Listen and answer questions 1-10",
                instructions: "Questions 1-10",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // mock audio
                content: `
                    <div class="mb-6">
                        <p class="font-bold mb-2">Complete the notes below.</p>
                        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD ONLY</span> for each answer.</p>
                        
                        <h4 class="font-bold mb-4">Research in the Area Around the Chobe Bird Sanctuary</h4>
                        
                        <p class="font-bold text-sm mb-2 mt-6">The importance of birds of prey to local communities</p>
                        <ul class="list-disc pl-5 space-y-3 mb-6">
                            <li>They destroy <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">1</span><input id="q-1" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> and other rodents.</li>
                            <li>They help prevent farmers from being bitten by <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">2</span><input id="q-2" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span>.</li>
                            <li>They have been an important part of local culture for many years.</li>
                            <li>They now support the economy by encouraging <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">3</span><input id="q-3" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> in the area.</li>
                        </ul>

                        <p class="font-bold text-sm mb-2 mt-6">Falling numbers of birds of prey</p>
                        <p class="mb-2">- The birds may be accidentally killed:</p>
                        <ul class="list-disc pl-10 space-y-3 mb-4">
                            <li>By <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">4</span><input id="q-4" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> when hunting or sleeping.</li>
                            <li>By electrocution from power lines, especially during times of high <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">5</span><input id="q-5" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span>.</li>
                        </ul>
                        <p class="mb-6">- Local farmers may illegally shoot them or <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">6</span><input id="q-6" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> them.</p>

                        <p class="font-bold text-sm mb-2 mt-6">Ways of protecting chickens from birds of prey</p>
                        <div class="space-y-3 pl-2">
                           <p>- Clearing away vegetation (unhelpful).</p>
                           <p>- Providing a <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">7</span><input id="q-7" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> for chickens (expensive).</p>
                           <p>- Frightening birds of prey by:</p>
                           <ul class="list-disc pl-10 space-y-3 mb-4">
                               <li>Keeping a <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">8</span><input id="q-8" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span>.</li>
                               <li>Making a <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">9</span><input id="q-9" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> (e.g., with metal objects).</li>
                           </ul>
                           <p>- A <span class="inline-flex items-center gap-2"><span class="flex-none w-6 h-6 bg-white border border-slate-300 rounded font-bold flex items-center justify-center text-xs">10</span><input id="q-10" type="text" class="border border-slate-300 rounded px-2 py-1 w-32 focus:outline-none focus:border-blue-500 transition-colors" /></span> of methods is usually most effective.</p>
                        </div>
                    </div>
                `,
                questions: [
                    { id: 1, type: "fill-blank", correctAnswer: "insects" },
                    { id: 2, type: "fill-blank", correctAnswer: "snakes" },
                    { id: 3, type: "fill-blank", correctAnswer: "tourism" },
                    { id: 4, type: "fill-blank", correctAnswer: "vehicles" },
                    { id: 5, type: "fill-blank", correctAnswer: "winds" },
                    { id: 6, type: "fill-blank", correctAnswer: "poison" },
                    { id: 7, type: "fill-blank", correctAnswer: "shelter" },
                    { id: 8, type: "fill-blank", correctAnswer: "dog" },
                    { id: 9, type: "fill-blank", correctAnswer: "noise" },
                    { id: 10, type: "fill-blank", correctAnswer: "combination" },
                ]
            }
        ]
    }
}

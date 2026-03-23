import type { ListeningTest } from "@/types/listening";

export const mockTest1Listening: ListeningTest = {
    id: "mt-1",
    title: "Mock Test 1",
    parts: [
        {
            id: "part-1",
            title: "Part 1",
            instructions: "Questions 1-10",
            audioUrl: "/test%20uchun%20video/listening.mp4",
            content: `
            <div class="mb-6">
                <p class="font-bold mb-4">Complete the notes below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>
                
                <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-8 w-full text-[15px]">
                    <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline">Customer complaint form: product return</h3>
                    
                    <div class="space-y-6">
                        <div class="font-bold">Type of product: vacuum cleaner</div>

                        <div>
                            <p class="font-bold italic mb-2">Customer details</p>
                            <div class="space-y-2">
                                <p>Name: Diane <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">1</span><input id="q-1" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                                <p>Street address: 34 <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">2</span><input id="q-2" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                                <p>City: Hamilton</p>
                                <p>Telephone: 970 7520 (her <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">3</span><input id="q-3" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> number)</p>
                            </div>
                        </div>

                        <div>
                            <p class="font-bold italic mb-2">Product details</p>
                            <div class="space-y-2">
                                <p>Date of purchase: on <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">4</span><input id="q-4" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                                <p>Make and model: Volta Budget</p>
                                <p>Power: 2000 watts</p>
                                <p>Color: red</p>
                                <p>Purchase price: $ <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">5</span><input id="q-5" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> (in the sale)</p>
                            </div>
                        </div>

                        <div>
                            <p class="font-bold italic mb-2">Fault details</p>
                            <div class="space-y-2">
                                <p>Problem with: the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">6</span><input id="q-6" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                                <p>First solution: free <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">7</span><input id="q-7" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> (not accepted by customer)</p>
                                <p>Action requested: exchange</p>
                            </div>
                        </div>

                        <div>
                            <p class="font-bold italic mb-2">Customer requirements</p>
                            <div class="space-y-2">
                                <p>Special features needed: a reusable <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">8</span><input id="q-8" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                                <p>Price quoted: $ <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">9</span><input id="q-9" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                                <p>Preferred color: <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">10</span><input id="q-10" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
            questions: [
                { id: 1, type: "fill-blank", correctAnswer: "RUDDICK" },
                { id: 2, type: "fill-blank", correctAnswer: "Garden Avenue" },
                { id: 3, type: "fill-blank", correctAnswer: "home" },
                { id: 4, type: "fill-blank", correctAnswer: "31st July" },
                { id: 5, type: "fill-blank", correctAnswer: "104" },
                { id: 6, type: "fill-blank", correctAnswer: "handle" },
                { id: 7, type: "fill-blank", correctAnswer: "repair" },
                { id: 8, type: "fill-blank", correctAnswer: "dust bag" },
                { id: 9, type: "fill-blank", correctAnswer: "180" },
                { id: 10, type: "fill-blank", correctAnswer: "silver" },
            ]
        },
        {
            id: "part-2",
            title: "Part 2",
            instructions: "Questions 11-20",
            audioUrl: "/test%20uchun%20video/listening.mp4",
            content: `
            <div class="mb-10">
                <h3 class="font-bold text-xl mb-6">Linwood Apartment Complex</h3>

                <div class="mb-10">
                    <p class="font-bold mb-4">Questions 11-14</p>
                    <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
                    
                    <!-- QUESTIONS_PLACEHOLDER -->
                </div>

                <div class="mb-10">
                    <p class="font-bold mb-4">Questions 15-20</p>
                    <p class="mb-6">Label the map below. Write the correct letter, <span class="font-bold">A-K</span>, next to questions 15-20.</p>
                    
                    <div class="flex flex-col items-center">
                        <div class="w-full bg-white p-6 border-2 border-slate-800 rounded-sm">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DnXu8TgLt2hQCVELkz7qkWZINcU2p5.png" alt="Linwood Apartment Complex Map" class="h-auto mx-auto mb-8 border border-slate-200" />
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div class="flex items-center gap-3">
                                    <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">15</span>
                                    <span>Shop</span>
                                    <input id="q-15" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">16</span>
                                    <span>Barbecue area</span>
                                    <input id="q-16" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">17</span>
                                    <span>Childcare center</span>
                                    <input id="q-17" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">18</span>
                                    <span>Laundry</span>
                                    <input id="q-18" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">19</span>
                                    <span>Recreation room</span>
                                    <input id="q-19" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">20</span>
                                    <span>Hall</span>
                                    <input id="q-20" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
            questions: [
                {
                    id: 11,
                    type: "multiple-choice",
                    text: "When was the first apartment complex completed?",
                    options: ["1 year ago", "3 years ago", "5 years ago"],
                    correctAnswer: "0" // A
                },
                {
                    id: 12,
                    type: "multiple-choice",
                    text: "What does the manager say he enjoys most about the job?",
                    options: ["resolving problems between residents", "dealing with financial matters", "organizing building maintenance"],
                    correctAnswer: "0" // A
                },
                {
                    id: 13,
                    type: "multiple-choice",
                    text: "Regarding restrictions in the complex, the manager says",
                    options: ["only some types of flowers can be planted", "only the interiors of apartments can be painted", "only certain colors can be used on the walls"],
                    correctAnswer: "1" // B
                },
                {
                    id: 14,
                    type: "multiple-choice",
                    text: "What does the manager ask residents to do for the welcome party?",
                    options: ["bring food", "prepare name tags", "decorate the hall"],
                    correctAnswer: "2" // C
                },
                { id: 15, type: "fill-blank", correctAnswer: "F" },
                { id: 16, type: "fill-blank", correctAnswer: "C" },
                { id: 17, type: "fill-blank", correctAnswer: "D" },
                { id: 18, type: "fill-blank", correctAnswer: "E" },
                { id: 19, type: "fill-blank", correctAnswer: "H" },
                { id: 20, type: "fill-blank", correctAnswer: "A" }
            ]
        },
        {
            id: "part-3",
            title: "Part 3",
            instructions: "Questions 21-30",
            audioUrl: "/test%20uchun%20video/listening.mp4",
            content: `
            <div class="mb-10">
                <div class="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                    <p class="font-bold mb-2">Questions 21-22</p>
                    <p class="mb-3">Choose <span class="font-bold uppercase">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
                    <p class="mb-6 font-semibold">For which TWO reasons did Alice and David decide to focus on cricket equipment?</p>
                    
                    <div class="space-y-3 mb-6 pl-4 font-medium text-slate-700">
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">A</span> Women's cricket is growing in popularity</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">B</span> The regulations have been changed</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">C</span> The number of cricket injuries has been increasing</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">D</span> The equipment has improved recently</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">E</span> The quality of the equipment varies a lot</p>
                    </div>
                    
                    <div class="flex items-center gap-8 pl-4">
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-base">21</span>
                            <input id="q-21" type="text" class="border border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-12 h-10 text-center font-bold uppercase text-lg rounded-md shadow-sm transition-all" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-base">22</span>
                            <input id="q-22" type="text" class="border border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-12 h-10 text-center font-bold uppercase text-lg rounded-md shadow-sm transition-all" maxLength={1} />
                        </div>
                    </div>
                </div>

                <div class="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                    <p class="font-bold mb-2">Questions 23-24</p>
                    <p class="mb-3">Choose <span class="font-bold uppercase">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
                    <p class="mb-6 font-semibold">For which TWO things surprised Alice and David about professional cricket bats?</p>
                    
                    <div class="space-y-3 mb-6 pl-4 font-medium text-slate-700">
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">A</span> They are so expensive to make</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">B</span> They differ depending on what they are used for</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">C</span> They are made in so many different locations</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">D</span> They have to be made of natural materials</p>
                        <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">E</span> They require such a high standard of care</p>
                    </div>
                    
                    <div class="flex items-center gap-8 pl-4">
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-base">23</span>
                            <input id="q-23" type="text" class="border border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-12 h-10 text-center font-bold uppercase text-lg rounded-md shadow-sm transition-all" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-bold text-base">24</span>
                            <input id="q-24" type="text" class="border border-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-12 h-10 text-center font-bold uppercase text-lg rounded-md shadow-sm transition-all" maxLength={1} />
                        </div>
                    </div>
                </div>

                <div class="mb-10">
                    <p class="font-bold mb-4">Questions 25-30</p>
                    <p class="mb-6">What decision do the students take for each of the following sections of their presentation? Choose <span class="font-bold uppercase">SIX</span> answers from the box and write the correct letter, <span class="font-bold">A-H</span>, next to questions 25-30.</p>

                    <div class="border-2 border-slate-800 p-6 rounded-sm bg-white mb-6 w-full">
                        <h4 class="font-bold text-center underline mb-4 uppercase">Decisions</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p><span class="font-bold mr-2">A</span> Get the audience to try out the equipment</p>
                            <p><span class="font-bold mr-2">B</span> Focus on the materials used</p>
                            <p><span class="font-bold mr-2">C</span> Include some photographs</p>
                            <p><span class="font-bold mr-2">D</span> Make the section shorter</p>
                            <p><span class="font-bold mr-2">E</span> Ask the audience for their opinion</p>
                            <p><span class="font-bold mr-2">F</span> Change the order of the information</p>
                            <p><span class="font-bold mr-2">G</span> Show how the equipment is used</p>
                            <p><span class="font-bold mr-2">H</span> Leave the section unchanged</p>
                        </div>
                    </div>

                    <div class="space-y-4 w-full text-[15px]">
                        <div class="flex items-center gap-4">
                            <span class="font-bold bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm">25</span>
                            <span class="w-48 font-medium">Historical background</span>
                            <input id="q-25" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm">26</span>
                            <span class="w-48 font-medium">Bat design</span>
                            <input id="q-26" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm">27</span>
                            <span class="w-48 font-medium">Ball design</span>
                            <input id="q-27" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm">28</span>
                            <span class="w-48 font-medium">Helmet design</span>
                            <input id="q-28" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm">29</span>
                            <span class="w-48 font-medium">Protective gear</span>
                            <input id="q-29" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold bg-black text-white w-6 h-6 flex items-center justify-center rounded-sm">30</span>
                            <span class="w-48 font-medium">Advertising</span>
                            <input id="q-30" type="text" class="border border-black w-12 h-8 text-center focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-bold uppercase rounded-sm shadow-sm" maxLength={1} />
                        </div>
                    </div>
                </div>
            </div>
            `,
            questions: [
                { id: 21, type: "fill-blank", correctAnswer: ["C", "D"] },
                { id: 22, type: "fill-blank", correctAnswer: ["C", "D"] },
                { id: 23, type: "fill-blank", correctAnswer: ["A", "B"] },
                { id: 24, type: "fill-blank", correctAnswer: ["A", "B"] },
                { id: 25, type: "fill-blank", correctAnswer: "D" },
                { id: 26, type: "fill-blank", correctAnswer: "C" },
                { id: 27, type: "fill-blank", correctAnswer: "G" },
                { id: 28, type: "fill-blank", correctAnswer: "B" },
                { id: 29, type: "fill-blank", correctAnswer: "H" },
                { id: 30, type: "fill-blank", correctAnswer: "E" }
            ]
        },
        {
            id: "part-4",
            title: "Part 4",
            instructions: "Questions 31-40",
            audioUrl: "/test%20uchun%20video/listening.mp4",
            content: `
            <div class="mb-10">
                <p class="font-bold mb-4">Complete the notes below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD ONLY</span> for each answer.</p>

                <div class="border-2 border-slate-800 p-6 sm:p-10 rounded-sm bg-white mb-8 w-full text-[15px]">
                    <h3 class="font-bold text-center text-xl mb-8 tracking-wide">Human babies and numerical ability</h3>
                    
                    <div class="space-y-8">
                        <div>
                            <p class="font-bold italic mb-4">Interpreting a baby's thoughts</p>
                            <ul class="list-disc pl-5 space-y-3">
                                <li>In the 19th century, William James said new-born babies were in a state of <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">31</span><input id="q-31" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                                <li>Modern researchers can tell what babies are interested in by studying movements of their <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">32</span><input id="q-32" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                            </ul>
                        </div>

                        <div>
                            <p class="font-bold italic mb-4">Experiments with babies and numbers</p>
                            <ul class="list-disc pl-5 space-y-3">
                                <li>One-day-old babies were shown several cards with <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">33</span><input id="q-33" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> on</li>
                                <li>They were interested when the number changed</li>
                                <li>They were not interested when the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">34</span><input id="q-34" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> changed</li>
                                <li>Older babies were shown cards with <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">35</span><input id="q-35" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> of different things</li>
                                <li>They were most interested when the number changed</li>
                                <li>These experiments suggest babies have a sense of number</li>
                            </ul>
                        </div>

                        <div>
                            <p class="font-bold italic mb-4">Animals and numbers</p>
                            <ul class="list-disc pl-5 space-y-3">
                                <li>Some birds can find food in a box by <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">36</span><input id="q-36" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> numbers, which involves counting</li>
                                <li>Wild lions can estimate the number of lions in another group from the sound they make.</li>
                                <li>They can then decide whether or not to <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">37</span><input id="q-37" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> the other group</li>
                            </ul>
                        </div>

                        <div>
                            <p class="font-bold italic mb-4">Humans and counting</p>
                            <ul class="list-disc pl-5 space-y-3">
                                <li>Research with aboriginal children concludes that <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">38</span><input id="q-38" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> is not essential for understanding numbers.</li>
                                <li>Researchers think that counting developed at the same time as people started <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">39</span><input id="q-39" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                                <li>Europeans may once have used fingers and <span class="inline-flex items-center gap-2"><span class="font-bold text-sm bg-black text-white px-1.5 py-0.5 rounded">40</span><input id="q-40" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> for counting.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            `,
            questions: [
                { id: 31, type: "fill-blank", correctAnswer: "confusion" },
                { id: 32, type: "fill-blank", correctAnswer: "eyes" },
                { id: 33, type: "fill-blank", correctAnswer: "dots" },
                { id: 34, type: "fill-blank", correctAnswer: "arrangement" },
                { id: 35, type: "fill-blank", correctAnswer: "pictures" },
                { id: 36, type: "fill-blank", correctAnswer: "matching" },
                { id: 37, type: "fill-blank", correctAnswer: "fight" },
                { id: 38, type: "fill-blank", correctAnswer: "language" },
                { id: 39, type: "fill-blank", correctAnswer: "farming" },
                { id: 40, type: "fill-blank", correctAnswer: "toes" }
            ]
        }
    ]
};

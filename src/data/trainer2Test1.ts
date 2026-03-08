import type { ListeningTest } from "@/types/listening";

export const trainer2Test1: ListeningTest = {
    id: "t2-1",
    title: "IELTS Trainer 2, Test 1",
    parts: [
        {
            id: "part-1",
            title: "Part 1",
            instructions: "Questions 1-10",
            audioUrl: "/audio/trainer2-test1.m4a",
            content: `
            <div class="mb-6">
                <p class="font-bold mb-4">Complete the table below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>
                
                <div class="border-2 border-slate-800 rounded-sm bg-white mb-8">
                    <h3 class="font-bold text-center text-lg my-6 tracking-wide uppercase">Your Best Furniture</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse border border-slate-400 min-w-[500px]">
                            <thead>
                                <tr class="bg-slate-700 text-white">
                                    <th class="border border-slate-400 p-3 text-center">ITEM</th>
                                    <th class="border border-slate-400 p-3 text-center">REQUIRED</th>
                                    <th class="border border-slate-400 p-3 text-center">PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-slate-50">
                                    <td class="border border-slate-400 p-3 font-semibold">Bed</td>
                                    <td class="border border-slate-400 p-3">
                                        <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">1</span><input id="q-1" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> size
                                    </td>
                                    <td class="border border-slate-400 p-3">£189</td>
                                </tr>
                                <tr>
                                    <td class="border border-slate-400 p-3">
                                        <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">2</span><input id="q-2" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                                    </td>
                                    <td class="border border-slate-400 p-3">White colour</td>
                                    <td class="border border-slate-400 p-3">£69</td>
                                </tr>
                                <tr class="bg-slate-50">
                                    <td class="border border-slate-400 p-3 font-semibold">Dinner table</td>
                                    <td class="border border-slate-400 p-3">
                                        Round with <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">3</span><input id="q-3" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                                    </td>
                                    <td class="border border-slate-400 p-3">
                                        <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">4</span><input id="q-4" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="border border-slate-400 p-3 font-semibold">Wardrobe</td>
                                    <td class="border border-slate-400 p-3">
                                        <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">5</span><input id="q-5" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                                    </td>
                                    <td class="border border-slate-400 p-3">£399</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <p class="font-bold mb-4 mt-12">Questions 6-10</p>
                <p class="font-bold mb-4">Complete the notes below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>

                <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white">
                    <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline uppercase">Customer's Details</h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Name:</span>
                            <span>Daniel Kahn</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Address:</span>
                            <span>Hill House <span class="inline-flex items-center gap-2 mx-2"><span class="font-bold text-sm">6</span><input id="q-6" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> 16th</span>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Contact number:</span>
                            <span>4478 0135</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Delivery time:</span>
                            <span>1:00 p.m. – 2:00 p.m. on next <span class="inline-flex items-center gap-2 ml-2"><span class="font-bold text-sm">7</span><input id="q-7" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></span>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Total cost:</span>
                            <span>£760</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Payment:</span>
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">8</span><input id="q-8" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </div>
                        <div class="flex items-start gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Delivery Fee:</span>
                            <span>Free</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Delivery transport:</span>
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">9</span><input id="q-9" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-40 flex-shrink-0">Reference number:</span>
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">10</span><input id="q-10" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </div>
                    </div>
                </div>
            </div>
            `,
            questions: [
                { id: 1, type: "fill-blank", correctAnswer: ["king", "king size", "king-size"] },
                { id: 2, type: "fill-blank", correctAnswer: "light" },
                { id: 3, type: "fill-blank", correctAnswer: ["4 chairs", "four chairs"] },
                { id: 4, type: "fill-blank", correctAnswer: ["229", "229 pounds", "229 gbp", "£229"] },
                { id: 5, type: "fill-blank", correctAnswer: "european design" },
                { id: 6, type: "fill-blank", correctAnswer: "dave lane" },
                { id: 7, type: "fill-blank", correctAnswer: "sunday" },
                { id: 8, type: "fill-blank", correctAnswer: "credit card" },
                { id: 9, type: "fill-blank", correctAnswer: "truck" },
                { id: 10, type: "fill-blank", correctAnswer: ["fg0418", "fg 0418"] },
            ]
        },
        {
            id: "part-2",
            title: "Part 2",
            instructions: "Questions 11-20",
            audioUrl: "/audio/trainer2-test1.m4a",
            content: `
            <div class="mb-10">
                <p class="font-bold mb-4">Complete the notes below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>
                
                <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10">
                    <h3 class="font-bold text-center text-xl mb-6 tracking-wide uppercase underline">TULIP HOT SPRING GARDEN RESORT</h3>
                    
                    <div class="space-y-4 mb-8 text-lg">
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-48 flex-shrink-0">Location:</span>
                            <span><span class="inline-flex items-center gap-2 mr-2"><span class="font-bold text-sm">11</span><input id="q-11" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> close to Peak Mountains</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-48 flex-shrink-0">Hot spring depth:</span>
                            <span><span class="inline-flex items-center gap-2 mr-2"><span class="font-bold text-sm">12</span><input id="q-12" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> metres under the ground</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold w-48 flex-shrink-0">Temperature:</span>
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">13</span><input id="q-13" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </div>
                    </div>

                    <p class="font-bold mb-3">Notice for tourists:</p>
                    <ul class="list-disc pl-5 mb-8 space-y-3">
                        <li>Adjust water temperature before bathing.</li>
                        <li>Do not bath immediately after drinking.</li>
                        <li>Do not take your <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">14</span><input id="q-14" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> when bathing.</li>
                    </ul>

                    <p class="font-bold mb-3">There are:</p>
                    <ul class="list-disc pl-5 space-y-3">
                        <li>56 different water sports.</li>
                        <li>21 different <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">15</span><input id="q-15" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                    </ul>
                </div>

                <p class="font-bold mb-2">Questions 16-20</p>
                <p class="mb-4">Complete the map below.</p>
                <p class="text-sm mb-8">Write <span class="font-bold uppercase">NO MORE THAN THREE WORDS</span> for each answer.</p>
                
                <div class="flex flex-col items-center">
                    <div class="w-full max-w-2xl bg-white p-6 border-2 border-slate-800 rounded-sm">
                        <img src="https://ieltsonlinetests.com/sites/default/files/2018-08/june%202017%20l2%20q16-20.png" alt="Map" class="w-full h-auto mb-8 border border-slate-200" />
                        
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div class="flex items-center gap-3">
                                <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">16</span>
                                <input id="q-16" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" />
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">17</span>
                                <input id="q-17" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" />
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">18</span>
                                <input id="q-18" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" />
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">19</span>
                                <input id="q-19" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" />
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="bg-black text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm">20</span>
                                <input id="q-20" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `,
            questions: [
                { id: 11, type: "fill-blank", correctAnswer: "north suburb" },
                { id: 12, type: "fill-blank", correctAnswer: ["3000", "3,000"] },
                { id: 13, type: "fill-blank", correctAnswer: ["65 degrees", "65 degrees c", "65 degrees celsius", "65°c"] },
                { id: 14, type: "fill-blank", correctAnswer: ["jewellery", "jewelry"] },
                { id: 15, type: "fill-blank", correctAnswer: "spa pools" },
                { id: 16, type: "fill-blank", correctAnswer: "villa part" },
                { id: 17, type: "fill-blank", correctAnswer: ["merry water world", "water sports center", "water sports centre"] },
                { id: 18, type: "fill-blank", correctAnswer: ["leisure centre", "leisure center"] },
                { id: 19, type: "fill-blank", correctAnswer: ["sports centre", "sports center"] },
                { id: 20, type: "fill-blank", correctAnswer: "restaurant" }
            ]
        },
        {
            id: "part-3",
            title: "Part 3",
            instructions: "Questions 21-30",
            audioUrl: "/audio/trainer2-test1.m4a",
            content: `
            <div class="mb-10">
                <p class="font-bold mb-4">Questions 21-22</p>
                <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
                
                <!-- Native Multiple Choice handles 21-22 -->
            </div>
            
            <div class="mb-10 p-6 bg-slate-50 border border-slate-200 rounded-xl">
                <p class="font-bold mb-2">Questions 23-24</p>
                <p class="mb-3">Choose <span class="font-bold uppercase">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
                <p class="mb-6">Which <span class="font-bold">TWO</span> main factors are important for students' successful study?</p>
                
                <div class="space-y-3 mb-6 pl-4 font-medium text-slate-700">
                    <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">A</span> using time effectively</p>
                    <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">B</span> doing researching</p>
                    <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">C</span> taking more lectures</p>
                    <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">D</span> working independently</p>
                    <p><span class="font-bold text-black border border-slate-300 w-8 inline-block text-center mr-2 rounded bg-white">E</span> coping well with stress</p>
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
                <p class="font-bold mb-4 mt-12">Questions 25-30</p>
                <p class="font-bold mb-4">Complete the table below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN THREE WORDS</span> for each answer.</p>

                <div class="overflow-x-auto border-2 border-slate-800 rounded-sm bg-white">
                    <table class="w-full border-collapse min-w-[600px]">
                        <thead>
                            <tr class="bg-slate-700 text-white border-b-2 border-slate-800">
                                <th class="border-r border-slate-400 p-4 text-left w-1/3 font-bold tracking-wider">Activity</th>
                                <th class="p-4 text-left font-bold tracking-wider">Tips / Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-slate-300 bg-slate-50">
                                <td class="border-r border-slate-300 p-4 font-semibold align-top whitespace-nowrap">Listening to lecture</td>
                                <td class="p-4 align-top">
                                    <ul class="list-disc pl-5 space-y-2">
                                        <li><span class="inline-flex items-center gap-2"><span class="font-bold text-sm">25</span><input id="q-25" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> the lecture</li>
                                        <li>Prepare for lecture ahead; check notes after lecture</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr class="border-b border-slate-300">
                                <td class="border-r border-slate-300 p-4 align-top align-middle">
                                    <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">26</span><input id="q-26" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                                </td>
                                <td class="p-4 align-top">
                                    <ul class="list-disc pl-5 space-y-2">
                                        <li>PowerPoint</li>
                                        <li>Group work</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr class="border-b border-slate-300 bg-slate-50">
                                <td class="border-r border-slate-300 p-4 font-semibold align-top whitespace-nowrap">Reading online materials</td>
                                <td class="p-4 align-top">
                                    <ul class="list-disc pl-5 space-y-2">
                                        <li>need a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">27</span><input id="q-27" type="text" class="border-b border-black w-48 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                                        <li>approach: <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">28</span><input id="q-28" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> method of analyzing</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="border-r border-slate-300 p-4 font-semibold align-top whitespace-nowrap">Writing essay</td>
                                <td class="p-4 align-top">
                                    <ul class="list-disc pl-5 space-y-2">
                                        <li>a good <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">29</span><input id="q-29" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                                        <li>do <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">30</span><input id="q-30" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> before handing in</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            `,
            questions: [
                {
                    id: 21,
                    type: "multiple-choice",
                    text: "The conversation may take place in a",
                    options: ["A university.", "A bookstore.", "A canteen."],
                    correctAnswer: "0" // 0 is A
                },
                {
                    id: 22,
                    type: "multiple-choice",
                    text: "The topic of the first lecture is",
                    options: ["local snack.", "study strategies.", "social life."],
                    correctAnswer: "1" // 1 is B
                },
                { id: 23, type: "fill-blank", correctAnswer: ["D", "E"] },
                { id: 24, type: "fill-blank", correctAnswer: ["D", "E"] },
                { id: 25, type: "fill-blank", correctAnswer: "record" },
                { id: 26, type: "fill-blank", correctAnswer: ["presentation", "presentations"] },
                { id: 27, type: "fill-blank", correctAnswer: "username and password" },
                { id: 28, type: "fill-blank", correctAnswer: "skimming" },
                { id: 29, type: "fill-blank", correctAnswer: "draft plan" },
                { id: 30, type: "fill-blank", correctAnswer: ["proof-reading", "proof reading", "proofreading"] }
            ]
        },
        {
            id: "part-4",
            title: "Part 4",
            instructions: "Questions 31-40",
            audioUrl: "/audio/trainer2-test1.m4a",
            content: `
            <div class="mb-10">
                <p class="font-bold mb-4">Complete the notes below.</p>
                <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN THREE WORDS AND/OR A NUMBER</span> for each answer.</p>
                
                <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10">
                    <h3 class="font-bold text-center text-xl mb-6 tracking-wide uppercase underline">Antarctic Polar View Project</h3>
                    
                    <ul class="list-disc pl-5 mb-8 space-y-3">
                        <li>The Antarctic Polar View project maps Antarctic sea ice by using <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">31</span><input id="q-31" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                    </ul>

                    <p class="font-bold mb-3 text-slate-800">Problems to navigate through the water:</p>
                    <ul class="list-disc pl-5 mb-8 space-y-3">
                        <li>the safety of the ship</li>
                        <li>the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">32</span><input id="q-32" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> of the ship, the efficiency of the ship</li>
                    </ul>

                    <p class="font-bold mb-3 text-slate-800">NVSAT Satellite:</p>
                    <ul class="list-disc pl-5 mb-8 space-y-3">
                        <li>Collect data</li>
                        <li>Identify difference between open water and <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">33</span><input id="q-33" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                        <li>Scientists can see surface of sea clearly by using <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">34</span><input id="q-34" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                    </ul>

                    <p class="font-bold mb-3 text-slate-800">Helicopter:</p>
                    <ul class="list-disc pl-5 mb-4 space-y-3">
                        <li><span class="font-bold">Advantage:</span> can map the sea in the air</li>
                    </ul>
                    
                    <p class="font-bold mb-3 pl-5 text-slate-800">Disadvantages:</p>
                    <ul class="list-disc pl-10 mb-8 space-y-3">
                        <li>much more <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">35</span><input id="q-35" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                        <li><span class="inline-flex items-center gap-2"><span class="font-bold text-sm">36</span><input id="q-36" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                    </ul>

                    <ul class="list-disc pl-5 space-y-4">
                        <li>The colour of the map is <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">37</span><input id="q-37" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                        <li>Problem of sending pictures in Antarctic ship: <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">38</span><input id="q-38" type="text" class="border-b border-black w-48 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                        <li>Measure to the problem: compress images into <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">39</span><input id="q-39" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> format</li>
                        <li>The equipment scientists need for mapping is a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">40</span><input id="q-40" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> on ship.</li>
                    </ul>
                </div>
            </div>
            `,
            questions: [
                { id: 31, type: "fill-blank", correctAnswer: "satellites" },
                { id: 32, type: "fill-blank", correctAnswer: "speed" },
                { id: 33, type: "fill-blank", correctAnswer: ["sea ice", "the sea ice"] },
                { id: 34, type: "fill-blank", correctAnswer: "radar" },
                { id: 35, type: "fill-blank", correctAnswer: "difficult" },
                { id: 36, type: "fill-blank", correctAnswer: ["time-consuming", "time consuming"] },
                { id: 37, type: "fill-blank", correctAnswer: ["grey", "shades of grey"] },
                { id: 38, type: "fill-blank", correctAnswer: ["internet connection", "poor internet connection"] },
                { id: 39, type: "fill-blank", correctAnswer: ["jpeg2000", "jpeg 2000"] },
                { id: 40, type: "fill-blank", correctAnswer: "laptop" }
            ]
        }
    ]
};

import type { ListeningTest } from "@/types/listening";

export const cambridge11Test1: ListeningTest = {
    id: "cambridge-11-test-1",
    title: "Cambridge IELTS 11, Test 1",
    parts: [
        {
            id: "part-1",
            title: "SECTION 1",
            instructions: "Questions 1-10",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/Cambridge%20IELTS%2011.1.1.mp3",
            content: `
      <div class="mb-6">
        <p class="font-bold mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD AND/OR A NUMBER</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide">HIRING A PUBLIC ROOM</h3>
            
            <p class="mb-2 italic">Example</p>
            <ul class="list-disc pl-5 mb-6 space-y-1">
                <li>the Main Hall – seats <span class="border-b border-dashed border-slate-400 px-6 font-handwriting text-slate-700">200</span></li>
            </ul>

            <p className="font-bold mb-2 text-slate-800">Room and cost</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">1</span><input id="q-1" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> Room – seats 100</li>
                <li>Cost of Main Hall for Saturday evening: <b>£</b> <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">2</span><input id="q-2" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                <li class="list-none pl-2">+ £250 deposit (<span class="inline-flex items-center gap-2"><span class="font-bold text-sm">3</span><input id="q-3" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> payment is required)</li>
                <li>Cost includes use of tables and chairs and also <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">4</span><input id="q-4" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>Additional charge for use of the kitchen: £25</li>
            </ul>

            <p className="font-bold mb-2 text-slate-800">Before the event</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>Will need a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">5</span><input id="q-5" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> licence</li>
                <li>Need to contact caretaker (Mr Evans) in advance to arrange <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">6</span><input id="q-6" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">During the event</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>The building is no smoking</li>
                <li>The band should use the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">7</span><input id="q-7" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> door at the back</li>
                <li>Don't touch the system that controls the volume</li>
                <li>For microphones, contact the caretaker</li>
            </ul>

            <p className="font-bold mb-2 text-slate-800">After the event</p>
            <ul class="list-disc pl-5 mb-2 space-y-3">
                <li>Need to know the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">8</span><input id="q-8" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> for the cleaning cupboard</li>
                <li>The <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">9</span><input id="q-9" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> must be washed and rubbish placed in black bags</li>
                <li>All <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">10</span><input id="q-10" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> must be taken down</li>
                <li>Chairs and tables must be piled up</li>
            </ul>
        </div>
      </div>
      `,
            questions: [
                { id: 1, type: "fill-blank", correctAnswer: "Charlton" },
                { id: 2, type: "fill-blank", correctAnswer: "115" },
                { id: 3, type: "fill-blank", correctAnswer: "cash" },
                { id: 4, type: "fill-blank", correctAnswer: "parking" },
                { id: 5, type: "fill-blank", correctAnswer: "music" },
                { id: 6, type: "fill-blank", correctAnswer: "entry" },
                { id: 7, type: "fill-blank", correctAnswer: "stage" },
                { id: 8, type: "fill-blank", correctAnswer: "code" },
                { id: 9, type: "fill-blank", correctAnswer: "floor" },
                { id: 10, type: "fill-blank", correctAnswer: "decoration" },
            ]
        },
        {
            id: "part-2",
            title: "SECTION 2",
            instructions: "Questions 11-20",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/Cambridge%20IELTS%2011.1.2.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-2">Questions 11-14</p>
        <p class="mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide">Fiddy Working Heritage Farm</h3>
            
            <p class="mb-4 italic text-slate-700">Advice about visiting the farm</p>
            
            <p class="font-bold mb-2 text-slate-800">Visitors should</p>
            <ul class="list-disc pl-5 space-y-4">
                <li>take care not to harm any <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">11</span><input id="q-11" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                <li>not touch any <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">12</span><input id="q-12" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                <li>wear <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">13</span><input id="q-13" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                <li>not bring <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">14</span><input id="q-14" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> into the farm, with certain exceptions</li>
            </ul>
        </div>

        <p class="font-bold mb-2">Questions 15-20</p>
        <p class="mb-4">Label the map below.</p>
        <p class="text-sm mb-8">Write the correct letter <span class="font-bold">A-I</span>, next to Questions 15-20.</p>
        
        <div class="flex flex-col md:flex-row gap-8 items-start">
            <!-- Mock visual map -->
            <div class="w-full md:w-1/2 p-6 border-2 border-slate-800 bg-amber-50 rounded-sm relative" style="min-height: 480px; font-family: monospace;">
                <div class="absolute top-4 left-6 bg-white border border-black px-2 py-1 font-bold">A</div>
                <div class="absolute top-6 left-0 right-0 h-10 border-y-2 border-black flex items-center justify-center font-bold text-lg tracking-widest bg-slate-100">Road</div>
                
                <div class="absolute left-1/2 -translate-x-1/2 top-16 bottom-32 w-16 border-x-2 border-black flex flex-col items-center justify-center font-bold text-sm rotate-0 bg-slate-100"><span style="writing-mode: vertical-rl; transform: rotate(180deg);">Main Path</span></div>
                
                <div class="absolute top-20 left-12 w-48 h-32 text-center flex flex-col items-center">
                    <span class="font-bold">Farm Yard</span>
                    <div class="mt-2 text-3xl opacity-20 transform -rotate-45">///</div>
                    <div class="absolute right-0 top-10 bg-white border border-black px-2 py-1 font-bold">B</div>
                </div>

                <div class="absolute bottom-1/2 left-1/4 right-1/4 h-12 border-2 border-slate-400 rounded-full flex items-center justify-center text-slate-700 font-bold bg-blue-50 italic">Fish Pool</div>
                <div class="absolute top-1/2 right-[30%] -translate-y-6 bg-white border border-black px-2 py-1 font-bold z-10">C</div>

                <div class="absolute bottom-32 right-12 w-10 bottom-64 bg-white border border-black px-2 py-1 font-bold">D</div>
                <div class="absolute bottom-32 right-12 w-10 bottom-48 bg-white border border-black px-2 py-1 font-bold">E</div>
                <div class="absolute bottom-32 right-12 w-10 bottom-32 bg-white border border-black px-2 py-1 font-bold">H</div>

                <div class="absolute bottom-40 right-1/3 flex border-2 border-black p-4 bg-white">
                   <div class="absolute -top-4 -left-4 bg-white border border-black px-2 py-1 font-bold text-xs">F</div>
                   <span class="font-bold absolute top-2 left-2 text-xs">Car Park</span>
                   <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 bg-white border border-black px-2 py-1 font-bold">I</div>
                </div>

                <div class="absolute bottom-40 right-1/4 left-1/2 w-24 h-24 border-2 border-black flex items-end justify-center pb-2 bg-white">
                    <div class="bg-white border border-black px-2 py-1 font-bold">G</div>
                </div>
                
                <div class="absolute bottom-24 right-1/2 font-bold px-2 py-1 bg-slate-200 border-2 border-slate-400 transform -translate-x-1/2">New Barn</div>
                <div class="absolute bottom-28 left-0 right-0 h-10 border-y-2 border-black flex items-center justify-center font-bold text-lg tracking-widest bg-slate-100">Road</div>
                
                <div class="absolute bottom-16 right-16 flex items-center gap-2">
                   <div class="w-8 h-px bg-black"></div>
                   <span class="font-bold italic">You are here</span>
                </div>
            </div>

            <!-- Questions list -->
            <div class="w-full md:w-1/2 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                   <div class="flex items-center justify-between">
                       <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">15</span> Scarecrow</span>
                       <input id="q-15" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                   </div>
                   <div class="flex items-center justify-between">
                       <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">18</span> Black Barn</span>
                       <input id="q-18" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                   </div>
                   <div class="flex items-center justify-between">
                       <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">16</span> Maze</span>
                       <input id="q-16" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                   </div>
                   <div class="flex items-center justify-between">
                       <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">19</span> Covered picnic area</span>
                       <input id="q-19" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                   </div>
                   <div class="flex items-center justify-between">
                       <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">17</span> Café</span>
                       <input id="q-17" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                   </div>
                   <div class="flex items-center justify-between">
                       <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">20</span> Fiddy House</span>
                       <input id="q-20" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                   </div>
                </div>
            </div>
        </div>
      </div>
      `,
            questions: [
                { id: 11, type: "fill-blank", correctAnswer: "animals" },
                { id: 12, type: "fill-blank", correctAnswer: "tools" },
                { id: 13, type: "fill-blank", correctAnswer: "shoes" },
                { id: 14, type: "fill-blank", correctAnswer: "dogs" },
                { id: 15, type: "fill-blank", correctAnswer: "F" },
                { id: 16, type: "fill-blank", correctAnswer: "G" },
                { id: 17, type: "fill-blank", correctAnswer: "D" },
                { id: 18, type: "fill-blank", correctAnswer: "H" },
                { id: 19, type: "fill-blank", correctAnswer: "C" },
                { id: 20, type: "fill-blank", correctAnswer: "A" }
            ]
        },
        {
            id: "part-3",
            title: "SECTION 3",
            instructions: "Questions 21-30",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/Cambridge%20IELTS%2011.1.3.mp3",
            content: `
      <div class="mb-10">
        <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
        
        <h3 class="font-bold text-center text-xl mb-8 tracking-wide">Study on Gender in Physics</h3>
        
        <!-- Multiple Choice injected natively via questions array logic -->
      </div>
      `,
            questions: [
                {
                    id: 21,
                    type: "multiple-choice",
                    text: "The students in Akira Miyake's study were all majoring in",
                    options: ["physics.", "psychology or physics.", "science, technology, engineering or mathematics."],
                    correctAnswer: "2" // 0, 1, 2 indexed. C is 2.
                },
                {
                    id: 22,
                    type: "multiple-choice",
                    text: "The aim of Miyake's study was to investigate",
                    options: ["what kind of women choose to study physics.", "a way of improving women's performance in physics.", "whether fewer women than men study physics at college."],
                    correctAnswer: "1" // B is 1
                },
                {
                    id: 23,
                    type: "multiple-choice",
                    text: "The female physics students were wrong to believe that",
                    options: ["the teachers marked them in an unfair way.", "the male students expected them to do badly.", "their test results were lower than the male students'."],
                    correctAnswer: "1" // B is 1
                },
                {
                    id: 24,
                    type: "multiple-choice",
                    text: "Miyake's team asked the students to write about",
                    options: ["what they enjoyed about studying physics.", "the successful experiences of other people.", "something that was important to them personally."],
                    correctAnswer: "2" // C is 2
                },
                {
                    id: 25,
                    type: "multiple-choice",
                    text: "What was the aim of the writing exercise done by the subjects?",
                    options: ["to reduce stress", "to strengthen verbal ability", "to encourage logical thinking"],
                    correctAnswer: "0" // A is 0
                },
                {
                    id: 26,
                    type: "multiple-choice",
                    text: "What surprised the researchers about the study?",
                    options: ["how few students managed to get A grades", "the positive impact it had on physics results for women", "the difference between male and female performance"],
                    correctAnswer: "1" // B is 1
                },
                {
                    id: 27,
                    type: "multiple-choice",
                    text: "Greg and Lisa think Miyake's results could have been affected by",
                    options: ["the length of the writing task.", "the number of students who took part.", "the information the students were given."],
                    correctAnswer: "2" // C is 2
                },
                {
                    id: 28,
                    type: "multiple-choice",
                    text: "Greg and Lisa decide that in their own project, they will compare the effects of",
                    options: ["two different writing tasks.", "a writing task with an oral task.", "two different oral tasks."],
                    correctAnswer: "0" // A is 0
                },
                {
                    id: 29,
                    type: "multiple-choice",
                    text: "The main finding of Smolinsky's research was that class teamwork activities",
                    options: ["were most effective when done by all-women groups.", "had no effect on the performance of men or women.", "improved the results of men more than of women."],
                    correctAnswer: "1" // B is 1
                },
                {
                    id: 30,
                    type: "multiple-choice",
                    text: "What will Lisa and Greg do next?",
                    options: ["talk to a professor", "observe a science class", "look at the science timetable"],
                    correctAnswer: "0" // A is 0
                }
            ]
        },
        {
            id: "part-4",
            title: "SECTION 4",
            instructions: "Questions 31-40",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/Cambridge%20IELTS%2011.1.4.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD ONLY</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide">Ocean Biodiversity</h3>
            
            <p class="font-bold mb-2 text-slate-800">Biodiversity hotspots</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>areas containing many different species</li>
                <li>important for locating targets for <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">31</span><input id="q-31" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                <li>at first only identified on land</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Boris Worm, 2005</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>identified hotspots for large ocean predators, e.g. sharks</li>
                <li>found that ocean hotspots:
                    <ul class="list-[circle] pl-8 mt-3 space-y-3">
                        <li>were not always rich in <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">32</span><input id="q-32" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                        <li>had higher temperatures at the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">33</span><input id="q-33" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                        <li>had sufficient <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">34</span><input id="q-34" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> in the water</li>
                    </ul>
                </li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Lisa Ballance, 2007</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>looked for hotspots for marine <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">35</span><input id="q-35" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                <li>found these were all located where ocean currents meet</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Census of Marine Life</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>found new ocean species living:
                    <ul class="list-[circle] pl-8 mt-3 space-y-3">
                        <li>under the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">36</span><input id="q-36" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                        <li>near volcanoes on the ocean floor</li>
                    </ul>
                </li>
            </ul>

            <div class="h-px bg-slate-300 w-full my-8 border-dashed border-b"></div>

            <p class="font-bold mb-2 text-slate-800">Global Marine Species Assessment</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>want to list endangered ocean species, considering:
                    <ul class="list-[circle] pl-8 mt-3 space-y-3">
                        <li>population size</li>
                        <li>geographical distribution</li>
                        <li>rate of <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">37</span><input id="q-37" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
                    </ul>
                </li>
                <li class="mt-4">Aim: to assess 20,000 species and make a distribution <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">38</span><input id="q-38" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> for each one</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Recommendations to retain ocean biodiversity</p>
            <ul class="list-disc pl-5 mb-2 space-y-3">
                <li>increase the number of ocean reserves</li>
                <li>establish <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">39</span><input id="q-39" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> corridors (e.g. for turtles)</li>
                <li>reduce fishing quotas</li>
                <li>catch fish only for the purpose of <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">40</span><input id="q-40" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span></li>
            </ul>
        </div>
      </div>
      `,
            questions: [
                { id: 31, type: "fill-blank", correctAnswer: "conservation" },
                { id: 32, type: "fill-blank", correctAnswer: "food" },
                { id: 33, type: "fill-blank", correctAnswer: "surface" },
                { id: 34, type: "fill-blank", correctAnswer: "oxygen" },
                { id: 35, type: "fill-blank", correctAnswer: "mammals" },
                { id: 36, type: "fill-blank", correctAnswer: "ice" },
                { id: 37, type: "fill-blank", correctAnswer: "decline" },
                { id: 38, type: "fill-blank", correctAnswer: "map" },
                { id: 39, type: "fill-blank", correctAnswer: "migration" },
                { id: 40, type: "fill-blank", correctAnswer: "consumption" },
            ]
        }
    ]
};

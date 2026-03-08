import type { ListeningTest } from "@/types/listening";

export const trainer1Test4: ListeningTest = {
    id: "t1-4",
    title: "IELTS Trainer 1, Test 4",
    parts: [
        {
            id: "part-1",
            title: "Moving Company Service Report",
            instructions: "Questions 1-10",
            audioUrl: "/audio/PART 1.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Questions 1-6</p>
        <p class="mb-4">Complete the form below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10 overflow-x-auto">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline uppercase min-w-[500px]">Moving Company Service Report</h3>
            
            <table class="w-full border-collapse border border-slate-400 min-w-[500px]">
                <thead>
                    <tr class="bg-blue-600 text-white">
                        <th class="border border-slate-400 p-3 text-left w-1/3"></th>
                        <th class="border border-slate-400 p-3 text-left w-2/3">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 font-bold">Example<br/><span class="font-normal italic">Full Name:</span></td>
                        <td class="border border-slate-400 p-3 italic">Jane Bond</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 font-bold">Phone Number:</td>
                        <td class="border border-slate-400 p-3">
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">1</span><input id="q-1" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 font-bold">USA Address:</td>
                        <td class="border border-slate-400 p-3">
                            509 <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">2</span><input id="q-2" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span><br/>
                            1137 <span class="inline-flex items-center gap-2 mt-2"><span class="font-bold text-sm">3</span><input id="q-3" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>, Seattle
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 font-bold">Packing Day:</td>
                        <td class="border border-slate-400 p-3">
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">4</span><input id="q-4" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 font-bold">Date:</td>
                        <td class="border border-slate-400 p-3">11th March</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 font-bold">Clean-up by:</td>
                        <td class="border border-slate-400 p-3">5:00 p.m.</td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 font-bold">Day:</td>
                        <td class="border border-slate-400 p-3">
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">5</span><input id="q-5" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> 14th
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 font-bold">About the Price:</td>
                        <td class="border border-slate-400 p-3">Rather expensive</td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 font-bold">Storage Time:</td>
                        <td class="border border-slate-400 p-3">
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">6</span><input id="q-6" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p class="font-bold mb-4">Questions 7-10</p>
        <p class="mb-4">Where does the speaker decide to put items in?</p>
        <p class="text-sm mb-6">Write the correct letter, <span class="font-bold">A</span>, <span class="font-bold">B</span>, or <span class="font-bold">C</span>, next to questions <span class="font-bold">7-10</span>.</p>
        
        <div class="border-2 border-slate-800 p-6 rounded-sm bg-slate-50 mb-8 max-w-lg mx-auto">
            <div class="grid grid-cols-1 gap-y-3 font-semibold text-slate-800">
                <p><span class="font-bold text-black mr-2">A</span> in emergency pack</p>
                <p><span class="font-bold text-black mr-2">B</span> in personal package</p>
                <p><span class="font-bold text-black mr-2">C</span> in storage with the furniture</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <p class="font-bold mb-4 underline">Items</p>
            <div class="grid grid-cols-1 gap-y-4">
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-3">7</span> cutlery and dishes</span>
                   <input id="q-7" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-3">8</span> kettle</span>
                   <input id="q-8" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-3">9</span> alarm clock</span>
                   <input id="q-9" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-3">10</span> CD player</span>
                   <input id="q-10" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
            </div>
        </div>
      </div>
      `,
            questions: [
                { id: 1, type: "fill-blank", correctAnswer: "94635550" },
                { id: 2, type: "fill-blank", correctAnswer: ["Clark House", "clark house"] },
                { id: 3, type: "fill-blank", correctAnswer: ["University Drive", "university drive"] },
                { id: 4, type: "fill-blank", correctAnswer: ["Monday", "monday"] },
                { id: 5, type: "fill-blank", correctAnswer: ["Thursday", "thursday"] },
                { id: 6, type: "fill-blank", correctAnswer: ["a/one/ 1 month", "a/one/1 month", "1 month", "one month", "a month"] },
                { id: 7, type: "fill-blank", correctAnswer: "A" },
                { id: 8, type: "fill-blank", correctAnswer: "C" },
                { id: 9, type: "fill-blank", correctAnswer: "B" },
                { id: 10, type: "fill-blank", correctAnswer: "C" },
            ]
        },
        {
            id: "part-2",
            title: "Annual Wullaballoo Conference",
            instructions: "Questions 11-20",
            audioUrl: "/audio/PART 2.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Questions 11-16</p>
        <p class="mb-4">Complete the table below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN THREE WORDS AND/OR A NUMBER</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10 overflow-x-auto">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline uppercase min-w-[600px]">ANNUAL WULLABALLOO CONFERENCE</h3>
            
            <table class="w-full border-collapse border border-slate-400 min-w-[600px]">
                <thead>
                    <tr class="bg-blue-600 text-white">
                        <th class="border border-slate-400 p-3 text-center w-1/5">TIME</th>
                        <th class="border border-slate-400 p-3 text-center w-1/2">CONTENT</th>
                        <th class="border border-slate-400 p-3 text-center w-3/10">LOCATION</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 text-center align-top font-semibold">9:00 a.m.</td>
                        <td class="border border-slate-400 p-3 align-top leading-loose">
                            Title of the lecture:<br/>
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">11</span><input id="q-11" type="text" class="border-b border-black w-48 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span><br/>
                            Lecturer: John Smith from<br/>
                            the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">12</span><input id="q-12" type="text" class="border-b border-black w-48 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </td>
                        <td class="border border-slate-400 p-3 text-center align-top">Main Hall</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 text-center font-semibold">10:30 a.m.</td>
                        <td class="border border-slate-400 p-3">Presentation of papers</td>
                        <td class="border border-slate-400 p-3 text-center">Garden Room on the ground floor</td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 text-center font-semibold">11:15 a.m.</td>
                        <td class="border border-slate-400 p-3">Coffee break</td>
                        <td class="border border-slate-400 p-3 text-center">Main Hall</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 text-center align-top font-semibold">1:00 p.m.</td>
                        <td class="border border-slate-400 p-3 align-top">Lunch</td>
                        <td class="border border-slate-400 p-3 align-top text-center leading-loose">
                            Sea View Restaurant on the<br/>
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">13</span><input id="q-13" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold mx-auto" /></span><br/>
                            The lift on the <span class="inline-flex items-center gap-2 mt-2"><span class="font-bold text-sm">14</span><input id="q-14" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold mx-auto" /></span>
                        </td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 text-center font-semibold">2:00 p.m.</td>
                        <td class="border border-slate-400 p-3">Presentation of further papers</td>
                        <td class="border border-slate-400 p-3 text-center">Ballroom</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 text-center font-semibold text-nowrap">
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">15</span><input id="q-15" type="text" class="border-b border-black w-16 text-center focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> p.m.
                        </td>
                        <td class="border border-slate-400 p-3">Afternoon tea</td>
                        <td class="border border-slate-400 p-3 text-center">Ballroom</td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border border-slate-400 p-3 text-center font-semibold">5:00 p.m.</td>
                        <td class="border border-slate-400 p-3">Conference will be finished</td>
                        <td class="border border-slate-400 p-3 text-center">Main Hall</td>
                    </tr>
                    <tr>
                        <td class="border border-slate-400 p-3 text-center font-semibold text-nowrap">5:10–6:10 p.m.</td>
                        <td class="border border-slate-400 p-3">Informal reception</td>
                        <td class="border border-slate-400 p-3 text-center">
                            <span class="inline-flex items-center gap-2 mx-auto"><span class="font-bold text-sm">16</span><input id="q-16" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p class="font-bold mb-4 mt-12">Questions 17-20</p>
        <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
      </div>
      `,
            questions: [
                { id: 11, type: "fill-blank", correctAnswer: "Computer as Teacher" },
                { id: 12, type: "fill-blank", correctAnswer: "University of Melbourne" },
                { id: 13, type: "fill-blank", correctAnswer: "top floor" },
                { id: 14, type: "fill-blank", correctAnswer: "ground floor" },
                { id: 15, type: "fill-blank", correctAnswer: "3:10" },
                { id: 16, type: "fill-blank", correctAnswer: ["Palm Lounge", "palm lounge"] },
                {
                    id: 17, type: "multiple-choice", correctAnswer: "2",
                    text: "Tickets are available", options: ["only at the reception desk.", "tomorrow evening.", "at any time before the reception."]
                },
                {
                    id: 18, type: "multiple-choice", correctAnswer: "1",
                    text: "The delegates will be charged……...", options: ["$6.50", "$15.00", "$25.00"]
                },
                {
                    id: 19, type: "multiple-choice", correctAnswer: "1",
                    text: "The restaurant is famous for", options: ["steak.", "fish.", "barbecue."]
                },
                {
                    id: 20, type: "multiple-choice", correctAnswer: "0",
                    text: "The trip on Sunday costs", options: ["$35 in total.", "$35 plus entrance fees.", "$35 plus lunch."]
                }
            ]
        },
        {
            id: "part-3",
            title: "General Course Details",
            instructions: "Questions 21-30",
            audioUrl: "/audio/PART 3.mp3",
            content: `
      <div class="mb-10">
        <h3 class="font-bold text-center text-lg mb-8 tracking-wide underline uppercase">General Course Details</h3>

        <p class="font-bold mb-4">Questions 21-26</p>
        <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>

        <div class="space-y-8 mb-12">
            <div>
                <div class="flex items-start gap-4 mb-3">
                    <span class="inline-flex items-center gap-2 font-semibold"><span class="font-bold mr-1">21</span><input id="q-21" type="text" class="border border-slate-400 rounded-md w-12 h-10 text-center font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white" maxLength={1} /></span>
                    <p class="font-semibold text-slate-800 pt-1">What is the defining characteristic of a specialised course?</p>
                </div>
                <div class="pl-16 space-y-2 text-slate-700">
                    <p><span class="font-bold mr-2">A</span>Taking a proficiency exam</p>
                    <p><span class="font-bold mr-2">B</span>Attending the class frequently</p>
                    <p><span class="font-bold mr-2">C</span>Compulsory and regular</p>
                </div>
            </div>

            <div class="bg-slate-100 h-px w-full"></div>

            <div>
                <div class="flex items-start gap-4 mb-3">
                    <span class="inline-flex items-center gap-2 font-semibold"><span class="font-bold mr-1">22</span><input id="q-22" type="text" class="border border-slate-400 rounded-md w-12 h-10 text-center font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white" maxLength={1} /></span>
                    <p class="font-semibold text-slate-800 pt-1">The Microbiology courses are available for</p>
                </div>
                <div class="pl-16 space-y-2 text-slate-700">
                    <p><span class="font-bold mr-2">A</span>full-time and flexible-time students.</p>
                    <p><span class="font-bold mr-2">B</span>Microbiology students only.</p>
                    <p><span class="font-bold mr-2">C</span>students on a flexible schedule.</p>
                </div>
            </div>

            <div class="bg-slate-100 h-px w-full"></div>

            <div>
                <div class="flex items-start gap-4 mb-3">
                    <span class="inline-flex items-center gap-2 font-semibold"><span class="font-bold mr-1">23</span><input id="q-23" type="text" class="border border-slate-400 rounded-md w-12 h-10 text-center font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white" maxLength={1} /></span>
                    <p class="font-semibold text-slate-800 pt-1">The Biology courses are available for</p>
                </div>
                <div class="pl-16 space-y-2 text-slate-700">
                    <p><span class="font-bold mr-2">A</span>all students.</p>
                    <p><span class="font-bold mr-2">B</span>full-time students only.</p>
                    <p><span class="font-bold mr-2">C</span>freshmen only.</p>
                </div>
            </div>

            <div class="bg-slate-100 h-px w-full"></div>

            <div>
                <div class="flex items-start gap-4 mb-3">
                    <span class="inline-flex items-center gap-2 font-semibold"><span class="font-bold mr-1">24</span><input id="q-24" type="text" class="border border-slate-400 rounded-md w-12 h-10 text-center font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white" maxLength={1} /></span>
                    <p class="font-semibold text-slate-800 pt-1">Who are interested in Microbiology courses?</p>
                </div>
                <div class="pl-16 space-y-2 text-slate-700">
                    <p><span class="font-bold mr-2">A</span>People who need work experience</p>
                    <p><span class="font-bold mr-2">B</span>People from off-campus</p>
                    <p><span class="font-bold mr-2">C</span>People who work at hospital</p>
                </div>
            </div>

            <div class="bg-slate-100 h-px w-full"></div>

            <div>
                <div class="flex items-start gap-4 mb-3">
                    <span class="inline-flex items-center gap-2 font-semibold"><span class="font-bold mr-1">25</span><input id="q-25" type="text" class="border border-slate-400 rounded-md w-12 h-10 text-center font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white" maxLength={1} /></span>
                    <p class="font-semibold text-slate-800 pt-1">A Medical Science course will be opened next year because</p>
                </div>
                <div class="pl-16 space-y-2 text-slate-700">
                    <p><span class="font-bold mr-2">A</span>there are no experimental facilities.</p>
                    <p><span class="font-bold mr-2">B</span>the lab equipment is too expensive.</p>
                    <p><span class="font-bold mr-2">C</span>the building is damaged.</p>
                </div>
            </div>

            <div class="bg-slate-100 h-px w-full"></div>

            <div>
                <div class="flex items-start gap-4 mb-3">
                    <span class="inline-flex items-center gap-2 font-semibold"><span class="font-bold mr-1">26</span><input id="q-26" type="text" class="border border-slate-400 rounded-md w-12 h-10 text-center font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white" maxLength={1} /></span>
                    <p class="font-semibold text-slate-800 pt-1">Which is the quickest increasing subject in enrolment?</p>
                </div>
                <div class="pl-16 space-y-2 text-slate-700">
                    <p><span class="font-bold mr-2">A</span>Medical Science</p>
                    <p><span class="font-bold mr-2">B</span>Statistics</p>
                    <p><span class="font-bold mr-2">C</span>Environmental Science</p>
                </div>
            </div>
        </div>

        <p class="font-bold mb-4 mt-12">Questions 27-29</p>
        <p class="mb-4">Choose <span class="font-bold uppercase">THREE</span> letters, <span class="font-bold">A-G</span>, and write each next to questions 27-29.</p>
        <p class="italic mb-6 text-slate-700">Which <span class="font-bold uppercase">THREE</span> compulsory courses must be taken?</p>
        
        <div class="border-2 border-slate-800 p-6 rounded-sm bg-slate-50 mb-8 max-w-lg mx-auto shadow-sm">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-3 font-semibold text-slate-800">
                <p><span class="font-bold text-black mr-2">A</span> Medical Science</p>
                <p><span class="font-bold text-black mr-2">B</span> Computing</p>
                <p><span class="font-bold text-black mr-2">C</span> Mathematics</p>
                <p><span class="font-bold text-black mr-2">D</span> Laboratory Techniques</p>
                <p><span class="font-bold text-black mr-2">E</span> Statistics</p>
                <p><span class="font-bold text-black mr-2">F</span> Medicine</p>
                <p><span class="font-bold text-black mr-2">G</span> Environmental Science</p>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-12 max-w-lg mx-auto">
            <div class="grid grid-cols-1 gap-y-4">
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-3">27</span> Compulsory course 1</span>
                   <input id="q-27" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-3">28</span> Compulsory course 2</span>
                   <input id="q-28" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
               <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-3">29</span> Compulsory course 3</span>
                   <input id="q-29" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength={1} />
               </div>
            </div>
        </div>

        <p class="font-bold mb-4">Question 30</p>
        <p class="mb-4">Complete the sentence below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS</span> for the answer.</p>
        
        <div class="bg-white p-6 rounded-xl border border-slate-200">
            <p class="text-lg leading-loose">
                There are three full scholarships that cover tuition and provide $1,500 cash as a <span class="inline-flex items-center gap-2 mx-1"><span class="font-bold text-sm">30</span><input id="q-30" type="text" class="border-b border-black w-48 focus:outline-none focus:border-blue-500 bg-transparent font-semibold text-center" /></span>.
            </p>
        </div>
      </div>
      `,
            questions: [
                { id: 21, type: "fill-blank", correctAnswer: "C" },
                { id: 22, type: "fill-blank", correctAnswer: "A" },
                { id: 23, type: "fill-blank", correctAnswer: "B" },
                { id: 24, type: "fill-blank", correctAnswer: "B" },
                { id: 25, type: "fill-blank", correctAnswer: "A" },
                { id: 26, type: "fill-blank", correctAnswer: "C" },
                { id: 27, type: "fill-blank", correctAnswer: ["C", "E", "F"] },
                { id: 28, type: "fill-blank", correctAnswer: ["C", "E", "F"] },
                { id: 29, type: "fill-blank", correctAnswer: ["C", "E", "F"] },
                { id: 30, type: "fill-blank", correctAnswer: "textbook allowance" },
            ]
        },
        {
            id: "part-4",
            title: "How to Choose Flooring Materials",
            instructions: "Questions 31-40",
            audioUrl: "/audio/PART 4.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Questions 31-37</p>
        <p class="mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-10 rounded-sm bg-white mb-10">
            <h3 class="font-bold text-center text-xl mb-8 tracking-wide underline uppercase">How to Choose Flooring Materials</h3>
            
            <p class="font-bold text-lg mb-4 text-slate-800">Source</p>
            <ul class="list-disc pl-5 mb-8 space-y-4 text-slate-700 leading-relaxed marker:text-slate-400">
                <li>There are some man-made materials like <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">31</span><input id="q-31" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>Before being used, material undergoes <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">32</span><input id="q-32" type="text" class="border-b border-black w-36 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>Wood should be cut and <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">33</span><input id="q-33" type="text" class="border-b border-black w-48 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>Stone should be cut and <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">34</span><input id="q-34" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>

            <p class="font-bold text-lg mb-4 text-slate-800">Selection</p>
            <ul class="list-disc pl-5 mb-6 space-y-4 text-slate-700 leading-relaxed marker:text-slate-400">
                <li>Aside from environmental factors, one should take <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">35</span><input id="q-35" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> into account during construction.</li>
                <li>Some properties of materials affect mood, such as <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">36</span><input id="q-36" type="text" class="border-b border-black w-36 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span>, texture, and colour.</li>
                <li>Use a mathematical formula to choose the type of wood, because <span class="inline-flex items-center gap-2"><span class="font-bold text-sm text-black">37</span><input id="q-37" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> are subjective, which are ambiguous in verbal description.</li>
            </ul>
        </div>

        <p class="font-bold mb-4 mt-12">Questions 38-40</p>
        <p class="mb-4">Complete the table below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> for each answer.</p>

        <div class="overflow-x-auto border-2 border-slate-800 rounded-sm">
            <table class="w-full border-collapse min-w-[500px]">
                <thead>
                    <tr class="bg-blue-600 text-white border-b-2 border-slate-800">
                        <th class="border-r border-slate-400 p-4 text-left w-1/2 font-bold tracking-wider uppercase">MATERIAL</th>
                        <th class="p-4 text-left w-1/2 font-bold tracking-wider uppercase">REFLECTANCE RATE</th>
                    </tr>
                </thead>
                <tbody class="text-slate-800 font-medium">
                    <tr class="bg-white border-b border-slate-300">
                        <td class="border-r border-slate-300 p-4">Polished silver</td>
                        <td class="p-4">Almost 1.0</td>
                    </tr>
                    <tr class="bg-slate-50 border-b border-slate-300">
                        <td class="border-r border-slate-300 p-4">White-painted plastic</td>
                        <td class="p-4 leading-loose">
                            Approximately <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">38</span><input id="q-38" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent font-bold" /></span>
                        </td>
                    </tr>
                    <tr class="bg-white border-b border-slate-300">
                        <td class="border-r border-slate-300 p-4">Quarry tile</td>
                        <td class="p-4 leading-loose">
                            Approximately <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">39</span><input id="q-39" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent font-bold" /></span>
                        </td>
                    </tr>
                    <tr class="bg-slate-50">
                        <td class="border-r border-slate-300 p-4 leading-loose text-center">
                            <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">40</span><input id="q-40" type="text" class="border-b border-black w-40 focus:outline-none focus:border-blue-500 bg-transparent font-bold" /></span>
                        </td>
                        <td class="p-4">Almost 0.0</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      `,
            questions: [
                { id: 31, type: "fill-blank", correctAnswer: "plastic" },
                { id: 32, type: "fill-blank", correctAnswer: "processing" },
                { id: 33, type: "fill-blank", correctAnswer: ["properly seasoned", "seasoned"] },
                { id: 34, type: "fill-blank", correctAnswer: "polished" },
                { id: 35, type: "fill-blank", correctAnswer: ["the cost", "cost"] },
                { id: 36, type: "fill-blank", correctAnswer: ["grain patterns", "grain pattern", "grain"] },
                { id: 37, type: "fill-blank", correctAnswer: "words" },
                { id: 38, type: "fill-blank", correctAnswer: "0.8" },
                { id: 39, type: "fill-blank", correctAnswer: "0.1" },
                { id: 40, type: "fill-blank", correctAnswer: "black velvet" }
            ]
        }
    ]
};

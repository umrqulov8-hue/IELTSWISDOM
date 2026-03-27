import type { ListeningTest } from "@/types/listening";

export const trainer1Test2: ListeningTest = {
    id: "t1-2",
    title: "IELTS Trainer 1, Test 2",
    parts: [
        {
            id: "part-1",
            title: "Advice on Family Visit",
            instructions: "Questions 1-10",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/cambridge-ielts-20-academic-listening-4-audio-part-1%20(1).mp3",
            content: `
      <div class="mb-6">
        <p class="font-bold mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD AND/OR A NUMBER</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline">Advice on Family Visit</h3>
            
            <p class="font-bold mb-2 text-slate-800">Accommodation</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li><span class="inline-flex items-center gap-2"><span class="font-bold text-sm">1</span><input id="q-1" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> Hotel on George Street</li>
                <li>Cost of family room per night: £ <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">2</span><input id="q-2" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> (approx.)</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Recommended Trips</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>A <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">3</span><input id="q-3" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> tour of the city centre (starts in Carlton Square)</li>
                <li>A trip by <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">4</span><input id="q-4" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> to the old fort</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Science Museum</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>Best day to visit: <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">5</span><input id="q-5" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>See the exhibition about <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">6</span><input id="q-6" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> which opens soon</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Food</p>
            <p class="mb-2 italic">Clacton Market:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>Good for <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">7</span><input id="q-7" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> food</li>
                <li>Need to have lunch before <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">8</span><input id="q-8" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> p.m.</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Theatre Tickets</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>Save up to <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">9</span><input id="q-9" type="text" class="border-b border-black w-24 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> % on ticket prices at bargaintickets.com</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Free Activities</p>
            <p class="mb-2 italic">Blakewell Gardens:</p>
            <ul class="list-disc pl-5 mb-2 space-y-3">
                <li>Roots Music Festival</li>
                <li>Climb Telegraph Hill to see a view of the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">10</span><input id="q-10" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>
        </div>
      </div>
      `,
            questions: [
                { id: 1, type: "fill-blank", correctAnswer: "Kings" },
                { id: 2, type: "fill-blank", correctAnswer: "125" },
                { id: 3, type: "fill-blank", correctAnswer: "walking" },
                { id: 4, type: "fill-blank", correctAnswer: "boat" },
                { id: 5, type: "fill-blank", correctAnswer: "Tuesday" },
                { id: 6, type: "fill-blank", correctAnswer: "space" },
                { id: 7, type: "fill-blank", correctAnswer: "vegetarian" },
                { id: 8, type: "fill-blank", correctAnswer: "2.30" },
                { id: 9, type: "fill-blank", correctAnswer: "75" },
                { id: 10, type: "fill-blank", correctAnswer: "port" },
            ]
        },
        {
            id: "part-2",
            title: "Visiting the Football Stadium",
            instructions: "Questions 11-20",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/cambridge-ielts-20-academic-listening-4-audio-part-2.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-2">Questions 11-12</p>
        <p class="mb-4">Choose <span class="font-bold">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
        <p class="mb-6">Which TWO things does the speaker say about visiting the football stadium with children?</p>
        
        <div class="grid grid-cols-1 gap-4 mb-10">
            <div class="flex items-center border border-slate-200 p-4 rounded-xl bg-white/50">
               <span class="font-bold mr-4 text-slate-400">11-12</span>
               <div class="flex gap-4">
                  <input id="q-11" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                  <input id="q-12" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
            <ul class="space-y-2 pl-4">
                <li><span class="font-bold">A</span> Children can get their photo taken with a football player</li>
                <li><span class="font-bold">B</span> There is a competition for children today</li>
                <li><span class="font-bold">C</span> Parents must stay with their children at all times</li>
                <li><span class="font-bold">D</span> Children will need sunhats and drinks</li>
                <li><span class="font-bold">E</span> The café has a special offer on meals for children</li>
            </ul>
        </div>

        <p class="font-bold mb-2">Questions 13-14</p>
        <p class="mb-4">Choose <span class="font-bold">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
        <p class="mb-6">Which TWO features of the stadium tour are new this year?</p>
        
        <div class="grid grid-cols-1 gap-4 mb-10">
            <div class="flex items-center border border-slate-200 p-4 rounded-xl bg-white/50">
               <span class="font-bold mr-4 text-slate-400">13-14</span>
               <div class="flex gap-4">
                  <input id="q-13" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                  <input id="q-14" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
            <ul class="space-y-2 pl-4">
                <li><span class="font-bold">A</span> VIP tour</li>
                <li><span class="font-bold">B</span> 360 cinema experience</li>
                <li><span class="font-bold">C</span> audio guide</li>
                <li><span class="font-bold">D</span> dressing room tour</li>
                <li><span class="font-bold">E</span> tours in other languages</li>
            </ul>
        </div>

        <p class="font-bold mb-2">Questions 15-20</p>
        <p class="mb-4">Which event in the history of football in the UK took place in each of the following years?</p>
        <p class="text-sm mb-8">Choose <span class="font-bold">SIX</span> answers from the box and write the correct letter, <span class="font-bold">A-H</span>, next to Questions 15-20.</p>
        
        <div class="border-2 border-slate-800 p-6 rounded-sm bg-white mb-8">
            <h4 class="font-bold mb-4 text-center">Events in the history of football</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                <p><span class="font-bold">A</span> the introduction of pay for the players</p>
                <p><span class="font-bold">B</span> a change to the design of the goal</p>
                <p><span class="font-bold">C</span> the first use of lights for matches</p>
                <p><span class="font-bold">D</span> the introduction of goalkeepers</p>
                <p><span class="font-bold">E</span> the first international match</p>
                <p><span class="font-bold">F</span> two changes to the rules of the game</p>
                <p><span class="font-bold">G</span> the introduction of a fee for spectators</p>
                <p><span class="font-bold">H</span> an agreement on the length of a game</p>
            </div>
        </div>

        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
               <div class="flex items-center justify-between">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">15</span> 1870</span>
                   <input id="q-15" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">18</span> 1877</span>
                   <input id="q-18" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">16</span> 1874</span>
                   <input id="q-16" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">19</span> 1878</span>
                   <input id="q-19" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">17</span> 1875</span>
                   <input id="q-17" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">20</span> 1880</span>
                   <input id="q-20" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
        </div>
      </div>
      `,
            questions: [
                { id: 11, type: "fill-blank", correctAnswer: "B" }, // Using fill-blank for MC pairs for simplicity in current architecture
                { id: 12, type: "fill-blank", correctAnswer: "C" },
                { id: 13, type: "fill-blank", correctAnswer: "A" },
                { id: 14, type: "fill-blank", correctAnswer: "C" },
                { id: 15, type: "fill-blank", correctAnswer: "D" },
                { id: 16, type: "fill-blank", correctAnswer: "F" },
                { id: 17, type: "fill-blank", correctAnswer: "B" },
                { id: 18, type: "fill-blank", correctAnswer: "H" },
                { id: 19, type: "fill-blank", correctAnswer: "C" },
                { id: 20, type: "fill-blank", correctAnswer: "G" }
            ]
        },
        {
            id: "part-3",
            title: "Benefits for children of learning to write",
            instructions: "Questions 21-30",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/cambridge-ielts-20-academic-listening-4-audio-part-3.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-2">Questions 21-22</p>
        <p class="mb-4">Choose <span class="font-bold">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
        <p class="mb-6">Which TWO benefits for children of learning to write did both students find surprising?</p>
        
        <div class="grid grid-cols-1 gap-4 mb-10">
            <div class="flex items-center border border-slate-200 p-4 rounded-xl bg-white/50">
               <span class="font-bold mr-4 text-slate-400">21-22</span>
               <div class="flex gap-4">
                  <input id="q-21" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                  <input id="q-22" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
            <ul class="space-y-2 pl-4">
                <li><span class="font-bold">A</span> improved fine motor skills</li>
                <li><span class="font-bold">B</span> improved memory</li>
                <li><span class="font-bold">C</span> improved concentration</li>
                <li><span class="font-bold">D</span> improved imagination</li>
                <li><span class="font-bold">E</span> improved spatial awareness</li>
            </ul>
        </div>

        <p class="font-bold mb-2">Questions 23-24</p>
        <p class="mb-4">Choose <span class="font-bold">TWO</span> letters, <span class="font-bold">A-E</span>.</p>
        <p class="mb-6">For children with dyspraxia, which TWO problems with handwriting do the students think are easiest to correct?</p>
        
        <div class="grid grid-cols-1 gap-4 mb-10">
            <div class="flex items-center border border-slate-200 p-4 rounded-xl bg-white/50">
               <span class="font-bold mr-4 text-slate-400">23-24</span>
               <div class="flex gap-4">
                  <input id="q-23" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
                  <input id="q-24" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
            <ul class="space-y-2 pl-4">
                <li><span class="font-bold">A</span> not spacing letters correctly</li>
                <li><span class="font-bold">B</span> not writing in a straight line</li>
                <li><span class="font-bold">C</span> applying too much pressure when writing</li>
                <li><span class="font-bold">D</span> confusing letter shapes</li>
                <li><span class="font-bold">E</span> writing very slowly</li>
            </ul>
        </div>

        <p class="font-bold mb-4">Questions 25-30</p>
        <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
      </div>
      `,
            questions: [
                { id: 21, type: "fill-blank", correctAnswer: "C" },
                { id: 22, type: "fill-blank", correctAnswer: "E" },
                { id: 23, type: "fill-blank", correctAnswer: "A" },
                { id: 24, type: "fill-blank", correctAnswer: "C" },
                {
                    id: 25,
                    type: "multiple-choice",
                    text: "What does the woman say about using laptops to teach writing to children with dyslexia?",
                    options: ["Children often lack motivation to learn that way", "Children become fluent relatively quickly", "Children react more positively if they make a mistake"],
                    correctAnswer: "2"
                },
                {
                    id: 26,
                    type: "multiple-choice",
                    text: "When discussing whether to teach cursive or print writing, the woman thinks that",
                    options: ["cursive writing disadvantages a certain group of children", "print writing is associated with lower academic performance", "most teachers in the UK prefer a traditional approach to handwriting"],
                    correctAnswer: "0"
                },
                {
                    id: 27,
                    type: "multiple-choice",
                    text: "According to the students, what impact does poor handwriting have on exam performance?",
                    options: ["There is evidence to suggest grades are affected by poor handwriting", "Neat handwriting is less important now than it used to be", "Candidates write more slowly and produce shorter answers"],
                    correctAnswer: "0"
                },
                {
                    id: 28,
                    type: "multiple-choice",
                    text: "What prediction does the man make about the future of handwriting?",
                    options: ["Touch typing will be taught before writing by hand", "Children will continue to learn to write by hand", "People will dislike handwriting on digital devices"],
                    correctAnswer: "1"
                },
                {
                    id: 29,
                    type: "multiple-choice",
                    text: "The woman is concerned that relying on digital devices has made it difficult for her to",
                    options: ["take detailed notes", "spell and punctuate", "read old documents"],
                    correctAnswer: "1"
                },
                {
                    id: 30,
                    type: "multiple-choice",
                    text: "How do the students feel about their own handwriting?",
                    options: ["concerned they are unable to write quickly", "embarrassed by comments made about it", "regretful that they have lost the habit"],
                    correctAnswer: "2"
                }
            ]
        },
        {
            id: "part-4",
            title: "Research in the Area Around the Chem be Bird Sanctuary",
            instructions: "Questions 31-40",
            audioUrl: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTSWISDOM/audio/cambridge-ielts-20-academic-listening-4-audio-part-4.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD ONLY</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline">Research in the Area Around the Chem be Bird Sanctuary</h3>
            
            <p class="font-bold mb-2 text-slate-800">The importance of birds of prey to local communities</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>They destroy <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">31</span><input id="q-31" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> and other rodents.</li>
                <li>They help prevent farmers from being bitten by <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">32</span><input id="q-32" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span>.</li>
                <li>They have been an important part of local culture for many years.</li>
                <li>They now support the economy by encouraging <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">33</span><input id="q-33" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> in the area.</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Falling numbers of birds of prey</p>
            <p class="mb-2">– The birds may be accidentally killed:</p>
            <ul class="list-disc pl-8 mb-4 space-y-3">
                <li>By <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">34</span><input id="q-34" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> when hunting or sleeping.</li>
                <li>By electrocution from power lines, especially during times of high <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">35</span><input id="q-35" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span>.</li>
            </ul>
            <p class="mb-6 mb-2 pl-5">– Local farmers may illegally shoot them or <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">36</span><input id="q-36" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> them.</p>

            <p class="font-bold mb-2 text-slate-800">Ways of protecting chickens from birds of prey</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>Clearing away vegetation (unhelpful).</li>
                <li>Providing a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">37</span><input id="q-37" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> for chickens (expensive).</li>
                <li>Frightening birds of prey by:
                    <ul class="list-[circle] pl-8 mt-3 space-y-3">
                        <li>Keeping a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">38</span><input id="q-38" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span>.</li>
                        <li>Making a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">39</span><input id="q-39" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> (e.g., with metal objects).</li>
                    </ul>
                </li>
            </ul>
            <p class="mb-2 pl-5">– A <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">40</span><input id="q-40" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> of methods is usually most effective.</p>
        </div>
      </div>
      `,
            questions: [
                { id: 31, type: "fill-blank", correctAnswer: "rats" },
                { id: 32, type: "fill-blank", correctAnswer: "snakes" },
                { id: 33, type: "fill-blank", correctAnswer: "tourism" },
                { id: 34, type: "fill-blank", correctAnswer: "traffic" },
                { id: 35, type: "fill-blank", correctAnswer: "rain" },
                { id: 36, type: "fill-blank", correctAnswer: "poison" },
                { id: 37, type: "fill-blank", correctAnswer: "building" },
                { id: 38, type: "fill-blank", correctAnswer: "dog" },
                { id: 39, type: "fill-blank", correctAnswer: "noise" },
                { id: 40, type: "fill-blank", correctAnswer: "combination" },
            ]
        }
    ]
};

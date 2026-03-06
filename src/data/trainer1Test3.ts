import type { ListeningTest } from "@/types/listening";

export const trainer1Test3: ListeningTest = {
    id: "t1-3",
    title: "IELTS Trainer 1, Test 3",
    parts: [
        {
            id: "part-1",
            title: "Help for Carers",
            instructions: "Questions 1-10",
            audioUrl: "/audio/cambridge-ielts-20-academic-listening-2-audio1.mp3",
            content: `
      <div class="mb-6">
        <p class="font-bold mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD AND/OR A NUMBER</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline uppercase">Local Councils can Arrange Practical Support to Help those Caring for Elderly people at Home.</h3>
            
            <p class="font-bold mb-2 text-slate-800">This can give the carer:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>time for other responsibilities</li>
                <li>a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">1</span><input id="q-1" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Assessment of mother’s needs</p>
            <p class="mb-4 text-slate-700 italic">This may include discussion of:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>how much <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">2</span><input id="q-2" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> the caring involves</li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">What types of tasks are involved, e.g.:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>help with dressing</li>
                <li>helping her have a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">3</span><input id="q-3" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>shopping</li>
                <li>helping with meals</li>
                <li>dealing with <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">4</span><input id="q-4" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Any aspects of caring that are especially difficult, e.g.:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>loss of <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">5</span><input id="q-5" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li><span class="inline-flex items-center gap-2"><span class="font-bold text-sm">6</span><input id="q-6" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span> her</li>
                <li>preventing a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">7</span><input id="q-7" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>

            <p class="font-bold mb-2 text-slate-800">Types of support that may be offered to carers</p>
            <ul class="list-disc pl-5 mb-2 space-y-3">
                <li>transport costs, e.g. cost of a <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">8</span><input id="q-8" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>car-related costs, e.g. fuel and <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">9</span><input id="q-9" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
                <li>help with housework</li>
                <li>help to reduce <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">10</span><input id="q-10" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent font-semibold" /></span></li>
            </ul>
        </div>
      </div>
      `,
            questions: [
                { id: 1, type: "fill-blank", correctAnswer: "break" },
                { id: 2, type: "fill-blank", correctAnswer: "time" },
                { id: 3, type: "fill-blank", correctAnswer: "shower" },
                { id: 4, type: "fill-blank", correctAnswer: "money" },
                { id: 5, type: "fill-blank", correctAnswer: "memory" },
                { id: 6, type: "fill-blank", correctAnswer: "lifting" },
                { id: 7, type: "fill-blank", correctAnswer: "fall" },
                { id: 8, type: "fill-blank", correctAnswer: "taxi" },
                { id: 9, type: "fill-blank", correctAnswer: "insurance" },
                { id: 10, type: "fill-blank", correctAnswer: "stress" },
            ]
        },
        {
            id: "part-2",
            title: "Community Volunteering and Local Festival Events",
            instructions: "Questions 11-20",
            audioUrl: "/audio/cambridge-ielts-20-academic-listening-2-audio-part-2.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Questions 11-16</p>
        <p class="mb-4">What is the role of the volunteers in each of the following activities?</p>
        <p class="text-sm mb-6">Choose <span class="font-bold uppercase">SIX</span> answers from the box and write the correct letter, <span class="font-bold">A-I</span>, next to Questions 11-16.</p>
        
        <div class="border-2 border-slate-800 p-6 rounded-sm bg-white mb-8">
            <h4 class="font-bold mb-4 text-center">Information</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                <p><span class="font-bold">A</span> providing entertainment</p>
                <p><span class="font-bold">B</span> providing publicity about a council service</p>
                <p><span class="font-bold">C</span> contacting local businesses</p>
                <p><span class="font-bold">D</span> giving advice to visitors</p>
                <p><span class="font-bold">E</span> collecting feedback on events</p>
                <p><span class="font-bold">F</span> selling tickets</p>
                <p><span class="font-bold">G</span> introducing guest speakers at an event</p>
                <p><span class="font-bold">H</span> encouraging cooperation between local organisations</p>
                <p><span class="font-bold">I</span> helping people find their seats</p>
            </div>
        </div>

        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10">
            <div class="grid grid-cols-1 gap-y-4">
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-2">11</span> walking around the town centre</span>
                   <input id="q-11" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-2">12</span> helping at concerts</span>
                   <input id="q-12" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-2">13</span> getting involved with community groups</span>
                   <input id="q-13" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-2">14</span> helping with a magazine</span>
                   <input id="q-14" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-2">15</span> participating at lunches for retired people</span>
                   <input id="q-15" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700 max-w-[70%]"><span class="font-bold text-black mr-2">16</span> helping with the website</span>
                   <input id="q-16" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
        </div>

        <p class="font-bold mb-4">Questions 17-20</p>
        <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
      </div>
      `,
            questions: [
                { id: 11, type: "fill-blank", correctAnswer: "D" },
                { id: 12, type: "fill-blank", correctAnswer: "I" },
                { id: 13, type: "fill-blank", correctAnswer: "H" },
                { id: 14, type: "fill-blank", correctAnswer: "E" },
                { id: 15, type: "fill-blank", correctAnswer: "A" },
                { id: 16, type: "fill-blank", correctAnswer: "B" },
                {
                    id: 17,
                    type: "multiple-choice",
                    text: "Which event requires the largest number of volunteers?",
                    options: ["the music festival", "the science festival", "the book festival"],
                    correctAnswer: "1"
                },
                {
                    id: 18,
                    type: "multiple-choice",
                    text: "What is the most important requirement for volunteers at the festivals?",
                    options: ["interpersonal skills", "personal interest in the event", "flexibility"],
                    correctAnswer: "0"
                },
                {
                    id: 19,
                    type: "multiple-choice",
                    text: "New volunteers will start working in the week beginning",
                    options: ["2 September", "9 September", "23 September"],
                    correctAnswer: "1"
                },
                {
                    id: 20,
                    type: "multiple-choice",
                    text: "What is the next annual event for volunteers?",
                    options: ["a boat trip", "a barbecue", "a party"],
                    correctAnswer: "0"
                }
            ]
        },
        {
            id: "part-3",
            title: "Urban Development and Human Geography Discussion",
            instructions: "Questions 21-30",
            audioUrl: "/audio/cambridge-ielts-20-academic-listening-2-audio-3.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Questions 21-25</p>
        <p class="mb-4">What is Rosie and Colin’s opinion about each of the following aspects of human geography?</p>
        <p class="text-sm mb-6">Choose <span class="font-bold uppercase">FIVE</span> answers from the box and write the correct letter, <span class="font-bold">A-G</span>, next to Questions 21-25.</p>
        
        <div class="border-2 border-slate-800 p-6 rounded-sm bg-white mb-8">
            <h4 class="font-bold mb-4 text-center">Opinion</h4>
            <div class="grid grid-cols-1 gap-y-2">
                <p><span class="font-bold">A</span> The information given about this was too vague.</p>
                <p><span class="font-bold">B</span> This may not be relevant to their course.</p>
                <p><span class="font-bold">C</span> This will involve only a small number of statistics.</p>
                <p><span class="font-bold">D</span> It will be easy to find facts about this.</p>
                <p><span class="font-bold">E</span> The facts about this may not be reliable.</p>
                <p><span class="font-bold">F</span> No useful research has been done on this.</p>
                <p><span class="font-bold">G</span> The information provided about this was interesting.</p>
            </div>
        </div>

        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-10">
            <div class="grid grid-cols-1 gap-y-4">
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">21</span> Population</span>
                   <input id="q-21" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">22</span> Health</span>
                   <input id="q-22" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">23</span> Economies</span>
                   <input id="q-23" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">24</span> Culture</span>
                   <input id="q-24" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
               <div class="flex items-center justify-between border-b border-slate-200 pb-2">
                   <span class="font-semibold text-slate-700"><span class="font-bold text-black mr-2">25</span> Poverty</span>
                   <input id="q-25" type="text" class="border-b border-black w-12 text-center font-bold uppercase focus:outline-none focus:border-blue-500 bg-transparent" maxLength="1" />
               </div>
            </div>
        </div>

        <p class="font-bold mb-4">Questions 26-30</p>
        <p class="mb-6">Choose the correct letter, <span class="font-bold">A, B</span> or <span class="font-bold">C</span>.</p>
      </div>
      `,
            questions: [
                { id: 21, type: "fill-blank", correctAnswer: "D" },
                { id: 22, type: "fill-blank", correctAnswer: "G" },
                { id: 23, type: "fill-blank", correctAnswer: "B" },
                { id: 24, type: "fill-blank", correctAnswer: "A" },
                { id: 25, type: "fill-blank", correctAnswer: "E" },
                {
                    id: 26,
                    type: "multiple-choice",
                    text: "Rosie says that in her own city the main problem is",
                    options: ["Crime", "Housing", "Unemployment"],
                    correctAnswer: "2"
                },
                {
                    id: 27,
                    type: "multiple-choice",
                    text: "What recent additions to the outskirts of their cities are both students happy about?",
                    options: ["Conference centres", "Sports centres", "Retail centres"],
                    correctAnswer: "0"
                },
                {
                    id: 28,
                    type: "multiple-choice",
                    text: "The students agree that developing disused industrial sites may",
                    options: ["Have unexpected costs", "Damage the urban environment", "Destroy valuable historical buildings"],
                    correctAnswer: "0"
                },
                {
                    id: 29,
                    type: "multiple-choice",
                    text: "The students will mention Masdar City as an example of an attempt to achieve",
                    options: ["Daily collections for waste recycling", "Sustainable energy use", "Free transport for everyone"],
                    correctAnswer: "1"
                },
                {
                    id: 30,
                    type: "multiple-choice",
                    text: "When discussing the ecotown of Greenhill Abbots, Colin is uncertain about",
                    options: ["What its objectives were", "Why there was opposition to it", "How much of it has actually been built"],
                    correctAnswer: "2"
                }
            ]
        },
        {
            id: "part-4",
            title: "Developing Food Trends",
            instructions: "Questions 31-40",
            audioUrl: "/audio/cambridge-ielts-20-academic-listening-2-audio-part-4.mp3",
            content: `
      <div class="mb-10">
        <p class="font-bold mb-4">Complete the notes below.</p>
        <p class="text-sm mb-6">Write <span class="font-bold uppercase">ONE WORD ONLY</span> for each answer.</p>
        
        <div class="border-2 border-slate-800 p-6 sm:p-8 rounded-sm bg-white mb-10">
            <h3 class="font-bold text-center text-lg mb-6 tracking-wide underline uppercase">Developing Food Trends</h3>
            
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>The growth in interest in food fashions started with <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">31</span><input id="q-31" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> of food being shared on social media.</li>
                <li>The UK food industry is constantly developing products which are new or different.</li>
                <li>Influencers on social media become ‘ambassadors’ for a brand.</li>
                <li>Sales of <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">32</span><input id="q-32" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> food brands have grown rapidly this way.</li>
                <li>Supermarkets track demand for ingredients on social media.</li>
                <li>Famous <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">33</span><input id="q-33" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> are influential.</li>
            </ul>

            <p class="font-bold mb-4 text-slate-800 underline">Marketing campaigns</p>
            
            <p class="font-bold mb-2 text-slate-700">The avocado:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li><span class="inline-flex items-center gap-2"><span class="font-bold text-sm">34</span><input id="q-34" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> were invited to visit growers in South Africa.</li>
                <li>Advertising focused on its <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">35</span><input id="q-35" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> benefits.</li>
            </ul>

            <p class="font-bold mb-2 text-slate-700">Oat milk:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>A Swedish brand’s media campaign received publicity by upsetting competitors.</li>
                <li>Promotion in the USA through <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">36</span><input id="q-36" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> shops reduced the need for advertising.</li>
                <li>It appealed to consumers who are concerned about the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">37</span><input id="q-37" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span>.</li>
            </ul>

            <p class="font-bold mb-2 text-slate-700">Norwegian skrei:</p>
            <ul class="list-disc pl-5 mb-6 space-y-3">
                <li>has helped strengthen the <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">38</span><input id="q-38" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span> of Norwegian seafood.</li>
                <li>Ethical concerns</li>
            </ul>

            <p class="font-bold mb-2 text-slate-700">Quinoa:</p>
            <ul class="list-disc pl-5 mb-2 space-y-3">
                <li>Its success led to an increase in its <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">39</span><input id="q-39" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span>.</li>
                <li>Overuse of resources resulted in poor quality <span class="inline-flex items-center gap-2"><span class="font-bold text-sm">40</span><input id="q-40" type="text" class="border-b border-black w-32 focus:outline-none focus:border-blue-500 bg-transparent text-center font-semibold" /></span>.</li>
            </ul>
        </div>
      </div>
      `,
            questions: [
                { id: 31, type: "fill-blank", correctAnswer: "photos" },
                { id: 32, type: "fill-blank", correctAnswer: "vegan" },
                { id: 33, type: "fill-blank", correctAnswer: "chefs" },
                { id: 34, type: "fill-blank", correctAnswer: "journalists" },
                { id: 35, type: "fill-blank", correctAnswer: "health" },
                { id: 36, type: "fill-blank", correctAnswer: "coffee" },
                { id: 37, type: "fill-blank", correctAnswer: "environment" },
                { id: 38, type: "fill-blank", correctAnswer: "reputation" },
                { id: 39, type: "fill-blank", correctAnswer: "price" },
                { id: 40, type: "fill-blank", correctAnswer: "soil" },
            ]
        }
    ]
};

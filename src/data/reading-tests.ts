export interface Question {
    id: number;
    type: "multiple-choice" | "true-false" | "fill-blank" | "matching";
    text: string;
    options?: string[];
    correctAnswer: string | number;
    image?: string;
}

export interface ReadingTest {
    id: string;
    title: string;
    content: string;
    questions: Question[];
}

export const READING_TESTS: Record<string, ReadingTest> = {
    "fp-1": {
        id: "fp-1",
        title: "Evolution of the Calculator",
        content: `
        <p class="mb-4">Before the invention of the electronic calculator, people used a number of devices to help them with mathematical calculations.</p>
        
        <p class="mb-4">Humans have been using mathematics for so long that it is uncertain what the earliest aids to mental arithmetic were. But the first was probably our fingers, and the second was small piles of stones which were used to keep a record of the objects being counted. However, these methods were insufficient, only useful for minimal amounts and, in the case of fingers, could only be employed for short periods before sore muscles set in. With the advent of prehistoric agriculture, commerce and astronomy, maintaining large piles of stones for counting became cumbersome and hopelessly inadequate.</p>
        
        <p class="mb-4">A rudimentary version of the abacus, or counting frame, dating to around 2,500 BCE, was developed in Sumeria (present day Iraq) and subsequently spread to Europe and the rest of Asia. As the abacus was refined with the use of string and beads, calculations that had been considered extremely difficult became routine. For the next 4,500 years, the abacus was humanity's main counting tool and is still used in parts of Asia. However, it has its limitations; it is unable to multiply and divide as efficiently as it adds and subtracts.</p>
        
        <p class="mb-4">In 1617, Scottish mathematician John Napier published a document entitled Rabdology (calculation with rods) describing a device that came to be known as Napier's bones. The 'bones' are thin rods, inscribed with multiplication tables. The user calculates the sum by adjusting the rods' vertical alignment, and then reads off the multiplication totals horizontally. With a few hours of study, the average person can use a set to solve large multiplication and division problems. Experts can even use them for difficult calculations such as extracting square roots from fairly large numbers. However, these manually operated devices were not calculators; although the simplification of the sums had been achieved, a human operator still had to perform them mentally.</p>
        
        <p class="mb-4">In 1642, Blaise Pascal invented the Pascal calculator, a device truly capable of performing mathematical calculations by means of a clockwork-type mechanism. It was ingenious, attempting arithmetic functions previously thought impossible and it eventually performed all four arithmetic operations without relying on intelligence. It could add and subtract two numbers directly, and multiply and divide by repetition, but the machine was never a commercial success. This was due to the fact that the techniques for producing the interior parts were expensive to implement. In truth, the Pascal calculator did not replace Napier's bones or the abacus in many accountants' offices.</p>

        <p class="mb-4">Thomas de Colmar, a French inventor and entrepreneur, invented and produced the first mechanical calculator robust enough for everyday use. It was known as the Arithmometer. Manufactured in 1851, this invention saw the rapid rise of faster calculating machines that could add, subtract, multiply and divide large numbers with greater accuracy. It became the first commercially successful unit. However, its biggest disadvantage was its size; it often filled a desktop and weighed 15 kilograms or more.</p>

        <p class="mb-4">Another leading figure in the development of the calculator was Curt Herzstark. Born in Vienna, Austria, in 1902 into a family that produced calculators and other office machines, he regularly travelled through the former Austro-Hungarian Empire selling mechanical calculators to banks and other businesses and it was on these travels that he heard the same complaints from his customers. The impracticalities of the mechanical calculators in use was hindering them. They were large and heavy.</p>

        <p class="mb-4">For 10 years, Herzstark thought about the problem of how to make calculators significantly smaller, but it was far from a simple task. His answer was to forget about the inside of his tiny calculator and concentrate first on designing the outside. Then in 1937, he had a breakthrough and began work on a calculator that was portable so it could be transported easily. The unit was approximately 10 centimetres high and only five centimetres in diameter with a cylindrical body. A year later, Herzstark had a finished design that achieved everything he wanted. In 1945, he took his plans to Vienna and was able to convince the Prince of Liechtenstein to provide financial backing for his Curta calculator.</p>

        <p class="mb-4">His invention was a work of staggering ingenuity. From a distance, it resembles a short, stocky pepper grinder, yet it contains more than 600 precision parts, allowing the operator to add, subtract, multiply and perform long division with a mere turn of the crank. Advanced users could even calculate natural logs and square roots. Approximately 150,000 Curta calculators were made between 1948 and 1970, but by the early 1970s electronic pocket calculators ended the manufacture of mechanical calculators. However, the Curta still remains popular and people buy them to add to their collections. No truly mechanical calculators have been invented since; the Curta was the best and the last of its kind.</p>
        `,
        questions: [
            // --- True / False / Not Given (1-6) ---
            { id: 1, type: "true-false", text: "Counting methods before the abacus were limited to small quantities.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 2, type: "true-false", text: "Development of trade helped spread the use of the abacus to Europe.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 3, type: "true-false", text: "For 4,500 years, the abacus was constantly being improved.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 4, type: "true-false", text: "The abacus can carry out some calculation tasks better than other tasks.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 5, type: "true-false", text: "A complex knowledge of arithmetic was essential when using Napier's bones.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 6, type: "true-false", text: "Napier's bones were automated counting devices.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE

            // --- Table Completion (7-16) ---
            { id: 7, type: "fill-blank", text: "_____ was not needed to carry out calculations", correctAnswer: "intelligence" },
            { id: 8, type: "fill-blank", text: "high price was due to manufacturing _____", correctAnswer: "interior parts" },
            { id: 9, type: "fill-blank", text: "the first of several devices with improved _____", correctAnswer: "accuracy" },
            { id: 10, type: "fill-blank", text: "its _____ was impractical", correctAnswer: "size" },
            { id: 11, type: "fill-blank", text: "people's _____ About previous devices led to its invention", correctAnswer: "complaints" },
            { id: 12, type: "fill-blank", text: "his design initially focused on the _____ Of the device", correctAnswer: "outside" },
            { id: 13, type: "fill-blank", text: "because it was so small, it was _____", correctAnswer: "portable" },
            { id: 14, type: "fill-blank", text: "the device received _____ from a royal", correctAnswer: "financial backing" },
            { id: 15, type: "fill-blank", text: "it was operated by moving a _____", correctAnswer: "crank" },
            { id: 16, type: "fill-blank", text: "Curta calculations can be found today in _____", correctAnswer: "collections" },
        ]
    },
    "fp-2": {
        id: "fp-2",
        title: "Sleeping on the Job",
        content: `
        <p class="mb-4"><strong>A</strong> North Americans are a group who do not take naps. Generally, Afternoon naps denote inefficiency and laziness. Latin American and some European cultures have a similar perspective. Taking naps during noon and 4:00 p.m. is common in nearby companies of Mexico and Greece. Recent research suggests that 15 – 30 minutes rest at work in the evening will serve employees to be more conscious, energetic and happier in what they are doing. They also become optimistic and carry the task more confidently. Still, napping on the work has not become normalised. In the academic world, there is a serious debate happening on the topic of “power napping” benefits.</p>

        <p class="mb-4"><strong>B</strong> Some data reports that by estimating the standard of eight hours of sleep per night, the average American has 500 hours of sleep debt or sleep deficit. The National Sleep Foundation in America conducted a survey in which it is found that two out of every three Americans have less than 7 hours of sleep per night during the business week. 40 percent of people claim that fatigue disturbs their everyday lives. Exhaustion is considered as a major issue in contemporary culture by William Anthony, a professor of psychiatry at Boston University. He claims that after drunkenness, sleeping is the leading cause of car crashes. Professor Anthony says that “We have a clear message”.Citizens should be allowed to sleep after their breaks. It is reasoned based on productivity. They will not be efficient if they are tired and asleep on the job.</p>

        <p class="mb-4"><strong>C</strong> Majorly for safety reasons, most employers motivate employees to sleep at work. The Metropolitan Transportation Authority, which runs both the New York subway system and the two commuter railroads, is permitting its bus and train technicians to take power sleep. One more railway starts to allow its train drivers to sleep about 45 minutes, during which trains are delayed when specified off-main-line locations and when emergency responders have been alerted. Some international airlines permit airline pilots to sleep in the cockpit, when they are not on service. United States’ airline companies still have not agreed to this procedure.</p>

        <p class="mb-4"><strong>D</strong> According to the Encyclopedia of Sleep and Dreaming, taking naps in mid afternoon is regarded as a biologically-based inclination and so the habit of sleeping at night is formed. If the required sleep limit is disrupted or disturbed for some reason, a nap acts as an adjustment. Additionally, it could reduce sleepiness and boost metabolism. Many experiments suggest that the nap zone occurs between midday and 3:00 p.m. To solve this problem, several people use caffeine or sugar. But, the employer’s mood and efficiency will improve, if they are permitted to take naps.</p>

        <p class="mb-4"><strong>E</strong> Workers could have the ability to focus better and complete assignments without taking a single day out. Still, Workers take naps without authorization, though some businesses started to implement the naps for employees to increase productivity. One of the US companies is constructing a 2,000 square foot building for nap which can be filled upto 20 of its employees at any given time. Even a Japanese firm in their corporate offices, sets up tents and gives eyeshades and earplugs and permits workers to take naps during the workday. According to Professor Anthony, napping will not be one of the operational activities. It will have a great influence on productivity. Smart managers identified that workers need rest in order to perform well in their work.</p>

        <p class="mb-4"><strong>F</strong> There is also a belief that company naptime is just a way to keep employees to work for longer periods of time. On the other side, nap days come so frequently as work hours become more flexible for certain employees. Office hours are being there till employees awake. About 11 million Americans are teleworking and forty million spending bonus full or part time. Production hours are also increasing which takes their toll. As a consequence, Americans sleep little and work more hours. By understanding this, companies arrange quick naps for employees in the middle of the day for the benefit of the companies.</p>
        `,
        questions: [
            // --- Yes / No / Not Given (1-5) ---
            { id: 1, type: "true-false", text: "Recent research says that power napping does not have any impact on employees.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 }, // NO
            { id: 2, type: "true-false", text: "Americans have a sleep debt of 500 hours.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 }, // YES
            { id: 3, type: "true-false", text: "Employers motivate employees to take naps for safety reasons.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 }, // YES
            { id: 4, type: "true-false", text: "One US company builts 2,000 square foot building for play.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 }, // NO
            { id: 5, type: "true-false", text: "Power nap will increase the age.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN

            // --- Note Completion (6-10) ---
            { id: 6, type: "fill-blank", text: "Citizens should be allowed to sleep after their 6_____ which will increase their productivity.", correctAnswer: "breaks" },
            { id: 7, type: "fill-blank", text: "Employees mood and 7_____ will improved", correctAnswer: "efficiency" },
            { id: 8, type: "fill-blank", text: "if they are allowed to take 8____", correctAnswer: "naps" },
            { id: 9, type: "fill-blank", text: "A nap can reduce sleepiness and boost 9_____", correctAnswer: "metabolism" },
            { id: 10, type: "fill-blank", text: "Smart managers recognized that workers need 10_____ in order to perform better in their work", correctAnswer: "rest" },

            // --- Summary Completion (11-13) ---
            { id: 11, type: "fill-blank", text: "According to the Encyclopedia of Sleep and Dreaming, midafternoon nap is considered to be a 11______ inclination.", correctAnswer: "biologically-based" },
            { id: 12, type: "fill-blank", text: "If sleep time is disturbed for some reason, nap acts as a 12______.", correctAnswer: "adjustment" },
            { id: 13, type: "fill-blank", text: "It could reduce their 13_______ and boost their metabolism.", correctAnswer: "sleepiness" },
        ]
    },
    "fp-9": {
        id: "fp-9",
        title: "Socially Responsible Businesses",
        content: `
        <p class="mb-4">Many economies today are witnessing the rise of socially responsible businesses, or SRBs. These are profit-making companies which have the additional goal of improving society in some way. Business commentators usually describe SRBs as a fundamentally 21st-century phenomenon. However, this common generalisation overlooks the significant contribution of Muhammad Yunus, among a number of other entrepreneurs. Yunus established a highly successful bank in Bangladesh in the 1980s lending money to small village business projects that could not attract conventional loans.</p>

        <p class="mb-4">There are also those such as CEO Dan Rathbourne who dismiss SRBs as a passing fad which have had little impact on the real world of business. This cynical view is disproved by the evidence: in the UK alone, there are an estimated 80,000 SRBs, turning over about £25 billion a year. What is more, research by the Quorate Group based on interviews with over 5,000 respondents in twelve nations found that not only were consumers prepared to support SRBs but that employees preferred to work for them. Ten years ago Christine Dubois used her experience in corporate finance to establish the Concern Consultancy, which coordinates advice and funding for SRB start-ups. As professional investors increasingly recognise the potential of SRBs, the number of niche firms such as Dubois's will almost inevitably multiply. Professor of business studies Joel Drew claims that this is partly a consequence of the digital revolution. In his persuasive analysis, digital networks have allowed consumers to identify socially responsible products and services in ways never possible before.</p>

        <p class="mb-4">So what are some examples of SRBs? Many that have come to my attention recently are small-scale local companies, such as Renew, which searches demolition sites for old materials - wooden floorboards and other construction timber, for example. Rather than allow these resources to be wasted, the team at Renew have fashioned them into a range of tables, chairs and similar items that are sold at relatively low cost. Other SRBs have rather different goals. The first Indulge cafe was established by owner Derek Jardine in an area with few local amenities. The idea for the cafe was to provide a meeting place for local residents - a community hub - not only by serving food and drink but also by running workshops, film evenings and art exhibitions. There are now six Indulge cafes around the country with more planned. Of course, large corporations may not be in a position to change their products or services quickly. But one international telecommunications corporation, for example, enables its employees to take part in the Green Scheme, whereby staff give short periods of their time unpaid to plant trees in conservation areas, and numerous other large companies have similar initiatives.</p>

        <p class="mb-4">Another small SRB that caught my eye is Bright Sparks, where engineer Johann Jensen is investigating the use of things such as bamboo and soya beans to make coffee capsules and takeaway cups that will break down and decay naturally. In the longer term. Jensen hopes to work on other kinds of packaging for the food and hospitality industries. Meanwhile, Greater Good is now in its second decade of running a farm-to-table vegetable and fruit delivery box service to inner city residents. Recent years have seen a significant increase in demand for this type of direct service, bypassing traditional retailers.</p>

        <p class="mb-4">The increase in the number of such SRBs is associated with the rise of' conscious consumers', who want to know exactly how the products they buy have been produced. What was the environmental impact? Were workers treated ethically? So the argument is sometimes put forward that SRBs are a response to new consumer values. But equally, many SRBs that I have studied were established by entrepreneurs who wanted to make a difference and have taken consumers along with them. In reality, both sides of the relationship have contributed to the fresh approach.</p>

        <p class="mb-4">Consumers, of course, are not always members of the public. Recently I spoke to Lucinda Mitchell, procurement officer for my local council here in London, who told me that her organisation frequently purchases from SRBs because of shared values. Local, state and national authorities have huge purchasing power for both goods and services. And Mitchell's position is becoming commonplace internationally as these bodies are increasingly prepared to work with SRBs, provided they are competitive on price and quality.</p>

        <p class="mb-4">In terms of goals, there are numerous types of social benefits that SRBs can hope to achieve. Many concern employment, whether creating opportunities in deprived areas, promoting gender equality in employment or providing jobs for disabled people. Others focus on fair and ethical treatment of employees and trading partners. Some SRBs add additional goals as they develop, which has worked well. Undoubtedly the most common goal, though, is environmental protection. While this is commendable and a reflection of deep concern in contemporary society, it would be good to see greater diversity as the SRB concept evolves.</p>

        <p class="mb-4">As with any business, of course, there are issues to be faced. Some SRBs are set up with considerable energy and dedication, but with little knowledge or experience of business, and find it difficult to compete. Some find it a challenge to promote their values successfully and so never gain support from consumers or investors. Others lack an internal organisational structure, which leads to inefficiencies. However, few of these problems relate specifically to SRBs but are witnessed in many start-ups. Greater professionalism and business school education can solve all of these issues, ensuring the sector has a bright future.</p>
        `,
        questions: [
            // --- Yes / No / Not Given (1-5) ---
            { id: 1, type: "true-false", text: "Many business commentators forget the example of Muhammad Yunus.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 }, // YES
            { id: 2, type: "true-false", text: "Dan Rathbourne provides an accurate assessment of Socially Responsible Businesses (SRBs).", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 }, // NO
            { id: 3, type: "true-false", text: "The Quorate Group is a good example of an influential SRB.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 4, type: "true-false", text: "Few other businesses will wish to follow the example of the Concern Consultancy.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 }, // NO
            { id: 5, type: "true-false", text: "Professor Drew has correctly identified one reason for the emergence of SRBs.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 }, // YES

            // --- Summary Completion (6-10) ---
            { id: 6, type: "fill-blank", text: "<strong>List of words:</strong> A. biodegradable materials, B. recycled clothing, C. fresh produce, D. closer neighbourhoods, E. secure accommodation, F. affordable furniture, G. permanent employment, H. volunteer work.<br/><br/>Renew has made a successful business out of designing 6_____.", correctAnswer: "F" },
            { id: 7, type: "fill-blank", text: "On the other hand, Indulge wishes to promote 7_____ and is expanding to new sites.", correctAnswer: "D" },
            { id: 8, type: "fill-blank", text: "Large corporations cannot always make quick changes but many make provision for 8_____ such as the Green Scheme.", correctAnswer: "H" },
            { id: 9, type: "fill-blank", text: "On a smaller scale, Johann Jensen is experimenting with types of 9_____ and is planning other ventures.", correctAnswer: "A" },
            { id: 10, type: "fill-blank", text: "In contrast, an example of a well-established business is Greater Good, which provides 10_____ to a growing market.", correctAnswer: "C" },

            // --- Multiple Choice (11-14) ---
            { id: 11, type: "multiple-choice", text: "When discussing 'conscious consumers' the writer concludes that", options: ["businesses are slow to respond to consumer demand.", "consumers and businesses have different interests.", "businesses and consumers are influencing each other.", "consumers should put more pressure on businesses."], correctAnswer: 2 }, // C
            { id: 12, type: "multiple-choice", text: "The writer refers to Lucinda Mitchell in order to", options: ["explain why SRBs lose out to other businesses.", "exemplify the way governments often support SRBs.", "contrast the approach of different governments to SRBs.", "compare the role of SRBs in different regions."], correctAnswer: 1 }, // B
            { id: 13, type: "multiple-choice", text: "What does the writer suggest about the goals of SRBs?", options: ["SRBs should have a wider range of goals.", "It is a mistake for an SRB to change goal.", "Some goals may make an SRB unprofitable.", "An SRB should not have more than one goal."], correctAnswer: 0 }, // A
            { id: 14, type: "multiple-choice", text: "Which of the following best summarises the writer's argument in the final paragraph?", options: ["A minority of businesses will inevitably fail.", "SRBs are more successful than other businesses.", "Universities should do more research into SRBs.", "The problems faced by SRBs can be overcome."], correctAnswer: 3 }, // D
        ]
    },
    "fp-10": {
        id: "fp-10",
        title: "Crop-growing skyscrapers",
        content: `
        <p class="mb-4">By the year 2050, nearly 80% of the Earth's population will live in urban centres. Applying the most conservative estimates to current demographic trends, the human population will increase by about three billion people by then. An estimated 10<sup>9</sup> hectares of new land (about 20% larger than Brazil) will be needed to grow enough food to feed them, if traditional farming methods continue as they are practised today. At present, throughout the world, over 80% of the land that is suitable for raising crops is in use. Historically, some 15% of that has been laid waste by poor management practices. What can be done to ensure enough food for the world's population to live on?</p>

        <p class="mb-4">The concept of indoor farming is not new, since hothouse production of tomatoes and other produce has been in vogue for some time. What is new is the urgent need to scale up this technology to accommodate another three billion people. Many believe an entirely new approach to indoor farming is required, employing cutting-edge technologies. One such proposal is for the 'Vertical Farm'. The concept is of multi-storey buildings in which food crops are grown in environmentally controlled conditions. Situated in the heart of urban centres, they would drastically reduce the amount of transportation required to bring food to consumers. Vertical farms would need to be efficient, cheap to construct and safe to operate. If successfully implemented, proponents claim, vertical farms offer the promise of urban renewal, sustainable production of a safe and varied food supply (through year-round production of all crops), and the eventual repair of ecosystems that have been sacrificed for horizontal farming.</p>

        <p class="mb-4">It took humans 10,000 years to learn how to grow most of the crops we now take for granted. Along the way, we despoiled most of the land we worked, often turning verdant, natural ecozones into semi-arid deserts. Within that same time frame, we evolved into an urban species, in which 60% of the human population now lives vertically in cities. This means that, for the majority, we humans have shelter from the elements, yet we subject our food-bearing plants to the rigours of the great outdoors and can do no more than hope for a good weather year. However, more often than not now, due to a rapidly changing climate, that is not what happens. Massive floods, long droughts, hurricanes and severe monsoons take their toll each year, destroying millions of tons of valuable crops.</p>

        <p class="mb-4">The supporters of vertical farming claim many potential advantages for the system. For instance, crops would be produced all year round, as they would be kept in artificially controlled, optimum growing conditions. There would be no weather-related crop failures due to droughts, floods or pests. All the food could be grown organically, eliminating the need for herbicides, pesticides and fertilisers. The system would greatly reduce the incidence of many infectious diseases that are acquired at the agricultural interface. Although the system would consume energy, it would return energy to the grid via methane generation from composting non-edible parts of plants. It would also dramatically reduce fossil fuel use, by cutting out the need for tractors, ploughs and shipping.</p>

        <p class="mb-4">A major drawback of vertical farming, however, is that the plants would require artificial light. Without it, those plants nearest the windows would be exposed to more sunlight and grow more quickly, reducing the efficiency of the system. Single-storey greenhouses have the benefit of natural overhead light: even so, many still need artificial lighting. A multi-storey facility with no natural overhead light would require far more. Generating enough light could be prohibitively expensive, unless cheap, renewable energy is available, and this appears to be rather a future aspiration than a likelihood for the near future.</p>

        <p class="mb-4">One variation on vertical farming that has been developed is to grow plants in stacked trays that move on rails. Moving the trays allows the plants to get enough sunlight. This system is already in operation, and works well within a single-storey greenhouse with light reaching it from above: it is not certain, however, that it can be made to work without that overhead natural light.</p>

        <p class="mb-4">Vertical farming is an attempt to address the undoubted problems that we face in producing enough food for a growing population. At the moment, though, more needs to be done to reduce the detrimental impact it would have on the environment, particularly as regards the use of energy. While it is possible that much of our food will be grown in skyscrapers in future, most experts currently believe it is far more likely that we will simply use the space available on urban rooftops.</p>
        `,
        questions: [
            // --- Complete the sentences (1-7) ---
            { id: 1, type: "fill-blank", text: "<strong>Indoor farming</strong><br/><br/>Some food plants, including 1______, are already grown indoors.", correctAnswer: "tomatoes" },
            { id: 2, type: "fill-blank", text: "Vertical farms would be located in 2______, meaning that there would be less need to take them long distances to customers.", correctAnswer: "urban centres" },
            { id: 3, type: "fill-blank", text: "Vertical farms could use methane from plants and animals to produce 3______.", correctAnswer: "energy" },
            { id: 4, type: "fill-blank", text: "The consumption of 4______ would be cut because agricultural vehicles would be unnecessary.", correctAnswer: "fossil fuel" },
            { id: 5, type: "fill-blank", text: "The fact that vertical farms would need 5______ light is a disadvantage.", correctAnswer: "artificial" },
            { id: 6, type: "fill-blank", text: "One form of vertical farming involves planting in 6______ which are not fixed.", correctAnswer: "stacked trays" },
            { id: 7, type: "fill-blank", text: "The most probable development is that food will be grown on 7______ in towns and cities.", correctAnswer: "urban rooftops" },

            // --- True / False / Not Given (8-13) ---
            { id: 8, type: "true-false", text: "Methods for predicting the Earth's population have recently changed.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 9, type: "true-false", text: "Human beings are responsible for some of the destruction to food-producing land.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 10, type: "true-false", text: "The crops produced in vertical farms will depend on the season.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 11, type: "true-false", text: "Some damage to food crops is caused by climate change.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 12, type: "true-false", text: "Fertilisers will be needed for certain crops in vertical farms.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 13, type: "true-false", text: "Vertical farming will make plants less likely to be affected by infectious diseases.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
        ]
    },
    "fp-11": {
        id: "fp-11",
        title: "The Falkirk Wheel",
        content: `
        <h2 class="text-xl font-bold mb-4">A unique engineering achievement</h2>
        <p class="mb-4">The Falkirk Wheel in Scotland is the world's first and only rotating boat lift. Opened in 2002, it is central to the ambitious £84.5m Millennium Link project to restore navigability across Scotland by reconnecting the historic waterways of the Forth & Clyde and Union Canals.</p>

        <p class="mb-4">The major challenge of the project lay in the fact that the Forth & Clyde Canal is situated 35 metres below the level of the Union Canal. Historically, the two canals had been joined near the town of Falkirk by a sequence of 11 locks – enclosed sections of canal in which the water level could be raised or lowered – that stepped down across a distance of 1.5 km. This had been dismantled in 1933, thereby breaking the link. When the project was launched in 1994, the British Waterways authority were keen to create a dramatic twenty-first-century landmark which would not only be a fitting commemoration of the Millennium, but also a lasting symbol of the economic regeneration of the region.</p>

        <p class="mb-4">Numerous ideas were submitted for the project, including concepts ranging from rolling eggs to tilting tanks, from giant see-saws to overhead monorails. The eventual winner was a plan for the huge rotating steel boat lift which was to become The Falkirk Wheel. The unique shape of the structure is claimed to have been inspired by various sources, both manmade and natural, most notably a Celtic double-headed axe, but also the vast turning propeller of a ship, the ribcage of a whale or the spine of a fish.</p>

        <p class="mb-4">The various parts of The Falkirk Wheel were all constructed and assembled, like one giant toy building set, at Butterley Engineering's Steelworks in Derbyshire, some 400 km from Falkirk. A team there carefully assembled the 1,200 tonnes of steel, painstakingly fitting the pieces together to an accuracy of just 10 mm to ensure a perfect fit. In the summer of 2001, the structure was then dismantled and transported on 35 lorries to Falkirk, before all being bolted back together again on the ground, and finally lifted into position in five large sections by crane. The Wheel would need to withstand immense and constantly changing stresses as it rotated, so to make the structure more robust, the steel sections were bolted rather than welded together. Over 45,000 bolt holes were matched with their bolts, and each bolt was hand-tightened.</p>

        <p class="mb-4">The Wheel consists of two sets of opposing axe-shaped arms, attached about 25 metres apart to a fixed central spine. Two diametrically opposed water-filled 'gondolas', each with a capacity of 360,000 litres, are fitted between the ends of the arms. These gondolas always weigh the same, whether or not they are carrying boats. This is because, according to Archimedes' principle of displacement, floating objects displace their own weight in water. So when a boat enters a gondola, the amount of water leaving the gondola weighs exactly the same as the boat. This keeps the Wheel balanced and so, despite its enormous mass, it rotates through 180° in five and a half minutes while using very little power. It takes just 1.5 kilowatt-hours (5.4 MJ) of energy to rotate the Wheel – roughly the same as boiling eight small domestic kettles of water.</p>

        <p class="mb-4">Boats needing to be lifted up enter the canal basin at the level of the Forth & Clyde Canal and then enter the lower gondola of the Wheel. Two hydraulic steel gates are raised, so as to seal the gondola off from the water in the canal basin. The water between the gates is then pumped out. A hydraulic clamp, which prevents the arms of the Wheel moving while the gondola is docked, is removed, allowing the Wheel to turn. In the central machine room an array of ten hydraulic motors then begins to rotate the central axle. The axle connects to the outer arms of the Wheel, which begin to rotate at a speed of 1/8 of a revolution per minute. As the wheel rotates, the gondolas are kept in the upright position by a simple gearing system. Two eight-metre-wide cogs orbit a fixed inner cog of the same width, connected by two smaller cogs travelling in the opposite direction to the outer cogs – so ensuring that the gondolas always remain level. When the gondola reaches the top, the boat passes straight onto the aqueduct situated 24 metres above the canal basin.</p>

        <p class="mb-4">The remaining 11 metres of lift needed to reach the Union Canal is achieved by means of a pair of locks. The Wheel could not be constructed to elevate boats over the full 35-metre difference between the two canals, owing to the presence of the historically important Antonine Wall, which was built by the Romans in the second century AD. Boats travel under this wall via a tunnel, then through the locks, and finally on to the Union Canal.</p>
        `,
        questions: [
            // --- True / False / Not Given (14-19) ---
            { id: 14, type: "true-false", text: "The Falkirk Wheel has linked the Forth & Clyde Canal with the Union Canal for the first time in their history.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (reconnecting)
            { id: 15, type: "true-false", text: "There was some opposition to the design of the Falkirk Wheel at first.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 16, type: "true-false", text: "The Falkirk Wheel was initially put together at the location where its components were manufactured.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 17, type: "true-false", text: "The Falkirk Wheel is the only boat lift in the world which has steel sections bolted together by hand.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN (doesn't say it's the ONLY one)
            { id: 18, type: "true-false", text: "The weight of the gondolas varies according to the size of boat being carried.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (always weigh the same)
            { id: 19, type: "true-false", text: "The construction of the Falkirk Wheel site took into account the presence of a nearby ancient monument.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE

            // --- Label the diagram (20-26) ---
            { id: 20, type: "fill-blank", text: "<strong>How a boat is lifted on the Falkirk Wheel</strong><br/><br/>A pair of 20______ are lifted in order to shut out water from canal basin.", correctAnswer: "gates" }, // hydraulic steel gates? "gates" probably
            { id: 21, type: "fill-blank", text: "A 21______ is taken out, enabling Wheel to rotate.", correctAnswer: "clamp" }, // hydraulic clamp
            { id: 22, type: "fill-blank", text: "Hydraulic motors drive 22______", correctAnswer: "axle" }, // rotates the central axle
            { id: 23, type: "fill-blank", text: "A range of different-sized 23______ ensures boat keeps upright.", correctAnswer: "cogs" }, // cogs
            { id: 24, type: "fill-blank", text: "Boat reaches top Wheel, then moves directly onto 24______", correctAnswer: "aqueduct" },
            { id: 25, type: "fill-blank", text: "Boat travels through tunnel beneath Roman 25______", correctAnswer: "wall" }, // Antonine Wall
            { id: 26, type: "fill-blank", text: "26______ raise boat 11 m to level of Union Canal.", correctAnswer: "locks" }, // locks
        ]
    },
    "fp-12": {
        id: "fp-12",
        title: "Reducing the Effects of Climate Change",
        content: `
        <h2 class="text-xl font-bold mb-4">Mark Rowe reports on the increasingly ambitious geo-engineering projects being explored by scientists</h2>
        
        <p class="mb-4"><strong>A</strong> Such is our dependence on fossil fuels, and such is the volume of carbon dioxide already released into the atmosphere, that many experts agree that significant global warming is now inevitable. They believe that the best we can do is keep it at a reasonable level, and at present the only serious option for doing this is cutting back on our carbon emissions. But while a few countries are making major strides in this regard, the majority are having great difficulty even stemming the rate of increase, let alone reversing it. Consequently, an increasing number of scientists are beginning to explore the alternative of geo-engineering – a term which generally refers to the intentional large-scale manipulation of the environment. According to its proponents, geo-engineering is the equivalent of a backup generator: if Plan A – reducing our dependency on fossil fuels – fails, we require a Plan B, employing grand schemes to slow down or reverse the process of global warming.</p>

        <p class="mb-4"><strong>B</strong> Geo-engineering has been shown to work, at least on a small localised scale. For decades, May Day parades in Moscow have taken place under clear blue skies, aircraft having deposited dry ice, silver iodide and cement powder to disperse clouds. Many of the schemes now suggested look to do the opposite, and reduce the amount of sunlight reaching the planet. The most eye-catching idea of all is suggested by Professor Roger Angel of the University of Arizona. His scheme would employ up to 16 trillion minute spacecraft, each weighing about one gram, to form a transparent, sunlight-refracting sunshade in an orbit 1.5 million km above the Earth. This could, argues Angel, reduce the amount of light reaching the Earth by two per cent.</p>

        <p class="mb-4"><strong>C</strong> The majority of geo-engineering projects so far carried out – which include planting forests in deserts and depositing iron in the ocean to stimulate the growth of algae – have focused on achieving a general cooling of the Earth. But some look specifically at reversing the melting at the poles, particularly the Arctic. The reasoning is that if you replenish the ice sheets and frozen waters of the high latitudes, more light will be reflected back into space, so reducing the warming of the oceans and atmosphere.</p>

        <p class="mb-4"><strong>D</strong> The concept of releasing aerosol sprays into the stratosphere above the Arctic has been proposed by several scientists. This would involve using sulphur or hydrogen sulphide aerosols so that sulphur dioxide would form clouds, which would, in turn, lead to a global dimming. The idea is modelled on historic volcanic explosions, such as that of Mount Pinatubo in the Philippines in 1991, which led to a short-term cooling of global temperatures by 0.5 °C. Scientists have also scrutinised whether it's possible to preserve the ice sheets of Greenland with reinforced high-tension cables, preventing icebergs from moving into the sea. Meanwhile in the Russian Arctic, geo-engineering plans include the planting of millions of birch trees. Whereas the region's native evergreen pines shade the snow and absorb radiation, birches would shed their leaves in winter, thus enabling radiation to be reflected by the snow. Re-routing Russian rivers to increase cold water flow to ice-forming areas could also be used to slow down warming, say some climate scientists.</p>

        <p class="mb-4"><strong>E</strong> But will such schemes ever be implemented? Generally speaking, those who are most cautious about geo-engineering are the scientists involved in the research. Angel says that his plan is 'no substitute for developing renewable energy: the only permanent solution'. And Dr Phil Rasch of the US-based Pacific Northwest National Laboratory is equally guarded about the role of geo-engineering: 'I think all of us agree that if we were to end geo-engineering on a given day, then the planet would return to its pre-engineered condition very rapidly, and probably within ten to twenty years. That's certainly something to worry about.'</p>

        <p class="mb-4"><strong>F</strong> The US National Center for Atmospheric Research has already suggested that the proposal to inject sulphur into the atmosphere might affect rainfall patterns across the tropics and the Southern Ocean. 'Geo-engineering plans to inject stratospheric aerosols or to seed clouds would act to cool the planet, and act to increase the extent of sea ice,' says Rasch. 'But all the models suggest some impact on the distribution of precipitation.'</p>

        <p class="mb-4"><strong>G</strong> 'A further risk with geo-engineering projects is that you can "overshoot",' says Dr Dan Lunt, from the University of Bristol's School of Geophysical Sciences, who has studied the likely impacts of the sunshade and aerosol schemes on the climate. 'You may bring global temperatures back to pre-industrial levels, but the risk is that the poles will still be warmer than they should be and the tropics will be cooler than before industrialisation.' To avoid such a scenario, Lunt says Angel's project would have to operate at half strength; all of which reinforces his view that the best option is to avoid the need for geo-engineering altogether.</p>

        <p class="mb-4"><strong>H</strong> The main reason why geo-engineering is supported by many in the scientific community is that most researchers have little faith in the ability of politicians to agree – and then bring in – the necessary carbon cuts. Even leading conservation organisations see the value of investigating the potential of geo-engineering. According to Dr Martin Sommerkorn, climate change advisor for the World Wildlife Fund's International Arctic Programme, 'Human-induced climate change has brought humanity to a position where we shouldn't exclude thinking thoroughly about this topic and its possibilities.'</p>
        `,
        questions: [
            // --- Matching Paragraph Information (27-29) ---
            { id: 27, type: "multiple-choice", text: "mention of a geo-engineering project based on an earlier natural phenomenon", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 3 }, // D (volcanic explosions)
            { id: 28, type: "multiple-choice", text: "an example of a successful use of geo-engineering", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 1 }, // B (Moscow May Day)
            { id: 29, type: "multiple-choice", text: "a common definition of geo-engineering", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 0 }, // A (intentional large-scale manipulation)

            // --- Table Completion (30-36) ---
            // "GEO-ENGINEERING PROJECTS"
            // We will render this using the custom GlassTable component.
            // The questions below map to the numbered blanks in the table.

            { id: 30, type: "fill-blank", text: "Spacecraft: put a large number of tiny spacecraft into orbit far above Earth to create a 30______ that would reduce amount of light.", correctAnswer: "sunshade" },
            { id: 31, type: "fill-blank", text: "Sea usage: place 31______ in the sea to encourage algae to form.", correctAnswer: "iron" },
            { id: 32, type: "fill-blank", text: "Sea usage: place iron in the sea to encourage 32______ to form.", correctAnswer: "algae" },
            { id: 33, type: "fill-blank", text: "Atmosphere: release aerosol sprays into the stratosphere to create 33______ that would reduce amount of light.", correctAnswer: "clouds" },
            { id: 34, type: "fill-blank", text: "Greenland: fix strong 34______ to Greenland ice sheets to prevent icebergs moving into the sea.", correctAnswer: "cables" },
            { id: 35, type: "fill-blank", text: "Russian Arctic: plant trees to allow the 35______ to reflect radiation.", correctAnswer: "snow" },
            { id: 36, type: "fill-blank", text: "Russian Arctic: change the direction of 36______ to bring more cold water into ice-forming areas.", correctAnswer: "rivers" },

            // --- Matching People (37-40) ---
            // 37. The effects of geo-engineering may not be long-lasting. => Dr Phil Rasch (B? No, E: pre-engineered condition very rapidly... ten to twenty years. Dr Phil Rasch -> E)
            // Wait, standard IELTS matching often has a box of names.
            // B: Dr Phil Rasch
            // D: Dr Dan Lunt
            // C: Dr Martin Sommerkorn
            // A: Roger Angel
            // Let's check text.
            // 37. effects not long-lasting -> Rasch (E: "return to pre-engineered condition very rapidly"). So matches Rasch.
            // 38. Ge-engineering is a topic worth exploring -> Sommerkorn (H: "shouldn't exclude thinking thoroughly about this"). So matches Sommerkorn.
            // 39. It may be necessary to limit the effectiveness of geo-engineering projects -> Lunt (G: "Angel's project would have to operate at half strength"). So matches Lunt.
            // 40. Research into non-fossil-based fuels cannot be replaced by geo-engineering -> Angel (E: "no substitute for developing renewable energy"). So matches Angel.

            // Let's assume a simplified Multiple Choice for now or "Matching" type if supported.
            // The current system supports "multiple-choice" with options. I will use that.
            // Options: A: Roger Angel, B: Phil Rasch, C: Martin Sommerkorn, D: Dan Lunt.
            // 37: B
            // 38: D? No, Sommerkorn is C in my list above, but let's check the user provided image...
            // User didn't provide image for 37-40 answers, but provided image for answers key!
            // Image Key: 37 B, 38 D (Wait... 38 is D?), 39 C, 40 A.
            // Let me re-read Passage.
            // 38: "Geo-engineering is a topic worth exploring". H: Sommerkorn. If 38 is D, who is D?
            // User Key says: 37 B, 38 D, 39 C, 40 A.
            // List of People likely:
            // A: Roger Angel
            // B: Phil Rasch
            // C: Dan Lunt
            // D: Martin Sommerkorn
            // Let's verify this mapping.
            // 37 (Not long lasting) -> Rasch (B). Correct.
            // 38 (Worth exploring) -> Sommerkorn (D). User Key 38=D. So Sommerkorn is D.
            // 39 (Limit effectiveness) -> Lunt (C). User Key 39=C. So Lunt is C.
            // 40 (Renewable energy) -> Angel (A). User Key 40=A. So Angel is A.

            { id: 37, type: "multiple-choice", text: "The effects of geo-engineering may not be long-lasting.", options: ["A: Roger Angel", "B: Phil Rasch", "C: Dan Lunt", "D: Martin Sommerkorn"], correctAnswer: 1 },
            { id: 38, type: "multiple-choice", text: "Geo-engineering is a topic worth exploring.", options: ["A: Roger Angel", "B: Phil Rasch", "C: Dan Lunt", "D: Martin Sommerkorn"], correctAnswer: 3 },
            { id: 39, type: "multiple-choice", text: "It may be necessary to limit the effectiveness of geo-engineering projects.", options: ["A: Roger Angel", "B: Phil Rasch", "C: Dan Lunt", "D: Martin Sommerkorn"], correctAnswer: 2 },
            { id: 40, type: "multiple-choice", text: "Research into non-fossil-based fuels cannot be replaced by geo-engineering.", options: ["A: Roger Angel", "B: Phil Rasch", "C: Dan Lunt", "D: Martin Sommerkorn"], correctAnswer: 0 },
        ]
    },
    "fp-3": {
        id: "fp-3",
        title: "Raising the Mary Rose",
        content: `
        <h2 class="text-xl font-bold mb-4">How a sixteenth-century warship was recovered from the seabed</h2>
        
        <p class="mb-4">On 19 July 1545, English and French fleets were engaged in a sea battle off the coast of southern England in the area of water called the Solent, between Portsmouth and the Isle of Wight. Among the English vessels was a warship by the name of <em>Mary Rose</em>. Built in Portsmouth some 35 years earlier, she had had a long and successful fighting career, and was a favourite of King Henry VIII. Accounts of what happened to the ship vary: while witnesses agree that she was not hit by the French, some maintain that she was outdated, overladen and sailing too low in the water, others that she was mishandled by undisciplined crew. What is undisputed, however, is that the <em>Mary Rose</em> sank into the Solent that day, taking at least 500 men with her. After the battle, attempts were made to recover the ship, but these failed.</p>
        
        <p class="mb-4">The <em>Mary Rose</em> came to rest on the seabed, lying on her starboard (right) side at an angle of approximately 60 degrees. The hull (the body of the ship) acted as a trap for the sand and mud carried by Solent currents. As a result, the starboard side filled rapidly, leaving the exposed port (left) side to be eroded by marine organisms and mechanical degradation. Because of the way the ship sank, nearly all of the starboard half survived intact. During the seventeenth and eighteenth centuries, the entire site became covered with a layer of hard grey clay, which minimised further erosion.</p>
        
        <p class="mb-4">Then, on 16 June 1836, some fishermen in the Solent found that their equipment was caught on an underwater obstruction, which turned out to be the <em>Mary Rose</em>. Diver John Deane happened to be exploring another sunken ship nearby, and the fishermen approached him, asking him to free their gear. Deane dived down, and found the equipment caught on a timber protruding slightly from the seabed. Exploring further, he uncovered several other timbers and a bronze gun. Deane continued diving on the site intermittently until 1840, recovering several more guns, two bows, various timbers, part of a pump and various other small finds.</p>
        
        <p class="mb-4">The <em>Mary Rose</em> then faded into obscurity for another hundred years. But in 1965, military historian and amateur diver Alexander McKee, in conjunction with the British Sub-Aqua Club, initiated a project called 'Solent Ships'. While on paper this was a plan to examine a number of known wrecks in the Solent, what McKee really hoped for was to find the <em>Mary Rose</em>. Ordinary search techniques proved unsatisfactory, so McKee entered into collaboration with Harold E. Edgerton, professor of electrical engineering at the Massachusetts Institute of Technology. In 1967, Edgerton's side-scan sonar systems revealed a large, unusually shaped object, which McKee believed was the <em>Mary Rose</em>.</p>
        
        <p class="mb-4">Further excavations revealed stray pieces of timber and an iron gun. But the climax to the operation came when, on 5 May 1971, part of the ship's frame was uncovered. McKee and his team now knew for certain that they had found the wreck, but were as yet unaware that it also housed a treasure trove of beautifully preserved artefacts. Interest in the project grew, and in 1979, The Mary Rose Trust was formed, with Prince Charles as its President and Dr Margaret Rule its Archaeological Director. The decision whether or not to salvage the wreck was not an easy one, although an excavation in 1978 had shown that it might be possible to raise the hull. While the original aim was to raise the hull if at all feasible, the operation was not given the go-ahead until January 1982, when all the necessary information was available.</p>
        
        <p class="mb-4">An important factor in trying to salvage the <em>Mary Rose</em> was that the remaining hull was an open shell. This led to an important decision being taken: namely to carry out the lifting operation in three very distinct stages. The hull was attached to a lifting frame via a network of bolts and lifting wires. The problem of the hull being sucked back downwards into the mud was overcome by using 12 hydraulic jacks. These raised it a few centimetres over a period of several days, as the lifting frame rose slowly up its four legs. It was only when the hull was hanging freely from the lifting frame, clear of the seabed and the suction effect of the surrounding mud, that the salvage operation progressed to the second stage. In this stage, the lifting frame was fixed to a hook attached to a crane, and the hull was lifted completely clear of the seabed and transferred underwater into the lifting cradle. This required precise positioning to locate the legs into the 'stabbing guides' of the lifting cradle. The lifting cradle was designed to fit the hull using archaeological survey drawings, and was fitted with air bags to provide additional cushioning for the hull's delicate timber framework. The third and final stage was to lift the entire structure into the air, by which time the hull was also supported from below. Finally, on 11 October 1982, millions of people around the world held their breath as the timber skeleton of the <em>Mary Rose</em> was lifted clear of the water, ready to be returned home to Portsmouth.</p>
        `,
        questions: [
            // --- True / False / Not Given (1-4) ---
            { id: 1, type: "true-false", text: "There is some doubt about what caused the <em>Mary Rose</em> to sink.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 2, type: "true-false", text: "The <em>Mary Rose</em> was the only ship to sink in the battle of 19 July 1545.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 3, type: "true-false", text: "Most of one side of the <em>Mary Rose</em> lay undamaged under the sea.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 4, type: "true-false", text: "Alexander McKee knew that the wreck would contain many valuable historical objects.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE

            // --- Matching Dates (5-8) ---
            { id: 5, type: "multiple-choice", text: "Match the statement with the correct date:<br/>A search for the <em>Mary Rose</em> was launched.", options: ["A: 1836", "B: 1840", "C: 1965", "D: 1967", "E: 1971", "F: 1979", "G: 1982"], correctAnswer: 2 }, // 5: C (1965)
            { id: 6, type: "multiple-choice", text: "Match the statement with the correct date:<br/>One person's exploration of the <em>Mary Rose</em> site stopped.", options: ["A: 1836", "B: 1840", "C: 1965", "D: 1967", "E: 1971", "F: 1979", "G: 1982"], correctAnswer: 1 }, // 6: B (1840)
            { id: 7, type: "multiple-choice", text: "Match the statement with the correct date:<br/>It was agreed that the hull of the <em>Mary Rose</em> should be raised.", options: ["A: 1836", "B: 1840", "C: 1965", "D: 1967", "E: 1971", "F: 1979", "G: 1982"], correctAnswer: 6 }, // 7: G (1982)
            { id: 8, type: "multiple-choice", text: "Match the statement with the correct date:<br/>The site of the <em>Mary Rose</em> was found by chance.", options: ["A: 1836", "B: 1840", "C: 1965", "D: 1967", "E: 1971", "F: 1979", "G: 1982"], correctAnswer: 0 }, // 8: A (1836)

            // --- Diagram Labelling (9-13) ---
            { id: 9, type: "fill-blank", text: "Raising the hull of the <em>Mary Rose</em>: Stages one and two<br/><br/>9_______ attached to hull by wires.", image: "https://azrmwfzrgdvkbzezwyfo.supabase.co/storage/v1/object/public/IELTS%20TASK%20PICTURES/Screenshot%202026-02-21%20223902.png", correctAnswer: "frame" }, // Accept: lifting frame, frame
            { id: 10, type: "fill-blank", text: "10_______ to prevent hull being sucked into mud.", correctAnswer: "hydraulic jacks" }, // Accept: hydraulic jacks, jacks
            { id: 11, type: "fill-blank", text: "legs are placed into 11_______", correctAnswer: "stabbing guides" }, // Accept: stabbing guides
            { id: 12, type: "fill-blank", text: "hull is lowered into 12_______", correctAnswer: "cradle" }, // Accept: lifting cradle, cradle
            { id: 13, type: "fill-blank", text: "13_______ used as extra protection for the hull", correctAnswer: "air bags" }, // Accept: air bags
        ]
    },
    "fp-4": {
        id: "fp-4",
        title: "What destroyed the civilisation of Easter Island?",
        content: `
        <p class="mb-4"><strong>A</strong> Easter Island, or Rapa Nui as it is known locally, is home to several hundred ancient human statues – the <em>moai</em>. After this remote Pacific island was settled by the Polynesians, it remained isolated for centuries. All the energy and resources that went into the <em>moai</em> – some of which are ten metres tall and weigh over 7,000 kilos – came from the island itself. Yet when Dutch explorers landed in 1722, they met a Stone Age culture. The moai were carved with stone tools, then transported for many kilometres, without the use of animals or wheels, to massive stone platforms. The identity of the moai builders was in doubt until well into the twentieth century. Thor Heyerdahl, the Norwegian ethnographer and adventurer, thought the statues had been created by pre-Inca peoples from Peru. Bestselling Swiss author Erich von Däniken believed they were built by stranded extraterrestrials. Modern science – linguistic, archaeological and genetic evidence – has definitively proved the moai builders were Polynesians, but not how they moved their creations. Local folklore maintains that the statues walked, while researchers have tended to assume the ancestors dragged the statues somehow, using ropes and logs.</p>
        
        <p class="mb-4"><strong>B</strong> When the Europeans arrived, Rapa Nui was grassland, with only a few scrawny trees. In the 1970s and 1980s, though, researchers found pollen preserved in lake sediments, which proved the island had been covered in lush palm forests for thousands of years. Only after the Polynesians arrived did those forests disappear. US scientist Jared Diamond believes that the Rapanui people – descendants of Polynesian settlers – wrecked their own environment. They had unfortunately settled on an extremely fragile island – dry, cool, and too remote to be properly fertilised by windblown volcanic ash. When the islanders cleared the forests for firewood and farming, the forests didn't grow back. As trees became scarce and they could no longer construct wooden canoes for fishing, they ate birds. Soil erosion decreased their crop yields. Before Europeans arrived, the Rapanui had descended into civil war and cannibalism, he maintains. The collapse of their isolated civilisation, Diamond writes, is a 'worst-case scenario for what may lie ahead of us in our own future'.</p>
        
        <p class="mb-4"><strong>C</strong> The moai, he thinks, accelerated the self-destruction. Diamond interprets them as power displays by rival chieftains who, trapped on a remote little island, lacked other ways of asserting their dominance. They competed by building ever bigger figures. Diamond thinks they laid the moai on wooden sledges, hauled over log rails, but that required both a lot of wood and a lot of people. To feed the people, even more land had to be cleared. When the wood was gone and civil war began, the islanders began toppling the moai. By the nineteenth century none were standing.</p>
        
        <p class="mb-4"><strong>D</strong> Archaeologists Terry Hunt of the University of Hawaii and Carl Lipo of California State University agree that Easter Island lost its lush forests and that it was an 'ecological catastrophe' – but they believe the islanders themselves weren't to blame. And the moai certainly weren't. Archaeological excavations indicate that the Rapanui went to heroic efforts to protect the resources of their wind-lashed, infertile fields. They built thousands of circular stone windbreaks and gardened inside them, and used broken volcanic rocks to keep the soil moist. In short, Hunt and Lipo argue, the prehistoric Rapanui were pioneers of sustainable farming.</p>
        
        <p class="mb-4"><strong>E</strong> Hunt and Lipo contend that moai-building was an activity that helped keep the peace between islanders. They also believe that moving the moai required few people and no wood, because they were walked upright. On that issue, Hunt and Lipo say, archaeological evidence backs up Rapanui folklore. Recent experiments indicate that as few as 18 people could, with three strong ropes and a bit of practice, easily manoeuvre a 1,000 kg moai replica a few hundred metres. The figures' fat bellies tilted them forward, and a D-shaped base allowed handlers to roll and rock them side to side.</p>
        
        <p class="mb-4"><strong>F</strong> Moreover, Hunt and Lipo are convinced that the settlers were not wholly responsible for the loss of the island's trees. Archaeological finds of nuts from the extinct Easter Island palm show tiny grooves, made by the teeth of Polynesian rats. The rats arrived along with the settlers, and in just a few years, Hunt and Lipo calculate, they would have overrun the island. They would have prevented the reseeding of the slow-growing palm trees and thereby doomed Rapa Nui's forest, even without the settlers' campaign of deforestation. No doubt the rats ate birds' eggs too. Hunt and Lipo also see no evidence that Rapanui civilisation collapsed when the palm forest did. They think its population grew rapidly and then remained more or less stable until the arrival of the Europeans, who introduced deadly diseases to which islanders had no immunity. Then in the nineteenth century slave traders decimated the population, which shrivelled to 111 people by 1877.</p>
        
        <p class="mb-4"><strong>G</strong> Hunt and Lipo's vision, therefore, is one of an island populated by peaceful and ingenious moai builders and careful stewards of the land, rather than by reckless destroyers ruining their own environment and society. 'Rather than a case of abject failure, Rapa Nui is an unlikely story of success', they claim. Whichever is the case, there are surely some valuable lessons which the world at large can learn from the story of Rapa Nui.</p>
        `,
        questions: [
            // --- Matching Headings (14-20) ---
            { id: 14, type: "multiple-choice", text: "Choose the correct heading for Paragraph A", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 1 }, // ii
            { id: 15, type: "multiple-choice", text: "Choose the correct heading for Paragraph B", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 8 }, // ix
            { id: 16, type: "multiple-choice", text: "Choose the correct heading for Paragraph C", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 7 }, // viii
            { id: 17, type: "multiple-choice", text: "Choose the correct heading for Paragraph D", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 0 }, // i
            { id: 18, type: "multiple-choice", text: "Choose the correct heading for Paragraph E", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 3 }, // iv
            { id: 19, type: "multiple-choice", text: "Choose the correct heading for Paragraph F", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 6 }, // vii
            { id: 20, type: "multiple-choice", text: "Choose the correct heading for Paragraph G", options: ["i Evidence of innovative environment management practices", "ii An undisputed answer to a question about the moai", "iii The future of the moai statues", "iv A theory which supports a local belief", "v The future of Easter Island", "vi Two opposing views about the Rapanui people", "vii Destruction outside the inhabitants' control", "viii How the statues made a situation worse", "ix Diminishing food resources"], correctAnswer: 5 }, // vi

            // --- Summary Completion (21-24) ---
            { id: 21, type: "fill-blank", text: "Jared Diamond's View<br/><br/>Diamond believes that the Polynesian settlers on Rapa Nui destroyed its forests, cutting down its trees for fuel and clearing land for 21______.", correctAnswer: "farming" },
            { id: 22, type: "fill-blank", text: "Twentieth-century discoveries of pollen prove that Rapa Nui had once been covered in palm forests, which had turned into grassland by the time the Europeans arrived on the island. When the islanders were no longer able to build the 22______ they needed to go fishing,", correctAnswer: "canoes" },
            { id: 23, type: "fill-blank", text: "they began using the island's 23______ as a food source, according to Diamond.", correctAnswer: "birds" },
            { id: 24, type: "fill-blank", text: "Diamond also claims that the moai were built to show the power of the island's chieftains, and that the methods of transporting the statues needed not only a great number of people, but also a great deal of 24______.", correctAnswer: "wood" },

            // --- Multiple Choice (25-26) ---
            { id: 25, type: "multiple-choice", text: "Choose TWO letters, A-E.<br/><br/>On what points do Hunt and Lipo disagree with Diamond?<br/><br/>(First Choice)", options: ["A the period when the moai were created", "B how the moai were transported", "C the impact of the moai on Rapanui society", "D how the moai were carved", "E the origins of the people who made the moai"], correctAnswer: 1 }, // B
            { id: 26, type: "multiple-choice", text: "Choose TWO letters, A-E.<br/><br/>On what points do Hunt and Lipo disagree with Diamond?<br/><br/>(Second Choice)", options: ["A the period when the moai were created", "B how the moai were transported", "C the impact of the moai on Rapanui society", "D how the moai were carved", "E the origins of the people who made the moai"], correctAnswer: 2 }, // C
        ]
    },
    "fp-13": {
        id: "fp-13",
        title: "The Dover Bronze-Age Boat",
        content: `
        <p class="mb-4">A beautifully preserved boat, made around 3,000 years ago and discovered by chance in a muddy hole, has had a profound impact on archaeological research.</p>

        <p class="mb-4">It was 1992. In England, workmen were building a new road through the heart of Dover, to connect the ancient port and the Channel Tunnel, which, when it opened just two years later, was to be the first land link between Britain and Europe for over 10,000 years. A small team from the Canterbury Archaeological Trust (CAT) worked alongside the workmen, recording new discoveries bought to light by the machines.</p>

        <p class="mb-4">At the base of the deep shaft six meters below the modern streets, a wooden structure was revealed. Cleaning away the waterlogged site overlying the timbers, archaeologists realized its true nature. They had found a prehistoric boat, preserved by the type of sediment in which it was buried. It was then named by Dover Bronze- Age Boat.</p>

        <p class="mb-4">About nine meters of the boat’s length was recovered; one end lay beyond the excavation and had to be left. What survived consisted essentially of four intricately carved oak planks: two on the bottom, joined along a central seam by a complicated system of wedges and stitched to the others. The seams had been made watertight by pads of moss, fixed by wedges and yew stitches.</p>

        <p class="mb-4">The timbers that closed the recovered end of the boat had been removed in antiquity when it was abandoned, but much about its original shape could be deduced. There was also evidence for missing upper side planks. The boat was not a wreck, but had been deliberately discarded, dismantled and broken. Perhaps it had been “ritually killed” at the end of its life, like other Bronze-Age objects.</p>

        <p class="mb-4">With hindsight, it was significant that the boat was found and studied by mainstream archaeologists who naturally focused on its cultural context. At the time, ancient boats were often considered only from a narrower technological perspective, but news about the Dover boat reached a broad audience. In 2002, on the tenth anniversary of the discovery, the Dover Bronze-Age Boat Trust hosted a conference, where this meeting of different traditions became apparent. Alongside technical papers about the boat, other speakers explored its social and economic contexts, and the religious perceptions of boats in Bronze- Age societies. Many speakers came from overseas, and debate about cultural connections was renewed.</p>

        <p class="mb-4">Within seven years of excavation, the Dover boat had been conserved and displayed, but it was apparent that there were issues that could not be resolved simply by studying the old wood. Experimental archaeology seemed to be the solution: a boat reconstruction, half-scale or full-sized, would permit assessment of the different hypotheses regarding its build and the missing end. The possibility of returning to Dover to search for a boat’s unexcavated northern end was explored, but practical and financial difficulties were insurmountable- and there was no guarantee that the timbers had survived the previous decade in the changed environment.</p>

        <p class="mb-4">Detailed proposals to reconstruct the boat were drawn up in 2004. Archaeological evidence was beginning to suggest a Bronze- Age community straddling the Channel, brought together by the sea, rather than separated by it. In a region today divided by languages and borders, archaeologists had a duty to inform the general public about their common cultural heritage.</p>

        <p class="mb-4">The boat project began in England but it was conceived from the start as a European collaboration. Reconstruction was only part of a scheme that would include a major exhibition and an extensive educational and outreach programme. Discussions began early in 2005 with archaeological bodies, universities and heritage organizations either side of the Channel. There was much enthusiasm and support, and an official launch of the project was held at an international seminar in France in 2007. Financial support was confirmed in 2008 and the project then named BOAT 1550BC got under way in June 2011.</p>

        <p class="mb-4">A small team began to make the boat at the start of 2012 on the Roman Lawn outside Dover museum. A full- scale reconstruction of a mid-section had been made in 1996, primarily to see how Bronze- Age replica tools performed. In 2012, however, the hull shape was at the centre of the work, so modern power tools were used to carve the oak planks, before turning to prehistoric tools for finishing. It was decided to make the replica haft-scale for reasons of cost and time, any synthetic materials were used for the stitching, owing to doubts about the scaling and tight timetable.</p>

        <p class="mb-4">Meanwhile, the exhibition was being prepared ready for opening in July 2012 at the Castle Museum in Boulogne-sur-Mer. Entitled ‘Beyond the Horizon: Societies of the Channel & North Sea 3,500 years ago’ it brought together for the first time a remarkable collection of Bronze- Age objects, including many new discoveries for commercial archaeology and some of the great treasure of the past. The reconstructed boat, as a symbol of the maritime connections that bound together the communities either side of the Channel, was the centrepiece.</p>
        `,
        questions: [
            // --- Chart Completion (1-5) ---
            { id: 1, type: "fill-blank", text: "1992- the boat was discovered during the construction of a 1 _____", correctAnswer: "road" },
            { id: 2, type: "fill-blank", text: "2002-an international 2 _____ was held to gather information", correctAnswer: "conference" },
            { id: 3, type: "fill-blank", text: "2004- 3 _____ for the reconstruction were produced", correctAnswer: "proposals" },
            { id: 4, type: "fill-blank", text: "2007- the 4 _____ Of BOAT 1550BC took place", correctAnswer: "launch" },
            { id: 5, type: "fill-blank", text: "2012- the Bronze-Age 5 _____ featured the boat and other objects", correctAnswer: "exhibition" },

            // --- Statement Agreement (6-9) ---
            { id: 6, type: "true-false", text: "Archaeologists realized that the boat had been damaged on purpose.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 7, type: "true-false", text: "Initially, only the technological aspects of the boat were examined.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 8, type: "true-false", text: "Archaeologists went back to the site to try and find the missing northern.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 9, type: "true-false", text: "Evidence found in 2004 suggested that the Bronze-Age Boat had been used for trade.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN

            // --- Short Answer (10-13) ---
            { id: 10, type: "fill-blank", text: "How far under the ground was the boat found? _____", correctAnswer: "six meters" },
            { id: 11, type: "fill-blank", text: "What natural material had been secured to the boat to prevent water entering? _____", correctAnswer: "moss" },
            { id: 12, type: "fill-blank", text: "What aspect of the boat was the focus of the 2012 reconstruction? _____", correctAnswer: "hull shape" },
            { id: 13, type: "fill-blank", text: "Which two factors influenced the decision not to make a full-scale reconstruction of the boat? _____", correctAnswer: "cost and time" },
        ]
    },
    "fp-14": {
        id: "fp-14",
        title: "A Closer Examination of a Study on Verbal and Non-Verbal Message",
        content: `
        <h2 class="text-xl font-bold mb-4">A Closer Examination of a Study on Verbal and Non-Verbal Message</h2>
        <p class="mb-4">A study of non-verbal communication carried out in 1967 continues to be widely quoted today. David Lapakko looks at the limitations of the original study.</p>

        <p class="mb-4"><strong>Description of the Study:</strong> The findings of a study on verbal and non-verbal messages in communication by Albert Mehrabian and his colleagues at UCLA in 1967 have been quoted so frequently that they are now often regarded as a self-evident truth. In the first experiment, subjects were asked to listen to a recording of a female saying the word 'maybe' in three tones of voice to convey liking, neutrality, and disliking. The subjects were then shown photos of female faces expressing the same three emotions and were asked to guess the emotions in the recorded voice and the photos. It was found that the photos got more accurate responses than the voices. In the second experiment, subjects listened to nine recorded words spoken in different tones of voice. Three words had positive meanings (e.g., honey), three were neutral (e.g., oh) and three were negative (e.g., terrible). Again, the subjects had to guess the speaker's emotions. It was found that the tone of voice carried more meaning than the individual words. From these experiments, the researchers concluded that 7% of our feelings towards a speaker are based on the actual words they use, 38% on their tone of voice, and 55% on their body language (e.g., facial expression).</p>

        <p class="mb-4"><strong>Methodological Issues:</strong> However, a closer look at the study reveals several limitations. The first is that the entire study involved only 62 subjects, Of these, 25 were used to select the word for the first experiment, while the key issue comparing verbal and non-verbal communication — was determined by only the 37 remaining subjects. All were female undergraduates who participated as part of their introductory psychology A course, and their ages and academic qualifications seem remarkably uniform. Thus, the findings may simply be a product of the nature of the sample. Critics have also pointed out that the 7-38-55 formula is flawed since it was pieced together from two different experiments, neither of which involved all three channels (verbal, vocal, and facial). In addition, in the first experiment, a single word may be used throughout, so the effects of changes in verbal input couldn't be assessed. The researchers intentionally used a 'neutral' word, so naturally, the subjects found little meaning there. Such a methodology lacks validity. In the real world, people communicate in a particular context and speak in phrases and full-blown sentences, making extensive use of the multi-faceted vehicle of language. My concern is that interpretations of this study have gained such prominence in our pedagogical literature. This 7-38-55 formula appears in many basic texts, used for training in public speaking, interpersonal communication, and organizational communication.</p>

        <p class="mb-4"><strong>Lessons to consider:</strong> Clearly, one appealing aspect of the Mehrabian study is its numerical precision. Communication is a complex phenomenon, but it seems less so when we can rely on these three magical numbers. In contrast to the ambiguities of language, numbers seem to possess exactness. And the popular appeal of the study has given the 7-38-55 formula enormous credibility. There is a certain mystique about non-verbal communication, and the continued references to this research sustain it, encouraging people to believe in the overwhelming importance of the non-verbal message compared with the verbal one. Yet we know that even one ill-chosen word to a colleague or friend can make or break a communicative effort. Words do matter. Bradley (1991), one of the few textbook writers to criticize the Mehrabian study, makes the same point when he observes, 'If we could communicate 93% of information and attitudes with vocal and facial cues, it would be wasteful to spend time learning a language. Mehrabian himself believes his research should not be interpreted to devalue the role of language in communication, saying: Please remember that all my findings... dealt with communications of feelings and attitudes... it is absurd to imply or suggest that the verbal portion of all communication constitutes only 7% of the message... anytime we communicate abstract relationships (e.g., x=y — square of z) 100% of the entire communication is verbal. (Mehrabian, 1995). To be fair, many textbook writers attempt to be faithful to the context of Mehrabian's research. For example, Stewart and D'Angelo (1988) write: “Mehrabian argues that when we're uncertain about what someone's feeling, or about how much we like him or her, we rely...only 7% on the words that are spoken'. Others try to play down the specific percentages, saying that an understanding of the general importance of non-verbal cues is more important. Nonetheless, other textbook authors simply use the numbers without placing any limits on their meaning.</p>

        <p class="mb-4"><strong>Conclusion:</strong> Since this relatively small study was first published, it has achieved an influence far beyond its intended scope. We need to put it into its proper perspective and learn some essential lessons from it regarding social science research, communication pedagogy, and the forces that have created widespread misunderstanding about communication.</p>
        `,
        questions: [
            // --- Summary Completion (27-30) ---
            { id: 27, type: "fill-blank", text: "Albert Mehrabian and his colleagues carried out an influential study comparing the 27_____ of verbal and non-verbal communication.", correctAnswer: "D" },
            { id: 28, type: "fill-blank", text: "This involved two experiments. In both experiments, subjects had to identify the 28_____ being communicated by other people.", correctAnswer: "G" },
            { id: 29, type: "fill-blank", text: "The two main areas focused on in the first experiment were voice tones and 29_____,", correctAnswer: "A" },
            { id: 30, type: "fill-blank", text: "while the second focused mainly on voice tones and 30_____.", correctAnswer: "E" },

            // --- Yes / No / Not Given (31-35) ---
            { id: 31, type: "true-false", text: "One limitation of the study was that there were too few subjects involved.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 }, // YES
            { id: 32, type: "true-false", text: "The fact that the subjects in the study came from a similar background was an advantage.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 }, // NO
            { id: 33, type: "true-false", text: "The two experiments should have been carried out in a different order.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 34, type: "true-false", text: "The researchers' choice of a neutral word was helpful in the context of the study.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 }, // NO
            { id: 35, type: "true-false", text: "The study would have been more valid if it had included a range of languages.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN

            // --- Multiple Choice (36-40) ---
            { id: 36, type: "multiple-choice", text: "What does the writer say about the numerical precision of Mehrabian's study?", options: ["A. It makes the claims more attractive.", "B. It is the strongest point of the study.", "C. It will appeal to superstitious people.", "D. It allows comparison between languages."], correctAnswer: 0 }, // A
            { id: 37, type: "multiple-choice", text: "What does the writer say about the popularity of the 7-38-55 formula?", options: ["A. It is unlikely to maintain its present status.", "B. It is leading to an undervaluing of language.", "C. It should be applied in a more practical way.", "D. It may help understanding of non-verbal messages."], correctAnswer: 1 }, // B
            { id: 38, type: "multiple-choice", text: "What point is Bradley making about language learning?", options: ["A. Language could be learned more efficiently than it is.", "B. More research is needed into attitudes to communication.", "C. More should be spent looking at tone and body language.", "D. Language must be important since we make an effort to acquire it."], correctAnswer: 3 }, // D
            { id: 39, type: "multiple-choice", text: "What does Mehrabian himself say about his findings?", options: ["A. They are relevant to only one area of communication.", "B. It is only in maths that 100% of communication is verbal.", "C. Feelings are more difficult to communicate than numerical facts.", "D. Non-verbal communication is the main part of the message."], correctAnswer: 0 }, // A
            { id: 40, type: "multiple-choice", text: "What is the writer's purpose in the paragraph beginning 'To be fair...'?", options: ["A. To justify the strong points of Mehrabian's study.", "B. To outline other research on non-verbal behaviour.", "C. To present varying interpretations of Mehrabian's study.", "D. To show that textbooks tend to ignore non-verbal behaviour."], correctAnswer: 2 }, // C
        ]
    },
    "fp-15": {
        id: "fp-15",
        title: "Katherine Mansfield",
        content: `
        <h2 class="text-xl font-bold mb-4">Katherine Mansfield</h2>
        <p class="mb-4"><em>Katherine Mansfield was a modernist writer of short fiction who was born and brought up in New Zealand</em></p>
        
        <p class="mb-4">Katherine Mansfield Beauchamp Murry was born in 1888, into a prominent family in Wellington, New Zealand. She became one of New Zealand's best-known writers, using the pen name of Katherine Mansfield. The daughter of a banker, and born into a middle-class family, she was also a first cousin of Countess Elizabeth von Arnim, a distinguished novelist in her time. Mansfield had two older sisters and a younger brother. Her father, Harold Beauchamp, went on to become the chairman of the Bank of New Zealand. In 1893, the Mansfield family moved to Karori, a suburb of Wellington, where Mansfield would spend the happiest years of her childhood; she later used her memories of this time as an inspiration for her Prelude story.</p>

        <p class="mb-4">Her first published stories appeared in the High School Reporter and the Wellington Girls' High School magazine in 1898 and 1899. In 1902, she developed strong feelings for a musician who played the cello, Arnold Trowell, although her feelings were not, for the most past, returned. Mansfield herself was an accomplished cellist, having received lesion from Trowell's father. Mansfied wrote in her journals of feeling isolated to some extent in New Zealand, and, in general terms of her interest in the Maori people (New Zealand's native people), who were often portrayed in a sympathetic light in her later stories, such as How Pearl Button was Kidnapped.</p>

        <p class="mb-4">She moved to London in 1903, where she attended Queen's college, along with her two sisters. Manfield recommenced playing the cello, an occupation that she believed, during her time at Queen's, she would take up professionally. She also began contributing to the college newspaper, with such a dedication to it that she eventually became its editor. She was particularly interested in the works of the French writers of this period and on the 19th- century British writer, Oscar Wilde, and she was appreciated amongst fellow students at Queen's for her lively and charismatic approach to life and work. She met follow writer Ida Baker, a South African, at the college, and the pair became lifelong friends. Mansfield did not actively support the suffragette movement in the Uk. Women in New Zeland had gained the right to vote in 1893.</p>

        <p class="mb-4">Mansfield first began journeying into the other parts of Europe in the period 1903-1906, mainly to Belgium and Germany. After finishing her schooling in England, she returned to her New Zealand home in 1906, only then beginning to write short stories in a serious way. She had several works published in Australia in a magazine called Native Comparison, which was her first paid writing work, and by this time she had her mind set on becoming a professional writer. It was also the first occasion on which she used the pseudonym "k.Mansfied".</p>

        <p class="mb-4">Mansfield rapidly grew discontented with the provincial New Zealand lifestyle, and with her family. Two years later she headed again in London. Her father sent her an annual subsidy of €100 for the rest of her life. In later years, she would express both admiration and disdain for New Zealand in her journals.</p>

        <p class="mb-4">In 1911, Mansfield met John Middleton Murry, the Oxford scholar and editor of the literary magazine Rhythm. They were later to marry in 1918. Mansfield became a co-editor of Rhythm, which was subsequently called The Blue Review, in which more of her works were published. She and Murry lived in various houses in England and briefly in Paris. The Blue Review failed to gain enough readers and was no longer published. Their attempt to set up as writers in Paris was cut short by Murry's bankruptcy, which resulted from the failure of this and other journals. Life back in England meant frequently changed addresses and very limited funds.</p>

        <p class="mb-4">Between 1915 and 1918, Mansfield moved between England and Bandoi, France. She and Murry developed close contact with other well-known writers of the time such as DH Lawrence, Bertrand Russell and Aldous Huxley. By October 1918 Mansfield had become seriously ill; she had been diagnosed with tuberculosis and was advised to enter a sanatorium. She could no longer spend time with writers in London. In the autumn of 1918 she was so ill that she decided to go to Ospedale in Italy. It was the publication of Bliss and Other Stories in 1920 that was to solidify Mansfield's reputation as a writer.</p>

        <p class="mb-4">Mansfied also spent time in Menton, France, as the tenant of her father's cousin at "The Villa Isola Bella". There she wrote she pronounced to be "...the only story that satisfies me to any extent".</p>

        <p class="mb-4">Mansfield produced a great deal of work in the final years of her life, and much of her prose and poetry remained unpublished at her death in 1923. After her death, her husband, Murry, took on the task of editing and publishing her works. His efforts resulted in two additional volumes of short stories. The Doves' Nest and Something Childish, published in 1923 and 1924 respectively, the publication of her Poems as well as a collection of critical writings (Novels and Novelist) and a number of editions of Mansfield's previously unpublished letters and journals.</p>
        `,
        questions: [
            // --- True / False / Not Given (1-6) ---
            { id: 1, type: "true-false", text: "The name Katherine Mansfield, that appears on the writer’s book, was exactly the same as her original name.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 2, type: "true-false", text: "Mansfield won a prize for a story she wrote for the High School Reporter.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 3, type: "true-false", text: "How Pearl Button Was Kidnapped portrayed Maori people in a favorable way", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 4, type: "true-false", text: "When Mansfield was at Queen’s College, she planned to be a professional writer.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (planned cellist)
            { id: 5, type: "true-false", text: "Mansfield was unpopular with the other students at Queen’s College.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 6, type: "true-false", text: "In London, Mansfield showed little interest in politics.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE

            // --- Note Completion (7-13) ---
            { id: 7, type: "fill-blank", text: "Moved from England back to New Zealand in 7 _____", correctAnswer: "1906" },
            { id: 8, type: "fill-blank", text: "First paid writing work was in a publication based in 8 _____", correctAnswer: "Australia" },
            { id: 9, type: "fill-blank", text: "Her 9 _____ and the New Zealand way of life made her feel dissatisfied", correctAnswer: "family" },
            { id: 10, type: "fill-blank", text: "10 _____ prevented Mansfield and Murry from staying together in Paris", correctAnswer: "bankruptcy" },
            { id: 11, type: "fill-blank", text: "Spent time with distinguished 11 _____", correctAnswer: "writers" },
            { id: 12, type: "fill-blank", text: "Her 12 _____ was consolidated when Bliss and Other Stories was published", correctAnswer: "reputation" },
            { id: 13, type: "fill-blank", text: "Mansfield’s 13 _____ published more of her works after her death", correctAnswer: "husband" },
        ]
    },
    "fp-16": {
        id: "fp-16",
        title: "Aphantasia: A life without mental images",
        content: `
        <h2 class="text-xl font-bold mb-4">Aphantasia: A life without mental images</h2>
        
        <p class="mb-4">Close your eyes and imagine walking along a sandy beach and then gazing over the horizon as the Sun rises. How clear is the image that springs to mind?</p>

        <p class="mb-4">Most people can readily conjure images inside their head - known as their mind's eye. But this year scientists have described a condition, aphantasia, in which some people are unable to visualise mental images.</p>

        <p class="mb-4">Niel Kenmuir, from Lancaster, has always had a blind mind's eye. He knew he was different even in childhood. "My stepfather, when I couldn't sleep, told me to count sheep, and he explained what he meant, I tried to do it and I couldn't," he says. "I couldn't see any sheep jumping over fences, there was nothing to count."</p>

        <p class="mb-4">Our memories are often tied up in images, think back to a wedding or first day at school. As a result, Niel admits, some aspects of his memory are "terrible", but he is very good at remembering facts. And, like others with aphantasia, he struggles to recognise faces. Yet he does not see aphantasia as a disability, but simply a different way of experiencing life.</p>

        <h3 class="text-lg font-bold mb-3">Mind's eye blind</h3>

        <p class="mb-4">Ironically, Niel now works in a bookshop, although he largely sticks to the non-fiction aisles. His condition begs the question what is going on inside his picture-less mind. I asked him what happens when he tries to picture his fiancee. "This is the hardest thing to describe, what happens in my head when I think about things," he says. "When I think about my fiancee there is no image, but I am definitely thinking about her, I know today she has her hair up at the back, she's brunette. But I'm not describing an image I am looking at, I'm remembering features about her, that's the strangest thing and maybe that is a source of some regret."</p>

        <p class="mb-4">The response from his mates is a very sympathetic: "You're weird." But while Niel is very relaxed about his inability to picture things, it is often a cause of distress for others. One person who took part in a study into aphantasia said he had started to feel "isolated" and "alone" after discovering that other people could see images in their heads. Being unable to reminisce about his mother years after her death led to him being "extremely distraught".</p>

        <h3 class="text-lg font-bold mb-3">The super-visualiser</h3>

        <p class="mb-4">At the other end of the spectrum is children's book illustrator, Lauren Beard, whose work on the Fairytale Hairdresser series will be familiar to many six-year-olds. Her career relies on the vivid images that leap into her mind's eye when she reads text from her author. When I met her in her box-room studio in Manchester, she was working on a dramatic scene in the next book. The text describes a baby perilously climbing onto a chandelier.</p>

        <p class="mb-4">"Straightaway I can visualise this grand glass chandelier in some sort of French kind of ballroom, and the little baby just swinging off it and really heavy thick curtains," she says. "I think I have a strong imagination, so I can create the world and then keep adding to it so it gets sort of bigger and bigger in my mind and the characters too they sort of evolve. I couldn't really imagine what it's like to not imagine, I think it must be a bit of a shame really."</p>

        <p class="mb-4">Not many people have mental imagery as vibrant as Lauren or as blank as Niel. They are the two extremes of visualisation. Adam Zeman, a professor of cognitive and behavioural neurology, wants to compare the lives and experiences of people with aphantasia and its polar-opposite hyperphantasia. His team, based at the University of Exeter, coined the term aphantasia this year in a study in the journal Cortex. Prof Zeman tells the BBC: "People who have contacted us say they are really delighted that this has been recognised and has been given a name, because they have been trying to explain to people for years that there is this oddity that they find hard to convey to others." How we imagine is clearly very subjective - one person's vivid scene could be another's grainy picture. But Prof Zeman is certain that aphantasia is real. People often report being able to dream in pictures, and there have been reported cases of people losing the ability to think in images after a brain injury.</p>

        <p class="mb-4">He is adamant that aphantasia is "not a disorder" and says it may affect up to one in 50 people. But he adds: "I think it makes quite an important difference to their experience of life because many of us spend our lives with imagery hovering somewhere in the mind's eye which we inspect from time to time, it's a variability of human experience."</p>
        `,
        questions: [
            // --- True / False / Not Given (1-8) ---
            { id: 1, type: "true-false", text: "Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (unable)
            { id: 2, type: "true-false", text: "Niel Kenmuir was unable to count sheep in his head.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 3, type: "true-false", text: "People with aphantasia struggle to remember personal traits and clothes of different people.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (Niel remembers)
            { id: 4, type: "true-false", text: "Niel regrets that he cannot portray an image of his fiancee in his mind.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 5, type: "true-false", text: "Inability to picture things in someone's head is often a cause of distress for a person.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 6, type: "true-false", text: "All people with aphantasia start to feel 'isolated' or 'alone' at some point of their lives.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (only "one person")
            { id: 7, type: "true-false", text: "Lauren Beard's career depends on her imagination.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 8, type: "true-false", text: "The author met Lauren Beard when she was working on a comedy scene in her next book.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE (dramatic scene)

            // --- Sentence Completion (9-13) ---
            { id: 9, type: "fill-blank", text: "Only a small fraction of people have imagination as 9 _____ as Lauren does.", correctAnswer: "vibrant" },
            { id: 10, type: "fill-blank", text: "Hyperphantasia is 10 _____ to aphantasia.", correctAnswer: "polar-opposite" },
            { id: 11, type: "fill-blank", text: "There are a lot of subjectivity in comparing people's imagination - somebody's vivid scene could be another person's 11 _____.", correctAnswer: "grainy picture" },
            { id: 12, type: "fill-blank", text: "Prof Zeman is 12 _____ that aphantasia is not an illness.", correctAnswer: "adamant" },
            { id: 13, type: "fill-blank", text: "Many people spend their lives with 13 _____ somewhere in the mind's eye.", correctAnswer: "imagery" },
        ]
    },
    "fp-17": {
        id: "fp-17",
        title: "Australian artist Margaret Preston",
        content: `
        <h2 class="text-xl font-bold mb-4">Australian artist Margaret Preston</h2>
        <p class="mb-4"><em>Margaret Preston's vibrant paintings and prints of Australian flowers, animals and landscapes have delighted the Australian public since the early 1920s.</em></p>
        
        <p class="mb-4">Margaret Preston was born Margaret Rose McPherson in Port Adelaide, South Australia in 1875, the daughter of David McPherson, a Scottish marine engineer and his wife Prudence Lyle. She and her sister were sent at first to a private school, but when family circumstances changed, her mother took the girls to Sydney where Margaret attended a public high school. She decided early in life to become an artist and took private art lessons. In 1888, she trained for several months with Sydney landscape painter William Lister, and in 1893 enrolled at the National Gallery of Victoria Art School, where she studied for just over four years.</p>

        <p class="mb-4">In 1898, after her father died, Margaret returned to Adelaide to study and then teach at the Adelaide School of Design. Her early artwork was influenced by the German aesthetic tradition, in which subjects of the natural world were depicted in a true to life manner.</p>

        <p class="mb-4">Margaret's first visit to Europe in 1904, and her studies in Paris, France had little impact on this naturalism that dominated her work from this early period. However some eight years later, after returning to Paris, she began to recognise the decorative possibilities of art.</p>

        <p class="mb-4">With the outbreak of the First World War, Margaret traveled to England, where she had exhibitions and continued her studies of art. She was a student of pottery, but at some time developed her interest in various techniques of printmaking and design. In England's West Country, she taught basket weaving at a rehabilitation unit for servicemen. It was on board a boat returning to Australia that she met wealthy businessman William Preston, whom she married in 1919. Together Margaret and William settled in the Sydney harbourside suburb of Mosman. The most characteristic prints from her early years in Sydney are views of boats floating on Sydney Harbour and of houses clustered on foreshore hills. Although Sydney was their home, the couple traveled regularly, both overseas and within Australia.</p>

        <p class="mb-4">Her first major showing in Australia was with her friend Thea Proctor, in exhibitions in Melbourne and Sydney in 1925. Many of Preston's prints were hand-coloured in rich scarlet reds, blues and greens, and all of them were set in Chinese red lacquer frames. Harbour views were again prominent, but in comparison with earlier artworks, they were compact and busy. using striking contrasts of black and white combined with elaborate patterns and repetitions. Other prints from this period featured native flora. It was with these still-life subjects that she convinced the public that Australian native flowers were equal in beauty to any exotic species.</p>

        <p class="mb-4">From 1932 to 1939, Preston moved away from Sydney and lived with her husband at Berowra, on the upper reaches of the Hawkesbury River. The area was one of rugged natural beauty, and for the first time Preston found herself living in a home surrounded bush. Prior to this, the native flowers that featured in her paintings and prints had been purchased from local florists; they now grew in abundance around her home. Preston's prints became larger, less complex and less reliant on the use of bright colours. Flowers were no longer arranged in vases, and Preston began to concentrate instead on flowers that were growing wild.</p>

        <p class="mb-4">While living at Berowra, and undoubtedly prompted by the Aboriginal' rock engravings found near her property, Preston also developed what was to he a lifelong interest in Aboriginal art. On returning to Sydney in 1939, she became a member of the Anthropological Society of New South Wales, and later visited many important Aboriginal sites throughout Australia. Preston believed that Aboriginal art provided the key to establishing a national body of art that reflected the vast and ancient continent of Australia.</p>

        <p class="mb-4">During the 1940s, symbols used by Aboriginal people, together with dried, burnt colours found in traditional Aboriginal paintings, became increasingly prominent in her prints. The artist's titles from this period frequently acknowledge her sources, and reveal the extent to which she drew inspiration from traditional Aboriginal art to create her own art.</p>

        <p class="mb-4">It was in 1953, at the age of 78, that Preston produced her most significant prints. The exhibition at Macquarie Galleries in Sydney included 29 prints made using the ancient technique known as stenciling. Many of the artworks in the exhibition incorporated her fusion of Aboriginal and Chinese concepts. Preston had admired Chinese art since 1915, when she acquired the first of her many books on the subject, and she had visited China on two occasions. Chinese elements may be found in several of her earlier paintings.</p>

        <p class="mb-4">However, in her prints of the 1950s, Preston combined Chinese ideas with her understanding of the Dreamtime' creation stories of Aboriginal Australians. Preston did not let age alter her habit of working hard. As she got older, her love of painting, printmaking and travel continued. By the time of her death in 1963, when she was 88, she had produced over 400 paintings and prints. In a career spanning almost 60 years, she created a body of work that demonstrates her extraordinary originality and the intensity of her commitment to Australian art.</p>
        `,
        questions: [
            // --- True / False / Not Given (1-7) ---
            { id: 1, type: "true-false", text: "Artists in the German aesthetic tradition portrayed nature realistically.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 2, type: "true-false", text: "Margaret attended a famous art college in Paris.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 3, type: "true-false", text: "Margaret met her husband William while teaching a craft at a rehabilitation unit.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 4, type: "true-false", text: "Margaret Preston and Thea Proctor explored similar themes in their art.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 5, type: "true-false", text: "Margaret's 1925 artworks of Sydney Harbour were simpler than her previous ones.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 6, type: "true-false", text: "The colours in Margaret's Berowra prints were very bright.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 7, type: "true-false", text: "When living in Berowra, Margaret painted flowers in their natural location.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE

            // --- Notes Completion (8-13) ---
            { id: 8, type: "fill-blank", text: "incorporated 8 _____ and colours from Aboriginal art in her own work", correctAnswer: "symbols" },
            { id: 9, type: "fill-blank", text: "often referred to Aboriginal sources in the 9 _____ she gave her artworks", correctAnswer: "titles" },
            { id: 10, type: "fill-blank", text: "very old method of 10 _____ was used for some prints", correctAnswer: "stenciling" },
            { id: 11, type: "fill-blank", text: "was inspired by 11 _____ about Chinese art that she had started collecting in 1915", correctAnswer: "books" },
            { id: 12, type: "fill-blank", text: "still interested in 12 _____ and art", correctAnswer: "travel" },
            { id: 13, type: "fill-blank", text: "worked for nearly six decades making more than 13 _____ artworks", correctAnswer: "400" },
        ]
    }
};





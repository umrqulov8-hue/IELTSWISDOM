import { mockReadingTest1 } from "./mockTest1";
import { mockReadingTest2 } from "./mockTest2";
import { southPoleAdventurerData } from "./southPoleAdventurer";

export interface Question {
    id: number;
    type: "multiple-choice" | "true-false" | "fill-blank" | "matching";
    text: string;
    options?: string[];
    correctAnswer: string | number;
    image?: string;
}

export interface Passage {
    id: string;
    title: string;
    content: string;
    questionRange: { start: number; end: number };
}

export interface ReadingTest {
    id: string;
    title: string;
    content?: string;
    passages?: Passage[];
    questions: Question[];
    timeLimit?: number; // in seconds
}

export const READING_TESTS: Record<string, ReadingTest> = {
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
            { id: 5, type: "true-false", text: "Margaret's 1925 artworks of Sydney Harbour were simpler than her previous ones.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 6, type: "true-false", text: "The colours in Margaret's Berowra prints were very bright.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 7, type: "true-false", text: "When living in Berowra, Margaret painted flowers in their natural location.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE

            // --- Notes Completion (8-13) ---
            { id: 8, type: "fill-blank", text: "incorporated 8 _____ and colours from Aboriginal art in her own work", correctAnswer: "symbols" },
            { id: 9, type: "fill-blank", text: "often referred to Aboriginal sources in the 9 _____ she gave her artworks", correctAnswer: "titles" },
            { id: 10, type: "fill-blank", text: "very old method of 10 _____ was used for some prints", correctAnswer: "stenciling" },
            { id: 11, type: "fill-blank", text: "was inspired by 11 _____ about Chinese art that she had started collecting in 1915", correctAnswer: "books" },
            { id: 12, type: "fill-blank", text: "still interested in 12 _____ and art", correctAnswer: "painting" },
            { id: 13, type: "fill-blank", text: "worked for nearly six decades making more than 13 _____ artworks", correctAnswer: "400" },
        ]
    },
    "fp-18": {
        id: "fp-18",
        title: "Life lessons from villains, crooks and gangsters",
        content: `
        <h2 class="text-xl font-bold mb-4">Life lessons from villains, crooks and gangsters</h2>
        
        <p class="mb-4"><strong>(A)</strong> A notorious Mexican drug baron’s audacious escape from prison in July doesn’t, at first, appear to have much to teach corporate boards. But some in the business world suggest otherwise. Beyond the morally reprehensible side of criminals' work, some business gurus say organised crime syndicates, computer hackers, pirates and others operating outside the law could teach legitimate corporations a thing or two about how to hustle and respond to rapid change.</p>

        <p class="mb-4"><strong>(B)</strong> Far from encouraging illegality, these gurus argue that – in the same way big corporations sometimes emulate start-ups – business leaders could learn from the underworld about flexibility, innovation and the ability to pivot quickly. “There is a nimbleness to criminal organisations that legacy corporations [with large, complex layers of management] don’t have,” said Marc Goodman, head of the Future Crimes Institute and global cyber-crime advisor. While traditional businesses focus on rules they have to follow, criminals look to circumvent them. “For criminals, the sky is the limit and that creates the opportunity to think much, much bigger.”</p>

        <p class="mb-4"><strong>(C)</strong> Joaquin Guzman, the head of the Mexican Sinaloa drug cartel, for instance, slipped out of his prison cell through a tiny hole in his shower that led to a mile-long tunnel fitted with lights and ventilation. Making a break for it required creative thinking, long-term planning and perseverance – essential skills similar to those needed to achieve success in big business.</p>

        <p class="mb-4"><strong>(D)</strong> While Devin Liddell, who heads brand strategy for Seattle-based design consultancy, Teague, condemns the violence and other illegal activities he became curious as to how criminal groups endure. Some cartels stay in business despite multiple efforts by law enforcement on both sides of the US border and millions of dollars from international agencies to shut them down. Liddell genuinely believes there’s a lesson in longevity here. One strategy he underlined was how the bad guys respond to change. In order to bypass the border between Mexico and the US, for example, the Sinaloa cartel went to great lengths. It built a vast underground tunnel, hired family members as border agents and even used a catapult to circumvent a high-tech fence.</p>

        <p class="mb-4"><strong>(E)</strong> By contrast, many legitimate businesses fail because they hesitate to adapt quickly to changing market winds. One high-profile example is movie and game rental company Blockbuster, which didn’t keep up with the market and lost business to mail order video rentals and streaming technologies. The brand has all but faded from view. Liddell argues the difference between the two groups is that criminal organisations often have improvisation encoded into their daily behaviour, while larger companies think of innovation as a set process. “This is a leadership challenge,” said Liddell. “How well companies innovate and organise is a reflection of leadership.”</p>

        <h3 class="text-lg font-bold mb-3">Left-field thinking</h3>

        <p class="mb-4"><strong>(F)</strong> Cash-strapped start-ups also use unorthodox strategies to problem solve and build their businesses up from scratch. This creativity and innovation is often borne out of necessity, such as tight budgets. Both criminals and start-up founders “question authority, act outside the system and see new and clever ways of doing things,” said Goodman. “Either they become Elon Musk or El Chapo.” And, some entrepreneurs aren’t even afraid to operate in legal grey areas in their effort to disrupt the marketplace. The co-founders of music streaming service Napster, for example, knowingly broke music copyright rules with their first online file sharing service, but their technology paved the way for legal innovation as regulators caught up.</p>

        <p class="mb-4"><strong>(G)</strong> Goodman and others believe thinking hard about problem solving before worrying about restrictions could prevent established companies falling victim to rivals less constrained by tradition. In their book The Misfit Economy, Alexa Clay and Kyra Maya Phillips examine how individuals can apply that mindset to become more innovative and entrepreneurial within corporate structures. They studied not just violent criminals like Somali pirates, but others who break the rules in order to find creative solutions to their business problems, such as people living in the slums of Mumbai or computer hackers. They picked out five common traits among this group: the ability to hustle, pivot, provoke, hack and copycat.</p>

        <p class="mb-4"><strong>(H)</strong> Clay gives a Saudi entrepreneur named Walid Abdul-Wahab as a prime example. Abdul-Wahab worked with Amish farmers to bring camel milk to American consumers even before US regulators approved it. Through perseverance, he eventually found a network of Amish camel milk farmers and started selling the product via social media. Now his company, Desert Farms, sells to giant mainstream retailers like Whole Foods Market. Those on the fringe don’t always have the option of traditional, corporate jobs and that forces them to think more creatively about how to make a living, Clay said. They must develop grit and resilience in order to last outside the cushy confines of cubicle life. “In many cases scarcity is the mother of invention,” Clay said.</p>
        `,
        questions: [
            // --- Matching Headings (14-21) ---
            { id: 14, type: "multiple-choice", text: "Jailbreak with creative thinking", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 2 },
            { id: 15, type: "multiple-choice", text: "Five common traits among rule-breakers", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 6 },
            { id: 16, type: "multiple-choice", text: "Comparison between criminals and traditional businessmen", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 1 },
            { id: 17, type: "multiple-choice", text: "Can drug baron's escape teach legitimate corporations?", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 0 },
            { id: 18, type: "multiple-choice", text: "Great entrepreneur", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 7 },
            { id: 19, type: "multiple-choice", text: "How criminal groups deceive the law", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 3 },
            { id: 20, type: "multiple-choice", text: "The difference between legal and illegal organisations", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 4 },
            { id: 21, type: "multiple-choice", text: "Similarity between criminals and start-up founders", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 5 },

            // --- Sentence Completion (22-25) ---
            { id: 22, type: "fill-blank", text: "To escape from a prison, Joaquin Guzman had to use such traits as creative thinking, long-term planning and 22 _____.", correctAnswer: "perseverance" },
            { id: 23, type: "fill-blank", text: "The Sinaloa cartel built a grand underground tunnel and even used a 23 _____ to avoid the fence.", correctAnswer: "catapult" },
            { id: 24, type: "fill-blank", text: "The main difference between two groups is that criminals, unlike large corporations, often have 24 _____ encoded into their daily life.", correctAnswer: "improvisation" },
            { id: 25, type: "fill-blank", text: "Due to being persuasive, Walid Abdul-Wahab found a 25 _____ of Amish camel milk farmers.", correctAnswer: "network" },

            // --- Multiple Choice (26) ---
            { id: 26, type: "multiple-choice", text: "The main goal of this article is to:", options: ["Show different ways of illegal activity", "Give an overview of various criminals and their gangs", "Draw a comparison between legal and illegal business, providing examples", "Justify criminals with creative thinking"], correctAnswer: 2 },
        ]
    },
    "fp-19": {
        id: "fp-19",
        title: "Fear of the Unknown",
        content: `
        <h2 class="text-xl font-bold mb-4">Fear of the Unknown</h2>
        <p class="mb-4"><em>American companies fear that innovation is the secret of success-and that they cannot innovate</em></p>
        
        <p class="mb-4"><strong>(A)</strong> In the small Umagic office in midtown Manhattan, a team of 30 computer programmers are working on setting up websites that will allow subscribers to feed in details about themselves and their problems and to receive advice from ‘virtual’ versions of personalities regarded as experts in their fields: for example, a well-known dietician, a celebrity fitness trainer, a psychologist well known in the media for here work on parent-child relationships. Umagic Systems is a young firm and it’s hard to predict how far they’ll go. In ten years’ time, consulting a computer about your diet problems might seem natural or it might seem absurd. But the company and others like it are beginning to seriously worry large American firms, who see such half-crazy new and innovative ideas as a threat to their own future success.</p>

        <p class="mb-4"><strong>(B)</strong> Innovation has become a major concern of American management. Firms have found that it is increasingly difficult to redesign existing products or to produce them more economically. The stars of American business tend today to be innovators such as Amazon (the internet bookstore) and Wal-Mart (the supermarket chain) which have produced completely new ideas or products that have changed their industries.</p>

        <p class="mb-4"><strong>(C)</strong> Over the past 15 years, the firms which have achieved the greatest profits have been the ones which have had the most innovations. But such profits aren’t easy to come by. One of the reasons for the increasing number of mergers between companies is a desperate search for new ideas. And a fortune is spent nowadays on identifying and protecting intellectual property: other people’s ideas.</p>

        <p class="mb-4"><strong>(D)</strong> According to the Pasadena-based Patent & License Exchange in the United States, trading in intangible assets such as intellectual property rose from $15 billion in 1990 to $100 billion in 1998, with an increasing proportion of the rewards going to small firms and individuals.</p>

        <p class="mb-4"><strong>(E)</strong> And therein lies the terror for big companies: that innovation seems to work best outside them. Many of the large established companies have been struggling to come up with new products recently. 'In the management of creativity, size is your enemy,’ argues Peter Chemin, who runs Fox TV and film empire for News Corporation. "One person managing 20 movies is never going to be as involved as one doing five movies.' He has thus tried to break down the studio into smaller units, even at the risk of incurring higher costs.</p>

        <p class="mb-4"><strong>(F)</strong> It is easier for ideas to develop outside big firms these days. In the past, if a clever scientist had an idea he wanted to commercialise, he would take it first to a big company. Now, with the banks encouraging individuals to set up new businesses through offering special loans, innovators are more likely to set up on their own. Umagic has already raised $5 million and is about to raise $25 million more. Even in capital-intensive businesses such as pharmaceuticals, entrepreneurs can conduct profitable, early-stage research, selling out to the big firms when they reach expensive, risky clinical trials.</p>

        <p class="mb-4"><strong>(G)</strong> Some giants, including General Electric and Cisco, have been remarkably successful at buying up and integrating scores of small companies. But many others worry about the prices they have to pay and the difficulty in keeping hold of the people who dreamt up the ideas. Everybody would like to develop more ideas in-house. Procter & Gamble is now changing the entire direction of its business from global expansion to product development; one of its new aims is to get innovations accepted across the company. Elsewhere, the search for innovation had led to a craze for 'intrapreneurship' - giving more power to individuals in the company and setting up internal ideas-factories so that talents staff will not leave.</p>

        <p class="mb-4"><strong>(H)</strong> And yet innovation does not happen just because the chief executive wills it. Indeed, it is extremely difficult to come up with new ideas year in, year out, especially brilliant ones. Underneath all experts' diagrams, lists and charts, most of the available answers seem to focus on two strengths that are difficult to impose: a culture that looks for new ideas, and leaders who know which ones to back. Companies have to discredit the widespread view that jobs working on new products are for ‘those who can't cope in the real business'. They have to change the culture by introducing hard incentives, such as giving more generous bonuses to those who come up with successful new ideas and, particularly, not punishing those whose experiments fail.</p>

        <p class="mb-4"><strong>(I)</strong> Will all this reorganization and culture tweaking make big firms more creative? David Post, the founder of Umagic, isn't so sure: He also recalls with glee the looks of total incomprehension when he tried to sell his 'virtual experts' idea three years ago to firms such IBM, though, as he cheerfully adds, ’of course, they could have been right'. Apparently, innovation - unlike diet, fitness and parenting - is one area where a computer cannot tell you what to do.</p>
        `,
        questions: [
            // --- Matching Information (1-7) ---
            { id: 1, type: "multiple-choice", text: "the methods some companies use to try to keep their most creative employees", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 5 }, // F (Based on user answer table)
            { id: 2, type: "multiple-choice", text: "a new way of getting help with your personal difficulties", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 0 }, // A
            { id: 3, type: "multiple-choice", text: "how much investment goes into safeguarding the ideas of individuals", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 2 }, // C
            { id: 4, type: "multiple-choice", text: "two examples of companies which have succeeded through being innovative", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 1 }, // B
            { id: 5, type: "multiple-choice", text: "how some innovators manage to avoid spending large sums of money on testing out their ideas", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 4 }, // E
            { id: 6, type: "multiple-choice", text: "a commonly held opinion about product designers that needs to be proved wrong", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 6 }, // G
            { id: 7, type: "multiple-choice", text: "the target of one large company that has changed its business focus", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: 5 }, // F

            // --- True / False / Not Given (8-11) ---
            { id: 8, type: "true-false", text: "Umagic Systems is an example of a new innovative company.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE
            { id: 9, type: "true-false", text: "Amazon and Wal-Mart have exchanged successful ideas on innovation.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 }, // NOT GIVEN
            { id: 10, type: "true-false", text: "Using financial rewards to encourage innovation is an outdated practice.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 }, // FALSE
            { id: 11, type: "true-false", text: "IBM failed to understand David Post's 'virtual experts’ idea.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 }, // TRUE

            // --- Multiple Choice (12-14) ---
            { id: 12, type: "multiple-choice", text: "What point does the writer make about intellectual property?", options: ["It can be lost when firms merge.", "It tends to belong to companies rather than individuals.", "It is valued more than it used to be.", "It is not usually owned by small companies."], correctAnswer: 2 }, // C
            { id: 13, type: "multiple-choice", text: "Peter Chemin is an example of someone who has realized that", options: ["large companies are less innovative than small ones.", "other businesses are more innovative than the film business,", "his employees need more experience of innovation.", "he is the best person to encourage innovation."], correctAnswer: 0 }, // A
            { id: 14, type: "multiple-choice", text: "In conclusion, the writer suggests that", options: ["computer-based industries cannot be innovative.", "big firms are right to be cautious about innovation,", "small firms should not worry about early failures.", "innovation will always involve some uncertainty."], correctAnswer: 3 }, // D
        ]
    },
    "fp-20": {
        id: "fp-20",
        title: "Britain needs strong TV industry",
        content: `
        <h2 class="text-xl font-bold mb-4">Britain needs strong TV industry</h2>
        <p class="mb-4">Comedy writer Armando Iannucci has called for an industry-wide defence of the BBC and British programme-makers. "The Thick of It" creator made his remarks in the annual MacTaggart Lecture at the Edinburgh TV Festival.</p>

        <p class="mb-4">"It's more important than ever that we have more strong, popular channels... that act as beacons, drawing audiences to the best content," he said. Speaking earlier, Culture Secretary John Whittingdale rejected suggestions that he wanted to dismantle the BBC.</p>

        <h3 class="text-lg font-bold mb-3">'Champion supporters'</h3>
        
        <p class="mb-4">Iannucci co-wrote "I'm Alan Partridge", wrote the movie "In the Loop" and created and wrote the hit "HBO" and "Sky Atlantic show Veep". He delivered the 40th annual MacTaggart Lecture, which has previously been given by Oscar winner Kevin Spacey, former BBC director general Greg Dyke, Jeremy Paxman and Rupert Murdoch. Iannucci said: "Faced with a global audience, British television needs its champion supporters."</p>

        <p class="mb-4">He continued his praise for British programming by saying the global success of American TV shows had come about because they were emulating British television. "The best US shows are modelling themselves on what used to make British TV so world-beating," he said. "US prime-time schedules are now littered with those quirky formats from the UK - the "Who Do You Think You Are"'s and the variants on "Strictly Come Dancing" - as well as the single-camera non-audience sitcom, which we brought into the mainstream first. We have changed international viewing for the better."</p>

        <p class="mb-4">With the renewal of the BBC's royal charter approaching, Iannucci also praised the corporation. He said: "If public service broadcasting - one of the best things we've ever done creatively as a country - if it was a car industry, our ministers would be out championing it overseas, trying to win contracts, boasting of the British jobs that would bring." In July, the government issued a green paper setting out issues that will be explored during negotiations over the future of the BBC, including the broadcaster's size, its funding and governance.</p>

        <p class="mb-4">Primarily Mr Whittingdale wanted to appoint a panel of five people, but finally he invited two more people to advise on the channer renewal, namely former Channel 4 boss Dawn Airey and journalism professor Stewart Purvis, a former editor-in-chief of ITN. Iannucci bemoaned the lack of "creatives" involved in the discussions.</p>

        <p class="mb-4">"When the media, communications and information industries make up nearly 8% our GDP, larger than the car and oil and gas industries put together, we need to be heard, as those industries are heard. But when I see the panel of experts who've been asked by the culture secretary to take a root and branch look at the BBC, I don't see anyone who is a part of that cast and crew list. I see executives, media owners, industry gurus, all talented people - but not a single person who's made a classic and enduring television show."</p>

        <h3 class="text-lg font-bold mb-3">'Don't be modest'</h3>

        <p class="mb-4">Iannucci suggested one way of easing the strain on the licence fee was "by pushing ourselves more commercially abroad".</p>

        <p class="mb-4">"Use the BBC's name, one of the most recognised brands in the world," he said. "And use the reputation of British television across all networks, to capitalise financially oversees. Be more aggressive in selling our shows, through advertising, through proper international subscription channels, freeing up BBC Worldwide to be fully commercial, whatever it takes.</p>

        <p class="mb-4">"Frankly, don't be icky and modest about making money, let's monetise the bezeesus Mary and Joseph out of our programmes abroad so that money can come back, take some pressure off the licence fee at home and be invested in even more ambitious quality shows, that can only add to our value."</p>

        <p class="mb-4">Mr Whittingdale, who was interviewed by ITV News' Alastair Stewart at the festival, said he wanted an open debate about whether the corporation should do everything it has done in the past. He said he had a slight sense that people who rushed to defend the BBC were "trying to have an argument that's never been started". "Whatever my view is, I don't determine what programmes the BBC should show," he added. "That's the job of the BBC." Mr Whittingdale said any speculation that the Conservative Party had always wanted to change the BBC due to issues such as its editorial line was "absolute nonsense".</p>
        `,
        questions: [
            // --- True / False / Not Given (27-31) ---
            { id: 27, type: "true-false", text: "Armando Iannucci expressed a need of having more popular channels.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 28, type: "true-false", text: "John Whittingdale wanted to dismantle the BBC.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 29, type: "true-false", text: "Iannucci delivered the 30th annual MacTaggart Lecture.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 30, type: "true-false", text: "Ianucci believes that British television has contributed to the success of American TV-shows.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 31, type: "true-false", text: "There have been negotiations over the future of the BBC in July.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },

            // --- Multiple Choice (32-35) ---
            { id: 32, type: "multiple-choice", text: "Ianucci praised everything EXCEPT", options: ["US shows", "British shows", "Corporation", "British programming"], correctAnswer: 0 },
            { id: 33, type: "multiple-choice", text: "To advise on the charter renewal Mr Whittingdale appointed a panel of", options: ["five people", "two people", "seven people", "four people"], correctAnswer: 2 },
            { id: 34, type: "multiple-choice", text: "Who of these people was NOT invited to the discussion concerning BBC renewal?", options: ["Armando Iannucci", "Dawn Airey", "John Whittingdale", "Stewart Purvis"], correctAnswer: 0 },
            { id: 35, type: "multiple-choice", text: "The panel of experts lacks:", options: ["media owners", "people who make enduring TV-shows", "gurus of Television industry", "top executives"], correctAnswer: 1 },

            // --- Summary Completion (36-40) ---
            { id: 36, type: "fill-blank", text: "Iannucci recommended increasing BBC's profit by pushing ourselves more 36 _____.", correctAnswer: "commercially" },
            { id: 37, type: "fill-blank", text: "He suggests being more aggressive in selling British shows, through advertising and proper international 37 _____.", correctAnswer: "subscription channels" },
            { id: 38, type: "fill-blank", text: "Also, he invokes producers to stop being 38 _____ and modest about making money", correctAnswer: "icky" },
            { id: 39, type: "fill-blank", text: "and invest into even 39 _____ quality shows.", correctAnswer: "ambitious" },
            { id: 40, type: "fill-blank", text: "However, Mr Whittingdale denied any 40 _____ that the Conservative Party had always wanted to change the BBC because of its editorial line.", correctAnswer: "speculation" },
        ]
    },
    "fp-21": {
        id: "fp-21",
        title: "How to find your way out of a food desert",
        content: `
        <h2 class="text-xl font-bold mb-4">How to find your way out of a food desert</h2>
        <p class="mb-4"><em>Ordinary citizens have been using the internet to draw attention to the lack of healthy eating options in inner cities</em></p>
        
        <p class="mb-4">Over the last few months, a survey has been carried out of over 200 greengrocers and convenience stores in Crown Heights, a neighborhood in Brooklyn, New York. As researchers from the Brooklyn Food Association enter the details, colorful dots appear on their online map, which display the specific location of each of the food stores in a handful of central Brooklyn neighborhoods. Clicking on a dot will show you the store's name and whether it carries fresh fruit and vegetables, wholegrain bread, low-fat dairy and other healthy options.</p>

        <p class="mb-4">The researchers plan eventually to survey the entire borough of Brooklyn. ‘We want to get to a more specific and detailed description of what that looks like’, says Jeffrey Heehs, who leads the project. He hopes it will help residents find fresh food in urban areas where the stores sell mostly packaged snacks or fast food, areas otherwise known as food deserts. The aim of the project is also to assist government officials in assessing food availability, and in forming future policies about what kind of food should be sold and where.</p>

        <p class="mb-4">In fact, the Brooklyn project represents the intersection of two growing trends: mapping fresh food markets in US cities, and private citizens creating online maps of local neighborhood features. According to Michael Goodchild, a geographer at the University of California at Santa Barbara, citizen map makers may make maps because there is no good government map, or to record problems such as burned-out traffic lights.</p>

        <p class="mb-4">According to recent studies, people at higher risk of chronic disease and who receive minimal incomes for the work they do, frequently live in neighborhoods located in food deserts. But how did these food deserts arise? Linda Alwitt and Thomas Donley, marketing researchers at DePaul University in Chicago, found that supermarkets often can’t afford the amount of land required for their stores in cities. City planning researcher Cliff Guy and colleagues at the University of Leeds in the UK found in 2004 that smaller urban groceries tend to close due to competition from suburban supermarkets.</p>

        <p class="mb-4">As fresh food stores leave a neighborhood, residents find it harder to eat well and stay healthy. Food deserts are linked with lower local health outcomes, and they may be a driving force in the health disparities between lower-income and affluent people in the US. Until recently, the issue attracted little national attention, and received no ongoing funding for research.</p>

        <p class="mb-4">Now, more US cities are becoming aware of their food landscapes. Last year, the United States Department of Agriculture launched a map of where food stores are located in all the US counties. Mari Gallagher, who runs a private consulting firm, says her researchers have mapped food stores and related them to health statistics for the cities of Detroit, Chicago, Cincinnati and Washington, D.c. These maps help cities identify where food deserts are and, occasionally, have documented that people living in food deserts have higher rates of diet-related diseases.</p>

        <p class="mb-4">The Brooklyn project differs in that it’s run by a local core of five volunteers who have worked on the project for the past year, rather than trained, academic researchers. To gather data, they simply go to individual stores with pre-printed surveys in hand, and once the storekeeper's permission has been obtained, check off boxes on their list against the products for sole in the store. Their approach to data collection and research has been made possible by technologies such as mapping software and GPS-related smart phones, Google Maps and OpenStreeMap, an open-source online map with a history of involvement in social issues. Like Brooklyn Food Association volunteers, many citizen online map makers use maps to bring local problems to official attention, Goodchild says. Heehs, the mapping project leader, says that after his group gathers more data, it will compare neighborhoods, come up with solutions to address local needs, and then present them to New York City officials. Their website hasn’t caught them much local or official attention yet, however. It was launched only recently, but its creators haven’t yet set up systems to see who’s looking at it.</p>

        <p class="mb-4">Experts who visited the Brooklyn group’s site were optimistic but cautious. ‘This kind of detailed information could be very useful’ says Michele Ver Ploeg, an economist for the Department of Agriculture. To make the map more helpful to both residents and policy makers, she would like to see price data for healthy products, too. Karen Ansel, a registered dietician and a spokesperson for the American Dietetic Association, found the site confusing to navigate. ‘That said, with this information in place the group has the tools to build a more user-friendly site that could be ... very helpful to consumers’, she says. ‘The group also should ensure their map is available to those who don’t have internet access at home’, she adds. In fact, a significant proportion of Brooklyn residents don’t have internet access at home and 8 percent rely on dial-up service, instead of high-speed internet access, according to Gretchen Maneval, director of Brooklyn College’s Center for the study of Brooklyn. ‘It’s still very much a work in progress’, Heehs says of the online map. They’ll start advertising it online and by email to other community groups, such as urban food garden associations, next month. He also hopes warmer days in the spring will draw out fresh volunteers to spread awareness and to finish surveying, as they have about two-thirds of Brooklyn left to cover.</p>
        `,
        questions: [
            // --- Notes Completion (1-6) ---
            { id: 1, type: "fill-blank", text: "The online map provides users with a store’s name, 1 _____ and details of its produce", correctAnswer: "location" },
            { id: 2, type: "fill-blank", text: "One goal of the mapping project is to help develop new 2 _____ on food.", correctAnswer: "policies" },
            { id: 3, type: "fill-blank", text: "Citizen maps are sometimes made when 3 _____ maps are unsatisfactory.", correctAnswer: "government" },
            { id: 4, type: "fill-blank", text: "New research suggests that people living in food deserts often have low 4 _____.", correctAnswer: "incomes" },
            { id: 5, type: "fill-blank", text: "Some supermarkets are unable to buy enough 5 _____ inside cities for their stores", correctAnswer: "land" },
            { id: 6, type: "fill-blank", text: "Small grocery stores in cities often cannot cope with supermarket 6 _____.", correctAnswer: "suburban" },

            // --- True / False / Not Given (7-13) ---
            { id: 7, type: "true-false", text: "A group of professional researchers are in charge of the Brooklyn project.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 8, type: "true-false", text: "The Brooklyn project team carries out their assessment of stores without the owner’s knowledge", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 9, type: "true-false", text: "The Brooklyn project has experienced technical difficulties setting up the website", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
            { id: 10, type: "true-false", text: "The city government has taken a considerable interest in the Brooklyn project website", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 11, type: "true-false", text: "Michele Ver Ploeg believes the Brooklyn project website should contain additional information", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 12, type: "true-false", text: "The rate of internet use in Brooklyn is unlikely to increase in the near future", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
            { id: 13, type: "true-false", text: "Jeffrey Heehs would like more people to assist with the Brooklyn project research", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        ]
    },
    "fp-22": {
        id: "fp-22",
        title: "Insect decision-making",
        content: `
        <h2 class="text-xl font-bold mb-4">Insect decision-making</h2>
        
        <p class="mb-4"><strong>(A)</strong> It has long been held that decision made collectively by large groups of people are more likely to turn out to be accurate than decisions made by individuals. The idea goes back to the 'jury theorem’ of Nicolas de Condorcet, an 18th-century French philosopher who was one of the first to apply mathematics to the social sciences. Condorcet’s theory describes collective decisions, outlining how democratic decisions tend to outperform dictatorial ones. If, for example, each member of a jury has only partial information ,the majority decision is more likely to be correct than a decision arrived at by a single juror. Moreover, the probability of a correct decision increases with the size of the jury.</p>

        <p class="mb-4"><strong>(B)</strong> Now it is becoming clear that group decisions are also extremely valuable for the success of social animals, such as ants ,bees .birds and dolphins .Bees make collective decisions ,and they do it rather well, according to Christian List of the London School of Economics ,who has studied group decision-making in humans and animals. Researchers led by Dr List looked at colonies once the original colony reaches a certain size. The queen goes off with about two-thirds of the worker bees to live in a new home or nest, leaving a daughter queen in the old nest with the remaining workers. Among the bees that depart are some that have searched for and found some new nest sites, and reported back using a characteristic body movement known as a 'waggle dance' to indicate to the other bees the suitable places they have located. The longer the dance, the better the site. After a while, other bees start to visit the sites signaled by their companions to see for themselves and, on their return, also perform more waggle dances. The process eventually leads to a consensus on the best site and the breakaway swarm migrates. The decision is remarkably reliable ,with the bees choosing the best site even when there are only small difference between alternative sites.</p>

        <p class="mb-4"><strong>(C)</strong> But exactly how do bees reach such a robust consensus? To find out ,Dr List and his colleagues used a computer generated model of the decision-making process. By experimenting with it they found that, when bees in the model were very good at finding nesting sites but did not share their information, this dramatically slowed down the migration .leaving the swarm homelss and vulnerable .Conversely .bees in the model blindly following the waggle dances of others without first checking. The researchers concluded that the ability of bees to identify successfully and quickly the best site depends on both the bees ‘interdependence in communicating the whereabouts of the bees site, and their independence in confirming this information for themselves.</p>

        <p class="mb-4"><strong>(D)</strong> Another situation in which collective decisions are taken occurs when animals are either isolated from crucial sources of information or dominated by other members of the group. José Halloy of the Free University of Brussels in Belgium used robotic cockroaches to subvert the behaviour of living cockroaches and control their decision-making process. In his experiment, the artificial bugs were introduced to the live ones and soon became sufficiently socially integrated that they were perceived by the real cockroaches as equals. By manipulating the robots, which were in the minority, Halloy was able to persuade the living cockroaches to choose an inappropriate shelter-even one which they had rejected before being infiltrated by the robots.</p>

        <p class="mb-4"><strong>(E)</strong> The way insects put into effect collective decisions can be complex and as important as the decisions themselves .At the University of Bristol, in the UK, Nigel Franks and his colleagues studied how a species of ant establishes a new nest. Franks and his associates reported how the insects reduce the problems associated with making a necessarily swift choice. If the ants’ existing nest become suddenly threatened, the insects choose certain ants to act as scouts to find a new nest.</p>

        <p class="mb-4"><strong>(F)</strong> How quickly they accomplish the transfer to a new home depends not only on how soon the best available site is found, but also on how quickly the migration there can be achieved. Once the suitable new nest is identified , the chosen ants begin to lead others , which have made it to the new site or which may simply be in the vicinity, back to the original threatened nest. In this way, those ants which are familiar with the route can help transport ,for example ,the queen and young ants to the new site, and simultaneously show the way to those ants which have been left behind to guard the old nest. In this way moving processes are accomplished faster and more efficiently. Thus the dynamics of collective decision-making are closely related to the efficient implementation of those decisions .How this might apply to choices that humans make is , as yet,unclear. But it does suggest, even for humans ,the importance of recruiting dynamic leaders to a cause,because the most important thing about collective decision-making ,as shown by these insect experiments, is to get others to follow.</p>
        `,
        questions: [
            // --- Matching Headings (1-6) ---
            { id: 1, type: "multiple-choice", text: "Paragraph A", options: ["The effect of man-made imitations on insects", "The need to instruct additional insect guides", "Signals used by certain insects to indicate a discovery", "How urgency can affect the process of finding a new home", "The use of trained insects in testing scientific theories", "The use of virtual scenarios in the study of insect behaviour", "How the number of decision-makers affects the decision"], correctAnswer: 6 },
            { id: 2, type: "multiple-choice", text: "Paragraph B", options: ["The effect of man-made imitations on insects", "The need to instruct additional insect guides", "Signals used by certain insects to indicate a discovery", "How urgency can affect the process of finding a new home", "The use of trained insects in testing scientific theories", "The use of virtual scenarios in the study of insect behaviour", "How the number of decision-makers affects the decision"], correctAnswer: 2 },
            { id: 3, type: "multiple-choice", text: "Paragraph C", options: ["The effect of man-made imitations on insects", "The need to instruct additional insect guides", "Signals used by certain insects to indicate a discovery", "How urgency can affect the process of finding a new home", "The use of trained insects in testing scientific theories", "The use of virtual scenarios in the study of insect behaviour", "How the number of decision-makers affects the decision"], correctAnswer: 5 },
            { id: 4, type: "multiple-choice", text: "Paragraph D", options: ["The effect of man-made imitations on insects", "The need to instruct additional insect guides", "Signals used by certain insects to indicate a discovery", "How urgency can affect the process of finding a new home", "The use of trained insects in testing scientific theories", "The use of virtual scenarios in the study of insect behaviour", "How the number of decision-makers affects the decision"], correctAnswer: 0 },
            { id: 5, type: "multiple-choice", text: "Paragraph E", options: ["The effect of man-made imitations on insects", "The need to instruct additional insect guides", "Signals used by certain insects to indicate a discovery", "How urgency can affect the process of finding a new home", "The use of trained insects in testing scientific theories", "The use of virtual scenarios in the study of insect behaviour", "How the number of decision-makers affects the decision"], correctAnswer: 3 },
            { id: 6, type: "multiple-choice", text: "Paragraph F", options: ["The effect of man-made imitations on insects", "The need to instruct additional insect guides", "Signals used by certain insects to indicate a discovery", "How urgency can affect the process of finding a new home", "The use of trained insects in testing scientific theories", "The use of virtual scenarios in the study of insect behaviour", "How the number of decision-makers affects the decision"], correctAnswer: 1 },

            // --- Matching Academics (7-10) ---
            { id: 7, type: "multiple-choice", text: "Certain members can influence the rest of the group to alter a previous decision.", options: ["Nicolas de Condorcet", "Christian List and colleagues", "José Halloy", "Nigel Franks and colleagues"], correctAnswer: 2 },
            { id: 8, type: "multiple-choice", text: "Individual verification of a proposed choice is important for successful decision outcome.", options: ["Nicolas de Condorcet", "Christian List and colleagues", "José Halloy", "Nigel Franks and colleagues"], correctAnswer: 1 },
            { id: 9, type: "multiple-choice", text: "The more individuals taking part in a decision, the better the decision will be.", options: ["Nicolas de Condorcet", "Christian List and colleagues", "José Halloy", "Nigel Franks and colleagues"], correctAnswer: 0 },
            { id: 10, type: "multiple-choice", text: "The decision-making process of certain insects produces excellent results even when fine distinctions are required.", options: ["Nicolas de Condorcet", "Christian List and colleagues", "José Halloy", "Nigel Franks and colleagues"], correctAnswer: 1 },

            // --- Summary Completion (11-13) ---
            { id: 11, type: "fill-blank", text: "A study of insect decision-making: A Bristol University study looked at how insects make decisions when their home has been 11 _____.", correctAnswer: "threatened" },
            { id: 12, type: "fill-blank", text: "The ants in the experiment relied on the use of individuals called 12 _____ new nest and efficiently direct the others to go there.", correctAnswer: "scouts" },
            { id: 13, type: "fill-blank", text: "The study emphasized the necessity, for people well as insects, of having active 13 _____ in order to execute decisions successfully.", correctAnswer: "leaders" },
        ]
    },
    "fp-23": {
        id: "fp-23",
        title: "Why Do We Touch Strangers So Much? A History Of The Handshake Offers Clues",
        content: `
        <h2 class="text-xl font-bold mb-4">Why Do We Touch Strangers So Much? A History Of The Handshake Offers Clues</h2>
        <p class="mb-4"><em>For thousands of years, the handshake has been used for different purposes.</em></p>
        
        <p class="mb-4">There is a lot that can be conveyed in a handshake, a kiss, or a hug. Throughout history, such a greeting was used to signal friendship, finalize a business transaction, or indicate religious devotion. Touching strangers, however, can also transmit other, less beneficial shared outcomes—like disease outbreaks.</p>

        <p class="mb-4">As fears about COVID-19, or coronavirus, mount, France has warned its citizens to pause their famous cheek kisses, and across the world, business deals are being sealed with an elbow bump. But with histories tracing back thousands of years, both greetings are likely too entrenched to be so easily halted.</p>

        <p class="mb-4">A popular theory on the handshake’s origin is that it began as a gesture of peace. Grasping hands proved one was not holding a weapon—and shaking them was a way to ensure a partner had nothing hiding up their sleeve. So far, there has not been any reliable evidence to prove this assumption. Throughout the ancient world, the handshake appears on vases, gravestones, and stone slabs in scenes of weddings, gods making deals, young warriors departing for war, and the newly dead’s arrival to the afterlife. In the literary canon, it stretches to the Iliad and the Odyssey.</p>

        <p class="mb-4">The handshake’s catch-all utility, used in friendship, romance, and business alike, makes interpretation difficult. “The handshake continues to be a popular image today because we too see it as a complex and ambiguous motif,” writes art historian Glenys Davies in an analysis of its use in classical art.</p>

        <p class="mb-4">In America, it is likely that the handshake’s popularity was propelled by 18th century Quakers. In their efforts to eschew the hierarchy and social rank, they found the handshake a more democratic form of greeting to the then-common bow, curtsy, or hat doffing. “In their place, Quakers put the practice of the handshake, extended to everyone regardless of station, as we still do,” writes historian Michael Zuckerman.</p>

        <p class="mb-4">There may be a scientific explanation for its lasting power. In a 2015 study, researchers in Israel filmed handshakes between hundreds of strangers and found nearly a quarter of participants sniffed their hands afterwards. They theorized that a handshake might be unconsciously used to detect chemical signals, and possibly as a means of communication—just as other animals do by smelling each other.</p>

        <p class="mb-4">The kiss-as-greeting has a similarly rich history. It was incorporated into early Christianity and used in religious ceremonies. “In his Epistle to the Romans, St. Paul instructed followers to ‘salute one another with a holy kiss,’” writes Andy Scott in the book One Kiss or Two: In Search of the Perfect Greeting. In the Middle Ages, a kiss was used as a sign of fidelity and to seal agreements like property transfers.</p>

        <p class="mb-4">Today, a swift kiss on the cheek known in French as “la bise,” is a standard greeting in much of the world. The word may have originated with the Romans, who had a different term for each type of kiss and called the polite version “basium.” In Paris, two kisses are common. In Provence expect three, and four is the norm in the Loire Valley. The cheek kiss is also common in countries like Egypt, where three kisses is customary, Latin America, and the Philippines. It is thought that during the plague in the 14th century, la bise may have stopped and was not revived again until 400 years later, after the French Revolution. In 2009, la bise was temporarily paused as swine flu became a concern. At the end of February, the French Health Minister advised against it as the coronavirus cases increased. “The reduction in social contacts of a physical nature is advised,” he said. “That includes the practice of the bise.”</p>

        <p class="mb-4">In her book Don’t Look, Don’t Touch, behavioural scientist Val Curtis of the London School of Hygiene and Tropical Medicine, says that one possible reason for the kiss and handshake as a greeting is to signify that the other person is trusted enough to share germs with. Because of this, the practice can go in and out of style depending on public health concerns.</p>

        <p class="mb-4">In a 1929 study, a nurse named Leila Given wrote an article in the American Journal of Nursing lamenting the loss of the last generation’s “finger-tipping and the high handshake” customs in favour of a handshake. She warned that hands “are agents of bacterial transfer” and cited early studies showing that a handshake could easily spread germs. In conclusion, she recommended that Americans adopt the Chinese custom at the time of shaking one’s own hands together when greeting a friend. “At least our bacteria would then stay at home,” she wrote.</p>
        `,
        questions: [
            // --- True / False / Not Given (1-7) ---
            { id: 1, type: "true-false", text: "Shaking hands is an indicator of hospitality.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 2, type: "true-false", text: "Evidence showed that the handshake started as a sign of peace.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 3, type: "true-false", text: "When shaking hands, people often rolled up their sleeves.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
            { id: 4, type: "true-false", text: "The use of a handshake in different situations can be unpredictable.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 5, type: "true-false", text: "In America, handshakes became prevalent because they represented equality and freedom.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 6, type: "true-false", text: "A research conducted in 2015 showed that exactly 25% of participants smelled their hands after a handshake.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 7, type: "true-false", text: "People often smell their hands to spot poisonous chemicals.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },

            // --- Summary Completion (8-12) ---
            { id: 8, type: "fill-blank", text: "In the past, Christian used cheek kisses in 8 _____.", correctAnswer: "religious ceremonies" },
            { id: 9, type: "fill-blank", text: "In the Middle Age, the kiss-as-greeting was used to show 9 _____.", correctAnswer: "fidelity" },
            { id: 10, type: "fill-blank", text: "It is common for people in Paris to exchange 10 _____.", correctAnswer: "two kisses" },
            { id: 11, type: "fill-blank", text: "the cheek kiss might have been paused and it remained so for 11 _____.", correctAnswer: "400 years" },
            { id: 12, type: "fill-blank", text: "In 2009, due to 12 _____, cheek kisses were also stopped for a while.", correctAnswer: "swine flu" },

            // --- Short Answer (13-14) ---
            { id: 13, type: "fill-blank", text: "What did French Health Minister advise people to avoid to prevent the spread of coronavirus? 13 _____", correctAnswer: "social contacts" },
            { id: 14, type: "fill-blank", text: "What can be transferred from a handshake? 14 _____", correctAnswer: "germs" },
        ]
    },
    "fp-24": {
        id: "fp-24",
        title: "Economic Evolution",
        content: `
        <h2 class="text-xl font-bold mb-4">Economic Evolution</h2>
        
        <p class="mb-4"><strong>{A}</strong> Living along the Orinoco River that borders Brazil and Venezuela are the Yanomami people, hunter-gatherers whose average annual income has been estimated at the equivalent of $90 per person per year. Living along the Hudson River that borders New York State and New Jersey are the Manhattan people, consumer traders whose average annual income has been estimated at $36,000 per person per year. That dramatic difference of 400 times, however, pales in comparison to the differences in Stock Keeping Units (SKUs, a measure of the number of types of retail products available), which has been estimated at 300 for the Yanomami and 10 billion for the Manhattans, a difference of 33 million times.</p>

        <p class="mb-4"><strong>{B}</strong> How did this happen? According to economist Eric D. Beinhocker, who published these calculations in his revelatory work The Origin of Wealth (Harvard Business School Press, 2006), the explanation is to be found in complexity theory. Evolution and economics are not just analogous to each other, but they are actually two forms of a larger phenomenon called complex adaptive systems, in which individual elements, parts or agents interact, then process information and adapt their behaviour to changing conditions. Immune systems, ecosystems, language, the law and the Internet are all examples of complex adaptive systems.</p>

        <p class="mb-4"><strong>{C}</strong> In biological evolution, nature selects from the variation produced by random genetic mutations and the mixing of parental genes. Out of that process of cumulative selection emerges complexity and diversity. In economic evolution, our material economy proceeds through the production and selection of numerous permutations of countless products. Those 10 billion products in the Manhattan village represent only those variations that made it to market, after which there is a cumulative selection by consumers in the marketplace for those deemed most useful: VHS over Betamax, DVDs over VHS, CDs over vinyl records, flip phones over brick phones, computers over typewriters, Google over Altavista, SUVs over station wagons, paper books over e-books (still), and Internet news over network news (soon). Those that are purchased “survive” and “reproduce” into the future through repetitive use and remanufacturing.</p>

        <p class="mb-4"><strong>{D}</strong> As with living organisms and ecosystems, the economy looks designed—so just as Humans naturally deduce the existence of a top-down intelligent designer, humans also (understandably) infer that a top-down government designer is needed in nearly every aspect of the economy. But just as living organisms are shaped from the bottom up by natural selection, the economy is moulded from the bottom up by the invisible hand. The correspondence between evolution and economics is not perfect, because some top-down institutional rules and laws are needed to provide a structure within which free and fair trade can occur. But too much top-down interference into the marketplace makes trade neither free nor fair. When such attempts have been made in the past, they have failed—because markets are far too complex, interactive and autocatalytic to be designed from the top down. In his 1922 book, Socialism, Ludwig Von Mises spelt out the reasons why most notably the problem of “economic calculation” in a planned socialist economy. In capitalism, prices are in constant and rapid flux and are determined from below by individuals freely exchanging in the marketplace. Money is a means of exchange, and prices are the information people use to guide their choices. Von Mises demonstrated that socialist economies depend on capitalist economies to determine what prices should be assigned to goods and services. And they do so cumbersomely and inefficiently. Relatively free markets are, ultimately, the only way to find out what buyers are willing to pay and what sellers are willing to accept.</p>

        <p class="mb-4"><strong>{E}</strong> Economics helps to explain how Yanomami-like hunter-gatherers evolved into Manhattan-like consumer traders. In the Nineteenth century French economist Frédéric Bastiat well captured the principle: “Where goods do not cross frontiers, armies will.” In addition to being fierce warriors, the Yanomami are also sophisticated traders, and the more they trade the less they fight. The reason is that trade is a powerful social adhesive that creates political alliances. One village cannot go to another village and announce that they are worried about being conquered by a third, more powerful village—that would reveal weakness. Instead, they mask the real motives for alliance through trade and reciprocal feasting. And, as a result, not only gain military protection but also initiate a system of trade that—in the long run—leads to an increase in both wealth and SKUs.</p>

        <p class="mb-4"><strong>{F}</strong> Free and fair trade occurs in societies where most individuals interact in ways that provide mutual benefit. The necessary rules weren’t generated by wise men in a sacred temple or lawmakers in congress, but rather evolved over generations and were widely accepted and practised before the law was ever written. Laws that fail this test are ignored. If enforcement becomes too onerous, there is rebellion. Yet the concept that human interaction must, and can be controlled by a higher force is universal. Interestingly, there is no widespread agreement on who the “higher force” is. Religious people ascribe good behaviour to God’s law. They cannot conceive of an orderly society of atheists. Secular people credit the government. They consider anarchy to be synonymous with barbarity. Everyone seems to agree on the concept that an orderly society requires an omnipotent force. Yet, everywhere there is evidence that this is not so. An important distinction between spontaneous social order and social anarchy is that the former is developed by work and investment, under the rule of law and with a set of evolved morals while the latter is chaos. The classical liberal tradition of von Mises and Hayek never makes the claim that the complete absence of top-down rules leads to the optimal social order. It simply says we should be sceptical about our ability to manage them in the name of social justice, equality, or progress.</p>
        `,
        questions: [
            // --- True / False / Not Given (1-5) ---
            { id: 1, type: "true-false", text: "SKUs is a more precise measurement to demonstrate the economic level of a community.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
            { id: 2, type: "true-false", text: "No concrete examples are presented when the author makes the statement concerning economic evolution.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 3, type: "true-false", text: "Evolution and economics show a defective homolog.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 4, type: "true-false", text: "Martial actions might be taken to cross the borders if trades do not work.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 5, type: "true-false", text: "Profit is the invisible hand to guide the market.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },

            // --- Multiple Choice (6) ---
            { id: 6, type: "multiple-choice", text: "What ought to play a vital role in each field of the economy?", options: ["a strict rule", "a smart strategy", "a tightly managed authority", "a powerful legislation"], correctAnswer: 2 },

            // --- Multiple Choice (7-8) - Select two ---
            { id: 7, type: "multiple-choice", text: "Which two of the following tools are used to pretend to ask for union according to one explanation- 1", options: ["an official announcement", "a diplomatic event", "the exchange of goods", "certainly written correspondence", "some enjoyable treatment in a win-win situation"], correctAnswer: 2 },
            { id: 8, type: "multiple-choice", text: "Which two of the following tools are used to pretend to ask for union according to one explanation- 2", options: ["an official announcement", "a diplomatic event", "the exchange of goods", "certainly written correspondence", "some enjoyable treatment in a win-win situation"], correctAnswer: 4 },

            // --- Summary Completion (9-13) ---
            { id: 9, type: "fill-blank", text: "One attributes 9 _____ to the interesting change claiming that it is not as simple as it seems to be in appearance", correctAnswer: "complexity" },
            { id: 10, type: "fill-blank", text: "the relationship between 10 _____ which is a good example of", correctAnswer: "evolution and economics" },
            { id: 11, type: "fill-blank", text: "which is a good example of 11 _____, which involved in the interaction of separate factors", correctAnswer: "complex adaptive systems" },
            { id: 12, type: "fill-blank", text: "both 12 _____ and the blend of genres from the last generation brings about the difference.", correctAnswer: "random genetic mutations" },
            { id: 13, type: "fill-blank", text: "The economic counterpart shows how generating and choosing the 13 _____ of innumerable goods moves forward the material-oriented economy.", correctAnswer: "permutations" },
        ]
    },
    ...Object.fromEntries(mockReadingTest1.map(test => [test.id, test])),
    ...Object.fromEntries(mockReadingTest2.map(test => [test.id, test]))
};












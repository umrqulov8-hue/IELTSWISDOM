import { ReadingTest } from "./reading-tests";

const p1: ReadingTest = {
    id: "mock-2-p1",
    title: "Our Vanishing Night",
    timeLimit: 1200,
    content: `
    <h2 class="text-xl font-bold mb-4">Our Vanishing Night</h2>
    <p class="mb-4">Most city skies have become virtually empty of stars.</p>
    
    <p class="mb-4">If humans were truly at home under the light of the moon and stars, it would make no difference to us whether we were out and about at night or during the day, the midnight world as visible to us as it is to the vast number of nocturnal species on this planet. Instead, we are diurnal creatures, meaning our eyes are adapted to living in the sun's light. This is a basic evolutionary fact, even though most of us don't think of ourselves as diurnal beings any more than as primates or mammals or Earthlings. Yet it's the only way to explain what we've done to the night: we've engineered it to meet our needs by filling it with light.</p>
    
    <p class="mb-4">This kind of engineering is no different from damming a river. Its benefits come with consequences – called light pollution – whose effects scientists are only now beginning to study. Light pollution is largely the result of bad lighting design, which allows artificial light to shine outward and upward into the sky, where it is not wanted, instead of focusing it downward, where it is. Wherever human light spills into the natural world, some aspect of life – migration, reproduction, feeding – is affected.</p>
    
    <p class="mb-4">For most of human history, the phrase 'light pollution' would have made no sense. Imagine walking toward London on a moonlit night around 1800, when it was one of Earth's most populous cities. Nearly a million people lived there, making do, as they always had, with candles and lanterns. There would be no gaslights in the streets or squares for another seven years. We've become so used to this that the glory of an unlit night – dark enough for the planet Venus to throw shadows on Earth – is wholly beyond our experience, beyond memory almost. And yet above the city's pale ceiling lies the rest of the universe, utterly undiminished by the light we waste.</p>
    
    <p class="mb-4">We've lit up the night as if it were an unoccupied country when nothing could be further from the truth. Among mammals alone, the number of nocturnal species is astonishing. Light is a powerful biological force, and in many species, it acts as a magnet. The effect is so powerful that scientists speak of songbirds and seabirds being 'captured' by searchlights on land or by the light from gas flares on marine oil platforms, circling and circling in the thousands until they drop.</p>
    
    <p class="mb-4">Migrating at night, birds are apt to collide with brightly lit buildings; immature birds suffer in much higher numbers than adults. Insects, of course, cluster around streetlights, and feeding on those insects is a crucial means of survival for many bat species. In some Swiss valleys, the European lesser horseshoe bat began to vanish after street lights were installed, perhaps because those valleys were suddenly filled with fight-feeding pipistrelle bats.</p>
    
    <p class="mb-4">Nesting sea turtles, which seek out dark beaches, find fewer and fewer of them to bury their eggs on. When the baby sea turtles emerge from the eggs, they gravitate toward the brighter, more reflective sea horizon but find themselves confused by artificial lighting behind the beach. In Florida alone, hatching losses number in the hundreds of thousands every year. Frogs and toads living on the side of major highways suffer nocturnal fight levels that are as much as a million times brighter than normal, disturbing nearly every aspect of their behaviour, including their night-time breeding choruses.</p>
    
    <p class="mb-4">Some birds – blackbirds and nightingales, among others – sing at unnatural hours in the presence of artificial light. Scientists have determined that long artificial days – and artificially short nights – induce early breeding in a wide range of birds. And because a longer day allows for longer feeding, it can also affect migration schedules. The problem, of course, is that migration, like most other aspects of bird behaviour, is timed to natural photoperiods, not to artificial ones.</p>
    `,
    questions: [
        { id: 1, type: "true-false", text: "Few people recognise nowadays that human beings are designed to function best in daylight.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 2, type: "true-false", text: "Most light pollution is caused by the direction of artificial lights rather than their intensity.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 3, type: "true-false", text: "By 1800 the city of London had such a large population, it was already causing light pollution.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 4, type: "true-false", text: "The fishermen of the South Atlantic are unaware of the light pollution they are causing.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
        { id: 5, type: "true-false", text: "Shadows from the planet Venus are more difficult to see at certain times of the year.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
        { id: 6, type: "true-false", text: "In some Swiss valleys, the total number of bats declined rapidly after the introduction of streetlights.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
        { id: 7, type: "true-false", text: "The first attempts to limit light pollution were carried out to help those studying the stars.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 8, type: "fill-blank", text: "Songbirds and seabirds: The worst-affected birds are those which are 8……………… .", correctAnswer: "immature" },
        { id: 9, type: "fill-blank", text: "They bump into 9……………… .", correctAnswer: "brightly lit buildings" },
        { id: 10, type: "fill-blank", text: "Desert rodents and badgers: They are more at risk from 10……………… .", correctAnswer: "predators" },
        { id: 11, type: "fill-blank", text: "Migrating birds: Early migration may mean the 11……………… is not suitable on arrival.", correctAnswer: "nesting condition" },
        { id: 12, type: "fill-blank", text: "Sea turtles: They suffer from a decreasing number of 12……………… .", correctAnswer: "dark beaches" },
        { id: 13, type: "fill-blank", text: "Frogs and toads: If they are near 13……………… their routines will be upset.", correctAnswer: "highways" }
    ]
};

const p2: ReadingTest = {
    id: "mock-2-p2",
    title: "Endless Harvest",
    timeLimit: 1200,
    content: `
    <h2 class="text-xl font-bold mb-4">Endless Harvest</h2>
    <p class="mb-4">More than two hundred years ago, Russian explorers and fur hunters landed on the Aleutian Islands, a volcanic archipelago in the North Pacific, and learned of a land mass that lay farther to the north. The islands' native inhabitants called this land mass Aleyska, the 'Great Land'; today, we know it as Alaska.</p>
    <p class="mb-4">The forty-ninth state to join the United States of America (in 1959), Alaska is fully one-fifth the size of the mainland 48 states combined. It shares, with Canada, the second longest river system in North America and has over half the coastline of the United States. The rivers feed into the Bering Sea and Gulf of Alaska - cold, nutrient-rich waters which support tens of millions of seabirds, and over 400 species of fish, shellfish, crustaceans, and molluscs. Taking advantage of this rich bounty, Alaska's commercial fisheries have developed into some of the largest in the world.</p>
    <p class="mb-4">According to the Alaska Department of Fish and Game (ADF&G), Alaska's commercial fisheries landed hundreds of thousands of tonnes of shellfish and herring, and well over a million tonnes of groundfish (cod, sole, perch and pollock) in 2000. The true cultural heart and soul of Alaska's fisheries, however, is salmon. 'Salmon,' notes writer Susan Ewing in The Great Alaska Nature Factbook, 'pump through Alaska like blood through a heart, bringing rhythmic, circulating nourishment to land, animals and people.' The 'predictable abundance of salmon allowed some native cultures to flourish,' and 'dying spankers* feed bears, eagles, other animals, and ultimately the soil itself' All five species of Pacific salmon - chinook, or king; chum, or dog; Coho, or silver; sockeye, or red; and pink, or humpback-spawn** in Alaskan waters, and 90% of all Pacific salmon commercially caught in North America are produced there. Indeed, if Alaska was an independent nation, it would be the world's largest producer of wild salmon.</p>
    <p class="mb-4">Commercial catches of Pacific salmon in Alaska exceeded 320,000 tonnes in 2000, with an ex-vessel value of over $US 260 million. Catches have not always been so healthy. Between 1940 and 1959, overfishing led to crashes in salmon populations so severe that in 1953 Alaska was declared a federal disaster area. With the onset of statehood, however, the State of Alaska took over management of its own fisheries, guided by a state constitution which mandates that Alaska's natural resources be managed on a sustainable basis. At that time, statewide harvests totalled around 25 million salmon. Over the next few decades average catches steadily increased as a result of this policy of sustainable management, until, during the 1990s, annual harvests were well in excess of 100 million, and on several occasions over 200 million fish.</p>
    <p class="mb-4">The primary reason for such increases is what is known as 'In-Season Abundance-Based Management'. There are biologists throughout the state constantly monitoring adult fish as they show up to spawn. The biologists sit in streamside counting towers, study sonar, watch from aeroplanes, and talk to fishermen. The salmon season in Alaska is not pre-set. The fishermen know the approximate time of year when they will be allowed to fish, but on any given day, one or more field biologists in a particular area can put a halt to fishing. It is this management mechanism that has allowed Alaska salmon stocks – and, accordingly, Alaska salmon fisheries — to prosper.</p>
    <p class="mb-4">In 1999, the Marine Stewardship Council (MSC)*** commissioned a review of the Alaska salmon fishery. The Council, which was founded in 1996, certifies fisheries that meet high environmental standards, enabling them to use a label that recognises their environmental responsibility. The study concluded that the Alaska salmon fishery was 'well-managed and sustainable'. The MSC has since certified Alaska's salmon fishery as sustainable.</p>
    <p class="mb-4">This is good news for the people of Alaska, and for the consumers who value sustainable seafood. However, the future of Alaska's wild salmon is not entirely secure. Climate change, habitat degradation, and competition from farmed salmon are all potential threats. The challenge for Alaska will be to continue to adapt its management strategies to meet these challenges and ensure a future of endless harvest.</p>
    <p class="mb-4">*spankers: a term used for salmon after they have spawned and are dying. <br/> **spawn: release eggs. <br/> ***MSC: a joint venture between WWF (World Wildlife Fund) and Unilever, a Dutch-based multi-national.</p>
    `,
    questions: [
        { id: 14, type: "true-false", text: "The inhabitants of the Aleutian islands renamed their islands 'Aleyska'.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 15, type: "true-false", text: "Alaska's fisheries are owned by some of the world's largest companies.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
        { id: 16, type: "true-false", text: "Life in Alaska is dependent on salmon.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 17, type: "true-false", text: "Ninety per cent of all Pacific salmon caught are sockeye or pink salmon.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 18, type: "true-false", text: "More than 320,000 tonnes of salmon were caught in Alaska in 2000.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 19, type: "true-false", text: "Between 1940 and 1959, there was a sharp decrease in Alaska's salmon population.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 20, type: "true-false", text: "During the 1990s, the average number of salmon caught each year was 100 million.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 21, type: "multiple-choice", text: "In-Season Abundance-Based Management ensures that salmon fisheries are managed", options: ["to recognise fisheries that care for the environment.", "to be successful.", "to stop fish from spawning.", "to set up environmental protection laws.", "to stop people fishing for sports.", "to label their products using the MSC logo.", "to ensure that fish numbers are sufficient to permit fishing.", "to assist the subsistence communities in the region.", "to freeze a huge number of salmon eggs.", "to deny certification to the Alaska fisheries.", "to close down all fisheries."], correctAnswer: 6 },
        { id: 22, type: "multiple-choice", text: "Biologists can put a halt to fishing", options: ["to recognise fisheries that care for the environment.", "to be successful.", "to stop fish from spawning.", "to set up environmental protection laws.", "to stop people fishing for sports.", "to label their products using the MSC logo.", "to ensure that fish numbers are sufficient to permit fishing.", "to assist the subsistence communities in the region.", "to freeze a huge number of salmon eggs.", "to deny certification to the Alaska fisheries.", "to close down all fisheries."], correctAnswer: 4 },
        { id: 23, type: "multiple-choice", text: "The 'management mechanism' allowed Alaska's salmon fisheries", options: ["to recognise fisheries that care for the environment.", "to be successful.", "to stop fish from spawning.", "to set up environmental protection laws.", "to stop people fishing for sports.", "to label their products using the MSC logo.", "to ensure that fish numbers are sufficient to permit fishing.", "to assist the subsistence communities in the region.", "to freeze a huge number of salmon eggs.", "to deny certification to the Alaska fisheries.", "to close down all fisheries."], correctAnswer: 1 },
        { id: 24, type: "multiple-choice", text: "The Marine Stewardship Council certifies fisheries", options: ["to recognise fisheries that care for the environment.", "to be successful.", "to stop fish from spawning.", "to set up environmental protection laws.", "to stop people fishing for sports.", "to label their products using the MSC logo.", "to ensure that fish numbers are sufficient to permit fishing.", "to assist the subsistence communities in the region.", "to freeze a huge number of salmon eggs.", "to deny certification to the Alaska fisheries.", "to close down all fisheries."], correctAnswer: 0 },
        { id: 25, type: "multiple-choice", text: "After a severe winter, the state reacted quickly", options: ["to recognise fisheries that care for the environment.", "to be successful.", "to stop fish from spawning.", "to set up environmental protection laws.", "to stop people fishing for sports.", "to label their products using the MSC logo.", "to ensure that fish numbers are sufficient to permit fishing.", "to assist the subsistence communities in the region.", "to freeze a huge number of salmon eggs.", "to deny certification to the Alaska fisheries.", "to close down all fisheries."], correctAnswer: 10 },
        { id: 26, type: "multiple-choice", text: "Certified fisheries are able to use a label", options: ["to recognise fisheries that care for the environment.", "to be successful.", "to stop fish from spawning.", "to set up environmental protection laws.", "to stop people fishing for sports.", "to label their products using the MSC logo.", "to ensure that fish numbers are sufficient to permit fishing.", "to assist the subsistence communities in the region.", "to freeze a huge number of salmon eggs.", "to deny certification to the Alaska fisheries.", "to close down all fisheries."], correctAnswer: 5 }
    ]
};

const p3: ReadingTest = {
    id: "mock-2-p3",
    title: "Film Noir",
    timeLimit: 1200,
    content: `
    <h2 class="text-xl font-bold mb-4">Film Noir</h2>
    <p class="mb-4">After the Second World War, a curious change came over the outlook of Hollywood films. Rather than the positive, happy-ending stories that dominated the silver screen before the war, pessimism and negativity had entered American cinema. This post-war disillusionment was evident in Hollywood and the movement became known as film noir. One would be mistaken to call film noir a genre. Unlike westerns or romantic comedies, film noir cannot be defined by conventional uses of setting or conflict in a way that is common to genre films. Film noir is more of a movement, pinned to one specific point in time in much the same way as Soviet Montage or German Expressionism was. Instead, the defining quality of film noir was linked to tone, lighting and an often a sombre mood.</p>
    
    <p class="mb-4">True film noir refers to Hollywood films of the 1940s and early 1950s that dealt with dark themes such as crime and corruption. These films were essentially critiquing certain aspects of American society in a way film had never done before. Since that time there have occasionally been other great noir films made, such as Chinatown, but the mood and tone are often different to the original film noir movies. One possible reason for this is the time in which the films were made. A common perception of art is that it reflects the society and time in which it is made. That makes film noir of the Forties and Fifties quite inimitable because, luckily, the world has not had to endure a war of the scale and destruction of the Second World War again.</p>
    
    <p class="mb-4">Paul Schrader, a writer of films like Taxi Driver and Raging Bull, sees film noir as one of Hollywood's best and least-known periods. In his essay Notes on Film Noir, he admits that classifying film noir is almost impossible because many films considered as film noir vary greatly in style. He observed that there were four main traditions in film noir. First were the films specifically about war and post-war disillusionment. Schrader believes these films were not only a reflection of the war, but also a delayed reaction to the great economic depression of the 1930s. The trend in Hollywood throughout this period and into the war was to produce films aimed at keeping people's spirits up, hence the positivity.</p>
    
    <p class="mb-4">Another film noir tradition was post-war realism. Part of the style was created by shooting the films in real locations instead of on sets. This was similar to European film styles such as Neorealism in Italy. The German Influence was the third tradition. Many directors from Germany, Austria and Poland immigrated to America during the 1920s and 1930s. The use of lighting styles developed by German Expressionist films was very influential on film noir. Combining chiaroscuro lighting with filming in real locations gave film noir its distinctive visual style. The fourth tradition was the hard-boiled writing style, heavily influenced by popular literature of the time by writers like Ernest Hemingway. This writing style influenced the depiction of characters, stories and scripts in film noir.</p>
    `,
    questions: [
        { id: 27, type: "true-false", text: "The First World War had a big influence on the types of films being made in Hollywood.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 28, type: "true-false", text: "Film noir is an official genre.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 29, type: "true-false", text: "True film noir can be from any time and be about any kind of social issue.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
        { id: 30, type: "true-false", text: "Filmmaker Paul Schrader believes that film noir is almost impossible to classify.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 31, type: "true-false", text: "Mixing light and shadow was mainly responsible for creating the unique mood and feeling of film noir.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
        { id: 32, type: "true-false", text: "During the 1950s film noir was the most successful type of film at the box office.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
        { id: 33, type: "fill-blank", text: "War and post-war disillusionment: A delayed 33……………….. to the great economic depression.", correctAnswer: "reaction" },
        { id: 34, type: "fill-blank", text: "Post-war realism: Similar to European film styles such as 34……………….. in Italy.", correctAnswer: "Neorealism" },
        { id: 35, type: "fill-blank", text: "The German Influence: Many directors from Germany, Austria and Poland 35……………….. to America during the 1920s and 1930s.", correctAnswer: "immigrated" },
        { id: 36, type: "fill-blank", text: "Combining chiaroscuro lighting with filming in real locations gave film noir its 36……………….. .", correctAnswer: "visual style" },
        { id: 37, type: "fill-blank", text: "The hard-boiled writing style influenced the depiction of 37……………….. , stories and scripts in film noir.", correctAnswer: "characters" },
        { id: 38, type: "multiple-choice", text: "After the war, instead of the positive films that existed in Hollywood before,", options: ["A suited the mood in America well.", "B one of Hollywood’s most notable films.", "C there were a lot more romantic comedies released in America.", "D was something most people were not ready for.", "E a negativity had entered Hollywood films.", "F was filmed in and around London."], correctAnswer: 4 },
        { id: 39, type: "multiple-choice", text: "The honesty of post-war realism in film noir", options: ["A suited the mood in America well.", "B one of Hollywood’s most notable films.", "C there were a lot more romantic comedies released in America.", "D was something most people were not ready for.", "E a negativity had entered Hollywood films.", "F was filmed in and around London."], correctAnswer: 0 },
        { id: 40, type: "multiple-choice", text: "Double Indemnity, directed by Billy Wilder, is", options: ["A suited the mood in America well.", "B one of Hollywood’s most notable films.", "C there were a lot more romantic comedies released in America.", "D was something most people were not ready for.", "E a negativity had entered Hollywood films.", "F was filmed in and around London."], correctAnswer: 1 }
    ]
};

const full: ReadingTest = {
    id: "mock-2-full",
    title: "IELTS Reading Mock Test 2 (Full)",
    timeLimit: 3600,
    passages: [
        {
            id: "p1",
            title: "Passage 1: Our Vanishing Night",
            content: p1.content!,
            questionRange: { start: 1, end: 13 }
        },
        {
            id: "p2",
            title: "Passage 2: Endless Harvest",
            content: p2.content!,
            questionRange: { start: 14, end: 26 }
        },
        {
            id: "p3",
            title: "Passage 3: Film Noir",
            content: p3.content!,
            questionRange: { start: 27, end: 40 }
        }
    ],
    questions: [
        ...p1.questions,
        ...p2.questions,
        ...p3.questions,
    ]
};

export const mockReadingTest2: ReadingTest[] = [p1, p2, p3, full];

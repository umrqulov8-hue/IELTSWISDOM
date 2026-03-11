import { ReadingTest } from "./reading-tests";

const p1: ReadingTest = {
    id: "mock-1-p1",
    title: "The Clipper Races: an era of competition between cargo ships",
    timeLimit: 1200,
    content: `<h3>The Clipper Races: an era of competition between cargo ships</h3>

                    <p>During the seventeenth and eighteenth centuries, the British East India Company had the monopoly on trade with China and India. This meant that because no rival could legally import tea or other goods from these countries at this time, the company was rarely in a hurry to transport its merchandise. Instead, its priority was to minimise costs by carrying as much as possible on each ship. This meant that its ships - known as East Indiamen - were enormous, strong and very slow.</p>

                    <p>By 1800, the average East Indiaman could carry 1,200 tons of merchandise. The trading pattern for China tea usually meant the East Indiamen set sail from Britain in January, sailed round the Cape of Good Hope at the southernmost tip of Africa, and arrived in China in September. There they would load up that year's tea harvest, set off again and, depending on the wind and weather, aim to arrive back by the following September. So even with favourable sailing conditions, the round trip lasted almost two years, and if anything went wrong it could take a lot longer.</p>

                    <p>However, by 1834 the company had lost its trading monopolies, and tea had become a freely traded item. Having no more use for its great ships, the company sold them off, and many were bought by merchants or their captains, who continued to plough the seas between Britain and China. But now that tea could be traded freely, a few smart sailors began to realise that whoever brought each new harvest of tea to Britain first, stood to make the most money.</p>

                    <p>This was partly because if you were home first, you could sell your shipment of tea before your competitors even arrived, and partly because consumers in Britain in the nineteenth century believed that the fresher and earlier-picked the tea, the better the resulting drink. Tea traders now needed faster, sleeker ships to bring their precious cargo back. Nevertheless, in Britain this idea only caught on slowly, and while the 1840s saw a few faster ships launched, for the time being many merchants remained satisfied with the slow but reliable East Indiamen.</p>

                    <p>In fact it was the Americans who pioneered the first clipper ships. These vessels were fast and slender, with a narrow hull that was deeper at the back than at the front and masses of sails on tall masts. They earned their name from the way that they clipped off journey times. British merchants resolved to build their own clippers to rival the Americans and the first British tea clipper, Stornaway, was built in Aberdeen in 1850. More tea clippers were designed and built in Britain throughout the 1850s and 1860s; they had a narrower beam than their American equivalents, making them less powerful during storms, but faster in calmer weather.</p>

                    <p>There was a great spirit of competition between the British and American ships plying the tea trade, but to begin with the Americans had the edge. Then in 1851 a British ship owner, Richard Green, built the aptly named clipper Challenger, with the stated intention of beating the American ships. Loaded with tea, Challenger left China for London in 1852 at the same time as the American clipper Challenge, a much larger, older ship, already greatly admired for its speed. Large sums were bet on which would complete the journey first. In the event, the British ship beat its rival to London by two days, amid much jubilation. From then on, such international races grew in popularity.</p>

                    <p>After 1855, American participation in the British tea trade gradually stopped. But even without the Anglo-American rivalry, the competitive spirit continued. It was really ignited when new ports were opened up for trade in China. These included Fouchow, which was much closer to the tea-producing areas than Canton, the port used previously. As a result, tea could be loaded onboard earlier and fresher, and the clippers could set off in late May or early June - sometimes not even taking time to fill out the official paperwork - racing back to Britain whatever the difficulties.</p>

                    <p>They sped down through the South China Sea and into the Indian Ocean, then raced to get round the southernmost tip of Africa at the Cape of Good Hope. Then it was north across the vast Atlantic, past the Azores, through the English Channel and into the estuary of the River Thames. Once there, they would be towed by tugs, up the river and into the docks.</p>

                    <p>The cargo of the winning ship could earn a premium of up to sixpence per pound - and so the captain and crew were rewarded by the owners of the cargo. But the races were about more than just money: the crews, about 40 men on each clipper, were expert sailors, proud of their ships, and they delighted in competing against each other. Without their enthusiasm, the races would never have happened, since getting the ship home as fast as possible required the crew to be totally dedicated and to sacrifice much of their rest for the duration of the race.</p>`,
    questions: [

            { id: 1, type: "true-false", text: "1. In the seventeenth and eighteenth centuries, the British East India Company faced a lot of competition.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 2, type: "true-false", text: "2. Before 1800, cargo size was the most important consideration for the East India Company.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 3, type: "true-false", text: "3. At best, voyages of the East Indiamen to China and back took nearly two years to complete.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0 },
            { id: 4, type: "true-false", text: "4. Before 1834, voyages to and from China were considered to be highly dangerous.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 2 },
            { id: 5, type: "true-false", text: "5. After 1834, the ships which had served the East India Company stopped being used for commercial purposes.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 6, type: "true-false", text: "6. In the nineteenth century, British drinkers preferred tea made from mature leaves to that made from younger leaves.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1 },
            { id: 7, type: "fill-blank", text: "The ships were remarkable for the number of 7 ______ they had.", correctAnswer: "sails" },
            { id: 8, type: "fill-blank", text: "The performance of British tea clippers was particularly affected when there were 8 ______ at sea.", correctAnswer: "storms" },
            { id: 9, type: "fill-blank", text: "It was in a ship called 9 ______ that the British first competed successfully against the Americans.", correctAnswer: "Challenger" },
            { id: 10, type: "fill-blank", text: "Competition increased when additional Chinese trading 10 ______ were established.", correctAnswer: "ports" },
            { id: 11, type: "fill-blank", text: "Merchants were occasionally in such a hurry that they failed to complete the 11 ______ before leaving China.", correctAnswer: "paperwork" },
            { id: 12, type: "fill-blank", text: "At the end of their journey, the ships needed the help of 12 ______.", correctAnswer: "tugs" },
            { id: 13, type: "fill-blank", text: "The crews were motivated by both 13 ______ and their enthusiasm for the competition.", correctAnswer: "money" }

    ]
};

const p2: ReadingTest = {
    id: "mock-1-p2",
    title: "Orientation of birds",
    timeLimit: 1200,
    content: `<h3>Orientation of birds</h3>

                    <p><strong>A</strong> For many of us, the way birds are able to orientate is both astounding and difficult to appreciate fully. For instance, the annual migration of the golden plover of the Pacific takes it from Alaska to Hawaii on a flight of well over 3000 kilometres, and if it were to deviate by only one degree, it would miss the island on which it nests.</p>

                    <p><strong>B</strong> The first systematic studies on orientation in birds were made possible by the 'homing instinct' exhibited by so many species. Birds are caught at a time when they show an attachment to their territory, especially during the nesting season. They are taken to some spot, released, and the percentage of returns is recorded. The distance can be varied, and the direction, as well as the method of transporting them, and then the influence of climatic and other factors on their ability to find their way home can be studied. These experiments have shown a wide variation in ability to home, and three types of homing behaviour have been identified.</p>

                    <p><strong>C</strong> In the first type, birds methodically explore the area in which they are released until they pick up some familiar feature, and then they quickly find their way back to the nest. Such birds possess a highly developed visual memory, as experiments with pigeons have shown. Domestic pigeons have been trained to peck at a certain point on an aerial photograph, with a system of rewards, and four years later the birds were still able to respond to this training when placed on the aerial photograph. Birds' eyes have a power of resolution two to three times greater than ours, enabling them to pick up very fine details. If a bird uses only this type of homing behaviour, however, it can only succeed if the point of release is not too far away. If the birds are transported 800 kilometres from their nest, it is only by good fortune that they find their way back as a result of long exploratory flights. Usually, the area known to a bird is its feeding territory. Released within this area, the birds soon make their return; release them outside it and far fewer return. However, if a bird is released for a second time in the same place, its visual memory comes into play, and the bird, no longer requiring tedious exploratory flights, will return much more quickly.</p>

                    <p><strong>D</strong> The second type of homing behaviour is shown by birds that are capable of choosing their flight direction and holding to it for the rest of their journey. How do they decide what direction to take? They appear to choose their normal migration direction even if they are released in a different place from their usual starting point. If, for example, birds which normally fly to the north-east to reach latitude 45 degrees north are released at that latitude, they will immediately start flying north-east anyway. So if they're released further to the west, they'll maintain the correct direction, but fly west of their destination, and so fail to arrive.</p>

                    <p><strong>E</strong> The third type of homing behaviour shows the highest degree of orientation. Released at one point, the birds immediately take stock of it, compare its position with that of the nest, decide on the direction and fly off. This happens even if the birds are in a country right off their migration routes, where they have never been before. In one example, a laysan albatross returned to its nesting area on Midway Island in the middle of the Pacific, having flown over 5000 kilometres from the west coast of the USA in just over ten days. This is a perfect example of the third type of homing, for the albatross clearly couldn't rely on any landmarks over the vast expanse of the Pacific Ocean.</p>

                    <p><strong>F</strong> The percentage of successful birds varies greatly, being highest in those species with a strong migratory behaviour. Thus the lesser black-backed gull is more migratory than the herring gull and more often reaches 'home'. Great migrants such as the swift have the highest percentage of returns. In one case, seven out of nine alpine swifts were recaptured at their nests after being displaced some 1400 kilometres; one made the journey in three days.</p>

                    <p><strong>G</strong> What part does heredity play in all this? Two research studies suggest that instinctive, i.e. genetically inherited, behaviour patterns play a part in navigation. The first was carried out by Ernst Schuz and it is highly significant. Schuz caught first year European storks and released them later, after the departure of the adult storks at a time when they normally make their south-west autumn migration to Africa. The recaptures showed that, in spite of the fact that there were no adults to guide them, the birds unanimously headed south-west. This was a most striking finding, for it showed that the birds had an innate and unlearned attraction for the African wintering area that they have occupied for thousands of years.</p>

                    <p><strong>H</strong> The case of starlings is a little different. These birds have a great aptitude for homing, but this behaviour differs in the different age groups. Birds that were shifted to the south-east of their normal migration route split into two lots. The adults, in full possession of their gift for orientation, found their wintering area by modifying their direction by 90 degrees, whereas the juveniles sought their winter quarters to the south-east of their real position.</p>`,
    questions: [

            { id: 14, type: "fill-blank", text: "Birds rely on their sophisticated 14 ______. However, they are generally most successful if they are released within their feeding territory.", correctAnswer: "visual memory" },
            { id: 15, type: "fill-blank", text: "Birds select their accustomed 15 ______, no matter where they are released.", correctAnswer: "migration direction" },
            { id: 16, type: "fill-blank", text: "As a result, they may miss their 16 ______.", correctAnswer: "destination" },
            { id: 17, type: "fill-blank", text: "Birds orientate correctly, even when they are released in an unfamiliar place and have no 17 ______ to make use of.", correctAnswer: "landmarks" },
            { id: 18, type: "fill-blank", text: "One bird with this type of skill is the 18 ______.", correctAnswer: "albatross" },
            { id: 19, type: "matching", text: "19. the effects of distance on some birds' ability to find their nests", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "C" },
            { id: 20, type: "matching", text: "20. a methodology for testing the general ability of birds to find their nests", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "B" },
            { id: 21, type: "matching", text: "21. one aspect of physical ability in humans and birds", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "C" },
            { id: 22, type: "matching", text: "22. how some birds' migration was delayed for experimental purposes", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "G" },
            { id: 23, type: "matching", text: "23. domestic pigeon", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "C" },
            { id: 24, type: "matching", text: "24. alpine swift", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "F" },
            { id: 25, type: "matching", text: "25. European stork", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "A" },
            { id: 26, type: "matching", text: "26. starling", options: ["A", "B", "C", "D", "E", "F", "G"], correctAnswer: "D" }

    ]
};

const p3: ReadingTest = {
    id: "mock-1-p3",
    title: "The role of accidents in business",
    timeLimit: 1200,
    content: `<h3>The role of accidents in business</h3>

                    <p>In 1894 Dr John Kellogg and his brother, Will, were supervising a hospital and health spa in Michigan. The patients were on a restricted diet. One day, the brothers left cooked wheat untended for more than 24 hours. When they returned, they saw what they had done. It was no good to eat, but they decided to run the stale wheat through rollers, just to see how it would turn out. Normally, the process produced long sheets, but they were surprised to discover that this time the rollers created flat flakes. They baked them, and then tried the same thing with corn. From this accidental discovery came the cornflakes that generations have now been eating for breakfast.</p>

                    <p>Accidents happen; there is nothing predictable and orderly about innovation. Nobel laureate Sir Alan Hodgkin, who discovered how nerve cells transmit electrical impulses between the skin and the brain, commented: 'I believe that the record of my published papers conveys an impression of directedness and planning which does not at all coincide with the actual sequence of events.'</p>

                    <p>The same rule applies in business. The mistake that gave us cornflakes keeps repeating itself in the history of disruptive innovation, the kind that transforms markets. Louis Daguerre, for instance, discovered the technique that gave us photography in the 1830s, when drops of mercury from a shattered thermometer produced a photographic image. The microwave was discovered when Percy Spencer, a scientist with Raytheon, was testing a new vacuum tube and discovered that the sweet in his pocket had melted. The artificial sweetener, saccharin, was the unintentional result of a medical scientist's work on a chemical treatment for gastric ulcers. While working for the firm 3M, researcher Art Fry had no idea he was taking the first steps towards Post-It Notes when he used bits of adhesive office paper that could be easily lifted off the page to replace the scrap paper bookmarks that kept falling out of his hymn book.</p>

                    <p>Breakthrough and disruptive innovation are rarely driven by orderly process. Usually they come out of a chaotic, haphazard mess, which is why big companies, full of managers schooled in business programmes designed to eliminate random variation and mistakes, struggle with them. In these sorts of environments, accidents are called failures and are discouraged.</p>

                    <p>It is no surprise then that research from the late British economist Paul Geroski and London Business School's Constantinos Markides found that companies that were skilled at innovation were usually not that skilled when it came to commercialisation, and vice versa. Their book, <em>Fast Second</em>, divides businesses into 'colonists' and 'consolidators'. Small and nimble, colonists are adept at creating market niches but are terrible institution builders. Consolidators, with their strong cultures of discipline and cost control, know how to take clever ideas from other firms and turn them into mass-market items. Microsoft is a prime instance of this.</p>

                    <p>With companies spending hundreds of billions of dollars on research and development, US academics Robert Austin and Lee Devin examined how managers can encourage productive slip-ups. In their article <em>Accident, Intention and Expectation in the Innovation Process</em>, they argue that business processes actually prevent helpful mis-steps from occurring. According to their catalogue of accidents, not all false steps and mishaps are equal. Accidents, they say, come from unlikely mental associations such as memories and vague connections, looking for something and finding it in an unexpected way, looking for one thing and finding something else, and not looking for anything but finding something valuable.</p>

                    <p>Accident-prone innovation, they say, requires companies to get outside the 'cone of expectation'. It means throwing together groups from diverse backgrounds, and combining ideas in unpredictable ways. Other strategies also include having systems that watch out for accidents and examine them for value, generating them when they do not happen often enough, seizing all the useful ones, capturing their valuable features, and building on them to add value and give potential for useful accidents.</p>

                    <p>All this, however, requires thinking that is often counter-intuitive to the way businesses operate. In other words, it is the kind of thinking that goes against the beliefs of most business managers. It runs counter to the notion frequently pushed by consultants that you can 'harness' creativity and direct it to line up with intention. 'The cost of accidents in business,' people tend to call such efforts failure.</p>

                    <p>There are tentative signs that more companies are starting to realise that failure can lead to commercial gain, and that this is part of the risk-taking that underpins innovation. Australia's largest brewing company, for example, made a bad error when it launched a new beer called Empire Lager, pitched at younger consumers. Having spent a fortune creating a beer with a sweeter taste, designing a great-looking bottle and a television campaign, Foster's was left with a drink that no-one wanted to buy. The target market was more interested in brands built up by word of mouth.</p>

                    <p>Instead of wiping the unsuccessful product launch, Foster's used this lesson learned to go on and develop other brands instead. One of them, Pure Blonde, is now ranked as Australia's fifth-largest beer brand. Unlike Empire Lager, there has been almost no promotion and its sales are generated more by word of mouth.</p>

                    <p>Other companies are taking similar steps to study their own slip-ups. Intuit, the company behind financial tools such as Quicken, holds regular 'When Learning Hurts' sessions. But this sort of transformation is never easy. In a market that focuses on the short-term, convincing employees and shareholders to tolerate failure and not play it safe is a big thing to ask.</p>`,
    questions: [

            { id: 27, type: "true-false", text: "27. The delay in the process used by the Kellogg brothers affected the final product.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 },
            { id: 28, type: "true-false", text: "28. Sir Alan Hodgkin is an example of someone whose work proceeded in a logical and systematic way.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 },
            { id: 29, type: "true-false", text: "29. Daguerre is an exception to the general rule of innovation.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 },
            { id: 30, type: "true-false", text: "30. The discovery of saccharin occurred by accident during drug research.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 },
            { id: 31, type: "true-false", text: "31. The company 3M should have supported Art Fry by funding his idea of Post-It Notes.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 },
            { id: 32, type: "matching", text: "32. The usual business environment …", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "F" },
            { id: 33, type: "matching", text: "33. Geroski and Markides's book …", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "G" },
            { id: 34, type: "matching", text: "34. Microsoft is an example of a company which …", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "C" },
            { id: 35, type: "matching", text: "35. The origin of useful accidents …", options: ["A", "B", "C", "D", "E", "F", "G", "H"], correctAnswer: "A" },
            { id: 36, type: "multiple-choice", text: "36. How do Austin and Devin advise companies to get out of the 'cone of expectation'?", options: ["A. by decreasing the number of company systems", "B. by forming teams of different types of people", "C. by hiring new and creative people", "D. by holding regular brainstorming meetings"], correctAnswer: 1 },
            { id: 37, type: "multiple-choice", text: "37. In recommending 'counter-intuitive' thinking, what do Austin and Devin imply?", options: ["A. that failing at business is bad for staff morale", "B. that innovation cannot be planned for", "C. that most businesses should be devoted to avoiding mistakes", "D. that the cost of mistakes is an important consideration"], correctAnswer: 3 },
            { id: 38, type: "multiple-choice", text: "38. The writer describes the Empire Lager disaster in order to show that …", options: ["A. success can come out of a business failure", "B. the majority of companies now value risk-taking", "C. TV advertising works better on older people", "D. young beer drinkers do not like a sweet taste"], correctAnswer: 0 },
            { id: 39, type: "multiple-choice", text: "39. Pure Blonde has been more successful than Empire Lager because …", options: ["A. digital media other than TV were used.", "B. it was advertised under a different brand name.", "C. it was launched with very little advertising.", "D. the advertising budget was larger."], correctAnswer: 2 },
            { id: 40, type: "multiple-choice", text: "40. The writer concludes that creating a culture that learns from mistakes …", options: ["A. brings short-term financial gains.", "B. can be very difficult for some companies.", "C. holds no risk for workers.", "D. is a popular move with shareholders."], correctAnswer: 1 }

    ]
};

const full: ReadingTest = {
    id: "mt-1",
    title: "IELTS Reading Mock Test 1",
    timeLimit: 3600,
    passages: [
        {
            id: "p1",
            title: "Passage 1: The Clipper Races: an era of competition between cargo ships",
            content: p1.content!,
            questionRange: { start: 1, end: 13 }
        },
        {
            id: "p2",
            title: "Passage 2: Orientation of birds",
            content: p2.content!,
            questionRange: { start: 14, end: 26 }
        },
        {
            id: "p3",
            title: "Passage 3: The role of accidents in business",
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

export const mockReadingTest1: ReadingTest[] = [p1, p2, p3, full];

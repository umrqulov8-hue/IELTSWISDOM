import { ReadingTest } from "./reading-tests";

export const theRiseOfAgribotsData: ReadingTest = {
    id: "the-rise-of-agribots",
    title: "The Rise of Agribots",
    content: `
        <div class="space-y-6">
            <section>
                <p class="mb-4">The next time you stand at the supermarket checkout, spare a thought for the farmers who helped fill your shopping basket as life is hard for them right now. This, in turn, inevitably means bigger grocery bills for consumers, and greater hardship for the millions in countries where food shortages are a matter of life and death. Worse, studies suggest that the world will need twice as much food by 2050. Yet while farmers must squeeze more out of the land, they must also address the necessity of reducing their impact on the soil, waterways and atmosphere. All this means rethinking how agriculture is practiced, and taking automation to a whole new level. On the new model farms of the future, precision will be key. Why dose a whole field with chemicals if you can spray only where they are needed? Each plant could get exactly the right amount of everything, no more or less, an approach that could slash chemical use and improve yields in one move. But this is easier said than done; the largest farms in Europe and the U.S. can cover thousands of acres. That's why automation is key to precision farming. Specifically, say agricultural engineers, precision farming needs robot farmers.</p>
            </section>

            <section>
                <p class="mb-4">One day, we might see fields with 'agribots' (agricultural robots) that can identify individual seedlings and encourage them along with drops of fertilizer. Other machines would distinguish problem weeds from crops and eliminate them with shots from high-power lasers or a microdot of pesticide. These machines will also be able to identify and harvest all kinds of vegetables. More than a century of mechanization has already turned farming into an industrial-scale activity in much of the world, with farms that grow cereals being the most heavily automated.</p>
            </section>

            <section>
                <p class="mb-4">But a variety of other crops, including oranges and tomatoes destined to become processed foods, are also picked mechanically, albeit to a slightly lesser extent. Yet the next wave of autonomous farm machinery is already at work. You probably haven't even noticed, for these robots are disguised as tractors. Many are self-steering, use GPS to cross a field, and can even 'talk' to their implements - a plough or sprayer, for example. And the implements can talk back, telling the tractor that it's going too fast or needs to move to the left. This kind of communication is also being developed in other farm vehicles. A new system allows a combine harvester, say, to send a call over to a tractor-trailer so the driver can unload the grain as and when necessary.</p>
            </section>

            <section>
                <p class="mb-4">However, when fully autonomous systems take to the field, they'll look nothing like tractors. With their enormous size and weight, today's farm machines have significant downsides: they compact the soil, reducing porosity and killing beneficial life, meaning crops don't grow so well. Simon Blackmore, who researches agricultural technology at Harper Adams University College in England believes that fleets of lightweight autonomous robots have the potential to solve this problem and that replacing brute force with precision is key. 'A seed only needs one cubic centimeter of soil to grow. If we cultivate just that we only put tiny amounts of energy in and the plants still grow nicely.' There is another reason why automation may be the way forward according to Eldert van Henten, a robotics researcher at Wageningen University in the Netherlands. 'While the population is growing and needs to be fed, a rapidly shrinking number of people are willing to work in agriculture,' he points out. Other researchers such as Linda Calvin, an economist at the U.S. Department of Agriculture, and Philip Martin at the University of California, Davis, have studied trends in mechanization to predict how US farms might fare. Calvin and Martin have observed how rising employment costs have led to the adoption of labour-saving farm technology in the past, citing the raisin industry as an example. In 2000, a bumper harvest crashed prices and, with profits squeezed, farmers looked for a solution. With labour one of their biggest costs - 42 percent of production expenses on U.S. farms, on average - they started using a mechanical harvester adapted from a machine used by wine makers. By 2007, almost half of California's raisins were mechanically harvested and a labour force once numbering 50,000 had shrunk to 30,000.</p>
            </section>

            <section>
                <p class="mb-4">As well as having an impact on the job market, the widespread adoption of agribots might bring changes at the supermarket. Lewis Holloway, who studies agriculture at the University of Hull, UK, says that robotic milking is likely to influence the genetics of dairy herds as farmers opt for 'robot- friendly' cows, with udder shape, and even attitudes, suited to automated milking. Similarly, he says, it's conceivable that agribots could influence what fruit or vegetable varieties get to the shops, since farmers may prefer to grow those with, say, leaf shapes that are easier for their robots to discriminate from weeds. Almost inevitably, these machines will eventually alter the landscape, too. The real tipping point for robot agriculture will come when farms are being designed with agribots in mind, says Salah Sukkarieh, a robotics researcher at the Australian Center for Field Robotics, Sydney. This could mean a return to smaller fields, with crops planted in grids rather than rows and fruit trees pruned into two-dimensional shapes to make harvesting easier. This alien terrain tended by robots is still a while away, he says 'but it will happen.'</p>
            </section>
        </div>
    `,
    questions: [
        // Questions 14-17 (YES/NO/NOT GIVEN)
        { id: 14, type: "true-false", text: "Governments should do more to ensure that food is generally affordable.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 },
        { id: 15, type: "true-false", text: "Farmers need to reduce the harm they do to the environment.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0 },
        { id: 16, type: "true-false", text: "In the future, farmers are likely to increase their dependency on chemicals.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1 },
        { id: 17, type: "true-false", text: "Farms in Europe and the US may find it hard to adapt to precision farming.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2 },

        // Questions 18-21 (Fill-blank)
        { id: 18, type: "fill-blank", text: "In the future, agribots will provide 18. ____________ to young plants.", correctAnswer: "fertilizer" },
        { id: 19, type: "fill-blank", text: "Some machines will use 19. ____________ to get rid of unwanted plants.", correctAnswer: "lasers" },
        { id: 20, type: "fill-blank", text: "It is the production 20. ____________ which currently uses most machinery on farms.", correctAnswer: "cereals" },
        { id: 21, type: "fill-blank", text: "21. ____________ between machines such as tractors is making farming more efficient.", correctAnswer: "communication" },

        // Questions 22-26 (Matching)
        {
            id: 22,
            type: "multiple-choice",
            text: "Simon Blackmore",
            options: [
                "A: The use of automation might impact on the development of particular animal and plant species.",
                "B: We need to consider the effect on employment that increased automation will have.",
                "C: We need machines of the future to be exact, not more powerful.",
                "D: As farming becomes more automated the appearance of farmland will change.",
                "E: New machinery may require more investment than certain farmers can afford.",
                "F: There is a shortage of employees in the farming industry.",
                "G: There are limits to the environmental benefits of automation.",
                "H: Economic factors are often the driving force behind the development of machinery."
            ],
            correctAnswer: 2 // C
        },
        {
            id: 23,
            type: "multiple-choice",
            text: "Eldert van Henten",
            options: [
                "A: The use of automation might impact on the development of particular animal and plant species.",
                "B: We need to consider the effect on employment that increased automation will have.",
                "C: We need machines of the future to be exact, not more powerful.",
                "D: As farming becomes more automated the appearance of farmland will change.",
                "E: New machinery may require more investment than certain farmers can afford.",
                "F: There is a shortage of employees in the farming industry.",
                "G: There are limits to the environmental benefits of automation.",
                "H: Economic factors are often the driving force behind the development of machinery."
            ],
            correctAnswer: 5 // F
        },
        {
            id: 24,
            type: "multiple-choice",
            text: "Linda Calvin and Philip Martin",
            options: [
                "A: The use of automation might impact on the development of particular animal and plant species.",
                "B: We need to consider the effect on employment that increased automation will have.",
                "C: We need machines of the future to be exact, not more powerful.",
                "D: As farming becomes more automated the appearance of farmland will change.",
                "E: New machinery may require more investment than certain farmers can afford.",
                "F: There is a shortage of employees in the farming industry.",
                "G: There are limits to the environmental benefits of automation.",
                "H: Economic factors are often the driving force behind the development of machinery."
            ],
            correctAnswer: 7 // H
        },
        {
            id: 25,
            type: "multiple-choice",
            text: "Lewis Holloway",
            options: [
                "A: The use of automation might impact on the development of particular animal and plant species.",
                "B: We need to consider the effect on employment that increased automation will have.",
                "C: We need machines of the future to be exact, not more powerful.",
                "D: As farming becomes more automated the appearance of farmland will change.",
                "E: New machinery may require more investment than certain farmers can afford.",
                "F: There is a shortage of employees in the farming industry.",
                "G: There are limits to the environmental benefits of automation.",
                "H: Economic factors are often the driving force behind the development of machinery."
            ],
            correctAnswer: 0 // A
        },
        {
            id: 26,
            type: "multiple-choice",
            text: "Salah Sukkarieh",
            options: [
                "A: The use of automation might impact on the development of particular animal and plant species.",
                "B: We need to consider the effect on employment that increased automation will have.",
                "C: We need machines of the future to be exact, not more powerful.",
                "D: As farming becomes more automated the appearance of farmland will change.",
                "E: New machinery may require more investment than certain farmers can afford.",
                "F: There is a shortage of employees in the farming industry.",
                "G: There are limits to the environmental benefits of automation.",
                "H: Economic factors are often the driving force behind the development of machinery."
            ],
            correctAnswer: 3 // D
        }
    ]
};

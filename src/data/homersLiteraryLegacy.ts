import { ReadingTest } from "./reading-tests";

export const homersLiteraryLegacyData: ReadingTest = {
    id: "homers-literary-legacy",
    title: "Homer's Literary Legacy",
    content: `
        <div class="space-y-6">
            <section>
                <p class="mb-4"><strong>A</strong> Until the last tick of history's clock, cultural transmission meant oral transmission, and poetry, passed from mouth to ear, was the principal medium of moving information across space and from one generation to the next. Oral poetry was not simply a way of telling lovely or important stories, or of flexing the imagination. It was, argues the classicist Eric Havelock, a ‘massive repository of useful knowledge, a sort of encyclopaedia of ethics, politics, history and technology which the effective citizen was required to learn as the core of his educational equipment’. The great oral works transmitted a shared cultural heritage, held in common not on bookshelves, but in brains. In India, an entire class of priests was changed with memorising the vedas with perfect fidelity. In pre-islamic Arabia, people known as Rawis were often attached to poets as official memorizers. The Buddha’s teachings were passed down in an unbroken chain of oral tradition for four centuries until they were committed to writing in Sri Lanka in the first century B.C.</p>
            </section>

            <section>
                <p class="mb-4"><strong>B</strong> The most famous of the Western tradition’s oral works, and the first to have been systematically studied, were Homer’s Odyssey and iliad. These Two poems - possibly the first to have been written down in the Greek alphabet - had long been held up as literary archetypes. However, even as they were celebrated as the models to which all literature should aspire, Homer’s masterworks had also long been the source of scholarly unease. The earliest modern critics sensed that they were somehow qualitatively different from everything that came after – even a little strange. For one thing, both poems were oddly repetitive in the way they referred to characters. Odysseus was always ’clever Odysseus’. Dawn was always ‘rosy-fingered’. Why would someone write that? Sometimes the epithets seemed completely off-key. Why call the murderer of Agamemnon 'blameless Aegisthos’? Why refer to ‘swift-footed Achilles’ even when he was sitting down? Or to ‘laughing Aphrodite’ even when she was in tears? In terms of both structure and theme, the Odyssey and Iliad were also oddly formulaic, to the point of predictability. The same narrative units – gathering armies, heroic shields, challenges between rivals – pop up again and again, only with different characters and different circumstances. In the context of such finely spun, deliberate masterpieces, these quirks seemed hard to explain.</p>
            </section>

            <section>
                <p class="mb-4"><strong>C</strong> At the heart of the unease about these earliest works of literature were two fundamental questions: first, how could Greek literature have been born out of nothing with two masterpieces? Surely a few less perfect stories must have come before, and yet these two were among the first on record. And second, who exactly was their author? Or was it the authors? There were no historical records of Homer, and no trustworthy biography of the man exists beyond a few self-referential hints embedded in the texts themselves.</p>
            </section>

            <section>
                <p class="mb-4"><strong>D</strong> Jean-Jacques Rousseau was one of the first modern critics to suggest that Homer might not have been an author in the contemporary sense of a single person who sat down and wrote a story and then published it for others to read. In his 1781 Essay on the Origin of Languages, the Swiss philosopher suggested that the Odyssey and Iliad might have been ‘written only in men’s memories. Somewhat later they were laboriously collected in writing’ – though that was about as far as his enquiry into the matter went.</p>
            </section>

            <section>
                <p class="mb-4"><strong>E</strong> In 1795, the German philologist Friedrich August Wolf argued for the first time that not only were Homer’s works not written down by Homer, but they weren’t even by Homer. They were, rather, a loose collection of songs transmitted by generations of Greek bards, and only redacted in their present form at some later date. In 1920, an eighteen-year-old scholar named Milman Parry took up the question of Homeric authorship as his Master’s thesis at the University of California, Berkeley. He suggested that the reason Homer’s epics seemed unlike other literature was because they were unlike other literature. Parry had discovered what Wood and Wolf had missed: the evidence that the poems had been transmitted orally was right there in the text itself. All those stylistic quirks, including the formulaic and recurring plot elements and the bizarrely repetitive epithets – ‘clever Odysseus’ and ‘grey-eyed Athena’ – that had always perplexed readers were actually like thumbprints left by a potter: material evidence of how the poems had been crafted. They were mnemonic aids that helped the bards fit the metre and pattern of the line, and remember the essence of the poems.</p>
            </section>

            <section>
                <p class="mb-4"><strong>F</strong> The greatest author of antiquity was actually, Parry argued, just ‘one of a long tradition of oral poets that…composed wholly without the aid of writing’. Parry realised that if you were setting out to create memorable poems, the Odyssey and the Iliad were exactly the kind of poems you’d create. It’s said that cliches are the worst sin a writer can commit, but to an oral board, they were essential. The very reason that cliches so easily seep into our speech and writing – their insidious memorability – is exactly why they played such an important role in oral storytelling. The principles that the oral bards discovered as they sharpened their stories through telling and retelling were the same mnemonic principles that psychologists rediscovered when they began conducting their first scientific experiments on memory around the turn of the twentieth century. Words that rhyme are much more memorable than words that don’t, and concrete nouns are easier to remember than abstract ones. Finding patterns and structure in information is how our brains extract meaning from the world, and putting words to music and rhyme is a way of adding extra levels of pattern and structure to language.</p>
            </section>
        </div>
    `,
    questions: [
        // Questions 1-6 (Para Matching)
        { id: 1, type: "multiple-choice", text: "the claim that Odyssey and Iliad were not poems in their original form.", options: ["A", "B", "C", "D", "E", "F"], correctAnswer: 4 }, // E
        { id: 2, type: "multiple-choice", text: "a theory involving the reinterpretation of the term ‘author’", options: ["A", "B", "C", "D", "E", "F"], correctAnswer: 3 }, // D
        { id: 3, type: "multiple-choice", text: "references to the fact that little is known about Homer’s life", options: ["A", "B", "C", "D", "E", "F"], correctAnswer: 2 }, // C
        { id: 4, type: "multiple-choice", text: "a comparison between the construction of Homer’s poems and another art form", options: ["A", "B", "C", "D", "E", "F"], correctAnswer: 4 }, // E
        { id: 5, type: "multiple-choice", text: "examples of the kinds of people employed to recall language", options: ["A", "B", "C", "D", "E", "F"], correctAnswer: 0 }, // A
        { id: 6, type: "multiple-choice", text: "doubts regarding Homer’s inappropriate descriptions", options: ["A", "B", "C", "D", "E", "F"], correctAnswer: 1 }, // B

        // Questions 7-8 (Choose TWO)
        {
            id: 7,
            type: "multiple-choice",
            text: "Which TWO of these points are made by the writer of the text about the Odyssey and the Iliad? (First Choice)",
            options: [
                "A The poems are sometimes historically inaccurate.",
                "B It is uncertain which century they were written in.",
                "C Their content is very similar.",
                "D Later writers referred to them as ideal examples of writing.",
                "E There are stylistic differences between them."
            ],
            correctAnswer: 2 // C
        },
        {
            id: 8,
            type: "multiple-choice",
            text: "Which TWO of these points are made by the writer of the text about the Odyssey and the Iliad? (Second Choice)",
            options: [
                "A The poems are sometimes historically inaccurate.",
                "B It is uncertain which century they were written in.",
                "C Their content is very similar.",
                "D Later writers referred to them as ideal examples of writing.",
                "E There are stylistic differences between them."
            ],
            correctAnswer: 3 // D
        },

        // Questions 9-10 (Choose TWO)
        {
            id: 9,
            type: "multiple-choice",
            text: "Which TWO of the following theories does the writer of the text refer to? (First Choice)",
            options: [
                "A Homer wrote his work during a period of captivity.",
                "B Neither the Odyssey nor the Iliad were written by Homer.",
                "C Homer created the Odyssey and Iliad without writing them down.",
                "D Homer may have suffered from a failing memory in later life.",
                "E The oral and written versions of Homer’s work may not be identical."
            ],
            correctAnswer: 1 // B
        },
        {
            id: 10,
            type: "multiple-choice",
            text: "Which TWO of the following theories does the writer of the text refer to? (Second Choice)",
            options: [
                "A Homer wrote his work during a period of captivity.",
                "B Neither the Odyssey nor the Iliad were written by Homer.",
                "C Homer created the Odyssey and Iliad without writing them down.",
                "D Homer may have suffered from a failing memory in later life.",
                "E The oral and written versions of Homer’s work may not be identical."
            ],
            correctAnswer: 2 // C
        },

        // Questions 11-14 (Summary Completion)
        {
            id: 11,
            type: "fill-blank",
            text: "The importance of the spoken word and how words are remembered in spoken poetry was once the baby which each 11. _________ of a particular culture or community could pass on its knowledge.",
            correctAnswer: "generation"
        },
        {
            id: 12,
            type: "fill-blank",
            text: "Indeed, it has been suggested that it was the duty of a 12. _________ to know poetry so they would be informed about subjects such as politics and history.",
            correctAnswer: "citizen"
        },
        {
            id: 13,
            type: "fill-blank",
            text: "Psychologists now know that when people are trying to remember information, they may find it difficult to remember words that express 13. _________ ideas.",
            correctAnswer: "abstract"
        },
        {
            id: 14,
            type: "fill-blank",
            text: "It is easier to remember words which sound similar or go together with 14. ___________.",
            correctAnswer: "music"
        }
    ]
};

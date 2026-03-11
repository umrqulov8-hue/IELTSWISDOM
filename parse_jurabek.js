const fs = require('fs');

const htmlPath = 'C:\\Users\\umrqu\\Downloads\\Telegram Desktop\\IELTSwithJurabek FULL Reading 2.html';
const html = fs.readFileSync(htmlPath, 'utf8');

function extractPassage(idStr) {
    const startTag = `<div class="passage-content" id="${idStr}">`;
    const start = html.indexOf(startTag);
    if (start === -1) return "NOT FOUND";
    const contentStart = start + startTag.length;
    let openDivs = 1;
    let end = contentStart;
    while (openDivs > 0 && end < html.length) {
        let nextOpen = html.indexOf('<div', end);
        let nextClose = html.indexOf('</div', end);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
            openDivs++;
            end = nextOpen + 4;
        } else {
            openDivs--;
            end = nextClose + 5;
        }
    }
    // We actually only want up to the closing tags, but simple string indexOf is easier since the structure is flat:
    return html.substring(contentStart, html.indexOf('</div>', contentStart)).trim();
}

const p1HTML = extractPassage('passage1');
const p2HTML = extractPassage('passage2');
const p3HTML = extractPassage('passage3');

const answers = {
    1: "FALSE", 2: "TRUE", 3: "TRUE", 4: "NOT GIVEN", 5: "FALSE", 6: "FALSE",
    7: "sails", 8: "storms", 9: "Challenger", 10: "ports", 11: "paperwork", 12: "tugs", 13: "money",
    14: "visual memory", 15: "migration direction", 16: "destination", 17: "landmarks", 18: "albatross",
    19: "C", 20: "B", 21: "C", 22: "G", 23: "C", 24: "F", 25: "A", 26: "D",
    27: "YES", 28: "NO", 29: "NO", 30: "YES", 31: "NOT GIVEN",
    32: "F", 33: "G", 34: "C", 35: "A",
    36: "B", 37: "D", 38: "A", 39: "C", 40: "B"
};

const questionsP1 = `
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
`;

const questionsP2 = `
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
`;

const questionsP3 = `
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
`;

const tsOut = `import { ReadingTest } from "./reading-tests";

const p1: ReadingTest = {
    id: "mock-1-p1",
    title: "The Clipper Races: an era of competition between cargo ships",
    timeLimit: 1200,
    content: \`${p1HTML.replace(/`/g, '\\`')}\`,
    questions: [
${questionsP1}
    ]
};

const p2: ReadingTest = {
    id: "mock-1-p2",
    title: "Orientation of birds",
    timeLimit: 1200,
    content: \`${p2HTML.replace(/`/g, '\\`')}\`,
    questions: [
${questionsP2}
    ]
};

const p3: ReadingTest = {
    id: "mock-1-p3",
    title: "The role of accidents in business",
    timeLimit: 1200,
    content: \`${p3HTML.replace(/`/g, '\\`')}\`,
    questions: [
${questionsP3}
    ]
};

const full: ReadingTest = {
    id: "mock-test-1-reading",
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

export const mockTest1Reading: ReadingTest[] = [p1, p2, p3, full];
`;

fs.writeFileSync('src/data/mockTest1Reading.ts', tsOut);
console.log('Done!');

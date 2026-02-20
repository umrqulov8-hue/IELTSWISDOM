export interface VocabItem {
    id: string;
    term: string;
    definition: string;
    example: string;
}

// Master list of 85+ Idioms
const MASTER_IDIOMS: VocabItem[] = [
    { id: "1", term: "A blessing in disguise", definition: "Something good that isn't recognised at first", example: "Losing that job was a blessing in disguise." },
    { id: "2", term: "A dime a dozen", definition: "Something common and not special", example: "Souvenirs are a dime a dozen in tourist areas." },
    { id: "3", term: "A penny for your thoughts", definition: "Asking someone what they are thinking", example: "You seem quiet. A penny for your thoughts?" },
    { id: "4", term: "A perfect storm", definition: "The worst possible situation", example: "It was a perfect storm of bad luck and poor planning." },
    { id: "5", term: "A piece of cake", definition: "Very easy", example: "The test was a piece of cake." },
    { id: "6", term: "Actions speak louder than words", definition: "What you do is more important than what you say", example: "Actions speak louder than words, so show me you care." },
    { id: "7", term: "Back to square one", definition: "Start over", example: "We failed, so it's back to square one." },
    { id: "8", term: "Barking up the wrong tree", definition: "Looking in the wrong place, accusing the wrong person", example: "If you think I took it, you're barking up the wrong tree." },
    { id: "9", term: "Beat around the bush", definition: "Avoid saying what you mean, usually because it is uncomfortable", example: "Stop beating around the bush, and tell me what you really think." },
    { id: "10", term: "Better late than never", definition: "It's better to do something late than not do it at all", example: "She finally turned in her assignment; better late than never." },
    { id: "11", term: "Bite off more than you can chew", definition: "Take on more than you can handle", example: "He bit off more than he could chew by accepting two jobs." },
    { id: "12", term: "Bite the bullet", definition: "To get something over with because it is inevitable", example: "I'll just bite the bullet and get my wisdom teeth removed." },
    { id: "13", term: "Break a leg", definition: "Good luck", example: "Break a leg at your performance tonight!" },
    { id: "14", term: "Break the bank", definition: "Spend all your money", example: "The vacation will break the bank if we stay in a luxury hotel." },
    { id: "15", term: "Break the ice", definition: "Make people feel more comfortable", example: "The joke helped to break the ice at the meeting." },
    { id: "16", term: "Bring home the bacon", definition: "To earn a living", example: "He works hard to bring home the bacon." },
    { id: "17", term: "Burn bridges", definition: "Destroy relationships", example: "Don't burn bridges by being rude." },
    { id: "18", term: "Burn the midnight oil", definition: "Work late into the night", example: "She burned the midnight oil to finish her report." },
    { id: "19", term: "Call it a day", definition: "Stop working on something", example: "I'm tired; let's call it a day." },
    { id: "20", term: "Call it a night", definition: "Stop working for the evening", example: "Let's call it a night and finish tomorrow." },
    { id: "21", term: "Costs an arm and a leg", definition: "Very expensive", example: "The new car costs an arm and a leg." },
    { id: "22", term: "Cross that bridge when you come to it", definition: "Deal with a problem when it arises", example: "We'll cross that bridge when we come to it." },
    { id: "23", term: "Cry over spilled milk", definition: "Complain about a loss from the past", example: "There's no use crying over spilled milk." },
    { id: "24", term: "Curiosity killed the cat", definition: "Being inquisitive can lead to trouble", example: "Be careful with your questions; curiosity killed the cat." },
    { id: "25", term: "Cut somebody some slack", definition: "Don't be so critical", example: "Cut him some slack; he's having a rough week." },
    { id: "26", term: "Cutting corners", definition: "Doing something poorly in order to save time or money", example: "He got into trouble at work for cutting corners on the safety checks." },
    { id: "27", term: "Devil's advocate", definition: "Argue for the sake of it", example: "I'll play devil's advocate and question your assumptions." },
    { id: "28", term: "Down in the dumps", definition: "Feeling sad or depressed", example: "He's been down in the dumps since he lost his job." },
    { id: "29", term: "Draw the line", definition: "Set a limit", example: "We need to draw the line at disruptive behaviour." },
    { id: "30", term: "Easy does it", definition: "Slow down", example: "Easy does it! There's no need to rush." },
    { id: "31", term: "Elephant in the room", definition: "An obvious problem that's being ignored", example: "We need to address the elephant in the room." },
    { id: "32", term: "Every cloud has a silver lining", definition: "There's something good in every bad situation", example: "After losing his job, he found a better one. Every cloud has a silver lining." },
    { id: "33", term: "Feeling under the weather", definition: "Feeling ill", example: "I'm feeling a bit under the weather today." },
    { id: "34", term: "Get out of hand", definition: "Get out of control", example: "The party got out of hand, and the police were called." },
    { id: "35", term: "Get your act together", definition: "Work better or leave", example: "You need to get your act together if you want to stay employed." },
    { id: "36", term: "Give someone the benefit of the doubt", definition: "Trust what someone says", example: "I don't think he meant to hurt you; give him the benefit of the doubt." },
    { id: "37", term: "Go the extra mile", definition: "Make an extra effort", example: "She's always willing to go the extra mile for her friends." },
    { id: "38", term: "Hang in there", definition: "Don't give up", example: "I know it's tough, but hang in there." },
    { id: "39", term: "Hit the books", definition: "Study hard", example: "I need to hit the books if I want to pass my exams." },
    { id: "40", term: "Hit the nail on the head", definition: "Do or say something exactly right", example: "You hit the nail on the head with your analysis." },
    { id: "41", term: "Hit the road", definition: "To leave", example: "It's time to hit the road before traffic gets bad." },
    { id: "42", term: "Hit the sack", definition: "Go to sleep", example: "I'm exhausted; I'm going to hit the sack." },
    { id: "43", term: "In the same boat", definition: "In the same situation", example: "We're all in the same boat regarding the budget cuts." },
    { id: "44", term: "It takes two to tango", definition: "Both parties involved in a situation are responsible", example: "Don't blame him entirely; it takes two to tango." },
    { id: "45", term: "It's not rocket science", definition: "It's not complicated", example: "Just follow the instructions; it's not rocket science." },
    { id: "46", term: "Jump on the bandwagon", definition: "Join a popular activity or trend", example: "She jumped on the bandwagon and started yoga." },
    { id: "47", term: "Keep your chin up", definition: "Stay positive", example: "Keep your chin up, and things will get better." },
    { id: "48", term: "Leave no stone unturned", definition: "Search thoroughly", example: "We'll leave no stone unturned to find a solution." },
    { id: "49", term: "Let sleeping dogs lie", definition: "Don't disturb a situation as it is", example: "Let's not discuss that issue again; let sleeping dogs lie." },
    { id: "50", term: "Let someone off the hook", definition: "To not hold someone responsible for something", example: "She let him off the hook for breaking the vase." },
    { id: "51", term: "Let the cat out of the bag", definition: "Reveal a secret", example: "She let the cat out of the bag about the surprise party." },
    { id: "52", term: "Make a long story short", definition: "Tell something briefly", example: "To make a long story short, we missed the flight." },
    { id: "53", term: "Make a mountain out of a molehill", definition: "Exaggerate a small problem", example: "She's making a mountain out of a molehill with this issue." },
    { id: "54", term: "Miss the boat", definition: "It's too late", example: "I forgot to apply for the job, and now I've missed the boat." },
    { id: "55", term: "No pain, no gain", definition: "You have to work for what you want", example: "No pain, no gain if you want to build muscle." },
    { id: "56", term: "On cloud nine", definition: "Extremely happy", example: "She was on cloud nine after getting the job." },
    { id: "57", term: "On the ball", definition: "Doing a good job", example: "She's really on the ball with her project." },
    { id: "58", term: "On thin ice", definition: "In a risky situation", example: "You're on thin ice with your boss after being late again." },
    { id: "59", term: "Once in a blue moon", definition: "Very rarely", example: "We only see each other once in a blue moon." },
    { id: "60", term: "Out of the blue", definition: "Unexpectedly", example: "She called me out of the blue." },
    { id: "61", term: "Play it by ear", definition: "Decide as you go", example: "Let's play it by ear and see what happens." },
    { id: "62", term: "Pull someone's leg", definition: "To joke with someone", example: "Relax, I'm just pulling your leg." },
    { id: "63", term: "Pull yourself together", definition: "Calm down", example: "Pull yourself together and tell me what happened." },
    { id: "64", term: "Rain on someone's parade", definition: "Ruin someone's plans", example: "Don't rain on my parade with your negativity." },
    { id: "65", term: "Rome wasn't built in a day", definition: "Great things take time", example: "Be patient; Rome wasn't built in a day." },
    { id: "66", term: "See eye to eye", definition: "Agree", example: "We don't always see eye to eye on everything." },
    { id: "67", term: "Sit on the fence", definition: "Remain neutral", example: "He's sitting on the fence and won't take sides." },
    { id: "68", term: "Sleep on it", definition: "Think about something before making a decision", example: "Let me sleep on it, and I'll give you an answer tomorrow." },
    { id: "69", term: "So far so good", definition: "Things are going well so far", example: "The project isn't finished yet, but so far so good." },
    { id: "70", term: "Speak of the devil", definition: "The person we were just talking about showed up", example: "Speak of the devil; there he is now." },
    { id: "71", term: "Spill the beans", definition: "Reveal a secret", example: "She spilled the beans about the surprise party." },
    { id: "72", term: "Steal someone's thunder", definition: "Take credit for someone else's achievements", example: "He stole my thunder by announcing the news first." },
    { id: "73", term: "Stick to your guns", definition: "Maintain your position", example: "Despite the criticism, he stuck to his guns." },
    { id: "74", term: "Straight from the horse's mouth", definition: "From a reliable source", example: "I heard it straight from the horse's mouth." },
    { id: "75", term: "Take it with a grain of salt", definition: "Don't take it too seriously", example: "Take his advice with a grain of salt." },
    { id: "76", term: "The ball is in your court", definition: "It's your decision or responsibility to do something", example: "I've done my part; now the ball is in your court." },
    { id: "77", term: "The best of both worlds", definition: "An ideal situation", example: "She has the best of both worlds: a great career and a happy family." },
    { id: "78", term: "The early bird catches the worm", definition: "Success comes to those who prepare well", example: "She always gets up early; the early bird catches the worm." },
    { id: "79", term: "The last straw", definition: "The final problem in a series of problems", example: "Her rude comment was the last straw." },
    { id: "80", term: "The whole nine yards", definition: "Everything, all the way", example: "She went the whole nine yards for her wedding." }
];

// Helper to determine which chunk of the master list to use based on passage ID
const getChunkIndex = (id: string): number => {
    // 1. Primary Priority: Explicit mapping for latest Cambridge books & Advanced Vocab
    if (id.includes("c20-t1")) return 0;
    if (id.includes("c20-t2")) return 1;
    if (id.includes("c20-t3")) return 2;
    if (id.includes("c20-t4")) return 3;

    if (id.includes("c19-t1")) return 4;
    if (id.includes("c19-t2")) return 5;
    if (id.includes("c19-t3")) return 6;
    if (id.includes("c19-t4")) return 7;

    if (id.includes("c18-t1")) return 8;
    if (id.includes("c18-t2")) return 9;
    if (id.includes("c18-t3")) return 10;
    if (id.includes("c18-t4")) return 11;

    if (id.includes("vocab-adv-u1")) return 12;
    if (id.includes("vocab-adv-u2")) return 13;
    if (id.includes("vocab-adv-u3")) return 14;
    if (id.includes("vocab-adv-u4")) return 15;
    if (id.includes("vocab-adv-u5")) return 16;

    // 2. Fallback: Hash the ID to get a deterministic index for other books
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        const char = id.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    const positiveHash = Math.abs(hash);

    // Use indices 0-15 (rotate through same content, or distinct if possible) 
    // We have 80 items, 5 per chunk => 16 chunks.
    return positiveHash % 16;
};

export const getVocabularyForPassage = (passageId: string): VocabItem[] => {
    const CHUNK_SIZE = 5;
    const TOTAL_CHUNKS = Math.floor(MASTER_IDIOMS.length / CHUNK_SIZE); // 16 chunks

    // Get deterministic index (0 to 15)
    let chunkIndex = getChunkIndex(passageId);

    // Safety clamp
    if (chunkIndex >= TOTAL_CHUNKS) chunkIndex = 0;

    const start = chunkIndex * CHUNK_SIZE;
    const end = start + CHUNK_SIZE;

    return MASTER_IDIOMS.slice(start, end);
};

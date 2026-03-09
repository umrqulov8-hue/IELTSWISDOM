const fs = require('fs');

async function extract() {
    try {
        const res = await fetch('https://engnovate.com/ielts-reading-tests/cambridge-ielts-15-academic-reading-test-2/');
        const text = await res.text();
        fs.writeFileSync('cam15t2_fetch.html', text);
        console.log('Saved to cam15t2_fetch.html. Length:', text.length);

        // Let's try to extract JSON from it
        const scriptMatch = text.match(/<script[^>]*>(.*?)<\/script>/gs);
        if (scriptMatch) {
            fs.writeFileSync('scripts.txt', scriptMatch.join('\n\n---SCRIPT---\n\n'));
            console.log('Saved scripts.txt');
        }
    } catch (e) { console.error(e); }
}
extract();

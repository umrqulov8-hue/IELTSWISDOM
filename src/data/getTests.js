const fs = require('fs');
const cheerio = require('cheerio');

async function scrape(url, filename) {
    try {
        const res = await fetch(url);
        const html = await res.text();
        const $ = cheerio.load(html);

        // Most IELTS sites use main content inside article or container
        const content = $('body').text().replace(/\s+/g, ' ');
        fs.writeFileSync(filename, content);
        console.log(`Saved ${filename}`);
    } catch (e) { console.error(e); }
}

async function main() {
    await scrape('https://ieltsdeal.com/cambridge-15-test-2-reading-passage-1-could-urban-engineers-learn-from-dance-with-answers/', 'test2_p1.txt');
    await scrape('https://ieltsdeal.com/cambridge-15-test-2-reading-passage-2-should-we-try-to-bring-extinct-species-back-to-life-with-answers/', 'test2_p2.txt');
    await scrape('https://ieltsdeal.com/cambridge-15-test-2-reading-passage-3-having-a-laugh-with-answers/', 'test2_p3.txt');
}
main();

const fs = require('fs');
const html = fs.readFileSync('cam15t2.html', 'utf8');

// Find all elements with class 'passage-text' or similar, we will just dump all text.
// Let's use a very basic regex to strip HTML tags and see the text
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
const body = bodyMatch ? bodyMatch[1] : html;

// Remove script tags, style tags
const cleanHtml = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

// Convert some common tags to newlines
let text = cleanHtml.replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '');

// Fix HTML entities
text = text.replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');

// Remove extra spaces
text = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('cam15t2_text.txt', text);
console.log('Saved to cam15t2_text.txt');

const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('useState') && !content.includes('useState') && !content.includes('React.useState')) {
        // This logic is flawed because content.includes('useState') is always true if it includes 'useState'
    }
    
    // Better logic:
    const hasUseState = /\buseState\b/.test(content);
    const hasImport = /import.*useState/.test(content) || /React\.useState/.test(content);
    
    if (hasUseState && !hasImport) {
        console.log(`CULPRIT: ${file}`);
    }
});

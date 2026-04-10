const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('./src');
let found = false;
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Look for useState usage
    if (/\buseState\b/.test(content)) {
        // Check if it's imported
        const hasImport = /import.*useState/.test(content) || /React\.useState/.test(content) || /import[\s\S]*?from ['"]react['"]/.test(content);
        // Specifically check if 'useState' is destructured in imports
        const isDestructured = /import\s*\{[^}]*?useState[^}]*?\}\s*from\s*['"]react['"]/.test(content);
        const isReactDot = /React\.useState/.test(content);
        
        if (!isDestructured && !isReactDot) {
            console.log(`POTENTIAL CULPRIT: ${file}`);
            found = true;
        }
    }
});

if (!found) {
    console.log("No missing useState imports found in src directory with basic heuristics.");
}

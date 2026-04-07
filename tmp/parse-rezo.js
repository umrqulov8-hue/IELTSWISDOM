const fs = require('fs');

try {
    const raw = fs.readFileSync('tmp/rezo2.html', 'utf-8');

    // Replace everything securely
    let replaced = raw
        .replace(/(href|src|data-srcset|data-src|data-bg)="\/([^">]+)"/g, '$1="https://www.rezo-zero.com/$2"')
        .replace(/url\(\/(.*?)\)/g, 'url(https://www.rezo-zero.com/$1)')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '$$$$');

    // Extract body content
    const bodyMatch = replaced.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';

    // Replace text occurrences with User's IELTS wisdom texts
    bodyContent = bodyContent.replace(/Rezo Zero • Agence digitale créative/g, 'IELTS Wisdom');
    bodyContent = bodyContent.replace(/Rezo Zero is a creative agency that builds powerful digital solutions/i, 'Master every section OF THE IELTS EXAM');
    bodyContent = bodyContent.replace(/We are Rezo Zero, a digital creative agency that designs and develops unique brand identities and tailor-made digital solutions\./i, 'Reach Band 8.5+ with precision evaluations, authentic mock tests, and systematic section mastery designed by experts.');

    // Extract styles from head
    const styleMatch = replaced.match(/<style(?:[^>]*)>([\s\S]*?)<\/style>/i);
    const styleContent = styleMatch ? styleMatch[1] : '';

    // Generate React Component
    const componentCode = `
"use client";
import React, { useEffect } from 'react';

const htmlContent = \\\`
${bodyContent}
\\\`;

const customStylesStr = \\\`
${styleContent}
\\\`.replace(/@font-face\\s*{/g, '@font-face { font-display: swap;');

export default function Home() {
    useEffect(() => {
        document.documentElement.className = "has-smooth-scroll";
        document.body.className = "home static";

        const style1 = document.createElement("link");
        style1.rel = "stylesheet";
        style1.href = "https://www.rezo-zero.com/css/app.css";
        document.head.appendChild(style1);

        const customStyles = document.createElement("style");
        customStyles.innerHTML = customStylesStr;
        document.head.appendChild(customStyles);

        let scripts = [
            { src: "https://www.rezo-zero.com/js/modern.vendors~app.js", type: "module", crossorigin: "anonymous" },
            { src: "https://www.rezo-zero.com/js/modern.app.js", type: "module", crossorigin: "anonymous" }
        ];

        scripts.forEach(s => {
            if (!document.querySelector("script[src='" + s.src + "']")) {
                const script = document.createElement("script");
                script.src = s.src;
                script.type = s.type;
                script.crossOrigin = s.crossorigin;
                document.body.appendChild(script);
            }
        });

        return () => {
            document.documentElement.className = "";
            document.body.className = "";
        };
    }, []);

    return (
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
`;

    fs.writeFileSync('src/app/page.tsx', componentCode.trim());
    console.log('Successfully generated page.tsx!');
} catch (err) {
    console.error(err);
}

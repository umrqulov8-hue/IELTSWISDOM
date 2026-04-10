const fs = require('fs');
const path = require('path');

const workerPaths = ['.open-next/_worker.js', '.open-next/worker.js'];
const workerPath = workerPaths.find(p => fs.existsSync(p));

if (workerPath) {
    let content = fs.readFileSync(workerPath, 'utf8');
    
    // Safety check to avoid double patching
    if (!content.includes('env.ASSETS.fetch')) {
        console.log('Patching _worker.js to serve static assets via env.ASSETS...');
        
        // Define the patch code
        const patchCode = `
            const url = new URL(request.url);
            
            // Shim for __name (esbuild compatibility)
            if (!globalThis.__name) {
                globalThis.__name = function(t, v) { return Object.defineProperty(t, 'name', { value: v, configurable: true }); };
            }

            // Serve static assets (JS, CSS, images, favicon, etc.) directly from Cloudflare Pages
            if (
                url.pathname.startsWith("/_next/") || 
                url.pathname.includes(".") || 
                url.pathname.startsWith("/assets/") || 
                url.pathname === "/favicon.ico" || 
                url.pathname === "/favicon.png"
            ) {
                try {
                    // Try to fetch the asset from the Pages Assets bucket
                    const assetResponse = await env.ASSETS.fetch(request);
                    if (assetResponse.status < 400) {
                        return assetResponse;
                    }

                    // Fallback: If asset not found, try stripping query params for some static files
                    if (url.search) {
                        const cleanRequest = new Request(url.origin + url.pathname, request);
                        const retryResponse = await env.ASSETS.fetch(cleanRequest);
                        if (retryResponse.status < 400) {
                            return retryResponse;
                        }
                    }
                } catch (e) {
                    console.error("Asset fetch error:", e);
                }
            }
`;

        // Insert the patch after the runWithCloudflareRequestContext call and before the skew protection
        // Actually, the skew protection is at line 18. I'll insert it right after the url definition.
        
        if (content.includes('const url = new URL(request.url);')) {
            content = content.replace('const url = new URL(request.url);', patchCode);
        } else {
            // Fallback: insert at the beginning of the inner function
            content = content.replace('async () => {', 'async () => {\n' + patchCode);
        }
        
        fs.writeFileSync(workerPath, content);
        console.log('Successfully patched _worker.js');
    } else {
        console.log('_worker.js is already patched.');
    }
} else {
    console.error('.open-next/_worker.js NOT FOUND! Make sure you ran the build first.');
}

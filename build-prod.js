const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function log(msg) {
  console.log(`\n[BUILD-PROD] ${msg}`);
}

function run(cmd) {
  log(`Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(`ERROR running command: ${cmd}`);
    process.exit(1);
  }
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Next.js Build
run('next build');

// 2. OpenNext Build
run('opennextjs-cloudflare build');

// 3. Fix Assets
const openNextDir = '.open-next';
const assetsSrc = path.join(openNextDir, 'assets');

if (fs.existsSync(assetsSrc)) {
  log(`Fixing assets: copying from ${assetsSrc} to ${openNextDir}...`);
  fs.readdirSync(assetsSrc).forEach((item) => {
    if (item === 'assets') return;
    const src = path.join(assetsSrc, item);
    const dest = path.join(openNextDir, item);
    copyRecursiveSync(src, dest);
  });
  log('Assets relocated successfully.');
} else {
  console.warn('WARNING: .open-next/assets not found. Skipping asset fix.');
}

// 4. Patch Worker
const workerPaths = [
    path.join(openNextDir, '_worker.js'),
    path.join(openNextDir, 'worker.js'),
    path.join(openNextDir, 'index.js')
];
const workerPath = workerPaths.find(p => fs.existsSync(p));

if (workerPath) {
    log(`Patching worker: ${workerPath}...`);
    let content = fs.readFileSync(workerPath, 'utf8');
    const finalWorkerPath = path.join(openNextDir, '_worker.js');
    
    // The patch code to intercept static assets
    const patchCode = `
            // --- CUSTOM ASSET PATCH START ---
            {
                const _patchUrl = url || new URL(request.url);
                if (!globalThis.__name) {
                    globalThis.__name = function(t, v) { return Object.defineProperty(t, 'name', { value: v, configurable: true }); };
                }
                if (_patchUrl.pathname.startsWith("/_next/") || _patchUrl.pathname.includes(".") || _patchUrl.pathname.startsWith("/assets/")) {
                    try {
                        const assetResponse = await env.ASSETS.fetch(request);
                        if (assetResponse.status < 400) return assetResponse;
                    } catch (e) {}
                }
            }
            // --- CUSTOM ASSET PATCH END ---
`;

    if (!content.includes('CUSTOM ASSET PATCH START')) {
        if (content.includes('const url = new URL(request.url);')) {
            content = content.replace('const url = new URL(request.url);', 'const url = new URL(request.url);' + patchCode);
        } else if (content.includes('async fetch(request, env, ctx) {')) {
            content = content.replace('async fetch(request, env, ctx) {', 'async fetch(request, env, ctx) {\n' + patchCode);
        } else {
             content = '/** Patched Worker **/\n' + content.replace('async () => {', 'async () => {\n' + patchCode);
        }
        
        fs.writeFileSync(finalWorkerPath, content);
        log(`Worker patched and saved to: ${finalWorkerPath}`);
        
        // If we found 'worker.js' but saved as '_worker.js', delete the original to avoid confusion
        if (path.basename(workerPath) === 'worker.js') {
            fs.unlinkSync(workerPath);
            log('Cleaned up redundant worker.js');
        }
    } else {
        log('Worker is already patched.');
        if (workerPath !== finalWorkerPath) {
            fs.renameSync(workerPath, finalWorkerPath);
        }
    }
} else {
    log('CRITICAL ERROR: No worker file found in .open-next! Deployment will likely fail.');
    process.exit(1);
}

log('BULLETPROOF BUILD COMPLETE.');

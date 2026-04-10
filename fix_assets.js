const fs = require('fs');
const path = require('path');

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

const srcDir = path.join('.open-next', 'assets');
const destDir = '.open-next';

if (fs.existsSync(srcDir)) {
  console.log(`Copying assets from ${srcDir} to ${destDir}...`);
  fs.readdirSync(srcDir).forEach((item) => {
    // Skip the assets directory itself to avoid recursion if it's already in destDir
    if (item === 'assets') return;
    
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    copyRecursiveSync(srcPath, destPath);
  });
  console.log('Assets copied successfully.');
} else {
  console.error(`Source directory ${srcDir} does not exist!`);
  process.exit(1);
}

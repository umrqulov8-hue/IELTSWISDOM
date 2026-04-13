import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mock dependencies since we are running in Node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');
const EXPORT_DIR = path.join(__dirname, '../migration_upload');

const MEDIA_BASE_URL = "https://pub-f4853e2729ef419db32a71fae029ebe4.r2.dev";

function normalizeData(data: any): any {
    const json = JSON.stringify(data);
    // Replace relative paths with absolute remote paths
    const normalized = json
        .replace(/"\/images\//g, `"${MEDIA_BASE_URL}/images/`)
        .replace(/"\/audio\//g, `"${MEDIA_BASE_URL}/audio/`)
        .replace(/"\/image for writing test\//g, `"${MEDIA_BASE_URL}/image for writing test/`);
    return JSON.parse(normalized);
}

async function exportTests() {
    console.log('--- Starting Data Export ---');

    // 1. Listening Tests
    const listeningTests = await import('../src/data/listening-tests.ts');
    const listeningFolder = path.join(EXPORT_DIR, 'listening');
    if (!fs.existsSync(listeningFolder)) fs.mkdirSync(listeningFolder, { recursive: true });

    for (const [id, loader] of Object.entries(listeningTests.TEST_LOADERS || {})) {
        try {
            let data = await (loader as any)();
            data = normalizeData(data);
            fs.writeFileSync(path.join(listeningFolder, `${id}.json`), JSON.stringify(data, null, 2));
            console.log(`✅ Exported Listening: ${id}`);
        } catch (err) {
            console.error(`❌ Failed Listening: ${id}`, err);
        }
    }

    // 2. Reading Tests
    const readingTests = await import('../src/data/reading-tests.ts');
    const readingFolder = path.join(EXPORT_DIR, 'reading');
    if (!fs.existsSync(readingFolder)) fs.mkdirSync(readingFolder, { recursive: true });

    for (const [id, loader] of Object.entries(readingTests.TEST_LOADERS || {})) {
        try {
            let data = await (loader as any)();
            data = normalizeData(data);
            fs.writeFileSync(path.join(readingFolder, `${id}.json`), JSON.stringify(data, null, 2));
            console.log(`✅ Exported Reading: ${id}`);
        } catch (err) {
            console.error(`❌ Failed Reading: ${id}`, err);
        }
    }

    // 3. Writing Tests
    const writingTests = await import('../src/data/writing-tests.ts');
    const writingFolder = path.join(EXPORT_DIR, 'writing');
    if (!fs.existsSync(writingFolder)) fs.mkdirSync(writingFolder, { recursive: true });

    for (const [id, loader] of Object.entries(writingTests.TEST_LOADERS || {})) {
        try {
            let data = await (loader as any)();
            data = normalizeData(data);
            fs.writeFileSync(path.join(writingFolder, `${id}.json`), JSON.stringify(data, null, 2));
            console.log(`✅ Exported Writing: ${id}`);
        } catch (err) {
            console.error(`❌ Failed Writing: ${id}`, err);
        }
    }

    console.log('--- Export Finished ---');
    console.log(`Files are in: ${EXPORT_DIR}`);
}

exportTests();

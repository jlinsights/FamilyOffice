// Diagnostic script to test FamilyOffice functionality
console.log('=== FamilyOffice Diagnostic Test ===');

// Test 1: Environment check
console.log('1. Environment Check:');
console.log('   Node version:', process.version);
console.log('   Working directory:', process.cwd());

// Test 2: Package.json check
try {
    const pkg = require('./package.json');
    console.log('2. Package Check:');
    console.log('   Project name:', pkg.name);
    console.log('   Next.js version:', pkg.dependencies?.next || 'Not found');
    console.log('   React version:', pkg.dependencies?.react || 'Not found');
} catch (e) {
    console.error('2. Package Check: FAILED -', e.message);
}

// Test 3: Core files check
const fs = require('fs');
const path = require('path');

console.log('3. Core Files Check:');
const coreFiles = [
    'app/page.tsx',
    'components/animated-counter.tsx',
    'app/api/sync-user/route.ts',
    'lib/rate-limit.ts'
];

coreFiles.forEach(file => {
    try {
        const filePath = path.join(process.cwd(), file);
        const exists = fs.existsSync(filePath);
        console.log(`   ${file}: ${exists ? 'EXISTS' : 'MISSING'}`);
        
        if (exists) {
            const stats = fs.statSync(filePath);
            console.log(`     Size: ${stats.size} bytes, Modified: ${stats.mtime.toISOString()}`);
        }
    } catch (e) {
        console.log(`   ${file}: ERROR - ${e.message}`);
    }
});

// Test 4: Next.js config check
try {
    console.log('4. Next.js Config Check:');
    const configPath = path.join(process.cwd(), 'next.config.mjs');
    if (fs.existsSync(configPath)) {
        console.log('   next.config.mjs: EXISTS');
        const configContent = fs.readFileSync(configPath, 'utf8');
        console.log('   Config size:', configContent.length, 'characters');
    } else {
        console.log('   next.config.mjs: MISSING');
    }
} catch (e) {
    console.error('4. Next.js Config Check: FAILED -', e.message);
}

console.log('=== Diagnostic Complete ===');
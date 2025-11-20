#!/usr/bin/env node

/**
 * Generate Manifest Script
 * Scans the pieces/ folder and generates a manifest.json
 * Usage: node scripts/generate-manifest.js
 */

const fs = require('fs');
const path = require('path');

const piecesDir = path.join(__dirname, '..', 'pieces');
const outputPath = path.join(__dirname, '..', 'manifest.json');

// Check if pieces directory exists
if (!fs.existsSync(piecesDir)) {
    console.error('\n❌ Error: pieces/ directory not found\n');
    process.exit(1);
}

// Read all HTML files from pieces directory
const files = fs.readdirSync(piecesDir)
    .filter(file => file.endsWith('.html'))
    .sort();

console.log(`\n🔍 Found ${files.length} piece(s) in pieces/\n`);

const manifest = {
    generated: new Date().toISOString(),
    count: files.length,
    pieces: []
};

// Parse each file to extract metadata
files.forEach(filename => {
    const filePath = path.join(piecesDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract metadata from HTML
    const authorMatch = content.match(/<meta name="author" content="([^"]+)"/);
    const descriptionMatch = content.match(/<meta name="description" content="Art Series #(\d+) - ([^"]+)"/);
    const createdMatch = content.match(/<meta name="created" content="([^"]+)"/);
    const titleMatch = content.match(/<title>([^|]+)/);

    // Extract from script comment block
    const scriptAuthorMatch = content.match(/\* Author: ([^\n]+)/);
    const scriptTitleMatch = content.match(/\* Title: ([^\n]+)/);
    const scriptDescMatch = content.match(/\* Description: ([^\n]+)/);
    const numberMatch = content.match(/Art Series #(\d+)/);

    const piece = {
        filename: filename,
        path: `pieces/${filename}`,
        number: numberMatch ? numberMatch[1] : 'unknown',
        title: (scriptTitleMatch ? scriptTitleMatch[1].trim() : null) ||
               (descriptionMatch ? descriptionMatch[2] : filename.replace('.html', '')),
        author: (authorMatch ? authorMatch[1] : null) ||
                (scriptAuthorMatch ? scriptAuthorMatch[1].trim() : 'Unknown'),
        created: createdMatch ? createdMatch[1] : null,
        description: scriptDescMatch ? scriptDescMatch[1].trim() : ''
    };

    manifest.pieces.push(piece);

    console.log(`   ✓ ${piece.number} - ${piece.title}`);
});

// Write manifest to file
fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

console.log(`\n✅ Manifest generated successfully!`);
console.log(`   Output: manifest.json`);
console.log(`   Total pieces: ${manifest.count}\n`);

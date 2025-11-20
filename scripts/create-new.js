#!/usr/bin/env node

/**
 * Create New Art Piece Script
 * Usage: node scripts/create-new.js <number> <title> [author]
 * Example: node scripts/create-new.js 001 "cosmic waves" "Your Name"
 */

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error('\n❌ Error: Missing required arguments\n');
    console.log('Usage: node scripts/create-new.js <number> <title> [author]\n');
    console.log('Examples:');
    console.log('  node scripts/create-new.js 001 "cosmic waves"');
    console.log('  node scripts/create-new.js 002 "particle explosion" "@wisdomabioye"');
    console.log('  npm run new 003 "spiral galaxy"\n');
    process.exit(1);
}

const number = args[0].padStart(3, '0'); // Ensures 001, 002, etc.
const title = args[1];
const author = args[2] || 'Anon';

// Create safe filename from title
const filename = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const fullFilename = `${number}-${filename}.html`;
const outputPath = path.join(__dirname, '..', 'pieces', fullFilename);

// Get current date
const currentDate = new Date().toISOString().split('T')[0];

// Read template
const templatePath = path.join(__dirname, '..', 'template.html');

if (!fs.existsSync(templatePath)) {
    console.error(`\n❌ Error: template.html not found at ${templatePath}\n`);
    process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');

// Replace placeholders
template = template.replace(/YOUR_NAME/g, author);
template = template.replace(/TITLE/g, title);
template = template.replace(/#XXX/g, `#${number}`);
template = template.replace(/YYYY-MM-DD/g, currentDate);

// Create pieces directory if it doesn't exist
const piecesDir = path.join(__dirname, '..', 'pieces');
if (!fs.existsSync(piecesDir)) {
    fs.mkdirSync(piecesDir, { recursive: true });
    console.log('✅ Created /pieces directory');
}

// Check if file already exists
if (fs.existsSync(outputPath)) {
    console.error(`\n❌ Error: File already exists: ${fullFilename}\n`);
    process.exit(1);
}

// Write the new file
fs.writeFileSync(outputPath, template);

console.log('\n✅ Created new art piece!\n');
console.log(`   File: pieces/${fullFilename}`);
console.log(`   Title: ${title}`);
console.log(`   Number: #${number}`);
console.log(`   Author: ${author}`);
console.log(`   Date: ${currentDate}\n`);
console.log('🎨 Ready to create! Open the file and start coding.\n');
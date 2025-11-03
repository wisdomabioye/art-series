# Art Series

Animated art and generative pieces created with vanilla JavaScript and HTML.

## Motivation

Building a reusable library of animations to incorporate into upcoming projects and client gigs. Each piece serves as both creative exploration and a practical resource for future work. 

## Project Structure

```
art-series/
├── README.md                    ← Project documentation
├── template.html                ← Template for new pieces
├── package.json                 ← NPM scripts (optional)
│
├── pieces/                      ← All art pieces go here
│   ├── 001-example.html
│   └── ...
│
├── scripts/                     ← Automation scripts
│   └── create-new.js           ← Creates new piece from template
│
└── utils/                       ← Helper functions library
    └── helper.js               ← Copy-paste utilities
```

## Gallery Landing Page

The project includes an `index.html` landing page that automatically displays all your animations in a beautiful grid gallery.

### Viewing the Gallery

**Quick start:**
```bash
npm start
```

This will:
1. Auto-generate `manifest.json` from your pieces
2. Start a local server at http://localhost:8000
3. Open your browser to view the gallery

**Manual steps:**
```bash
# Generate the manifest
npm run manifest

# Start server
npm run serve

# Visit http://localhost:8000
```

### How It Works

1. **generate-manifest.js** - Scans `pieces/` folder and creates `manifest.json` with metadata
2. **index.html** - Reads manifest and displays previews in iframes
3. Each piece shows as a card with:
   - Live animation preview
   - Title, number, author
   - Creation date
   - Description (if added)
   - Click to view full screen

**Important:** Run `npm run manifest` after adding new pieces to update the gallery.

## Quick Start

### 1. Initial Setup

```bash
# Clone or create the project
mkdir art-series
cd art-series

# Create the folder structure
mkdir pieces scripts utils

# Install Node.js (if not already installed)
# Then optionally create package.json
npm init -y
```

### 2. Create Your First Piece

**Using the script:**
```bash
node scripts/create-new.js 001 "cosmic waves" "Your Name"
```

**Or add to package.json:**
```json
{
  "scripts": {
    "new": "node scripts/create-new.js"
  }
}
```

Then use:
```bash
npm run new 001 "cosmic waves" "Your Name"
```

**Manual method:**
```bash
cp template.html pieces/001-cosmic-waves.html
# Then edit the metadata manually
```

## Creating New Pieces

### Command Format

```bash
node scripts/create-new.js <number> <title> [author]
```

**Arguments:**
- `<number>` - Piece number (e.g., 001, 002, 042)
- `<title>` - Title in quotes (e.g., "particle explosion")
- `[author]` - Optional author name (default: YOUR_NAME)

**Examples:**
```bash
# Basic usage
node scripts/create-new.js 001 "spiral galaxy"

# With author name
node scripts/create-new.js 002 "neon waves" "Jane Doe"

# The script will:
# ✓ Pad the number (1 → 001)
# ✓ Create safe filename (Cosmic Waves → cosmic-waves)
# ✓ Fill in all metadata (title, author, date)
# ✓ Save to pieces/001-cosmic-waves.html
```

## Workflow

```
1. Create new piece
   npm run new 001 "title"

2. Open file
   pieces/001-title.html

3. Add your code
   Between the "MAIN ANIMATION CODE" comments

4. Copy helpers as needed
   From utils/helper.js

5. Test in browser
   Open the HTML file directly

6. Update gallery
   npm run manifest

7. View gallery
   npm start (or npm run serve)
   Visit http://localhost:8000

8. Share
   Create gist or push to GitHub
```

## Template Features

Each piece includes:

**HTML Metadata:**
```html
<meta name="author" content="Your Name">
<meta name="description" content="Art Series #001 - Title">
<meta name="created" content="2025-10-31">
```

**Script Header:**
```javascript
/**
 * Art Series #001
 * Title: Cosmic Waves
 * Author: Your Name
 * Created: 2025-10-31
 * Description: Particle system with wave motion
 */
```

**Pre-configured:**
- Canvas setup
- Animation loop
- Responsive resize handler
- Clean code structure

## Using Helper Functions

The `utils/helper.js` file contains reusable functions. Copy what you need into your HTML file.

**Quick examples:**

```javascript
// Random color from palette
const color = randomColor('cosmic');

// Map value from one range to another
const y = map(x, 0, width, 0, height);

// Create particles
const particle = new Particle(x, y, {
    radius: 5,
    color: '#FF0080',
    maxLife: 100
});

// Vector math
const velocity = Vector.random();
velocity.multiply(2);
position.add(velocity);

// Easing
const t = easing.easeInOutCubic(progress);
```

## Color Palettes

Available palettes in `helper.js`:
- `cosmic` - Vibrant purple, pink, blue
- `sunset` - Warm oranges and reds
- `ocean` - Cool blues and teals
- `forest` - Greens
- `neon` - Bright cyberpunk colors
- `retrowave` - 80s synthwave
- `pastel` - Soft colors
- `fire` - Hot reds and yellows
- `ice` - Cool blues and whites
- `autumn` - Browns and golds
- `spring` - Fresh pastels

```javascript
// Use a palette
const color = randomColor('neon');

// Or use specific colors
const colors = PALETTES.ocean; // Array of hex colors
```

## Common Patterns

### Particle System
```javascript
const particles = [];

// Create particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle(
        canvas.width / 2, 
        canvas.height / 2
    ));
}

// Animate
function animate() {
    trailEffect(ctx, 0.1);
    
    particles.forEach((p, i) => {
        if (!p.update()) {
            // Respawn dead particles
            particles[i] = new Particle(
                canvas.width / 2,
                canvas.height / 2
            );
        }
        p.draw(ctx);
    });
    
    requestAnimationFrame(animate);
}
```

### Wave Animation
```javascript
let time = 0;

function animate() {
    clearCanvas(ctx);
    
    ctx.strokeStyle = '#FF0080';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + 
                  Math.sin(x * 0.01 + time) * 100;
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    time += 0.05;
    requestAnimationFrame(animate);
}
```

### Interactive Piece
```javascript
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    // Draw something following the mouse
    drawCircle(ctx, mouseX, mouseY, 10, '#FF0080');
    requestAnimationFrame(animate);
}
```

## Tips & Best Practices

### Code Organization
- Keep each file under 300 lines
- Add clear comments
- Use the helper functions
- Keep it simple and self-contained

### Naming Convention
- Format: `###-descriptive-name.html`
- Pad numbers: `001`, `002`, `010`, `042`
- Use hyphens: `cosmic-waves` not `cosmic_waves`
- Be descriptive: `particle-explosion` not `piece2`

### Performance
- Limit particles to ~200 for smooth animation
- Use trail effects instead of clearing canvas
- Test on slower devices
- Use `requestAnimationFrame`, never `setInterval`

### Sharing
- Each piece is a single HTML file
- Easy to create GitHub gists
- Can be hosted on any static server
- Works offline

## NPM Scripts

Available scripts in `package.json`:

```bash
# Create a new piece
npm run new 001 "title" "author"

# Generate manifest (scans pieces/ folder)
npm run manifest

# Start local server
npm run serve

# Generate manifest + start server (recommended)
npm start
```

**After creating new pieces**, always run `npm run manifest` to update the gallery.

## Resources

- [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Easing Functions](https://easings.net/)
- [Color Palettes](https://coolors.co/)
- [Math for Game Developers](https://www.youtube.com/watch?v=MOYiVLEnhrw)

## Examples to Try

Start with these concepts:
1. **Particle explosion** - Particles burst from center
2. **Sine waves** - Flowing waves across screen
3. **Spiral galaxy** - Rotating spiral pattern
4. **DNA helix** - Two spiraling strands
5. **Fireworks** - Click to launch fireworks
6. **Starfield** - Moving stars (hyperspace)
7. **Matrix rain** - Falling characters
8. **Plasma effect** - Colorful flowing plasma

## Troubleshooting

**Script doesn't run:**
```bash
# Make sure Node.js is installed
node --version

# Make sure you're in the project root
pwd
```

**File not created:**
- Check that `/pieces` folder exists
- Verify template.html exists
- Make sure the number isn't already used

**Animation is slow:**
- Reduce number of particles
- Use trail effects
- Simplify calculations in the loop

## License

Do whatever you want with these! Public domain / MIT / Your choice.

---

## Project Structure Summary

```
art-series/
├── index.html              ← Gallery landing page
├── manifest.json           ← Auto-generated (don't edit manually)
├── template.html           ← Template for new pieces
├── package.json            ← NPM scripts
├── pieces/                 ← Your animations
├── scripts/
│   ├── create-new.js      ← Create new piece
│   └── generate-manifest.js ← Scan pieces and generate manifest
└── utils/
    └── helper.js          ← Reusable helper functions
```

Happy creating! 🎨
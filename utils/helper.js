/**
 * Art Series Helper Functions
 * We can copy any of these functions into our HTML file as needed
 * It can be imported in a NodeJS environment
 */

// ============================================
// MATH HELPERS
// ============================================

/**
 * Map a value from one range to another
 * @param {number} value - The value to map
 * @param {number} start1 - Source range start
 * @param {number} stop1 - Source range end
 * @param {number} start2 - Target range start
 * @param {number} stop2 - Target range end
 * @returns {number} Mapped value
 */
function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

/**
 * Random number between min and max
 */
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp a value between min and max
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Linear interpolation between two values
 */
function lerp(start, end, t) {
    return start + (end - start) * t;
}

/**
 * Distance between two points
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Normalize angle to 0-2π range
 */
function normalizeAngle(angle) {
    return ((angle % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);
}

// ============================================
// COLOR PALETTES
// ============================================

const PALETTES = {
    cosmic: ['#FF006E', '#8338EC', '#3A86FF', '#FB5607', '#FFBE0B'],
    sunset: ['#FF6B35', '#F7931E', '#FDC830', '#F37335', '#D62828'],
    ocean: ['#006BA6', '#0496FF', '#00D9FF', '#83E1D8', '#CAFAFE'],
    forest: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'],
    neon: ['#FF0080', '#00FF9F', '#00D9FF', '#FF00FF', '#FFFF00'],
    retrowave: ['#FF0090', '#FF6C00', '#FFDD00', '#7700FF', '#00FFF6'],
    pastel: ['#FFB4D1', '#C9A4FF', '#A4D8FF', '#FFD4A3', '#C4FFD4'],
    monochrome: ['#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333'],
    fire: ['#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFF700'],
    ice: ['#00F5FF', '#00CED1', '#4682B4', '#87CEEB', '#B0E0E6'],
    autumn: ['#8B4513', '#D2691E', '#FF8C00', '#FFD700', '#CD853F'],
    spring: ['#98D8C8', '#F6E58D', '#FFAAA5', '#FF8B94', '#C7CEEA']
};

/**
 * Get random color from a palette
 */
function randomColor(paletteName = 'cosmic') {
    const palette = PALETTES[paletteName];
    return palette[Math.floor(Math.random() * palette.length)];
}

/**
 * Convert hex color to rgba
 */
function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Generate random HSL color
 */
function randomHsl(hueMin = 0, hueMax = 360, sat = 70, light = 50) {
    const hue = randomInt(hueMin, hueMax);
    return `hsl(${hue}, ${sat}%, ${light}%)`;
}

// ============================================
// EASING FUNCTIONS
// ============================================

const easing = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
    easeOutSine: t => Math.sin(t * Math.PI / 2),
    easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
    easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    easeOutExpo: t => t === 1 ? 1 : -Math.pow(2, -10 * t) + 1,
    easeInOutExpo: t => {
        if (t === 0 || t === 1) return t;
        if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
        return (2 - Math.pow(2, -20 * t + 10)) / 2;
    }
};

// ============================================
// PARTICLE CLASS
// ============================================

class Particle {
    constructor(x, y, options = {}) {
        this.x = x;
        this.y = y;
        this.vx = options.vx || randomRange(-2, 2);
        this.vy = options.vy || randomRange(-2, 2);
        this.radius = options.radius || randomRange(2, 5);
        this.color = options.color || randomColor('cosmic');
        this.life = 0;
        this.maxLife = options.maxLife || randomInt(50, 150);
        this.alpha = 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        this.alpha = 1 - (this.life / this.maxLife);
        return this.life < this.maxLife;
    }
    
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(this.color, this.alpha);
        ctx.fill();
    }
}

// ============================================
// VECTOR CLASS
// ============================================

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    
    multiply(n) {
        this.x *= n;
        this.y *= n;
        return this;
    }
    
    divide(n) {
        this.x /= n;
        this.y /= n;
        return this;
    }
    
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    
    normalize() {
        const mag = this.magnitude();
        if (mag > 0) this.divide(mag);
        return this;
    }
    
    limit(max) {
        if (this.magnitude() > max) {
            this.normalize();
            this.multiply(max);
        }
        return this;
    }
    
    setAngle(angle) {
        const mag = this.magnitude();
        this.x = Math.cos(angle) * mag;
        this.y = Math.sin(angle) * mag;
        return this;
    }
    
    angle() {
        return Math.atan2(this.y, this.x);
    }
    
    copy() {
        return new Vector(this.x, this.y);
    }
    
    static random() {
        const angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    
    static fromAngle(angle, magnitude = 1) {
        return new Vector(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude);
    }
}

// ============================================
// CANVAS HELPERS
// ============================================

/**
 * Draw a circle
 */
function drawCircle(ctx, x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

/**
 * Draw a line
 */
function drawLine(ctx, x1, y1, x2, y2, color, width = 1) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

/**
 * Clear canvas with solid color
 */
function clearCanvas(ctx, color = '#000000') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Create trail effect (partial clear)
 */
function trailEffect(ctx, alpha = 0.1) {
    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Draw gradient background
 */
function drawGradient(ctx, color1, color2, vertical = true) {
    const gradient = vertical 
        ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
        : ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

/**
 * Draw radial gradient
 */
function drawRadialGradient(ctx, x, y, innerRadius, outerRadius, color1, color2) {
    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// ============================================
// NOISE (Simple implementation)
// ============================================

/**
 * Simple 1D noise function
 */
function noise1D(x) {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    
    const a = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    const b = Math.sin((i + 1) * 12.9898 + 78.233) * 43758.5453;
    
    return lerp(a - Math.floor(a), b - Math.floor(b), u);
}

/**
 * Simple 2D noise function
 */
function noise2D(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);
    
    const a = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
    const b = Math.sin((i + 1) * 12.9898 + j * 78.233) * 43758.5453;
    const c = Math.sin(i * 12.9898 + (j + 1) * 78.233) * 43758.5453;
    const d = Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233) * 43758.5453;
    
    return lerp(
        lerp(a - Math.floor(a), b - Math.floor(b), u),
        lerp(c - Math.floor(c), d - Math.floor(d), u),
        v
    );
}

// ============================================
// TIME & ANIMATION HELPERS
// ============================================

/**
 * FPS Counter
 */
class FPSCounter {
    constructor() {
        this.fps = 0;
        this.frames = 0;
        this.lastTime = performance.now();
    }
    
    update() {
        this.frames++;
        const currentTime = performance.now();
        if (currentTime >= this.lastTime + 1000) {
            this.fps = this.frames;
            this.frames = 0;
            this.lastTime = currentTime;
        }
        return this.fps;
    }
}

/**
 * Simple timer
 */
class Timer {
    constructor(duration) {
        this.duration = duration;
        this.elapsed = 0;
        this.running = false;
    }
    
    start() {
        this.running = true;
        this.elapsed = 0;
    }
    
    update(deltaTime) {
        if (this.running) {
            this.elapsed += deltaTime;
            if (this.elapsed >= this.duration) {
                this.running = false;
                return true; // Timer finished
            }
        }
        return false;
    }
    
    progress() {
        return clamp(this.elapsed / this.duration, 0, 1);
    }
    
    reset() {
        this.elapsed = 0;
        this.running = false;
    }
}

// ============================================
// EXPORT FOR NODE.JS (if needed)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        map, randomRange, randomInt, clamp, lerp, distance, normalizeAngle,
        PALETTES, randomColor, hexToRgba, randomHsl,
        easing,
        Particle, Vector,
        drawCircle, drawLine, clearCanvas, trailEffect, drawGradient, drawRadialGradient,
        noise1D, noise2D,
        FPSCounter, Timer
    };
}
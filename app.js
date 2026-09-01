/**
 * AURA ROASTERY & CAFÉ — INTERACTIVE APPLICATION LOGIC
 * Features: Canvas Particles, Web Audio Ambiance, Roast Matrix, Filterable Menu,
 * Cart Drawer, Brew Lab Ratio & Timer, Reservation Engine, and Confetti Celebration.
 */

// --- Global State ---
const state = {
  cart: [],
  orderType: 'dine-in', // 'dine-in' | 'takeaway'
  tipPercent: 15,
  taxRate: 0.05, // 8.875% NYC tax
  activeCategory: 'all',
  activeRoast: 'ethiopia',
  activeBrewMethod: 'v60',
  coffeeDose: 18,
  isAudioPlaying: false,
  timerRunning: false,
  timerTime: 0,
  timerInterval: null,
  timerTarget: 180, // 3 minutes default for V60
};

// --- Roast Spectrum Data ---
const roastData = {
  ethiopia: {
    tag: 'LIGHT FLORAL ROAST',
    heading: 'Ethiopian Yirgacheffe Kochere',
    story: 'Grown at 2,150m in iron-rich red volcanic soil. Naturally dried on raised African beds. Yields an extraordinarily clean, tea-like cup with explosive jasmine aromatics and bright candied lemon finish.',
    altitude: 'Altitude: 2,150m ASL • Washed Heirloom',
    notes: ['🌸 Jasmine Blossom', '🍋 Meyer Lemon', '🍑 White Peach', '🍯 Wildflower Honey'],
    acidity: 92,
    body: 60,
    sweetness: 88,
    depth: 35,
    recBrew: 'V60 / Chemex Pour-Over (1:16 Ratio)',
    liquidColor: '#5c3518',
    cremaColor: 'rgba(235, 185, 125, 0.9)',
    price: 680,
    img: 'assets/hero_latte.jpg'
  },
  colombia: {
    tag: 'MEDIUM HONEY PROCESS',
    heading: 'Colombian Geisha Huila Reserve',
    story: 'Cultivated in high Andean micro-climates by the Perez family. Macerated with coffee mucilage intact for 48 hours. Extraordinary balance of sweet stone fruit, velvety mouthfeel, and fragrant orange blossoms.',
    altitude: 'Altitude: 1,950m ASL • Yellow Honey',
    notes: ['🍊 Orange Blossom', '🍑 Golden Apricot', '🍬 Brown Sugar', '🌰 Roasted Hazelnut'],
    acidity: 75,
    body: 80,
    sweetness: 95,
    depth: 55,
    recBrew: 'AeroPress / Clever Dripper (1:15 Ratio)',
    liquidColor: '#452613',
    cremaColor: 'rgba(215, 160, 95, 0.9)',
    price: 850,
    img: 'assets/pour_over.jpg'
  },
  sumatra: {
    tag: 'DARK VELVET ROAST',
    heading: 'Sumatra Mandheling Gayo Mountain',
    story: 'Wet-hulled (Giling Basah) in northern Aceh province. Slow roasted in our 12kg cast iron drum to bring out deep cocoa butter richness, rustic cedar spice, and luscious dark cherry undertones with zero bitterness.',
    altitude: 'Altitude: 1,600m ASL • Wet-Hulled Organic',
    notes: ['🍫 Dark Cacao', '🌲 Cedar Wood', '🍒 Black Cherry', '🫚 Warm Nutmeg'],
    acidity: 40,
    body: 98,
    sweetness: 72,
    depth: 88,
    recBrew: 'French Press / Espresso (1:14 Ratio)',
    liquidColor: '#24140b',
    cremaColor: 'rgba(175, 115, 60, 0.95)',
    price: 620,
    img: 'assets/coffee_roast.jpg'
  },
  coldbrew: {
    tag: 'SIGNATURE NITRO RESERVE',
    heading: 'Aura Velvet Cold Maceration Blend',
    story: 'Steeped for 24 continuous hours in triple-filtered chilled water. Infused with micro-bubbles of pure nitrogen upon draft pull for a cascading, creamy Guinness-like head and deep chocolate malt profile.',
    altitude: 'High-Altitude Blend • 24hr Cold Brew',
    notes: ['🍫 Chocolate Truffle', '🍮 Salted Toffee', '🍦 Madagascar Vanilla', '🌿 Malted Oat'],
    acidity: 30,
    body: 95,
    sweetness: 90,
    depth: 70,
    recBrew: 'Chilled Draft / Over Clear Ice Sphere',
    liquidColor: '#1a0d07',
    cremaColor: 'rgba(240, 210, 175, 0.98)',
    price: 580,
    img: 'assets/hero_latte.jpg'
  }
};

// --- Artisanal Menu Database ---
const menuItems = [
  {
    id: 'flat-white',
    category: 'espresso',
    name: 'Aura Velvet Flat White',
    price: 280,
    desc: 'Double ristretto pull of Colombian Geisha over silky microfoam in a 6oz ceramic cup with intricate swan art.',
    tag: 'Bestseller',
    notes: ['Silky', 'Caramel', 'Floral'],
    img: 'assets/hero_latte.jpg'
  },
  {
    id: 'cortado-terracotta',
    category: 'espresso',
    name: 'Cortado Terracotta',
    price: 240,
    desc: 'Equal parts 1:1 espresso and lightly textured warm oat milk, served in a handcrafted clay Gibraltar glass.',
    tag: 'Barista Pick',
    notes: ['Bold', 'Hazelnut', 'Smooth'],
    img: 'assets/hero_latte.jpg'
  },
  {
    id: 'spanish-latte',
    category: 'espresso',
    name: 'Spanish Raw Honey Latte',
    price: 310,
    desc: 'Espresso infused with spiced wildflower honey, condensed oat milk, and freshly ground Ceylon cinnamon.',
    tag: 'Signature',
    notes: ['Spiced Honey', 'Vanilla', 'Warm'],
    img: 'assets/hero_latte.jpg'
  },
  {
    id: 'chemex-yirgacheffe',
    category: 'pourover',
    name: 'Ethiopian Kochere Chemex',
    price: 340,
    desc: 'Meticulously hand-dripped over 3 minutes. Crystal clear clarity with explosive jasmine and candied lemon notes.',
    tag: 'Single Origin',
    notes: ['Jasmine', 'Lemon', 'Peach'],
    img: 'assets/pour_over.jpg'
  },
  {
    id: 'v60-geisha',
    category: 'pourover',
    name: 'Panama Geisha Reserve V60',
    price: 450,
    desc: 'Ultra-rare micro-lot offering notes of bergamot, lychee, and elderflower. Brewed on custom mineral water.',
    tag: 'Rare Micro-Lot',
    notes: ['Bergamot', 'Lychee', 'Tea-like'],
    img: 'assets/pour_over.jpg'
  },
  {
    id: 'nitro-draft',
    category: 'cold',
    name: 'Cascara Nitro Cold Brew',
    price: 320,
    desc: 'Cold extracted for 24 hours and infused with nitrogen tap. Cascading velvet crema and rich toffee body.',
    tag: 'On Tap',
    notes: ['Dark Cocoa', 'Velvet', 'Malt'],
    img: 'assets/hero_latte.jpg'
  },
  {
    id: 'cold-foam-vanilla',
    category: 'cold',
    name: 'Tahitian Vanilla Sweet Foam Cold Brew',
    price: 310,
    desc: 'Slow steeped cold brew topped with a thick cloud of house-whipped Tahitian vanilla cream.',
    tag: 'Popular',
    notes: ['Vanilla Cream', 'Toffee', 'Iced'],
    img: 'assets/hero_latte.jpg'
  },
  {
    id: 'pain-au-chocolat',
    category: 'bakery',
    name: 'Pistachio Rose Pain au Chocolat',
    price: 260,
    desc: '72-layer laminated French butter dough filled with Valrhona dark chocolate and Iranian pistachio praline.',
    tag: 'Baked Fresh',
    notes: ['Valrhona Cacao', 'Pistachio', 'Flaky'],
    img: 'assets/artisan_pastries.jpg'
  },
  {
    id: 'cardamom-bun',
    category: 'bakery',
    name: 'Brown Butter Cardamom Bun',
    price: 220,
    desc: 'Traditional Scandinavian braided bun infused with freshly cracked green cardamom and pearl sugar.',
    tag: 'House Specialty',
    notes: ['Cardamom', 'Butter', 'Caramelized'],
    img: 'assets/artisan_pastries.jpg'
  },
  {
    id: 'almond-croissant',
    category: 'bakery',
    name: 'Twice-Baked Almond Frangipane',
    price: 280,
    desc: 'Golden flaky croissant soaked in vanilla syrup, filled with rich almond cream, and topped with sliced almonds.',
    tag: 'Fan Favorite',
    notes: ['Almond', 'Vanilla', 'Crisp'],
    img: 'assets/artisan_pastries.jpg'
  },
  {
    id: 'ceremonial-matcha',
    category: 'botanical',
    name: 'Layered Iced Ceremonial Matcha',
    price: 350,
    desc: 'First-harvest stone-ground Uji matcha whisked to order over chilled organic oat milk and crystal ice.',
    tag: 'Direct from Kyoto',
    notes: ['Umami', 'Vibrant Green', 'Creamy'],
    img: 'assets/matcha_latte.jpg'
  },
  {
    id: 'lavender-hojicha',
    category: 'botanical',
    name: 'Roasted Lavender Hojicha Fog',
    price: 310,
    desc: 'Roasted Japanese green tea with notes of smoky caramel and toasted hazelnut, infused with organic French lavender.',
    tag: 'Botanical',
    notes: ['Nutty', 'Lavender', 'Soothing'],
    img: 'assets/matcha_latte.jpg'
  }
];

// --- Brewing Guide Matrix ---
const brewMethods = {
  v60: {
    name: 'V60 / Chemex',
    ratio: 16,
    temp: '93°C (200°F)',
    grind: 'Medium-Fine (Sea Salt)',
    time: '3:00 mins',
    seconds: 180,
    steps: [
      { step: 'Step 1: Wet Grounds (Bloom)', text: 'Pour 50ml hot water to saturate coffee evenly. Allow grounds to bloom for 45s as trapped carbon gases release.', duration: 45 },
      { step: 'Step 2: Continuous Center Spiral', text: 'Pour gently in concentric circles outwards from the center until reaching target water weight.', duration: 90 },
      { step: 'Step 3: Gentle Drawdown', text: 'Give the dripper a gentle swirl. Let water draw down flat through the bed of grounds for a clean, sweet cup.', duration: 45 }
    ]
  },
  french: {
    name: 'French Press',
    ratio: 14,
    temp: '95°C (203°F)',
    grind: 'Coarse (Kosher Salt)',
    time: '4:00 mins',
    seconds: 240,
    steps: [
      { step: 'Step 1: Full Immersion Pour', text: 'Pour all water vigorously to saturate coffee completely. Place the lid on top without plunging.', duration: 60 },
      { step: 'Step 2: Steep & Crust Break', text: 'Allow to steep for 3 minutes. At 3:30, gently break the coffee crust with a spoon and skim surface foam.', duration: 150 },
      { step: 'Step 3: Gentle Plunge & Pour', text: 'Press the mesh filter down smoothly and immediately decant all coffee to prevent over-extraction.', duration: 30 }
    ]
  },
  aeropress: {
    name: 'AeroPress',
    ratio: 12,
    temp: '88°C (190°F)',
    grind: 'Fine-Medium (Table Salt)',
    time: '2:00 mins',
    seconds: 120,
    steps: [
      { step: 'Step 1: Rapid Stir & Bloom', text: 'Pour water and stir vigorously for 10 seconds to ensure full contact. Insert plunger to create seal.', duration: 40 },
      { step: 'Step 2: Steep Interval', text: 'Let the brew steep quietly for 45 seconds to dissolve sugars and aromatic fruit acids.', duration: 45 },
      { step: 'Step 3: Slow Press', text: 'Press plunger down smoothly over 30 seconds. Stop immediately when you hear the gentle hiss.', duration: 35 }
    ]
  },
  coldbrew: {
    name: 'Cold Maceration',
    ratio: 8,
    temp: 'Cold Chilled Water (4°C)',
    grind: 'Extra Coarse (Rock Salt)',
    time: '18–24 Hours',
    seconds: 300,
    steps: [
      { step: 'Step 1: Cold Water Saturation', text: 'Combine coarse grounds with filtered cold water in a glass jar or French press. Stir well.', duration: 60 },
      { step: 'Step 2: Refrigerated Maceration', text: 'Seal and rest in refrigerator for 18 to 24 hours for zero acidity and maximum chocolate notes.', duration: 180 },
      { step: 'Step 3: Double Paper Filtration', text: 'Filter through a mesh sieve followed by paper filter. Serve over ice or with a splash of milk.', duration: 60 }
    ]
  }
};

// ==========================================================================
// 1. AMBIENT CANVAS & COFFEE MAKING PROCESS SIMULATION ENGINE
// ==========================================================================
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// --- Floating Ambient Particles (Background Depth) ---
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.type = Math.random() > 0.4 ? 'steam' : 'bean';
    
    if (this.type === 'steam') {
      this.size = Math.random() * 30 + 15;
      this.speedY = -(Math.random() * 0.7 + 0.35);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.12 + 0.03;
      this.growRate = 0.04;
    } else {
      this.size = Math.random() * 4 + 2.5;
      this.speedY = -(Math.random() * 0.4 + 0.25);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.3 + 0.1;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.015;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      this.x -= (dx / dist) * 0.4;
    }

    if (this.type === 'steam') {
      this.size += this.growRate;
      this.alpha -= 0.00025;
    } else {
      this.rotation += this.rotationSpeed;
    }

    if (this.y < -50 || this.alpha <= 0) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;

    if (this.type === 'steam') {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, 'rgba(212, 155, 88, 0.2)');
      gradient.addColorStop(0.5, 'rgba(247, 237, 226, 0.08)');
      gradient.addColorStop(1, 'rgba(247, 237, 226, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = '#c48b48';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#120e0b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-this.size * 0.8, 0);
      ctx.lineTo(this.size * 0.8, 0);
      ctx.stroke();
    }

    ctx.restore();
  }
}

for (let i = 0; i < 35; i++) {
  const p = new Particle();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

// --- LEFT-SIDE: FARM HARVEST & SEED DELIVERY SIMULATION ENGINE ---
const farmHarvestSim = {
  active: true,
  viewMode: 'both', // 'both' | 'farm' | 'brew'
  currentPhase: 0,
  phaseTimer: 0,
  phaseDuration: 280,
  phaseNames: [
    '1. High-Altitude Tree Harvesting',
    '2. Sun-Drying & Jute Bagging',
    '3. Mountain Delivery Transit',
    '4. Roastery Storefront Arrival'
  ],

  // Particle & Element Pools
  fallingCherries: [],
  sunRayAngle: 0,
  truckXOffset: 0,
  smokePuffs: [],

  update() {
    if (!this.active) return;
    this.phaseTimer++;
    this.sunRayAngle += 0.008;

    // Progression
    if (this.phaseTimer >= this.phaseDuration) {
      this.phaseTimer = 0;
      this.currentPhase = (this.currentPhase + 1) % 4;
      this.updateHud();
    }
  },

  setPhase(index) {
    this.currentPhase = index % 4;
    this.phaseTimer = 0;
    this.updateHud();
  },

  updateHud() {
    const farmNameEl = document.getElementById('hudFarmPhaseName');
    if (farmNameEl) farmNameEl.textContent = this.phaseNames[this.currentPhase];
  },

  draw(w, h) {
    if (!this.active || this.viewMode === 'brew') return;

    ctx.save();
    
    // Position on the Left Wing of the background
    const fx = (w > 1200 && this.viewMode === 'both')
      ? Math.max(w * 0.11, 150)
      : (w > 900 && this.viewMode === 'both')
        ? Math.max(w * 0.14, 130)
        : w * 0.5;
    const fy = h * 0.52;
    const fs = Math.min(Math.max(w / 1600, 0.65), 0.95);

    // Warm background glow behind farm scene
    const farmGlow = ctx.createRadialGradient(fx, fy, 10, fx, fy, 260 * fs);
    farmGlow.addColorStop(0, 'rgba(78, 107, 80, 0.12)'); // Botanical sage glow
    farmGlow.addColorStop(0.6, 'rgba(212, 155, 88, 0.04)');
    farmGlow.addColorStop(1, 'rgba(14, 11, 9, 0)');
    ctx.fillStyle = farmGlow;
    ctx.beginPath();
    ctx.arc(fx, fy, 260 * fs, 0, Math.PI * 2);
    ctx.fill();

    // Base Scenic Platform
    ctx.fillStyle = 'rgba(28, 38, 28, 0.5)';
    ctx.strokeStyle = 'rgba(115, 150, 118, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(fx - 105 * fs, fy + 150 * fs, 210 * fs, 14 * fs, 6 * fs);
    ctx.fill();
    ctx.stroke();

    const progress = this.phaseTimer / this.phaseDuration;

    if (this.currentPhase === 0) {
      this.drawPhase1Harvest(fx, fy, fs, progress);
    } else if (this.currentPhase === 1) {
      this.drawPhase2DryAndBag(fx, fy, fs, progress);
    } else if (this.currentPhase === 2) {
      this.drawPhase3MountainTransit(fx, fy, fs, progress);
    } else if (this.currentPhase === 3) {
      this.drawPhase4StorefrontArrival(fx, fy, fs, progress);
    }

    ctx.restore();
  },

  // --- LEFT PHASE 1: BOTANICAL TREE & CHERRY HARVEST ---
  drawPhase1Harvest(fx, fy, fs, progress) {
    ctx.save();

    // Arching Coffee Tree Branch
    ctx.strokeStyle = 'rgba(105, 75, 45, 0.8)';
    ctx.lineWidth = 6 * fs;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(fx - 110 * fs, fy - 140 * fs);
    ctx.quadraticCurveTo(fx - 40 * fs, fy - 155 * fs, fx + 35 * fs, fy - 110 * fs);
    ctx.stroke();

    // Second branching twig
    ctx.lineWidth = 3.5 * fs;
    ctx.beginPath();
    ctx.moveTo(fx - 30 * fs, fy - 145 * fs);
    ctx.quadraticCurveTo(fx + 10 * fs, fy - 170 * fs, fx + 65 * fs, fy - 160 * fs);
    ctx.stroke();

    // Emerald Leaves
    const leafPositions = [
      { x: fx - 85 * fs, y: fy - 150 * fs, rot: -0.4 },
      { x: fx - 50 * fs, y: fy - 165 * fs, rot: 0.3 },
      { x: fx - 10 * fs, y: fy - 150 * fs, rot: -0.2 },
      { x: fx + 25 * fs, y: fy - 125 * fs, rot: 0.5 },
      { x: fx + 50 * fs, y: fy - 165 * fs, rot: -0.3 }
    ];

    leafPositions.forEach(leaf => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rot);
      ctx.fillStyle = 'rgba(60, 110, 65, 0.85)';
      ctx.strokeStyle = 'rgba(120, 185, 125, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18 * fs, 8 * fs, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    // Hanging Ripe Cherries & Cacao Pods
    const clusters = [
      { x: fx - 65 * fs, y: fy - 130 * fs },
      { x: fx - 20 * fs, y: fy - 135 * fs },
      { x: fx + 15 * fs, y: fy - 105 * fs }
    ];

    clusters.forEach(c => {
      ctx.fillStyle = '#b93838'; // Ripe ruby coffee cherry
      ctx.beginPath();
      ctx.arc(c.x, c.y, 6.5 * fs, 0, Math.PI * 2);
      ctx.arc(c.x + 8 * fs, c.y + 4 * fs, 6 * fs, 0, Math.PI * 2);
      ctx.arc(c.x - 6 * fs, c.y + 5 * fs, 5.5 * fs, 0, Math.PI * 2);
      ctx.fill();
    });

    // Golden Cacao Pod Hanging
    ctx.fillStyle = 'rgba(212, 155, 88, 0.9)';
    ctx.beginPath();
    ctx.ellipse(fx - 40 * fs, fy - 105 * fs, 9 * fs, 16 * fs, 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Falling Cherries into Basket
    if (this.fallingCherries.length < 18) {
      this.fallingCherries.push({
        x: fx + (Math.random() - 0.5) * 45 * fs,
        y: fy - 100 * fs,
        vy: Math.random() * 2.8 + 2.2,
        r: Math.random() * 3.5 + 4
      });
    }

    this.fallingCherries.forEach((c, idx) => {
      c.y += c.vy;
      ctx.fillStyle = '#d94343';
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r * fs, 0, Math.PI * 2);
      ctx.fill();

      // Reset when entering basket
      if (c.y > fy + 95 * fs) {
        this.fallingCherries.splice(idx, 1);
      }
    });

    // Woven Harvesting Basket on Ground
    const basketY = fy + 105 * fs;
    ctx.fillStyle = 'rgba(160, 110, 60, 0.8)';
    ctx.strokeStyle = 'rgba(215, 165, 100, 0.7)';
    ctx.lineWidth = 2 * fs;
    ctx.beginPath();
    ctx.moveTo(fx - 48 * fs, basketY);
    ctx.lineTo(fx + 48 * fs, basketY);
    ctx.lineTo(fx + 35 * fs, basketY + 40 * fs);
    ctx.lineTo(fx - 35 * fs, basketY + 40 * fs);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Basket Handle
    ctx.beginPath();
    ctx.arc(fx, basketY, 44 * fs, Math.PI, 0);
    ctx.stroke();

    // Cherries Filling the Basket
    const fillAmount = Math.min(progress * 25, 25) * fs;
    ctx.fillStyle = '#c53838';
    ctx.beginPath();
    ctx.ellipse(fx, basketY + 10 * fs - fillAmount * 0.3, 40 * fs, (12 + fillAmount * 0.4) * fs, 0, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = 'rgba(180, 225, 185, 0.9)';
    ctx.font = `600 ${11 * fs}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('🌱 Direct-Trade Cherry & Pod Harvest', fx, fy - 180 * fs);

    ctx.restore();
  },

  // --- LEFT PHASE 2: SUN-DRYING & JUTE BAGGING ---
  drawPhase2DryAndBag(fx, fy, fs, progress) {
    ctx.save();

    // Radiant African Sun
    const sunX = fx - 70 * fs;
    const sunY = fy - 140 * fs;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 45 * fs);
    sunGlow.addColorStop(0, 'rgba(255, 225, 140, 0.9)');
    sunGlow.addColorStop(0.5, 'rgba(212, 155, 88, 0.4)');
    sunGlow.addColorStop(1, 'rgba(212, 155, 88, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 40 * fs, 0, Math.PI * 2);
    ctx.fill();

    // Rotating Sunbeams
    ctx.save();
    ctx.translate(sunX, sunY);
    ctx.rotate(this.sunRayAngle);
    ctx.strokeStyle = 'rgba(240, 195, 120, 0.35)';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 8; r++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(18 * fs, 0);
      ctx.lineTo(34 * fs, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Raised African Sun-Drying Bed (Wood Legs + Mesh Table)
    const tableY = fy - 30 * fs;
    // Wood Legs
    ctx.strokeStyle = 'rgba(125, 90, 55, 0.85)';
    ctx.lineWidth = 3.5 * fs;
    ctx.beginPath();
    ctx.moveTo(fx - 85 * fs, tableY + 50 * fs);
    ctx.lineTo(fx - 85 * fs, tableY);
    ctx.moveTo(fx + 25 * fs, tableY + 50 * fs);
    ctx.lineTo(fx + 25 * fs, tableY);
    ctx.stroke();

    // Drying Screen
    ctx.fillStyle = 'rgba(195, 155, 105, 0.7)';
    ctx.strokeStyle = 'rgba(225, 185, 130, 0.8)';
    ctx.lineWidth = 2 * fs;
    ctx.beginPath();
    ctx.roundRect(fx - 95 * fs, tableY, 130 * fs, 12 * fs, 3 * fs);
    ctx.fill();
    ctx.stroke();

    // Parchment Seeds Drying on Screen
    ctx.fillStyle = '#e5b376';
    for (let s = 0; s < 15; s++) {
      const sx = fx - 85 * fs + s * 8 * fs;
      ctx.beginPath();
      ctx.ellipse(sx, tableY + 3 * fs, 3 * fs, 2 * fs, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Rustic Jute Burlap Sack on Right
    const sackX = fx + 60 * fs;
    const sackY = fy + 55 * fs;
    ctx.fillStyle = 'rgba(165, 120, 75, 0.85)'; // Jute color
    ctx.strokeStyle = 'rgba(215, 170, 115, 0.8)';
    ctx.lineWidth = 2 * fs;
    ctx.beginPath();
    ctx.roundRect(sackX - 25 * fs, sackY, 50 * fs, 70 * fs, [12 * fs, 12 * fs, 6 * fs, 6 * fs]);
    ctx.fill();
    ctx.stroke();

    // Rope Tie at Top of Sack
    ctx.strokeStyle = '#f5ede0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sackX - 20 * fs, sackY + 14 * fs);
    ctx.lineTo(sackX + 20 * fs, sackY + 14 * fs);
    ctx.stroke();

    // AURA Stamp on Burlap Sack
    ctx.fillStyle = '#22160e';
    ctx.font = `700 ${8 * fs}px Cinzel, serif`;
    ctx.textAlign = 'center';
    ctx.fillText('AURA', sackX, sackY + 35 * fs);
    ctx.font = `600 ${6 * fs}px Outfit, sans-serif`;
    ctx.fillText('LOT #428', sackX, sackY + 45 * fs);
    ctx.fillText('DIRECT TRADE', sackX, sackY + 53 * fs);

    // Label
    ctx.fillStyle = 'rgba(235, 195, 140, 0.9)';
    ctx.font = `600 ${11 * fs}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('☀️ Raised African Beds & Jute Bagging', fx, fy - 180 * fs);

    ctx.restore();
  },

  // --- LEFT PHASE 3: SCENIC MOUNTAIN DELIVERY TRANSIT ---
  drawPhase3MountainTransit(fx, fy, fs, progress) {
    ctx.save();

    // Rolling Distant Mountain Ridges (Ethiopian/Colombian Highlands)
    ctx.fillStyle = 'rgba(35, 55, 40, 0.55)';
    ctx.beginPath();
    ctx.moveTo(fx - 110 * fs, fy + 70 * fs);
    ctx.lineTo(fx - 60 * fs, fy - 60 * fs);
    ctx.lineTo(fx, fy - 20 * fs);
    ctx.lineTo(fx + 65 * fs, fy - 80 * fs);
    ctx.lineTo(fx + 110 * fs, fy + 70 * fs);
    ctx.closePath();
    ctx.fill();

    // Closer Forest Ridge
    ctx.fillStyle = 'rgba(48, 75, 50, 0.7)';
    ctx.beginPath();
    ctx.moveTo(fx - 110 * fs, fy + 90 * fs);
    ctx.lineTo(fx - 40 * fs, fy + 20 * fs);
    ctx.lineTo(fx + 40 * fs, fy + 45 * fs);
    ctx.lineTo(fx + 110 * fs, fy + 90 * fs);
    ctx.closePath();
    ctx.fill();

    // Winding Hill Highway Road
    const roadY = fy + 95 * fs;
    ctx.strokeStyle = 'rgba(180, 140, 100, 0.5)';
    ctx.lineWidth = 14 * fs;
    ctx.beginPath();
    ctx.moveTo(fx - 105 * fs, roadY);
    ctx.quadraticCurveTo(fx, roadY - 15 * fs, fx + 105 * fs, roadY);
    ctx.stroke();

    // Road Center Dashed Line
    ctx.strokeStyle = 'rgba(245, 237, 224, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6 * fs, 6 * fs]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Charming Vintage Roastery Delivery Van / Truck
    // Moves across the road from left to right as progress increases
    const truckX = fx - 75 * fs + progress * 145 * fs;
    const truckY = roadY - 22 * fs;

    // Truck Cargo Bed with Coffee Sacks
    ctx.fillStyle = '#8a5830';
    ctx.beginPath();
    ctx.roundRect(truckX - 25 * fs, truckY - 10 * fs, 26 * fs, 18 * fs, 3 * fs);
    ctx.fill();

    // Stuffed Burlap Sacks in Cargo Bed
    ctx.fillStyle = '#d49b58';
    ctx.beginPath();
    ctx.arc(truckX - 18 * fs, truckY - 13 * fs, 6 * fs, 0, Math.PI * 2);
    ctx.arc(truckX - 8 * fs, truckY - 14 * fs, 6.5 * fs, 0, Math.PI * 2);
    ctx.fill();

    // Truck Cab (Vintage Roastery Van)
    ctx.fillStyle = '#2a221b';
    ctx.strokeStyle = '#d49b58';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(truckX, truckY - 16 * fs, 20 * fs, 24 * fs, [4 * fs, 6 * fs, 2 * fs, 2 * fs]);
    ctx.fill();
    ctx.stroke();

    // Windshield & Headlight
    ctx.fillStyle = 'rgba(215, 235, 255, 0.85)';
    ctx.beginPath();
    ctx.roundRect(truckX + 6 * fs, truckY - 13 * fs, 10 * fs, 9 * fs, 2 * fs);
    ctx.fill();

    // Headlight Beam Glowing Ahead
    ctx.fillStyle = 'rgba(255, 235, 160, 0.35)';
    ctx.beginPath();
    ctx.moveTo(truckX + 20 * fs, truckY);
    ctx.lineTo(truckX + 50 * fs, truckY - 10 * fs);
    ctx.lineTo(truckX + 50 * fs, truckY + 12 * fs);
    ctx.closePath();
    ctx.fill();

    // Spinning Truck Wheels
    const wheelAngle = this.phaseTimer * 0.2;
    [truckX - 14 * fs, truckX + 12 * fs].forEach(wx => {
      ctx.save();
      ctx.translate(wx, truckY + 10 * fs);
      ctx.rotate(wheelAngle);
      ctx.fillStyle = '#120e0b';
      ctx.beginPath();
      ctx.arc(0, 0, 6.5 * fs, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d49b58';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6 * fs, 0); ctx.lineTo(6 * fs, 0);
      ctx.moveTo(0, -6 * fs); ctx.lineTo(0, 6 * fs);
      ctx.stroke();
      ctx.restore();
    });

    // Exhaust Smoke Puffs
    if (this.smokePuffs.length < 8) {
      this.smokePuffs.push({
        x: truckX - 28 * fs,
        y: truckY + 6 * fs,
        r: 2 * fs,
        alpha: 0.7
      });
    }

    this.smokePuffs.forEach((p, idx) => {
      p.x -= 0.8;
      p.y -= 0.3;
      p.r += 0.3;
      p.alpha -= 0.02;
      ctx.fillStyle = `rgba(235, 225, 215, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      if (p.alpha <= 0) this.smokePuffs.splice(idx, 1);
    });

    // Milestone Sign
    ctx.fillStyle = 'rgba(212, 155, 88, 0.9)';
    ctx.font = `600 ${9 * fs}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('➔ AURA ROASTERY ATELIER', fx + 50 * fs, roadY + 25 * fs);

    // Label
    ctx.fillStyle = 'rgba(229, 179, 118, 0.9)';
    ctx.font = `600 ${11 * fs}px Outfit, sans-serif`;
    ctx.fillText('🚚 Mountain Route Direct Sourcing Transit', fx, fy - 180 * fs);

    ctx.restore();
  },

  // --- LEFT PHASE 4: STOREFRONT & ROASTERY ARRIVAL ---
  drawPhase4StorefrontArrival(fx, fy, fs, progress) {
    ctx.save();

    // Roastery Storefront Building Silhouette
    const storeX = fx;
    const storeY = fy + 30 * fs;

    // Building Wall
    ctx.fillStyle = '#221a14';
    ctx.strokeStyle = 'rgba(212, 155, 88, 0.45)';
    ctx.lineWidth = 2 * fs;
    ctx.beginPath();
    ctx.roundRect(storeX - 85 * fs, storeY - 110 * fs, 170 * fs, 115 * fs, 6 * fs);
    ctx.fill();
    ctx.stroke();

    // Striped Awning Over Storefront
    ctx.fillStyle = '#d49b58';
    ctx.beginPath();
    ctx.roundRect(storeX - 90 * fs, storeY - 120 * fs, 180 * fs, 22 * fs, [8 * fs, 8 * fs, 2 * fs, 2 * fs]);
    ctx.fill();

    // Dark stripes on awning
    ctx.fillStyle = '#16120f';
    for (let str = 0; str < 7; str++) {
      ctx.fillRect(storeX - 85 * fs + str * 25 * fs, storeY - 120 * fs, 12 * fs, 22 * fs);
    }

    // Warm Glowing Arched Windows & Door
    const doorX = storeX - 25 * fs;
    const doorY = storeY - 90 * fs;
    const glow = ctx.createLinearGradient(doorX, doorY, doorX, doorY + 80 * fs);
    glow.addColorStop(0, 'rgba(255, 220, 140, 0.85)');
    glow.addColorStop(1, 'rgba(212, 155, 88, 0.6)');
    ctx.fillStyle = glow;

    // Center Double Glass Door
    ctx.beginPath();
    ctx.roundRect(doorX, doorY + 15 * fs, 50 * fs, 75 * fs, [12 * fs, 12 * fs, 0, 0]);
    ctx.fill();
    ctx.strokeStyle = '#120e0b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Brass Lanterns flanking door
    [doorX - 18 * fs, doorX + 68 * fs].forEach(lx => {
      ctx.fillStyle = '#ffe082';
      ctx.beginPath();
      ctx.arc(lx, doorY + 30 * fs, 5 * fs, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d49b58';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Parked Delivery Van in front
    const vanX = storeX + 45 * fs;
    const vanY = storeY + 5 * fs;
    ctx.fillStyle = '#2e241c';
    ctx.beginPath();
    ctx.roundRect(vanX - 35 * fs, vanY - 20 * fs, 48 * fs, 26 * fs, 4 * fs);
    ctx.fill();

    // Delivery Sacks Stacked at Store Doorstep
    for (let sk = 0; sk < 3; sk++) {
      ctx.fillStyle = '#c48b48';
      ctx.strokeStyle = '#1a120b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(storeX - 45 * fs + sk * 10 * fs, storeY + 8 * fs - sk * 4 * fs, 10 * fs, 6 * fs, 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // AURA Roastery Facade Sign
    ctx.fillStyle = '#faf6f0';
    ctx.font = `900 ${11 * fs}px Cinzel, serif`;
    ctx.textAlign = 'center';
    ctx.fillText('AURA ROASTERY & CAFÉ', storeX, storeY - 94 * fs);

    // Label
    ctx.fillStyle = 'rgba(235, 205, 150, 0.9)';
    ctx.font = `600 ${11 * fs}px Outfit, sans-serif`;
    ctx.fillText('🏪 Roastery Door Delivery • Ready to Roast & Brew', fx, fy - 180 * fs);

    ctx.restore();
  }
};



const brewProcessSim = {
  active: true,
  currentPhase: 0, // 0: Grind, 1: Bloom, 2: Extract, 3: Steam/Serve
  phaseTimer: 0,
  phaseDuration: 280, // ~4.6 seconds per phase at 60fps
  phaseNames: [
    'Phase 1: Burr Grinder & Ground Falls',
    'Phase 2: 93°C Kettle Pour & Bloom',
    'Phase 3: Golden Amber Extraction Drip',
    'Phase 4: Velvet Crema & Steam Plume'
  ],

  // Particle Pools for Realism
  grindParticles: [],
  waterParticles: [],
  bloomBubbles: [],
  dripDrops: [],
  ripples: [],
  steamWisps: [],
  burrRotation: 0,

  setPhase(index) {
    this.currentPhase = index % 4;
    this.phaseTimer = 0;
    this.updateHud();
  },

  updateHud() {
    // HUD removed per user request for cleaner layout
  },

  update() {
    if (!this.active) return;

    this.phaseTimer++;
    const progress = this.phaseTimer / this.phaseDuration;

    // Progress Bar Fill in HUD
    const totalProgress = ((this.currentPhase + progress) / 4) * 100;
    const progressFill = document.getElementById('hudProgressFill');
    if (progressFill) progressFill.style.width = `${totalProgress}%`;

    // Phase progression
    if (this.phaseTimer >= this.phaseDuration) {
      this.phaseTimer = 0;
      this.currentPhase = (this.currentPhase + 1) % 4;
      this.updateHud();
    }

    this.burrRotation += 0.05;
  },

  draw(w, h) {
    if (!this.active || (typeof farmHarvestSim !== 'undefined' && farmHarvestSim.viewMode === 'farm')) return;

    ctx.save();
    
    // Position Apparatus gracefully on the Right Wing of the background
    const cx = (w > 1200 && (typeof farmHarvestSim === 'undefined' || farmHarvestSim.viewMode === 'both'))
      ? Math.min(w * 0.89, w - 150)
      : (w > 900 && (typeof farmHarvestSim === 'undefined' || farmHarvestSim.viewMode === 'both'))
        ? Math.min(w * 0.86, w - 130)
        : w * 0.5;
    const cy = h * 0.52;
    const s = Math.min(Math.max(w / 1600, 0.65), 0.95);

    // Background volumetric glow behind apparatus
    const auraGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 280 * s);
    auraGlow.addColorStop(0, 'rgba(212, 155, 88, 0.12)');
    auraGlow.addColorStop(0.6, 'rgba(212, 155, 88, 0.03)');
    auraGlow.addColorStop(1, 'rgba(14, 11, 9, 0)');
    ctx.fillStyle = auraGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, 280 * s, 0, Math.PI * 2);
    ctx.fill();

    // 1. Draw Stand Base & Glass Apparatus (Chemex Beaker)
    this.drawApparatus(cx, cy, s);

    // 2. Render Current Active Brewing Phase Visuals
    const pProg = this.phaseTimer / this.phaseDuration;

    if (this.currentPhase === 0) {
      this.drawPhase1Grind(cx, cy, s, pProg);
    } else if (this.currentPhase === 1) {
      this.drawPhase2Bloom(cx, cy, s, pProg);
    } else if (this.currentPhase === 2) {
      this.drawPhase3Extract(cx, cy, s, pProg);
    } else if (this.currentPhase === 3) {
      this.drawPhase4Serve(cx, cy, s, pProg);
    }

    ctx.restore();
  },

  // Elegant Minimal Glass & Wood Chemex Apparatus
  drawApparatus(cx, cy, s) {
    ctx.save();

    // Base Walnut Wood Platform
    ctx.fillStyle = 'rgba(42, 32, 24, 0.5)';
    ctx.strokeStyle = 'rgba(212, 155, 88, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 100 * s, cy + 150 * s, 200 * s, 14 * s, 6 * s);
    ctx.fill();
    ctx.stroke();

    // Glass Carafe Outline (Lower Bulb + Upper Funnel)
    ctx.strokeStyle = 'rgba(212, 155, 88, 0.4)';
    ctx.fillStyle = 'rgba(25, 20, 16, 0.35)';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    // Top funnel opening
    ctx.moveTo(cx - 75 * s, cy - 90 * s);
    ctx.lineTo(cx + 75 * s, cy - 90 * s);
    // Neck taper
    ctx.lineTo(cx + 22 * s, cy + 10 * s);
    // Lower bowl curve
    ctx.bezierCurveTo(cx + 95 * s, cy + 60 * s, cx + 85 * s, cy + 140 * s, cx + 55 * s, cy + 148 * s);
    // Bottom flat
    ctx.lineTo(cx - 55 * s, cy + 148 * s);
    // Left bowl curve
    ctx.bezierCurveTo(cx - 85 * s, cy + 140 * s, cx - 95 * s, cy + 60 * s, cx - 22 * s, cy + 10 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Wood Waist Collar & Leather Tie
    ctx.fillStyle = 'rgba(180, 115, 60, 0.7)';
    ctx.beginPath();
    ctx.roundRect(cx - 26 * s, cy - 4 * s, 52 * s, 24 * s, 4 * s);
    ctx.fill();
    ctx.strokeStyle = 'rgba(235, 180, 110, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Wood collar button & tie cord
    ctx.fillStyle = '#e5b376';
    ctx.beginPath();
    ctx.arc(cx, cy + 8 * s, 3.5 * s, 0, Math.PI * 2);
    ctx.fill();

    // Paper Filter Cone inside upper funnel
    ctx.fillStyle = 'rgba(245, 237, 224, 0.12)';
    ctx.strokeStyle = 'rgba(245, 237, 224, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 70 * s, cy - 85 * s);
    ctx.lineTo(cx + 70 * s, cy - 85 * s);
    ctx.lineTo(cx, cy + 5 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  },

  // --- PHASE 1: BURR GRINDER & CASCADING GROUNDS ---
  drawPhase1Grind(cx, cy, s, progress) {
    // Upper Burr Grinder Silhouette
    const gy = cy - 200 * s;
    ctx.save();
    
    // Grinder Hopper
    ctx.fillStyle = 'rgba(35, 28, 22, 0.7)';
    ctx.strokeStyle = 'rgba(212, 155, 88, 0.6)';
    ctx.lineWidth = 1.5 * s;
    ctx.beginPath();
    ctx.moveTo(cx - 45 * s, gy - 40 * s);
    ctx.lineTo(cx + 45 * s, gy - 40 * s);
    ctx.lineTo(cx + 18 * s, gy);
    ctx.lineTo(cx - 18 * s, gy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Rotating Burr Teeth
    ctx.save();
    ctx.translate(cx, gy);
    ctx.rotate(this.burrRotation);
    ctx.strokeStyle = '#e5b376';
    ctx.lineWidth = 2;
    for (let a = 0; a < 6; a++) {
      ctx.rotate(Math.PI / 3);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(12 * s, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Falling Coffee Beans into hopper
    for (let b = 0; b < 3; b++) {
      const beanY = gy - 55 * s + ((this.phaseTimer * 2 + b * 40) % 60);
      const beanX = cx + Math.sin(b * 2) * 15 * s;
      ctx.fillStyle = '#a86f38';
      ctx.beginPath();
      ctx.ellipse(beanX, beanY, 5 * s, 3.2 * s, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shower of Fresh Ground Particles (Vortex into Cone)
    if (this.grindParticles.length < 50) {
      this.grindParticles.push({
        x: cx + (Math.random() - 0.5) * 14 * s,
        y: gy + 8 * s,
        vx: (Math.random() - 0.5) * 1.8 * s,
        vy: Math.random() * 3.5 + 2.5,
        size: Math.random() * 2.2 + 1,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    this.grindParticles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // Gravity
      ctx.fillStyle = `rgba(180, 110, 50, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * s, 0, Math.PI * 2);
      ctx.fill();

      // Reset when reaching bottom of filter cone
      if (p.y > cy - 10 * s) {
        this.grindParticles.splice(idx, 1);
      }
    });

    // Growing Ground Bed in the filter cone
    const bedHeight = Math.min(progress * 45, 45) * s;
    ctx.fillStyle = 'rgba(110, 65, 30, 0.85)';
    ctx.beginPath();
    ctx.moveTo(cx - (bedHeight * 0.9), cy - 5 * s - bedHeight);
    ctx.quadraticCurveTo(cx, cy - 2 * s - bedHeight * 1.15, cx + (bedHeight * 0.9), cy - 5 * s - bedHeight);
    ctx.lineTo(cx, cy + 2 * s);
    ctx.closePath();
    ctx.fill();

    // Floating Aromatic Label
    ctx.fillStyle = 'rgba(229, 179, 118, 0.85)';
    ctx.font = `600 ${11 * s}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('⚡ 205μm Specialty Precision Grind', cx, gy - 50 * s);

    ctx.restore();
  },

  // --- PHASE 2: GOOSENECK KETTLE & WATER BLOOM ---
  drawPhase2Bloom(cx, cy, s, progress) {
    ctx.save();

    // Stable Ground Bed
    const bedTop = cy - 48 * s;
    ctx.fillStyle = 'rgba(65, 38, 20, 0.95)'; // Saturated dark coffee bed
    ctx.beginPath();
    ctx.moveTo(cx - 42 * s, bedTop);
    // Swelling Bloom Curve
    const bloomBulge = Math.sin(progress * Math.PI) * 12 * s;
    ctx.quadraticCurveTo(cx, bedTop - bloomBulge, cx + 42 * s, bedTop);
    ctx.lineTo(cx, cy + 2 * s);
    ctx.closePath();
    ctx.fill();

    // Gooseneck Kettle Spout gliding above
    const kettleX = cx - 50 * s + Math.sin(this.phaseTimer * 0.04) * 35 * s;
    const kettleY = cy - 140 * s;

    ctx.strokeStyle = 'rgba(212, 155, 88, 0.9)';
    ctx.lineWidth = 3.5 * s;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(kettleX - 60 * s, kettleY - 30 * s);
    ctx.bezierCurveTo(kettleX - 25 * s, kettleY - 35 * s, kettleX - 10 * s, kettleY - 15 * s, kettleX, kettleY);
    ctx.stroke();

    // Crystal Shimmering 93°C Water Stream
    ctx.strokeStyle = 'rgba(220, 240, 255, 0.75)';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.moveTo(kettleX, kettleY);
    ctx.lineTo(cx + Math.sin(this.phaseTimer * 0.04) * 12 * s, bedTop - bloomBulge * 0.5);
    ctx.stroke();

    // Water Splash Ripples at impact point
    const impactX = cx + Math.sin(this.phaseTimer * 0.04) * 12 * s;
    const impactY = bedTop - bloomBulge * 0.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(impactX, impactY, 8 * s, 3 * s, 0, 0, Math.PI * 2);
    ctx.stroke();

    // CO2 Bloom Bubbles
    if (this.bloomBubbles.length < 18) {
      this.bloomBubbles.push({
        x: cx + (Math.random() - 0.5) * 60 * s,
        y: bedTop + Math.random() * 15 * s,
        vy: -(Math.random() * 0.8 + 0.4),
        r: Math.random() * 4.5 + 2,
        alpha: 0.9
      });
    }

    this.bloomBubbles.forEach((b, idx) => {
      b.y += b.vy;
      b.alpha -= 0.015;
      ctx.fillStyle = `rgba(235, 185, 125, ${b.alpha})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r * s, 0, Math.PI * 2);
      ctx.fill();

      if (b.alpha <= 0) this.bloomBubbles.splice(idx, 1);
    });

    // Steam wisps from hot water
    const steamGrad = ctx.createRadialGradient(cx, bedTop - 30 * s, 5, cx, bedTop - 40 * s, 50 * s);
    steamGrad.addColorStop(0, 'rgba(247, 237, 226, 0.25)');
    steamGrad.addColorStop(1, 'rgba(247, 237, 226, 0)');
    ctx.fillStyle = steamGrad;
    ctx.beginPath();
    ctx.arc(cx, bedTop - 30 * s, 45 * s, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = 'rgba(229, 179, 118, 0.85)';
    ctx.font = `600 ${11 * s}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('💧 93.5°C Kettle Pour • 45s Blooming', cx, kettleY - 20 * s);

    ctx.restore();
  },

  // --- PHASE 3: GOLDEN AMBER EXTRACTION DRIP ---
  drawPhase3Extract(cx, cy, s, progress) {
    ctx.save();

    // Saturated Ground Bed in cone
    ctx.fillStyle = 'rgba(50, 30, 18, 0.95)';
    ctx.beginPath();
    ctx.moveTo(cx - 38 * s, cy - 45 * s);
    ctx.lineTo(cx + 38 * s, cy - 45 * s);
    ctx.lineTo(cx, cy + 3 * s);
    ctx.closePath();
    ctx.fill();

    // Droplets generating from dripper tip (cx, cy + 5*s)
    const dripOriginY = cy + 5 * s;
    const carafeBaseY = cy + 145 * s;
    const currentLiquidHeight = (progress * 55 + 10) * s;
    const liquidSurfaceY = carafeBaseY - currentLiquidHeight;

    // Rhythmic Falling Coffee Drop
    const dripCycle = (this.phaseTimer % 35) / 35; // New drop every 35 frames
    const dropY = dripOriginY + dripCycle * (liquidSurfaceY - dripOriginY);

    // Drip forming at nozzle
    ctx.fillStyle = '#d49b58';
    ctx.beginPath();
    ctx.ellipse(cx, dripOriginY + 3 * s, 3.5 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Falling Drop in mid-air
    ctx.fillStyle = '#e5b376';
    ctx.beginPath();
    ctx.ellipse(cx, dropY, 2.8 * s, 5.5 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Impact Wave Ripples in lower carafe
    if (dripCycle > 0.92 && this.ripples.length < 5) {
      this.ripples.push({ r: 4 * s, alpha: 0.85 });
    }

    this.ripples.forEach((rip, idx) => {
      rip.r += 1.4 * s;
      rip.alpha -= 0.03;
      ctx.strokeStyle = `rgba(229, 179, 118, ${rip.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, liquidSurfaceY, rip.r, rip.r * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();

      if (rip.alpha <= 0) this.ripples.splice(idx, 1);
    });

    // Rising Amber Liquid Body in Carafe
    const liqGrad = ctx.createLinearGradient(cx, liquidSurfaceY, cx, carafeBaseY);
    liqGrad.addColorStop(0, 'rgba(212, 155, 88, 0.85)');
    liqGrad.addColorStop(1, 'rgba(80, 42, 20, 0.95)');
    ctx.fillStyle = liqGrad;

    ctx.beginPath();
    ctx.moveTo(cx - 50 * s, carafeBaseY);
    ctx.lineTo(cx + 50 * s, carafeBaseY);
    ctx.lineTo(cx + 42 * s, liquidSurfaceY);
    ctx.lineTo(cx - 42 * s, liquidSurfaceY);
    ctx.closePath();
    ctx.fill();

    // Liquid surface line
    ctx.strokeStyle = 'rgba(247, 237, 226, 0.7)';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.ellipse(cx, liquidSurfaceY, 42 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Label
    ctx.fillStyle = 'rgba(229, 179, 118, 0.85)';
    ctx.font = `600 ${11 * s}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✨ Pure Golden Extraction Drip (1:16)', cx, cy - 90 * s);

    ctx.restore();
  },

  // --- PHASE 4: VELVET CREMA & STEAMING CUP ---
  drawPhase4Serve(cx, cy, s, progress) {
    ctx.save();

    // Finished Filtered Carafe
    ctx.fillStyle = 'rgba(180, 115, 60, 0.85)';
    ctx.beginPath();
    ctx.roundRect(cx - 48 * s, cy + 90 * s, 96 * s, 55 * s, 8 * s);
    ctx.fill();

    // Artisanal Ceramic Cup in Front
    const cupX = cx + 80 * s;
    const cupY = cy + 110 * s;

    // Cup Body
    ctx.fillStyle = '#221a15';
    ctx.strokeStyle = 'rgba(212, 155, 88, 0.6)';
    ctx.lineWidth = 2 * s;
    ctx.beginPath();
    ctx.roundRect(cupX - 35 * s, cupY, 70 * s, 42 * s, [0, 0, 24 * s, 24 * s]);
    ctx.fill();
    ctx.stroke();

    // Cup Handle
    ctx.beginPath();
    ctx.arc(cupX + 42 * s, cupY + 18 * s, 10 * s, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();

    // Swirling Crema Surface
    ctx.fillStyle = '#d49b58';
    ctx.beginPath();
    ctx.ellipse(cupX, cupY, 32 * s, 9 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Latte Art Swan / Heart Ripple
    ctx.fillStyle = 'rgba(255, 250, 240, 0.9)';
    ctx.beginPath();
    ctx.ellipse(cupX, cupY, 18 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fill();

    // Majestic Billowing Steam Spirals
    const steamTime = this.phaseTimer * 0.05;
    for (let sIdx = 0; sIdx < 3; sIdx++) {
      const offsetX = Math.sin(steamTime + sIdx * 2) * 16 * s;
      const startY = cupY - 15 * s;
      ctx.strokeStyle = `rgba(247, 237, 226, ${0.4 - sIdx * 0.08})`;
      ctx.lineWidth = (4 - sIdx) * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cupX + (sIdx - 1) * 8 * s, startY);
      ctx.bezierCurveTo(
        cupX + offsetX, startY - 40 * s,
        cupX - offsetX, startY - 90 * s,
        cupX + offsetX * 1.5, startY - 150 * s
      );
      ctx.stroke();
    }

    // Label
    ctx.fillStyle = 'rgba(229, 179, 118, 0.85)';
    ctx.font = `600 ${11 * s}px Outfit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('☕ Silky Microfoam & Crema Perfection', cx, cy - 90 * s);

    ctx.restore();
  }
};

// --- Global Animation Loop (Renders Both Left & Right) ---
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw Left Side: Farm Harvest & Seed Delivery
  farmHarvestSim.update();
  farmHarvestSim.draw(canvas.width, canvas.height);

  // 2. Draw Right Side: Coffee Making & Brewing Process
  brewProcessSim.update();
  brewProcessSim.draw(canvas.width, canvas.height);

  // 3. Draw Floating Ambient Steam & Roasted Bean Particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- Interactive HUD & Animation Mode Controls ---
const animToggleBtn = document.getElementById('animToggleBtn');
const brewProcessHud = document.getElementById('brewProcessHud');

if (animToggleBtn) {
  animToggleBtn.addEventListener('click', () => {
    const isNowActive = !(brewProcessSim.active || farmHarvestSim.active);
    brewProcessSim.active = isNowActive;
    farmHarvestSim.active = isNowActive;
    animToggleBtn.classList.toggle('active', isNowActive);
    animToggleBtn.querySelector('.anim-label').textContent = isNowActive ? 'Farm-to-Cup: ON' : 'Farm-to-Cup: OFF';
    showToast(isNowActive ? '✨ Farm-to-Cup Background Animation Activated' : '☕ Switched to Calm Ambient Steam');
  });
}


// ==========================================================================
// 2. WEB AUDIO API COZY CAFÉ SOUNDSCAPE SYNTHESIZER
// ==========================================================================
let audioCtx = null;
let soundNodes = [];

function initAudio() {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
}

function startCafeAmbiance() {
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  // 1. Rain / steam ambient noise (Pink noise filter)
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    output[i] *= 0.04;
    b6 = white * 0.115926;
  }

  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  const lowpass = audioCtx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(450, audioCtx.currentTime);

  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 1.5);

  whiteNoise.connect(lowpass);
  lowpass.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  whiteNoise.start(0);

  // 2. Warm resonant coffeehouse chord (warm mellow drone)
  const freqs = [110, 164.81, 220, 329.63]; // A major 7th mellow chord
  const oscs = freqs.map(freq => {
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    const oscGain = audioCtx.createGain();
    oscGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.02, audioCtx.currentTime + 2);
    osc.connect(oscGain);
    oscGain.connect(audioCtx.destination);
    osc.start();
    return { osc, oscGain };
  });

  soundNodes = [whiteNoise, gainNode, ...oscs];
  state.isAudioPlaying = true;
  document.getElementById('soundToggleBtn').classList.add('playing');
  showToast('🎵 Cozy Café Soundscape playing...');
}

function stopCafeAmbiance() {
  if (!soundNodes.length) return;
  soundNodes.forEach(node => {
    try {
      if (node.gain) {
        node.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      } else if (node.oscGain) {
        node.oscGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      }
    } catch (e) {}
  });

  setTimeout(() => {
    soundNodes.forEach(n => {
      try {
        if (n.stop) n.stop();
        if (n.osc) n.osc.stop();
      } catch (e) {}
    });
    soundNodes = [];
  }, 600);

  state.isAudioPlaying = false;
  document.getElementById('soundToggleBtn').classList.remove('playing');
  showToast('🔇 Café Soundscape muted');
}

document.getElementById('soundToggleBtn').addEventListener('click', () => {
  if (state.isAudioPlaying) {
    stopCafeAmbiance();
  } else {
    startCafeAmbiance();
  }
});

// Chime generator for timer completion
function playTimerChime() {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  } catch(e) {}
}

// ==========================================================================
// 3. INTERACTIVE ROAST EXPLORER & AROMA MATRIX
// ==========================================================================
function setRoast(roastKey) {
  const data = roastData[roastKey];
  if (!data) return;
  state.activeRoast = roastKey;

  // Update Buttons
  document.querySelectorAll('.roast-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.roast === roastKey);
  });

  // Update Text Content
  document.getElementById('roastTag').textContent = data.tag;
  document.getElementById('roastHeading').textContent = data.heading;
  document.getElementById('roastStory').textContent = data.story;
  document.getElementById('roastAltitude').textContent = data.altitude;
  document.getElementById('recBrewMethod').textContent = data.recBrew;
  document.getElementById('roastAddToCartBtn').innerHTML = `<i class="fa-solid fa-plus"></i><span>Order This Bean (250g) • ₹${data.price}</span>`;

  // Update Notes List
  const notesList = document.getElementById('roastNotesList');
  notesList.innerHTML = data.notes.map(note => `<span class="note-pill">${note}</span>`).join('');

  // Update Sensory Meters
  document.getElementById('valAcidity').textContent = `${(data.acidity / 10).toFixed(1)} / 10`;
  document.getElementById('fillAcidity').style.width = `${data.acidity}%`;

  document.getElementById('valBody').textContent = `${(data.body / 10).toFixed(1)} / 10`;
  document.getElementById('fillBody').style.width = `${data.body}%`;

  document.getElementById('valSweetness').textContent = `${(data.sweetness / 10).toFixed(1)} / 10`;
  document.getElementById('fillSweetness').style.width = `${data.sweetness}%`;

  document.getElementById('valDepth').textContent = `${(data.depth / 10).toFixed(1)} / 10`;
  document.getElementById('fillDepth').style.width = `${data.depth}%`;

  // Dynamic Coffee Liquid & Crema Color
  document.getElementById('coffeeLiquid').style.backgroundColor = data.liquidColor;
  document.getElementById('cremaSwirl').style.background = `radial-gradient(ellipse at 40% 50%, ${data.cremaColor} 0%, ${data.liquidColor} 70%, transparent 100%)`;
}

document.querySelectorAll('.roast-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    setRoast(pill.dataset.roast);
  });
});

function addRoastToCart() {
  const data = roastData[state.activeRoast];
  addToCart({
    id: `bean-${state.activeRoast}`,
    name: `${data.heading} (250g Whole Bean)`,
    price: data.price,
    img: data.img
  });
}

// ==========================================================================
// 4. ARTISANAL MENU RENDERING & FILTERING
// ==========================================================================
function renderMenu(category = 'all') {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = '';

  const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <div class="menu-card-media">
        <img src="${item.img}" alt="${item.name}" class="menu-card-img" loading="lazy" />
        <span class="menu-tag-badge">${item.tag}</span>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-header">
          <h3 class="menu-item-title">${item.name}</h3>
          <span class="menu-item-price">₹${item.price}</span>
        </div>
        <p class="menu-item-desc">${item.desc}</p>
        <div class="menu-item-notes">
          ${item.notes.map(n => `<span class="note-chip">${n}</span>`).join('')}
        </div>
        <div class="menu-card-footer">
          <button class="add-to-cart-btn" onclick="addToCartById('${item.id}')">
            <i class="fa-solid fa-plus"></i>
            <span>Add to Cup • ₹${item.price}</span>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.querySelectorAll('.menu-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.category);
  });
});

function addToCartById(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (item) addToCart(item);
}

// ==========================================================================
// 5. SLIDE-OUT CART & CHECKOUT ENGINE
// ==========================================================================
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  renderCart();
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
}

document.getElementById('cartTriggerBtn').addEventListener('click', openCart);

function addToCart(product) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
  }

  // Animate badge bump
  const badge = document.getElementById('cartCountBadge');
  badge.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);

  renderCart();
  showToast(`✨ Added "${product.name}" to your order!`);
}

function updateCartQty(id, delta) {
  const item = state.cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter(i => i.id !== id);
  }

  const badge = document.getElementById('cartCountBadge');
  badge.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(i => i.id !== id);
  const badge = document.getElementById('cartCountBadge');
  badge.textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);
  renderCart();
}

function setOrderType(type) {
  state.orderType = type;
  document.getElementById('typeDineIn').classList.toggle('active', type === 'dine-in');
  document.getElementById('typeTakeaway').classList.toggle('active', type === 'takeaway');
  showToast(`Switched order to ${type === 'dine-in' ? 'Dine In' : 'Takeaway / Pick-up'}`);
}

function setTip(percent) {
  state.tipPercent = percent;
  document.querySelectorAll('.tip-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(`${percent}%`));
  });
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cartItemsList');
  const footer = document.getElementById('cartFooter');

  if (state.cart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-mug-hot"></i>
        <h4>Your cup is empty</h4>
        <p>Explore our single origins and handcrafted viennoiseries to add items to your order.</p>
        <button class="btn btn-outline" onclick="closeCart(); location.href='#menu'">Browse Menu</button>
      </div>
    `;
    footer.style.opacity = '0.5';
    footer.style.pointerEvents = 'none';
    document.getElementById('cartSubtotal').textContent = '₹0';
    document.getElementById('cartTax').textContent = '₹0';
    document.getElementById('cartTipAmount').textContent = '₹0';
    document.getElementById('cartTotal').textContent = '₹0';
    return;
  }

  footer.style.opacity = '1';
  footer.style.pointerEvents = 'auto';

  list.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.img}" alt="${item.name}" class="cart-item-thumb" />
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</span>
        <div class="cart-item-ctrls">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove item">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Computations
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * state.taxRate;
  const tip = subtotal * (state.tipPercent / 100);
  const total = subtotal + tax + tip;

  document.getElementById('cartSubtotal').textContent = `₹${Math.round(subtotal).toLocaleString('en-IN')}`;
  document.getElementById('cartTax').textContent = `₹${Math.round(tax).toLocaleString('en-IN')}`;
  document.getElementById('cartTipAmount').textContent = `₹${Math.round(tip).toLocaleString('en-IN')}`;
  document.getElementById('cartTotal').textContent = `₹${Math.round(total).toLocaleString('en-IN')}`;
}

// Checkout & Confetti Modal
function handleCheckout() {
  if (state.cart.length === 0) return;

  const orderNum = Math.floor(1000 + Math.random() * 9000);
  document.getElementById('ticketNumber').textContent = orderNum;

  const total = document.getElementById('cartTotal').textContent;
  document.getElementById('ticketTotalAmount').textContent = total;

  const ticketItems = document.getElementById('ticketItemsList');
  ticketItems.innerHTML = state.cart.map(i => `
    <div>• ${i.qty}x ${i.name} (₹${(i.price * i.qty).toLocaleString('en-IN')})</div>
  `).join('');

  closeCart();
  document.getElementById('orderModalOverlay').classList.add('active');

  // Trigger celebration sound & confetti
  playTimerChime();
  launchConfetti();

  // Reset cart
  state.cart = [];
  document.getElementById('cartCountBadge').textContent = '0';
}

function closeOrderModal() {
  document.getElementById('orderModalOverlay').classList.remove('active');
}

// Confetti Particle Explosion
function launchConfetti() {
  const cCanvas = document.getElementById('confettiCanvas');
  const cCtx = cCanvas.getContext('2d');
  cCanvas.width = cCanvas.offsetWidth;
  cCanvas.height = cCanvas.offsetHeight;

  const pieces = [];
  const colors = ['#d49b58', '#e5b376', '#faf6f0', '#4ade80', '#e07a5f'];

  for (let i = 0; i < 70; i++) {
    pieces.push({
      x: cCanvas.width / 2,
      y: cCanvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      alpha: 1
    });
  }

  function renderConfetti() {
    cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
    let activePieces = 0;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // Gravity
      p.rotation += p.rotSpeed;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        activePieces++;
        cCtx.save();
        cCtx.globalAlpha = p.alpha;
        cCtx.translate(p.x, p.y);
        cCtx.rotate(p.rotation);
        cCtx.fillStyle = p.color;
        cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        cCtx.restore();
      }
    });

    if (activePieces > 0) {
      requestAnimationFrame(renderConfetti);
    }
  }
  renderConfetti();
}

// ==========================================================================
// 6. INTERACTIVE BREW LAB CALCULATOR & EXTRACTION TIMER
// ==========================================================================
function updateBrewSpecs() {
  const method = brewMethods[state.activeBrewMethod];
  const dose = state.coffeeDose;
  const targetWater = Math.round(dose * method.ratio);

  document.getElementById('doseDisplay').textContent = dose;
  document.getElementById('targetWaterDisplay').textContent = `${targetWater} ml`;
  document.getElementById('waterTempDisplay').textContent = method.temp;
  document.getElementById('grindSizeDisplay').textContent = method.grind;
  document.getElementById('targetTimeDisplay').textContent = method.time;

  state.timerTarget = method.seconds;
  if (!state.timerRunning) {
    resetTimer();
  }
}

document.querySelectorAll('.brew-method-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.brew-method-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.activeBrewMethod = btn.dataset.method;
    updateBrewSpecs();
  });
});

const doseSlider = document.getElementById('doseSlider');
doseSlider.addEventListener('input', (e) => {
  state.coffeeDose = parseInt(e.target.value, 10);
  updateBrewSpecs();
});

// Timer Logic
const timerDisplay = document.getElementById('timerDisplay');
const timerRingFill = document.getElementById('timerRingFill');
const timerPhaseBadge = document.getElementById('timerPhaseBadge');
const instructionStep = document.getElementById('instructionStep');
const instructionText = document.getElementById('instructionText');
const timerStartBtn = document.getElementById('timerStartBtn');
const timerPauseBtn = document.getElementById('timerPauseBtn');
const timerResetBtn = document.getElementById('timerResetBtn');

const circumference = 2 * Math.PI * 95; // r=95
timerRingFill.style.strokeDasharray = `${circumference} ${circumference}`;
timerRingFill.style.strokeDashoffset = 0;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function updateTimerStep() {
  const method = brewMethods[state.activeBrewMethod];
  let accumulated = 0;
  let activeStep = method.steps[0];

  for (let i = 0; i < method.steps.length; i++) {
    accumulated += method.steps[i].duration;
    if (state.timerTime <= accumulated) {
      activeStep = method.steps[i];
      break;
    }
  }

  instructionStep.textContent = activeStep.step;
  instructionText.textContent = activeStep.text;

  if (state.timerTime >= state.timerTarget) {
    timerPhaseBadge.textContent = 'Extraction Complete!';
    instructionStep.textContent = 'Pour & Savor';
    instructionText.textContent = 'Swirl your cup to aerate and enjoy the multi-layered floral notes and velvety sweetness.';
  } else if (state.timerTime < 45) {
    timerPhaseBadge.textContent = 'Blooming Phase';
  } else {
    timerPhaseBadge.textContent = 'Main Pour Phase';
  }
}

function startTimer() {
  if (state.timerRunning) return;
  state.timerRunning = true;
  timerStartBtn.disabled = true;
  timerPauseBtn.disabled = false;

  state.timerInterval = setInterval(() => {
    state.timerTime++;
    timerDisplay.textContent = formatTime(state.timerTime);

    // Progress circle fill
    const progress = Math.min(state.timerTime / state.timerTarget, 1);
    const offset = circumference - (progress * circumference);
    timerRingFill.style.strokeDashoffset = offset;

    updateTimerStep();

    if (state.timerTime >= state.timerTarget) {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      timerStartBtn.disabled = false;
      timerPauseBtn.disabled = true;
      playTimerChime();
      showToast('☕ Coffee Extraction Complete! Enjoy your brew.');
    }
  }, 1000);
}

function pauseTimer() {
  if (!state.timerRunning) return;
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  timerStartBtn.disabled = false;
  timerPauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(state.timerInterval);
  state.timerRunning = false;
  state.timerTime = 0;
  timerDisplay.textContent = '00:00';
  timerRingFill.style.strokeDashoffset = circumference;
  timerStartBtn.disabled = false;
  timerPauseBtn.disabled = true;
  timerPhaseBadge.textContent = 'Ready to Bloom';
  
  const method = brewMethods[state.activeBrewMethod];
  instructionStep.textContent = method.steps[0].step;
  instructionText.textContent = method.steps[0].text;
}

timerStartBtn.addEventListener('click', startTimer);
timerPauseBtn.addEventListener('click', pauseTimer);
timerResetBtn.addEventListener('click', resetTimer);

// ==========================================================================
// 7. INTERACTIVE TABLE RESERVATION
// ==========================================================================
// Auto set reservation date to today
const dateInput = document.getElementById('resDate');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.min = today;

// Time slot buttons
document.querySelectorAll('.time-slot-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Seating zones
document.querySelectorAll('.zone-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.zone-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

function handleReservationSubmit(e) {
  e.preventDefault();

  const guests = document.getElementById('resGuests').value;
  const date = document.getElementById('resDate').value;
  const activeTimeBtn = document.querySelector('.time-slot-btn.active');
  const time = activeTimeBtn ? activeTimeBtn.dataset.time : '09:30 AM';
  const activeZoneCard = document.querySelector('.zone-card.active');
  const zone = activeZoneCard ? activeZoneCard.dataset.zone : 'Sunlit Window Nook';
  const name = document.getElementById('resName').value;
  const email = document.getElementById('resEmail').value;
  const notes = document.getElementById('resNotes').value || 'No special requests';

  const ticketContent = document.getElementById('resTicketContent');
  ticketContent.innerHTML = `
    <div class="ticket-header">
      <span>RESERVATION #AURA-RES-${Math.floor(100 + Math.random() * 900)}</span>
      <span class="ticket-badge">CONFIRMED</span>
    </div>
    <div style="font-size: 0.95rem; margin-bottom: 10px; color: var(--gold-light);">
      <strong>Guest:</strong> ${name} (${guests} Guest${guests > 1 ? 's' : ''})
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 8px;">
      <i class="fa-regular fa-calendar"></i> <strong>Date & Time:</strong> ${date} at ${time}
    </div>
    <div style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 8px;">
      <i class="fa-solid fa-couch"></i> <strong>Atmosphere:</strong> ${zone}
    </div>
    <div style="font-size: 0.82rem; color: var(--text-muted);">
      <i class="fa-regular fa-envelope"></i> Confirmation sent to: ${email}
    </div>
  `;

  document.getElementById('reservationModalOverlay').classList.add('active');
  playTimerChime();
  showToast(`🎉 Reservation confirmed for ${name}!`);
}

function closeReservationModal() {
  document.getElementById('reservationModalOverlay').classList.remove('active');
}

// ==========================================================================
// 8. REVIEWS CAROUSEL ROTATION
// ==========================================================================
const reviewsTrack = document.getElementById('reviewsTrack');
const dots = document.querySelectorAll('.carousel-dots .dot');
let currentReview = 0;
const totalReviews = 3;

function goToReview(index) {
  currentReview = index;
  reviewsTrack.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToReview(parseInt(dot.dataset.index, 10));
  });
});

setInterval(() => {
  currentReview = (currentReview + 1) % totalReviews;
  goToReview(currentReview);
}, 6000);

// ==========================================================================
// 9. VIP NEWSLETTER & TOAST UTILITY
// ==========================================================================
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('vipEmail').value;
  showToast(`🎁 Welcome to AURA Club! 15% promo code sent to ${email}`);
  document.getElementById('vipEmail').value = '';
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-mug-hot"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ==========================================================================
// 10. SCROLL REVEAL & HEADER STICKY BEHAVIOR
// ==========================================================================
const observerOptions = {
  root: null,
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
  scrollObserver.observe(el);
});

// Header scroll styling
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile menu drawer
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileDrawerClose = document.getElementById('mobileDrawerClose');

mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
mobileDrawerClose.addEventListener('click', () => mobileDrawer.classList.remove('open'));
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => mobileDrawer.classList.remove('open'));
});

// Live roastery open/closed status clock
function updateLiveStatus() {
  const now = new Date();
  const hour = now.getHours();
  const textEl = document.getElementById('liveStatusText');
  
  if (hour >= 7 && hour < 21) {
    textEl.textContent = 'Brew Bar Open • Roasting Batch #428 Fresh Today';
  } else {
    textEl.textContent = 'Brew Bar Closed • Reopening at 7:00 AM Tomorrow';
  }
}
updateLiveStatus();

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  renderMenu('all');
  setRoast('ethiopia');
  updateBrewSpecs();
  resetTimer();
});

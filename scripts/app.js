// ========================================
// Valentine App - Main Application
// ========================================

class ValentineApp {
  constructor() {
    this.state = {
      currentPage: 'question',
      noButtonAttempts: 0,
      celebrationActive: false
    };

    this.pageManager = null;
    this.noButtonController = null;
    this.yesButtonController = null;
    this.particleSystem = null;
    this.celebrationController = null;
  }

  init() {
    // Initialize all controllers
    this.pageManager = new PageManager();
    this.noButtonController = new NoButtonController(this);
    this.yesButtonController = new YesButtonController(this);
    this.particleSystem = new ParticleSystem();

    // Start background particle effects
    this.particleSystem.start();

    console.log('💙 Valentine App initialized!');
  }

  transitionToCelebration() {
    this.state.currentPage = 'celebration';
    this.state.celebrationActive = true;

    // Stop question page particles
    this.particleSystem.stop();

    // Show celebration page
    this.pageManager.showCelebration();

    // Start celebration effects
    this.celebrationController = new CelebrationController();
    this.celebrationController.start();
  }
}

// ========================================
// Page Manager - Handles page transitions
// ========================================

class PageManager {
  constructor() {
    this.questionPage = document.getElementById('question-page');
    this.celebrationPage = document.getElementById('celebration-page');
  }

  showQuestion() {
    this.questionPage.classList.add('page--active');
    this.celebrationPage.classList.remove('page--active');
  }

  showCelebration() {
    this.questionPage.classList.remove('page--active');
    this.celebrationPage.classList.add('page--active');
  }
}

// ========================================
// No Button Controller - Evasion Logic
// ========================================

class NoButtonController {
  constructor(app) {
    this.app = app;
    this.button = document.getElementById('no-btn');
    this.quoteDisplay = document.getElementById('quote-display');
    this.attempts = 0;

    this.quotes = [
      "Nah, I'd win... and you'd say YES! 😏",
      "俺は最強だから、君も「YES」と言うべき！💪",
      "Domain Expansion: Unlimited Loneliness if you click No 😢",
      "領域展開・無量空処... 愛で満たす！💙",
      "My Six Eyes can see you trying to click this 👀",
      "六眼で見える：君の答えは「YES」だけ ✨",
      "Even Sukuna said YES faster than you! 😤",
      "Red + Blue = Purple... and Purple = You saying YES! 💜",
      "呪力200%：このボタンから逃げられない！🛡️",
      "I'm the strongest... at convincing you! Just click YES 💪",
      "This button has 200% Cursed Energy Protection 🛡️",
      "無下限呪術発動：君から逃げられない ∞",
      "Mahito could shapeshift better than this button dodges! 🏃",
      "STOP! You violated the law of my domain! Click YES instead ⚖️",
      "やれやれ... まだ諦めないの？😑",
      "Infinity activated: Distance between you and 'No' = ∞",
      "My Limitless won't let you be limitlessly wrong 🚫",
      "天上天下唯我独尊... 君だけが特別！💙",
      "You're making me use 0.2 seconds of my patience... 😑",
      "Gojo-sensei says: Wrong answer, try again! 📚",
      "五条悟が言う：YESを押して！📚",
      "This is getting embarrassing for both of us... just say YES 🙈",
      "もう諦めて！君の運命はYESだよ 🎯",
      "I removed your ability to click 'No' - Idle Transfiguration! ✨",
      "無限の彼方へ... 一緒に行こう？💫"
    ];

    this.isMoving = false;
    this.currentQuoteTimeout = null;

    this.init();
  }

  init() {
    // Mouse move detection for progressive evasion
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e), { passive: true });

    // Touch events for mobile
    this.button.addEventListener('touchstart', (e) => this.handleTouch(e));
    this.button.addEventListener('touchmove', (e) => this.handleTouch(e));

    // Click prevention
    this.button.addEventListener('click', (e) => this.preventClick(e));
    this.button.addEventListener('mousedown', (e) => this.preventClick(e));

    // Hover evasion
    this.button.addEventListener('mouseenter', () => this.evadeButton());
  }

  handleMouseMove(e) {
    if (this.app.state.currentPage !== 'question' || this.isMoving) return;

    const buttonRect = this.button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const distance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);
    const detectionRadius = this.getDetectionRadius();

    if (distance < detectionRadius) {
      this.evadeButton(e.clientX, e.clientY);
    }
  }

  handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.evadeButton(touch.clientX, touch.clientY);
  }

  preventClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.evadeButton();
    return false;
  }

  evadeButton(cursorX = null, cursorY = null) {
    if (this.isMoving) return;

    this.isMoving = true;
    this.attempts++;
    this.app.state.noButtonAttempts = this.attempts;

    // Move button to new position
    this.moveButton(cursorX, cursorY);

    // Update button size and opacity
    this.updateButtonAppearance();

    // Show random quote
    this.showQuote();

    // Reset moving flag
    setTimeout(() => {
      this.isMoving = false;
    }, 300);
  }

  moveButton(cursorX, cursorY) {
    const container = this.button.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = this.button.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    let newX, newY;

    if (cursorX !== null && cursorY !== null) {
      // Move away from cursor
      const minDistance = this.getDetectionRadius();
      let attempts = 0;
      const maxAttempts = 20;

      do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;

        const distance = Math.hypot(
          (containerRect.left + newX + buttonRect.width / 2) - cursorX,
          (containerRect.top + newY + buttonRect.height / 2) - cursorY
        );

        if (distance > minDistance || attempts >= maxAttempts) {
          break;
        }

        attempts++;
      } while (attempts < maxAttempts);
    } else {
      // Random position
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;
    }

    // Apply position
    this.button.style.left = `${newX}px`;
    this.button.style.top = `${newY}px`;
  }

  updateButtonAppearance() {
    // Remove previous size classes
    this.button.classList.remove('size-75', 'size-50', 'size-25', 'invisible');

    // Progressive shrinking based on attempts
    if (this.attempts >= 12) {
      this.button.classList.add('invisible');
    } else if (this.attempts >= 9) {
      this.button.classList.add('size-25');
    } else if (this.attempts >= 6) {
      this.button.classList.add('size-50');
    } else if (this.attempts >= 3) {
      this.button.classList.add('size-75');
    }
  }

  getDetectionRadius() {
    // Progressive difficulty - detection radius increases
    if (this.attempts >= 12) return 200;
    if (this.attempts >= 9) return 150;
    if (this.attempts >= 6) return 120;
    if (this.attempts >= 3) return 100;
    return 80;
  }

  showQuote() {
    // Clear existing timeout
    if (this.currentQuoteTimeout) {
      clearTimeout(this.currentQuoteTimeout);
    }

    // Get random quote
    const quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

    // Display quote
    this.quoteDisplay.textContent = quote;
    this.quoteDisplay.classList.add('active');

    // Hide after 2 seconds
    this.currentQuoteTimeout = setTimeout(() => {
      this.quoteDisplay.classList.remove('active');
    }, 2000);
  }
}

// ========================================
// Yes Button Controller
// ========================================

class YesButtonController {
  constructor(app) {
    this.app = app;
    this.button = document.getElementById('yes-btn');
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => this.handleClick());
  }

  handleClick() {
    // Trigger domain expansion effect
    this.triggerDomainExpansion();

    // Transition to celebration after animation
    setTimeout(() => {
      this.app.transitionToCelebration();
    }, 600);
  }

  triggerDomainExpansion() {
    // Add ripple effect to button
    this.button.style.transform = 'scale(1.2)';
    setTimeout(() => {
      this.button.style.transform = 'scale(1)';
    }, 300);
  }
}

// ========================================
// Particle System - Background Effects
// ========================================

class ParticleSystem {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;

    // Resize canvas to full screen
    if (this.canvas) {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    if (!this.ctx || this.isRunning) return;

    this.isRunning = true;
    this.createParticles();
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  createParticles() {
    const particleCount = window.innerWidth < 768 ? 15 : 25;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#00D9FF' : '#8B00FF'
      });
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// ========================================
// Celebration Controller
// ========================================

class CelebrationController {
  constructor() {
    this.domainExpansion = document.getElementById('domain-expansion');
    this.heartsContainer = document.getElementById('hearts-container');
    this.cursorCanvas = document.getElementById('cursor-trail-canvas');
    this.cursorCtx = this.cursorCanvas ? this.cursorCanvas.getContext('2d') : null;

    this.fallingHeartsInterval = null;
    this.cursorTrail = [];
    this.cursorAnimationId = null;

    if (this.cursorCanvas) {
      this.cursorCanvas.width = window.innerWidth;
      this.cursorCanvas.height = window.innerHeight;
    }
  }

  start() {
    this.domainExpansionAnimation();
    this.startFallingHearts();
    this.enableClickHearts();
    this.startCursorTrail();
  }

  domainExpansionAnimation() {
    this.domainExpansion.classList.add('active');

    // Remove after animation completes
    setTimeout(() => {
      this.domainExpansion.classList.remove('active');
    }, 2000);
  }

  startFallingHearts() {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.textContent = Math.random() > 0.5 ? '💙' : '❤️';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = '-50px';

      const duration = Math.random() * 3 + 4;
      heart.style.animationDuration = `${duration}s`;

      this.heartsContainer.appendChild(heart);

      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    };

    // Create hearts periodically
    this.fallingHeartsInterval = setInterval(createHeart, 500);

    // Initial burst
    for (let i = 0; i < 10; i++) {
      setTimeout(createHeart, i * 100);
    }
  }

  enableClickHearts() {
    document.addEventListener('click', (e) => {
      this.burstHeartsAtPosition(e.clientX, e.clientY);
    });
  }

  burstHeartsAtPosition(x, y) {
    const heartCount = Math.floor(Math.random() * 5) + 8;

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart burst';
      heart.textContent = Math.random() > 0.5 ? '💙' : '❤️';

      // Random angle for radial burst
      const angle = (Math.PI * 2 * i) / heartCount;
      const distance = Math.random() * 100 + 50;
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;

      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      this.heartsContainer.appendChild(heart);

      // Animate to target position
      setTimeout(() => {
        heart.style.transform = `translate(${targetX - x}px, ${targetY - y}px) scale(2)`;
      }, 10);

      // Remove after animation
      setTimeout(() => {
        heart.remove();
      }, 500);
    }
  }

  startCursorTrail() {
    if (!this.cursorCtx) return;

    document.addEventListener('mousemove', (e) => {
      this.cursorTrail.push({
        x: e.clientX,
        y: e.clientY,
        size: 8,
        opacity: 1,
        color: '#00D9FF'
      });

      // Limit trail length
      if (this.cursorTrail.length > 15) {
        this.cursorTrail.shift();
      }
    }, { passive: true });

    this.animateCursorTrail();
  }

  animateCursorTrail() {
    if (!this.cursorCtx) return;

    this.cursorCtx.clearRect(0, 0, this.cursorCanvas.width, this.cursorCanvas.height);

    // Update and draw trail particles
    this.cursorTrail.forEach((particle, index) => {
      particle.opacity -= 0.05;
      particle.size -= 0.3;

      if (particle.opacity <= 0 || particle.size <= 0) {
        this.cursorTrail.splice(index, 1);
        return;
      }

      this.cursorCtx.beginPath();
      this.cursorCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.cursorCtx.fillStyle = particle.color;
      this.cursorCtx.globalAlpha = particle.opacity;
      this.cursorCtx.shadowBlur = 20;
      this.cursorCtx.shadowColor = particle.color;
      this.cursorCtx.fill();
    });

    this.cursorCtx.globalAlpha = 1;
    this.cursorCtx.shadowBlur = 0;

    this.cursorAnimationId = requestAnimationFrame(() => this.animateCursorTrail());
  }
}

// ========================================
// Initialize App on DOM Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const app = new ValentineApp();
  app.init();
});

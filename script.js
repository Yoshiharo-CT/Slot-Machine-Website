/*=========================================================
    PROGRAMMING LANGUAGE SYMBOLS
=========================================================*/

const symbols = [
  {
    name: "Python",
    image: "python.jpg",
  },

  {
    name: "Java",
    image: "java.png",
  },

  {
    name: "PHP",
    image: "php.jpg",
  },

  {
    name: "C#",
    image: "csharp.png",
  },

  {
    name: "TypeScript",
    image: "typescript.png",
  },
];

/*=========================================================
    GAME VARIABLES
=========================================================*/

let coins = 1000;

let bet = 50;

let totalSpins = 0;

let wins = 0;

let losses = 0;

let highestWin = 0;

let jackpots = 0;

let totalWon = 0;

let spinning = false;

let autoSpin = null;

let spinIntervals = {};

/*=========================================================
    REEL SETTINGS
=========================================================*/

// Get symbol height dynamically based on viewport
function getSymbolHeight() {
  const w = window.innerWidth;
  if (w <= 380) return Math.min(Math.max(78, (23 * w) / 100), 92);
  if (w <= 480) return Math.min(Math.max(92, (26 * w) / 100), 110);
  if (w <= 820) return 120;
  if (w <= 1100) return 140;
  return 160;
}

let SYMBOL_HEIGHT = getSymbolHeight();

const REEL_SYMBOLS = 35;

// --- Audio setup ---
const spinSound = new Audio("electric-slot-machine.mp3");
const winSound = new Audio("coin-win.wav");
const jackpotSound = new Audio("jackpot.mp3");

// Preload sounds (optional)
spinSound.load();
winSound.load();
jackpotSound.load();

/*=========================================================
    DOM ELEMENTS
=========================================================*/

const reel1 = document.getElementById("slot1");
const reel2 = document.getElementById("slot2");
const reel3 = document.getElementById("slot3");

const reels = [reel1, reel2, reel3];

const spinButton = document.getElementById("spinButton");

const autoSpinButton = document.getElementById("autoSpin");

const resetButton = document.getElementById("resetGame");

const increaseBet = document.getElementById("increaseBet");

const decreaseBet = document.getElementById("decreaseBet");

const resultMessage = document.getElementById("resultMessage");

// Mobile stats
const coinsDisplay = document.getElementById("coins");
const betDisplay = document.getElementById("betValue");
const winRateDisplay = document.getElementById("winRate");

// Desktop stats
const coinsDesktop = document.getElementById("coinsDesktop");
const betDesktop = document.getElementById("betDesktop");
const winRateDesktop = document.getElementById("winRateDesktop");
const betDisplayDesktop = document.getElementById("betDisplay");

// Statistics
const totalSpinsDisplay = document.getElementById("totalSpins");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");
const highestWinDisplay = document.getElementById("highestWin");

/*=========================================================
    RANDOM SYMBOL
=========================================================*/

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

/*=========================================================
    BUILD REEL
=========================================================*/

function buildReel(reel) {
  reel.innerHTML = "";

  const h = getSymbolHeight();

  for (let i = 0; i < REEL_SYMBOLS; i++) {
    const symbol = randomSymbol();

    const item = document.createElement("div");

    item.className = "reel-symbol";

    item.dataset.name = symbol.name;

    item.style.height = h + "px";

    item.innerHTML = `

            <img
                src="${symbol.image}"
                alt="${symbol.name}"
            >

        `;

    reel.appendChild(item);
  }
}

/*=========================================================
    BUILD ALL REELS
=========================================================*/

function initializeReels() {
  SYMBOL_HEIGHT = getSymbolHeight();

  reels.forEach((reel) => {
    buildReel(reel);
  });
}

/*=========================================================
    UPDATE UI
=========================================================*/

function updateUI() {
  const coinValue = coins;
  const betValue = bet;
  const rate = totalSpins === 0 ? 0 : ((wins / totalSpins) * 100).toFixed(1);

  // Mobile stats
  coinsDisplay.textContent = coinValue;
  betDisplay.textContent = betValue;
  winRateDisplay.textContent = rate + "%";

  // Desktop stats
  coinsDesktop.textContent = coinValue;
  betDesktop.textContent = betValue;
  winRateDesktop.textContent = rate + "%";
  betDisplayDesktop.textContent = betValue;

  // Statistics
  totalSpinsDisplay.textContent = totalSpins;
  winsDisplay.textContent = wins;
  lossesDisplay.textContent = losses;
  highestWinDisplay.textContent = highestWin;
}

/*=========================================================
    SAVE GAME
=========================================================*/

function saveGame() {
  const save = {
    coins,

    bet,

    totalSpins,

    wins,

    losses,

    highestWin,

    jackpots,

    totalWon,
  };

  localStorage.setItem(
    "codespin",

    JSON.stringify(save),
  );
}

/*=========================================================
    LOAD GAME
=========================================================*/

function loadGame() {
  const save = JSON.parse(localStorage.getItem("codespin"));

  if (!save) return;

  coins = save.coins;

  bet = save.bet;

  totalSpins = save.totalSpins;

  wins = save.wins;

  losses = save.losses;

  highestWin = save.highestWin;

  jackpots = save.jackpots || 0;

  totalWon = save.totalWon || 0;
}

/*=========================================================
    RESET GAME
=========================================================*/

function resetGame() {
  coins = 1000;

  bet = 50;

  totalSpins = 0;

  wins = 0;

  losses = 0;

  highestWin = 0;

  jackpots = 0;

  totalWon = 0;

  // Stop any playing audio
  spinSound.pause();
  spinSound.currentTime = 0;
  winSound.pause();
  winSound.currentTime = 0;
  jackpotSound.pause();
  jackpotSound.currentTime = 0;

  localStorage.removeItem("codespin");

  updateUI();

  initializeReels();

  resultMessage.innerHTML = "🎰 Press <strong>SPIN</strong> to Start!";
}

/*=========================================================
    BET CONTROLS
=========================================================*/

increaseBet.onclick = () => {
  if (bet < 500) {
    bet += 50;

    updateUI();

    saveGame();
  }
};

decreaseBet.onclick = () => {
  if (bet > 50) {
    bet -= 50;

    updateUI();

    saveGame();
  }
};

/*=========================================================
    INITIALIZE GAME
=========================================================*/

loadGame();

initializeReels();

updateUI();

resultMessage.innerHTML =
  "🎰 Welcome to <strong>CodeSpin</strong><br>Press SPIN to begin!";

/*=========================================================
    CREATE ONE SYMBOL
=========================================================*/

function createSymbol(symbol) {
  const div = document.createElement("div");

  div.className = "reel-symbol";

  div.dataset.name = symbol.name;

  const h = getSymbolHeight();
  div.style.height = h + "px";

  div.innerHTML = `

        <img src="${symbol.image}"
             alt="${symbol.name}">

    `;

  return div;
}

/*=========================================================
    RESET REEL POSITION
=========================================================*/

function resetReel(reel) {
  reel.style.transition = "none";

  reel.style.transform = "translateY(0px)";
}

/*=========================================================
    PREPARE REEL
=========================================================*/

function prepareReel(reel) {
  reel.innerHTML = "";

  const h = getSymbolHeight();

  for (let i = 0; i < REEL_SYMBOLS; i++) {
    const el = createSymbol(randomSymbol());
    el.style.height = h + "px";
    reel.appendChild(el);
  }
}

/*=========================================================
    SET FINAL SYMBOL
=========================================================*/

function setWinningSymbol(reel, symbol) {
  const children = reel.children;

  const centerIndex = 24;

  children[centerIndex].dataset.name = symbol.name;

  children[centerIndex].innerHTML = `

        <img src="${symbol.image}"
             alt="${symbol.name}">

    `;
}

/*=========================================================
    SPIN ONE REEL
=========================================================*/

function spinReel(
  reel,

  finalSymbol,

  duration,
  easing = "cubic-bezier(.18,.85,.22,1)",
) {
  prepareReel(reel);

  setWinningSymbol(
    reel,

    finalSymbol,
  );

  resetReel(reel);

  void reel.offsetHeight;

  reel.parentElement.classList.add("spinning");

  const h = getSymbolHeight();

  const distance = -(24 * h);

  reel.style.transition = `transform ${duration}ms ${easing}`;

  reel.style.transform = `translateY(${distance}px)`;
}

/*=========================================================
    SPIN GAME
=========================================================*/

function spin() {
  if (spinning) return;

  if (coins < bet) {
    resultMessage.className = "result lose";

    resultMessage.innerHTML = "❌ Not enough coins!";

    return;
  }

  // Play spin sound (restart if already playing)
  spinSound.currentTime = 0;
  spinSound.play().catch((e) => console.log("Spin audio error:", e));

  spinning = true;

  coins -= bet;

  totalSpins++;

  updateUI();

  resultMessage.className = "result";

  resultMessage.innerHTML = "🎰 Spinning...";

  const finalOne = randomSymbol();

  const finalTwo = randomSymbol();

  const finalThree = randomSymbol();

  // --- 5-second spin with dramatic slow-down on reel 3 ---
  spinReel(
    reel1,

    finalOne,

    1000,
  );

  spinReel(
    reel2,

    finalTwo,

    2000,
  );

  spinReel(
    reel3,

    finalThree,

    5000,
    "cubic-bezier(.05, .85, .0, 1)",
  );

  setTimeout(() => {
    reel1.parentElement.classList.remove("spinning");

    reel1.parentElement.classList.add("stop");
  }, 1000);

  setTimeout(() => {
    reel2.parentElement.classList.remove("spinning");

    reel2.parentElement.classList.add("stop");
  }, 2000);

  setTimeout(() => {
    reel3.parentElement.classList.remove("spinning");

    reel3.parentElement.classList.add("stop");

    checkWin(
      finalOne,

      finalTwo,

      finalThree,
    );

    spinning = false;

    saveGame();
  }, 5000);
}

/*=========================================================
    BUTTON EVENTS
=========================================================*/

spinButton.onclick = spin;

resetButton.onclick = resetGame;

/*=========================================================
    CHECK WIN
=========================================================*/

function checkWin(symbol1, symbol2, symbol3) {
  const slots = document.querySelectorAll(".slot");

  slots.forEach((slot) => {
    slot.classList.remove("winner");

    slot.classList.remove("jackpot");

    slot.classList.remove("stop");
  });

  let reward = 0;

  let message = "";

  if (symbol1.name === symbol2.name && symbol2.name === symbol3.name) {
    reward = bet * 5;

    wins++;

    jackpots++;

    coins += reward;

    totalWon += reward;

    highestWin = Math.max(highestWin, reward);

    message = `

                    🎉 JACKPOT!<br>

                    ${symbol1.name} × 3<br>

                    +${reward} Coins

                `;

    slots.forEach((slot) => {
      slot.classList.add("winner");

      slot.classList.add("jackpot");
    });

    resultMessage.className = "result jackpot";

    jackpotSound.currentTime = 0;
    jackpotSound.play().catch((e) => console.log("Jackpot audio error:", e));
  } else if (
    symbol1.name === symbol2.name ||
    symbol1.name === symbol3.name ||
    symbol2.name === symbol3.name
  ) {
    reward = bet * 2;

    wins++;

    coins += reward;

    totalWon += reward;

    highestWin = Math.max(highestWin, reward);

    const match = findMatchingName(
      symbol1,

      symbol2,

      symbol3,
    );

    message = `

                    ✅ Match!

                    <br>

                    ${match}

                    <br>

                    +${reward} Coins

                `;

    slots.forEach((slot) => {
      slot.classList.add("winner");
    });

    resultMessage.className = "result win";

    winSound.currentTime = 0;
    winSound.play().catch((e) => console.log("Win audio error:", e));
  } else {
    losses++;

    message = `

                    ❌ No Match

                    <br>

                    Better luck next spin!

                `;

    resultMessage.className = "result lose";
  }

  resultMessage.innerHTML = message;

  updateUI();
}

/*=========================================================
    FIND MATCHING NAME
=========================================================*/

function findMatchingName(a, b, c) {
  if (a.name === b.name) {
    return a.name;
  }

  if (a.name === c.name) {
    return a.name;
  }

  if (b.name === c.name) {
    return b.name;
  }

  return "";
}

/*=========================================================
    REMOVE WIN EFFECT
=========================================================*/

function clearEffects() {
  document
    .querySelectorAll(".slot")

    .forEach((slot) => {
      slot.classList.remove(
        "winner",

        "jackpot",

        "stop",
      );
    });
}

/*=========================================================
    AUTO SPIN
=========================================================*/

autoSpinButton.onclick = function () {
  if (autoSpin === null) {
    autoSpinButton.innerHTML = '<i class="fas fa-stop"></i> STOP';

    autoSpin = setInterval(() => {
      if (!spinning) {
        spin();
      }
    }, 5500);
  } else {
    clearInterval(autoSpin);

    autoSpin = null;

    autoSpinButton.innerHTML = '<i class="fas fa-repeat"></i> AUTO SPIN';
  }
};

/*=========================================================
    SPACEBAR SPIN
=========================================================*/

document.addEventListener(
  "keydown",

  function (e) {
    if (e.code === "Space") {
      e.preventDefault();

      spin();
    }
  },
);

/*=========================================================
    PRELOAD IMAGES
=========================================================*/

symbols.forEach((symbol) => {
  const img = new Image();

  img.src = symbol.image;
});

/*=========================================================
    SAVE BEFORE EXIT
=========================================================*/

window.addEventListener(
  "beforeunload",

  saveGame,
);

/*=========================================================
    MACHINE LIGHTS
=========================================================*/

const machineLights = document.querySelectorAll(".machine-lights span");

function flashLights() {
  machineLights.forEach((light, index) => {
    setTimeout(() => {
      light.classList.add("active");

      setTimeout(() => {
        light.classList.remove("active");
      }, 250);
    }, index * 80);
  });
}

/*=========================================================
    COIN COUNT ANIMATION
=========================================================*/

function animateCoins(target) {
  const start = parseInt(coinsDisplay.textContent);

  const duration = 500;

  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    const value = Math.floor(start + (target - start) * progress);

    coinsDisplay.textContent = value;
    coinsDesktop.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      coinsDisplay.textContent = target;
      coinsDesktop.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/*=========================================================
    CONFETTI EFFECT
=========================================================*/

function createConfetti() {
  const colors = ["#2563eb", "#22c55e", "#f59e0b", "#ef4444", "#ffffff"];

  for (let i = 0; i < 25; i++) {
    const confetti = document.createElement("div");

    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "%";

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

/*=========================================================
    IMPROVED SPIN
=========================================================*/

const originalSpin = spin;

spin = function () {
  if (spinning) return;

  flashLights();

  document.querySelector(".machine").classList.add("machine-spin");

  originalSpin();

  setTimeout(() => {
    document.querySelector(".machine").classList.remove("machine-spin");
  }, 5200);
};

/*=========================================================
    ENHANCED CHECK WIN
=========================================================*/

const originalCheckWin = checkWin;

checkWin = function (a, b, c) {
  originalCheckWin(a, b, c);

  if (a.name === b.name && b.name === c.name) {
    createConfetti();

    flashLights();
  }
};

/*=========================================================
    ADDITIONAL STATS (OPTIONAL)
=========================================================*/

function getWinRate() {
  if (totalSpins === 0) return 0;

  return ((wins / totalSpins) * 100).toFixed(1);
}

function getProfit() {
  return totalWon - totalSpins * bet;
}

/*=========================================================
    CLEANUP
=========================================================*/

function stopAutoSpin() {
  if (autoSpin !== null) {
    clearInterval(autoSpin);

    autoSpin = null;

    autoSpinButton.innerHTML = '<i class="fas fa-repeat"></i> AUTO SPIN';
  }
}

window.addEventListener("beforeunload", stopAutoSpin);

/*=========================================================
    HANDLE RESIZE – rebuild reels with correct height
=========================================================*/

let resizeTimeout;

window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    const newHeight = getSymbolHeight();
    if (Math.abs(newHeight - SYMBOL_HEIGHT) > 2) {
      SYMBOL_HEIGHT = newHeight;
      // Only rebuild if not spinning
      if (!spinning) {
        initializeReels();
        // Re-apply current result message style
        const msg = resultMessage.innerHTML;
        resultMessage.innerHTML = msg;
      }
    }
  }, 300);
});

/*=========================================================
    AUDIO TOGGLE (MUTE/UNMUTE)
=========================================================*/

let isMuted = false;

// Load mute state from localStorage if available
const savedMute = localStorage.getItem("codespin_mute");
if (savedMute !== null) {
  isMuted = savedMute === "true";
}

const audioToggle = document.getElementById("audioToggle");
const audioIcon = audioToggle.querySelector("i");

// Apply initial mute state
function applyMuteState() {
  if (isMuted) {
    audioToggle.classList.add("muted");
    audioIcon.className = "fas fa-volume-mute";
    // Mute all audio elements
    spinSound.muted = true;
    winSound.muted = true;
    jackpotSound.muted = true;
  } else {
    audioToggle.classList.remove("muted");
    audioIcon.className = "fas fa-volume-up";
    spinSound.muted = false;
    winSound.muted = false;
    jackpotSound.muted = false;
  }
  localStorage.setItem("codespin_mute", String(isMuted));
}

// Toggle mute on button click
audioToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  isMuted = !isMuted;
  applyMuteState();
});

// Initialize mute state
applyMuteState();

/*=========================================================
    INITIALIZE EVERYTHING
=========================================================*/

initializeReels();

updateUI();

resultMessage.innerHTML =
  "🎰 Welcome to <strong>CodeSpin</strong><br>Press <strong>SPIN</strong> to begin!";

console.log("🎰 CodeSpin initialized successfully!");

console.log(`Loaded ${symbols.length} programming language symbols`);

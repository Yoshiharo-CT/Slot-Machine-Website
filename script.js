/*=========================================================
    CODESPIN
    Programming Language Slot Machine
    PART 3A - GAME SETUP
=========================================================*/

/*=========================================================
    PROGRAMMING LANGUAGE SYMBOLS
=========================================================*/

const symbols = [

    {
        name: "Python",
        image: "python.jpg"
    },

    {
        name: "Java",
        image: "java.png"
    },

    {
        name: "PHP",
        image: "php.jpg"
    },

    {
        name: "C#",
        image: "csharp.png"
    },

    {
        name: "TypeScript",
        image: "typescript.png"
    }

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


/*=========================================================
    REEL SETTINGS
=========================================================*/

const SYMBOL_HEIGHT = 180;

const REEL_SYMBOLS = 35;


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


const coinsDisplay = document.getElementById("coins");

const betDisplay = document.getElementById("betValue");

const totalSpinsDisplay = document.getElementById("totalSpins");

const winsDisplay = document.getElementById("wins");

const lossesDisplay = document.getElementById("losses");

const highestWinDisplay = document.getElementById("highestWin");

const winRateDisplay = document.getElementById("winRate");


/*=========================================================
    RANDOM SYMBOL
=========================================================*/

function randomSymbol() {

    return symbols[
        Math.floor(Math.random() * symbols.length)
    ];

}


/*=========================================================
    BUILD REEL
=========================================================*/

function buildReel(reel) {

    reel.innerHTML = "";

    for (let i = 0; i < REEL_SYMBOLS; i++) {

        const symbol = randomSymbol();

        const item = document.createElement("div");

        item.className = "reel-symbol";

        item.dataset.name = symbol.name;

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

    reels.forEach(reel => {

        buildReel(reel);

    });

}


/*=========================================================
    UPDATE UI
=========================================================*/

function updateUI() {

    coinsDisplay.textContent = coins;

    betDisplay.textContent = bet;

    totalSpinsDisplay.textContent = totalSpins;

    winsDisplay.textContent = wins;

    lossesDisplay.textContent = losses;

    highestWinDisplay.textContent = highestWin;

    const rate =

        totalSpins === 0

            ? 0

            : ((wins / totalSpins) * 100).toFixed(1);

    winRateDisplay.textContent = rate + "%";

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

        totalWon

    };

    localStorage.setItem(

        "codespin",

        JSON.stringify(save)

    );

}


/*=========================================================
    LOAD GAME
=========================================================*/

function loadGame() {

    const save =

        JSON.parse(

            localStorage.getItem("codespin")

        );

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

    localStorage.removeItem("codespin");

    updateUI();

    initializeReels();

    resultMessage.innerHTML =

        "🎰 Press <strong>SPIN</strong> to Start!";

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
    PART 3B
    REEL ANIMATION ENGINE
=========================================================*/

/*=========================================================
    CREATE ONE SYMBOL
=========================================================*/

function createSymbol(symbol) {

    const div = document.createElement("div");

    div.className = "reel-symbol";

    div.dataset.name = symbol.name;

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

    for (let i = 0; i < REEL_SYMBOLS; i++) {

        reel.appendChild(

            createSymbol(

                randomSymbol()

            )

        );

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

    duration

) {

    prepareReel(reel);

    setWinningSymbol(

        reel,

        finalSymbol

    );

    resetReel(reel);

    void reel.offsetHeight;

    reel.parentElement.classList.add(

        "spinning"

    );

    const distance =

        -(24 * SYMBOL_HEIGHT);

    reel.style.transition =

        `transform ${duration}ms cubic-bezier(.18,.85,.22,1)`;

    reel.style.transform =

        `translateY(${distance}px)`;

}

/*=========================================================
    SPIN GAME
=========================================================*/

function spin() {

    if (spinning) return;

    if (coins < bet) {

        resultMessage.className = "result lose";

        resultMessage.innerHTML =

            "❌ Not enough coins!";

        return;

    }

    spinning = true;

    coins -= bet;

    totalSpins++;

    updateUI();

    resultMessage.className = "result";

    resultMessage.innerHTML =

        "🎰 Spinning...";

    const finalOne = randomSymbol();

    const finalTwo = randomSymbol();

    const finalThree = randomSymbol();

    spinReel(

        reel1,

        finalOne,

        1700

    );

    spinReel(

        reel2,

        finalTwo,

        2200

    );

    spinReel(

        reel3,

        finalThree,

        2700

    );

    setTimeout(() => {

        reel1.parentElement.classList.remove(

            "spinning"

        );

        reel1.parentElement.classList.add(

            "stop"

        );

    }, 1700);


    setTimeout(() => {

        reel2.parentElement.classList.remove(

            "spinning"

        );

        reel2.parentElement.classList.add(

            "stop"

        );

    }, 2200);


    setTimeout(() => {

        reel3.parentElement.classList.remove(

            "spinning"

        );

        reel3.parentElement.classList.add(

            "stop"

        );

        checkWin(

            finalOne,

            finalTwo,

            finalThree

        );

        spinning = false;

        saveGame();

    }, 2700);

}

/*=========================================================
    BUTTON EVENTS
=========================================================*/

spinButton.onclick = spin;

resetButton.onclick = resetGame;

/*=========================================================
    PART 3C
    WIN DETECTION & REWARDS
=========================================================*/

/*=========================================================
    CHECK WIN
=========================================================*/

function checkWin(symbol1, symbol2, symbol3) {

    const slots = document.querySelectorAll(".slot");

    slots.forEach(slot => {

        slot.classList.remove("winner");

        slot.classList.remove("jackpot");

        slot.classList.remove("stop");

    });

    let reward = 0;

    let message = "";

    if (

        symbol1.name === symbol2.name &&

        symbol2.name === symbol3.name

    ) {

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

        slots.forEach(slot => {

            slot.classList.add("winner");

            slot.classList.add("jackpot");

        });

        resultMessage.className = "result jackpot";

    }

    else if (

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

            symbol3

        );

        message = `

            ✅ Match!

            <br>

            ${match}

            <br>

            +${reward} Coins

        `;

        slots.forEach(slot => {

            slot.classList.add("winner");

        });

        resultMessage.className = "result win";

    }

    else {

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

    document.querySelectorAll(".slot")

        .forEach(slot => {

            slot.classList.remove(

                "winner",

                "jackpot",

                "stop"

            );

        });

}

/*=========================================================
    AUTO SPIN
=========================================================*/

autoSpinButton.onclick = function () {

    if (autoSpin === null) {

        autoSpinButton.innerHTML =

            '<i class="fas fa-stop"></i> STOP';

        autoSpin = setInterval(() => {

            if (!spinning) {

                spin();

            }

        }, 3500);

    }

    else {

        clearInterval(autoSpin);

        autoSpin = null;

        autoSpinButton.innerHTML =

            '<i class="fas fa-repeat"></i> AUTO SPIN';

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

    }

);

/*=========================================================
    PRELOAD IMAGES
=========================================================*/

symbols.forEach(symbol => {

    const img = new Image();

    img.src = symbol.image;

});

/*=========================================================
    SAVE BEFORE EXIT
=========================================================*/

window.addEventListener(

    "beforeunload",

    saveGame

);

/*=========================================================
    PART 3D
    FINAL POLISH & INITIALIZATION
=========================================================*/

/*=========================================================
    MACHINE LIGHTS
=========================================================*/

const machineLights = document.querySelectorAll(
    '.machine-lights span'
);

function flashLights() {

    machineLights.forEach((light, index) => {

        setTimeout(() => {

            light.classList.add('active');

            setTimeout(() => {

                light.classList.remove('active');

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

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const value = Math.floor(
            start + (target - start) * progress
        );

        coinsDisplay.textContent = value;

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            coinsDisplay.textContent = target;

        }

    }

    requestAnimationFrame(update);

}


/*=========================================================
    CONFETTI EFFECT
=========================================================*/

function createConfetti() {

    const colors = [
        '#2563eb',
        '#22c55e',
        '#f59e0b',
        '#ef4444',
        '#ffffff'
    ];

    for (let i = 0; i < 25; i++) {

        const confetti = document.createElement('div');

        confetti.className = 'confetti';

        confetti.style.left = Math.random() * 100 + '%';

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            2 + Math.random() * 2 + 's';

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

    document.querySelector('.machine')
        .classList.add('machine-spin');

    originalSpin();

    setTimeout(() => {

        document.querySelector('.machine')
            .classList.remove('machine-spin');

    }, 3000);

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

    return totalWon - (totalSpins * bet);

}


/*=========================================================
    CLEANUP
=========================================================*/

function stopAutoSpin() {

    if (autoSpin !== null) {

        clearInterval(autoSpin);

        autoSpin = null;

        autoSpinButton.innerHTML =
            '<i class="fas fa-repeat"></i> AUTO SPIN';

    }

}

window.addEventListener('beforeunload', stopAutoSpin);


/*=========================================================
    INITIALIZE EVERYTHING
=========================================================*/

initializeReels();

updateUI();

resultMessage.innerHTML =
    '🎰 Welcome to <strong>CodeSpin</strong><br>Press <strong>SPIN</strong> to begin!';

console.log(
    '🎰 CodeSpin initialized successfully!'
);

console.log(
    `Loaded ${symbols.length} programming language symbols`
);
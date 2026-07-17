# CodeSpin – Programming Language Slot Machine

## Team Members

- Student 1: [Name] - [Student ID]
- Student 2: [Name] - [Student ID]

## Project Title and Theme

Title: CodeSpin – Programming Language Slot Machine

Theme: Programming Languages. The slot machine uses logos of popular programming languages (Python, Java, PHP, C#, TypeScript) as reel symbols.

## How to Run the Project

1. Download or copy the project folder containing these files:
   - index.html
   - style.css
   - script.js
   - Image assets: python.jpg, java.png, php.jpg, csharp.png, typescript.png (these must be in the same folder)
   - (optional) Sound files: electric-slot-machine.mp3, coin-win.wav, jackpot.mp3

2. Make sure all image files are present. If they are missing, the reels will not display correctly.

3. Open index.html in any modern web browser (Chrome, Firefox, Edge, etc.). No server or internet connection is required.

4. Start playing:
   - Use the + and - buttons to adjust your bet.
   - Click SPIN or press the Spacebar to spin the reels.
   - Use AUTO SPIN for continuous spins.
   - Click the speaker icon (top-right of the machine) to mute or unmute sound.
   - Press RESET to restart with 1000 coins.

## Features Implemented

- Three reels with five different programming language symbols.
- Bet adjustment from 50 to 500 coins (steps of 50).
- Win detection:
  - Three matching symbols: win Bet x 5 (Jackpot)
  - Two matching symbols: win Bet x 2
  - No match: lose the bet.
- Starting coins: 1000.
- Real-time update of coins, bet, and win rate.
- Responsive design: works on desktop, tablet, and mobile.
- Animated reel spinning with different speeds and slow-down effect.
- Visual effects: LED lights, win highlights, jackpot confetti.
- Sound effects for spin, win, and jackpot (controllable via mute).
- Auto Spin mode.
- Spacebar keyboard shortcut.
- Persistent game data using localStorage (coins, bet, statistics, mute state).
- Statistics: total spins, wins, losses, highest win.

## Required Assets

- Image files: python.jpg, java.png, php.jpg, csharp.png, typescript.png
- Sound files (optional): electric-slot-machine.mp3, coin-win.wav, jackpot.mp3

Place all files in the same folder as index.html.

## Technologies

- HTML5
- CSS3 (with animations and media queries)
- Vanilla JavaScript (ES6)
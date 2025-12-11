# 🎲 Filipino Perya Color Game - Web Version

## Interactive Playable Website

This is the web-based version of the CSEC 413 Stochastic Game Simulation project. Play the game directly in your browser!

## Features

### 🎮 Play Mode
- **Interactive Gameplay**: Click to select colors and roll dice
- **Real-time Statistics**: Track your balance, wins, and win rate
- **Two Game Modes**: 
  - Fair Game (equal probabilities)
  - Tweaked Game (house edge)
- **Adjustable Bets**: Bet from $10 to $500 per round
- **Visual Feedback**: Animated dice rolls and results

### 📊 Simulation Mode
- **Monte Carlo Simulation**: Run 1,000 to 20,000 simulations instantly
- **Compare Modes**: See fair vs. tweaked side-by-side
- **Live Charts**: 
  - Cumulative profit evolution
  - Match distribution analysis
- **Real-time Statistics**: House edge, win rate, expected values

### 📈 Statistics Dashboard
- **Theoretical Probabilities**: Complete probability breakdown
- **Payout Structure**: Clear explanation of payouts
- **Probability Comparison**: See how tweaked probabilities differ
- **Session Stats**: Track your personal gameplay statistics

### ℹ️ Educational Content
- Game rules and history
- Understanding house edge
- Monte Carlo method explanation
- Academic context

## How to Use

### Option 1: Open Directly
Simply double-click `index.html` to open in your default browser.

### Option 2: Local Server (Recommended)
For best experience, run a local server:

**Python:**
```bash
cd web
python -m http.server 8000
```
Then open: http://localhost:8000

**Node.js:**
```bash
cd web
npx http-server
```

**VS Code:**
Install "Live Server" extension and click "Go Live"

## File Structure

```
web/
├── index.html    # Main HTML structure
├── styles.css    # All styling and animations
├── game.js       # Game logic and simulation
└── README.md     # This file
```

## Browser Compatibility

Works best in modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

Requires JavaScript enabled.

## How to Play

1. **Choose Game Mode**: Fair or Tweaked
2. **Set Your Bet**: Adjust the slider ($10-$500)
3. **Select Color**: Click one of the six colors
4. **Roll Dice**: Click the "Roll the Dice!" button
5. **Check Results**: See if your color matches!

### Winning

- **0 matches** = Lose your bet
- **1 match** = Win 1:1 (double your money)
- **2 matches** = Win 2:1 (triple your money)
- **3 matches** = Win 3:1 (quadruple your money) 🎉

## Running Simulations

1. Go to the "Run Simulation" tab
2. Choose number of simulations (1,000-20,000)
3. Select bet amount
4. Check "Compare Both" to see fair vs. tweaked
5. Click "Run Simulation"
6. View charts and statistics

## Key Insights

The simulation demonstrates:
- **Probability Theory**: How randomness works in practice
- **House Edge**: Why casinos always win long-term
- **Law of Large Numbers**: Results stabilize over many trials
- **Expected Value**: Mathematical prediction of outcomes

## Educational Value

Perfect for:
- Understanding probability
- Learning Monte Carlo methods
- Studying game theory
- Analyzing stochastic processes
- Visualizing statistical concepts

## Technical Details

**Technologies Used:**
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Chart.js for visualizations

**No Dependencies** (except Chart.js CDN for charts)

## Responsive Design

Fully responsive - works on:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile phones

## Academic Context

**Course**: CSEC 413  
**Project**: Stochastic Game Simulation  
**Topic**: Filipino Perya Color Game  
**Date**: December 5, 2025  

## License

Educational use only - CSEC 413 Final Project

## Credits

Based on the traditional Filipino perya (carnival) Color Game.
Developed as part of CSEC 413 coursework.

---

**Enjoy playing and learning about probability! 🎲📊**

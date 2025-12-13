# **🎲 Filipino Perya Color Game**
## **CSEC 413 - MODELING AND SIMULATION**
### **Final Project**

### **Group Members**
Ramelle Mhiro Fortuna <br>
Christine Kyla Belano


### **Project Overview**
The repository models a six-color betting game played with three colored dice, focusing on how probability, randomness, and small tweaks to odds affect long‑run player profit and house edge. Two game configurations are implemented:​

- Fair model – all six colors have equal probability per die.

- Tweaked model – probabilities are adjusted to subtly increase the house advantage while keeping the visible rules and payouts identical.​

The simulation runs tens of thousands of automated rounds, records detailed outcomes, and supports exploratory data analysis (EDA) of win rates, profit distributions, and cumulative profit over time.

---

#### **Features**
- Interactive web game UI
    - Choose a color, set a bet, and roll three colored dice.
    - Real‑time tracking of balance, total rounds, wins, win rate, and recent results.
    - Responsive layout with sidebar navigation and tabbed views (play, simulation, results).

- Two probability models

    - Fair probabilities: each color has 1/6 chance per die.​

    - Tweaked probabilities: Red/Blue/Green ≈ 0.1417, Yellow/White/Pink ≈ 0.1917 per die, increasing the house edge while preserving familiar gameplay.​

- Monte Carlo simulation

    - Run large batches of rounds (e.g., 20,000) with fixed bet size and random color choices.

    - Option to simulate the fair model, the tweaked model, or both for side‑by‑side comparison.

    - Outputs include total profit, average profit per round, win/loss counts, win rate, house edge, and cumulative profit trajectory

- Export:

    - CSV of all simulated rounds (play number, model type, bet, selected color, matches, profit).​

    - PDF summary report with key metrics and match distributions for each model.

#### **Game Rules and Payouts**
- The player picks one of six colors: Red, Blue, Green, Yellow, White, or Pink.​

- The player places a fixed bet amount (e.g., 100 units) for each round.

- Three independent colored dice are rolled using the selected probability model.

- Payouts depend on how many dice show the chosen color:​

    - 0 matches: player loses the entire bet.

    - 1 match: player gains 1× the bet.

    - 2 matches: player gains 2× the bet.

    - 3 matches: player gains 3× the bet.

The payout schedule stays constant between models, only the underlying color probabilities change, allowing the project to isolate the effect of probability tweaks on long‑run outcomes.

---

This project is designed as a final requirement for a Modeling and Simulation course (CSEC 413) and illustrates:

- How to formalize a real‑world game of chance into a rule‑based computational model.

- How Monte Carlo simulation can estimate expected values, house edge, and risk over many trials.

- How subtle changes in probability, without altering visible rules or payouts, can significantly shift long‑run player outcomes and house profit.​

It combines interactive visualization, statistical analysis, and reproducible code to connect theoretical concepts in stochastic modeling with an accessible, culturally specific game example.

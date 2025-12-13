// Game State
let gameState = {
    balance: 1000,
    totalRounds: 0,
    wins: 0,
    losses: 0,
    selectedColor: null,
    gameMode: 'fair',
    history: []
};

// Color probabilities
const fairProbabilities = {
    'Red': 1/6,
    'Blue': 1/6,
    'Green': 1/6,
    'Yellow': 1/6,
    'White': 1/6,
    'Pink': 1/6
};

const tweakedProbabilities = {
    'Red': 0.1417,
    'Blue': 0.1417,
    'Green': 0.1417,
    'Yellow': 0.1917,
    'White': 0.1917,
    'Pink': 0.1917
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    showTab('play');
    
    // Sidebar starts hidden by default
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    if (sidebar && mainContent) {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
    }
});

// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const overlay = document.querySelector('.sidebar-overlay');
    const menuToggle = document.querySelector('.menu-toggle');
    
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('expanded');
    overlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Add active class to clicked nav item
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Select game mode (sidebar)
function selectGameMode(mode) {
    // Update radio button
    if (mode === 'fair') {
        document.getElementById('fairMode').checked = true;
    } else {
        document.getElementById('tweakedMode').checked = true;
    }
    
    // Update visual selection
    document.querySelectorAll('.game-mode-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.game-mode-option').classList.add('selected');
    
    // Update game state
    updateGameMode();
}

// Update bet display
function updateBetDisplay() {
    const betAmount = document.getElementById('betAmount').value;
    document.getElementById('betDisplay').textContent = betAmount;
}

// Update game mode
function updateGameMode() {
    const selectedMode = document.querySelector('input[name="gameMode"]:checked').value;
    gameState.gameMode = selectedMode;
}

// Select color
function selectColor(color) {
    gameState.selectedColor = color;
    
    // Update UI
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    document.getElementById('selectedColor').textContent = color;
    document.getElementById('rollBtn').disabled = false;
}

// Roll dice
function rollDice() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    
    // Check if player has enough balance
    if (gameState.balance < betAmount) {
        alert('Insufficient balance!');
        return;
    }
    
    // Disable button during roll
    document.getElementById('rollBtn').disabled = true;
    
    // Hide previous results
    document.getElementById('resultSection').style.display = 'none';
    
    // Add rolling animation
    const diceElements = [
        document.getElementById('dice1'),
        document.getElementById('dice2'),
        document.getElementById('dice3')
    ];
    
    diceElements.forEach(dice => {
        dice.classList.add('rolling');
        dice.textContent = '?';
        dice.className = 'dice rolling';
    });
    
    // Simulate dice roll after animation
    setTimeout(() => {
        const results = rollThreeDice(gameState.gameMode);
        const matches = results.filter(color => color === gameState.selectedColor).length;
        const payout = calculatePayout(betAmount, matches);
        
        // Update dice display
        results.forEach((color, index) => {
            diceElements[index].classList.remove('rolling');
            diceElements[index].textContent = color[0];
            diceElements[index].classList.add(color);
        });
        
        // Update game state
        gameState.balance += payout;
        gameState.totalRounds++;
        
        if (payout > 0) {
            gameState.wins++;
        } else {
            gameState.losses++;
        }
        
        // Store in history
        gameState.history.push({
            round: gameState.totalRounds,
            betColor: gameState.selectedColor,
            results: results,
            matches: matches,
            betAmount: betAmount,
            payout: payout,
            balance: gameState.balance
        });
        
        // Show results
        displayResults(matches, payout, betAmount);
        updateDisplay();
        
        // Re-enable button
        document.getElementById('rollBtn').disabled = false;
        
    }, 500);
}

// Roll three dice with selected probabilities
function rollThreeDice(mode) {
    const probabilities = mode === 'fair' ? fairProbabilities : tweakedProbabilities;
    const colors = Object.keys(probabilities);
    const results = [];
    
    for (let i = 0; i < 3; i++) {
        const rand = Math.random();
        let cumulative = 0;
        
        for (const color of colors) {
            cumulative += probabilities[color];
            if (rand <= cumulative) {
                results.push(color);
                break;
            }
        }
    }
    
    return results;
}

// Calculate payout
function calculatePayout(betAmount, matches) {
    switch (matches) {
        case 0:
            return -betAmount;
        case 1:
            return betAmount;
        case 2:
            return betAmount * 2;
        case 3:
            return betAmount * 3;
        default:
            return 0;
    }
}

// Display results
function displayResults(matches, payout, betAmount) {
    const resultSection = document.getElementById('resultSection');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultPayout = document.getElementById('resultPayout');
    
    resultSection.style.display = 'block';
    
    if (payout > 0) {
        resultSection.className = 'result-section win';
        resultTitle.textContent = `🎉 ${matches} Match${matches > 1 ? 'es' : ''}! You Win!`;
        resultMessage.textContent = `Your ${gameState.selectedColor} appeared ${matches} time${matches > 1 ? 's' : ''}!`;
        resultPayout.textContent = `+₱${payout.toLocaleString()}`;
        resultPayout.style.color = '#28a745';
    } else {
        resultSection.className = 'result-section lose';
        resultTitle.textContent = '😔 No Matches - You Lose';
        resultMessage.textContent = `Your ${gameState.selectedColor} didn't appear on any dice.`;
        resultPayout.textContent = `-₱${betAmount.toLocaleString()}`;
        resultPayout.style.color = '#dc3545';
    }
}

// Update display
function updateDisplay() {
    document.getElementById('balance').textContent = `₱${gameState.balance.toLocaleString()}`;
    document.getElementById('totalRounds').textContent = gameState.totalRounds;
    document.getElementById('wins').textContent = gameState.wins;
    
    const winRate = gameState.totalRounds > 0 
        ? ((gameState.wins / gameState.totalRounds) * 100).toFixed(1) 
        : 0;
    document.getElementById('winRate').textContent = `${winRate}%`;
    
    // Update balance color
    const balanceElement = document.getElementById('balance');
    if (gameState.balance > 1000) {
        balanceElement.style.color = '#28a745';
    } else if (gameState.balance < 1000) {
        balanceElement.style.color = '#dc3545';
    } else {
        balanceElement.style.color = 'var(--text-primary)';
    }
}

// Reset game
function resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
        gameState = {
            balance: 1000,
            totalRounds: 0,
            wins: 0,
            losses: 0,
            selectedColor: null,
            gameMode: gameState.gameMode,
            history: []
        };
        
        // Reset UI
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.getElementById('selectedColor').textContent = 'None';
        document.getElementById('rollBtn').disabled = true;
        document.getElementById('resultSection').style.display = 'none';
        
        // Reset dice
        ['dice1', 'dice2', 'dice3'].forEach(id => {
            const dice = document.getElementById(id);
            dice.className = 'dice';
            dice.textContent = '?';
        });
        
        updateDisplay();
    }
}

// Monte Carlo Simulation
function runSimulation() {
    const numRounds = parseInt(document.getElementById('simRounds').value);
    const betAmount = parseInt(document.getElementById('simBet').value);
    const compareBoth = document.getElementById('compareBoth').checked;
    
    // Show progress
    document.getElementById('simulationProgress').style.display = 'block';
    document.getElementById('simulationResults').style.display = 'none';
    
    // Run simulation in chunks to avoid blocking UI
    setTimeout(() => {
        let fairResults = null;
        let tweakedResults = null;
        
        // Simulate fair game
        fairResults = simulateGames('fair', numRounds, betAmount);
        updateProgress(compareBoth ? 50 : 100);
        
        if (compareBoth) {
            // Simulate tweaked game
            tweakedResults = simulateGames('tweaked', numRounds, betAmount);
            updateProgress(100);
        }
        
        // Display results
        setTimeout(() => {
            displaySimulationResults(fairResults, tweakedResults);
        }, 500);
        
    }, 100);
}

function simulateGames(mode, numRounds, betAmount) {
    const probabilities = mode === 'fair' ? fairProbabilities : tweakedProbabilities;
    let totalProfit = 0;
    let wins = 0;
    let cumulativeProfit = [];
    let profitDistribution = [];
    let matchDistribution = { 0: 0, 1: 0, 2: 0, 3: 0 };
    
    for (let i = 0; i < numRounds; i++) {
        const betColor = getRandomColor();
        const results = rollThreeDiceWithProb(probabilities);
        const matches = results.filter(c => c === betColor).length;
        const payout = calculatePayout(betAmount, matches);
        
        totalProfit += payout;
        if (payout > 0) wins++;
        
        cumulativeProfit.push(totalProfit);
        profitDistribution.push(payout);
        matchDistribution[matches]++;
    }
    
    return {
        mode: mode,
        totalRounds: numRounds,
        totalBet: numRounds * betAmount,
        totalProfit: totalProfit,
        avgProfit: totalProfit / numRounds,
        avgPerRound: totalProfit / numRounds,
        wins: wins,
        losses: numRounds - wins,
        winRate: (wins / numRounds) * 100,
        houseEdge: -(totalProfit / (numRounds * betAmount)) * 100,
        balance: 1000 + totalProfit,
        cumulativeProfit: cumulativeProfit,
        profitHistory: cumulativeProfit,
        profitDistribution: profitDistribution,
        matchDistribution: matchDistribution
    };
}

function rollThreeDiceWithProb(probabilities) {
    const colors = Object.keys(probabilities);
    const results = [];
    
    for (let i = 0; i < 3; i++) {
        const rand = Math.random();
        let cumulative = 0;
        
        for (const color of colors) {
            cumulative += probabilities[color];
            if (rand <= cumulative) {
                results.push(color);
                break;
            }
        }
    }
    
    return results;
}

function getRandomColor() {
    const colors = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Pink'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function updateProgress(percent) {
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = percent + '%';
    progressFill.textContent = percent + '%';
}

function displaySimulationResults(fairResults, tweakedResults) {
    document.getElementById('simulationProgress').style.display = 'none';
    document.getElementById('simulationResults').style.display = 'block';
    
    // Store simulation data for export
    const rounds = parseInt(document.getElementById('simRounds').value);
    const betAmount = parseInt(document.getElementById('simBet').value);
    
    window.lastSimulationData = {
        rounds: rounds,
        betAmount: betAmount,
        fairResults: fairResults,
        tweakedResults: tweakedResults,
        timestamp: new Date()
    };
    
    // Display fair results
    if (fairResults) {
        document.getElementById('fairResults').style.display = 'block';
        document.getElementById('fairHouseEdge').textContent = fairResults.houseEdge.toFixed(2) + '%';
        document.getElementById('fairWinRate').textContent = fairResults.winRate.toFixed(2) + '%';
        document.getElementById('fairProfit').textContent = '₱' + fairResults.totalProfit.toFixed(2);
        document.getElementById('fairAvg').textContent = '₱' + fairResults.avgProfit.toFixed(2);
    }
    
    // Display tweaked results
    if (tweakedResults) {
        document.getElementById('tweakedResults').style.display = 'block';
        document.getElementById('tweakedHouseEdge').textContent = tweakedResults.houseEdge.toFixed(2) + '%';
        document.getElementById('tweakedWinRate').textContent = tweakedResults.winRate.toFixed(2) + '%';
        document.getElementById('tweakedProfit').textContent = '₱' + tweakedResults.totalProfit.toFixed(2);
        document.getElementById('tweakedAvg').textContent = '₱' + tweakedResults.avgProfit.toFixed(2);
    }
    
    // Create charts
    createProfitChart(fairResults, tweakedResults);
    createDistributionChart(fairResults, tweakedResults);
}

function createProfitChart(fairResults, tweakedResults) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    
    // Destroy previous chart if exists
    if (window.profitChartInstance) {
        window.profitChartInstance.destroy();
    }
    
    const datasets = [];
    
    if (fairResults) {
        datasets.push({
            label: 'Fair Game',
            data: fairResults.cumulativeProfit,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            tension: 0.1
        });
    }
    
    if (tweakedResults) {
        datasets.push({
            label: 'Tweaked Game',
            data: tweakedResults.cumulativeProfit,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            tension: 0.1
        });
    }
    
    window.profitChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: fairResults ? fairResults.totalRounds : tweakedResults.totalRounds}, (_, i) => i + 1),
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Cumulative Profit Over Time',
                    font: { size: 16 }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Round Number'
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cumulative Profit ($)'
                    }
                }
            }
        }
    });
}

function createDistributionChart(fairResults, tweakedResults) {
    const ctx = document.getElementById('distributionChart').getContext('2d');
    
    // Destroy previous chart if exists
    if (window.distributionChartInstance) {
        window.distributionChartInstance.destroy();
    }
    
    const datasets = [];
    
    if (fairResults) {
        datasets.push({
            label: 'Fair Game',
            data: [
                fairResults.matchDistribution[0],
                fairResults.matchDistribution[1],
                fairResults.matchDistribution[2],
                fairResults.matchDistribution[3]
            ],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: '#3498db',
            borderWidth: 2
        });
    }
    
    if (tweakedResults) {
        datasets.push({
            label: 'Tweaked Game',
            data: [
                tweakedResults.matchDistribution[0],
                tweakedResults.matchDistribution[1],
                tweakedResults.matchDistribution[2],
                tweakedResults.matchDistribution[3]
            ],
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderColor: '#e74c3c',
            borderWidth: 2
        });
    }
    
    window.distributionChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0 Matches', '1 Match', '2 Matches', '3 Matches'],
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Match Distribution',
                    font: { size: 16 }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Number of Matches'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Frequency'
                    }
                }
            }
        }
    });
}

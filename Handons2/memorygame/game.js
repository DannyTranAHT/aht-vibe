class MemoryGame {
    constructor() {
        this.pokemon = [];
        this.gameGrid = [];
        this.flippedCards = [];
        this.matches = 0;
        this.moves = 0;
        this.currentPlayer = 1;
        this.players = 1;
        this.gridSize = 4;
        this.gameStarted = false;
        this.isChecking = false;
        
        this.loadPokemon();
    }

    async loadPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
            const data = await response.json();
            
            // Get detailed info for each Pokemon
            const pokemonPromises = data.results.map(async (pokemon) => {
                const pokemonResponse = await fetch(pokemon.url);
                const pokemonData = await pokemonResponse.json();
                return {
                    name: pokemonData.name,
                    image: pokemonData.sprites.front_default,
                    id: pokemonData.id
                };
            });
            
            this.pokemon = await Promise.all(pokemonPromises);
            this.updateMessage("Ready to play! Click 'New Game' to start.");
        } catch (error) {
            console.error('Error loading Pokemon:', error);
            // Fallback to simple cards if API fails
            this.pokemon = this.generateFallbackCards();
            this.updateMessage("Ready to play! Click 'New Game' to start.");
        }
    }

    generateFallbackCards() {
        const emojis = ['🔥', '💧', '🌿', '⚡', '🌟', '🌙', '☀️', '❄️', '🎈', '🎯', '🎪', '🎨', '🎭', '🎪', '🎨', '🎭', '🎲', '🎯'];
        return emojis.map((emoji, index) => ({
            name: `Card ${index + 1}`,
            image: emoji,
            id: index + 1
        }));
    }

    startNewGame() {
        this.gridSize = parseInt(document.getElementById('gridSize').value);
        this.players = parseInt(document.getElementById('players').value);
        this.currentPlayer = 1;
        this.moves = 0;
        this.matches = 0;
        this.flippedCards = [];
        this.gameStarted = true;
        this.isChecking = false;

        this.updateStats();
        this.updateMessage("Game started! Find matching pairs.");
        this.createGrid();
        this.updatePlayerDisplay();
    }

    createGrid() {
        const totalCards = this.gridSize * this.gridSize;
        const pairsNeeded = totalCards / 2;
        
        // Select random Pokemon for this game
        const selectedPokemon = this.pokemon.slice(0, pairsNeeded);
        
        // Create pairs
        this.gameGrid = [];
        selectedPokemon.forEach(pokemon => {
            this.gameGrid.push(pokemon, pokemon);
        });
        
        // Shuffle the grid
        this.shuffleArray(this.gameGrid);
        
        // Create HTML grid
        const gridElement = document.getElementById('gameGrid');
        gridElement.innerHTML = '';
        gridElement.className = `grid grid-${this.gridSize}x${this.gridSize}`;
        
        this.gameGrid.forEach((pokemon, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index;
            card.innerHTML = `
                <div class="card-face card-back">?</div>
                <div class="card-face card-front">
                    ${pokemon.image && pokemon.image.startsWith('http') ? 
                        `<img src="${pokemon.image}" alt="${pokemon.name}">` : 
                        `<div style="font-size: 2rem;">${pokemon.image}</div>`
                    }
                </div>
            `;
            card.addEventListener('click', () => this.flipCard(index));
            gridElement.appendChild(card);
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    flipCard(index) {
        if (!this.gameStarted || this.isChecking) return;
        
        const card = document.querySelector(`[data-index="${index}"]`);
        
        if (card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        card.classList.add('flipped');
        this.flippedCards.push(index);
        
        if (this.flippedCards.length === 2) {
            this.isChecking = true;
            this.moves++;
            this.updateStats();
            
            setTimeout(() => {
                this.checkMatch();
            }, 1000);
        }
    }

    checkMatch() {
        const [index1, index2] = this.flippedCards;
        const card1 = document.querySelector(`[data-index="${index1}"]`);
        const card2 = document.querySelector(`[data-index="${index2}"]`);
        
        if (this.gameGrid[index1].id === this.gameGrid[index2].id) {
            // Match found
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matches++;
            this.updateStats();
            
            if (this.matches === this.gameGrid.length / 2) {
                this.endGame();
            } else {
                this.updateMessage(`Great! Player ${this.currentPlayer} found a match!`);
            }
        } else {
            // No match
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            
            if (this.players === 2) {
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                this.updateMessage(`No match! Player ${this.currentPlayer}'s turn.`);
                this.updatePlayerDisplay();
            } else {
                this.updateMessage("No match! Try again.");
            }
        }
        
        this.flippedCards = [];
        this.isChecking = false;
    }

    endGame() {
        this.gameStarted = false;
        if (this.players === 1) {
            this.updateMessage(`🎉 Congratulations! You won in ${this.moves} moves!`);
        } else {
            this.updateMessage(`🎉 Game Over! Total moves: ${this.moves}`);
        }
        document.getElementById('message').classList.add('win');
    }

    updateStats() {
        document.getElementById('moves').textContent = this.moves;
        document.getElementById('matches').textContent = this.matches;
        document.getElementById('currentPlayer').textContent = this.currentPlayer;
    }

    updatePlayerDisplay() {
        const playerStat = document.getElementById('currentPlayerStat');
        playerStat.style.display = this.players === 2 ? 'block' : 'none';
    }

    updateMessage(text) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = text;
        messageElement.classList.remove('win');
    }
}

// Initialize the game
const game = new MemoryGame();

// Global function for the button
function startNewGame() {
    game.startNewGame();
}

// Update player display on page load
document.addEventListener('DOMContentLoaded', () => {
    game.updatePlayerDisplay();
});
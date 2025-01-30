class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', '']; 
        this.currentPlayer = 'X'; 
        this.isGameOver = false; 
        this.cells = document.querySelectorAll('.cell'); 
        this.currentPlayerText = document.getElementById('current-player'); 
        this.winnerText = document.getElementById('winner'); 
        this.resetButton = document.querySelector('.reset-button'); 

        // Dodajemo brojače
        this.xWins = 0;
        this.oWins = 0;
        this.draws = 0;
        this.updateScoreboard();

        this.startGame();
    }

    startGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (event) => this.handleClick(event)); 
        });

        this.resetButton.addEventListener('click', () => this.resetGame()); 
    }
    
    changePlayer() {
        this.currentPlayer = this.currentPlayer ===  'X' ? 'O' : 'X';
        this.currentPlayerText.textContent = this.currentPlayer; 
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6]  
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.isGameOver = true;
                this.winnerText.textContent = 'Pobjednik je: ' + this.currentPlayer;

                // Ažuriramo brojače pobjeda
                if (this.currentPlayer === 'X') {
                    this.xWins++;
                } else {
                    this.oWins++;
                }
                this.updateScoreboard();
                return;
            }
        }
    
        if (!this.board.includes('')) {
            this.isGameOver = true;
            this.winnerText.textContent = 'Nema pobjednika, izjednačeno!';
            this.draws++;
            this.updateScoreboard();
        }
    }
 
    handleClick(event) {
        const cellIndex = event.target.getAttribute('data-cell'); 

        if (this.board[cellIndex] !== '' || this.isGameOver) {
            return; 
        }

        if (this.currentPlayer === 'X') {
            event.target.style.backgroundColor = '#ff00ff49';
        } else {
            event.target.style.backgroundColor = '#00ff2f76';
        }

        this.board[cellIndex] = this.currentPlayer; 
        event.target.textContent = this.currentPlayer; 
        this.checkWinner(); 
        if (!this.isGameOver) {
            this.changePlayer(); 
        }
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', '']; 
        this.isGameOver = false;
        this.winnerText.textContent = '';

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = 'white';
        });

        this.currentPlayer = 'X';
        this.currentPlayerText.textContent = this.currentPlayer; 
    }

    updateScoreboard() {
        const scoreboard = document.getElementById('scoreboard');
        scoreboard.textContent = `X: ${this.xWins} | O: ${this.oWins} | Izjednačenja: ${this.draws}`;
    }
}

const game = new TicTacToe();
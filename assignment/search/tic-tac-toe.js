class TicTacToe {
    constructor(board = Array(9).fill(null), player = 'X') {
        this.board = board;
        this.player = player;
    }

    clone() {
        return new TicTacToe([...this.board], this.player);
    }

    getLegalMoves() {
        if (this.getWinner() !== null) return [];
        return this.board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    }

    makeMove(move) {
        const newBoard = [...this.board];
        newBoard[move] = this.player;
        const nextPlayer = this.player === 'X' ? 'O' : 'X';
        return new TicTacToe(newBoard, nextPlayer);
    }

    getWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const [a, b, c] of winningCombinations) {
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return null;
    }

    isTerminal() {
        return this.getWinner() !== null || this.board.every(val => val !== null);
    }

    getUtility(maximizingPlayer) {
        const winner = this.getWinner();
        if (winner === maximizingPlayer) return 10;
        if (winner && winner !== maximizingPlayer) return -10;
        return 0; // Draw
    }
    
    heuristic(maximizingPlayer) {
        // A simple heuristic for non-terminal states
        // Count possible winning lines for max player vs min player
        if (this.isTerminal()) return this.getUtility(maximizingPlayer);
        
        let score = 0;
        const minimizingPlayer = maximizingPlayer === 'X' ? 'O' : 'X';
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (const line of winningCombinations) {
            const lineValues = line.map(idx => this.board[idx]);
            const maxCount = lineValues.filter(val => val === maximizingPlayer).length;
            const minCount = lineValues.filter(val => val === minimizingPlayer).length;
            
            if (maxCount > 0 && minCount === 0) score += Math.pow(10, maxCount);
            if (minCount > 0 && maxCount === 0) score -= Math.pow(10, minCount);
        }
        
        return score;
    }

    printBoard() {
        let str = '\n';
        for (let i = 0; i < 9; i++) {
            str += (this.board[i] || ' ') + ((i + 1) % 3 === 0 ? '' : ' | ');
            if ((i + 1) % 3 === 0 && i !== 8) str += '\n---------\n';
        }
        console.log(str + '\n');
    }
}

module.exports = TicTacToe;

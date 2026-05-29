const TicTacToe = require('./tic-tac-toe');
const { minimax, alphaBeta, heuristicAlphaBeta, mcts } = require('./algorithms');

console.log("=== Testing Search Algorithms on Tic-Tac-Toe ===\n");

// 1. Minimax Test
console.log("1. Testing Minimax");
let state = new TicTacToe();
// Give X a clear winning move:
// X O X
// O X O
// _ _ _
state.board = ['X', 'O', 'X', 'O', 'X', 'O', null, null, null];
state.printBoard();
console.time("Minimax Time");
let result = minimax(state, 9, 'X');
console.timeEnd("Minimax Time");
console.log(`Minimax evaluation: ${result.value}, Best move: ${result.move}\n`);


// 2. Alpha-Beta Test
console.log("2. Testing Alpha-Beta Search");
let state2 = new TicTacToe();
// Give X a winning setup
// X _ _
// _ X _
// O O _
state2.board = ['X', null, null, null, 'X', null, 'O', 'O', null];
state2.printBoard();
console.time("AlphaBeta Time");
let result2 = alphaBeta(state2, 9, -Infinity, Infinity, 'X');
console.timeEnd("AlphaBeta Time");
console.log(`Alpha-Beta evaluation: ${result2.value}, Best move: ${result2.move}\n`);


// 3. Heuristic Alpha-Beta Test
console.log("3. Testing Heuristic Alpha-Beta Search");
let state3 = new TicTacToe();
// Initial board but limited depth
state3.printBoard();
console.time("Heuristic AlphaBeta Time");
let result3 = heuristicAlphaBeta(state3, 2, -Infinity, Infinity, 'X');
console.timeEnd("Heuristic AlphaBeta Time");
console.log(`Heuristic Alpha-Beta evaluation: ${result3.value}, Best move: ${result3.move}\n`);


// 4. Monte-Carlo Tree Search Test
console.log("4. Testing Monte-Carlo Tree Search (MCTS)");
let state4 = new TicTacToe();
// X _ _
// O X _
// _ _ O
state4.board = ['X', null, null, 'O', 'X', null, null, null, 'O'];
state4.printBoard();
console.time("MCTS Time");
let result4 = mcts(state4, 5000);
console.timeEnd("MCTS Time");
console.log(`MCTS Best move: ${result4.move}\n`);

console.log("All tests completed successfully.");

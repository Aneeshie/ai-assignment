// Minimax Algorithm
function minimax(state, depth, maximizingPlayerName) {
    if (state.isTerminal() || depth === 0) {
        return { value: state.getUtility(maximizingPlayerName), move: null };
    }

    const legalMoves = state.getLegalMoves();
    let bestMove = null;

    if (state.player === maximizingPlayerName) {
        let maxEval = -Infinity;
        for (const move of legalMoves) {
            const nextState = state.makeMove(move);
            const evalResult = minimax(nextState, depth - 1, maximizingPlayerName).value;
            if (evalResult > maxEval) {
                maxEval = evalResult;
                bestMove = move;
            }
        }
        return { value: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        for (const move of legalMoves) {
            const nextState = state.makeMove(move);
            const evalResult = minimax(nextState, depth - 1, maximizingPlayerName).value;
            if (evalResult < minEval) {
                minEval = evalResult;
                bestMove = move;
            }
        }
        return { value: minEval, move: bestMove };
    }
}

// Alpha-Beta Pruning
function alphaBeta(state, depth, alpha, beta, maximizingPlayerName) {
    if (state.isTerminal() || depth === 0) {
        return { value: state.getUtility(maximizingPlayerName), move: null };
    }

    const legalMoves = state.getLegalMoves();
    let bestMove = null;

    if (state.player === maximizingPlayerName) {
        let maxEval = -Infinity;
        for (const move of legalMoves) {
            const nextState = state.makeMove(move);
            const evalResult = alphaBeta(nextState, depth - 1, alpha, beta, maximizingPlayerName).value;
            if (evalResult > maxEval) {
                maxEval = evalResult;
                bestMove = move;
            }
            alpha = Math.max(alpha, evalResult);
            if (beta <= alpha) break; // Beta cutoff
        }
        return { value: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        for (const move of legalMoves) {
            const nextState = state.makeMove(move);
            const evalResult = alphaBeta(nextState, depth - 1, alpha, beta, maximizingPlayerName).value;
            if (evalResult < minEval) {
                minEval = evalResult;
                bestMove = move;
            }
            beta = Math.min(beta, evalResult);
            if (beta <= alpha) break; // Alpha cutoff
        }
        return { value: minEval, move: bestMove };
    }
}

// Heuristic Alpha-Beta Search
function heuristicAlphaBeta(state, depth, alpha, beta, maximizingPlayerName) {
    if (state.isTerminal() || depth === 0) {
        return { value: state.heuristic(maximizingPlayerName), move: null };
    }

    const legalMoves = state.getLegalMoves();
    let bestMove = null;

    if (state.player === maximizingPlayerName) {
        let maxEval = -Infinity;
        for (const move of legalMoves) {
            const nextState = state.makeMove(move);
            const evalResult = heuristicAlphaBeta(nextState, depth - 1, alpha, beta, maximizingPlayerName).value;
            if (evalResult > maxEval) {
                maxEval = evalResult;
                bestMove = move;
            }
            alpha = Math.max(alpha, evalResult);
            if (beta <= alpha) break;
        }
        return { value: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        for (const move of legalMoves) {
            const nextState = state.makeMove(move);
            const evalResult = heuristicAlphaBeta(nextState, depth - 1, alpha, beta, maximizingPlayerName).value;
            if (evalResult < minEval) {
                minEval = evalResult;
                bestMove = move;
            }
            beta = Math.min(beta, evalResult);
            if (beta <= alpha) break;
        }
        return { value: minEval, move: bestMove };
    }
}

// Monte-Carlo Tree Search (MCTS)
class MCTSNode {
    constructor(state, parent = null, move = null) {
        this.state = state;
        this.parent = parent;
        this.move = move;
        this.children = [];
        this.visits = 0;
        this.value = 0;
        this.untriedMoves = state.getLegalMoves();
    }

    expand() {
        const move = this.untriedMoves.pop();
        const nextState = this.state.makeMove(move);
        const childNode = new MCTSNode(nextState, this, move);
        this.children.push(childNode);
        return childNode;
    }

    isFullyExpanded() {
        return this.untriedMoves.length === 0;
    }
}

function mcts(rootState, iterations = 1000) {
    const rootNode = new MCTSNode(rootState);
    const maximizingPlayerName = rootState.player;

    for (let i = 0; i < iterations; i++) {
        let node = rootNode;
        let state = rootState.clone();

        // 1. Select
        while (!node.state.isTerminal() && node.isFullyExpanded()) {
            node = selectBestUCT(node);
            state = state.makeMove(node.move);
        }

        // 2. Expand
        if (!node.state.isTerminal()) {
            node = node.expand();
            state = state.makeMove(node.move);
        }

        // 3. Rollout (Simulation)
        while (!state.isTerminal()) {
            const moves = state.getLegalMoves();
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            state = state.makeMove(randomMove);
        }

        // 4. Backpropagate
        const utility = state.getUtility(maximizingPlayerName);
        while (node !== null) {
            node.visits++;
            // Note: MCTS in zero-sum alternates value from parent's perspective.
            // A simpler approach for general games:
            if (node.state.player !== maximizingPlayerName) {
                node.value += utility;
            } else {
                node.value -= utility;
            }
            node = node.parent;
        }
    }

    // Return best move from root based on most visits
    let bestMove = null;
    let maxVisits = -1;
    for (const child of rootNode.children) {
        if (child.visits > maxVisits) {
            maxVisits = child.visits;
            bestMove = child.move;
        }
    }
    
    return { move: bestMove };
}

function selectBestUCT(node, c = 1.414) {
    let bestValue = -Infinity;
    let bestNode = null;
    
    for (const child of node.children) {
        const uctValue = (child.value / child.visits) + c * Math.sqrt(Math.log(node.visits) / child.visits);
        if (uctValue > bestValue) {
            bestValue = uctValue;
            bestNode = child;
        }
    }
    return bestNode;
}

module.exports = {
    minimax,
    alphaBeta,
    heuristicAlphaBeta,
    mcts
};

# AI Assignment Submission

This repository contains the implementations and design documents for the AI assignment.

## Prerequisites
- **Node.js** (v14+ recommended). Tested on v22.20.0.

## Folder Structure
- `/search` - Implementation of Minimax, Alpha-Beta, Heuristic Alpha-Beta, and MCTS applied to Tic-Tac-Toe.
- `/travel-planner` - Design document for the AI-Based Travel Planner.
- `/knowledge-graphs` - Report detailing Knowledge Graphs and tools.
- `/bayesian-networks` - Report on Bayesian Networks and a JavaScript implementation of inference by enumeration.

---

## 1. Search Algorithms
**Location:** `/search`

We implemented a standard Tic-Tac-Toe environment and applied four different search algorithms to find optimal moves. 

**How to run:**
```bash
node search/tests.js
```

**Expected Output:**
```
=== Testing Search Algorithms on Tic-Tac-Toe ===

1. Testing Minimax
...
Minimax evaluation: 10, Best move: 6

2. Testing Alpha-Beta Search
...
Alpha-Beta evaluation: 10, Best move: 8

3. Testing Heuristic Alpha-Beta Search
...
Heuristic Alpha-Beta evaluation: 10, Best move: 4

4. Testing Monte-Carlo Tree Search (MCTS)
...
MCTS Best move: 2

All tests completed successfully.
```

---

## 2. AI Travel Planner
**Location:** `/travel-planner/design.md`

Read the Markdown design document to review the architecture, including how the system incorporates Ontology (Tourist Places, Food/Wine) and cost assessment into its reasoning engine to provide personalized tours.

---

## 3. Knowledge Graphs
**Location:** `/knowledge-graphs/report.md`

Read the Markdown document describing Knowledge Graphs and exploring modern tools like Protégé, Neo4j, Apache Jena, and Amazon Neptune.

---

## 4. Bayesian Networks
**Location:** `/bayesian-networks`

Read `/bayesian-networks/report.md` for an exploration of Bayesian modeling tools. 
We also implemented the classic "Wet Grass" model using exact inference by enumeration in JavaScript.

**How to run the example:**
```bash
node bayesian-networks/example.js
```

**Expected Output:**
```
=== Bayesian Network: Wet Grass Example ===
P(Rain=true | WetGrass=true) = 0.7079
```

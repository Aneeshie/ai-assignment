# Constraint Satisfaction Problems (CSP) Assignment

This repository contains Python solutions for four standard Constraint Satisfaction Problems using a generalized Backtracking Search algorithm equipped with Minimum Remaining Values (MRV) heuristics.

## Folder Structure

- `csp.py` - Core generalized constraint solver engine.
- `task1_australia.py` - Map coloring solver for the 7 standard regions of Australia.
- `task2_telangana.py` - Map coloring solver and visualizer simulation for the 33 districts of Telangana.
- `task3_sudoku.py` - Solver for a 9x9 Sudoku puzzle.
- `task4_cryptarithmetic.py` - Solver for the `TWO + TWO = FOUR` cryptarithmetic problem.
- `requirements.txt` - Python dependencies needed to plot the maps.

## 🛠 Prerequisites

Make sure you have `Python 3` installed on your system. It is highly recommended to run this inside a virtual environment.

## 🚀 Step-by-Step Setup Instructions

1. **Navigate to the assignment directory**
   ```bash
   cd csp_assignment
   ```

2. **Create a virtual environment (optional but recommended)**
   ```bash
   python3 -m venv venv
   ```

3. **Activate the virtual environment**
   - On Mac/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install the required dependencies**
   ```bash
   pip install -r requirements.txt
   ```

---

## 🏃🏽‍♂️ How to Run & Expected Outputs

### Task 1: Australia Map Coloring

Runs the classic 7-region Australia map coloring problem assigning Red, Green, and Blue ensuring no two adjacent properties share the same color.

**Command:**
```bash
python task1_australia.py
```

**Expected Output:**
```text
--- Task 1: Australia Map Coloring ---
WA: Red
NT: Green
SA: Blue
Q: Red
NSW: Green
V: Red
T: Red
--------------------------------------
```

### Task 2: Telangana 33 Districts Map Coloring

Because the pure geographical data for the 33 boundaries was unavailable, this task builds out an accurate relative adjacency model (using planar Delaunay Triangulation networks) and determines the constraint resolution. It uses Matplotlib and NetworkX to plot the colored district associations matching the 4-color map theorem.

**Command:**
```bash
python task2_telangana.py
```

**Expected Output:**
```text
Total districts: 33
Solving Map Coloring CSP...
--- Task 2: Telangana Map Solution ---
Colors assigned successfully. Generating plot...
Map saved to telangana_colored.png
```
*(This command will output a PNG image file named `telangana_colored.png` in the directory, representing the colored state map network).*

### Task 3: Sudoku Puzzle

Solves an incomplete 9x9 Sudoku grid requiring different numbers `1-9` across every row, column, and 3x3 subset block.

**Command:**
```bash
python task3_sudoku.py
```

**Expected Output:**
```text
--- Task 3: Sudoku Solution ---
5 3 4 | 6 7 8 | 9 1 2 
6 7 2 | 1 9 5 | 3 4 8 
1 9 8 | 3 4 2 | 5 6 7 
---------------------
8 5 9 | 7 6 1 | 4 2 3 
4 2 6 | 8 5 3 | 7 9 1 
7 1 3 | 9 2 4 | 8 5 6 
---------------------
9 6 1 | 5 3 7 | 2 8 4 
2 8 7 | 4 1 9 | 6 3 5 
3 4 5 | 2 8 6 | 1 7 9 
-------------------------------
```

### Task 4: Cryptarithmetic Problem (`TWO + TWO = FOUR`)

Solves the character matching addition equation by allocating exact integer variants (0-9) to standard letters making the overall math sentence true.

**Command:**
```bash
python task4_cryptarithmetic.py
```

**Expected Output:**
```text
--- Task 4: Cryptarithmetic Solution (TWO + TWO = FOUR) ---
T = 7
W = 3
O = 4
F = 1
U = 6
R = 8

Equation Check:
  734
+ 734
-----
 1468
```

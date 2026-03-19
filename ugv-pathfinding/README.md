# UGV Pathfinding - A* Algorithm

A Go implementation of the A* pathfinding algorithm for finding the shortest path on a grid with obstacles.

## Overview

This project implements the A* pathfinding algorithm to find an optimal path from a start position to a goal position on a 2D grid with randomly placed obstacles. It's commonly used in robotics and game development for pathfinding.

## Project Structure

```
ugv-pathfinding/
├── main.go                 # Entry point - runs the A* algorithm
├── go.mod                  # Go module definition
├── astar/
│   └── astar.go           # A* algorithm implementation
├── grid/
│   └── grid.go            # Grid structure and initialization
├── pq/
│   └── priority_queue.go  # Priority queue implementation (for A* open set)
└── utils/
    └── path.go            # Path utilities
```

## How to Run

### Prerequisites
- Go 1.25.5 or later installed

### Running the Project

```bash
go run main.go
```

### Building an Executable

```bash
go build -o ugv-pathfinding
./ugv-pathfinding
```

## Expected Output

When you run the program, you will see output similar to:

```
Path found!
Path length: 138
Nodes explored: 4892
Execution time: 12.345ms
```

**Output Explanation:**
- **Path found!** - Indicates a path exists from start to goal
- **Path length** - The number of steps in the found path (Manhattan distance)
- **Nodes explored** - The number of nodes examined by the A* algorithm before finding the path
- **Execution time** - How long the algorithm took to run

If no path is found, you'll see:
```
No path found!
```

## Grid Structure

### Grid Representation

The grid is a 2D array where:
- **0** = Walkable cell (free space)
- **1** = Obstacle (blocked cell)

### Grid Configuration

The grid is configurable in `main.go`:

```go
rows, cols := 70, 70           // Grid dimensions: 70x70
density := 25                  // Obstacle density: 25% of cells are obstacles
start := grid.Cell{0, 0}       // Start position (top-left)
goal := grid.Cell{69, 69}      // Goal position (bottom-right)
```

**Parameters:**
- `rows, cols` - Grid dimensions (currently 70x70). Larger grids take longer to compute
- `density` - Percentage of cells that are obstacles (0-100)
  - `10` - Sparse obstacles (easier pathfinding)
  - `25` - Moderate obstacles (medium difficulty)
  - `40` - Dense obstacles (harder pathfinding)
- `start` - Starting cell position (X, Y coordinates)
- `goal` - Target cell position (X, Y coordinates)

### Customization

To modify the grid behavior, edit `main.go`:

```go
// Create a custom grid with different parameters
g := grid.NewGrid(100, 100, 30)  // 100x100 grid with 30% obstacle density

// Set different start and goal positions
start := grid.Cell{10, 10}
goal := grid.Cell{90, 90}
```

## Algorithm Details

### A* Algorithm

The A* pathfinding algorithm finds the shortest path by:

1. **Heuristic Function** - Uses Manhattan distance: `|x1-x2| + |y1-y2|`
2. **Open Set** - Priority queue of nodes to be evaluated (ordered by F-score)
3. **Closed Set** - Nodes already evaluated
4. **Cost Calculation**:
   - **G-score** - Actual cost from start to current node
   - **H-score** - Estimated cost from current node to goal (heuristic)
   - **F-score** - G-score + H-score (used for prioritization)

### Movement

The algorithm explores 4 directions:
- Right: (1, 0)
- Left: (-1, 0)
- Down: (0, 1)
- Up: (0, -1)

(No diagonal movement allowed)

## Performance Tips

- **Larger grids** = Slower execution time
- **Higher density** = Fewer nodes explored (more blocked paths = faster elimination)
- **Lower density** = More nodes explored (more open paths to consider)
- **Optimal range**: 70x70 grid with 25% density balances realism and performance

## Modifying the Algorithm

### Change Start and Goal Positions
Edit `main.go` lines 15-16:
```go
start := grid.Cell{0, 0}          // Starting position
goal := grid.Cell{69, 69}         // Goal position
```

### Experiment with Different Densities
```go
density := 10    // Sparse
density := 25    // Moderate (default)
density := 40    // Dense
```

### Increase Grid Size
```go
rows, cols := 100, 100             // 100x100 grid (slower)
```

## Package Descriptions

- **astar** - Core A* algorithm with path reconstruction
- **grid** - Grid management and obstacle generation
- **pq** - Min-heap priority queue for efficient node selection
- **utils** - Helper functions for path operations

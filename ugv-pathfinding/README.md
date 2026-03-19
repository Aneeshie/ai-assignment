# UGV Pathfinding - A* Algorithm

A Go implementation of the A* pathfinding algorithm for finding the shortest path on a grid with obstacles.

## Overview

This project implements the A* pathfinding algorithm to find an optimal path from a start position to a goal position on a 2D grid with randomly placed obstacles. It's commonly used in robotics and game development for pathfinding.

## Project Structure

```
ugv-pathfinding/
├── main.go                 # Entry point - runs A* and dynamic navigation
├── go.mod                  # Go module definition
├── astar/
│   └── astar.go           # A* algorithm implementation
├── grid/
│   └── grid.go            # Grid structure and dynamic obstacle management
├── pq/
│   └── priority_queue.go  # Priority queue implementation
├── sensor/
│   └── sensor.go          # Sensor-based obstacle detection and replanning
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

When you run the program, you will see two phases of output:

### Phase 1: Static Pathfinding

```
=== STATIC PATHFINDING ===
Path found!
Path length: 140
Nodes explored: 2047
Execution time: 1.660334ms
```

**Output Explanation:**
- **Path found!** - Indicates a path exists from start to goal
- **Path length** - The number of steps in the found path
- **Nodes explored** - The number of nodes examined by the A* algorithm
- **Execution time** - Time for initial pathfinding

### Phase 2: Dynamic Obstacle Simulation

```
=== DYNAMIC OBSTACLE SIMULATION ===
Starting navigation with dynamic obstacles...

[Step 1] Sensor detected 9 obstacles nearby at position (1, 0)
[Step 2] Sensor detected 9 obstacles nearby at position (1, 1)
...
[Step 14] Dynamic obstacle detected nearby!
[Step 15] Sensor detected 24 obstacles nearby at position (9, 6)
...

=== DYNAMIC NAVIGATION COMPLETE ===
Final position: (68, 68)
Goal position: (69, 69)
Reached goal: true
Total replans triggered: 3
Total dynamic obstacles spawned: 5
Total nodes explored (including replans): 8345
Total navigation time: 45.234ms
```

**Output Explanation:**
- **Sensor detected X obstacles** - Real-time obstacle detection within sensor range
- **Dynamic obstacle detected** - New obstacle spawned during navigation
- **Path blocked by obstacle! Replanning** - Algorithm triggered replanning when obstacle blocks path
- **Replan successful** - New path computed from current position
- **Total replans** - Number of times the path was recalculated
- **Total dynamic obstacles spawned** - How many new obstacles appeared during navigation
- **Reached goal** - Whether the UGV successfully reached the destination despite dynamic obstacles

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

// Adjust sensor detection range
s := sensor.NewSensor(7)  // sensor range of 7 cells (default is 5)
```

## Dynamic Obstacle Simulation

This project extends the basic A* pathfinding with real-world dynamic obstacle handling through:

### Sensor Package (`sensor/sensor.go`)

The sensor system simulates real-time obstacle detection and navigation replanning:

**Key Features:**
- **Obstacle Detection** - Detects obstacles within sensor range of the current position
- **Dynamic Spawning** - Randomly spawns new obstacles ahead on the path during navigation
- **Path Blocking Detection** - Checks if upcoming path cells become blocked by new obstacles
- **Automatic Replanning** - Triggers A* recomputation from current position when path is blocked

**How It Works:**

1. **Navigation Phase**: As the UGV moves along the computed path, the sensor continuously scans for obstacles
2. **Dynamic Obstacle Generation**: Random obstacles spawn every 5 steps with a 30% probability ahead on the path
3. **Path Validation**: Before each move, the next 3 cells of the path are validated
4. **Intelligent Replanning**: If an obstacle blocks the path, A* is called from the current position to the goal
5. **Success Tracking**: Statistics on replans, obstacles encountered, and total computation time

**Configuration:**

```go
s := sensor.NewSensor(5)  // Create sensor with 5-cell detection radius
```

The detection radius determines how far ahead the UGV can "see" obstacles. Larger radius = earlier detection but more computation.

### Dynamic vs. Static Pathfinding

| Aspect | Static A* | Dynamic Simulation |
|--------|-----------|-------------------|
| **Obstacles Known** | All upfront | Some appear during navigation |
| **Replanning** | Never | When obstacles block path |
| **Real-world** | Unrealistic | More realistic |
| **Computation** | Single burst | Distributed (on-demand) |
| **Success Rate** | May fail if obstacles appear | Adapts and succeeds |

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

- **astar** - Core A* algorithm with path reconstruction and heuristic evaluation
- **grid** - Grid management with static obstacle generation and dynamic obstacle management (add/remove)
- **pq** - Min-heap priority queue for efficient node selection in open set
- **sensor** - Sensor-based real-time obstacle detection, dynamic obstacle simulation, and path validation with automatic replanning
- **utils** - Helper functions for path operations

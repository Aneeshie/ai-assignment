package main

import (
	"fmt"
	"time"

	"ugv-pathfinding/astar"
	"ugv-pathfinding/grid"
)

func main() {
	rows, cols := 70, 70
	density := 25 // change: 10, 25, 40

	g := grid.NewGrid(rows, cols, density)

	start := grid.Cell{0, 0}
	goal := grid.Cell{69, 69}

	startTime := time.Now()

	path, length, explored := astar.AStar(g, start, goal)

	elapsed := time.Since(startTime)

	if path == nil {
		fmt.Println("No path found!")
		return
	}

	fmt.Println("Path found!")
	fmt.Println("Path length:", length)
	fmt.Println("Nodes explored:", explored)
	fmt.Println("Execution time:", elapsed)
}

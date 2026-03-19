package main

import (
	"fmt"
	"time"

	"ugv-pathfinding/astar"
	"ugv-pathfinding/grid"
	"ugv-pathfinding/sensor"
)

func main() {
	rows, cols := 70, 70
	density := 25

	g := grid.NewGrid(rows, cols, density)

	start := grid.Cell{0, 0}
	goal := grid.Cell{69, 69}

	s := sensor.NewSensor(5)

	startTime := time.Now()

	path, length, explored := astar.AStar(g, start, goal)

	elapsed := time.Since(startTime)

	if path == nil {
		fmt.Println("No path found!")
		return
	}

	fmt.Println("=== STATIC PATHFINDING ===")
	fmt.Println("Path found!")
	fmt.Println("Path length:", length)
	fmt.Println("Nodes explored:", explored)
	fmt.Println("Execution time:", elapsed)

	fmt.Println("\n=== DYNAMIC OBSTACLE SIMULATION ===")
	fmt.Println("Starting navigation with dynamic obstacles...\n")

	simulateDynamicNavigation(g, s, start, goal, path)
}

func simulateDynamicNavigation(g *grid.Grid, s *sensor.Sensor, start, goal grid.Cell, initialPath []grid.Cell) {
	currentPos := start
	currentPathIndex := 0
	totalReplans := 0
	totalNodesExplored := 0
	totalDynamicObstacles := 0
	navigationStart := time.Now()

	for currentPathIndex < len(initialPath) {
		path := initialPath

		if s.SimulateRandomObstacle(g, currentPos, path) {
			fmt.Printf("[Step %d] Dynamic obstacle detected nearby!\n", currentPathIndex)
			totalDynamicObstacles++
		}

		if s.IsPathBlocked(g, path, currentPathIndex) {
			fmt.Printf("[Step %d] Path blocked by obstacle! Replanning from position (%d, %d)...\n", currentPathIndex, currentPos.X, currentPos.Y)
			totalReplans++

			newPath, nodeCount, _ := astar.AStar(g, currentPos, goal)

			if newPath == nil {
				fmt.Printf("[Step %d] ERROR: No path found from (%d, %d) to (%d, %d)!\n", currentPathIndex, currentPos.X, currentPos.Y, goal.X, goal.Y)
				break
			}

			fmt.Printf("[Step %d] Replan successful! New path length: %d, nodes explored: %d\n", currentPathIndex, len(newPath)-1, nodeCount)
			initialPath = newPath
			path = newPath
			currentPathIndex = 1
			totalNodesExplored += nodeCount
			continue
		}

		if currentPathIndex+1 < len(path) {
			currentPos = path[currentPathIndex+1]
			currentPathIndex++

			detectedObstacles := s.DetectObstacles(g, currentPos)
			if len(detectedObstacles) > 0 {
				fmt.Printf("[Step %d] Sensor detected %d obstacles nearby at position (%d, %d)\n", currentPathIndex, len(detectedObstacles), currentPos.X, currentPos.Y)
			}
		} else {
			break
		}
	}

	navigationTime := time.Since(navigationStart)

	fmt.Println("\n=== DYNAMIC NAVIGATION COMPLETE ===")
	fmt.Printf("Final position: (%d, %d)\n", currentPos.X, currentPos.Y)
	fmt.Printf("Goal position: (%d, %d)\n", goal.X, goal.Y)
	fmt.Printf("Reached goal: %v\n", currentPos.X == goal.X && currentPos.Y == goal.Y)
	fmt.Printf("Total replans triggered: %d\n", totalReplans)
	fmt.Printf("Total dynamic obstacles spawned: %d\n", totalDynamicObstacles)
	fmt.Printf("Total nodes explored (including replans): %d\n", totalNodesExplored)
	fmt.Printf("Total navigation time: %v\n", navigationTime)
}

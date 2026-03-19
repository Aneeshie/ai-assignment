package astar

import (
	"container/heap"
	"math"

	"ugv-pathfinding/grid"
	"ugv-pathfinding/pq"
)

func heuristic(a, b grid.Cell) int {
	return int(math.Abs(float64(a.X-b.X)) + math.Abs(float64(a.Y-b.Y)))
}

func AStar(g *grid.Grid, start, goal grid.Cell) ([]grid.Cell, int, int) {
	pqueue := &pq.PriorityQueue{}
	heap.Init(pqueue)

	startNode := &pq.Node{X: start.X, Y: start.Y, G: 0, F: heuristic(start, goal)}
	heap.Push(pqueue, startNode)

	parent := make(map[[2]int][2]int)
	gScore := make(map[[2]int]int)

	gScore[[2]int{start.X, start.Y}] = 0

	directions := [][]int{
		{1, 0}, {-1, 0}, {0, 1}, {0, -1},
	}

	nodesExplored := 0

	for pqueue.Len() > 0 {
		current := heap.Pop(pqueue).(*pq.Node)
		nodesExplored++

		if current.X == goal.X && current.Y == goal.Y {
			return reconstructPath(parent, start, goal), current.G, nodesExplored
		}

		for _, d := range directions {
			nx, ny := current.X+d[0], current.Y+d[1]

			if !g.IsValid(nx, ny) {
				continue
			}

			newG := current.G + 1
			key := [2]int{nx, ny}

			if oldG, ok := gScore[key]; !ok || newG < oldG {
				gScore[key] = newG
				f := newG + heuristic(grid.Cell{nx, ny}, goal)

				heap.Push(pqueue, &pq.Node{
					X: nx, Y: ny,
					G: newG, F: f,
				})

				parent[key] = [2]int{current.X, current.Y}
			}
		}
	}

	return nil, -1, nodesExplored
}

func reconstructPath(parent map[[2]int][2]int, start, goal grid.Cell) []grid.Cell {
	path := []grid.Cell{}
	current := [2]int{goal.X, goal.Y}

	for current != [2]int{start.X, start.Y} {
		path = append([]grid.Cell{{current[0], current[1]}}, path...)
		var ok bool
		current, ok = parent[current]
		if !ok {
			break
		}
	}

	path = append([]grid.Cell{{start.X, start.Y}}, path...)
	return path
}

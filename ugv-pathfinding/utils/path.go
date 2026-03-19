package utils

import "ugv-pathfinding/grid"

func Reconstruct(parent map[[2]int][2]int, start, goal grid.Cell) []grid.Cell {
	path := []grid.Cell{}
	curr := [2]int{goal.X, goal.Y}

	for curr != [2]int{start.X, start.Y} {
		path = append([]grid.Cell{{curr[0], curr[1]}}, path...)
		curr = parent[curr]
	}

	path = append([]grid.Cell{start}, path...)
	return path
}

package grid

import (
	"math/rand"
)

type Cell struct {
	X, Y int
}

type Grid struct {
	Rows, Cols int
	Data       [][]int
}

func NewGrid(rows, cols int, density int) *Grid {
	g := &Grid{
		Rows: rows,
		Cols: cols,
		Data: make([][]int, rows),
	}

	for i := 0; i < rows; i++ {
		g.Data[i] = make([]int, cols)
		for j := 0; j < cols; j++ {
			if rand.Intn(100) < density {
				g.Data[i][j] = 1
			}
		}
	}

	return g
}

func (g *Grid) IsValid(x, y int) bool {
	return x >= 0 && x < g.Rows && y >= 0 && y < g.Cols && g.Data[x][y] == 0
}

func (g *Grid) AddObstacle(x, y int) bool {
	if x >= 0 && x < g.Rows && y >= 0 && y < g.Cols {
		if g.Data[x][y] == 0 {
			g.Data[x][y] = 1
			return true
		}
	}
	return false
}

func (g *Grid) RemoveObstacle(x, y int) bool {
	if x >= 0 && x < g.Rows && y >= 0 && y < g.Cols {
		if g.Data[x][y] == 1 {
			g.Data[x][y] = 0
			return true
		}
	}
	return false
}

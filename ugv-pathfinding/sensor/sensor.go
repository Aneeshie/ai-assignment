package sensor

import (
	"math/rand"
	"ugv-pathfinding/grid"
)

type Sensor struct {
	SensorRange int
	StepCount   int
}

func NewSensor(sensorRange int) *Sensor {
	return &Sensor{
		SensorRange: sensorRange,
		StepCount:   0,
	}
}

func (s *Sensor) DetectObstacles(g *grid.Grid, currentPos grid.Cell) []grid.Cell {
	var detectedObstacles []grid.Cell

	for x := currentPos.X - s.SensorRange; x <= currentPos.X+s.SensorRange; x++ {
		for y := currentPos.Y - s.SensorRange; y <= currentPos.Y+s.SensorRange; y++ {
			if x >= 0 && x < g.Rows && y >= 0 && y < g.Cols {
				if g.Data[x][y] == 1 {
					detectedObstacles = append(detectedObstacles, grid.Cell{X: x, Y: y})
				}
			}
		}
	}

	return detectedObstacles
}

func (s *Sensor) SimulateRandomObstacle(g *grid.Grid, currentPos grid.Cell, path []grid.Cell) bool {
	s.StepCount++

	if s.StepCount%5 == 0 && len(path) > 0 {
		lookAhead := len(path) / 3
		if lookAhead < 1 {
			lookAhead = 1
		}
		if rand.Intn(100) < 30 {
			if lookAhead < len(path) {
				targetCell := path[lookAhead]
				offsetX := rand.Intn(3) - 1
				offsetY := rand.Intn(3) - 1
				obstacleX := targetCell.X + offsetX
				obstacleY := targetCell.Y + offsetY

				if g.AddObstacle(obstacleX, obstacleY) {
					return true
				}
			}
		}
	}

	return false
}

func (s *Sensor) IsPathBlocked(g *grid.Grid, path []grid.Cell, currentIndex int) bool {
	if currentIndex >= len(path) {
		return false
	}

	lookAhead := 3
	for i := currentIndex; i < currentIndex+lookAhead && i < len(path); i++ {
		cell := path[i]
		if !g.IsValid(cell.X, cell.Y) {
			return true
		}
	}

	return false
}

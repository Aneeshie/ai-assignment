package main

import (
	"dijkstra/dijkstra"
	"dijkstra/graph"
	"fmt"
)

func main() {
	graphData := graph.LoadGraphFromCSV("data/india_roads.csv")

	source := "Delhi"

	distances := dijkstra.Run(graphData, source)

	fmt.Println("Shortest distances from", source)
	for city, d := range distances {
		fmt.Println(city, "->", d, "km")
	}
}

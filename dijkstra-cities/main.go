package main

import (
	"dijkstra/dijkstra"
	"dijkstra/graph"
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: go run main.go <source> <destination>")
		return
	}

	source := os.Args[1]
	destination := os.Args[2]

	graphData := graph.LoadGraphFromCSV("data/india_roads.csv")

	distances := dijkstra.Run(graphData, source)

	dist, ok := distances[destination]
	if !ok {
		fmt.Println("Destination city not found in graph")
		return
	}

	fmt.Printf("Shortest distance from %s to %s: %d km\n",
		source, destination, dist)
}


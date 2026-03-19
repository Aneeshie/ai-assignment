package graph

import (
	"encoding/csv"
	"os"
	"strconv"
)

func AddEdge(graph map[string][]Edge, u, v string, w int) {
	graph[u] = append(graph[u], Edge{v, w})
	graph[v] = append(graph[v], Edge{u, w})
}

func LoadGraphFromCSV(filename string) map[string][]Edge {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, _ := reader.ReadAll()

	graph := make(map[string][]Edge)

	for i := 1; i < len(records); i++ {
		u := records[i][0]
		v := records[i][1]
		w, _ := strconv.Atoi(records[i][2])

		AddEdge(graph, u, v, w)
	}

	return graph
}

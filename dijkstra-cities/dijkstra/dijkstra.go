package dijkstra

import (
	"container/heap"
	"dijkstra/graph"
	"dijkstra/pq"
	"math"
)

func Run(graphData map[string][]graph.Edge, source string) map[string]int {
	dist := make(map[string]int)

	for city := range graphData {
		dist[city] = math.MaxInt32
	}
	dist[source] = 0

	pqueue := &pq.PriorityQueue{}
	heap.Init(pqueue)

	heap.Push(pqueue, &pq.Item{City: source, Priority: 0})

	for pqueue.Len() > 0 {
		item := heap.Pop(pqueue).(*pq.Item)
		currCity := item.City
		currDist := item.Priority

		if currDist > dist[currCity] {
			continue
		}

		for _, edge := range graphData[currCity] {
			newDist := currDist + edge.Weight

			if newDist < dist[edge.To] {
				dist[edge.To] = newDist
				heap.Push(pqueue, &pq.Item{
					City:     edge.To,
					Priority: newDist,
				})
			}
		}
	}

	return dist
}

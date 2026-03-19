# 🚀 Dijkstra Cities (India Road Network)

A Go implementation of **Dijkstra’s Algorithm (Uniform Cost Search)** to compute the shortest distance between cities in India using real road distance data from a CSV file.

---

## 📌 Features

* 📍 Graph built dynamically from CSV data
* ⚡ Efficient shortest path computation using **min-heap (priority queue)**
* 🧠 Implements **Dijkstra / Uniform Cost Search**
* 💻 CLI-based usage
* 🧱 Clean modular project structure

---

## 🗂️ Project Structure

```
dijkstra-cities/
│
├── go.mod
├── main.go
│
├── data/
│   └── india_roads.csv
│
├── graph/
│   ├── graph.go
│   └── edge.go
│
├── dijkstra/
│   └── dijkstra.go
│
├── pq/
│   └── priority_queue.go
│
└── utils/ (optional)
```

---

## 📊 Dataset

The dataset (`india_roads.csv`) contains road distances between major Indian cities in the format:

```
Origin,Destination,Distance
Delhi,Mumbai,1452
Mumbai,Pune,150
...
```

---

## ⚙️ How to Run

### 1️⃣ Clone / Navigate to project

```
cd dijkstra-cities
```

---

### 2️⃣ Initialize Go module (only once)

```
go mod init dijkstra
```

---

### 3️⃣ Run the program

```
go run main.go <source> <destination>
```

### ✅ Example

```
go run main.go Delhi Mumbai
```

---

## 📈 Expected Output

```
Shortest distance from Delhi to Mumbai: 1452 km
```

---

## ⚠️ Notes

* City names must match exactly as in the CSV file
* If a city is not found, the program will return:

  ```
  Destination city not found in graph
  ```

---

## 🧠 Algorithm Details

* Uses **Dijkstra’s Algorithm**
* Time Complexity:

  ```
  O((V + E) log V)
  ```
* Works only with **non-negative edge weights**

---


## 💡 Example Use Case

Find shortest travel distance:

```
Input:
Delhi → Bengaluru

Output:
Shortest distance from Delhi to Bengaluru: 2158 km
```

---



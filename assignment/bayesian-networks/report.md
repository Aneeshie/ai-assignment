# Bayesian Networks

## Overview
A Bayesian Network is a probabilistic graphical model that represents a set of variables and their conditional dependencies via a directed acyclic graph (DAG). They are used for reasoning under uncertainty, diagnosing anomalies, and making predictions.

## Tools for Modeling and Inferencing

### 1. pgmpy (Python)
A pure Python library for working with Probabilistic Graphical Models. It supports both exact (e.g., Variable Elimination) and approximate (e.g., Markov Chain Monte Carlo) inference algorithms.

### 2. Netica
A commercial software for Bayesian network and influence diagram modeling. It offers a rich graphical interface for constructing networks and observing probability propagation instantly.

### 3. GeNIe / SMILE
GeNIe is a GUI for creating and learning Bayesian Networks, powered by the SMILE reasoning engine. Popular in academia and industry for decision-theoretic modeling.

### 4. Custom Implementations (JavaScript)
For web applications, lightweight Bayesian inference can be written in JavaScript. While libraries like `bayesjs` exist, exact inference by enumeration can be easily implemented for small networks.

## Implemented Example
We have chosen the classic **"Wet Grass"** Bayesian Network to implement in JavaScript using exact inference by enumeration.

### The Model:
- **Cloudy (C):** True/False
- **Sprinkler (S):** True/False (depends on Cloudy)
- **Rain (R):** True/False (depends on Cloudy)
- **WetGrass (W):** True/False (depends on Sprinkler and Rain)

Check out the `example.js` file for the code implementation of this model and a query demonstrating probabilistic inference.

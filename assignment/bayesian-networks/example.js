/**
 * Bayesian Network Inference by Enumeration
 * Example: The classic "Wet Grass" Network
 * 
 * Variables: Cloudy (C), Sprinkler (S), Rain (R), WetGrass (W)
 */

// Define the Conditional Probability Tables (CPTs)
const P_Cloudy = 0.5;

const P_Sprinkler_given_Cloudy = {
    true: 0.10,
    false: 0.50
};

const P_Rain_given_Cloudy = {
    true: 0.80,
    false: 0.20
};

const P_WetGrass_given_Sprinkler_Rain = {
    'true,true': 0.99,
    'true,false': 0.90,
    'false,true': 0.90,
    'false,false': 0.00
};

// Function to calculate joint probability of a specific complete assignment
function jointProbability(c, s, r, w) {
    const p_c = c ? P_Cloudy : (1 - P_Cloudy);
    const p_s = s ? P_Sprinkler_given_Cloudy[c] : (1 - P_Sprinkler_given_Cloudy[c]);
    const p_r = r ? P_Rain_given_Cloudy[c] : (1 - P_Rain_given_Cloudy[c]);
    const p_w_base = P_WetGrass_given_Sprinkler_Rain[`${s},${r}`];
    const p_w = w ? p_w_base : (1 - p_w_base);

    return p_c * p_s * p_r * p_w;
}

// Inference by Enumeration
// Query: P(Rain=true | WetGrass=true)
function inference() {
    let probRainAndWet = 0;
    let probNotRainAndWet = 0;

    // Enumerate over hidden variables: Cloudy, Sprinkler
    for (const c of [true, false]) {
        for (const s of [true, false]) {
            // P(Rain=true, WetGrass=true, C=c, S=s)
            probRainAndWet += jointProbability(c, s, true, true);
            
            // P(Rain=false, WetGrass=true, C=c, S=s)
            probNotRainAndWet += jointProbability(c, s, false, true);
        }
    }

    // Normalize
    const probWet = probRainAndWet + probNotRainAndWet;
    const p_rain_given_wet = probRainAndWet / probWet;

    console.log(`P(Rain=true | WetGrass=true) = ${p_rain_given_wet.toFixed(4)}`);
}

console.log("=== Bayesian Network: Wet Grass Example ===");
inference();

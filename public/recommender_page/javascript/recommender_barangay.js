// Step 1: Global variables
let selectedCategory = null;
let selectedBarangay = null;

// Min-Max normalization functions
const minMaxNormalize = (value, min, max) =>
  (((value - min) / (max - min)) * 100).toFixed(2);
const inverseMinMaxNormalize = (value, min, max) =>
  (100 - ((value - min) / (max - min)) * 100).toFixed(2);

/*// Function to handle the selection of a category
function selectBusiness(button) {
  const barangayButtons = document.querySelectorAll(".barangay-btn");

  // Remove 'selected' class from all buttons
  barangayButtons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Add 'selected' class to the clicked button
  button.classList.add("selected");

  // Set the selected category to the button's text content
  selectedCategory = button.textContent.trim();
  console.log("Selected Category:", selectedCategory);

  // Reset selected barangay when a new category is chosen
  selectedBarangay = null;
}*/

// Function to handle the selection of a category
function selectBusiness(button) {
  const barangayButtons = document.querySelectorAll(".barangay-btn");

  // Remove 'selected' class from all buttons
  barangayButtons.forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Add 'selected' class to the clicked button
  button.classList.add("selected");

  // Set the selected category to the button's text content
  selectedCategory = button.textContent.trim();
  console.log("Selected Category:", selectedCategory);

  // Store the selected category in sessionStorage
  sessionStorage.setItem("selectedCategory", selectedCategory);

  // Reset selected barangay when a new category is chosen
  selectedBarangay = null;
}

// Function to show and hide the spinner
function toggleSpinner(show) {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = show ? "flex" : "none"; // Flex to center it, none to hide
}

// Function to handle the proceed button (Step 2)
async function handleProceed() {
  if (selectedCategory) {
    try {
      toggleSpinner(true); // Show spinner

      // Simulate delay or actual fetch
      const topBarangays = await runClusteringModel(selectedCategory);

      // Show the table after fetching barangay data
      const resultSection = document.getElementById("result-section");
      resultSection.style.display = "block";

      const tableBody = document.querySelector(".styled-table tbody");
      tableBody.innerHTML = "";

      topBarangays.forEach((barangay, index) => {
        const row = document.createElement("tr");
        row.classList.add("barangay-row");

        const barangayCell = document.createElement("td");
        barangayCell.textContent = `${index + 1}. ${barangay.name}`;
        row.appendChild(barangayCell);

        const scoreCell = document.createElement("td");
        scoreCell.textContent = barangay.totalScore.toFixed(2);
        row.appendChild(scoreCell);

        row.addEventListener("click", () =>
          selectBarangayRow(row, barangay.name)
        );

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      toggleSpinner(false); // Hide spinner after completion
    }
  } else {
    alert("Please select a category before proceeding.");
  }
}


// Modified handleAnalyze function with loading spinner
function handleAnalyze() {
  toggleSpinner(true); // Show spinner
  setTimeout(() => {
    toggleSpinner(false); // Hide spinner after a delay
    window.location.href = "barangay_analysis.html";
  }, 2000); // Simulate a delay of 2 seconds
}

// Function to read CSV data and run the clustering model
async function runClusteringModel(selectedCategory) {
  // Fetch the business counts per barangay based on the selected category
  const response = await fetch(
    `/api/barangay-business-counts?selectedCategory=${selectedCategory}`
  );
  if (!response.ok) throw new Error("Failed to fetch barangay business counts");
  const businessData = await response.json();

  // Initialize a map to store the counts by barangay
  const barangayCounts = {};
  businessData.forEach((row) => {
    barangayCounts[row.barangay_name] = row.business_count;
  });

  // List of all barangays
  const allBarangays = [
    "Baclaran",
    "Banaybanay",
    "Banlic",
    "Bigaa",
    "Butong",
    "Casile",
    "Diezmo",
    "Gulod",
    "Mamatid",
    "Marinig",
    "Niugan",
    "Pittland",
    "Poblacion Dos",
    "Poblacion Tres",
    "Poblacion Uno",
    "Pulo",
    "Sala",
    "San Isidro",
  ];

  // Include barangays with 0 counts
  allBarangays.forEach((barangay) => {
    if (!(barangay in barangayCounts)) {
      barangayCounts[barangay] = 0;
    }
  });

  // Normalize the barangay counts using Min-Max normalization
  const countValues = Object.values(barangayCounts);
  const minCount = Math.min(...countValues);
  const maxCount = Math.max(...countValues);

  const normalizedCounts = {};
  for (let barangay in barangayCounts) {
    normalizedCounts[barangay] = minMaxNormalize(
      barangayCounts[barangay],
      minCount,
      maxCount
    );
  }

  // Print the counts per barangay
  console.log("Barangay Counts:", barangayCounts);
  console.log("Normalized Counts:", normalizedCounts); // Check normalized counts

  const responseDirect = await fetch(
    `/api/direct-competitors?selectedCategory=${selectedCategory}`
  );
  if (!responseDirect.ok) throw new Error("Failed to fetch direct competitors");
  const directData = await responseDirect.json();

  // Initialize a map to store the counts for direct competitors by barangay
  const directCompetition = {};
  directData.forEach((row) => {
    directCompetition[row.barangay_name] = row.business_count;
  });

  const responseIndirect = await fetch(
    `/api/indirect-competitors?selectedCategory=${selectedCategory}`
  );
  if (!responseIndirect.ok)
    throw new Error("Failed to fetch indirect competitors");
  const indirectData = await responseIndirect.json();

  // Initialize a map to store the counts for indirect competitors by barangay
  const indirectCompetition = {};
  indirectData.forEach((row) => {
    indirectCompetition[row.barangay_name] = row.business_count;
  });

  const responseReplacement = await fetch(
    `/api/replacement-competitors?selectedCategory=${selectedCategory}`
  );
  if (!responseReplacement.ok)
    throw new Error("Failed to fetch replacement competitors");
  const replacementData = await responseReplacement.json();

  // Initialize a map to store the counts for replacement competitors by barangay
  const replacementCompetition = {};
  replacementData.forEach((row) => {
    replacementCompetition[row.barangay_name] = row.business_count;
  });

  // Include barangays with 0 counts
  allBarangays.forEach((barangay) => {
    if (!(barangay in directCompetition)) {
      directCompetition[barangay] = 0;
    }
    if (!(barangay in indirectCompetition)) {
      indirectCompetition[barangay] = 0;
    }
    if (!(barangay in replacementCompetition)) {
      replacementCompetition[barangay] = 0;
    }
  });

  // Print the competition counts per barangay
  console.log("Direct Competition:", directCompetition);
  console.log("Indirect Competition:", indirectCompetition);
  console.log("Replacement Competition:", replacementCompetition);

  // Calculate Competitor Density for each barangay
  const competitorDensity = {};
  allBarangays.forEach((barangay) => {
    const direct = directCompetition[barangay] || 0;
    const indirect = indirectCompetition[barangay] || 0;
    const replacement = replacementCompetition[barangay] || 0;

    competitorDensity[barangay] =
      direct * 0.6 + indirect * 0.3 + replacement * 0.1;
  });

  // Min-Max normalization of competitor density
  const competitionValues = Object.values(competitorDensity);
  const minCompetition = Math.min(...competitionValues);
  const maxCompetition = Math.max(...competitionValues);

  const normalizedCompetition = {};
  const inverseNormalizedCompetition = {};

  for (let barangay in competitorDensity) {
    normalizedCompetition[barangay] = minMaxNormalize(
      competitorDensity[barangay],
      minCompetition,
      maxCompetition
    );
    inverseNormalizedCompetition[barangay] = inverseMinMaxNormalize(
      competitorDensity[barangay],
      minCompetition,
      maxCompetition
    );
  }

  console.log("Normalized Competition:", normalizedCompetition); // Check normalized competition data
  console.log("Inverse Normalized Competition:", inverseNormalizedCompetition); // Check inverse normalized competition data

  // Fetch barangay area types
  const responseArea = await fetch("/api/barangay-area-types");
  if (!responseArea.ok) throw new Error("Failed to fetch barangay area types");
  const areaData = await responseArea.json();

  // Initialize a map to store the area types by barangay
  const areaTypes = {};
  areaData.forEach((row) => {
    areaTypes[row.barangay_name] = row.area_type;
  });

  console.log("Barangay Area Types:", areaTypes); // Check area types

  const areaTypeWeights = {
    "Automotive Services": { Commercial: 50, Industrial: 15, Residential: 35 },
    "Construction and Real Estate": {
      Commercial: 40,
      Industrial: 25,
      Residential: 35,
    },
    "Cooperative Business": { Commercial: 45, Industrial: 20, Residential: 35 },
    "Creative and Media Services": {
      Commercial: 60,
      Industrial: 0,
      Residential: 40,
    },
    "Educational Services": { Commercial: 60, Industrial: 0, Residential: 40 },
    "Entertainment and Recreation": {
      Commercial: 60,
      Industrial: 0,
      Residential: 40,
    },
    "Finance and Insurance": { Commercial: 70, Industrial: 0, Residential: 30 },
    "Food Services": { Commercial: 50, Industrial: 0, Residential: 50 },
    "Healthcare Services": { Commercial: 60, Industrial: 0, Residential: 40 },
    "IT and Digital Services": {
      Commercial: 70,
      Industrial: 0,
      Residential: 30,
    },
    "Manufacturing and Production": {
      Commercial: 20,
      Industrial: 70,
      Residential: 10,
    },
    "Personal and Household Services": {
      Commercial: 40,
      Industrial: 0,
      Residential: 60,
    },
    "Personal Care Services": {
      Commercial: 60,
      Industrial: 0,
      Residential: 40,
    },
    "Professional Services": {
      Commercial: 60,
      Industrial: 20,
      Residential: 20,
    },
    "Retail Stores": { Commercial: 50, Industrial: 0, Residential: 50 },
    "Tourism and Hospitality": {
      Commercial: 60,
      Industrial: 10,
      Residential: 30,
    },
    "Transportation and Logistics": {
      Commercial: 30,
      Industrial: 60,
      Residential: 10,
    },
    "Wholesale and Distribution": {
      Commercial: 40,
      Industrial: 50,
      Residential: 10,
    },
  };

  // Store area type data
  const areaTypes1 = {};
  areaData.forEach((row) => {
    areaTypes1[row.barangay_name] = row.area_type
      .split(",")
      .map((type) => type.trim());
  });

  // Calculate area type scores
  const areaTypeScores = {};

  // Iterate over all barangays
  for (const barangay in areaTypes) {
    const areaTypesList = areaTypes1[barangay];
    let score = 0;

    // Check if the area type is "Mixed"
  if (areaTypesList.includes("Mixed")) {
    score = 100; // Set score to 100 if "Mixed" is found
  } else {
    // For each area type, add the corresponding weight from areaTypeWeights
    areaTypesList.forEach((area) => {
      if (areaTypeWeights[selectedCategory][area]) {
        score += areaTypeWeights[selectedCategory][area];
      }
    });
  }

    // Store the total area type score for each barangay
    areaTypeScores[barangay] = score;
  }

  // Print the area type scores
  console.log("Area Type Scores:", areaTypeScores); // Check area type scores

  // Fetch barangay population density
  const popDensityResponse = await fetch("/api/barangay-population-density");
  if (!popDensityResponse.ok)
    throw new Error("Failed to fetch barangay population density");
  const populationData = await popDensityResponse.json();

  // Process and normalize the population density data
  const populationDensity = {};
  populationData.forEach((row) => {
    populationDensity[row.barangay_name] = Number(row.popdensity);
  });

  // Normalize the population density using Min-Max normalization
  const populationValues = Object.values(populationDensity);
  const minPopulation = Math.min(...populationValues);
  const maxPopulation = Math.max(...populationValues);

  const normalizedPopulation = {};
  for (let barangay in populationDensity) {
    normalizedPopulation[barangay] = minMaxNormalize(
      populationDensity[barangay],
      minPopulation,
      maxPopulation
    );
  }

  // Print the normalized population density per barangay

  console.log("Normalized Counts:", normalizedCounts); // Check normalized counts
  console.log("Normalized Population Density:", normalizedPopulation); // Check normalized population density

  // Fetch transportation and accessibility scores for each barangay
  const transpoResponse = await fetch(`/api/barangay-transportation-scores`);
  if (!transpoResponse.ok)
    throw new Error("Failed to fetch barangay transportation scores");
  const transpoData = await transpoResponse.json();

  // Initialize a map to store the transportation and accessibility scores by barangay
  const transpoScores = {};
  transpoData.forEach((row) => {
    transpoScores[row.barangay] = row.transportation_and_accessibility;
  });

  // Normalize the transportation scores using Min-Max normalization
  const transpoValues = Object.values(transpoScores);
  const minTranspo = Math.min(...transpoValues);
  const maxTranspo = Math.max(...transpoValues);

  const normalizedTranspo = {};
  for (let barangay in transpoScores) {
    normalizedTranspo[barangay] = minMaxNormalize(
      transpoScores[barangay],
      minTranspo,
      maxTranspo
    );
  }

  // Print the transportation and accessibility scores and the normalized scores
  console.log("Transportation and Accessibility Scores:", transpoScores);
  console.log("Normalized Transportation Scores:", normalizedTranspo); // Check normalized transportation scores

  // Fetch average market demand per barangay
  const demandResponse = await fetch(
    `/api/barangay-average-demand?selectedCategory=${selectedCategory}`
  );
  if (!demandResponse.ok)
    throw new Error("Failed to fetch barangay average demand");
  const demandData = await demandResponse.json();

  // Initialize an object to store the average market demands
  const avgMarketDemands = {};
  demandData.forEach((row) => {
    avgMarketDemands[row.barangay] = parseFloat(row.average_demand).toFixed(2);
  });

  // Normalize the market demands using Min-Max normalization
  const demandValues = Object.values(avgMarketDemands).map(Number);
  const minDemand = Math.min(...demandValues);
  const maxDemand = Math.max(...demandValues);

  const normalizedDemands = {};
  for (let barangay in avgMarketDemands) {
    normalizedDemands[barangay] = minMaxNormalize(
      avgMarketDemands[barangay],
      minDemand,
      maxDemand
    );
  }

  // Print the average market demands and normalized demands
  console.log("Average Market Demands:", avgMarketDemands);
  console.log("Normalized Demands:", normalizedDemands);

  // Calculate market gaps (Market Demand - Counts)
  const barangayGaps = {};
  for (let barangay in normalizedDemands) {
    if (normalizedCounts[barangay] !== undefined) {
      barangayGaps[barangay] = (
        normalizedDemands[barangay] - normalizedCounts[barangay]
      ).toFixed(2);
    }
  }
  // Normalize the market gaps
  const gapValues = Object.values(barangayGaps);
  const minGap = Math.min(...gapValues);
  const maxGap = Math.max(...gapValues);
  const normalizedMarketGaps = {};
  for (let barangay in barangayGaps) {
    normalizedMarketGaps[barangay] = minMaxNormalize(
      barangayGaps[barangay],
      minGap,
      maxGap
    );
  }

  console.log("Market Gaps:", normalizedMarketGaps); // Check calculated market gaps

  //WEIGHTING
  // Multiply factors by their weights
  const factorWeights = {
    normalizedDemands: 0.24,
    normalizedMarketGaps: 0.26,
    inverseNormalizedCompetition: 0.21,
    normalizedPopulation: 0.1,
    normalizedTranspo: 0.07,
    areaTypeScores: 0.12,
  };

  // Initialize separate objects to store weighted values for each factor
  const weightedNormalizedDemands = {};
  const weightedNormalizedMarketGaps = {};
  const weightedInverseNormalizedCompetition = {};
  const weightedNormalizedPopulation = {};
  const weightedNormalizedTranspo = {};
  const weightedAreaTypeScores = {};

  // Calculate weighted values for each barangay without summing them up
  for (let barangay of allBarangays) {
    weightedNormalizedDemands[barangay] =
      (normalizedDemands[barangay] || 0) * factorWeights.normalizedDemands;
    weightedNormalizedMarketGaps[barangay] =
      (normalizedMarketGaps[barangay] || 0) *
      factorWeights.normalizedMarketGaps;
    weightedInverseNormalizedCompetition[barangay] =
      (inverseNormalizedCompetition[barangay] || 0) *
      factorWeights.inverseNormalizedCompetition;
    weightedNormalizedPopulation[barangay] =
      (normalizedPopulation[barangay] || 0) *
      factorWeights.normalizedPopulation;
    weightedNormalizedTranspo[barangay] =
      (normalizedTranspo[barangay] || 0) * factorWeights.normalizedTranspo;
    weightedAreaTypeScores[barangay] =
      (areaTypeScores[barangay] || 0) * factorWeights.areaTypeScores;
  }

  // KMEANS CLUSTERING

  // Define the number of clusters
  const k = 3;

  // Combine the weighted factors into a single array of objects
  const factorArray = allBarangays.map((barangay) => ({
    name: barangay,
    weightedDemands: weightedNormalizedDemands[barangay],
    weightedGaps: weightedNormalizedMarketGaps[barangay],
    weightedCompetition: weightedInverseNormalizedCompetition[barangay],
    weightedPopulation: weightedNormalizedPopulation[barangay],
    weightedTranspo: weightedNormalizedTranspo[barangay],
    weightedAreaType: weightedAreaTypeScores[barangay],
  }));

  // Function to initialize centroids randomly
  function initializeCentroids(data, k) {
    const centroids = [];
    const usedIndexes = new Set();

    while (centroids.length < k) {
      const randomIndex = Math.floor(Math.random() * data.length);
      if (!usedIndexes.has(randomIndex)) {
        centroids.push(data[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }
    return centroids;
  }

  // Function to calculate the distance between two points
  function calculateDistance(point1, point2) {
    return Math.sqrt(
      Math.pow(point1.weightedDemands - point2.weightedDemands, 2) +
        Math.pow(point1.weightedGaps - point2.weightedGaps, 2) +
        Math.pow(point1.weightedCompetition - point2.weightedCompetition, 2) +
        Math.pow(point1.weightedPopulation - point2.weightedPopulation, 2) +
        Math.pow(point1.weightedTranspo - point2.weightedTranspo, 2) +
        Math.pow(point1.weightedAreaType - point2.weightedAreaType, 2)
    );
  }

  // K-means clustering function
  function kMeansClustering(data, k, iterations = 100) {
    let centroids = initializeCentroids(data, k);
    let clusters = new Array(data.length).fill(null);

    for (let i = 0; i < iterations; i++) {
      // Step 1: Assign clusters based on nearest centroid
      clusters = data.map((barangay) => {
        let closestCentroidIndex = -1;
        let minDistance = Infinity;

        centroids.forEach((centroid, index) => {
          const distance = calculateDistance(barangay, centroid);
          if (distance < minDistance) {
            minDistance = distance;
            closestCentroidIndex = index;
          }
        });

        return closestCentroidIndex;
      });

      // Step 2: Update centroids based on current cluster assignments
      const newCentroids = Array.from({ length: k }, () => ({
        weightedDemands: 0,
        weightedGaps: 0,
        weightedCompetition: 0,
        weightedPopulation: 0,
        weightedTranspo: 0,
        weightedAreaType: 0,
        count: 0,
      }));

      clusters.forEach((clusterIndex, barangayIndex) => {
        newCentroids[clusterIndex].weightedDemands +=
          data[barangayIndex].weightedDemands;
        newCentroids[clusterIndex].weightedGaps +=
          data[barangayIndex].weightedGaps;
        newCentroids[clusterIndex].weightedCompetition +=
          data[barangayIndex].weightedCompetition;
        newCentroids[clusterIndex].weightedPopulation +=
          data[barangayIndex].weightedPopulation;
        newCentroids[clusterIndex].weightedTranspo +=
          data[barangayIndex].weightedTranspo;
        newCentroids[clusterIndex].weightedAreaType +=
          data[barangayIndex].weightedAreaType;
        newCentroids[clusterIndex].count++;
      });

      centroids = newCentroids.map((centroid) => {
        return {
          weightedDemands: centroid.weightedDemands / centroid.count,
          weightedGaps: centroid.weightedGaps / centroid.count,
          weightedCompetition: centroid.weightedCompetition / centroid.count,
          weightedPopulation: centroid.weightedPopulation / centroid.count,
          weightedTranspo: centroid.weightedTranspo / centroid.count,
          weightedAreaType: centroid.weightedAreaType / centroid.count,
        };
      });
    }

    return clusters;
  }

  // Execute K-means clustering
  const clusters = kMeansClustering(factorArray, k);

  // Display the clusters
  const clusteredResults = {};

  clusters.forEach((clusterIndex, index) => {
    const barangayName = factorArray[index].name;
    if (!clusteredResults[clusterIndex]) {
      clusteredResults[clusterIndex] = [];
    }
    clusteredResults[clusterIndex].push(barangayName);
  });

  console.log("Cluster results:");
  for (const [clusterIndex, barangays] of Object.entries(clusteredResults)) {
    console.log(`Cluster ${clusterIndex}: ${barangays.join(", ")}`);
  }

  // Calculate and display average factor values for each cluster
  const clusterAverages = Array.from({ length: k }, () => ({
    weightedDemands: 0,
    weightedGaps: 0,
    weightedCompetition: 0,
    weightedPopulation: 0,
    weightedTranspo: 0,
    weightedAreaType: 0,
    count: 0,
    compositeScore: 0,
  }));

  // Sum up factor values for each cluster
  clusters.forEach((clusterIndex, barangayIndex) => {
    const barangay = factorArray[barangayIndex];
    const cluster = clusterAverages[clusterIndex];

    cluster.weightedDemands += barangay.weightedDemands;
    cluster.weightedGaps += barangay.weightedGaps;
    cluster.weightedCompetition += barangay.weightedCompetition;
    cluster.weightedPopulation += barangay.weightedPopulation;
    cluster.weightedTranspo += barangay.weightedTranspo;
    cluster.weightedAreaType += barangay.weightedAreaType;
    cluster.count++;
  });

  // Calculate averages for each factor and composite score in each cluster
  clusterAverages.forEach((cluster, index) => {
    cluster.weightedDemands /= cluster.count;
    cluster.weightedGaps /= cluster.count;
    cluster.weightedCompetition /= cluster.count;
    cluster.weightedPopulation /= cluster.count;
    cluster.weightedTranspo /= cluster.count;
    cluster.weightedAreaType /= cluster.count;

    // Calculate the composite score as the sum of the average values
    cluster.compositeScore =
      cluster.weightedDemands +
      cluster.weightedGaps +
      cluster.weightedCompetition +
      cluster.weightedPopulation +
      cluster.weightedTranspo +
      cluster.weightedAreaType;
  });

  // Display average values and composite scores for each cluster
  console.log("\nAverage factor values and composite score for each cluster:");
  let highestScoreCluster = { index: -1, score: -Infinity };

  clusterAverages.forEach((cluster, index) => {
    console.log(`\nCluster ${index}:`);
    console.log(`  Weighted Demands: ${cluster.weightedDemands.toFixed(2)}`);
    console.log(`  Weighted Gaps: ${cluster.weightedGaps.toFixed(2)}`);
    console.log(
      `  Weighted Competition: ${cluster.weightedCompetition.toFixed(2)}`
    );
    console.log(
      `  Weighted Population: ${cluster.weightedPopulation.toFixed(2)}`
    );
    console.log(`  Weighted Transpo: ${cluster.weightedTranspo.toFixed(2)}`);
    console.log(`  Weighted Area Type: ${cluster.weightedAreaType.toFixed(2)}`);
    console.log(`  Composite Score: ${cluster.compositeScore.toFixed(2)}`);

    // Identify the highest composite score
    if (cluster.compositeScore > highestScoreCluster.score) {
      highestScoreCluster = { index, score: cluster.compositeScore };
    }
  });

  console.log(
    `\nCluster with the highest composite score: Cluster ${
      highestScoreCluster.index
    } (Score: ${highestScoreCluster.score.toFixed(2)})`
  );

  const topClusterIndex = highestScoreCluster.index;

  // Create an array to hold barangays and their total scores in the highest scoring cluster
  const barangayScoresInTopCluster = [];

  // Calculate the total score for each barangay in the highest scoring cluster
  clusters.forEach((clusterIndex, barangayIndex) => {
    if (clusterIndex === topClusterIndex) {
      const barangay = factorArray[barangayIndex];
      const totalScore =
        barangay.weightedDemands +
        barangay.weightedGaps +
        barangay.weightedCompetition +
        barangay.weightedPopulation +
        barangay.weightedTranspo +
        barangay.weightedAreaType;

      barangayScoresInTopCluster.push({
        name: barangay.name,
        totalScore: totalScore,
      });
    }
  });

  const topBarangays = barangayScoresInTopCluster
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  // Print the top 3 barangays and their total scores
  console.log("\nTop 3 Barangays in Cluster with Highest Score:");
  topBarangays.forEach(({ name, totalScore }, index) => {
    console.log(
      `  Rank ${index + 1}: ${name} - Total Score: ${totalScore.toFixed(2)}`
    );
  });

  return topBarangays;
}

/*// Function to handle row selection in the barangay table
function selectBarangayRow(row, barangayName) {
  // Remove 'selected' class from all rows
  const rows = document.querySelectorAll(".styled-table tbody tr");
  rows.forEach((r) => r.classList.remove("selected-row"));

  // Add 'selected' class to the clicked row
  row.classList.add("selected-row");

  // Set the selected barangay
  selectedBarangay = barangayName;
}*/

// Function to handle row selection in the barangay table
function selectBarangayRow(row, barangayName) {
  // Remove 'selected' class from all rows
  const rows = document.querySelectorAll(".styled-table tbody tr");
  rows.forEach((r) => r.classList.remove("selected-row"));

  // Add 'selected' class to the clicked row
  row.classList.add("selected-row");

  // Set the selected barangay in localStorage
  localStorage.setItem("selectedBarangay", barangayName);
}

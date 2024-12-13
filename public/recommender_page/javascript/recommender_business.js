// Step 1: Global variables for analysis
let selectedCategory = null;
let selectedBarangay = null;

// Function to handle barangay button selection
function selectBarangay(button) {
  const barangayButtons = document.querySelectorAll(".barangay-btn");
  barangayButtons.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
  selectedBarangay = button.textContent.trim();
  console.log("Selected Barangay:", selectedBarangay);
  
  // Store selectedBarangay in localStorage
  localStorage.setItem("selectedBarangay", selectedBarangay);
  
  selectedCategory = null; // Reset selected category when a new barangay is selected
  sessionStorage.removeItem("selectedCategory"); // Remove category selection when a new barangay is selected
}

// Function to select a category row
function selectCategoryRow(row, category) {
  const rows = document.querySelectorAll(".styled-table tbody tr");
  rows.forEach((r) => r.classList.remove("selected-row"));
  row.classList.add("selected-row");
  selectedCategory = category;
  console.log("Selected Category:", selectedCategory);
  
  // Store selectedCategory in sessionStorage
  sessionStorage.setItem("selectedCategory", selectedCategory);
}

// Min-Max normalization functions
const minMaxNormalize = (value, min, max) =>
  (((value - min) / (max - min)) * 100).toFixed(2);
const inverseMinMaxNormalize = (value, min, max) =>
  (100 - ((value - min) / (max - min)) * 100).toFixed(2);

// Function to show and hide the spinner
function toggleSpinner(show) {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = show ? "flex" : "none"; // Flex to center it, none to hide
}

// Function to populate the table with categories based on selected barangay
async function handleProceed() {
  if (selectedBarangay) {
    try {
      console.log("Fetching categories for Barangay:", selectedBarangay);
      toggleSpinner(true); // Show spinner

      // Fetch and process data
      const topCategories = await getRecommendedCategories(selectedBarangay);

      // Display the right section with results
      const resultSection = document.getElementById("result-section");
      resultSection.style.display = "block";

      // Populate the table with categories
      const tableBody = document.querySelector(".styled-table tbody");
      tableBody.innerHTML = ""; // Clear previous content

      topCategories.forEach((category, index) => {
        const row = document.createElement("tr");
        row.classList.add("table-row");

        // Create category cell
        const categoryCell = document.createElement("td");
        categoryCell.textContent = category.name;
        row.appendChild(categoryCell);

        // Create score cell
        const scoreCell = document.createElement("td");
        scoreCell.textContent = category.totalScore.toFixed(2);
        row.appendChild(scoreCell);

        // Add event listener for row selection
        row.addEventListener("click", () =>
          selectCategoryRow(row, category.name)
        );

        // Append the row to the table
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      toggleSpinner(false); // Hide spinner after completion
    }
  } else {
    alert("Please select a barangay before proceeding.");
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

/*// Function to populate table with top categories
function populateTable(topCategories) {
  const tableBody = document.querySelector("#table-container tbody");
  tableBody.innerHTML = ""; // Clear the table first

  if (topCategories && topCategories.length > 0) {
    topCategories.forEach((item) => {
      const row = document.createElement("tr");
      row.classList.add("table-row");
      row.innerHTML = `<td>${item.category}</td><td>${item.score}</td>`;

      row.addEventListener("click", function () {
        document
          .querySelectorAll(".table-row")
          .forEach((r) => r.classList.remove("selected"));
        row.classList.add("selected");
        selectedCategory = item.category;
      });

      tableBody.appendChild(row);
    });
  } else {
    tableBody.innerHTML =
      '<tr><td colspan="2">No data available for this barangay.</td></tr>';
  }
}*/

/*// Function to fetch the recommended categories
async function getRecommendedCategories(barangay) {
    try {
        const smeResponse = await fetch('/api/sme-data');
        const smeData = await smeResponse.json();

        const marketDemandResponse = await fetch('/api/market-demand-data');
        const marketDemandData = await marketDemandResponse.json();

        const competitionResponse = await fetch('/api/competition-data');
        const competitionData = await competitionResponse.json();

        const barangayResponse = await fetch('/api/barangay-data');
        const barangayData = await barangayResponse.json();

        return runClusteringModel(barangay, smeData, marketDemandData, competitionData, barangayData);
    } catch (err) {
        console.error("Error fetching data:", err);
        return [];
    }
}*/

// Function to fetch the recommended categories
async function getRecommendedCategories(selectedBarangay) {
  // Fetch the business counts per category based on the selected barangay
  const response = await fetch(
    `/api/category-business-counts?selectedBarangay=${selectedBarangay}`
  );
  if (!response.ok) throw new Error("Failed to fetch category business counts");
  const businessData = await response.json();
  console.log("Fetched business data:", businessData);

  // Initialize a map to store the counts by category
  const categoryCounts = {};
  businessData.forEach((row) => {
    categoryCounts[row.category] = row.total_counts;
  });

  // List of all categories
  const allCategories = [
    "Food Services",
    "Retail Stores",
    "Healthcare Services",
    "Educational Services",
    "Professional Services",
    "Personal Care Services",
    "Manufacturing and Production",
    "Construction and Real Estate",
    "IT and Digital Services",
    "Transportation and Logistics",
    "Personal and Household Services",
    "Finance and Insurance",
    "Creative and Media Services",
    "Automotive Services",
    "Entertainment and Recreation",
    "Wholesale and Distribution",
    "Tourism and Hospitality",
    "Cooperative Business",
  ];

  // Include categories with 0 counts
  allCategories.forEach((category) => {
    if (!(category in categoryCounts)) {
      categoryCounts[category] = 0;
    }
  });

  // Normalize the category counts using Min-Max normalization
  const countValues = Object.values(categoryCounts);
  const minCount = Math.min(...countValues);
  const maxCount = Math.max(...countValues);

  const normalizedCounts = {};
  for (let category in categoryCounts) {
    normalizedCounts[category] = minMaxNormalize(
      categoryCounts[category],
      minCount,
      maxCount
    );
  }

  // Print the counts per category
  console.log("Category Counts:", categoryCounts);
  console.log("Normalized Counts:", normalizedCounts); // Check normalized counts

  // Fetch Direct Competitors Data
  const responseDirect = await fetch(
    `/api/category-direct-competitors?selectedBarangay=${selectedBarangay}`
  );
  if (!responseDirect.ok) throw new Error("Failed to fetch direct competitors");
  const directData = await responseDirect.json();

  // Initialize a map to store the counts for direct competitors by category
  const directCompetition = {};
  directData.forEach((row) => {
    directCompetition[row.category_name] = row.direct_competitor_count;
  });

  // Fetch Indirect Competitors Data
  const responseIndirect = await fetch(
    `/api/category-indirect-competitors?selectedBarangay=${selectedBarangay}`
  );
  if (!responseIndirect.ok)
    throw new Error("Failed to fetch indirect competitors");
  const indirectData = await responseIndirect.json();

  // Initialize a map to store the counts for indirect competitors by category
  const indirectCompetition = {};
  indirectData.forEach((row) => {
    indirectCompetition[row.category_name] = row.indirect_competitor_count;
  });

  // Fetch Replacement Competitors Data
  const responseReplacement = await fetch(
    `/api/category-replacement-competitors?selectedBarangay=${selectedBarangay}`
  );
  if (!responseReplacement.ok)
    throw new Error("Failed to fetch replacement competitors");
  const replacementData = await responseReplacement.json();

  // Initialize a map to store the counts for replacement competitors by category
  const replacementCompetition = {};
  replacementData.forEach((row) => {
    replacementCompetition[row.category_name] =
      row.replacement_competitor_count;
  });

  // Include barangays with 0 counts
  allCategories.forEach((category) => {
    if (!(category in directCompetition)) {
      directCompetition[category] = 0;
    }
    if (!(category in indirectCompetition)) {
      indirectCompetition[category] = 0;
    }
    if (!(category in replacementCompetition)) {
      replacementCompetition[category] = 0;
    }
  });

  // Print the competition counts per category
  console.log("Direct Competition:", directCompetition);
  console.log("Indirect Competition:", indirectCompetition);
  console.log("Replacement Competition:", replacementCompetition);

  // Calculate Competitor Density for each barangay
  const competitorDensity = {};
  allCategories.forEach((category) => {
    const direct = directCompetition[category] || 0;
    const indirect = indirectCompetition[category] || 0;
    const replacement = replacementCompetition[category] || 0;

    competitorDensity[category] =
      direct * 0.6 + indirect * 0.3 + replacement * 0.1;
  });

  // Min-Max normalization of competitor density
  const competitionValues = Object.values(competitorDensity);
  const minCompetition = Math.min(...competitionValues);
  const maxCompetition = Math.max(...competitionValues);

  const normalizedCompetition = {};
  const inverseNormalizedCompetition = {};

  for (let category in competitorDensity) {
    normalizedCompetition[category] = minMaxNormalize(
      competitorDensity[category],
      minCompetition,
      maxCompetition
    );
    inverseNormalizedCompetition[category] = inverseMinMaxNormalize(
      competitorDensity[category],
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

  const areaTypes1 = {};
  areaData.forEach((row) => {
    areaTypes1[row.barangay_name] = row.area_type
      .split(",")
      .map((type) => type.trim());
  });

  const areaTypesList = areaTypes1[selectedBarangay];
  let areaTypeScores = {};

  // Iterate over all categories
  for (const category of allCategories) {
    let score = 0;

    // If the area type contains "Mixed," score 100 for all categories
    if (areaTypesList.includes("Mixed")) {
      score = 100;
    } else {
      // For each area type in the selectedBarangay, add the respective weight from areaTypeWeights
      areaTypesList.forEach((area) => {
        if (areaTypeWeights[category] && areaTypeWeights[category][area]) {
          score += areaTypeWeights[category][area];
        }
      });
    }

    // Store the computed score for this category
    areaTypeScores[category] = score;
  }

  // Print the area type scores
  console.log("Area Type Scores:", areaTypeScores);

  // Fetch average market demand per barangay
  const demandResponse = await fetch(
    `/api/category-average-demand?selectedBarangay=${selectedBarangay}`
  );
  if (!demandResponse.ok)
    throw new Error("Failed to fetch barangay average demand");
  const demandData = await demandResponse.json();
  console.log("Fetched demand data:", demandData);

  // Initialize an object to store the average market demands
  const avgMarketDemands = {};
  demandData.forEach((row) => {
    avgMarketDemands[row.category_name] = parseFloat(
      row.average_demand
    ).toFixed(2);
  });

  // Normalize the market demands using Min-Max normalization
  const demandValues = Object.values(avgMarketDemands).map(Number);
  const minDemand = Math.min(...demandValues);
  const maxDemand = Math.max(...demandValues);

  const normalizedDemands = {};
  for (let category in avgMarketDemands) {
    normalizedDemands[category] = minMaxNormalize(
      avgMarketDemands[category],
      minDemand,
      maxDemand
    );
  }

  // Print the average market demands and normalized demands
  console.log("Average Market Demands:", avgMarketDemands);
  console.log("Normalized Demands:", normalizedDemands);

  // Calculate market gaps (Market Demand - Counts)
  const categoryGaps = {};
  for (let category in normalizedDemands) {
    if (normalizedCounts[category] !== undefined) {
      categoryGaps[category] = (
        normalizedDemands[category] - normalizedCounts[category]
      ).toFixed(2);
    }
  }
  // Normalize the market gaps
  const gapValues = Object.values(categoryGaps);
  const minGap = Math.min(...gapValues);
  const maxGap = Math.max(...gapValues);
  const normalizedMarketGaps = {};
  for (let category in categoryGaps) {
    normalizedMarketGaps[category] = minMaxNormalize(
      categoryGaps[category],
      minGap,
      maxGap
    );
  }

  console.log("Market Gaps:", normalizedMarketGaps); // Check calculated market gaps

  //WEIGHTING
  // Multiply factors by their weights
  const factorWeights = {
    normalizedDemands: 0.34,
    normalizedMarketGaps: 0.28,
    inverseNormalizedCompetition: 0.26,
    areaTypeScores: 0.12,
  };

  // Initialize separate objects to store weighted values for each factor
  const weightedNormalizedDemands = {};
  const weightedNormalizedMarketGaps = {};
  const weightedInverseNormalizedCompetition = {};
  const weightedAreaTypeScores = {};

  // Calculate weighted values for each barangay without summing them up
  for (let category of allCategories) {
    weightedNormalizedDemands[category] =
      (normalizedDemands[category] || 0) * factorWeights.normalizedDemands;
    weightedNormalizedMarketGaps[category] =
      (normalizedMarketGaps[category] || 0) *
      factorWeights.normalizedMarketGaps;
    weightedInverseNormalizedCompetition[category] =
      (inverseNormalizedCompetition[category] || 0) *
      factorWeights.inverseNormalizedCompetition;
    weightedAreaTypeScores[category] =
      (areaTypeScores[category] || 0) * factorWeights.areaTypeScores;
  }

  // KMEANS CLUSTERING

  // Define the number of clusters
  const k = 3;

  // Combine the weighted factors into a single array of objects
  const factorArray = allCategories.map((category) => ({
    name: category,
    weightedDemands: weightedNormalizedDemands[category],
    weightedGaps: weightedNormalizedMarketGaps[category],
    weightedCompetition: weightedInverseNormalizedCompetition[category],
    weightedAreaType: weightedAreaTypeScores[category],
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
        Math.pow(point1.weightedAreaType - point2.weightedAreaType, 2)
    );
  }

  // K-means clustering function
  function kMeansClustering(data, k, iterations = 100) {
    let centroids = initializeCentroids(data, k);
    let clusters = new Array(data.length).fill(null);

    for (let i = 0; i < iterations; i++) {
      // Step 1: Assign clusters based on nearest centroid
      clusters = data.map((category) => {
        let closestCentroidIndex = -1;
        let minDistance = Infinity;

        centroids.forEach((centroid, index) => {
          const distance = calculateDistance(category, centroid);
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
        weightedAreaType: 0,
        count: 0,
      }));

      clusters.forEach((clusterIndex, categoryIndex) => {
        newCentroids[clusterIndex].weightedDemands +=
          data[categoryIndex].weightedDemands;
        newCentroids[clusterIndex].weightedGaps +=
          data[categoryIndex].weightedGaps;
        newCentroids[clusterIndex].weightedCompetition +=
          data[categoryIndex].weightedCompetition;
        newCentroids[clusterIndex].weightedAreaType +=
          data[categoryIndex].weightedAreaType;
        newCentroids[clusterIndex].count++;
      });

      centroids = newCentroids.map((centroid) => {
        return {
          weightedDemands: centroid.weightedDemands / centroid.count,
          weightedGaps: centroid.weightedGaps / centroid.count,
          weightedCompetition: centroid.weightedCompetition / centroid.count,
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
    const categoryName = factorArray[index].name;
    if (!clusteredResults[clusterIndex]) {
      clusteredResults[clusterIndex] = [];
    }
    clusteredResults[clusterIndex].push(categoryName);
  });

  console.log("Cluster results:");
  for (const [clusterIndex, categories] of Object.entries(clusteredResults)) {
    console.log(`Cluster ${clusterIndex}: ${categories.join(", ")}`);
  }

  // Calculate and display average factor values for each cluster
  const clusterAverages = Array.from({ length: k }, () => ({
    weightedDemands: 0,
    weightedGaps: 0,
    weightedCompetition: 0,
    weightedAreaType: 0,
    count: 0,
    compositeScore: 0,
  }));

  // Sum up factor values for each cluster
  clusters.forEach((clusterIndex, categoryIndex) => {
    const category = factorArray[categoryIndex];
    const cluster = clusterAverages[clusterIndex];

    cluster.weightedDemands += category.weightedDemands;
    cluster.weightedGaps += category.weightedGaps;
    cluster.weightedCompetition += category.weightedCompetition;
    cluster.weightedAreaType += category.weightedAreaType;
    cluster.count++;
  });

  // Calculate averages for each factor and composite score in each cluster
  clusterAverages.forEach((cluster, index) => {
    cluster.weightedDemands /= cluster.count;
    cluster.weightedGaps /= cluster.count;
    cluster.weightedCompetition /= cluster.count;
    cluster.weightedAreaType /= cluster.count;

    // Calculate the composite score as the sum of the average values
    cluster.compositeScore =
      cluster.weightedDemands +
      cluster.weightedGaps +
      cluster.weightedCompetition +
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
  const categoryScoresInTopCluster = [];

  // Calculate the total score for each barangay in the highest scoring cluster
  clusters.forEach((clusterIndex, categoryIndex) => {
    if (clusterIndex === topClusterIndex) {
      const category = factorArray[categoryIndex];
      const totalScore =
        category.weightedDemands +
        category.weightedGaps +
        category.weightedCompetition +
        category.weightedAreaType;

      categoryScoresInTopCluster.push({
        name: category.name,
        totalScore: totalScore,
      });
    }
  });

  const topCategories = categoryScoresInTopCluster
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  // Print the top 3 barangays and their total scores
  console.log("\nTop 3 Category in Cluster with Highest Score:");
  topCategories.forEach(({ name, totalScore }, index) => {
    console.log(
      `  Rank ${index + 1}: ${name} - Total Score: ${totalScore.toFixed(2)}`
    );
  });

  return topCategories;
}

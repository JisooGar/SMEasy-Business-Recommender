// Get the selected barangay from localStorage
document.addEventListener("DOMContentLoaded", function () {
  // Get the selected barangay from localStorage
  const selectedBarangay = localStorage.getItem("selectedBarangay");

  if (selectedBarangay) {
    console.log("Selected Barangay:", selectedBarangay);
    // Now you can use selectedBarangay for your analysis logic
  } else {
    console.log("No barangay selected yet.");
  }
});

// Retrieve the selected category from sessionStorage
const selectedCategory = sessionStorage.getItem("selectedCategory");

if (selectedCategory) {
  console.log("Selected Category in Barangay Analysis Page:", selectedCategory);
} else {
  console.log("No category selected.");
}

// Min-Max normalization functions
const minMaxNormalize = (value, min, max) =>
  (((value - min) / (max - min)) * 100).toFixed(2);
const inverseMinMaxNormalize = (value, min, max) =>
  (100 - ((value - min) / (max - min)) * 100).toFixed(2);

/*// Population Chart
const ctx1 = document.getElementById("populationChart").getContext("2d");
new Chart(ctx1, {
  type: "doughnut",
  data: {
    labels: ["0-5", "6-12", "13-17", "18-35", "36-50", "50-65", "66+"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#41B05A", "#FFD700", "#FF5733"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    layout: { padding: 5 },
  },
});

// SMEs Chart
const ctx2 = document.getElementById("smesChart").getContext("2d");
new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: sortedCategories,
    datasets: [
      {
        data: sortedCounts,
        backgroundColor: ["#41B05A", "#FFD700", "#FF5733"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    layout: { padding: 5 },
  },
});

// Competition Chart
const ctx3 = document.getElementById("competitionChart").getContext("2d");
new Chart(ctx3, {
  type: "bar",
  data: {
    labels: ["Direct", "Indirect", "Replacement"],
    datasets: [
      {
        data: [70, 50, 30],
        backgroundColor: ["#FF5733", "#FFD700", "#41B05A"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
  },
});

// Market Demand Chart
const marketDemandCtx = document
  .getElementById("marketDemandChart")
  .getContext("2d");
new Chart(marketDemandCtx, {
  type: "doughnut",
  data: {
    labels: ["Minor Gap", "Moderate Gap", "Critical Gap"],
    datasets: [
      {
        data: [25, 50, 75],
        backgroundColor: ["#FFD700", "#FFA500", "#FF5733"],
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    plugins: { legend: { display: false } },
    layout: { padding: 5 },
  },
});*/

document.addEventListener("DOMContentLoaded", async function () {
  // Get the selected barangay from localStorage
  const selectedBarangay = localStorage.getItem("selectedBarangay");
  const selectedCategory = sessionStorage.getItem("selectedCategory");

  if (selectedBarangay && selectedCategory) {
    console.log(
      `Analyzing data for Category: ${selectedCategory}, Barangay: ${selectedBarangay}`
    );

    // Simulating the analysis logic (running the model)
    const recommendationData = await runAnalysisModel(
      selectedCategory,
      selectedBarangay
    );

    // If there's no data available for the selected barangay
    if (!recommendationData) {
      alert("No data available for the selected barangay.");
      document.getElementById("loading-spinner").style.display = "none"; // Hide spinner if no data
      return;
    }

    // Update the Business Overview
    document.getElementById("mainCategory").textContent =
      recommendationData.businessOverview.mainCategory;
    document.getElementById("mainBarangay").textContent =
      recommendationData.businessOverview.mainBarangay;
    document.getElementById("mainDescription").textContent =
      recommendationData.businessOverview.mainDescription;
    document.getElementById("businessCounts").textContent =
      recommendationData.businessOverview.businessCounts;
    document.getElementById("totalPopulation").textContent =
      recommendationData.businessOverview.totalPopulation;

    document.getElementById("marketDemand").textContent =
      recommendationData.demandAndGaps.marketDemand;
    document.getElementById("marketGaps").textContent =
      recommendationData.demandAndGaps.marketGaps;
    document.getElementById("topCountDescription").textContent =
      recommendationData.demandAndGaps.topCountDescription;
    document.getElementById("topCountText").textContent =
      recommendationData.demandAndGaps.topCountText;
    document.getElementById("topDemandDescription").textContent =
      recommendationData.demandAndGaps.topDemandDescription;
    document.getElementById("topDemandText").textContent =
      recommendationData.demandAndGaps.topDemandText;
    document.getElementById("topBusinessGapDescription").textContent =
      recommendationData.demandAndGaps.topBusinessGapDescription;
    document.getElementById("topBusinessGapText").textContent =
      recommendationData.demandAndGaps.topBusinessGapText;

    document.getElementById("topTranspoChallenges").textContent =
      recommendationData.transpoAndAccessibilityData.topTranspoChallenges;
    document.getElementById("topAreaType").textContent =
      recommendationData.transpoAndAccessibilityData.topAreaType;
    document.getElementById("topAreaTypeDescription").textContent =
      recommendationData.transpoAndAccessibilityData.topAreaTypeDescription;
    document.getElementById("topAreaTypeText").textContent =
      recommendationData.transpoAndAccessibilityData.topAreaTypeText;
    document.getElementById("topTranspoText").textContent =
      recommendationData.transpoAndAccessibilityData.topTranspoText;
    document.getElementById("topTranspoChallenges1").textContent =
      recommendationData.transpoAndAccessibilityData.topTranspoChallenges1;
    document.getElementById("topTranspoText1").textContent =
      recommendationData.transpoAndAccessibilityData.topTranspoText1;
    document.getElementById("topAreaType1").textContent =
      recommendationData.transpoAndAccessibilityData.topAreaType1;

    document.getElementById("computeDemand").textContent =
      recommendationData.computationData.computeDemand;
    document.getElementById("computeGap").textContent =
      recommendationData.computationData.computeGap;
    document.getElementById("computeTranspo").textContent =
      recommendationData.computationData.computeTranpo;
    document.getElementById("computeArea").textContent =
      recommendationData.computationData.computeArea;
    document.getElementById("computePopulation").textContent =
      recommendationData.computationData.computePopulation;
    document.getElementById("computeCompetition").textContent =
      recommendationData.computationData.computeCompetition;
    document.getElementById("computeTotalScore").textContent =
      recommendationData.computationData.computeTotalScore;

    document.getElementById("topDirectName").textContent =
      recommendationData.competitionData.topDirectName;
    document.getElementById("topIndirectName").textContent =
      recommendationData.competitionData.topIndirectName;
    document.getElementById("topReplacementName").textContent =
      recommendationData.competitionData.topReplacementName;

    document.getElementById("topMotivation").textContent =
      recommendationData.surveyData.topMotivation;
    document.getElementById("topShoppingTraits").textContent =
      recommendationData.surveyData.topShoppingTraits;
    document.getElementById("topShoppingFactors").textContent =
      recommendationData.surveyData.topShoppingFactors;
    document.getElementById("topShoppingStyle").textContent =
      recommendationData.surveyData.topShoppingStyle;
    document.getElementById("topValues").textContent =
      recommendationData.surveyData.topValues;
    document.getElementById("topBusinessVisits").textContent =
      recommendationData.surveyData.topBusinessVisits;
    document.getElementById("topFrequencyVisits").textContent =
      recommendationData.surveyData.topFrequencyVisits;
    document.getElementById("topBrowsingBehavior").textContent =
      recommendationData.surveyData.topBrowsingBehavior;
    document.getElementById("topShoppingPreferences").textContent =
      recommendationData.surveyData.topShoppingPreferences;
    document.getElementById("topAgeRange").textContent =
      recommendationData.surveyData.topAgeRange;

    document.getElementById("topSuggestedArea").textContent =
      recommendationData.suggestedData.topSuggestedArea;
    document.getElementById("mainCategory1").textContent =
      recommendationData.suggestedData.mainCategory1;
    document.getElementById("topAreaType2").textContent =
      recommendationData.suggestedData.topAreaType2;
    


      document.getElementById("demandDiv").style.backgroundColor =
      recommendationData.chartData.topDemandColor || "#ffffff";

      document.getElementById("gapDiv").style.backgroundColor =
      recommendationData.chartData.topGapColor || "#ffffff";
      
    // Population Chart
    const ctx1 = document.getElementById("populationChart").getContext("2d");
    new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: ["0-5", "6-12", "13-17", "18-35", "36-50", "51-65", "66+"],
        datasets: [
          {
            data: recommendationData.chartData.ageRangePopulation,
            backgroundColor: ["#41B05A", "#FFD700", "#FF5733"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        layout: { padding: 5 },
      },
    });

    // SMEs Chart
    const ctx2 = document.getElementById("smesChart").getContext("2d");
    new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: recommendationData.chartData.categories,
        datasets: [
          {
            data: recommendationData.chartData.categoryCounts,
            backgroundColor: [
              "#FF5733",
              "#33FF57",
              "#3357FF",
              "#FF33A1",
              "#A1FF33",
              "#5733FF",
              "#33A1FF",
              "#FF8E33",
              "#8EFF33",
              "#FF33FF",
              "#33FF8E",
              "#FF8E8E",
              "#8E33FF",
              "#FF5733",
              "#B33DFF",
              "#FFD700",
              "#FF4500",
              "#32CD32",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        layout: { padding: 5 },
      },
    });

    // Competition Chart
    const ctx3 = document.getElementById("competitionChart").getContext("2d");
    new Chart(ctx3, {
      type: "bar",
      data: {
        labels: ["Direct", "Indirect", "Replacement"],
        datasets: [
          {
            data: [
              recommendationData.competitionData.topDirectCompetitor,
              recommendationData.competitionData.topIndirectCompetitor,
              recommendationData.competitionData.topReplacementCompetitor,
            ],
            backgroundColor: ["#FF5733", "#FFD700", "#41B05A"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
      },
    });

    // Market Demand Chart with only Legend
const marketDemandCtx = document
.getElementById("marketDemandChart")
.getContext("2d");

new Chart(marketDemandCtx, {
type: "doughnut",
data: {
  // Empty dataset to remove the doughnut, but retain legend
  labels: [
    "High Demand/Critical Gap",
    "Medium Demand/Moderate Gap",
    "Low Demand/Minor Gap",
    "Very Low Demand/No Gap",
  ],
  datasets: [
    {
      data: [0, 0, 0, 0],  // Set data to zero to hide the doughnut
      backgroundColor: ["#41B05A", "#FFD700", "#FFA500", "#FF5733"],
    },
  ],
},
options: {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { 
      display: true, // Show the legend
      position: 'top', // Position the legend (can be 'top', 'left', 'bottom', 'right')
      labels: {
        boxWidth: 20, // Set the width of the color box
        padding: 15, // Space between legend items
      },
    },
  },
  layout: { padding: 5 },
},
});


    // Optionally, hide the spinner after the analysis is complete
    document.getElementById("loading-spinner").style.display = "none";
  } else {
    console.log("Selected barangay or category is missing.");
  }
});

// Function to simulate analysis for the selected barangay
async function runAnalysisModel(selectedCategory, selectedBarangay) {
  let barangayDescription;

  if (selectedBarangay === "Baclaran") {
    barangayDescription =
      "Baclaran is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 14,606. This represented 4.11% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Banaybanay") {
    barangayDescription =
      "Banaybanay is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 34,260. This represented 9.64% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Banlic") {
    barangayDescription =
      "Banlic is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 20,646. This represented 5.81% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Bigaa") {
    barangayDescription =
      "Bigaa is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 13,665. This represented 3.85% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Butong") {
    barangayDescription =
      "Butong is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 14,764. This represented 4.16% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Casile") {
    barangayDescription =
      "Casile is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 3,619. This represented 1.02% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Diezmo") {
    barangayDescription =
      "Diezmo is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 6,622. This represented 1.86% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Gulod") {
    barangayDescription =
      "Gulod is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 17,215. This represented 4.84% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Mamatid") {
    barangayDescription =
      "Mamatid is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 61,085. This represented 17.19% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Marinig") {
    barangayDescription =
      "Marinig is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 45,343. This represented 12.76% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Niugan") {
    barangayDescription =
      "Niugan is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 38,576. This represented 10.86% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Pittland") {
    barangayDescription =
      "Pittland is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 6,052. This represented 1.70% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Poblacion Uno") {
    barangayDescription =
      "Barangay Uno, formerly Poblacion, is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 3,690. This represented 1.04% of the total population of Cabuyao";
  } else if (selectedBarangay === "Poblacion Dos") {
    barangayDescription =
      "Barangay Dos, formerly Poblacion, is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 1,573. This represented 0.44% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Poblacion Tres") {
    barangayDescription =
      " Barangay Tres, formerly Poblacion, is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 4,274. This represented 1.20% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Pulo") {
    barangayDescription =
      " Pulo is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 35,113. This represented 9.88% of the total population of Cabuyao.";
  } else if (selectedBarangay === "Sala") {
    barangayDescription =
      "Sala is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 10,903. This represented 3.07% of the total population of Cabuyao.";
  } else if (selectedBarangay === "San Isidro") {
    barangayDescription =
      " San Isidro is a barangay in the city of Cabuyao, in the province of Laguna. Its population as determined by the 2020 Census was 23,324. This represented 6.56% of the total population of Cabuyao";
  } else {
    barangayDescription = "Barangay not found.";
  }

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

  // Sort categories alphabetically
  const sortedCategories = Object.keys(categoryCounts).sort();

  // Extract the sorted counts based on the sorted category names
  const sortedCounts = sortedCategories.map(
    (category) => Number(categoryCounts[category]) // Ensure the values are treated as numbers
  );

  // Calculate the total of the sorted counts
  const totalCounts = sortedCounts.reduce((total, count) => total + count, 0);

  // Fetch the business counts per barangay based on the selected category
  const barangayResponse = await fetch(
    `/api/barangay-business-counts?selectedCategory=${selectedCategory}`
  );
  if (!barangayResponse.ok)
    throw new Error("Failed to fetch barangay business counts");
  const barangayData = await barangayResponse.json();

  // Initialize a map to store the counts by barangay
  const barangayCounts = {};
  barangayData.forEach((row) => {
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
  const barangayName = selectedBarangay;
  const barangayTotalCounts = normalizedCounts[barangayName];

  const responsePopulation = await fetch(
    `/api/barangay-population?selectedBarangay=${selectedBarangay}`
  );
  if (!responsePopulation.ok)
    throw new Error("Failed to fetch population data");

  const populationData = await responsePopulation.json();
  console.log("Fetched population data:", populationData);
  const population = populationData.population;

  const responseAge = await fetch(
    `/api/barangay-age-range?selectedBarangay=${selectedBarangay}`
  );
  if (!responseAge.ok) throw new Error("Failed to fetch population data");

  // Parsing the response as JSON
  const ageData = await responseAge.json();

  // Logging the fetched population data
  console.log("Fetched population data:", ageData);

  // Assuming the result is an array and we need to extract age range data
  const ageRange = ageData[0]; // Assuming only one result for the selectedBarangay

  // Logging the population data for age ranges
  console.log("Population data for age ranges:", ageRange);

  // Extracting the age range counts into an array and sorting them
  const ageRanges = [
    ageRange["0-5"], // 0-5
    ageRange["6-12"], // 6-12
    ageRange["13-17"], // 13-17
    ageRange["18-35"], // 18-35
    ageRange["36-50"], // 36-50
    ageRange["51-65"], // 51-65
    ageRange["66+"], // 66+
  ];

  // Sorting the age range counts from low to high
  const sortedAgeRanges = ageRanges.sort((a, b) => a - b);

  // Logging the sorted array
  console.log("Sorted age range counts:", sortedAgeRanges);

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

  const barangayDemand = normalizedDemands[barangayName];

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

  const barangayMarketGaps = normalizedMarketGaps[barangayName];

  // Fetching transportation challenges for the selected barangay
  const responseChallenges = await fetch(
    `/api/transportation-challenges?selectedBarangay=${selectedBarangay}`
  );
  if (!responseChallenges.ok)
    throw new Error("Failed to fetch transportation challenges data");

  const transpoData = await responseChallenges.json();
  console.log("Fetched transportation challenges:", transpoData);

  const transpoChallenges = transpoData[0].challenges;

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
  const barangayAreaType = areaTypes[barangayName];

  let modifiedAreaType = barangayAreaType;

  // Check if the area type contains a comma
  if (modifiedAreaType.includes(",")) {
    // Replace commas with 'and' and add " Spaces" at the end
    modifiedAreaType = modifiedAreaType.replace(/,/g, " and") + " Spaces";
  } else if (modifiedAreaType === "Mixed") {
    // If the area type is 'Mixed', change it to the desired format
    modifiedAreaType = "Mixed (Residential, Commercial, Industrial) Spaces";
  }

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
  const barangayAreaTypeScore = areaTypeScores[barangayName];

  // Fetch transportation and accessibility scores for each barangay
  const transpoResponse = await fetch(`/api/barangay-transportation-scores`);
  if (!transpoResponse.ok)
    throw new Error("Failed to fetch barangay transportation scores");
  const transpoData1 = await transpoResponse.json();

  // Initialize a map to store the transportation and accessibility scores by barangay
  const transpoScores = {};
  transpoData1.forEach((row) => {
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
  const barangayTranspoScore = normalizedTranspo[barangayName];

  // Logging the modified area type
  console.log(modifiedAreaType);

  // Fetch barangay population density
  const popDensityResponse = await fetch("/api/barangay-population-density");
  if (!popDensityResponse.ok)
    throw new Error("Failed to fetch barangay population density");
  const populationDensityData = await popDensityResponse.json();

  // Process and normalize the population density data
  const populationDensity = {};
  populationDensityData.forEach((row) => {
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
  const barangayPopulationDensity = normalizedPopulation[barangayName];

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

  const barangayDirectCompetitor = directCompetition[barangayName];
  const barangayIndirectCompetitor = indirectCompetition[barangayName];
  const barangayReplacementCompetitor = replacementCompetition[barangayName];

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
  const barangayCompetitionDensity = inverseNormalizedCompetition[barangayName];

  const responseCompetitors = await fetch(
    `/api/competitor-names?selectedCategory=${encodeURIComponent(
      selectedCategory
    )}&selectedBarangay=${encodeURIComponent(selectedBarangay)}`
  );
  if (!responseCompetitors.ok)
    throw new Error("Failed to fetch competitor names");

  // Parse the JSON response
  const competitorData = await responseCompetitors.json();

  // Log the competitor data
  console.log("Competitor Names Data:", competitorData);

  // Process the data as needed for analysis
  const competitorMap = {};
  competitorData.forEach((row) => {
    competitorMap[row.competitor_type] = row.competitor_names;
  });

  console.log("Processed Competitor Data:", competitorMap);

  // Access individual competitor types one by one
  const directCompetitors = competitorMap["Direct"] || "None";
  const indirectCompetitors = competitorMap["Indirect"] || "None";
  const replacementCompetitors = competitorMap["Replacement"] || "None";

  // Log the values for each competitor type
  console.log("Direct Competitors:", directCompetitors);
  console.log("Indirect Competitors:", indirectCompetitors);
  console.log("Replacement Competitors:", replacementCompetitors);

  // Map of age ranges for each category
  const ageRangeMap = {
    "Automotive Services": ["18-29", "30-39", "40-59"],
    "Construction and Real Estate": ["30-39", "40-59"],
    "Cooperative Business": ["30-39", "40-59"],
    "Creative and Media Services": ["18-29", "30-39"],
    "Educational Services": ["18-29", "30-39"],
    "Entertainment and Recreation": ["18-29", "30-39"],
    "Finance and Insurance": ["30-39", "40-59"],
    "Food Services": ["18-29", "30-39", "40-59"],
    "Healthcare Services": ["30-39", "40-59", "60+"],
    "IT and Digital Services": ["18-29", "30-39"],
    "Manufacturing and Production": ["30-39", "40-59"],
    "Personal and Household Services": ["30-39", "40-59"],
    "Personal Care Services": ["18-29", "30-39", "40-59"],
    "Professional Services": ["30-39", "40-59"],
    "Retail Stores": ["18-29", "30-39", "40-59"],
    "Tourism and Hospitality": ["18-29", "30-39", "40-59"],
    "Transportation and Logistics": ["18-29", "30-39", "40-59"],
    "Wholesale and Distribution": ["30-39", "40-59"],
  };

 // Function to calculate mode
function calculateMode(data) {
  const counts = {};

  data.forEach((item) => {
    // Only proceed if item is a valid non-null, non-undefined string
    if (item && typeof item === 'string') {
      const values = item.split(",").map((val) => val.trim()); // Handle comma-separated values
      values.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
      });
    } else {
      // Skip null, undefined, or non-string items
      console.warn("Skipping invalid item:", item);
    }
  });

  let maxCount = 0;
  const modes = [];
  for (const [key, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      modes.length = 0; // Reset modes
      modes.push(key);
    } else if (count === maxCount) {
      modes.push(key);
    }
  }

  return modes.join(", ");
}



  // Fetch the psychographic data for the selected barangay
  const responsePsychographic = await fetch(
    `/api/psychographic?selectedBarangay=${encodeURIComponent(
      selectedBarangay
    )}`
  );
  if (!responsePsychographic.ok) {
    throw new Error("Failed to fetch psychographic data");
  }

  const psychographicData = await responsePsychographic.json();

  // Filter by age_range based on selectedCategory
  const validAgeRanges = ageRangeMap[selectedCategory];
  const filteredData = psychographicData.filter((row) =>
    validAgeRanges.includes(row.age_range)
  );

  // Process data to find modes for each field
  const motivationData = filteredData.map(
    (row) => row.motivation_for_choosing_businesses
  );
  const shoppingTraitsData = filteredData.map((row) => row.shopping_traits);
  const factorsForNewBusinessData = filteredData.map(
    (row) => row.factors_for_new_business
  );
  const shoppingStyleData = filteredData.map((row) => row.shopping_style);
  const valuesSupportedData = filteredData.map((row) => row.values_supported);

  const modeMotivation = calculateMode(motivationData);
  const modeShoppingTraits = calculateMode(shoppingTraitsData);
  const modeFactorsForNewBusiness = calculateMode(factorsForNewBusinessData);
  const modeShoppingStyle = calculateMode(shoppingStyleData);
  const modeValuesSupported = calculateMode(valuesSupportedData);

  console.log("Mode of Motivation for Choosing Businesses:", modeMotivation);
  console.log("Mode of Shopping Traits:", modeShoppingTraits);
  console.log("Mode of Factors for New Business:", modeFactorsForNewBusiness);
  console.log("Mode of Shopping Style:", modeShoppingStyle);
  console.log("Mode of Values Supported:", modeValuesSupported);

  // Fetch the behavior data for the selected barangay
  const responseBehavior = await fetch(
    `/api/behavior?selectedBarangay=${encodeURIComponent(selectedBarangay)}`
  );
  if (!responseBehavior.ok) {
    throw new Error("Failed to fetch behavior data");
  }

  const behaviorData = await responseBehavior.json();

  // Filter behavior data by age_range based on the selectedCategory
  const filteredBehaviorData = behaviorData.filter((row) =>
    validAgeRanges.includes(row.age_range)
  );

  // Process data to find modes for each field
  const businessVisitsData = filteredBehaviorData.map(
    (row) => row.business_visits
  );
  const frequencyVisitsData = filteredBehaviorData.map(
    (row) => row.frequency_visits
  );
  const browsingBehaviorData = filteredBehaviorData.map(
    (row) => row.browsing_behavior
  );
  const shoppingPreferencesData = filteredBehaviorData.map(
    (row) => row.shopping_preferences
  );

  const modeBusinessVisits = calculateMode(businessVisitsData);
  const modeFrequencyVisits = calculateMode(frequencyVisitsData);
  const modeBrowsingBehavior = calculateMode(browsingBehaviorData);
  const modeShoppingPreferences = calculateMode(shoppingPreferencesData);

  // Log results for debugging
  console.log("Mode of Business Visits:", modeBusinessVisits);
  console.log("Mode of Frequency of Visits:", modeFrequencyVisits);
  console.log("Mode of Browsing Behavior:", modeBrowsingBehavior);
  console.log("Mode of Shopping Preferences:", modeShoppingPreferences);

  // Get the age range for the selected category
  const getAgeRanges = ageRangeMap[selectedCategory];

  // Convert the array of age ranges into a string (will be undefined if no age ranges exist for selectedCategory)
  const categoryAgeRange = getAgeRanges ? getAgeRanges.join(", ") : "";

// Fetch area data for the selected barangay
const responseAreaType = await fetch(`/api/area-type?selectedBarangay=${selectedBarangay}`);
if (!responseAreaType.ok) throw new Error("Failed to fetch area data");
const areaTypeData = await responseAreaType.json();

console.log("areaTypeData:", areaTypeData);

// Filter and remove duplicates for subareas
const uniqueSubareas = {};
areaTypeData.forEach((row) => {
  if (!uniqueSubareas[row.subarea]) {
    uniqueSubareas[row.subarea] = row.subareatype; // Correctly use subarea and subareatype (lowercase)
  }
});

// Convert the result into an array
const subareaList = Object.keys(uniqueSubareas).map((subarea) => ({
  name: subarea,
  type: uniqueSubareas[subarea],
}));

console.log("Unique Subareas:", subareaList);
// Fetch barangay area types
const responseBarangayArea = await fetch("/api/barangay-area-types");
if (!responseBarangayArea.ok) throw new Error("Failed to fetch barangay area types");
const barangayAreaData = await responseBarangayArea.json();

// Map barangay area types
const barangayAreaTypes = {};
barangayAreaData.forEach((row) => {
  barangayAreaTypes[row.barangay_name] = row.area_type.split(", ").map((type) => type.trim());
});

const barangayAreaTypeList = barangayAreaTypes[barangayName];
console.log(`Barangay Area Types for ${barangayName}:`, barangayAreaTypeList);

// Filter subareas matching barangay area types
const matchedSubareas = subareaList.filter((subarea) =>
  barangayAreaTypeList.includes(subarea.type)
);

console.log("Matched Subareas:", matchedSubareas);

const bestCategoriesMapping = {
  "Automotive Services": ["Transportation and Logistics", "Wholesale and Distribution", "Retail Stores"],
  "Construction and Real Estate": ["Wholesale and Distribution", "Professional Services"],
  "Cooperative Business": ["Retail Stores", "Finance and Insurance", "Food Services"],
  "Creative and Media Services": ["Professional Services", "Educational Services", "Tourism and Hospitality"],
  "Educational Services": ["Food Services", "Retail Stores", "Creative and Media Services"],
  "Entertainment and Recreation": ["Food Services", "Retail Stores", "Tourism and Hospitality"],
  "Finance and Insurance": ["Construction and Real Estate", "Professional Services", "Healthcare Services"],
  "Food Services": ["Tourism and Hospitality", "Entertainment and Recreation", "Educational Services"],
  "Healthcare Services": ["Retail Stores", "Personal Care Services", "Professional Services"],
  "IT and Digital Services": ["Retail Stores", "Professional Services"],
  "Manufacturing and Production": ["Wholesale and Distribution", "Transportation and Logistics", "Retail Stores"],
  "Personal and Household Services": ["Retail Stores", "Construction and Real Estate", "Healthcare Services"],
  "Personal Care Services": ["Retail Stores", "Healthcarea"],
  "Professional Services": ["Finance and Insurance", "Construction and Real Estate", "IT and Digital Services"],
  "Retail Stores": ["Food Services", "Healthcare Services", "Educational Services"],
  "Tourism and Hospitality": ["Retail Stores", "Food Services", "Entertainment and Recreation"],
  "Transportation and Logistics": ["Manufacturing and Production", "Retail Stores"],
  "Wholesale and Distribution": ["Retail Stores", "Food Services", "Manufacturing and Production"]
};

// Assuming bestCategoriesMapping is already defined

// Assuming selectedCategory is defined earlier
const bestCategories = bestCategoriesMapping[selectedCategory];
console.log(`Best Categories for ${selectedCategory}:`, bestCategories);

// Map subarea counts per category
const subareaCounts = {};
areaTypeData.forEach((row) => {
  if (!row.subarea || row.subarea === "Blanks") return; // Ignore blanks
  if (!subareaCounts[row.subarea]) subareaCounts[row.subarea] = {};

  // Convert business count to a number (fall back to 0 if invalid)
  const businessCount = Number(row.businesscount) || 0;
  
  // Track counts for each category in the subarea
  subareaCounts[row.subarea][row.category] = businessCount;
});

// Now find the best subarea based on the total count for the best categories
let bestSubarea = null;
let highestTotalCount = 0;

Object.keys(subareaCounts).forEach((subareaName) => {
  // Skip if the subarea is missing or has no relevant categories
  if (!subareaCounts[subareaName]) return;

  // Calculate the total business count for the best categories in the subarea
  const totalCount = bestCategories.reduce((sum, category) => {
    const categoryCount = subareaCounts[subareaName][category];
    return sum + (categoryCount || 0); // Default to 0 if categoryCount is undefined
  }, 0);

  // If this subarea has a higher total count, update the best subarea
  if (totalCount > highestTotalCount) {
    highestTotalCount = totalCount;
    bestSubarea = subareaName;
  }
});

// If no subarea has a total count for best categories, return all matched subareas
const resultSubareas = highestTotalCount > 0 ? bestSubarea : matchedSubareas.map((subarea) => subarea.name);

// Log the result subareas
console.log("Result Subareas:", resultSubareas);

let suggestedArea;

// Check if resultSubareas is an array
if (Array.isArray(resultSubareas)) {
    // Convert the array to a string and assign to resultString
    suggestedArea = resultSubareas.join(", ");
} else {
    // If it's already a string, assign it directly to resultString
    suggestedArea = resultSubareas;
}

// Log the result
console.log("Result Subareas:", suggestedArea);

  // Weights from the object
  const weightDemand = 0.24;
  const weightMarketGaps = 0.26;
  const weightCompetitionDensity = 0.21;
  const weightPopulationDensity = 0.1;
  const weightTranspoScore = 0.07;
  const weightAreaTypeScore = 0.12;

  // Compute the total score
  const totalScore =
    barangayDemand * weightDemand +
    barangayMarketGaps * weightMarketGaps +
    barangayCompetitionDensity * weightCompetitionDensity +
    barangayPopulationDensity * weightPopulationDensity +
    barangayTranspoScore * weightTranspoScore +
    barangayAreaTypeScore * weightAreaTypeScore;

  const barangayTotalScore = totalScore.toFixed(2);
  // Output the result
  console.log("Total Score: ", barangayTotalScore);

  // Interpretation
  const countDescription =
    barangayTotalCounts >= 76
      ? "High Count"
      : barangayTotalCounts >= 51
      ? "Moderate Count"
      : barangayTotalCounts >= 26
      ? "Low Count"
      : "Very Low Count";

  const countText =
    barangayTotalCounts >= 76
      ? "Strong concentration of businesses, indicating high activity and competition"
      : barangayTotalCounts >= 51
      ? "Moderate business presence, balancing demand with a reasonable supply"
      : barangayTotalCounts >= 26
      ? "Limited business availability, with some options but room for growth"
      : "Minimal business presence, suggesting potential for new entries";

  const demandDescription =
    barangayDemand >= 76
      ? "High Demand"
      : barangayDemand >= 51
      ? "Medium Demand"
      : barangayDemand >= 26
      ? "Low Demand"
      : "Very Low Demand";

  const demandText =
    barangayDemand >= 76
      ? "Significant need, good interest"
      : barangayDemand >= 51
      ? "Moderate interest"
      : barangayDemand >= 26
      ? "Limited interest"
      : "Minimal or no interest";

  let demandColor;

  // Determine the background color based on barangayDemand value
  if (barangayDemand >= 76) {
    demandColor = "#41B05A"; // Hex for Green (High Demand)
  } else if (barangayDemand >= 51) {
    demandColor = "#FFD700"; // Hex for Yellow (Medium Demand)
  } else if (barangayDemand >= 26) {
    demandColor = "#FFA500"; // Hex for Orange (Low Demand)
  } else {
    demandColor = "#FF5733"; // Hex for Red (Very Low Demand)
  }

  let gapColor;

  // Determine the background color based on barangayDemand value
  if (barangayMarketGaps >= 76) {
    gapColor = "#41B05A"; // Hex for Green (High Demand)
  } else if (barangayMarketGaps >= 51) {
    gapColor = "#FFD700"; // Hex for Yellow (Medium Demand)
  } else if (barangayMarketGaps >= 26) {
    gapColor = "#FFA500"; // Hex for Orange (Low Demand)
  } else {
    gapColor = "#FF5733"; // Hex for Red (Very Low Demand)
  }

  const businessGapDescription =
    barangayMarketGaps >= 76
      ? "Critical Gap"
      : barangayMarketGaps >= 51
      ? "Moderate Gap"
      : barangayMarketGaps >= 26
      ? "Minor Gap"
      : "No Gap";

  const businessGapText =
    barangayMarketGaps >= 76
      ? "Significant need for services/products"
      : barangayMarketGaps >= 51
      ? "Noticeable lack, but not urgent"
      : barangayMarketGaps >= 26
      ? "Slight shortfall, potential for improvement"
      : "Market is saturated, no apparent gaps";

  const areaTypeDescription =
    barangayAreaTypeScore >= 76
      ? "Highly Favorable"
      : barangayAreaTypeScore >= 51
      ? "Moderately Favorable"
      : "Unfavorable";

  const areaTypeText =
    barangayAreaTypeScore >= 76
      ? "Ideal for your business type"
      : barangayAreaTypeScore >= 51
      ? "Good for your needs with potential"
      : barangayAreaTypeScore >= 26
      ? "Opportunities exist for growth"
      : "Challenges present opportunities for change";

  const transportationText =
    barangayTranspoScore >= 76
      ? "Excellent transport, very accessible"
      : barangayTranspoScore >= 51
      ? "Good transport, mostly accessible"
      : "Moderate transport with potential for improvement";

  const result = {
    businessOverview: {
      mainCategory: selectedCategory,
      mainBarangay: selectedBarangay,
      mainDescription: barangayDescription,
      businessCounts: totalCounts,
      totalPopulation: population,
    },
    chartData: {
      categories: sortedCategories,
      categoryCounts: sortedCounts,
      ageRangePopulation: sortedAgeRanges,
      topDemandColor: demandColor,
      topGapColor: gapColor,
    },
    surveyData: {
      topMotivation: modeMotivation,
      topShoppingTraits: modeShoppingTraits,
      topShoppingFactors: modeFactorsForNewBusiness,
      topShoppingStyle: modeShoppingStyle,
      topValues: modeValuesSupported,
      topBusinessVisits: modeBusinessVisits,
      topFrequencyVisits: modeFrequencyVisits,
      topBrowsingBehavior: modeBrowsingBehavior,
      topShoppingPreferences: modeShoppingPreferences,
      topAgeRange: categoryAgeRange,
    },
    competitionData: {
      topDirectCompetitor: barangayDirectCompetitor,
      topIndirectCompetitor: barangayIndirectCompetitor,
      topReplacementCompetitor: barangayReplacementCompetitor,
      topDirectName: directCompetitors,
      topIndirectName: indirectCompetitors,
      topReplacementName: replacementCompetitors,
    },
    demandAndGaps: {
      marketDemand: String(barangayDemand),
      marketGaps: String(barangayMarketGaps),
      topCountDescription: countDescription,
      topCountText: countText,
      topDemandDescription: demandDescription,
      topDemandText: demandText,
      topBusinessGapDescription: businessGapDescription,
      topBusinessGapText: businessGapText,
    },
    transpoAndAccessibilityData: {
      topTranspoChallenges: transpoChallenges,
      topAreaType: modifiedAreaType,
      topAreaType1: modifiedAreaType,
      topAreaTypeDescription: areaTypeDescription,
      topAreaTypeText: areaTypeText,
      topTranspoText: transportationText,
      topTranspoText1: transportationText,
      topTranspoChallenges1: transpoChallenges,
    },
    computationData: {
      computeDemand: String(barangayDemand),
      computeGap: String(barangayMarketGaps),
      computeTranpo: String(barangayTranspoScore),
      computeArea: String(barangayAreaTypeScore),
      computePopulation: String(barangayPopulationDensity),
      computeCompetition: String(barangayCompetitionDensity),
      computeTotalScore: String(barangayTotalScore),
    },
    suggestedData: {
      topSuggestedArea: suggestedArea,
      mainCategory1: selectedCategory,
      topAreaType2: modifiedAreaType
    },
  };
  console.log("Analysis Result:", result);
  return result;
}

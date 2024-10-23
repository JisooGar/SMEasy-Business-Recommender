// Global variable to store selected barangay
let selectedBarangay = null;

// Function to handle barangay selection
function selectBarangay(button) {
    const barangayButtons = document.querySelectorAll(".barangay-btn");
    barangayButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");

    selectedBarangay = button.textContent.trim();
}

// Function to handle Proceed button
async function handleProceed() {
    if (selectedBarangay) {
        document.getElementById("result-section").style.display = "block";
        document.querySelector(".recommendation-section").style.display = "none";

        // Fetch business data for the selected barangay
        const topCategories = await getRecommendedCategories(selectedBarangay);

        // Ensure that only the top 3 categories from the highest cluster are displayed in the table
        populateTable(topCategories);
    } else {
        alert("Please select a barangay.");
    }
}

// Function to populate the table with the top 3 recommended categories
function populateTable(topCategories) {
    const tableBody = document.querySelector("#table-container tbody");
    tableBody.innerHTML = "";  // Clear the table first

    if (topCategories && topCategories.length > 0) {
        // Loop through the top 3 categories and populate the table
        topCategories.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.category}</td><td>${item.score}</td>`;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="2">No data available for this barangay.</td></tr>';
    }
}

// Function to fetch the recommended categories
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

        // Process and calculate clusters
        return runClusteringModel(barangay, smeData, marketDemandData, competitionData, barangayData);
    } catch (err) {
        console.error("Error fetching data:", err);
        return [];
    }
}

// Clustering logic based on barangay and data (integrating the complete steps from the basis code)
function runClusteringModel(selectedBarangay, smeData, marketDemandData, competitionData, barangayData) {
    // List of all categories
    const allCategories = [
        "Food Services", "Retail Stores", "Healthcare Services", "Educational Services",
        "Professional Services", "Personal Care Services", "Manufacturing and Production",
        "Construction and Real Estate", "IT and Digital Services", "Transportation and Logistics",
        "Personal and Household Services", "Finance and Insurance", "Creative and Media Services",
        "Automotive Services", "Entertainment and Recreation", "Wholesale and Distribution",
        "Tourism and Hospitality", "Cooperative Business"
    ];

    // Step 1: Filter by selected barangay and count categories
    const filteredData = smeData.filter(row => row.Barangay === selectedBarangay);
    const categoryCounts = {};
    filteredData.forEach(row => {
        categoryCounts[row.Category] = (categoryCounts[row.Category] || 0) + 1;
    });

    allCategories.forEach(category => {
        if (!(category in categoryCounts)) {
            categoryCounts[category] = 0;
        }
    });

    console.log(`Results for Barangay: ${selectedBarangay}`);
    console.log("Category Counts:", categoryCounts); // Check the counts per category

    // Step 2: Normalize category counts
    const counts = Object.values(categoryCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    const normalizedCounts = {};
    const inverseNormalizedCounts = {};

    for (let category in categoryCounts) {
        normalizedCounts[category] = ((categoryCounts[category] - minCount) / (maxCount - minCount) * 100).toFixed(2);
        inverseNormalizedCounts[category] = (100 - ((categoryCounts[category] - minCount) / (maxCount - minCount) * 100)).toFixed(2);
    }

    console.log("Normalized Counts:", normalizedCounts); // Check normalized counts

    // Step 3: Calculate average market demands and normalize
    const filteredDemandData = marketDemandData.filter(row => row.Barangay === selectedBarangay);
    const categoryDemandSums = {};
    const categoryDemandCounts = {};
    const avgMarketDemands = {};

    allCategories.forEach(category => {
        categoryDemandSums[category] = 0;
        categoryDemandCounts[category] = 0;
    });

    filteredDemandData.forEach(row => {
        allCategories.forEach(category => {
            const demandValue = Number(row[category]);
            if (!isNaN(demandValue)) {
                categoryDemandSums[category] += demandValue;
                categoryDemandCounts[category] += 1;
            }
        });
    });

    for (let category in categoryDemandSums) {
        const totalDemand = categoryDemandSums[category];
        const count = categoryDemandCounts[category];
        avgMarketDemands[category] = count > 0 ? (totalDemand / count).toFixed(2) : '0';
    }

    const demandValues = Object.values(avgMarketDemands).map(Number);  // Convert strings to numbers
    const minDemand = Math.min(...demandValues);
    const maxDemand = Math.max(...demandValues);

    const normalizedDemands = {};
    for (let category in avgMarketDemands) {
        normalizedDemands[category] = ((avgMarketDemands[category] - minDemand) / (maxDemand - minDemand) * 100).toFixed(2);
    }

    console.log("Average Market Demands:", avgMarketDemands); // Check average market demands
    console.log("Normalized Demands:", normalizedDemands); // Check normalized demands

    // Step 4: Calculate market gaps (Market Demand - Counts)
    const marketGaps = {};
    for (let category in normalizedDemands) {
        if (normalizedCounts[category] !== undefined) {
            marketGaps[category] = (normalizedDemands[category] - normalizedCounts[category]).toFixed(2);
        }
    }

    const gapValues = Object.values(marketGaps);
    const minGap = Math.min(...gapValues);
    const maxGap = Math.max(...gapValues);
    const normalizedMarketGaps = {};
    for (let category in marketGaps) {
        normalizedMarketGaps[category] = ((marketGaps[category] - minGap) / (maxGap - minGap) * 100).toFixed(2);
    }

    console.log("Market Gaps:", marketGaps); // Check calculated market gaps
    console.log("Normalized Market Gaps:", normalizedMarketGaps); // Check normalized gaps

    // Step 5: Get competition density and normalize
    const competitionDensity = {};
    competitionData.forEach(row => {
        if (row.Barangay === selectedBarangay) {
            competitionDensity[row.Category] = Number(row['Competition Density']);
        }
    });

    const competitionValues = Object.values(competitionDensity);
    const minCompetition = Math.min(...competitionValues);
    const maxCompetition = Math.max(...competitionValues);
    const normalizedCompetition = {};
    const inverseNormalizedCompetition = {};

    allCategories.forEach(category => {
        normalizedCompetition[category] = ((competitionDensity[category] - minCompetition) / (maxCompetition - minCompetition) * 100).toFixed(2);
        inverseNormalizedCompetition[category] = (100 - ((competitionDensity[category] - minCompetition) / (maxCompetition - minCompetition) * 100)).toFixed(2);
    });

    console.log("Normalized Competition:", normalizedCompetition); // Check normalized competition data
    console.log("Inverse Normalized Competition:", inverseNormalizedCompetition); // Check inverse normalized competition data

    // Step 6: Calculate area type scores using a fixed weight or based on some other criteria
    const areaTypeWeights = {
        "Automotive Services": { Commercial: 50, Industrial: 15, Residential: 35 },
        "Construction and Real Estate": { Commercial: 40, Industrial: 25, Residential: 35 },
        "Cooperative Business": { Commercial: 45, Industrial: 20, Residential: 35 },
        "Creative and Media Services": { Commercial: 60, Industrial: 0, Residential: 40 },
        "Educational Services": { Commercial: 60, Industrial: 0, Residential: 40 },
        "Entertainment and Recreation": { Commercial: 60, Industrial: 0, Residential: 40 },
        "Finance and Insurance": { Commercial: 70, Industrial: 0, Residential: 30 },
        "Food Services": { Commercial: 50, Industrial: 0, Residential: 50 },
        "Healthcare Services": { Commercial: 60, Industrial: 0, Residential: 40 },
        "IT and Digital Services": { Commercial: 70, Industrial: 0, Residential: 30 },
        "Manufacturing and Production": { Commercial: 20, Industrial: 70, Residential: 10 },
        "Personal and Household Services": { Commercial: 40, Industrial: 0, Residential: 60 },
        "Personal Care Services": { Commercial: 60, Industrial: 0, Residential: 40 },
        "Professional Services": { Commercial: 60, Industrial: 20, Residential: 20 },
        "Retail Stores": { Commercial: 50, Industrial: 0, Residential: 50 },
        "Tourism and Hospitality": { Commercial: 60, Industrial: 10, Residential: 30 },
        "Transportation and Logistics": { Commercial: 30, Industrial: 60, Residential: 10 },
        "Wholesale and Distribution": { Commercial: 40, Industrial: 50, Residential: 10 },
     
      };
    
      const areaTypeScores = {};
      for (const category of allCategories) {
        const row = barangayData.find(r => r.Barangay === selectedBarangay);
        if (row) {
          const commercialScore = row.Commercial > 0 ? areaTypeWeights[category].Commercial : 0;
          const industrialScore = row.Industrial > 0 ? areaTypeWeights[category].Industrial : 0;
          const residentialScore = row.Residential > 0 ? areaTypeWeights[category].Residential : 0;
          areaTypeScores[category] = commercialScore + industrialScore + residentialScore;
        }
      }
    
    console.log("Area Type Scores:", areaTypeScores); // Check area type scores

    // Step 7: Calculate total scores for each category
    const totalScores = {};
    for (let category in categoryCounts) {
      // Calculate total score, ensuring each component is a number
      totalScores[category] = (
        (Number(inverseNormalizedCounts[category] || 0) * 0.25) +
        (Number(normalizedDemands[category] || 0) * 0.20) +
        (Number(normalizedMarketGaps[category] || 0) * 0.25) +
        (Number(inverseNormalizedCompetition[category] || 0) * 0.15) +
        (Number(areaTypeScores[category] || 0) * 0.15)
      ).toFixed(2);
    }

    console.log("Total Scores by Category:", totalScores); // Display the total scores

    // Step 8: Sort categories by score and select the top 3
    const totalScoresArray = Object.entries(totalScores).map(([category, score]) => ({
        category,
        score: Number(score)
    }));

    totalScoresArray.sort((a, b) => b.score - a.score);

    const topCategories = totalScoresArray.slice(0, 3);

    console.log("\nTop 3 Recommended Categories:");
    topCategories.forEach(({ category, score }, index) => {
        console.log(`${index + 1}. ${category} - Total Score: ${score}`);
    });

    return topCategories;  // Return the top categories for display
}

// Function to handle Analyze button and show the recommendation details
function handleAnalyze() {
    if (selectedBarangay) {
        document.querySelector(".recommendation-section").style.display = "block";
        const barangayNameElement = document.getElementById("barangayName");
        barangayNameElement.textContent = `BRGY NAME: ${selectedBarangay}`;
    } else {
        alert("Please select a barangay before analyzing.");
    }
}

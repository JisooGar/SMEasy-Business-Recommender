// Step 1: Global variables
let selectedCategory = null;
let selectedBarangay = null;

// Min-Max normalization functions
const minMaxNormalize = (value, min, max) => ((value - min) / (max - min) * 100).toFixed(2);
const inverseMinMaxNormalize = (value, min, max) => (100 - ((value - min) / (max - min) * 100)).toFixed(2);

// List of all barangays
const allBarangays = [
    "Baclaran", "Banaybanay", "Banlic", "Bigaa", "Butong", "Casile", "Diezmo", "Gulod", "Mamatid",
    "Marinig", "Niugan", "Pittland", "Poblacion Dos", "Poblacion Tres", "Poblacion Uno", "Pulo", "Sala", "San Isidro"
];

// Function to handle the selection of a category
function selectBusiness(button) {
    const barangayButtons = document.querySelectorAll('.barangay-btn');
    
    // Remove 'selected' class from all buttons
    barangayButtons.forEach((btn) => {
        btn.classList.remove('selected');
    });

    // Add 'selected' class to the clicked button
    button.classList.add('selected');
    
    // Set the selected category to the button's text content
    selectedCategory = button.textContent.trim();
    console.log('Selected Category:', selectedCategory);
    
    // Reset selected barangay when a new category is chosen
    selectedBarangay = null;
}

// Function to handle the proceed button (Step 2)
async function handleProceed() {
    if (selectedCategory) {  // Ensure selectedCategory is checked properly here
        console.log('Proceeding with Category:', selectedCategory);

        // Step 2: Fetch and process data
        const topBarangays = await runClusteringModel(selectedCategory);

        // Step 3: Display the right section (table) after fetching barangay data
        const resultSection = document.getElementById('result-section');
        resultSection.style.display = 'block';

        // Step 4: Get the table body and clear it
        const tableBody = document.querySelector('.styled-table tbody');
        tableBody.innerHTML = '';

        // Step 5: Insert rows for each barangay and score
        topBarangays.forEach((barangay, index) => {
            const row = document.createElement('tr');
            row.classList.add('barangay-row'); // Added class for selection purposes

            // Barangay name
            const barangayCell = document.createElement('td');
            barangayCell.textContent = `${index + 1}. ${barangay.barangay}`;
            row.appendChild(barangayCell);

            // Score
            const scoreCell = document.createElement('td');
            scoreCell.textContent = barangay.score;
            row.appendChild(scoreCell);

            // Add event listener for selecting a row
            row.addEventListener('click', () => selectBarangayRow(row, barangay.barangay));

            // Append row to table body
            tableBody.appendChild(row);
        });
    } else {
        alert('Please select a category before proceeding.');
    }
}

// Function to handle the analyze button, showing details for selected barangay
async function handleAnalyze() {
    if (selectedCategory && selectedBarangay) {
        console.log(`Analyzing data for Category: ${selectedCategory}, Barangay: ${selectedBarangay}`);

        // Step 1: Fetch and process the data for the selected category and barangay from CSV files
        const recommendationData = await runAnalysisModel(selectedCategory, selectedBarangay);

        if (!recommendationData) {
            alert('No data available for the selected barangay.');
            return;
        }

        // Show the loading spinner while processing the data
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.style.display = 'block';

        // Simulate a delay for analysis (e.g., fetching data) for 2 seconds
        setTimeout(() => {
            // Hide the loading spinner after the analysis is complete
            loadingSpinner.style.display = 'none';

            // Step 2: Display the recommendation section
            const recommendationSection = document.querySelector('.recommendation-section');
            recommendationSection.style.display = 'block';  // Make the section visible

            // Scroll to the recommendation section smoothly
            recommendationSection.scrollIntoView({ behavior: 'smooth' });

            // === Step 3: Update the BRGY NAME based on the selected barangay and category ===
            const barangayNameElement = document.querySelector('.recommendation-section h2');
            barangayNameElement.textContent = `BRGY NAME: ${selectedBarangay} (${selectedCategory})`;

            // === Step 4: Update the Business Overview ===
            document.getElementById('mainCategory').textContent = recommendationData.businessOverview.mainCategory;
            document.getElementById('totalBusinesses').textContent = recommendationData.businessOverview.totalBusinessesInCity;
            document.getElementById('businessesInBarangay').textContent = recommendationData.businessOverview.businessesInBarangay;

            // === Step 5: Update Market Demand and Gaps ===
            document.getElementById('highDemand').textContent = recommendationData.marketDemandAndGaps.criticalGap;
            document.getElementById('mediumDemand').textContent = recommendationData.marketDemandAndGaps.moderateGap;
            document.getElementById('lowDemand').textContent = recommendationData.marketDemandAndGaps.minorGap;
            document.getElementById('noDemand').textContent = recommendationData.marketDemandAndGaps.noGap;
            document.getElementById('marketDemand').textContent = recommendationData.marketDemandAndGaps.marketDemand;
            document.getElementById('businessGaps').textContent = recommendationData.marketDemandAndGaps.businessGaps;
            
            // === Step 6: Update Population and Segmentation Analysis ===
            document.getElementById('populationOverview').textContent = recommendationData.populationAndSegmentation.populationOverview || 'N/A';
            document.getElementById('customerSegmentation').textContent = recommendationData.populationAndSegmentation.customerSegmentation || 'N/A';

            // === Step 7: Update Competition Analysis ===
            document.getElementById('competitionDensity').textContent = recommendationData.competitionAnalysis.competitionDensity || 'N/A';
            document.getElementById('directCompetitor').textContent = recommendationData.competitionAnalysis.directCompetitor || 'N/A';
            document.getElementById('indirectCompetitor').textContent = recommendationData.competitionAnalysis.indirectCompetitor || 'N/A';
            document.getElementById('replacementCompetitor').textContent = recommendationData.competitionAnalysis.replacementCompetitor || 'N/A';

            // === Step 8: Update Accessibility and Infrastructure ===
            document.getElementById('areaType').textContent = recommendationData.accessibilityAndInfrastructure.areaType || 'N/A';

            // === Step 9: Update the Recommendation Summary ===
            document.getElementById('recommendationSummary').textContent = recommendationData.recommendationSummary.summaryText || 'N/A';
        }, 2000); // Simulate 2 seconds of loading time
    } else {
        if (!selectedCategory) {
            alert('Please select a category before proceeding.');
        } else if (!selectedBarangay) {
            alert('Please select a barangay from the table before analyzing.');
        }
    }
}

// Function to read CSV data and run the clustering model
async function runClusteringModel(selectedCategory) {
    // Fetch the CSV data from the server-side routes
    const SMEData = await fetch('/api/sme-data').then(res => res.json());
    const marketDemandData = await fetch('/api/market-demand-data').then(res => res.json());
    console.log('Raw Market Demand Data for Food Services:', marketDemandData.filter(row => row[selectedCategory]));
    console.log('Market Demand Data:', marketDemandData.filter(row => row[selectedCategory]));
    const barangayData = await fetch('/api/barangay-data').then(res => res.json());
    const competitionData = await fetch('/api/competition-data').then(res => res.json());
    const transportationData = await fetch('/api/transportation-data').then(res => res.json());

    // Step 2: Filter the category selected in the SME.csv
    const filteredData = SMEData.filter(row => row.Category === selectedCategory);

    // Count names per barangay for the selected category
    const barangayCounts = {};
    filteredData.forEach(row => {
        barangayCounts[row.Barangay] = (barangayCounts[row.Barangay] || 0) + 1;
    });

    // Include barangays with 0 counts
    allBarangays.forEach(barangay => {
        if (!(barangay in barangayCounts)) {
            barangayCounts[barangay] = 0;
        }
    });

    // Min-Max normalization of the counts
    const counts = Object.values(barangayCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    const normalizedCounts = {};
    const inverseNormalizedCounts = {};

    for (let barangay in barangayCounts) {
        normalizedCounts[barangay] = minMaxNormalize(barangayCounts[barangay], minCount, maxCount);
        inverseNormalizedCounts[barangay] = inverseMinMaxNormalize(barangayCounts[barangay], minCount, maxCount);
    }

    // Log Barangay Counts and Normalized Counts
    console.log(`Results for Category: ${selectedCategory}`);
    console.log('Barangay Counts:', barangayCounts);
    console.log('Normalized Counts:', normalizedCounts);
    console.log('Inverse Normalized Counts:', inverseNormalizedCounts);

    // Step 3: Calculate market demands using MarketDemandData.csv
    const barangayDemand = {};
marketDemandData.forEach(row => {
    if (!barangayDemand[row.Barangay]) barangayDemand[row.Barangay] = [];
    
    const demandValue = Number(row[selectedCategory]);
    if (isNaN(demandValue)) {
        console.warn(`Invalid market demand for ${row.Barangay} in category ${selectedCategory}`);
    } else {
        barangayDemand[row.Barangay].push(demandValue);
    }
});


    // Calculate the average market demand for each barangay
    const avgMarketDemands = {};
    for (let barangay in barangayDemand) {
        const totalDemand = barangayDemand[barangay].reduce((acc, val) => acc + val, 0);
        avgMarketDemands[barangay] = (totalDemand / barangayDemand[barangay].length).toFixed(2);
    }

    // Normalize the market demands
    const demandValues = Object.values(avgMarketDemands);
    const minDemand = Math.min(...demandValues);
    const maxDemand = Math.max(...demandValues);
    const normalizedDemands = {};
    for (let barangay in avgMarketDemands) {
        normalizedDemands[barangay] = minMaxNormalize(avgMarketDemands[barangay], minDemand, maxDemand);
    }

    // Log Market Demands
    console.log('Average Market Demands:', avgMarketDemands);
    console.log('Normalized Demands:', normalizedDemands);

    // Step 4: Calculate market gaps (Market Demand - Counts)
    const marketGaps = {};
    for (let barangay in normalizedDemands) {
        if (normalizedCounts[barangay] !== undefined) {
            marketGaps[barangay] = (normalizedDemands[barangay] - normalizedCounts[barangay]).toFixed(2);
        }
    }

    // Normalize the market gaps
    const gapValues = Object.values(marketGaps);
    const minGap = Math.min(...gapValues);
    const maxGap = Math.max(...gapValues);
    const normalizedMarketGaps = {};
    for (let barangay in marketGaps) {
        normalizedMarketGaps[barangay] = minMaxNormalize(marketGaps[barangay], minGap, maxGap);
    }

    // Log Market Gaps
    console.log('Market Gaps:', marketGaps);
    console.log('Normalized Market Gaps:', normalizedMarketGaps);

    // Step 5: Get competition density from CompetitionData.csv and normalize it
    const competitionDensity = {};
    competitionData.forEach(row => {
        if (row.Category === selectedCategory) {
            competitionDensity[row.Barangay] = Number(row['Competition Density']);
        }
    });

    const competitionValues = Object.values(competitionDensity);
    const minCompetition = Math.min(...competitionValues);
    const maxCompetition = Math.max(...competitionValues);
    const normalizedCompetition = {};
    const inverseNormalizedCompetition = {};
    for (let barangay in competitionDensity) {
        normalizedCompetition[barangay] = minMaxNormalize(competitionDensity[barangay], minCompetition, maxCompetition);
        inverseNormalizedCompetition[barangay] = inverseMinMaxNormalize(competitionDensity[barangay], minCompetition, maxCompetition);
    }

    // Log Competition Scores
    console.log('Normalized Competition:', normalizedCompetition);
    console.log('Inverse Normalized Competition:', inverseNormalizedCompetition);

    // Step 6: Get population density from BarangayData.csv and normalize it
    const populationDensity = {};
    barangayData.forEach(row => {
        populationDensity[row.Barangay] = Number(row['Population Density']);
    });

    const populationValues = Object.values(populationDensity);
    const minPopulation = Math.min(...populationValues);
    const maxPopulation = Math.max(...populationValues);
    const normalizedPopulation = {};
    for (let barangay in populationDensity) {
        normalizedPopulation[barangay] = minMaxNormalize(populationDensity[barangay], minPopulation, maxPopulation);
    }

    // Log Population Density
    console.log('Normalized Population:', normalizedPopulation);

    // Step 7: Calculate transportation and accessibility scores
    const transportationScores = {};
    const weights = { links: 0.40, accessibility: 0.40, travel: 0.20 };
    transportationData.forEach(row => {
        if (!transportationScores[row.Barangay]) transportationScores[row.Barangay] = [];
        const totalScore = (row['Transportation links'] * weights.links) +
            (row['Commercial accessibility'] * weights.accessibility) +
            (row['Travel outside barangay'] * weights.travel);
        transportationScores[row.Barangay].push(totalScore);
    });

    // Normalize transportation scores
    const transpoValues = Object.values(transportationScores).map(arr => arr.reduce((acc, val) => acc + val) / arr.length);
    const minTranspo = Math.min(...transpoValues);
    const maxTranspo = Math.max(...transpoValues);
    const normalizedTranspo = {};
    for (let barangay in transportationScores) {
        normalizedTranspo[barangay] = minMaxNormalize(
            transportationScores[barangay].reduce((acc, val) => acc + val, 0) / transportationScores[barangay].length,
            minTranspo,
            maxTranspo
        );
    }

    // Log Transportation Scores
    console.log('Normalized Transportation Scores:', normalizedTranspo);

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
      for (const barangay of Object.keys(populationDensity)) {
        const row = barangayData.find(r => r.Barangay === barangay);
        if (row) {
          const commercialScore = row.Commercial > 0 ? areaTypeWeights[selectedCategory].Commercial : 0;
          const industrialScore = row.Industrial > 0 ? areaTypeWeights[selectedCategory].Industrial : 0;
          const residentialScore = row.Residential > 0 ? areaTypeWeights[selectedCategory].Residential : 0;
          areaTypeScores[barangay] = commercialScore + industrialScore + residentialScore;
        }
      }
    

    // Step 8: Calculate total scores for each barangay
    const totalScores = {};
    for (let barangay in barangayCounts) {
        totalScores[barangay] = (
            (Number(inverseNormalizedCounts[barangay] || 0) * 0.25) +
            (Number(normalizedDemands[barangay] || 0) * 0.20) +
            (Number(normalizedMarketGaps[barangay] || 0) * 0.25) +
            (Number(inverseNormalizedCompetition[barangay] || 0) * 0.10) +
            (Number(normalizedPopulation[barangay] || 0) * 0.05) +
            (Number(normalizedTranspo[barangay] || 0) * 0.05) +
            (Number(areaTypeScores[barangay] || 0) * 0.10)
      
        ).toFixed(2);
    }

    // Log Total Scores
    console.log('Total Scores by Barangay:', totalScores);

    // Step 9: Create clusters
    const totalScoresArray = Object.entries(totalScores).map(([barangay, score]) => ({
        barangay,
        score: Number(score)
    }));

    totalScoresArray.sort((a, b) => a.score - b.score);

    const clusterCount = 3;
    const clusterSize = Math.ceil(totalScoresArray.length / clusterCount);
    const clusters = {};

    for (let i = 0; i < clusterCount; i++) {
        clusters[`Cluster ${i + 1}`] = totalScoresArray.slice(i * clusterSize, (i + 1) * clusterSize);
    }

    const clusterAverages = {};
    for (const [clusterName, barangays] of Object.entries(clusters)) {
        const totalScore = barangays.reduce((acc, item) => acc + item.score, 0);
        const averageScore = (totalScore / barangays.length).toFixed(2);
        clusterAverages[clusterName] = averageScore;
    }

    const highestCluster = Object.keys(clusterAverages).reduce((a, b) =>
        clusterAverages[a] > clusterAverages[b] ? a : b
    );

    // Log Clusters
    console.log('Clusters with Barangays and Total Scores:');
    for (const [clusterName, barangays] of Object.entries(clusters)) {
        const average = clusterAverages[clusterName];
        console.log(`${clusterName} (Average Score: ${average}):`);
        barangays.forEach(({ barangay, score }) => {
            console.log(`  ${barangay}: ${score}`);
        });
    }

    // Step 10: Return Top 3 Barangays from the Highest Cluster
    const topBarangays = clusters[highestCluster]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

    console.log(`\nTop 3 Barangays from the Highest Cluster:`);
    topBarangays.forEach(({ barangay, score }) => {
        console.log(`  ${barangay} - Score: ${score} (Cluster: ${highestCluster})`);
    });

    return topBarangays;
}


// Function to run analysis for the selected barangay
async function runAnalysisModel(selectedCategory, selectedBarangay) {
    const SMEData = await fetch('/api/sme-data').then(res => res.json());
    const filteredData = SMEData.find(row => row.Category === selectedCategory && row.Barangay === selectedBarangay);

    if (filteredData) {
        return {
            businessOverview: {
                mainCategory: filteredData.Category,
                totalBusinessesInCity: filteredData.TotalBusinessesInCity,
                businessesInBarangay: filteredData.BusinessesInBarangay,
            },
            marketDemandAndGaps: {
                criticalGap: "(76-100)",
                moderateGap: "(51-75)",
                minorGap: "(26-50)",
                noGap: "(0-25)",
                marketDemand: "High",
                businessGaps: "Opportunity for more restaurants",
            },
            populationAndSegmentation: {
                populationOverview: filteredData.Population,
                customerSegmentation: filteredData.Segmentation,
            },
            competitionAnalysis: {
                competitionDensity: filteredData.CompetitionDensity,
                directCompetitor: "Local eateries",
                indirectCompetitor: "Food stalls",
                replacementCompetitor: "None",
            },
            accessibilityAndInfrastructure: {
                areaType: "Residential and Commercial",
            },
            recommendationSummary: {
                summaryText: `${selectedBarangay} is a good choice for ${selectedCategory}.`,
            },
        };
    }

    return null;
}

// Function to handle row selection in the barangay table
function selectBarangayRow(row, barangayName) {
    // Remove 'selected' class from all rows
    const rows = document.querySelectorAll('.styled-table tbody tr');
    rows.forEach((r) => r.classList.remove('selected-row'));

    // Add 'selected' class to the clicked row
    row.classList.add('selected-row');

    // Set the selected barangay
    selectedBarangay = barangayName;
}

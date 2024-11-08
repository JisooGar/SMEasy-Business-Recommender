// Step 1: Global variables for analysis
let selectedCategory = null;
let selectedBarangay = null;

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
    "Cooperative Business"
  ];
  
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
    "San Isidro"
  ];

// Utility functions for normalization
const minMaxNormalize = (value, min, max) => ((value - min) / (max - min) * 100).toFixed(2);
const inverseMinMaxNormalize = (value, min, max) => (100 - ((value - min) / (max - min) * 100)).toFixed(2);

// Function to find the mode in an array
const findMode = (arr) => {
    const frequency = {};
    arr.forEach(item => frequency[item] = (frequency[item] || 0) + 1);

    let maxCount = 0;
    const modes = [];
    for (const key in frequency) {
        if (frequency[key] > maxCount) maxCount = frequency[key];
    }

    for (const key in frequency) {
        if (frequency[key] === maxCount) modes.push(key);
    }

    return modes.join(', ');
};

// Function to calculate mean for behavioral data
const calculateMean = (arr) => {
    const total = arr.reduce((sum, value) => sum + value, 0);
    return (total / arr.length).toFixed(2);
};

// Fetch data functions
async function fetchData(endpoint) {
    return await fetch(endpoint).then(res => res.json());
}

// Function to handle barangay button selection
function selectBarangay(button) {
    const barangayButtons = document.querySelectorAll('.barangay-btn');
    barangayButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedBarangay = button.textContent.trim();
    console.log('Selected Barangay:', selectedBarangay);
    selectedCategory = null; // Reset selected category when a new barangay is selected
}

// Fetch psychographic and behavioral data, compute modes and means
async function processPsychographicBehavioralData() {
    psychographicsData = await fetch('/api/psychographics-data').then(res => res.json());
    behavioralData = await fetch('/api/behavioral-data').then(res => res.json());

    // Initialize data structures for psychographic features
    const Motivation = {};
    const ShoppingTraits = {};
    const Factors = {};
    const ShoppingStyle = {};
    const Values = {};

    psychographicsData.forEach(row => {
        const barangay = row.Barangay;
        if (!Motivation[barangay]) {
            Motivation[barangay] = [];
            ShoppingTraits[barangay] = [];
            Factors[barangay] = [];
            ShoppingStyle[barangay] = [];
            Values[barangay] = [];
        }

        Motivation[barangay].push(row["Motivation for choosing businesses"]);
        ShoppingTraits[barangay].push(row["Shopping traits"]);
        Factors[barangay].push(row["Factors for new business"]);
        ShoppingStyle[barangay].push(row["Shopping style"]);
        Values[barangay].push(row["Values"]);
    });

    for (const barangay in Motivation) {
        Motivation[barangay] = findMode(Motivation[barangay]);
        ShoppingTraits[barangay] = findMode(ShoppingTraits[barangay]);
        Factors[barangay] = findMode(Factors[barangay]);
        ShoppingStyle[barangay] = findMode(ShoppingStyle[barangay]);
        Values[barangay] = findMode(Values[barangay]);
    }

    // Initialize data structures for behavioral features
    const businessVisits = {};
    const frequencyVisits = {};
    const browsingBehavior = {};
    const shoppingPreferences = {};
    const satisfaction = {};
    const businessesLacking = {};

    behavioralData.forEach(row => {
        const barangay = row.Barangay;

        if (!businessVisits[barangay]) businessVisits[barangay] = [];
        businessVisits[barangay].push(...row["Business Visits"].split(',').map(item => item.trim()));

        if (!frequencyVisits[barangay]) frequencyVisits[barangay] = [];
        frequencyVisits[barangay].push(row["Frequency visits"]);

        if (!browsingBehavior[barangay]) browsingBehavior[barangay] = [];
        browsingBehavior[barangay].push(row["Browsing behavior"]);

        if (!shoppingPreferences[barangay]) shoppingPreferences[barangay] = [];
        shoppingPreferences[barangay].push(row["Shopping preferences"]);

        if (!satisfaction[barangay]) satisfaction[barangay] = [];
        satisfaction[barangay].push(Number(row["Satisfaction with businesses"]));

        if (!businessesLacking[barangay]) businessesLacking[barangay] = [];
        businessesLacking[barangay].push(Number(row["Businesses lacking"]));
    });

    for (const barangay in businessVisits) businessVisits[barangay] = findMode(businessVisits[barangay]);
    for (const barangay in frequencyVisits) frequencyVisits[barangay] = findMode(frequencyVisits[barangay]);
    for (const barangay in browsingBehavior) browsingBehavior[barangay] = findMode(browsingBehavior[barangay]);
    for (const barangay in shoppingPreferences) shoppingPreferences[barangay] = findMode(shoppingPreferences[barangay]);

    const satisfactionMean = {};
    const businessesLackingMean = {};

    for (const barangay in satisfaction) satisfactionMean[barangay] = calculateMean(satisfaction[barangay]);
    for (const barangay in businessesLacking) businessesLackingMean[barangay] = calculateMean(businessesLacking[barangay]);

    return {
        Motivation,
        ShoppingTraits,
        Factors,
        ShoppingStyle,
        Values,
        businessVisits,
        frequencyVisits,
        browsingBehavior,
        shoppingPreferences,
        satisfactionMean,
        businessesLackingMean
    };
} 

// Process market demand, competition density, population density, and transportation data
async function processMarketCompetitionData(selectedCategory) {
    const SMEData = await fetch('/api/sme-data').then(res => res.json());
    const marketDemandData = await fetch('/api/market-demand-data').then(res => res.json());
    const competitionData = await fetch('/api/competition-data').then(res => res.json());
    const barangayData = await fetch('/api/barangay-data').then(res => res.json());
    const transpoData = await fetch('/api/transportation-data').then(res => res.json());

    // Step 1: Calculate counts per barangay for the selected category
    const barangayCounts = {};
    SMEData.forEach(row => {
        if (row.Category === selectedCategory) {
            barangayCounts[row.Barangay] = (barangayCounts[row.Barangay] || 0) + 1;
        }
    });

    // Include barangays with zero counts
    allBarangays.forEach(barangay => {
        if (!(barangay in barangayCounts)) {
            barangayCounts[barangay] = 0;
        }
    });

    // Min-Max normalization of counts
    const counts = Object.values(barangayCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    const normalizedCounts = {};
    for (let barangay in barangayCounts) {
        normalizedCounts[barangay] = minMaxNormalize(barangayCounts[barangay], minCount, maxCount);
    }

    // Step 2: Calculate average market demand for each barangay
    const barangayDemand = {};
    marketDemandData.forEach(row => {
        if (!barangayDemand[row.Barangay]) barangayDemand[row.Barangay] = [];
        barangayDemand[row.Barangay].push(Number(row[selectedCategory]));
    });

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

    // Step 3: Calculate market gaps
    const barangayGaps = {};
    for (let barangay in normalizedDemands) {
        if (normalizedCounts[barangay] !== undefined) {
            barangayGaps[barangay] = (normalizedDemands[barangay] - normalizedCounts[barangay]).toFixed(2);
        }
    }

    // Normalize the market gaps
    const gapValues = Object.values(barangayGaps);
    const minGap = Math.min(...gapValues);
    const maxGap = Math.max(...gapValues);
    const normalizedMarketGaps = {};
    for (let barangay in barangayGaps) {
        normalizedMarketGaps[barangay] = minMaxNormalize(barangayGaps[barangay], minGap, maxGap);
    }

    // Step 4: Process competition density and normalize
    const barangayCompetitionDensity = {};
    competitionData.forEach(row => {
        if (row.Category === selectedCategory) {
            barangayCompetitionDensity[row.Barangay] = Number(row['Competition Density']);
        }
    });

    const competitionValues = Object.values(barangayCompetitionDensity);
    const minCompetition = Math.min(...competitionValues);
    const maxCompetition = Math.max(...competitionValues);
    const normalizedCompetition = {};
    const inverseNormalizedCompetition = {};
    for (let barangay in barangayCompetitionDensity) {
        normalizedCompetition[barangay] = minMaxNormalize(barangayCompetitionDensity[barangay], minCompetition, maxCompetition);
        inverseNormalizedCompetition[barangay] = inverseMinMaxNormalize(barangayCompetitionDensity[barangay], minCompetition, maxCompetition);
    }

     // Initialize objects for storing competition counts
     const directCompetition = {};
     const indirectCompetition = {};
     const replacementCompetition = {};

    // Filter competition data for the selected category
    const filteredCompetitionData = competitionData.filter(row => row.Category === selectedCategory);
 
     // Populate the separate competition counts
     filteredCompetitionData.forEach(row => {
         const barangay = row.Barangay;
         directCompetition[barangay] = Number(row.Direct);
         indirectCompetition[barangay] = Number(row.Indirect);
         replacementCompetition[barangay] = Number(row.Replacement);
     });

    // Step 5: Population density and normalization
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

    // Step 6: Transportation and accessibility scores
    const transportationScores = {};
    const weights = { links: 0.40, accessibility: 0.40, travel: 0.20 };
    transpoData.forEach(row => {
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

    // Step 7: Transportation challenges mode for each barangay
    const challenges = [
        'Lack of public transport',
        'Safety concerns',
        'Traffic congestion',
        'Poor road conditions',
        'Long travel distances',
        'Inadequate pedestrian pathways'
    ];

    const barangayChallengeCounts = {};
    transpoData.forEach(row => {
        const barangay = row['Barangay'];
        const challengeAnswers = row['Transportation challenges'].split(',').map(item => item.trim());

        if (!barangayChallengeCounts[barangay]) {
            barangayChallengeCounts[barangay] = {};
            challenges.forEach(challenge => {
                barangayChallengeCounts[barangay][challenge] = 0;
            });
        }

        challengeAnswers.forEach(answer => {
            if (challenges.includes(answer)) {
                barangayChallengeCounts[barangay][answer]++;
            }
        });
    });

    const transportChallenges = {};
    for (const barangay in barangayChallengeCounts) {
        let maxCount = 0;
        let mostTransportChallenges = [];

        for (const challenge in barangayChallengeCounts[barangay]) {
            const count = barangayChallengeCounts[barangay][challenge];

            if (count > maxCount) {
                maxCount = count;
                mostTransportChallenges = [challenge];
            } else if (count === maxCount) {
                mostTransportChallenges.push(challenge);
            }
        }

        transportChallenges[barangay] = mostTransportChallenges.join(', ');
    }
     // Calculate area type scores
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

    // Calculate area type scores directly using barangayData
    const areaTypeScores = {};
    barangayData.forEach(row => {
        const barangay = row.Barangay;

        // Calculate scores based on area types
        const commercialScore = row.Commercial > 0 ? areaTypeWeights[selectedCategory].Commercial : 0;
        const industrialScore = row.Industrial > 0 ? areaTypeWeights[selectedCategory].Industrial : 0;
        const residentialScore = row.Residential > 0 ? areaTypeWeights[selectedCategory].Residential : 0;

        // Store the total area type score for each barangay
        areaTypeScores[barangay] = commercialScore + industrialScore + residentialScore;
    });

    const areaTypes = {};
    barangayData.forEach(row => {
        areaTypes[row.Barangay] = row["Area Type"];
    });

    // Return all processed data as an object
    return {
        barangayCounts,
        normalizedCounts,
        avgMarketDemands,
        normalizedDemands,
        normalizedMarketGaps,
        normalizedCompetition,
        inverseNormalizedCompetition,
        directCompetition,
        indirectCompetition,
        replacementCompetition,
        normalizedPopulation,
        populationDensity,
        normalizedTranspo,
        transportChallenges,
        areaTypes,
        areaTypeScores
    };
}

// Function to populate the table with categories based on selected barangay
async function handleProceed() {
    if (selectedBarangay) {
        console.log('Fetching categories for Barangay:', selectedBarangay);

        // Fetch and process data
        const topCategories = await getRecommendedCategories(selectedBarangay);

        // Display the right section with results
        const resultSection = document.getElementById('result-section');
        resultSection.style.display = 'block';

        // Populate the table with categories
        const tableBody = document.querySelector('.styled-table tbody');
        tableBody.innerHTML = ''; // Clear previous content

        topCategories.forEach((category, index) => {
            const row = document.createElement('tr');
            row.classList.add('table-row');

            // Create category cell
            const categoryCell = document.createElement('td');
            categoryCell.textContent = category.category;
            row.appendChild(categoryCell);

            // Create score cell
            const scoreCell = document.createElement('td');
            scoreCell.textContent = category.score;
            row.appendChild(scoreCell);

            // Add event listener for row selection
            row.addEventListener('click', () => selectCategoryRow(row, category.category));

            // Append the row to the table
            tableBody.appendChild(row);
        });
    } else {
        alert('Please select a barangay before proceeding.');
    }
}

// Function to select a category row
function selectCategoryRow(row, category) {
    const rows = document.querySelectorAll('.styled-table tbody tr');
    rows.forEach(r => r.classList.remove('selected-row'));
    row.classList.add('selected-row');
    selectedCategory = category;
    console.log('Selected Category:', selectedCategory);
}

function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Function to handle the analyze button, showing details for selected barangay
async function handleAnalyze() {
    if (selectedCategory && selectedBarangay) {
        console.log(`Analyzing data for Category: ${selectedCategory}, Barangay: ${selectedBarangay}`);

        // Show loading spinner
        document.getElementById("loading-spinner").style.display = "inline-block";

        // Step 1: Fetch and process the data for the selected category and barangay from CSV files
        const recommendationData = await runAnalysisModel(selectedCategory, selectedBarangay);

        if (!recommendationData) {
            alert('No data available for the selected barangay.');
            document.getElementById("loading-spinner").style.display = "none"; // Hide spinner if no data
            return;
        }

        // Simulate a delay for analysis (e.g., fetching data) for 2 seconds
        setTimeout(() => {
            // Hide the loading spinner
            document.getElementById("loading-spinner").style.display = "none";

            // Display the recommendation section
            const recommendationSection = document.querySelector('.recommendation-section');
            recommendationSection.style.display = 'block';

            // Smoothly scroll to the recommendation section
            recommendationSection.scrollIntoView({ behavior: 'smooth' });

            // Populate recommendation data (as shown in your code)
            const barangayNameElement = document.querySelector('.recommendation-section h2');
            barangayNameElement.textContent = `BRGY NAME: ${selectedBarangay} (${selectedCategory})`;

            document.getElementById('mainCategory').textContent = recommendationData.businessOverview.mainCategory;
            document.getElementById('totalBusinesses').textContent = recommendationData.businessOverview.totalBusinessesInCity;
            document.getElementById('businessesInBarangay').textContent = recommendationData.businessOverview.topCounts;

            document.getElementById('highDemand').textContent = recommendationData.marketDemandAndGaps.criticalGap;
            document.getElementById('mediumDemand').textContent = recommendationData.marketDemandAndGaps.moderateGap;
            document.getElementById('lowDemand').textContent = recommendationData.marketDemandAndGaps.minorGap;
            document.getElementById('noDemand').textContent = recommendationData.marketDemandAndGaps.noGap;
            document.getElementById('marketDemand').textContent = recommendationData.marketDemandAndGaps.marketDemand;
            document.getElementById('businessGaps').textContent = recommendationData.marketDemandAndGaps.businessGaps;

            document.getElementById('populationOverview').textContent = recommendationData.populationAndSegmentation.populationOverview || 'N/A';
            document.getElementById('businessMotivation').textContent = recommendationData.populationAndSegmentation.businessMotivation || 'N/A';
            document.getElementById('shopingTraits').textContent = recommendationData.populationAndSegmentation.shopingTraits || 'N/A';
            document.getElementById('businessFactors').textContent = recommendationData.populationAndSegmentation.businessFactors || 'N/A';
            document.getElementById('shopingStyle').textContent = recommendationData.populationAndSegmentation.shopingStyle || 'N/A';
            document.getElementById('businessVisits').textContent = recommendationData.populationAndSegmentation.businessVisits || 'N/A';
            document.getElementById('frequencyVisits').textContent = recommendationData.populationAndSegmentation.frequencyVisits || 'N/A';
            document.getElementById('browsingBehavior').textContent = recommendationData.populationAndSegmentation.browsingBehavior || 'N/A';
            document.getElementById('shoppingPreference').textContent = recommendationData.populationAndSegmentation.shoppingPreference || 'N/A';
            document.getElementById('businessSatisfaction').textContent = recommendationData.populationAndSegmentation.businessSatisfaction || 'N/A';
            document.getElementById('businessLacking').textContent = recommendationData.populationAndSegmentation.businessLacking || 'N/A';

            document.getElementById('competitionDensity').textContent = recommendationData.competitionAnalysis.competitionDensity;
            document.getElementById('directCompetitor').textContent = recommendationData.competitionAnalysis.directCompetitor;
            document.getElementById('indirectCompetitor').textContent = recommendationData.competitionAnalysis.indirectCompetitor;
            document.getElementById('replacementCompetitor').textContent = recommendationData.competitionAnalysis.replacementCompetitor;

            document.getElementById('areaType').textContent = recommendationData.accessibilityAndInfrastructure.areaType || 'N/A';
            document.getElementById('TranspoAccess').textContent = recommendationData.accessibilityAndInfrastructure.TranspoAccess || 'N/A';
            document.getElementById('TranspoChallenge').textContent = recommendationData.accessibilityAndInfrastructure.TranspoChallenge || 'N/A';

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



// Function to populate table with top categories
function populateTable(topCategories) {
    const tableBody = document.querySelector("#table-container tbody");
    tableBody.innerHTML = ""; // Clear the table first

    if (topCategories && topCategories.length > 0) {
        topCategories.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add("table-row");
            row.innerHTML = `<td>${item.category}</td><td>${item.score}</td>`;

            row.addEventListener("click", function () {
                document.querySelectorAll(".table-row").forEach((r) => r.classList.remove("selected"));
                row.classList.add("selected");
                selectedCategory = item.category;
            });

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

        return runClusteringModel(barangay, smeData, marketDemandData, competitionData, barangayData);
    } catch (err) {
        console.error("Error fetching data:", err);
        return [];
    }
}

// Clustering logic based on barangay and data
function runClusteringModel(selectedBarangay, smeData, marketDemandData, competitionData, barangayData) {
    const allCategories = [
        "Food Services", "Retail Stores", "Healthcare Services", "Educational Services",
        "Professional Services", "Personal Care Services", "Manufacturing and Production",
        "Construction and Real Estate", "IT and Digital Services", "Transportation and Logistics",
        "Personal and Household Services", "Finance and Insurance", "Creative and Media Services",
        "Automotive Services", "Entertainment and Recreation", "Wholesale and Distribution",
        "Tourism and Hospitality", "Cooperative Business"
    ];

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
    console.log("Category Counts:", categoryCounts);

    const counts = Object.values(categoryCounts);
    const minCount = Math.min(...counts);
    const maxCount = Math.max(...counts);
    const normalizedCounts = {};
    const inverseNormalizedCounts = {};

    for (let category in categoryCounts) {
        normalizedCounts[category] = ((categoryCounts[category] - minCount) / (maxCount - minCount) * 100 ).toFixed(2);
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

const demandValues = Object.values(avgMarketDemands).map(Number);
const minDemand = Math.min(...demandValues);
const maxDemand = Math.max(...demandValues);

const normalizedDemands = {};
for (let category in avgMarketDemands) {
    normalizedDemands[category] = ((avgMarketDemands[category] - minDemand) / (maxDemand - minDemand) * 100).toFixed(2);
}

console.log("Average Market Demands:", avgMarketDemands);
console.log("Normalized Demands:", normalizedDemands);

// Step 4: Calculate market gaps
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

console.log("Market Gaps:", marketGaps);
console.log("Normalized Market Gaps:", normalizedMarketGaps);

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

console.log("Normalized Competition:", normalizedCompetition);
console.log("Inverse Normalized Competition:", inverseNormalizedCompetition);

// Step 6: Calculate area type scores
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
    "Wholesale and Distribution": { Commercial: 40, Industrial: 50, Residential: 10 }
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

console.log("Area Type Scores:", areaTypeScores);

// Step 7: Calculate total scores for each category
const totalScores = {};
for (let category in categoryCounts) {
    totalScores[category] = (
        (Number(inverseNormalizedCounts[category] || 0) * 0.25) +
        (Number(normalizedDemands[category] || 0) * 0.20) +
        (Number(normalizedMarketGaps[category] || 0) * 0.25) +
        (Number(inverseNormalizedCompetition[category] || 0) * 0.15) +
        (Number(areaTypeScores[category] || 0) * 0.15)
    ).toFixed(2);
}

console.log("Total Scores by Category:", totalScores);

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

// Function to run analysis for the selected barangay
async function runAnalysisModel(selectedCategory, selectedBarangay) {
    // Process psychographic and behavioral data
    const psychographicBehavioralData = await processPsychographicBehavioralData();

    // Process market and competition data for the selected category
    const marketCompetitionData = await processMarketCompetitionData(selectedCategory);

    // Fetch other necessary data for analysis
    const SMEData = await fetch('/api/sme-data').then(res => res.json());
    const CompetitionData = await fetch('/api/competition-data').then(res => res.json());
    const MarketDemandData = await fetch('/api/market-demand-data').then(res => res.json());
    const PopulationData = await fetch('/api/population-data').then(res => res.json());
    const TransportationData = await fetch('/api/transportation-data').then(res => res.json());

    // Filter SME data and extract specific barangay information
    const filteredData = SMEData.filter(row => row.Category === selectedCategory);
    const barangayData = filteredData.find(row => row.Barangay === selectedBarangay);

    const totalBusinessesInCity = filteredData.length;
    const businessesInBarangay = barangayData ? barangayData.Count : 0;

    // Extract market and competition data for the selected barangay
    const {
        barangayCounts,
        normalizedCounts,
        normalizedDemands,
        normalizedMarketGaps,
        normalizedCompetition,
        inverseNormalizedCompetition,
        directCompetition,
        indirectCompetition,
        replacementCompetition,
        normalizedPopulation,
        populationDensity,
        normalizedTranspo,
        transportChallenges,
        areaTypes,
        areaTypeScores
    } = marketCompetitionData;

    const topCounts = barangayCounts[selectedBarangay] || 0;
    const categoryCounts = normalizedCounts[selectedBarangay] || 0;
    const marketDemandScore = normalizedDemands[selectedBarangay] || 0;
    const marketGapScore = normalizedMarketGaps[selectedBarangay] || 0;
    const competitionDensityScore = normalizedCompetition[selectedBarangay] || 0;
    const normalizedPopulationDensity = normalizedPopulation[selectedBarangay] || 0;
    const population = populationDensity[selectedBarangay] || 0;
    const transportationAccess = normalizedTranspo[selectedBarangay] || 0;
    const transportationChallenge = transportChallenges[selectedBarangay] || "None";
    const topAreaTypes = areaTypes[selectedBarangay] || 0;
    const topAreaTypeScore = areaTypeScores[selectedBarangay] || 0;
    const direct = directCompetition[selectedBarangay] || 0;
    const indirect = indirectCompetition[selectedBarangay] || 0;
    const replacement = replacementCompetition [selectedBarangay] || 0;

    // Demand, Competition, and Market Gap Descriptions

    const countDescription = categoryCounts >= 76 ? "High Count" :
                             categoryCounts >= 51 ? "Moderate Count" :
                             categoryCounts >= 26 ? "Low Count" : "Very Low Count";
    const countText = categoryCounts >= 76 ? "Strong concentration of businesses, indicating high activity and competition" :
                      categoryCounts >= 51 ? "Moderate business presence, balancing demand with a reasonable supply" :
                      categoryCounts >= 26 ? "Limited business availability, with some options but room for growth" :
                      "Minimal business presence, suggesting potential for new entries";

    const demandDescription = marketDemandScore >= 76 ? "High Demand" :
                              marketDemandScore >= 51 ? "Medium Demand" : 
                              marketDemandScore >= 26 ? "Low Demand" : "Very Low Demand";
    const demandText = marketDemandScore >= 76 ? "Significant need, good interest" :
                       marketDemandScore >= 51 ? "Moderate interest" :
                       marketDemandScore >= 26 ? "Limited interest" : "Minimal or no interest"  

    const businessGapDescription = marketGapScore >= 76 ? "Critical Gap" :
                                   marketGapScore >= 51 ? "Moderate Gap" : 
                                   marketGapScore >= 26 ? "Minor Gap" : "No Gap";
    const businessGapText = marketGapScore >= 76 ? "Significant need for services/products" :
                            marketGapScore >= 51 ? "Noticeable lack, but not urgent" :
                            marketGapScore >= 26 ? "Slight shortfall, potential for improvement" : 
                            "Market is saturated, no apparent gaps";
    const competitionDescription = competitionDensityScore >= 76 ? "Very High Competition" :
                                   competitionDensityScore >= 51 ? "High Competition" :
                                   competitionDensityScore >= 26 ? "Low Competition" : "Very Low/No Competition";    

    const competitionText = competitionDensityScore >= 76 ? "Very few market opportunities" :
                            competitionDensityScore >= 51 ? "Limited market opportunities" :
                            competitionDensityScore >= 26 ? "Some market opportunities" :
                            "Many market opportunities";

    // Interpret population density
    const populationText = normalizedPopulationDensity >= 15000 ? "High population density, strong customer base" :
                           normalizedPopulationDensity >= 5000 ? "Moderate population density, growth potential" :
                           "Low population density, potential for niche markets";

    // Interpret transportation description
    const transportationText = transportationAccess >= 76 ? "Excellent transport, very accessible" :
                               transportationAccess >= 51 ? "Good transport, mostly accessible" :
                               "Moderate transport with potential for improvement";

    const areaTypeText = topAreaTypeScore >= 76 ? "Highly Favorable" :
                         topAreaTypeScore >= 51 ? "Moderately Favorable" :
                         topAreaTypeScore >= 26 ? "Somewhat Favorable" : 
                              "Unfavorable";
     const areaTypeDescription = topAreaTypeScore >= 76 ? "Ideal for your business type" :
                                 topAreaTypeScore >= 51 ? "Good for your needs with potential" :
                                 topAreaTypeScore >= 26 ? "Opportunities exist for growth" : 
                                 "Challenges present opportunities for change";                          
                

    // Behavior satisfaction and business lacking interpretations
    const satisfaction = psychographicBehavioralData.satisfactionMean[selectedBarangay] || 0;
    const lacking = psychographicBehavioralData.businessesLackingMean[selectedBarangay] || 0;

    const satisfactionText = satisfaction >= 3.25 ? "Highly Satisfied" :
                             satisfaction >= 2.5 ? "Satisfied" :
                             satisfaction >= 1.75 ? "Somewhat Satisfied" : "Not Very Satisfied";

    const lackingText = lacking >= 3.25 ? "Many Businesses Lacking" :
                        lacking >= 2.5 ? "Some Businesses Lacking" :
                        lacking >= 1.75 ? "Few Businesses Lacking" : "No Businesses Lacking";

    // Generate Recommendation Summary
    const recommendationText = `Based on the analysis, we recommend that businesses focusing on ${selectedCategory.toLowerCase()} consider establishing themselves in ${selectedBarangay}.
    The current business presence in the area falls under the category of ${countDescription.toLowerCase()}, reflecting ${countText.toLowerCase()}.
    The demand for ${selectedCategory.toLowerCase()} is ${demandDescription.toLowerCase()}, indicating ${demandText.toLowerCase()}.
    There is a ${businessGapDescription.toLowerCase()} in services, suggesting ${businessGapText.toLowerCase()}.
    The competition density is ${competitionDescription.toLowerCase()}, meaning ${competitionText.toLowerCase()}.
    Population density in ${selectedBarangay} is ${populationText.toLowerCase()}, underscoring its potential as a suitable location.
    Transportation is ${transportationText.toLowerCase()}. Although there are some ${transportationChallenge.toLowerCase()} that could pose challenges.
    The area type is specifically categorized as ${topAreaTypes.toLowerCase()}, which is ${areaTypeText.toLowerCase()} and indicates ${areaTypeDescription.toLowerCase()}. This makes it a suitable location for the businesses.
    Establishing a business in ${selectedBarangay} can effectively address community needs and capitalize on market dynamics.`;

    // Final Result Object
    const result = {
        businessOverview: {
            mainCategory: selectedCategory,
            totalBusinessesInCity,
            topCounts,
        },
        marketDemandAndGaps: {
            marketDemand: `${demandDescription} (${marketDemandScore}) - ${demandText}`,
            businessGaps: `${businessGapDescription} (${marketGapScore}) - ${businessGapText}`,
            criticalGap: "(76 - 100)",
            moderateGap: "(51 - 75)",
            minorGap: "(26 - 50)",
            noGap: "(0 - 25)"
        },
        populationAndSegmentation: {
            populationOverview: `${population} per sq. km`,
            businessMotivation: psychographicBehavioralData.Motivation[selectedBarangay] || 'N/A',
            shopingTraits: psychographicBehavioralData.ShoppingTraits[selectedBarangay] || 'N/A',
            businessFactors: psychographicBehavioralData.Factors[selectedBarangay] || 'N/A',
            shopingStyle: psychographicBehavioralData.ShoppingStyle[selectedBarangay] || 'N/A',
            businessVisits: psychographicBehavioralData.businessVisits[selectedBarangay] || 'N/A',
            frequencyVisits: psychographicBehavioralData.frequencyVisits[selectedBarangay] || 'N/A',
            browsingBehavior: psychographicBehavioralData.browsingBehavior[selectedBarangay] || 'N/A',
            shoppingPreference: psychographicBehavioralData.shoppingPreferences[selectedBarangay] || 'N/A',
            businessSatisfaction: satisfactionText,
            businessLacking: lackingText,
        },
        competitionAnalysis: {
            competitionDensity: `${competitionDescription} (${competitionDensityScore}) - ${competitionText}`,
            directCompetitor: direct ?? 0,
            indirectCompetitor: indirect ?? 0,
            replacementCompetitor: replacement ?? 0,
        },
        accessibilityAndInfrastructure: {
            areaType: `${topAreaTypes} (${areaTypeText})`,
            TranspoAccess: transportationText,
            TranspoChallenge: transportationChallenge
        },
        recommendationSummary: {
            summaryText: recommendationText,
        }
    };

    console.log('Result:', result);

    return result;
}

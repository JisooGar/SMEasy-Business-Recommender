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

// Psychographic and Behavioral Analysis Variables
let psychographicsData = {};
let behavioralData = {};

// Find mode for psychographic/behavioral data
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

// Calculate mean for behavioral data
const calculateMean = (arr) => {
    const total = arr.reduce((sum, value) => sum + value, 0);
    return (total / arr.length).toFixed(2);
};

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
        populationDensity,
        normalizedPopulation,
        normalizedTranspo,
        transportChallenges,
        areaTypes,
        areaTypeScores
    };
}




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
            document.getElementById('topCounts').textContent = recommendationData.businessOverview.topCounts;

            // === Step 5: Update Market Demand and Gaps ===
            document.getElementById('highDemand').textContent = recommendationData.marketDemandAndGaps.criticalGap;
            document.getElementById('mediumDemand').textContent = recommendationData.marketDemandAndGaps.moderateGap;
            document.getElementById('lowDemand').textContent = recommendationData.marketDemandAndGaps.minorGap;
            document.getElementById('noDemand').textContent = recommendationData.marketDemandAndGaps.noGap;
            document.getElementById('marketDemand').textContent = recommendationData.marketDemandAndGaps.marketDemand;
            document.getElementById('businessGaps').textContent = recommendationData.marketDemandAndGaps.businessGaps;
            
            // === Step 6: Update Population and Segmentation Analysis ===
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

            // === Step 7: Update Competition Analysis ===
            document.getElementById('competitionDensity').textContent = recommendationData.competitionAnalysis.competitionDensity;
            document.getElementById('directCompetitor').textContent = recommendationData.competitionAnalysis.directCompetitor;
            document.getElementById('indirectCompetitor').textContent = recommendationData.competitionAnalysis.indirectCompetitor;
            document.getElementById('replacementCompetitor').textContent = recommendationData.competitionAnalysis.replacementCompetitor;

            // === Step 8: Update Accessibility and Infrastructure ===
            document.getElementById('areaType').textContent = recommendationData.accessibilityAndInfrastructure.areaType || 'N/A';
            document.getElementById('TranspoAccess').textContent = recommendationData.accessibilityAndInfrastructure.TranspoAccess || 'N/A';
            document.getElementById('TranspoChallenge').textContent = recommendationData.accessibilityAndInfrastructure.TranspoChallenge || 'N/A';

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
    const psychographicsData = await fetch('/api/psychographics-data').then(res => res.json());
    const behavioralData = await fetch('/api/behavioral-data').then(res => res.json());


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
        populationDensity,
        normalizedPopulation,
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

    // Interpretation
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
                       marketDemandScore >= 26 ? "Limited interest" : "Minimal or no interest";  

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
    const populationText = normalizedPopulationDensity >= 76 ? "High population density, strong customer base" :
                           normalizedPopulationDensity >= 51 ? "Moderate population density, growth potential" :
                           normalizedPopulationDensity >= 26 ? "Low population density, but opportunities exist for attracting new customers" :
                           "Very low population density, indicating challenges but potential for niche markets";

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
            businessGaps:`${businessGapDescription} (${marketGapScore}) - ${businessGapText}`,
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

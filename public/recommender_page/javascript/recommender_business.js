// Barangay table
const barangayData = {
  "Baclaran": [
    { name: "Manufacturing and Production", count: 77.5 },
    { name: "Entertainment and Recreation", count: 72.5 },
    { name: "Personal Care and Services", count: 62.5 },
  ],
  "Banaybanay": [
    { name: "None", count: 0 },
  ],
  "Banlic": [
    { name: "Entertainment and Recreation", count: 70 },
    { name: "Tourism and Hospitality", count: 62.5 }
  ],
  "Bigaa": [
    { name: "Personal Care Services", count: 77.5 },
    { name: "IT and Digital Services", count: 65 }
  ],
  "Butong": [
    { name: "Entertainment and Recreation", count: 72.5 },
    { name: "Personal Care Services", count: 67.5 },
    { name: "Construction and Real Estate", count: 67.5 },
    { name: "IT and Digital Services", count: 65 },
  ],
  "Casile": [
    { name: "IT and Digital Services", count: 75 },
    { name: "Professional Services", count: 70 },
    { name: "Transportation and Logistics", count: 65 },
    { name: "Personal Care Services", count: 60 },
  ],
  "Diezmo": [
    { name: "Educational Services", count: 75 },
    { name: "Automotive Services", count: 75 },
    { name: "Personal Care Services", count: 72.5 },
    { name: "Tourism and Hospitality", count: 67.5 },
  ],
  "Gulod": [
    { name: "Personal Care Services", count: 80 },
  ],
  "Mamatid": [
    { name: "Tourism and Hospitality", count: 67.5 },
  ],
  "Marinig": [
    { name: "Finance and Insurance", count: 82.5 },
    { name: "Food Services", count: 75 },
    { name: "Entertainment and Recreation", count: 75 },
    { name: "Tourism and Hospitality", count: 65 },
  ],
  "Niugan": [
    { name: "Personal Care Services", count: 67.5 },
    { name: "Tourism and Hospitality", count: 62.5 }
  ],
  "Pittland": [
    { name: "Educational Services", count: 77.5 },
    { name: "Personal Care Services", count: 65 },
    { name: "Healthcare Services", count: 62.5 },
  ],
  "Poblacion Uno": [
    { name: "Entertainment and Recreation", count: 62.5 },
  ],
  "Poblacion Dos": [
    { name: "Transportation and Logistics", count: 80 },
    { name: "Automotive Services", count: 70 }
  ],
  "Poblacion Tres": [
    { name: "Entertainment and Recreation", count: 72.5 },
    { name: "IT and Digital Services", count: 62.5 },
    { name: "Professional Services", count: 62.5 },
  ],
  "Pulo": [
    { name: "IT and Digital Services", count: 75 },
    { name: "Entertainment and Recreation", count: 67.5 }
  ],
  "Sala": [
    { name: "Personal Care Services", count: 70 },
    { name: "Creative and Media Services", count: 62.5 },
    { name: "Entertainment and Recreation", count: 62.5 },
  ],
  "San Isidro": [
    { name: "Entertainment and Recreation", count: 80 },
    { name: "Tourism and Hospitality", count: 72.5 },
    { name: "Personal Care Services", count: 70 },
  ],
};

//Analyzation Result
const recommendationData = {
  "Baclaran": {
    locationOverview: {
      selectedBarangay: "Baclaran",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 46,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 24 },
        { name: "Healthcare Services", count: 4 },
        { name: "Creative and Media Service", count: 3 },
      ],
      underservedCategories: ["None"],
      potentialMarketGaps: ["Tourism and Hospitality", "Manufacturing and Production", "Entertainment and Recreation", "Personal Care Services"]
    },
    populationSegmentation: {
      populationOverview: 15164,
      segmentation: ["???"], 
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Tourism and Hospitality: Residential and Commercial Spaces", "Manufacturing and Production: Industrial", "Entertainment and Recreation: Commercial", "Personal Care Services: Residential and Commercial", "Residential and Commercial Spaces"],
      publicTransportAccess: "Good Transportation Links and Commercial Accessibility",
      challenges: "Long Travel Distances"
    }
  },

  "Banaybanay": {
    locationOverview: {
      selectedBarangay: "Banaybanay",
      barangayAreaType: "Mixed (Residential, Commercial, Industrial)",
      totalBusinesses: 364,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 128 },
        { name: "Construction and Real Estate", count: 37 },
        { name: "Wholesale and Distribution", count: 29 },
      ],
      underservedCategories: ["None"],
      potentialMarketGaps: ["None"]
    },
    populationSegmentation: {
      populationOverview: 40936,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["???"],
      publicTransportAccess: "Good Transportation Links and Commercial Accessibility",
      challenges: "Traffic Congestion"
    }
  },

  "Banlic": {
    locationOverview: {
      selectedBarangay: "Banlic",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 361,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 147 },
        { name: "Construction and Real Estate", count: 45 },
        { name: "Food Services", count: 26 },
      ],
      underservedCategories: ["Entertainment and Recreation", "Cooperative Business", "Tourism and Hospitality"],
      potentialMarketGaps: ["Entertainment and Recreation", "Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 11496,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Entertainment and Recreation: Residential and Commercial ", "Tourism and Hospitality: Commercial"],
      publicTransportAccess: "Good Transportation Links and Commercial Accessibility",
      challenges: "Poor Road Condition"
    }
  },

  "Bigaa": {
    locationOverview: {
      selectedBarangay: "Bigaa",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 75,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 27 },
        { name: "Construction and Real Estate", count: 17 },
        { name: "Transportation", count: 9 },
      ],
      underservedCategories: ["Personal Care Services, IT and Digital Services", "Food Services", 0, 0],
      potentialMarketGaps: ["Personal Care Services", "IT and Digital Services"]
    },
    populationSegmentation: {
      populationOverview: 14235,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Personal Care Services: Residential and Commercial", "IT and Digital Services: Commercial"],
      publicTransportAccess: "???",
      challenges: "Long Travel Distance"
    }
  },

  "Butong": {
    locationOverview: {
      selectedBarangay: "Butong",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 49,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 24 },
        { name: "Wholesale and Distribution", count: 5 },
        { name: "Professional Services", count: 4 },
      ],
      underservedCategories: ["IT and Digital Services,","Finance and Insurance","Personal Care Services", "Entertainment and Recreation", "Creative and Medica Service",
        "Tourism and Hospitality","Construction and Real Estate", "Cooperative Business"
      ],
      potentialMarketGaps: ["Entertainment and Recreation", "Personal Care Services", "Construction and Real Estate", "IT and Digital Services"]
    },
    populationSegmentation: {
      populationOverview: 14235,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Entertainment and Recreation: ", "Personal Care Services: ", "Construction and Real Estate: ", "IT and Digital Services: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distance"
    }
  },

  "Casile": {
    locationOverview: {
      selectedBarangay: "Casile",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 75,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 7 },
        { name: "Food Services", count: 3 },
        { name: "Construction and Real Estate", count: 2 },
      ],
      underservedCategories: ["Healthcare Services", "IT and Digital Services", "Manufacturing and Production", "Education Services", "Education Services",
        "Personal Care Services", "Professional Services", "Creative and Media Services", "Wholesale and Distribution", "Transportation and logistics", "Finance and Insurance"
      ],
      potentialMarketGaps: ["IT and Digital Services", "Professional Services", "Transportation and Logistics", "Personal Care Services"]
    },
    populationSegmentation: {
      populationOverview: 3794,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["IT and Digital Services", "Professional Services", "Transportation and Logistics", "Personal Care Services"],
      publicTransportAccess: "???",
      challenges: "Long Travel Distance"
    }
  },

  "Diezmo": {
    locationOverview: {
      selectedBarangay: "Casile",
      barangayAreaType: "Mixed(Residential, Commercial, Industrial)",
      totalBusinesses: 98,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Construction and Real Estate", count: 23 },
        { name: "Manufacturing and Production", count: 20 },
        { name: "Food Services", count: 17 },
      ],
      underservedCategories: ["Personal and Household", "Education Services", "Personal Care Services", "Tourism and Hospitality", "Automotive Services"],
      potentialMarketGaps: ["Educational Services", "Automotive Services", "Personal Care Services", "Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 98,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Educational Services: ", "Automotive Services: ", "Personal Care Services: ", "Tourism and Hospitality: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distance"
    }
  },

  "Gulod": {
    locationOverview: {
      selectedBarangay: "Gulod",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 69,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 30 },
        { name: "Construction and Real Estate", count: 9 },
        { name: "Transportation and Logistics", count: 9 },
      ],
      underservedCategories: ["IT and Digital Services", "Entertainment and Recreation", "Personal Care Services", "Cooperative Business", 0],
      potentialMarketGaps: ["Personal Care Services"]
    },
    populationSegmentation: {
      populationOverview: 17873,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Personal Care Services: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distance"
    }
  },

  "Mamatid": {
    locationOverview: {
      selectedBarangay: "Mamatid",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 252,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 103 },
        { name: "Construction and Real Estate", count: 20 },
        { name: "Healthcare Services", count: 19 },
      ],
      underservedCategories: ["Tourism and Hospotality", "Cooperative Business", "Entertainment and Recreation", 0, 0],
      potentialMarketGaps: ["Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 56761,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Tourism and Hospitality: "],
      publicTransportAccess: "???",
      challenges: "Traffic Congestion"}
  },

  "Marinig": {
    locationOverview: {
      selectedBarangay: "Marinig",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 136,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 77 },
        { name: "Construction and Real Estate", count: 15 },
        { name: "Transportation and Logistic", count: 12 },
      ],
      underservedCategories: ["Personal Care Services", "Entertainment and Recreation", "Tourism and Hospitality", "Finance and Insurance", "Food Services"],
      potentialMarketGaps: ["Finance and Insurance", "Food Services", "Entertainment and Recreation", "Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 56154,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Finance and insurance: ", "Food Services: ", "Entertainment and Recreation: ", "Tourism and Hospitality: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distance"
    }
  },

  "Niugan": {
    locationOverview: {
      selectedBarangay: "Niugan",
      barangayAreaType: "Mixed(Residential, Commercial, Industrial)",
      totalBusinesses: 139,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 51 },
        { name: "Construction and Real Estate", count: 18 },
        { name: "Manufacturing and Production", count: 11 },
      ],
      underservedCategories: ["Personal Care Services,", "Cooperaive Business", "Tourism and Hospitality"],
      potentialMarketGaps: ["Personal Care Services", "Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 87645,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Personal Care Services", "Tourism and Hospitality", 0, 0],
      publicTransportAccess: "???",
      challenges: "Inadequate Pedestrian pathways"
    }
  },

  "Pittland": {
    locationOverview: {
      selectedBarangay: "Pittland",
      barangayAreaType: "Mixed(Residential, Commercial, Industrial)",
      totalBusinesses: 33,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 6 },
        { name: "Construction and Real Estate", count: 5 },
        { name: "Professional Services", count: 5 },
      ],
      underservedCategories: ["Personal and Household Services", "Personal Care Services", "Education Services", "Creative and Media Services", "Tourism and Hospitality",
        "Healthcare Services", "Automotive Services", "Entertainment and Recreation"
      ],
      potentialMarketGaps: ["Personal Care Services", "Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 4733,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Education Services:", "Personal Care Services:", "Healthcare Services:"],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },

"Poblacion Uno": {
    locationOverview: {
      selectedBarangay: "Poblacion Uno",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 62,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 19 },
        { name: "Construction and Real Estate", count: 13 },
        { name: "Finance and Insurance", count: 8 },
      ],
      underservedCategories: ["Entertainment and Recreation", "Tourism and Hospitality", "Cooperative Business", "Manufacturing and Production"
      ],
      potentialMarketGaps: ["Entertainment and Recreation"]
    },
    populationSegmentation: {
      populationOverview: 7025,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Entertainment and Recreation:"],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },

  "Poblacion Dos": {
    locationOverview: {
      selectedBarangay: "Poblacion Dos",
      barangayAreaType: "Commercial",
      totalBusinesses: 96,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 53 },
        { name: "Healthcare Services", count: 9 },
        { name: "Finance and Insurance", count: 8 },
      ],
      underservedCategories: ["Automotive Services", "IT and Digital Services", "Professional Services", "Creative and Media Service", "Transportation and Logistics"

      ],
      potentialMarketGaps: ["Transportation and Logistics", "Automotive Services"]
    },
    populationSegmentation: {
      populationOverview: 2108,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Transportation and Logistics:", "Automotive Services:"],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },

  "Poblacion Tres": {
    locationOverview: {
      selectedBarangay: "Poblacion Tres",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 62,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 20 },
        { name: "Construction and Real Estate", count: 8 },
        { name: "Food Services", count: 8 },
      ],
      underservedCategories: ["Wholesale and Distribution", "Entertainment and Recreation", "IT and Digital Services", "Professional Services", "Tourism and Hospitality"
      ],
      potentialMarketGaps: ["Entertainment and Recreation", "IT and Digital Services", "Professional Services"]
    },
    populationSegmentation: {
      populationOverview: 4274,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Entertainment and Recreation: ", "IT and Digital Services: ", "Professional Services: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },

  "Pulo": {
    locationOverview: {
      selectedBarangay: "Pulo",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 414,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 120 },
        { name: "Transportation and Logistics", count: 63 },
        { name: "Construction and Real Estate", count: 53 },
      ],
      underservedCategories: ["IT and Digital Services", "Creative and Media Service", "Cooperative Business", "Entertainment and Recreation"
      ],
      potentialMarketGaps: ["IT and Digital Services", "Entertainment and Recreation"]
    },
    populationSegmentation: {
      populationOverview: 36444,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["IT and Digital Services: ", "Entertainment and Recreation: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },

  "Sala": {
    locationOverview: {
      selectedBarangay: "Sala",
      barangayAreaType: "Mixed (Residential, Commercial, Industrial)",
      totalBusinesses: 234,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 60 },
        { name: "Construction and Real Estate", count: 31 },
        { name: "Food Services", count: 22 },
      ],
      underservedCategories: ["Creative and Media Service", "Personal Care Services", "Entertainment and Recreation"
      ],
      potentialMarketGaps: ["Personal Care Services", "Creative and Media Service", "Entertainment and Recreation"]
    },
    populationSegmentation: {
      populationOverview: 10903,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Personal Care Services: ", "Creative and Media Service: ", "Entertainment and Recreation: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },

  "San Isidro": {
    locationOverview: {
      selectedBarangay: "San Isidro",
      barangayAreaType: "Residential and Commercial",
      totalBusinesses: 171,
    },
    marketAnalysis: {
      topCategories: [
        { name: "Retail Stores", count: 50 },
        { name: "Construction and Real Estate", count: 22 },
        { name: "Transportation and Logistics", count: 16 },
      ],
      underservedCategories: ["Personal Care Services", "Entertainment and Recreation", "Creative and Media Service", "Tourism and Hospitality"
      ],
      potentialMarketGaps: ["Entertainment and Recreation", "Personal Care Services", "Tourism and Hospitality"]
    },
    populationSegmentation: {
      populationOverview: 30509,
      segmentation: ["???"]
    },
    recommendationSummary: {
      summary: "???"
    },
    accessibilityAndInfrastructure: {
      areaTypes: ["Entertainment and Recreation: ", "Personal Care Services: ", "Tourism and Hospitality: "],
      publicTransportAccess: "???",
      challenges: "Long Travel Distances"
    }
  },
};

// Function to handle barangay selection
function selectBarangay(button) {
  const barangayButtons = document.querySelectorAll(".barangay-btn");
  barangayButtons.forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");

  selectedBarangay = button.textContent.trim();
}

// Function to handle Proceed button
function handleProceed() {
  if (selectedBarangay) {
    document.getElementById("result-section").style.display = "block";
    document.querySelector(".recommendation-section").style.display = "none";
    populateTable(selectedBarangay);
  } else {
    alert("Please select a barangay.");
  }
}

// Function to populate the table with the top recommended categories
function populateTable(barangay) {
  const tableBody = document.querySelector("#table-container tbody");
  tableBody.innerHTML = "";

  const data = barangayData[barangay];
  if (data) {
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.name}</td><td>${item.count}</td>`;
      tableBody.appendChild(row);
    });
  } else {
    tableBody.innerHTML = '<tr><td colspan="2">No data available for this barangay.</td></tr>';
  }
}

// Function to handle Analyze button and show the recommendation details
function handleAnalyze() {
  if (selectedBarangay) {
    const data = barangayData[selectedBarangay];

    // Find the category with the lowest business count
    let lowestBusiness = data.reduce((prev, curr) => (prev.count < curr.count ? prev : curr));

    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.style.display = "block";

    setTimeout(function () {
      loadingSpinner.style.display = "none";
      const recommendationSection = document.querySelector(".recommendation-section");
      recommendationSection.style.display = "block";
      recommendationSection.scrollIntoView({ behavior: "smooth" });

      // Set the Barangay and Category in the recommendation section
      const barangayNameElement = document.getElementById("barangayName");
      barangayNameElement.textContent = `BRGY NAME: ${selectedBarangay} (${lowestBusiness.name})`;

      // Populate the location overview
      const recommendation = recommendationData[selectedBarangay];
      document.getElementById('selectedBarangay').textContent = `Selected Barangay: ${recommendation.locationOverview.selectedBarangay}`;
      document.getElementById('barangayAreaType').textContent = `Barangay Area type: ${recommendation.locationOverview.barangayAreaType}`;
      document.getElementById('totalBusinesses').textContent = `Total Registered SMEs: ${recommendation.locationOverview.totalBusinesses}`;

      // Populate the Market Analysis
      populateMarketAnalysis(recommendation);

      // Populate Population and Segmentation Analysis
      document.getElementById('populationOverview').textContent = `Population Overview: ${recommendation.populationSegmentation.populationOverview}`;
      document.getElementById('segmentation').textContent = `Segmentation: ${recommendation.populationSegmentation.segmentation || 'N/A'}`;

      // Populate the Accessibility and Infrastructure
      populateAccessibilityInfrastructure(recommendation);

      // Populate the Recommendation Summary
      document.getElementById('recommendationSummary').textContent = recommendation.recommendationSummary.summary;

    }, 2000); // Simulate loading time
  } else {
    alert("Please select a barangay before analyzing.");
  }
}


// Function to populate the Market Analysis section with tables
function populateMarketAnalysis(recommendation) {
  // Top Striving Categories
  const topStrivingTableBody = document.getElementById("topStrivingCategories");
  topStrivingTableBody.innerHTML = "";
  recommendation.marketAnalysis.topCategories.forEach((item) => {
    topStrivingTableBody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.count}</td>
      </tr>
    `;
  });

  // Underserved Categories
  const underservedTableBody = document.getElementById("underservedCategories");
  underservedTableBody.innerHTML = "";
  recommendation.marketAnalysis.underservedCategories.forEach((category) => {
    underservedTableBody.innerHTML += `
      <tr>
        <td>${category}</td>
      </tr>
    `;
  });

  // Potential Market
  const potentialMarketTableBody = document.getElementById("potentialMarket");
  potentialMarketTableBody.innerHTML = "";
  recommendation.marketAnalysis.potentialMarketGaps.forEach((gap) => {
    potentialMarketTableBody.innerHTML += `
      <tr>
        <td>${gap}</td>
      </tr>
    `;
  });
}

// Function to populate the Accessibility and Infrastructure section
function populateAccessibilityInfrastructure(recommendation) {
  // Populate Area Types into the table
  const accessibilityTableBody = document.getElementById("accessibilityTable");
  accessibilityTableBody.innerHTML = "";
  
  recommendation.accessibilityAndInfrastructure.areaTypes.forEach((type) => {
    accessibilityTableBody.innerHTML += `
      <tr>
        <td>${type}</td>
      </tr>
    `;
  });

  // Populate Public Transport Access and Challenges as paragraphs
  document.getElementById('publicTransportAccess').textContent = `Public Transport Access: ${recommendation.accessibilityAndInfrastructure.publicTransportAccess}`;
  document.getElementById('challenges').textContent = `Challenges: ${recommendation.accessibilityAndInfrastructure.challenges}`;
}

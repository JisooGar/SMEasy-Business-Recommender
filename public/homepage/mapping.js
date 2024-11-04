let map, markerCluster;
let barangayMarkers = [];
let businessMarkers = [];
let infoWindows = [];
let currentBarangayMarkers = [];
let currentBusinessMarkers = [];
let currentCircles = []; // For storing circle references
let selectedBarangayId = null;
let defaultIndustryLabel = 'Industry';
let defaultCategoryLabel = 'Business Categories';
let allBarangayMarkers = [];
let selectedCategoryIcon;
let zoomLevelThreshold = 15;

// Ensure the map only initializes after the window has fully loaded
window.onload = function () {
    loadGoogleMapsScript();
};

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAOHl7UhfFADZokofIACrQ4oplJWdvpmPk&callback=initMap';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Initialize the map
function initMap() {
    const centerMapCoords = { lat: 14.2451941, lng: 121.1353066 };
    const mapOptions = {
        center: centerMapCoords,
        zoom: 13,
        mapId: 'eb0bfae709baaabb',
        heading: 0,
        tilt: 52,
        gestureHandling: 'greedy',
        disableDefaultUI: true,
    };

    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    // Define the coordinates for Cabuyao's boundary (replace these with accurate coordinates)
const cabuyaoCoords = [
    { lat: 14.3035585, lng: 121.1276586 },
    { lat: 14.3013129, lng: 121.1252124 },
    { lat: 14.2981107, lng: 121.1257703 },
    { lat: 14.2961561, lng: 121.1242253 },
    { lat: 14.2935777, lng: 121.125427 },
    { lat: 14.287173, lng: 121.1211783 },
    { lat: 14.2874226, lng: 121.1192041 },
    { lat: 14.2861749, lng: 121.1190324 },
    { lat: 14.2852183, lng: 121.1201053 },
    { lat: 14.2805603, lng: 121.1149983 },
    { lat: 14.2796453, lng: 121.1118225 },
    { lat: 14.2758605, lng: 121.1117795 },
    { lat: 14.2715766, lng: 121.1082175 },
    { lat: 14.2711191, lng: 121.1050417 },
    { lat: 14.267043, lng: 121.1013938 },
    { lat: 14.2626342, lng: 121.0902785 },
    { lat: 14.2582252, lng: 121.0800644 },
    { lat: 14.2529427, lng: 121.0795065 },
    { lat: 14.2379262, lng: 121.0848281 },
    { lat: 14.2340992, lng: 121.0706656 },
    { lat: 14.2198719, lng: 121.0502374 },
    { lat: 14.2133404, lng: 121.0418689 },
    { lat: 14.178246, lng: 121.0155826 },
    { lat: 14.1621953, lng: 121.0179112 },
    { lat: 14.1614573, lng: 121.0202397 },
    { lat: 14.2099292, lng: 121.0583487 },
    { lat: 14.2146302, lng: 121.0640135 },
    { lat: 14.2171679, lng: 121.0701076 },
    { lat: 14.2182912, lng: 121.0750001 },
    { lat: 14.2188736, lng: 121.0781758 },
    { lat: 14.2199968, lng: 121.079635 },
    { lat: 14.2201216, lng: 121.0801929 },
    { lat: 14.220829, lng: 121.081266 },
    { lat: 14.2209538, lng: 121.0818668 },
    { lat: 14.2223682, lng: 121.082854 },
    { lat: 14.2242402, lng: 121.0880468 },
    { lat: 14.2266946, lng: 121.0896347 },
    { lat: 14.2263618, lng: 121.0927676 },
    { lat: 14.2279842, lng: 121.0952996 },
    { lat: 14.2284418, lng: 121.0984754 },
    { lat: 14.2289826, lng: 121.1020374 },
    { lat: 14.2303554, lng: 121.1058998 },
    { lat: 14.2318113, lng: 121.108389 },
    { lat: 14.2333504, lng: 121.1117365 },
    { lat: 14.2348896, lng: 121.1133672 },
    { lat: 14.2373439, lng: 121.1151269 },
    { lat: 14.2370528, lng: 121.1170152 },
    { lat: 14.2346401, lng: 121.1193326 },
    { lat: 14.234349, lng: 121.1207275 },
    { lat: 14.2343074, lng: 121.1211782 },
    { lat: 14.2338914, lng: 121.1225086 },
    { lat: 14.2340369, lng: 121.1234955 },
    { lat: 14.2339953, lng: 121.1246329 },
    { lat: 14.2344529, lng: 121.128002 },
    { lat: 14.2344113, lng: 121.1293108 },
    { lat: 14.2331216, lng: 121.1303409 },
    { lat: 14.2308961, lng: 121.1312636 },
    { lat: 14.225821, lng: 121.1385592 },
    { lat: 14.2305218, lng: 121.1472285 },
    { lat: 14.232165, lng: 121.1569918 },
    { lat: 14.2339953, lng: 121.1642019 },
    { lat: 14.237344, lng: 121.176154 },
    { lat: 14.244665, lng: 121.1722488 },
    { lat: 14.2568941, lng: 121.1688155 },
    { lat: 14.2632581, lng: 121.1660689 },
    { lat: 14.2681245, lng: 121.1643521 },
    { lat: 14.268374, lng: 121.1631934 },
    { lat: 14.2688731, lng: 121.1635797 },
    { lat: 14.2704536, lng: 121.1626784 },
    { lat: 14.2709943, lng: 121.1614338 },
    { lat: 14.2743217, lng: 121.1601034 },
    { lat: 14.2806019, lng: 121.1515202 },
    { lat: 14.289502, lng: 121.1461127 },
    { lat: 14.2882128, lng: 121.1441385 },
    { lat: 14.2917478, lng: 121.1408339 },
    { lat: 14.2932034, lng: 121.1404477 },
    { lat: 14.3010218, lng: 121.1320361 },
    { lat: 14.3035585, lng: 121.1276586 }
];

    // Create the Cabuyao polygon
    const cabuyaoPolygon = new google.maps.Polygon({
        paths: cabuyaoCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0,
    });

    // Add the polygon to the map
    cabuyaoPolygon.setMap(map);

    fetchBarangayMarkers();
    populateBarangayDropdown();
    populateIndustryDropdown();
}

// Fetch barangay data from the server and add markers
function fetchBarangayMarkers() {
    fetch('/api/barangays')
        .then((response) => response.json())
        .then((barangays) => {
            barangayMarkers = [];  // Clear previous markers
            allBarangayMarkers = [];

            barangays.forEach((barangay) => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(barangay.latitude), lng: parseFloat(barangay.longitude) },
                    title: barangay.barangay_name,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',  // Blue marker for barangays
                        scaledSize: new google.maps.Size(30, 30),
                    },
                });

                // Handle click event for each barangay marker
                marker.addListener('click', () => {
                    hideCurrentMarkers();
                    centerMap(barangay.latitude, barangay.longitude, 15);
                    selectedBarangayId = barangay.barangay_id;
                    fetchBusinessesForClustering(selectedBarangayId);
                });

                barangayMarkers.push(marker);  // Store barangay markers
                allBarangayMarkers.push(marker);
            });

            // Debug: Check if barangay markers were successfully loaded
            if (barangayMarkers.length > 0) {
                console.log('Barangay markers:', barangayMarkers);
            } else {
                console.warn('No barangay markers found for clustering');
            }

            markerCluster = new markerClusterer.MarkerClusterer({
                map: map,
                markers: barangayMarkers,
            });

            // Initialize MarkerClusterer inside a try-catch block to handle potential errors
            try {
                markerCluster = new MarkerClusterer(map, barangayMarkers, {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                });
                console.log('MarkerClusterer initialized successfully.');
            } catch (error) {
                console.error('Error initializing MarkerClusterer:', error);
            }
        })
        .catch((error) => console.error('Error fetching barangay data:', error));
}

// Center the map on a selected barangay
function centerMap(lat, lng, zoomLevel = 17) {
    const centerCoords = { lat: parseFloat(lat), lng: parseFloat(lng) };
    map.panTo(centerCoords);
    map.setZoom(zoomLevel);
}

function fetchBusinessesForClustering(barangayId = null) {
    let url = '/api/businesses';
    
    if (barangayId && barangayId !== null) {
        url += `?barangayId=${barangayId}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(businesses => {
            console.log("Businesses data:", businesses);

            if (!Array.isArray(businesses)) {
                console.error("Unexpected data format: businesses is not an array", businesses);
                return;
            }

            const businessLocations = businesses.map(business => ({
                lat: parseFloat(business.latitude),
                lng: parseFloat(business.longitude),
                business_name: business.business_name,
                address: business.address,
                subarea_name: business.subarea_name,
                subcategory_name: business.subcategory_name,
                smetype_name: business.smetype_name
            }));

            if (businessLocations.length === 0) {
                console.error("No business locations available for clustering.");
                return;
            }

            // Determine number of clusters
            let numClusters;
            if (businessLocations.length <= 5) {
                numClusters = 1;
            } else if (businessLocations.length <= 20) {
                numClusters = Math.min(3, businessLocations.length);
            } else {
                numClusters = Math.min(10, Math.ceil(businessLocations.length / 5));
            }

            const { clusters } = kMeansClustering(businessLocations, numClusters, 10);

            hideCurrentMarkers();

            clusters.forEach((cluster, index) => {
                console.log(`Cluster ${index + 1}: ${cluster.length} businesses`);

                cluster.forEach((business) => {
                    const marker = new google.maps.Marker({
                        position: { lat: business.lat, lng: business.lng },
                        map: map,
                        title: business.business_name,
                        icon: {
                            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                            scaledSize: new google.maps.Size(20, 20)
                        }
                    });

                    // Define the detailed info window content
                    const infoWindowContent = `
                        <div style="max-width: 200px;">
                            <h5>${business.business_name}</h5>
                            <p><strong>Address:</strong> ${business.address || 'Address not available'}</p>
                            <p><strong>Subarea:</strong> ${business.subarea_name || 'N/A'}</p>
                            <p><strong>Subcategory:</strong> ${business.subcategory_name || 'N/A'}</p>
                            <p><strong>Business Type:</strong> ${business.smetype_name || 'N/A'}</p>
                        </div>
                    `;

                    const infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });

                    currentBusinessMarkers.push(marker);
                });
            });
        })
        .catch(error => console.error('Error fetching businesses for clustering:', error));
}

// Function to implement K-Means clustering in JavaScript
function kMeansClustering(locations, k = 5, iterations = 10) {
    if (locations.length === 0) {
        console.error("No locations provided for clustering.");
        return { centroids: [], clusters: [] };
    }

    let centroids = [];
    let clusters = [];

    // Randomly initialize centroids
    for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * locations.length);
        centroids.push(locations[randomIndex]);
    }

    for (let iter = 0; iter < iterations; iter++) {
        clusters = Array(k).fill(null).map(() => []);

        // Assign each location to the closest centroid
        locations.forEach(location => {
            let closestCentroid = 0;
            let minDistance = calculateDistance(location, centroids[0]);

            for (let i = 1; i < centroids.length; i++) {
                if (centroids[i] === null) continue;

                const distance = calculateDistance(location, centroids[i]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCentroid = i;
                }
            }

            clusters[closestCentroid].push(location);
        });

        // Recalculate centroids
        centroids = clusters.map(cluster => {
            if (cluster.length === 0) return null;

            const avgLat = cluster.reduce((sum, loc) => sum + loc.lat, 0) / cluster.length;
            const avgLng = cluster.reduce((sum, loc) => sum + loc.lng, 0) / cluster.length;

            return { lat: avgLat, lng: avgLng };
        });
    }

    return { centroids, clusters };
}

// Calculate Euclidean distance
function calculateDistance(point1, point2) {
    if (!point2) return Infinity;

    const lat1 = point1.lat, lon1 = point1.lng;
    const lat2 = point2.lat, lon2 = point2.lng;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to clear markers
function hideCurrentMarkers() {
    currentBarangayMarkers.forEach((marker) => marker.setMap(null));
    currentBusinessMarkers.forEach((marker) => marker.setMap(null));
    currentCircles.forEach(circle => circle.setMap(null));  // Clear circles
    currentBarangayMarkers = [];
    currentBusinessMarkers = [];
    currentCircles = [];  // Reset circles array
}

// Function to display K-Means clustering results in the console
function displayClusteringStatus(clusters, centroids) {
    console.log("K-Means Clustering Status:");
    clusters.forEach((cluster, index) => {
        console.log(`Cluster ${index + 1}: ${cluster.length} businesses`);
    });
    centroids.forEach((centroid, index) => {
        if (centroid) {
            console.log(`Centroid ${index + 1}: (${centroid.lat}, ${centroid.lng})`);
        }
    });
}

// Populate barangay dropdown and handle interactions
function populateBarangayDropdown() {
    fetch('/api/barangays')
        .then(response => response.json())
        .then(barangays => {
            const dropdown = document.getElementById('barangay-dropdown');
            const barangayButton = document.querySelector('.dropdown:nth-of-type(1) .dropbtn'); // Barangay button
            const industryButton = document.querySelector('.dropdown:nth-of-type(2) .dropbtn');
            const categoryButton = document.querySelector('.dropdown:nth-of-type(3) .dropbtn');
            dropdown.innerHTML = '';

            barangays.forEach(barangay => {
                const item = document.createElement('a');
                item.href = '#';
                item.textContent = barangay.barangay_name;

                item.onclick = () => {
                    // Set the Barangay button text to the selected barangay name
                    barangayButton.textContent = barangay.barangay_name;

                    // Reset Industry and Business Categories buttons to default
                    industryButton.textContent = defaultIndustryLabel;
                    categoryButton.textContent = defaultCategoryLabel;

                    hideCurrentMarkers();
                    centerMap(barangay.latitude, barangay.longitude, 15);
                    selectedBarangayId = barangay.barangay_id;
                    fetchBusinessesForClustering(selectedBarangayId);
                };

                dropdown.appendChild(item);
            });
        })
        .catch(error => console.error('Error fetching barangay dropdown data:', error));
}


// Center the map on a selected barangay
function centerMap(lat, lng, zoomLevel = 17) {
    const centerCoords = { lat: parseFloat(lat), lng: parseFloat(lng) };
    map.panTo(centerCoords);
    map.setZoom(zoomLevel);
}


// Function to add business markers for a barangay
function addBusinessMarkers(barangayId) {
    // Reset Industry and Business Categories selections when a new barangay is selected
    const industryButton = document.querySelector('.dropdown:nth-of-type(2) .dropbtn');
    const categoryButton = document.querySelector('.dropdown:nth-of-type(3) .dropbtn');
    
    // Reset the button text back to default labels
    industryButton.textContent = defaultIndustryLabel;
    categoryButton.textContent = defaultCategoryLabel;

    // Clear any previous selections or markers related to Industry and Business Categories
    hideCurrentMarkers(); // Clears any existing markers

    // Proceed to add markers for the newly selected barangay
    fetch(`/api/businesses?barangayId=${barangayId}`)
        .then((response) => response.json())
        .then((businesses) => {
            businesses.forEach((business) => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(business.latitude), lng: parseFloat(business.longitude) },
                    map: map,
                    title: business.business_name,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new google.maps.Size(20, 20), // Business marker size
                    },
                });

                const infoWindowContent = `
                    <div style="max-width: 200px;">
                        <h5>${business.business_name}</h5>
                        <p><strong>Address:</strong> ${business.address}</p>
                        <p><strong>Subarea:</strong> ${business.subarea_name}</p>
                        <p><strong>Subcategory:</strong> ${business.subcategory_name}</p>
                        <p><strong>Business Type:</strong> ${business.smetype_name}</p>
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent,
                });

                marker.addListener('click', () => {
                    infoWindows.forEach((info) => info.close()); // Close other info windows
                    infoWindow.open(map, marker);
                });

                currentBusinessMarkers.push(marker);
                infoWindows.push(infoWindow);
            });
        })
        .catch((error) => console.error('Error fetching business data:', error));
}


// Call this when selecting a new barangay to hide the current markers
hideCurrentMarkers();
addBusinessMarkers(selectedBarangayId); // This adds the new markers for the selected barangay

function populateIndustryDropdown() {
    const industryTypes = [
        { id: 1, name: 'Product', markerColor: 'pink-dot.png' },    // Red markers for Products
        { id: 2, name: 'Services', markerColor: 'yellow-dot.png' },   // Blue markers for Services
        { id: 3, name: 'Product & Services', markerColor: 'green-dot.png' }  // Green markers for Product & Services
    ];

    const dropdown = document.getElementById('industry-dropdown');
    const industryButton = document.querySelector('.dropdown:nth-of-type(2) .dropbtn');
    const categoryButton = document.querySelector('.dropdown:nth-of-type(3) .dropbtn'); // Business Categories button

    dropdown.innerHTML = '';

    industryTypes.forEach(industry => {
        const item = document.createElement('a');
        item.href = '#';
        item.innerHTML = `<img src="http://maps.google.com/mapfiles/ms/icons/${industry.markerColor}" alt="${industry.name} icon"> ${industry.name}`;

        item.onclick = () => {
            hideCurrentMarkers();  // Hide currently displayed markers

            // Update the Industry button text and store the last selected value
            lastSelectedIndustry = industry.name;
            industryButton.textContent = lastSelectedIndustry;

            // Reset the Business Categories button back to its default value
            lastSelectedCategory = defaultCategoryLabel;
            categoryButton.textContent = defaultCategoryLabel;

            // Fetch and display businesses based on selected industry
            if (selectedBarangayId) {
                fetchBusinessesByIndustryAndBarangay(industry.id, selectedBarangayId, industry.markerColor);  
            } else {
                fetchBusinessesByIndustry(industry.id, industry.markerColor);
            }
        };
        dropdown.appendChild(item);
    });
}

// Fetch businesses based on the selected industry with marker colors
function fetchBusinessesByIndustry(smeTypeId, markerColor) {
    fetch(`/api/businesses-by-industry?smeTypeId=${smeTypeId}`)
        .then(response => response.json())
        .then(businesses => {
            businesses.forEach(business => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(business.latitude), lng: parseFloat(business.longitude) },
                    map: map,
                    title: business.business_name,
                    icon: {
                        url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}`,
                        scaledSize: new google.maps.Size(20, 20)
                    }
                });

                // Add the address to the info window content
                const infoWindowContent = `
                    <div style="max-width: 200px;">
                        <h5>${business.business_name}</h5>
                        <p><strong>Address:</strong> ${business.address || 'Address not available'}</p> <!-- Add address here -->
                        <p><strong>Subarea:</strong> ${business.subarea_name}</p>
                        <p><strong>Subcategory:</strong> ${business.subcategory_name}</p>
                        <p><strong>Business Type:</strong> ${business.smetype_name}</p>
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('click', () => {
                    infoWindows.forEach(info => info.close()); // Close other info windows
                    infoWindow.open(map, marker);
                });

                currentBusinessMarkers.push(marker);
                infoWindows.push(infoWindow);
            });
        })
        .catch(error => console.error('Error fetching business data by industry:', error));
}


// Fetch businesses based on industry and barangay
function fetchBusinessesByIndustryAndBarangay(smeTypeId, barangayId, markerColor) {
    fetch(`/api/businesses-by-industry-and-barangay?smeTypeId=${smeTypeId}&barangayId=${barangayId}`)
        .then(response => response.json())
        .then(businesses => {
            businesses.forEach(business => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(business.latitude), lng: parseFloat(business.longitude) },
                    map: map,
                    title: business.business_name,
                    icon: {
                        url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}`,
                        scaledSize: new google.maps.Size(20, 20)
                    }
                });

                const infoWindowContent = `
                    <div style="max-width: 200px;">
                        <h5>${business.business_name}</h5>
                        <p><strong>Address:</strong> ${business.address || 'Address not available'}</p> <!-- Add address here -->
                        <p><strong>Subarea:</strong> ${business.subarea_name}</p>
                        <p><strong>Subcategory:</strong> ${business.subcategory_name}</p>
                        <p><strong>Business Type:</strong> ${business.smetype_name}</p>
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('click', () => {
                    infoWindows.forEach(info => info.close()); // Close other info windows
                    infoWindow.open(map, marker);
                });

                currentBusinessMarkers.push(marker);
                infoWindows.push(infoWindow);
            });
        })
        .catch(error => console.error('Error fetching business data by industry and barangay:', error));
}

function populateCategoryDropdown() {
    fetch('/api/categories')
        .then(response => response.json())
        .then(categories => {
            const categoryDropdown = document.getElementById('category-dropdown');
            const categoryButton = document.querySelector('.dropdown:nth-of-type(3) .dropbtn'); // Business Categories button
            const industryButton = document.querySelector('.dropdown:nth-of-type(2) .dropbtn'); // Industry button

            categoryDropdown.innerHTML = ''; // Clear dropdown before appending new items

            categories.forEach(category => {
                let categoryIcon;

                // Define custom image URLs for each category
                switch (category.category_name) {
                    case 'Automotive Services':
                        categoryIcon = '/images/icons/automotive.png';
                        break;
                    case 'Construction and Real Estate':
                        categoryIcon = '/images/icons/construction.png';
                        break;
                    case 'Cooperative Business':
                        categoryIcon = '/images/icons/cooperative.png';
                        break;
                    case 'Creative and Media Service':
                        categoryIcon = '/images/icons/creative_media.png';
                        break;
                    case 'Education Services':
                        categoryIcon = '/images/icons/education.png';
                        break;
                    case 'Entertainment and Recreation':
                        categoryIcon = '/images/icons/entertainment.png';
                        break;
                    case 'Finance and Insurance':
                        categoryIcon = '/images/icons/finance.png';
                        break;
                    case 'Food Services':
                        categoryIcon = '/images/icons/food.png';
                        break;
                    case 'Healthcare Services':
                        categoryIcon = '/images/icons/healthcare.png';
                        break;
                    case 'IT and Digital Services':
                        categoryIcon = '/images/icons/it_digital.png';
                        break;
                    case 'Manufacturing and Production':
                        categoryIcon = '/images/icons/manufacturing.png';
                        break;
                    case 'Personal and Household Services':
                        categoryIcon = '/images/icons/personal_household.png';
                        break;
                    case 'Personal Care Services':
                        categoryIcon = '/images/icons/personal_care.png';
                        break;
                    case 'Professional Services':
                        categoryIcon = '/images/icons/professional.png';
                        break;
                    case 'Retail Stores':
                        categoryIcon = '/images/icons/retail.png';
                        break;
                    case 'Tourism and Hospitality':
                        categoryIcon = '/images/icons/tourism.png';
                        break;
                    case 'Transportation and Logistics':
                        categoryIcon = '/images/icons/transportation.png';
                        break;
                    case 'Wholesale and Distribution':
                        categoryIcon = '/images/icons/wholesale.png';
                        break;
                    default:
                        categoryIcon = 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'; // Fallback default icon
                        break;
                    }

                  // Create category item
                const categoryItem = document.createElement('div');
                categoryItem.className = 'dropdown-item';
                categoryItem.innerHTML = `<img src="${categoryIcon}" alt="Category Marker"> ${category.category_name}`;

                // Create subcategory dropdown container
                const subcategoryDropdown = document.createElement('div');
                subcategoryDropdown.className = 'subcategory-dropdown-content';
                subcategoryDropdown.id = `subcategory-${category.category_id}`;
                subcategoryDropdown.style.display = 'none'; // Initially hide subcategories

                // Check if category has subcategories
                if (category.subcategories.length > 0) {
                    // Add event listener to toggle subcategories
                    categoryItem.onclick = () => {
                        if (subcategoryDropdown.style.display === 'none') {
                            subcategoryDropdown.style.display = 'block'; // Show subcategories
                        } else {
                            subcategoryDropdown.style.display = 'none'; // Hide subcategories
                        }

                        // Store the selected category icon globally
                        selectedCategoryIcon = categoryIcon; 
                    };

                    // Loop over subcategories
                    category.subcategories.forEach(subcategory => {
                        const subcategoryItem = document.createElement('a');
                        subcategoryItem.href = '#';
                        subcategoryItem.textContent = subcategory.subcategory_name;

                        // Enable subcategory click
                        subcategoryItem.onclick = () => {
                            hideCurrentMarkers();  // Hide currently displayed markers

                            // Fetch businesses by category and subcategory, and pass the subcategory name
                            if (selectedBarangayId) {
                                fetchBusinessesByBarangayAndSubcategory(category.category_id, subcategory.subcategory_id, selectedBarangayId, subcategory.subcategory_name);
                            } else {
                                fetchBusinessesBySubcategory(category.category_id, subcategory.subcategory_id);
                            }

                            // Update the button text with the selected subcategory
                            categoryButton.textContent = `${subcategory.subcategory_name}`;
                        };

                        // Append subcategory to the subcategory dropdown
                        subcategoryDropdown.appendChild(subcategoryItem);
                    });
                }

                // Append subcategory dropdown to category item
                categoryItem.appendChild(subcategoryDropdown);
                categoryDropdown.appendChild(categoryItem);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}


// Function to show the toast notification
function showToast(message) {
    const toast = document.getElementById("toast");
    
    // Ensure the toast exists
    if (toast) {
        toast.textContent = message; // Set the message content
        toast.style.display = "block"; // Ensure it's visible
        toast.classList.add("show");

        // Automatically hide the toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("hide");

            // After fading out, remove display
            setTimeout(() => {
                toast.style.display = "none";
                toast.classList.remove("hide");
            }, 500); // Matches the transition duration
        }, 3000); // Display for 3 seconds
    }
}


// Fetch and display business markers filtered by barangay, category, and subcategory
function fetchBusinessesByBarangayAndSubcategory(categoryId, subcategoryId, barangayId, subcategoryName) {
    fetch(`/api/businesses-by-barangay-and-subcategory?categoryId=${categoryId}&subcategoryId=${subcategoryId}&barangayId=${barangayId}`)
        .then(response => response.json())
        .then(businesses => {
            // Check if no businesses are returned
            if (businesses.length === 0) {
                console.log('No businesses found for this subcategory');
                showToast(`NO ${subcategoryName} CREDITED HERE`);
                return; // Exit the function early since no markers will be displayed
            }
            

            // Clear any existing markers
            hideCurrentMarkers();

            // Add business markers for each business found
            businesses.forEach(business => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(business.latitude), lng: parseFloat(business.longitude) },
                    map: map,
                    title: business.business_name,
                    icon: {
                        url: selectedCategoryIcon,  // Use the selected category icon here
                        scaledSize: new google.maps.Size(20, 20)
                    }
                });

                const infoWindowContent = `
                    <div style="max-width: 200px;">
                        <h5>${business.business_name}</h5>
                        <p><strong>Address:</strong> ${business.address || 'Address not available'}</p>
                        <p><strong>Subarea:</strong> ${business.subarea_name}</p>
                        <p><strong>Subcategory:</strong> ${business.subcategory_name}</p>
                        <p><strong>Business Type:</strong> ${business.smetype_name}</p>
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('click', () => {
                    infoWindows.forEach(info => info.close()); // Close other info windows
                    infoWindow.open(map, marker);
                });

                currentBusinessMarkers.push(marker);
                infoWindows.push(infoWindow);
            });
        })
        .catch(error => console.error('Error fetching businesses by subcategory and barangay:', error));
}

function showToast(message) {
    console.log("Showing toast with message:", message); // Debugging line
    const toast = document.getElementById("toast");
    
    if (toast) {
        toast.textContent = message;
        toast.style.display = "block";
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
            toast.classList.add("hide");

            setTimeout(() => {
                toast.style.display = "none";
                toast.classList.remove("hide");
            }, 500);
        }, 3000);
    }
}


// Helper function to get subcategory name based on subcategoryId
function getSubcategoryName(subcategoryId) {
    const subcategoryElement = document.querySelector(`#subcategory-${subcategoryId}`);
    if (subcategoryElement) {
        return subcategoryElement.textContent.trim();
    }
    return "Subcategory"; // Fallback if name not found
}

// Fetch and display business markers filtered by subcategory
function fetchBusinessesBySubcategory(categoryId, subcategoryId) {
    fetch(`/api/businesses-by-subcategory?categoryId=${categoryId}&subcategoryId=${subcategoryId}`)
        .then(response => response.json())
        .then(businesses => {
            businesses.forEach(business => {
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(business.latitude), lng: parseFloat(business.longitude) },
                    map: map,
                    title: business.business_name,
                    icon: {
                        url: selectedCategoryIcon,  // Use the selected category icon here
                        scaledSize: new google.maps.Size(20, 20)
                    }
                });

                // Add the address to the info window content
                const infoWindowContent = `
                    <div style="max-width: 200px;">
                        <h5>${business.business_name}</h5>
                        <p><strong>Address:</strong> ${business.address || 'Address not available'}</p>
                        <p><strong>Subarea:</strong> ${business.subarea_name}</p>
                        <p><strong>Subcategory:</strong> ${business.subcategory_name}</p>
                        <p><strong>Business Type:</strong> ${business.smetype_name}</p>
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                marker.addListener('click', () => {
                    infoWindows.forEach(info => info.close()); // Close other info windows
                    infoWindow.open(map, marker);
                });

                currentBusinessMarkers.push(marker);
                infoWindows.push(infoWindow);
            });
        })
        .catch(error => console.error('Error fetching businesses by subcategory:', error));
}


// Call the function to populate the category dropdown
populateCategoryDropdown();


// Search functionality
document.getElementById('search-input').addEventListener('input', async function () {
    const query = this.value;

    if (query.length > 1) {
        const response = await fetch(`/api/search-businesses?query=${query}`);
        const businesses = await response.json();

        const autocompleteList = document.getElementById('autocomplete-list');
        autocompleteList.innerHTML = '';

        businesses.forEach(business => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'autocomplete-item';
            suggestionItem.textContent = business.business_name;

            suggestionItem.addEventListener('click', function () {
                document.getElementById('search-input').value = business.business_name;
                autocompleteList.innerHTML = '';

                // Store the current map center and zoom level before zooming to the marker
                const previousCenter = map.getCenter();
                const previousZoom = map.getZoom();

                // Create the marker
                const marker = new google.maps.Marker({
                    position: { lat: parseFloat(business.latitude), lng: parseFloat(business.longitude) },
                    map: map,
                    title: business.business_name,
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        scaledSize: new google.maps.Size(20, 20)
                    }
                });

                // Center the map on the marker
                centerMap(business.latitude, business.longitude);

                // Update the info window content to match the format you requested
                const infoWindowContent = `
                    <div style="max-width: 200px;">
                        <h5>${business.business_name}</h5>
                        <p><strong>Address:</strong> ${business.address}</p> <!-- Add address here -->
                        <p><strong>Subarea:</strong> ${business.subarea_name || 'N/A'}</p>
                        <p><strong>Subcategory:</strong> ${business.subcategory_name || 'N/A'}</p>
                        <p><strong>Business Type:</strong> ${business.smetype_name || 'N/A'}</p>
                    </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContent
                });

                // Open the info window
                infoWindow.open(map, marker);

                // Add an event listener to close the info window, remove the marker, and reset search bar
                infoWindow.addListener('closeclick', function () {
                    marker.setMap(null); // Remove marker from the map
                    document.getElementById('search-input').value = ''; // Clear the search input
                    // Reset the map to its previous center and zoom level
                    map.setCenter(previousCenter);
                    map.setZoom(previousZoom);
                });

                // Close the info window when clicking outside the marker
                map.addListener('click', function () {
                    infoWindow.close();
                });
            });

            autocompleteList.appendChild(suggestionItem);
        });
    }
});


// Hide autocomplete suggestions when clicking outside the search bar
document.addEventListener('click', function (event) {
    const searchInput = document.getElementById('search-input');
    const autocompleteList = document.getElementById('autocomplete-list');

    // Check if the click is outside the search input and autocomplete list
    if (!searchInput.contains(event.target) && !autocompleteList.contains(event.target)) {
        autocompleteList.innerHTML = ''; // Clear the suggestions
    }
});

// Prevent hiding suggestions when clicking inside the search bar or the autocomplete list
document.getElementById('search-input').addEventListener('click', function (event) {
    event.stopPropagation();
});

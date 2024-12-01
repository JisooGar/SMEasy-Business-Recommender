const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');
const session = require('express-session');
const csvParser = require('csv-parser'); // For parsing CSV
require('dotenv').config();

const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: true })); // For HTML form submissions
app.use(express.json()); // For JSON payloads

// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Route to serve the admin login page
app.get('/admin/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin', 'admin.html'));
});

// Serve static files for the admin directory
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Admin login POST route
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Replace with your actual admin credentials
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password';

    if (username === adminUsername && password === adminPassword) {
        req.session.isAdmin = true; // Set session for admin
        res.redirect('/admin/dashboard');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Protect admin dashboard
app.get('/admin/dashboard', (req, res) => {
  if (req.session && req.session.isAdmin) {
      res.sendFile(path.join(__dirname, 'admin', 'dashboard', 'dashboard.html')); // Updated path
  } else {
      res.redirect('/admin/login'); // Redirect to login if not authenticated
  }
});


// Admin logout route
app.get('/admin/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Could not log out.');
        }
        res.redirect('/admin/login');
    });
});

// Route for the homepage (front.html inside the frontpage folder)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontpage', 'front.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

console.log('Connecting to PostgreSQL with the following settings:');
console.log('DB_USER:', process.env.DB_USER || 'postgres');
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_DATABASE:', process.env.DB_DATABASE || 'SME');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****' : 'Not Set');
console.log('DB_PORT:', process.env.DB_PORT || 5432);

// PostgreSQL connection setup (with SSL enabled for Render)
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_DATABASE || 'SME',
  password: process.env.DB_PASSWORD || 'LittleStar',
  port: process.env.DB_PORT || 5432,

});

// Check if the connection is working right after setup
pool.connect()
  .then(client => {
    console.log("Connected to the PostgreSQL database successfully.");
    client.release();
  })
  .catch(err => {
    console.error("Failed to connect to the PostgreSQL database:", err.message);
  });


// Utility function to read CSV files
const readCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

// API to get SME data from CSV (for clustering)
app.get('/api/sme-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'SME.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading SME.csv:', err);
    res.status(500).send('Error reading SME.csv');
  }
});

// API to get Market Demand data from CSV
app.get('/api/market-demand-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'MarketDemandData.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading MarketDemandData.csv:', err);
    res.status(500).send('Error reading MarketDemandData.csv');
  }
});

// API to get Barangay data from CSV
app.get('/api/barangay-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'BarangayData.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading BarangayData.csv:', err);
    res.status(500).send('Error reading BarangayData.csv');
  }
});

// API to get Competition data from CSV
app.get('/api/competition-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'CompetitionData.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading CompetitionData.csv:', err);
    res.status(500).send('Error reading CompetitionData.csv');
  }
});

// API to get Transportation data from CSV
app.get('/api/transportation-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'Transportation.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading Transportation.csv:', err);
    res.status(500).send('Error reading Transportation.csv');
  }
});

// API to get Psychographics data from CSV
app.get('/api/psychographics-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'Psychographics.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading Psychographics.csv:', err);
    res.status(500).send('Error reading Psychographics.csv');
  }
});

// API to get Behavioral data from CSV
app.get('/api/behavioral-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'Behavioral.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading Behavioral.csv:', err);
    res.status(500).send('Error reading Behavioral.csv');
  }
});

app.get('/api/population-data', async (req, res) => {
  try {
      const filePath = path.join(__dirname, 'CSV_files', 'BarangayData.csv');
      const data = await readCSVFile(filePath);  // Using readCSVFile to read BarangayData.csv
      
      // If you need to only send population data, you can map the data here
      const populationData = data.map(row => ({
          Barangay: row.Barangay,
          Population: row.Population,
          PopulationDensity: row['Population Density']
      }));
      
      res.json(populationData);
  } catch (err) {
      console.error('Error reading BarangayData.csv:', err);
      res.status(500).send('Error reading BarangayData.csv');
  }
});


// Route to fetch all businesses for clustering
app.get('/api/businesses-for-clustering', async (req, res) => {
  try {
      const { barangayId } = req.query;  // Optional filtering by barangay

      let result;
      if (barangayId) {
          // Fetch businesses within a specific barangay
          result = await pool.query(`
              SELECT b.business_id, b.business_name, b.latitude, b.longitude 
              FROM Business b
              WHERE b.barangay_id = $1
          `, [barangayId]);
      } else {
          // Fetch all businesses
          result = await pool.query(`
              SELECT b.business_id, b.business_name, b.latitude, b.longitude 
              FROM Business b
          `);
      }

      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching businesses for clustering:', err.message);
      res.status(500).send('Server Error');
  }
});

// Route to fetch barangay data
app.get('/api/barangays', async (req, res) => {
  try {
    const result = await pool.query('SELECT barangay_id, barangay_name, latitude, longitude FROM barangay');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route to fetch business data by barangay
app.get('/api/businesses', async (req, res) => {
  try {
      // Parse barangayId as an integer, or set it to null if it's missing or invalid
      const barangayId = req.query.barangayId ? parseInt(req.query.barangayId, 10) : null;

      if (!barangayId) {
          // If no barangayId is provided, return an error response
          return res.status(400).json({ error: 'Barangay ID is required' });
      }

      // Fetch businesses for the provided barangayId
      const result = await pool.query(`
          SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude, 
                 sa.subarea_name, sc.subcategory_name, st.smetype_name
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.barangay_id = $1
      `, [barangayId]);

      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching businesses:', err.message);
      res.status(500).send('Server Error');
  }
});


// Route to search businesses based on input
app.get('/api/search-businesses', async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(`
      SELECT 
          b.business_id, 
          b.business_name, 
          b.address,  
          b.latitude, 
          b.longitude, 
          sa.subarea_name, 
          sc.subcategory_name, 
          st.smetype_name
      FROM Business b
      JOIN Subarea sa ON b.subarea_id = sa.subarea_id
      JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
      JOIN smeType st ON b.smetype_id = st.smetype_id
      WHERE b.business_name ILIKE $1
      LIMIT 10
    `, [`%${query}%`]);
    
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route to fetch businesses based on the selected industry
app.get('/api/businesses-by-industry', async (req, res) => {
  const { smeTypeId } = req.query;
  try {
      const result = await pool.query(`
          SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude, 
                 sa.subarea_name, sc.subcategory_name, st.smetype_name
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.smetype_id = $1
      `, [smeTypeId]);

      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching businesses by industry:', err.message);
      res.status(500).send('Server Error');
  }
});

// Route to fetch businesses based on the selected barangay and industry
app.get('/api/businesses-by-industry-and-barangay', async (req, res) => {
  const { smeTypeId, barangayId } = req.query;
  try {
      const result = await pool.query(`
          SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude,  
                 sa.subarea_name, sc.subcategory_name, st.smetype_name
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.smetype_id = $1 AND b.barangay_id = $2
      `, [smeTypeId, barangayId]);

      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching businesses by industry and barangay:', err.message);
      res.status(500).send('Server Error');
  }
});

// Route to fetch all categories with their subcategories
app.get('/api/categories', async (req, res) => {
  try {
      const categoriesResult = await pool.query(`
          SELECT category_id, category_name FROM Category
      `);

      const categories = categoriesResult.rows;

      // Fetch subcategories for each category
      for (let category of categories) {
          const subcategoriesResult = await pool.query(`
              SELECT subcategory_id, subcategory_name 
              FROM Subcategory 
              WHERE parent_category_id = $1
          `, [category.category_id]);

          category.subcategories = subcategoriesResult.rows;
      }

      res.json(categories);
  } catch (err) {
      console.error('Error fetching categories:', err.message);
      res.status(500).send('Server Error');
  }
});


// Route to fetch businesses based on category and subcategory
app.get('/api/businesses-by-subcategory', async (req, res) => {
  const { categoryId, subcategoryId } = req.query;
  try {
      const result = await pool.query(`
          SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude, 
                 sa.subarea_name, sc.subcategory_name, st.smetype_name
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.category_id = $1 AND b.subcategory_id = $2
      `, [categoryId, subcategoryId]);

      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching businesses by subcategory:', err.message);
      res.status(500).send('Server Error');
  }
});

// Route to fetch businesses based on the selected barangay and subcategory
app.get('/api/businesses-by-barangay-and-subcategory', async (req, res) => {
  const { categoryId, subcategoryId, barangayId } = req.query;
  
  try {
      const result = await pool.query(`
          SELECT 
              b.business_id, 
              b.business_name, 
              b.address,  
              sa.subarea_name, 
              sc.subcategory_name, 
              st.smetype_name, 
              b.latitude, 
              b.longitude
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.category_id = $1 AND b.subcategory_id = $2 AND b.barangay_id = $3
      `, [categoryId, subcategoryId, barangayId]);

      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching businesses by subcategory and barangay:', err.message);
      res.status(500).send('Server Error');
  }
});

// Route to fetch subcategories that have no businesses in the selected barangay
app.get('/api/subcategories-no-businesses', async (req, res) => {
  const { barangayId, categoryId } = req.query;

  try {
    const result = await pool.query(`
      SELECT 
        s.subcategory_id
      FROM Subcategory s
      LEFT JOIN Business b ON s.subcategory_id = b.subcategory_id 
      AND b.barangay_id = $1 AND b.category_id = $2
      WHERE b.business_id IS NULL
    `, [barangayId, categoryId]);

    res.json(result.rows);  // Return subcategories with no businesses
  } catch (err) {
    console.error('Error fetching subcategories with no businesses:', err.message);
    res.status(500).send('Server Error');
  }
});

// Route for the homepage (front.html inside the frontpage folder)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'frontpage', 'front.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

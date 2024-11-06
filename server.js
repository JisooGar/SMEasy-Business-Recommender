const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');
const csvParser = require('csv-parser'); // For parsing CSV

const app = express();

// PostgreSQL connection setup (use environment variables)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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

// API Endpoints

// Example API to get CSV data
app.get('/api/sme-data', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'CSV_files', 'SME.csv');
    const data = await readCSVFile(filePath);
    res.json(data);
  } catch (err) {
    console.error('Error reading SME.csv:', err);
    res.status(500).json({ error: 'Error reading SME.csv', details: err.message });
  }
});

// Route to fetch all businesses for clustering
app.get('/api/businesses-for-clustering', async (req, res) => {
  try {
    const { barangayId } = req.query;

    let result;
    if (barangayId) {
      // Fetch businesses within a specific barangay
      result = await pool.query(
        `SELECT b.business_id, b.business_name, b.latitude, b.longitude FROM Business b WHERE b.barangay_id = $1`,
        [barangayId]
      );
    } else {
      // Fetch all businesses
      result = await pool.query(
        `SELECT b.business_id, b.business_name, b.latitude, b.longitude FROM Business b`
      );
    }

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching businesses for clustering:', err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Route to fetch barangay data
app.get('/api/barangays', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT barangay_id, barangay_name, latitude, longitude FROM barangay'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching barangays:', err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Route to fetch business data by barangay
app.get('/api/businesses', async (req, res) => {
  try {
    const barangayId = req.query.barangayId ? parseInt(req.query.barangayId, 10) : null;

    if (!barangayId) {
      return res.status(400).json({ error: 'Barangay ID is required and must be valid.' });
    }

    const result = await pool.query(
      `
      SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude,
             sa.subarea_name, sc.subcategory_name, st.smetype_name
      FROM Business b
      JOIN Subarea sa ON b.subarea_id = sa.subarea_id
      JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
      JOIN smeType st ON b.smetype_id = st.smetype_id
      WHERE b.barangay_id = $1
    `,
      [barangayId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching businesses:', err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Route to search businesses based on input
app.get('/api/search-businesses', async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(
      `
      SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude,
             sa.subarea_name, sc.subcategory_name, st.smetype_name
      FROM Business b
      JOIN Subarea sa ON b.subarea_id = sa.subarea_id
      JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
      JOIN smeType st ON b.smetype_id = st.smetype_id
      WHERE b.business_name ILIKE $1
      LIMIT 10
    `,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching business data:', err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Route to fetch businesses based on the selected industry and barangay
app.get('/api/businesses-by-industry-and-barangay', async (req, res) => {
  const { smeTypeId, barangayId } = req.query;
  try {
    if (!smeTypeId || !barangayId) {
      return res.status(400).json({ error: 'Both SME Type ID and Barangay ID are required.' });
    }

    const result = await pool.query(
      `
      SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude,
             sa.subarea_name, sc.subcategory_name, st.smetype_name
      FROM Business b
      JOIN Subarea sa ON b.subarea_id = sa.subarea_id
      JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
      JOIN smeType st ON b.smetype_id = st.smetype_id
      WHERE b.smetype_id = $1 AND b.barangay_id = $2
    `,
      [smeTypeId, barangayId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching businesses by industry and barangay:', err.message);
    res.status(500).json({ error: 'Server Error', details: err.message });
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

// Route for the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const fs = require("fs");
const session = require("express-session");
require("dotenv").config();

const app = express();

//-----------------------------ADMIN-----------------------------//

// Middleware to parse request body
app.use(express.urlencoded({ extended: true })); // For HTML form submissions
app.use(express.json()); // For JSON payloads

// Configure session middleware
app.use(
  session({
    secret: "your-secret-key", // Replace with a strong key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Route to serve the admin login page
app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "admin.html"));
});

// Serve static files for the admin directory
app.use("/admin", express.static(path.join(__dirname, "admin")));

// Admin login POST route
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Replace with your actual admin credentials
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "password";

  if (username === adminUsername && password === adminPassword) {
    req.session.isAdmin = true; // Set session for admin
    res.redirect("/admin/dashboard");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Protect admin dashboard
app.get("/admin/dashboard", (req, res) => {
  if (req.session && req.session.isAdmin) {
    res.sendFile(path.join(__dirname, "admin", "dashboard", "dashboard.html")); // Updated path
  } else {
    res.redirect("/admin/login"); // Redirect to login if not authenticated
  }
});

// Admin logout route
app.get("/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/admin/login");
  });
});

app.post("/api/business", async (req, res) => {
  const {
      name,
      address,
      subarea,
      barangay,
      latitude,
      longitude,
      industry,
      category,
      subcategory,
  } = req.body;

  try {
      const query = `
          INSERT INTO Business (
              business_name, 
              address, 
              subarea_id, 
              barangay_id, 
              latitude, 
              longitude, 
              smeType_id, 
              category_id, 
              subcategory_id
          )
          VALUES (
              $1, 
              $2, 
              (SELECT subarea_id FROM Subarea WHERE subarea_name = $3 LIMIT 1), 
              (SELECT barangay_id FROM Barangay WHERE barangay_name = $4 LIMIT 1), 
              $5, 
              $6, 
              (SELECT smeType_id FROM smeType WHERE smetype_name = $7 LIMIT 1), 
              (SELECT category_id FROM Category WHERE category_name = $8 LIMIT 1), 
              (SELECT subcategory_id FROM Subcategory WHERE subcategory_name = $9 LIMIT 1)
          )
          RETURNING *;
      `;

      const values = [
          name,
          address,
          subarea,
          barangay,
          latitude,
          longitude,
          industry,
          category,
          subcategory,
      ];

      const result = await pool.query(query, values);
      res.status(201).json({ message: "Business added successfully!", business: result.rows[0] });
  } catch (error) {
      console.error("Error adding business:", error);
      res.status(500).json({ error: "Failed to add business." });
  }
});

app.put("/api/business/:id", async (req, res) => {
  const { id } = req.params;
  const {
      name,
      address,
      subarea,
      barangay,
      latitude,
      longitude,
      industry,
      category,
      subcategory,
  } = req.body;

  try {
      const query = `
          UPDATE Business
          SET 
              business_name = $1,
              address = $2,
              subarea_id = (SELECT subarea_id FROM Subarea WHERE subarea_name = $3 LIMIT 1),
              barangay_id = (SELECT barangay_id FROM Barangay WHERE barangay_name = $4 LIMIT 1),
              latitude = $5,
              longitude = $6,
              smeType_id = (SELECT smeType_id FROM smeType WHERE smetype_name = $7 LIMIT 1),
              category_id = (SELECT category_id FROM Category WHERE category_name = $8 LIMIT 1),
              subcategory_id = (SELECT subcategory_id FROM Subcategory WHERE subcategory_name = $9 LIMIT 1)
          WHERE business_id = $10
          RETURNING *;
      `;

      const values = [
          name,
          address,
          subarea,
          barangay,
          latitude,
          longitude,
          industry,
          category,
          subcategory,
          id,
      ];

      const result = await pool.query(query, values);

      if (result.rowCount > 0) {
          res.json({ message: "Business updated successfully!", business: result.rows[0] });
      } else {
          res.status(404).json({ error: "Business not found." });
      }
  } catch (error) {
      console.error("Error updating business:", error);
      res.status(500).json({ error: "Failed to update business." });
  }
});


// app.get('/api/business', async (req, res) => {
//   try {
//       const results = await db.query('SELECT * FROM Business');
//       res.status(200).json(results);
//   } catch (error) {
//       console.error("Error fetching businesses:", error);
//       res.status(500).json({ success: false, message: "Failed to fetch businesses." });
//   }
// });

app.get("/api/business/:id", async (req, res) => {
  const { id } = req.params; // Extract the business ID from the request parameters

  try {
    const query = `
      SELECT 
        b.business_id,
        b.business_name,
        b.address,
        br.barangay_name,
        sa.subarea_name,
        b.latitude,
        b.longitude,
        st.smetype_name AS sme_type,
        c.category_name,
        sc.subcategory_name
      FROM Business b
      LEFT JOIN Barangay br ON b.barangay_id = br.barangay_id
      LEFT JOIN Subarea sa ON b.subarea_id = sa.subarea_id
      LEFT JOIN smeType st ON b.smeType_id = st.smeType_id
      LEFT JOIN Category c ON b.category_id = c.category_id
      LEFT JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
      WHERE b.business_id = $1
    `;

    const result = await pool.query(query, [id]);

    if (result.rowCount > 0) {
      res.json(result.rows[0]); // Return the business details
    } else {
      res.status(404).json({ error: "Business not found." });
    }
  } catch (error) {
    console.error("Error fetching business:", error);
    res.status(500).json({ error: "Failed to fetch business details." });
  }
});

// app.delete("/api/business/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//       const query = `DELETE FROM Business WHERE business_id = $1 RETURNING *;`;
//       const result = await pool.query(query, [id]);

//       if (result.rowCount > 0) {
//           res.json({ message: "Business deleted successfully." });
//       } else {
//           res.status(404).json({ error: "Business not found." });
//       }
//   } catch (error) {
//       console.error("Error deleting business:", error);
//       res.status(500).json({ error: "Failed to delete business." });
//   }
// });

// app.put("/api/business/inactive/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//       const query = `UPDATE Business SET status = 'Inactive' WHERE business_id = $1 RETURNING *;`;
//       const result = await pool.query(query, [id]);

//       if (result.rowCount > 0) {
//           res.json({ message: "Business marked as inactive successfully." });
//       } else {
//           res.status(404).json({ error: "Business not found." });
//       }
//   } catch (error) {
//       console.error("Error marking business as inactive:", error);
//       res.status(500).json({ error: "Failed to mark business as inactive." });
//   }
// });

app.put("/api/business/inactive/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const query = `
          UPDATE Business
          SET status = 'Inactive'
          WHERE business_id = $1
          RETURNING *;
      `;
      const result = await pool.query(query, [id]);

      if (result.rowCount > 0) {
          res.json({ message: "Business marked as inactive successfully.", business: result.rows[0] });
      } else {
          res.status(404).json({ error: "Business not found." });
      }
  } catch (error) {
      console.error("Error marking business as inactive:", error);
      res.status(500).json({ error: "Failed to mark business as inactive." });
  }
});


app.put("/api/business/active/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const query = `
          UPDATE Business
          SET status = 'Active'
          WHERE business_id = $1
          RETURNING *;
      `;
      const result = await pool.query(query, [id]);

      if (result.rowCount > 0) {
          res.json({ message: "Business marked as active successfully." });
      } else {
          res.status(404).json({ error: "Business not found." });
      }
  } catch (error) {
      console.error("Error marking business as active:", error);
      res.status(500).json({ error: "Failed to mark business as active." });
  }
});





app.get("/api/activeSME", async (req, res) => {
  try {
    const query = `
          SELECT 
              b.business_id,
              b.business_name,
              b.address,
              br.barangay_name,
              sa.subarea_name,
              b.latitude,
              b.longitude,
              st.smetype_name AS sme_type,
              c.category_name,
              sc.subcategory_name
          FROM Business b
          LEFT JOIN Barangay br ON b.barangay_id = br.barangay_id
          LEFT JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          LEFT JOIN smeType st ON b.smeType_id = st.smeType_id
          LEFT JOIN Category c ON b.category_id = c.category_id
          LEFT JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          WHERE status = 'Active'
          ORDER BY b.business_id ASC;
      `;

    const result = await pool.query(query);
    res.json(result.rows); // Return the data as JSON
  } catch (err) {
    console.error("Error fetching  Active SME data:", err);
    res.status(500).json({ error: "ailed to fetch inactive businesses" });
  }
});

app.get("/api/inactiveSME", async (req, res) => {
  try {
    const query = `
          SELECT 
              b.business_id,
              b.business_name,
              b.address,
              br.barangay_name,
              sa.subarea_name,
              b.latitude,
              b.longitude,
              st.smetype_name AS sme_type,
              c.category_name,
              sc.subcategory_name
          FROM Business b
          LEFT JOIN Barangay br ON b.barangay_id = br.barangay_id
          LEFT JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          LEFT JOIN smeType st ON b.smeType_id = st.smeType_id
          LEFT JOIN Category c ON b.category_id = c.category_id
          LEFT JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          WHERE status = 'Inactive'
          ORDER BY b.business_id ASC;
      `;

    const result = await pool.query(query);
    res.json(result.rows); // Return the data as JSON
  } catch (err) {
    console.error("Error fetching inactive businesses", err);
    res.status(500).json({ error: "ailed to fetch inactive businesses" });
  }
});



app.delete("/api/survey/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const query = `DELETE FROM public.initial_survey WHERE response_id = $1 RETURNING *;`;
      const result = await UserSurveyPool.query(query, [id]); // Ensure you're using the correct pool for the survey DB

      if (result.rowCount > 0) {
          res.json({ message: "Survey deleted successfully.", survey: result.rows[0] });
      } else {
          res.status(404).json({ error: `Survey with ID ${id} not found.` });
      }
  } catch (error) {
      console.error("Error deleting survey:", error.message);
      res.status(500).json({ error: "Failed to delete survey." });
  }
});




//----------------------------FRONT PAGE-----------------------------//

// Route for the homepage (front.html inside the frontpage folder)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "frontpage", "front.html"));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));


//-----------------------------POSTGRE CONNECTION-----------------------------//

console.log("Connecting to PostgreSQL with the following settings:");
console.log("DB_USER:", process.env.DB_USER || "postgres");
console.log("DB_HOST:", process.env.DB_HOST || "localhost");
console.log("DB_DATABASE:", process.env.DB_DATABASE || "SME");
console.log(
  "DB_DATABASE for User_Survey:",
  process.env.USER_SURVEY_DB || "User_Survey"
);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "****" : "Not Set");
console.log("DB_PORT:", process.env.DB_PORT || 5432);

// PostgreSQL connection setup (with SSL enabled for Render)
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "SME",
  password: process.env.DB_PASSWORD || "LittleStar",
  port: process.env.DB_PORT || 5432,

});

// PostgreSQL connection setup for User_Survey
const UserSurveyPool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.USER_SURVEY_DB || "User_Survey",
  password: process.env.DB_PASSWORD || "LittleStar",
  port: process.env.DB_PORT || 5432,

});

// Check if the connection is working right after setup
pool
  .connect()
  .then((client) => {
    console.log("Connected to the PostgreSQL database successfully.");
    client.release();
  })
  .catch((err) => {
    console.error("Failed to connect to the PostgreSQL database:", err.message);
  });

//-----------------------------MAPPING CONNECTIONS-----------------------------//

// Route to fetch all businesses for clustering
app.get("/api/businesses-for-clustering", async (req, res) => {
  try {
    const { barangayId } = req.query; // Optional filtering by barangay

    let result;
    if (barangayId) {
      // Fetch businesses within a specific barangay
      result = await pool.query(
        `
              SELECT b.business_id, b.business_name, b.latitude, b.longitude 
              FROM Business b
              WHERE b.barangay_id = $1
          `,
        [barangayId]
      );
    } else {
      // Fetch all businesses
      result = await pool.query(`
              SELECT b.business_id, b.business_name, b.latitude, b.longitude 
              FROM Business b
          `);
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching businesses for clustering:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch barangay data
app.get("/api/barangays", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT barangay_id, barangay_name, latitude, longitude FROM barangay"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch business data by barangay
app.get("/api/businesses", async (req, res) => {
  try {
    // Parse barangayId as an integer, or set it to null if it's missing or invalid
    const barangayId = req.query.barangayId
      ? parseInt(req.query.barangayId, 10)
      : null;

    if (!barangayId) {
      // If no barangayId is provided, return an error response
      return res.status(400).json({ error: "Barangay ID is required" });
    }

    // Fetch businesses for the provided barangayId
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
    console.error("Error fetching businesses:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to search businesses based on input
app.get("/api/search-businesses", async (req, res) => {
  const { query } = req.query;
  try {
    const result = await pool.query(
      `
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
    `,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch businesses based on the selected industry
app.get("/api/businesses-by-industry", async (req, res) => {
  const { smeTypeId } = req.query;
  try {
    const result = await pool.query(
      `
          SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude, 
                 sa.subarea_name, sc.subcategory_name, st.smetype_name
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.smetype_id = $1
      `,
      [smeTypeId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching businesses by industry:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch businesses based on the selected barangay and industry
app.get("/api/businesses-by-industry-and-barangay", async (req, res) => {
  const { smeTypeId, barangayId } = req.query;
  try {
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
    console.error(
      "Error fetching businesses by industry and barangay:",
      err.message
    );
    res.status(500).send("Server Error");
  }
});

// Route to fetch all categories with their subcategories
app.get("/api/categories", async (req, res) => {
  try {
    const categoriesResult = await pool.query(`
          SELECT category_id, category_name FROM Category
      `);

    const categories = categoriesResult.rows;

    // Fetch subcategories for each category
    for (let category of categories) {
      const subcategoriesResult = await pool.query(
        `
              SELECT subcategory_id, subcategory_name 
              FROM Subcategory 
              WHERE parent_category_id = $1
          `,
        [category.category_id]
      );

      category.subcategories = subcategoriesResult.rows;
    }

    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch businesses based on category and subcategory
app.get("/api/businesses-by-subcategory", async (req, res) => {
  const { categoryId, subcategoryId } = req.query;
  try {
    const result = await pool.query(
      `
          SELECT b.business_id, b.business_name, b.address, b.latitude, b.longitude, 
                 sa.subarea_name, sc.subcategory_name, st.smetype_name
          FROM Business b
          JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          JOIN smeType st ON b.smetype_id = st.smetype_id
          WHERE b.category_id = $1 AND b.subcategory_id = $2
      `,
      [categoryId, subcategoryId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching businesses by subcategory:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch businesses based on the selected barangay and subcategory
app.get("/api/businesses-by-barangay-and-subcategory", async (req, res) => {
  const { categoryId, subcategoryId, barangayId } = req.query;

  try {
    const result = await pool.query(
      `
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
      `,
      [categoryId, subcategoryId, barangayId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(
      "Error fetching businesses by subcategory and barangay:",
      err.message
    );
    res.status(500).send("Server Error");
  }
});

// Route to fetch subcategories that have no businesses in the selected barangay
app.get("/api/subcategories-no-businesses", async (req, res) => {
  const { barangayId, categoryId } = req.query;

  try {
    const result = await pool.query(
      `
      SELECT 
        s.subcategory_id
      FROM Subcategory s
      LEFT JOIN Business b ON s.subcategory_id = b.subcategory_id 
      AND b.barangay_id = $1 AND b.category_id = $2
      WHERE b.business_id IS NULL
    `,
      [barangayId, categoryId]
    );

    res.json(result.rows); // Return subcategories with no businesses
  } catch (err) {
    console.error(
      "Error fetching subcategories with no businesses:",
      err.message
    );
    res.status(500).send("Server Error");
  }
});

app.get("/api/population", async (req, res) => {
  try {
    const query = `
          SELECT 
              CASE 
                  WHEN age BETWEEN 0 AND 5 THEN '0-5'
                  WHEN age BETWEEN 6 AND 12 THEN '6-12'
                  WHEN age BETWEEN 13 AND 17 THEN '13-17'
                  WHEN age BETWEEN 18 AND 35 THEN '18-35'
                  WHEN age BETWEEN 36 AND 50 THEN '36-50'
                  WHEN age BETWEEN 51 AND 65 THEN '50-65'
                  ELSE '66+' 
              END AS age_group,
              COUNT(*) AS population_count
          FROM people -- Replace with your table name
          GROUP BY age_group
          ORDER BY age_group;
      `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});


//-----------------------------ADMIN DASHBOARD-----------------------------//

// API to fetch SME data
app.get("/api/smes", async (req, res) => {
  try {
    const query = `
          SELECT 
              b.business_id,
              b.business_name,
              b.address,
              br.barangay_name,
              sa.subarea_name,
              b.latitude,
              b.longitude,
              st.smetype_name AS sme_type,
              c.category_name,
              sc.subcategory_name
          FROM Business b
          LEFT JOIN Barangay br ON b.barangay_id = br.barangay_id
          LEFT JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          LEFT JOIN smeType st ON b.smeType_id = st.smeType_id
          LEFT JOIN Category c ON b.category_id = c.category_id
          LEFT JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          ORDER BY b.business_id ASC;
      `;

    const result = await pool.query(query);
    res.json(result.rows); // Return the data as JSON
  } catch (err) {
    console.error("Error fetching SME data:", err);
    res.status(500).json({ error: "Failed to fetch SME data" });
  }
});


// Fetch Preferences Data
app.get('/api/preferences', async (req, res) => {
  try {
      const query = `
          SELECT
              response_id AS id,
              month_conducted AS month,
              barangay,
              age_range AS "ageRange",
              gender,
              education,
              employment,
              business_visits AS "businessVisits",
              frequency_visits AS "frequentVisits",
              browsing_behavior AS "browsingBehavior",
              satisfaction_with_businesses AS "satisfaction",
              businesses_lacking AS "lacking",
              shopping_preferences AS "shoppingPreference",
              motivation_for_choosing_businesses AS "motivationForChoosing",
              shopping_traits AS "shoppingTraits",
              factors_for_new_business AS "factorsForNewBusinesses",
              shopping_style AS "shoppingStyle",
              values_supported AS "values",
              transportation_links AS "transportationLinks",
              commercial_accessibility AS "accessibility",
              travel_outside_barangay AS "outsideBarangayTravel",
              transportation_challenges AS "transportationChallenges"
          FROM initial_survey;
      `;
      const result = await UserSurveyPool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching Preferences data:', err);
      res.status(500).json({ error: 'Failed to fetch Preferences data' });
  }
});

// Fetch Market Demands Data
app.get('/api/market-demands', async (req, res) => {
  try {
      const query = `
          SELECT
              response_id AS id,
              barangay,
              automotive_services AS "automotive",
              construction_and_real_estate AS "construction",
              cooperative_business AS "cooperativeBusiness",
              creative_and_media_services AS "creativeMedia",
              educational_services AS "educationServices",
              entertainment_and_recreation AS "entertainment",
              finance_and_insurance AS "financeInsurance",
              food_services AS "foodServices",
              healthcare_services AS "healthcare",
              it_and_digital_services AS "itDigital",
              manufacturing_and_production AS "manufacturing",
              personal_and_household_services AS "personalHousehold",
              personal_care_services AS "personalCare",
              professional_services AS "professionalServices",
              retail_stores AS "retail",
              tourism_and_hospitality AS "tourismHospitality",
              transportation_and_logistics AS "transportation",
              wholesale_and_distribution AS "wholesale"
          FROM initial_survey;
      `;
      const result = await UserSurveyPool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching Market Demands data:', err);
      res.status(500).json({ error: 'Failed to fetch Market Demands data' });
  }
});

// API to search SME data
app.get("/api/smes/search", async (req, res) => {
  try {
    const searchQuery = req.query.q || ""; // Get the search query from the query parameter
    const query = `
          SELECT 
              b.business_id,
              b.business_name,
              b.address,
              br.barangay_name,
              sa.subarea_name,
              b.latitude,
              b.longitude,
              st.smetype_name AS sme_type,
              c.category_name,
              sc.subcategory_name
          FROM Business b
          LEFT JOIN Barangay br ON b.barangay_id = br.barangay_id
          LEFT JOIN Subarea sa ON b.subarea_id = sa.subarea_id
          LEFT JOIN smeType st ON b.smeType_id = st.smeType_id
          LEFT JOIN Category c ON b.category_id = c.category_id
          LEFT JOIN Subcategory sc ON b.subcategory_id = sc.subcategory_id
          WHERE LOWER(b.business_name) LIKE $1 OR CAST(b.business_id AS TEXT) LIKE $1
          ORDER BY b.business_id ASC;
      `;
    const values = [`%${searchQuery.toLowerCase()}%`]; // Use placeholders for search terms
    const result = await pool.query(query, values);
    res.json(result.rows); // Return the filtered data as JSON
  } catch (err) {
    console.error("Error searching SME data:", err);
    res.status(500).json({ error: "Failed to search SME data" });
  }
});


//-----------------------------ANALYSIS DASHBOARD-----------------------------//

// Route to fetch business counts per barangay based on category
app.get("/api/barangay-business-counts", async (req, res) => {
  const { selectedCategory } = req.query;

  try {
    const result = await pool.query(
      `
    SELECT 
    b.barangay_name,
    COUNT(bus.business_id) AS business_count
    FROM 
    Barangay b
    LEFT JOIN 
    Business bus ON b.barangay_id = bus.barangay_id
    LEFT JOIN 
    Category cat ON bus.category_id = cat.category_id
    WHERE 
    cat.category_name = $1
    GROUP BY 
    b.barangay_name
    ORDER BY 
    b.barangay_name;
    `,
      [selectedCategory]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay business counts:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch direct competitors business counts per barangay based on category
app.get("/api/direct-competitors", async (req, res) => {
  const { selectedCategory } = req.query;

  try {
    const directQuery = `
      WITH DirectCompetitors AS (
        SELECT competitor_subcategory_id
        FROM Competitor
        WHERE competitor_type = 'Direct'
        AND category_name = $1
      )
      SELECT br.barangay_name,
             COUNT(b.business_id) AS business_count
      FROM Business b
      JOIN DirectCompetitors dc
      ON b.subcategory_id = dc.competitor_subcategory_id
      JOIN Barangay br
      ON b.barangay_id = br.barangay_id
      GROUP BY br.barangay_name
      ORDER BY br.barangay_name;
    `;

    const result = await pool.query(directQuery, [selectedCategory]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching direct competitors:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch indirect competitors business counts per barangay based on category
app.get("/api/indirect-competitors", async (req, res) => {
  const { selectedCategory } = req.query;

  try {
    const indirectQuery = `
      WITH IndirectCompetitors AS (
        SELECT competitor_subcategory_id
        FROM Competitor
        WHERE competitor_type = 'Indirect'
        AND category_name = $1
      )
      SELECT br.barangay_name,
             COUNT(b.business_id) AS business_count
      FROM Business b
      JOIN IndirectCompetitors dc
      ON b.subcategory_id = dc.competitor_subcategory_id
      JOIN Barangay br
      ON b.barangay_id = br.barangay_id
      GROUP BY br.barangay_name
      ORDER BY br.barangay_name;
    `;

    const result = await pool.query(indirectQuery, [selectedCategory]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching indirect competitors:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch replacement competitors business counts per barangay based on category
app.get("/api/replacement-competitors", async (req, res) => {
  const { selectedCategory } = req.query;

  try {
    const replacementQuery = `
      WITH ReplacementCompetitors AS (
          SELECT competitor_subcategory_id
          FROM Competitor
          WHERE competitor_type = 'Replacement'
          AND category_name = $1
      )
      SELECT br.barangay_name,
             COUNT(b.business_id) AS business_count
      FROM Business b
      JOIN ReplacementCompetitors dc
      ON b.subcategory_id = dc.competitor_subcategory_id
      JOIN Barangay br
      ON b.barangay_id = br.barangay_id
      GROUP BY br.barangay_name
      ORDER BY br.barangay_name;
    `;

    const result = await pool.query(replacementQuery, [selectedCategory]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching replacement competitors:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch barangay_name and area_type
app.get("/api/barangay-area-types", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT barangay_name, area_type
      FROM Barangay;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay area types:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch population density per barangay
app.get("/api/barangay-population-density", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT barangay_name, popDensity
      FROM Barangay;
    `);

    res.json(result.rows); // Send the raw population density data
  } catch (err) {
    console.error("Error fetching barangay population density:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch transportation and accessibility scores per barangay
app.get("/api/barangay-transportation-scores", async (req, res) => {
  try {
    const result = await UserSurveyPool.query(`
      SELECT barangay,
        AVG(transportation_links) * 0.40 + 
        AVG(commercial_accessibility) * 0.40 + 
        AVG(travel_outside_barangay) * 0.20 AS transportation_and_accessibility
      FROM initial_survey
      GROUP BY barangay
      
      ORDER BY barangay;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(
      "Error fetching barangay transportation scores:",
      err.message
    );
    res.status(500).send("Server Error");
  }
});

// Route to fetch average market demand per barangay based on category
app.get("/api/barangay-average-demand", async (req, res) => {
  const { selectedCategory } = req.query;

  // Normalize the selected category
  const normalizedCategory = selectedCategory
    .toLowerCase()
    .replace(/\s+/g, "_");

  try {
    const result = await UserSurveyPool.query(`
      SELECT barangay, AVG(${normalizedCategory}) AS average_demand
      FROM initial_survey
      GROUP BY barangay
      ORDER BY barangay;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay average demand:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch business counts per category based on barangay
app.get("/api/category-business-counts", async (req, res) => {
  const { selectedBarangay } = req.query;

  try {
    const result = await pool.query(
      `
      SELECT 
          c.category_name AS Category,
          COUNT(b.business_id) AS Total_Counts
      FROM 
          Business b
      JOIN 
          Category c ON b.category_id = c.category_id
      JOIN 
          Barangay br ON b.barangay_id = br.barangay_id
      WHERE 
          br.barangay_name = $1 
      GROUP BY 
          c.category_name;
      `,
      [selectedBarangay]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching category business counts:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch direct counts per category based on barangay
app.get("/api/category-direct-competitors", async (req, res) => {
  const { selectedBarangay } = req.query;

  try {
    const directQuery = `
      WITH DirectCompetitors AS (
        SELECT competitor_subcategory_id, category_name
        FROM Competitor
        WHERE competitor_type = 'Direct'
      )
      SELECT dc.category_name,
             COUNT(b.business_id) AS direct_competitor_count
      FROM Business b
      JOIN DirectCompetitors dc
        ON b.subcategory_id = dc.competitor_subcategory_id
      JOIN Barangay br
        ON b.barangay_id = br.barangay_id
      WHERE br.barangay_name = $1  -- This is where the selectedBarangay is passed
      GROUP BY dc.category_name
      ORDER BY dc.category_name;
    `;

    const result = await pool.query(directQuery, [selectedBarangay]); // Pass selectedBarangay as parameter
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching direct competitors:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch idirect counts per category based on barangay
app.get("/api/category-indirect-competitors", async (req, res) => {
  const { selectedBarangay } = req.query;

  try {
    const indirectQuery = `
      WITH IndirectCompetitors AS (
        SELECT competitor_subcategory_id, category_name
        FROM Competitor
        WHERE competitor_type = 'Indirect'
      )
      SELECT dc.category_name,
             COUNT(b.business_id) AS indirect_competitor_count
      FROM Business b
      JOIN IndirectCompetitors dc
        ON b.subcategory_id = dc.competitor_subcategory_id
      JOIN Barangay br
        ON b.barangay_id = br.barangay_id
      WHERE br.barangay_name = $1  -- This is where the selectedBarangay is passed
      GROUP BY dc.category_name
      ORDER BY dc.category_name;
    `;

    const result = await pool.query(indirectQuery, [selectedBarangay]); // Pass selectedBarangay as parameter
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching indirect competitors:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch replacement counts per category based on barangay
app.get("/api/category-replacement-competitors", async (req, res) => {
  const { selectedBarangay } = req.query;

  try {
    const replacementQuery = `
      WITH ReplacementCompetitors AS (
        SELECT competitor_subcategory_id, category_name
        FROM Competitor
        WHERE competitor_type = 'Replacement'
      )
      SELECT dc.category_name,
             COUNT(b.business_id) AS replacement_competitor_count
      FROM Business b
      JOIN ReplacementCompetitors dc
        ON b.subcategory_id = dc.competitor_subcategory_id
      JOIN Barangay br
        ON b.barangay_id = br.barangay_id
      WHERE br.barangay_name = $1  -- This is where the selectedBarangay is passed
      GROUP BY dc.category_name
      ORDER BY dc.category_name;
    `;

    const result = await pool.query(replacementQuery, [selectedBarangay]); // Pass selectedBarangay as parameter
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching replacement competitors:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch average market demand per bcategory based on barangay
app.get("/api/category-average-demand", async (req, res) => {
  const { selectedBarangay } = req.query;

  try {
    const demandQuery = `
    WITH filtered_data AS (
    SELECT * FROM initial_survey
    WHERE barangay = $1
    )
    SELECT 'Automotive Services' AS category_name, AVG(automotive_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Construction and Real Estate' AS category_name, AVG(construction_and_real_estate) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Cooperative Business' AS category_name, AVG(cooperative_business) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Creative and Media Services' AS category_name, AVG(creative_and_media_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Educational Services' AS category_name, AVG(educational_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Entertainment and Recreation' AS category_name, AVG(entertainment_and_recreation) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Finance and Insurance' AS category_name, AVG(finance_and_insurance) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Food Services' AS category_name, AVG(food_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Healthcare Services' AS category_name, AVG(healthcare_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'IT and Digital Services' AS category_name, AVG(it_and_digital_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Manufacturing and Production' AS category_name, AVG(manufacturing_and_production) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Personal and Household Services' AS category_name, AVG(personal_and_household_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Personal Care Services' AS category_name, AVG(personal_care_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Professional Services' AS category_name, AVG(professional_services) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Retail Stores' AS category_name, AVG(retail_stores) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Tourism and Hospitality' AS category_name, AVG(tourism_and_hospitality) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Transportation and Logistics' AS category_name, AVG(transportation_and_logistics) AS average_demand
    FROM filtered_data
    UNION ALL
    SELECT 'Wholesale and Distribution' AS category_name, AVG(wholesale_and_distribution) AS average_demand
    FROM filtered_data
    ORDER BY category_name;
    `;
    const result = await UserSurveyPool.query(demandQuery, [selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching category average demand:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch population density per barangay
app.get("/api/barangay-population", async (req, res) => {
  try {
    const { selectedBarangay } = req.query; // Get the selectedBarangay from query
    const populationQuery = `
      SELECT population
      FROM Barangay
      WHERE barangay_name = $1;
    `;
    // Execute the query
    const result = await pool.query(populationQuery, [selectedBarangay]);
    // Send the population data as a JSON response
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching barangay population:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch population data for age ranges per barangay
app.get("/api/barangay-age-range", async (req, res) => {
  try {
    const { selectedBarangay } = req.query; // Get the selectedBarangay from query

    const ageQuery = `
      SELECT 
        p.Children_0to5 AS "0-5",
        p.Children_6to12 AS "6-12",
        p.Children_13to17 AS "13-17",
        p.Children_18to35 AS "18-35",
        p.Adult_36to50 AS "36-50",
        p.Adult_51to65 AS "51-65",
        p.Adult_66above AS "66+"
      FROM Barangay b
      JOIN Population p ON b.barangay_id = p.barangay_id
      WHERE b.barangay_name = $1;
    `;

    // Execute the query
    const result = await pool.query(ageQuery, [selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay population:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch transpo challenges per barangay
app.get("/api/transportation-challenges", async (req, res) => {
  try {
    const { selectedBarangay } = req.query; // Get the selectedBarangay from query

    const transpoQuery = `
      WITH SplitChallenges AS (
    -- Split the comma-separated transportation challenges and associate them with the barangay
    SELECT unnest(string_to_array(transportation_challenges, ',')) AS challenge,
           barangay
    FROM initial_survey
    WHERE barangay = $1  -- Pass the selectedBarangay as a parameter
),
CountChallenges AS (
    -- Count how many times each challenge appears
    SELECT challenge, COUNT(*) AS challenge_count
    FROM SplitChallenges
    GROUP BY challenge
),
MaxCount AS (
    -- Find the maximum count of occurrences of a challenge
    SELECT MAX(challenge_count) AS max_count
    FROM CountChallenges
)
SELECT string_agg(challenge, ', ' ORDER BY challenge) AS challenges
FROM CountChallenges
WHERE challenge_count = (SELECT max_count FROM MaxCount);
    `;

    // Execute the query
    const result = await UserSurveyPool.query(transpoQuery, [selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay transpo challenges:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch competitor business counts per barangay and category
app.get("/api/competitor-names", async (req, res) => {
  const { selectedCategory, selectedBarangay } = req.query;

  try {
    const queryCompetitors = `
          WITH FilteredCompetitors AS (
        SELECT 
            c.competitor_type, 
            c.competitor_name, 
            c.competitor_subcategory_id
        FROM Competitor c
        WHERE c.category_name = $1
    ),
    FilteredBusinesses AS (
        SELECT 
            b.subcategory_id
        FROM Business b
        INNER JOIN Barangay br ON b.barangay_id = br.barangay_id
        WHERE br.barangay_name = $2
    ),
    CompetitorBusinessCounts AS (
        SELECT 
            fc.competitor_type,
            STRING_AGG(fc.competitor_name, ', ') AS competitor_names
        FROM FilteredCompetitors fc
        WHERE fc.competitor_subcategory_id IN (SELECT subcategory_id FROM FilteredBusinesses)
        GROUP BY fc.competitor_type
    ),
    AllCompetitorTypes AS (
        SELECT DISTINCT competitor_type
        FROM Competitor
    ),
    FinalResult AS (
        SELECT 
            act.competitor_type,
            COALESCE(cbc.competitor_names, 'None') AS competitor_names
        FROM AllCompetitorTypes act
        LEFT JOIN CompetitorBusinessCounts cbc ON act.competitor_type = cbc.competitor_type
    )
    SELECT 
        competitor_type, 
        competitor_names
    FROM FinalResult;
    `;

    const result = await pool.query(queryCompetitors, [selectedCategory, selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching competitor business counts:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch psychographic per barangau
app.get("/api/psychographic", async (req, res) => {
  const { selectedBarangay } = req.query;
  try {
    const queryPsychographic = `
    SELECT 
    barangay, 
    age_range, 
    motivation_for_choosing_businesses, 
    shopping_traits, 
    factors_for_new_business, 
    shopping_style, 
    values_supported
    FROM 
        initial_survey
    WHERE 
    barangay = $1; -- Replace with the selected barangay
    `;
    const result = await UserSurveyPool.query(queryPsychographic, [selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching competitor business counts:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch behavior per barangay
app.get("/api/behavior", async (req, res) => {
  const { selectedBarangay } = req.query;
  try {
    const queryBehavior = `
    SELECT 
    barangay, 
    age_range, 
    business_visits, 
    frequency_visits, 
    browsing_behavior, 
    shopping_preferences
    FROM 
        initial_survey
    WHERE 
        barangay = $1; 

    `;
    const result = await UserSurveyPool.query(queryBehavior, [selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching competitor business counts:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch area type and counts  per barangay
app.get("/api/area-type", async (req, res) => {
  try {
    const { selectedBarangay } = req.query; // Get the selectedBarangay from query
    const areaCountQuery = `
      SELECT 
    s.subarea_name AS Subarea,
    s.subarea_type AS SubareaType, 
    c.category_name AS Category,
    COALESCE(COUNT(b.business_id), 0) AS BusinessCount
FROM 
    Subarea s
CROSS JOIN 
    Category c -- Ensures all categories are included for every subarea
LEFT JOIN 
    Business b ON s.subarea_id = b.subarea_id AND b.category_id = c.category_id
WHERE 
    s.barangay_id = (SELECT barangay_id FROM Barangay WHERE barangay_name = $1)
GROUP BY 
    s.subarea_name, s.subarea_type, c.category_name 
ORDER BY 
    s.subarea_name, c.category_name;
    `;
    // Execute the query
    const result = await pool.query(areaCountQuery, [selectedBarangay]);
    // Send the population data as a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay population:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch subcategory business counts per barangay and category
app.get("/api/subcategory-counts", async (req, res) => {
  const { selectedCategory, selectedBarangay } = req.query;

  try {
    const querySubcategory = `
    SELECT 
    s.subcategory_name,
    COALESCE(COUNT(b.business_id), 0) AS business_count
    FROM 
        Subcategory s
    LEFT JOIN 
        Category c ON s.parent_category_id = c.category_id
    LEFT JOIN 
        Business b ON s.subcategory_id = b.subcategory_id
        AND b.barangay_id = (SELECT barangay_id FROM Barangay WHERE barangay_name = $2 LIMIT 1)
    WHERE 
        c.category_name = $1
    GROUP BY 
        s.subcategory_name
    ORDER BY 
        s.subcategory_name;   
    `;

    const result = await pool.query(querySubcategory, [selectedCategory, selectedBarangay]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching competitor business counts:", err.message);
    res.status(500).send("Server Error");
  }
});



//-----------------------------VISUALIZATION-----------------------------//

// Route to  counts  per barangay
app.get("/api/barangay-counts", async (req, res) => {
  try {
    const { selectedCategory } = req.query; // Get the selectedBarangay from query
    const barangayCountQuery = `
    SELECT 
        b.barangay_name,
        COUNT(CASE WHEN c.category_name = $1 OR $1 = 'All' THEN bus.business_id END) AS business_count
    FROM 
        Barangay b
    LEFT JOIN 
        Business bus ON b.barangay_id = bus.barangay_id
    LEFT JOIN 
        Category c ON bus.category_id = c.category_id
    GROUP BY 
        b.barangay_name
    ORDER BY 
        b.barangay_name;
    `;
    // Execute the query
    const result = await pool.query(barangayCountQuery, [selectedCategory]);
    // Send the population data as a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay population:", err.message);
    res.status(500).send("Server Error");
  }
});


// Route to subcategory counts based on selected category
app.get("/api/businesssubcategory-counts", async (req, res) => {
  try {
    const { selectedCategory } = req.query; // Get the selectedBarangay from query
    const subCountQuery = `
SELECT 
    s.subcategory_name AS subcategory,
    COUNT(b.business_id) AS counts
FROM 
    Category c
JOIN 
    Subcategory s ON c.category_id = s.parent_category_id
LEFT JOIN 
    Business b ON s.subcategory_id = b.subcategory_id
WHERE 
    c.category_name = $1  
GROUP BY 
    s.subcategory_name
ORDER BY 
    counts DESC;
    `;
    // Execute the query
    const result = await pool.query(subCountQuery, [selectedCategory]);
    // Send the population data as a JSON response
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay population:", err.message);
    res.status(500).send("Server Error");
  }
});

// Route to fetch population density per barangay
app.get("/api/population-barangay", async (req, res) => {
  try {
    const result = await pool.query(`
SELECT 
    b.barangay_name AS Barangay,
    b.population AS Population
FROM 
    Barangay b
ORDER BY 
    b.barangay_name;
    `);

    res.json(result.rows); // Send the raw population density data
  } catch (err) {
    console.error("Error fetching barangay population density:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get("/api/barangay-average-demand1", async (req, res) => {
  const { selectedCategory } = req.query;

  // Normalize the selected category
  const normalizedCategory = selectedCategory
    .toLowerCase()
    .replace(/\s+/g, "_");

  console.log("Normalized Category:", normalizedCategory); // Debugging

  try {
    let query = `
      SELECT barangay, AVG(${normalizedCategory}) AS average_demand
      FROM initial_survey
    `;

    // Add condition to query only if a specific category is selected
    if (normalizedCategory !== "all") {
      query += ` WHERE ${normalizedCategory} IS NOT NULL`; // Adjust for valid categories
    }

    query += `
      GROUP BY barangay
      ORDER BY barangay;
    `;

    console.log("Final SQL Query:", query); // Debugging

    const result = await UserSurveyPool.query(query);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching barangay average demand:", err.message);
    res.status(500).send("Server Error");
  }
});



//-----------------------------POP UP SURVEY-----------------------------//
// Helper function to map text responses to numeric values
function mapResponseValue(response) {
  const mapping = {
      "Strongly Disagree": 1,
      "Disagree": 2,
      "Agree": 3,
      "Strongly Agree": 4
  };
  return mapping[response] || null; // Return null if the response is undefined or invalid
}

// Survey submission endpoint
app.post('/submit-survey', async (req, res) => {
  try {
      console.log('Request Body:', req.body);

      // Test the database connection before doing anything else
      const testQuery = await UserSurveyPool.query('SELECT 1');
      console.log('Database Connected:', testQuery.rows);

      // Destructure request body
      const {
          monthConducted, ageRange, gender, education, employment, barangay,
          businessVisits, frequencyVisits, browsingBehavior, satisfactionWithBusinesses,
          businessesLacking, shoppingPreferences, motivationForChoosingBusinesses, shoppingTraits,
          factorsForNewBusiness, shoppingStyle, valuesSupported, transportationLinks,
          commercialAccessibility, travelOutsideBarangay, transportationChallenges,
          automotiveServices, constructionAndRealEstate, cooperativeBusiness, creativeAndMediaServices,
          educationalServices, entertainmentAndRecreation, financeAndInsurance, foodServices,
          healthcareServices, itAndDigitalServices, manufacturingAndProduction, personalAndHouseholdServices,
          personalCareServices, professionalServices, retailStores, tourismAndHospitality,
          transportationAndLogistics, wholesaleAndDistribution
      } = req.body;

      if (!monthConducted || !ageRange || !gender || !education || !employment || !barangay) {
          console.error('Validation failed. Missing required fields:', {
              monthConducted, ageRange, gender, education, employment, barangay
          });
          return res.status(400).send({
              error: 'Missing required fields: monthConducted, ageRange, gender, education, employment, barangay are all required.',
          });
      }

      // Prepare SQL query and values
      const query = `
          INSERT INTO public.initial_survey (
              month_conducted, age_range, gender, education, employment, barangay,
              business_visits, frequency_visits, browsing_behavior, satisfaction_with_businesses,
              businesses_lacking, shopping_preferences, motivation_for_choosing_businesses, shopping_traits,
              factors_for_new_business, shopping_style, values_supported, transportation_links,
              commercial_accessibility, travel_outside_barangay, transportation_challenges,
              automotive_services, construction_and_real_estate, cooperative_business,
              creative_and_media_services, educational_services, entertainment_and_recreation,
              finance_and_insurance, food_services, healthcare_services, it_and_digital_services,
              manufacturing_and_production, personal_and_household_services, personal_care_services,
              professional_services, retail_stores, tourism_and_hospitality,
              transportation_and_logistics, wholesale_and_distribution
          ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
              $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34,
              $35, $36, $37, $38, $39
          );
      `;

      const values = [
          monthConducted,
          ageRange,
          gender,
          education,
          employment,
          barangay,
          businessVisits,
          frequencyVisits,
          browsingBehavior,
          satisfactionWithBusinesses,
          businessesLacking,
          shoppingPreferences,
          motivationForChoosingBusinesses,
          shoppingTraits,
          factorsForNewBusiness,
          shoppingStyle,
          valuesSupported,
          transportationLinks,
          commercialAccessibility,
          travelOutsideBarangay,
          transportationChallenges,
          automotiveServices,
          constructionAndRealEstate,
          cooperativeBusiness,
          creativeAndMediaServices,
          educationalServices,
          entertainmentAndRecreation,
          financeAndInsurance,
          foodServices,
          healthcareServices,
          itAndDigitalServices,
          manufacturingAndProduction,
          personalAndHouseholdServices,
          personalCareServices,
          professionalServices,
          retailStores,
          tourismAndHospitality,
          transportationAndLogistics,
          wholesaleAndDistribution
      ];

      console.log('Mapped values:', {
        satisfactionWithBusinesses: mapResponseValue(satisfactionWithBusinesses),
        businessesLacking: mapResponseValue(businessesLacking),
        transportationLinks: mapResponseValue(transportationLinks),
        commercialAccessibility: mapResponseValue(commercialAccessibility),
        travelOutsideBarangay: mapResponseValue(travelOutsideBarangay),
        automotiveServices: mapResponseValue(automotiveServices),
        constructionAndRealEstate: mapResponseValue(constructionAndRealEstate),
    });

      // Log the SQL query and its values
      console.log('SQL Query:', query);
      console.log('Query Values:', values);

      // Execute the query
      const result = await UserSurveyPool.query(query, values); // tama na pala
      console.log('Database Insertion Result:', result);

      res.status(200).send({ message: 'Survey data successfully submitted' });
  } catch (error) {
      // Log the error details
      console.error('Error inserting data:', error.message, error.stack);
      res.status(500).send({ error: 'Failed to insert data into the database' });
  }
});


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

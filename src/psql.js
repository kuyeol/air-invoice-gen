



const express = require("express");

const { Pool } = require('pg');

require('dotenv').config();

const app = express();
app.use(express.json());


const pool = new Pool({
  connectionString: "postgres://default:WkmUZ3YfwJs9@ep-autumn-cherry-a43x07kj-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})

// pool.query("SELECT NOW()", (err, res) => {
//   console.log(err, res);
//   pool.end();
// });


pool.query("SELECT * FROM pets", (err, res) => {
  console.log(err, res);
  pool.end();
});

pool.post("https://localhost:3000/api/post", async (req, res) => {
  const { name, owner } = req.body;
  try {
    const result = await pool.query("INSERT INTO pets (name, owner) VALUES ($1, $2) RETURNING *", [ name,owner,]
      
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("https://localhost:3000/api/list", async (req, res) => {
  try {
    const result = await pool.query("SELECT name FROM pets ORDER BY owner DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
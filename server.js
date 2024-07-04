const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',    
    host: 'localhost',
    database: 'webmap',        
    password: 'Trevor',
    port: 5432,
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get location data
app.get('/api/locations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

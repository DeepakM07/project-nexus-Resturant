const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Resturant',
    password: 'deepak28',
    port: 5432,
});

// Routes
app.get('/', (_req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (_req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/signup', (_req, res) => {
    res.sendFile(__dirname + '/views/Signup.html');
});

app.post('/login', async (req, res) => {
    // Implement login logic
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    
    if (result.rows.length > 0) {
        res.send('Login successful.');
    } else {
        res.send('Invalid credentials. Please try again.');
    }
});

app.post('/signup', async (req, res) => {
    // Implement signup logic
    const { username, password } = req.body;
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password]);
    
    res.send('Signup successful.');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

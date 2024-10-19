// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../db');
// const logger = require('../middleware/logger');

// const router = express.Router();


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.use(logger);


router.use(express.json());






// ENDPOINTS
// FOR REGISTRATION : https://localhost:3000/api/registration
// FOR LOGIN : https://localhost:3000/api/login



//DB STRUCTURE 
//       USERS
//          |--- USERNAME
//          |--- EMAIL ID 
///         |--- PASSWORD



//       PROFILE
//          |-- USERNAME
//          |-- EMAIL ID 
//          |-- WPM 
//          |-- TASKS DONE 



//      TASKS
//          |-- TIME TAKEN
//          |-- NO. OF WORDS 


// Registration route
router.post('/registration', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'Registration successful', userId: newUser.rows[0].id });
    } catch (error) {
        console.error('Error during registration', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});







// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;

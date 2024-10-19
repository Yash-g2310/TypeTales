const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const bodyParser = require('body-parser');
const logger = require('../middleware/logger');

const router = express.Router();
router.use(logger)
const app = express();
const port =  3000 ; 



app.use(bodyParser.json());


//change localhost with my ipv4 server 
//ENDPOINTS
// UPDATING USERNAME:   https://localhost:3000/api/user-upd
// UPDATING EMAIL:  https://localhost:3000/api/email-upd
// UPDATING PHONE NUMBER : https://localhost:3000/api/ph-post
// UPDATING WPM : https://localhost:3000/api/wpm-upd
// FETCHING USERNAME : https://localhost:3000/api/userid
// FETCHING EMAIL ID : https://localhost:3000/api/emailid
// FETCHING WPM : https://localhost:3000/api/wpm-get
// FETCHING PHONE NUMBER : https://localhost:3000/api/ph-get





//ADDING FULL NAME 
app.post('/full-name', async(req,res)=>{
        const{ email , full_name } = req.body;
        if(!email || !full_name){
            return res.status(400).json({message:   'Both Full Name and email are required '})
        }
        try{
            const result = await pool.query(
                'UPDATE users SET full_name = $1 WHERE email = $2 RETURNING *',
                [full_name, email]
            );
        }
})



//UPDATE PHONE NUMBER IN PROFILE 
app.post('/ph-post', async(req,res)=>{
    const{email, phone_no } = req.body; 
    try { 
        const result = await pool.query(
                'UPDATE profile SET wpm = $1 WHERE email = $2 RETURNING *',
                [phone_no , email]
        );
        if(result.rows.length>0){
            res.status(200).json({
                message:    'Phone Number updated successfully',
                profile:    result.rows[0]
            });

        }
        else {
            res.status(404).json({message : 'Profile not found'});
        }
    }
    catch(error){
        console.error(error); 
        return res.status(500).json({message:   'Error occured'});
    }
});











//UPDATE WPM IN PROFILE 
app.post('/wpm-upd', async(req,res)=>{
    const { email, wpm }= req.body ; 
    try { 
        const result = await pool.query(
            'UPDATE profile SET phone_no = $1 WHERE email = $2 RETURNING *',
            [email , wpm]
        )
        if(result.rows.length > 0 ){
            res.status(200).json({
                message: 'WPM updated successfully', 
                profile: result.rows[0]
            })
        }
        else {
            res.status(404).json({message: 'Profile not found'}) ; 
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:  'Error occured'}) ; 
    }
});






//UPDATE USERNAME
app.post('/user-upd', async(req, res) => { 
    const { email , newUser } = res.body 
    if(!email || !newUser){
        return res.status(400).json({message:  'Enter both new Username and Email'});
    }
    try {
            const existingUser = await pool.query( 
                'SELECT * FROM users WHERE username = $1',
                [newUser]
            );
            if(existingUser.rows.length > 0 ) {
                return res.status(409).json({message:   'Username already in use!'}); 
            }
            const result = await pool.query(
                'UPDATE users SET username = $1 WHERE email = $2 RETURNING *',
                [newUser, email]
            ); 
            if(result.rows.length > 0 ) { 
                return res.status(200).json({
                    message: 'Username updated successfully', 
                    user: result.rows[0]
                });
            }
            else { 
                res.status(404).json({message: 'User does not exist'}); 
            }

    }
    catch (error){
        console.error(error);
        res.status(500).json({message:  'Internal error'});
    }
});








//UPDATE EMAIL ID 
app.post('/email-upd', async(req, res) => { 
    const { email , newEmail } = res.body 
    if(!email || !newEmail){
        return res.status(400).json({message:  'Enter both new Email and old Email'});
    }
    try {
            const existingEmail = await pool.query( 
                'SELECT * FROM users WHERE email = $1',
                [newEmail]
            );
            if(existingEmail.rows.length > 0 ) {
                return res.status(409).json({message:   'Email already in use!'}); 
            }
            const result = await pool.query(
                'UPDATE users SET email = $1 WHERE email = $2 RETURNING *',
                [newEmail, email]
            ); 
            if(result.rows.length > 0 ) { 
                return res.status(200).json({
                    message: 'Email updated successfully', 
                    email: result.rows[0]
                });
            }
            else { 
                res.status(404).json({message: 'User does not exist'}); 
            }

    }
    catch (error){
        console.error(error);
        res.status(500).json({message:  'Internal error'});
    }
});






//GET THE PROFILE DETAILS


//USERNAME
app.get('/userid', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }
    try {
        const result = await pool.query(
            'SELECT username FROM profile WHERE email = $1',
            [email]
        );
        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'User retrieved successfully',
                username: result.rows[0].username
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Error'
        });
    }
}); 


//EMAIL 
app.get('/emailid', async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ message: 'Username required' });
    }
    try {
        const result = await pool.query(
            'SELECT email FROM profile WHERE username = $1',
            [username]
        );
        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'User retrieved successfully',
                username: result.rows[0].email
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Error'
        });
    }
}); 






//WPM 
app.get('/wpm-get', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }
    try {
        const result = await pool.query(
            'SELECT wpm FROM profile WHERE email = $1',
            [email]
        );
        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'WPM retrieved successfully',
                username: result.rows[0].wpm
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Error'
        });
    }
}); 





//PHONE NUMBER
app.get('/ph-get', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email required' });
    }
    try {
        const result = await pool.query(
            'SELECT phone_no FROM profile WHERE email = $1',
            [email]
        );
        if (result.rows.length > 0) {
            res.status(200).json({
                message: 'Phone Number retrieved successfully',
                username: result.rows[0].phone_no
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal Error'
        });
    }
}); 








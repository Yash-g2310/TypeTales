const express = require('express');
const pool = require('./db');
const loginRouter = require('./routes/login'); 

const app = express();
app.use(express.json()); 
app.use('/api', loginRouter); 



pool.connect()
    .then(()=>{
        console.log(`Database connected successfully`);
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    })
    .catch(err =>{
        console.error('Database connection error: ', error);
    })

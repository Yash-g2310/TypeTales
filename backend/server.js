const express = require('express');
const loginRouter = require('./routes/login'); // Adjust path if needed

const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', loginRouter); // Use the login router

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

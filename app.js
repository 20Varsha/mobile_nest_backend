const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const routes = require('./src/route/index'); 
const seedData = require('./src/seed/admin');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Seed the database with admins
seedData();

// Use the routes
app.use('/api/v1', routes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./src/route/index');
const errorHandler = require('./utils/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1', routes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const dotenv = require('dotenv');
const currency = require('./routes/currency_routes');
const controllers = require('./controllers/currency_controller');
const connectDB = require('./db')

// Load env variables
dotenv.config({ path: './back_end_config.env' });

//connect DB
connectDB();

const app = express();

app.use(express.json());

// Mount routes
app.use('/api', currency);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${PORT}`));


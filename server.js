const express = require('express');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
const currency = require('./routes/currency_routes');
const controllers = require('./controllers/currency_controller');
const { response } = require('express');

// Load env variables
dotenv.config({ path: './back_end_config.env' });

const app = express();

app.use(express.json());

const breeds = controllers.getBreeds()
  .then(response => {
    if (response) {
      schedule.scheduleJob('*/23 * * *', function () {
        const breeds = controllers.getBreeds()
          .then(response => {
            if (response) {
            }
          })
          .catch(error => {
            console.log(error)
          })
      });
    }
  })
  .catch(error => {
    console.log(error.Error)
  })

// Mount routes
app.use('/', currency);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${PORT}`));


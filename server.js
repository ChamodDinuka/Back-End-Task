const express = require('express');
const dotenv = require('dotenv');
const schedule = require('node-schedule');
const currency = require('./routes/currency_routes');
const controllers = require('./controllers/currency_controller')

// Load env variables
dotenv.config({path:'./back_end_config.env'});

const app = express();

app.use(express.json());

const breeds = controllers.getBreeds()
    .then(response => {
      if (response) {
        schedule.scheduleJob('*/23 * * *', function(){
            console.log('The answer to life, the universe, and everything!');
            const breeds = controllers.getBreeds()
              .then(response => {
                if (response) {
                  //console.log(response.data)
                }
              })
              .catch(error => {
                console.log(error)
              })
          });
        //console.log(response.data)
      }
    })
    .catch(error => {
      console.log(error)
    })

// Mount routes
app.use('/',currency);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${PORT}`));


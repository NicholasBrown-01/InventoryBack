'use strict';

// *** BRING IN ALL CONST (Express/Cors) & REQUIRE (env/data)***
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
let vehicledata = require('./data/inventorydata.json');


// *** SET PORT AND CONSOLE LOG ***
const PORT = process.env.PORT || 3002;
app.listen(PORT, ()=> console.log(`!! Server Running on PORT ${PORT} !!`));


// *** SET UP THE GETS/POSTS/UPDATES/DELETES/CATCH ALL ***
app.get('/', (req, res) => {
  res.status(200).send('Server is running NORMALLY');
});

app.get('/vehicles', (req, res, next) => {
  try {
    let queriedYear = req.query.year;
    let foundYear = vehicledata.find(vehicle => vehicle.year === queriedYear);
    res.status(200).send(foundYear);

  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) =>{
  res.status(404).send('This route does not exist');
});


// *** CORS ERROR HANDLING ***
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

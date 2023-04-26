'use strict';

// *** BRING IN ALL CONST (Express/Cors) & REQUIRE (env/data/mongoose)*** //
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
// let vehicledata = require('./data/inventorydata.json');
const mongoose = require('mongoose');
const VehicleModel = require('./models/vehiclemodel.js');

// *** APP.USES ***
// Middleware & JSON!
app.use(cors());
app.use(express.json());


// *** SET PORT/LISTEN AND CONSOLE LOG *** //
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`!! Server Running on PORT ${PORT} !!`));

// *** CONNECT MONGO-DB & MONGOOSE *** //
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


// *** SET UP THE GETS/POSTS/UPDATES/DELETES/CATCH ALL *** //
app.get('/', (req, res) => {
  res.status(200).send('Server is running NORMALLY');
});

// app.get('/vehicles', (req, res, next) => {
//   try {
//     let queriedYear = req.query.year;
//     let foundYear = vehicledata.filter(vehicle => vehicle.year === queriedYear);
//     res.status(200).send(foundYear);

//   } catch (error) {
//     next(error);
//   }
// });

app.get('/vehicles', getVehicles);

async function getVehicles(req, res, next) {
  try {
    let allVehicles = await VehicleModel.find({});
    res.status(200).send(allVehicles);

  } catch (error) {
    next(error);
  }
}

app.post('/modifyvehicle', postVehicle);

async function postVehicle(req, res, next) {
  try {
    let postedVehicle = await VehicleModel.create(req.body);
    res.status(201).send(postedVehicle);
    console.log(`Vehicle ${postedVehicle} was added successfully`);
  } catch (error) {
    next(error);
  }
}

app.delete('/vehicles/:vehicleID', deleteVehicle);

async function deleteVehicle(req, res, next) {
  try {
    let id = req.params.vehicleID;
    await VehicleModel.findByIdAndDelete(id);
    res.status(200).send('Vehicle Deleted');
    console.log(`The Following Vehicle was deleted:${id}`);

  } catch (error) {
    next(error);
  }
}

app.put('/vehicles/:vehicleID', updateVehicle);

async function updateVehicle(req, res, next) {
  try {
    let id = req.params.vehicleID;
    let vehicleModelData = req.body;

    const updated = await VehicleModel.findByIdAndUpdate (id, vehicleModelData, {new: true, overwrite: true });
    res.status(200).send(updated);
    console.log(`Vehicle ${id} was updated to ${updated}`);

  } catch (error){
    next (error);
  }
}


app.get('*', (req, res) => {
  res.status(404).send('This route does not exist');
});


// *** CORS ERROR HANDLING *** //
app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).send(error.message);
});

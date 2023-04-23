'use strict';

// *** BRING IN MONGOOSE/ENV/MODELS *** //
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URL);
const vehiclemodel = require('./models/vehiclemodel.js');


// *** SET UP FUNCTION FOR SEED DATA *** //
async function seed() {

  await vehiclemodel.create({
    year: '2023',
    make: 'Toyota',
    model: 'Highlander',
    notes: 'Fantastic SUV'
  });

  console.log('Vehicle 1 was created!');

  await vehiclemodel.create({
    year: '2023',
    make: 'Honda',
    model: 'Civic',
    notes: 'An amazing little car'
  });

  console.log('Vehicle 2 was created!');

  await vehiclemodel.create({
    year: '2022',
    make: 'Lexus',
    model: 'Q38',
    notes: 'Too Expensive'
  });

  console.log('Vehicle 3 was created!');

  mongoose.disconnect();
}

seed();

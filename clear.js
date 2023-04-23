
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Vehicle = require('./models/vehiclemodel');

async function clear() {
  try {
    await Vehicle.deleteMany({});
    console.log('Vehicles cleared from DB');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();

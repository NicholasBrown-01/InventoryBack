'use strict';

// *** BRING IN MONGOOSE AND MONGOOSE SCHEMA FOR MONGOOSE "DOCUMENTS" *** //
const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  notes: { type: String, required: false }
});

const Vehicle = mongoose.model('vehicle', vehicleSchema);

module.exports = Vehicle;

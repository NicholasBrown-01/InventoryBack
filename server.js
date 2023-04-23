'use strict';

const express = require('express');
const appexpress = express();
require('dotenv').config();

const PORT = process.env.PORT || 3002;

appexpress.listen(PORT, ()=> console.log(`!! Server Running on PORT ${PORT} !!`));

appexpress.get('/', (req, res) => {
  res.status(200).send('Server is running NORMALLY');
});

appexpress.get('*', (req, res) =>{
  res.status(404).send('This route does not exist');
});

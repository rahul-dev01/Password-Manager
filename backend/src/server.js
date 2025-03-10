const express = require('express');
require('dotenv').config(); 
require('./db/connect')
const cors = require("cors")

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env[`${NODE_ENV}_PORT`]

const server = express();
server.use(cors())

server.listen(PORT, () => {
  console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`)
});

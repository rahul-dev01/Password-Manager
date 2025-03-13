const express = require('express');
require('dotenv').config(); 
require("./db/connection")
const cors = require("cors")
const V1Router =  require("./routes/v1/v1Router")

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env[`${NODE_ENV}_PORT`]

const server = express();
server.use(cors())

server.use(express.json());  

server.use("/api/v1" , V1Router)

server.listen(PORT, () => {
  console.log(`${NODE_ENV} Server is started on PORT - ${PORT}`)
});

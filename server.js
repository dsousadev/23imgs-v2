const sharp = require('sharp');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compress = require('compression');
const app = express();
const server_port = 8080;
// const server_ip_address = 'localhost';
const server_ip_address = '0.0.0.0';


// Mongo setup > then router setup
const mongoose = require('mongoose');
const login = process.env.DATABASE_URL;
const db = mongoose.createConnection(login, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongo connected');
  app.use(require('./router.img.js'));
});

//middleware 
app.use(compression());
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.listen(
  server_port,
  server_ip_address,
  console.log('Listening on ' + server_ip_address + ', port ' + server_port)
);

module.exports = db;

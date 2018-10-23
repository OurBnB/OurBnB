// server.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/properties', function(req,res){ // allows front end access to all of our properties for search etc
  db.any(`SELECT *
          FROM property`)
    .then(function(data){
      res.json(data)
    })
    .catch(function(error){
      res.json({error:error.message})
    })
})

app.get('/api/properties/:city', function(req,res){ // allows front end access to all of our properties for search etc
  const city = req.params.city
  db.any(`SELECT *
          FROM property WHERE city=$1`, [city])
    .then(function(data){
      res.json(data)
    })
    .catch(function(error){
      res.json({error:error.message})
    })
})

app.listen(8080, function(){
  console.log('Listening on port 8080');
});

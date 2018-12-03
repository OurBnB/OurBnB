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
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  return res.render('index');
});
app.get('/api/properties', function(req,res){ // allows front end access to all of our properties for search etc
  db.any(`SELECT * FROM property`)
    .then(function(data){
      return res.json(data)
    })
    .catch(function(error){
      return res.json({error:error.message})
    })
});
app.get('/api/properties/:city', function(req,res){ // allows front end access to all of our properties for search etc
  const city = req.params.city
  db.any(`SELECT * FROM property WHERE city=$1`, [city])
    .then(function(data){
      return res.json(data)
    })
    .catch(function(error){
      return res.json({error:error.message})
    })
});

//retrieves the existing guest's details
app.post("/api/guestOld", (req, res) => {
  const { guestOld } = req.body;
  db.one(
    `select * from guest where email=$1 and password=$2`,
    [guestOld.emailOld, guestOld.passwordOld]
  )
    .then(data => res.json(data))
    .catch(error => res.json({ error: error.message }));
});

//adds a new guest to the database
app.post("/api/guest", (req, res) => {
  const { guest } = req.body;
  bcrypt.hash(guest.password, saltRounds)
      .then(function(hash) {
          return db.one(
              "INSERT INTO guest (email, password, first_name, last_name, telephone, hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
              [guest.email, guest.password, guest.first_name, guest.last_name, guest.telephone, hash]
          )
        })
      .then(result => {
        return res.json({ id: result.id, first_name: guest.first_name, last_name: guest.last_name, telephone: guest.telephone, password: guest.password, email: guest.email});        })
      .catch(error => res.json({ error: error.message }));
});

// add a single booking to bookings table
app.post("/api/booking", (req, res) =>{
  const bookingData  = req.body;
  db.one(`INSERT INTO booking
  (property_id, guest_id, date_booked, date_start, date_end)
  VALUES($1, $2, NOW(), $3, $4 ) RETURNING id`,
  [bookingData.property_id, bookingData.guest_id, bookingData.date_start, bookingData.date_end ])
  .then(booking => {
    const json = { id: booking.id, first_name: bookingData.first_name };
    sendSMS(booking.id, bookingData.first_name, bookingData.telephone, bookingData.password);
    return res.json(json);
  })
  .catch(error => res.json({ error: error.message }));
});

function sendSMS(booking_id, first_name, telephone, password) {
  const accountSid = process.env.TWILIO_SID_LIVE
  const authToken = process.env.TWILIO_AUTH_LIVE;
  const twilio = require('twilio');
  const client = new twilio(accountSid, authToken);
  const baseUrl = 'https://ourbnb.herokuapp.com';
  client.messages.create({
      body: `Dear ${first_name}, thank you for your booking and details. 
      Your booking ID is ${booking_id}. To view your booking details, 
      please visit ${baseUrl} and login with your email address and password: ${password}. Many thanks!`,
      to: telephone,
      from: '+447446494074'
  })
  .then((message) => console.log(message.sid));
}

const port = process.env.PORT || 8080;
app.listen( port, function(){
  console.log(`Listening on port number ${port}`);
});
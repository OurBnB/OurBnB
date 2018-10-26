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
  console.log({guestOld}, 'guestOld');
  db.one(
    `select * from guest where email=$1 and password=$2`,
    [guestOld.emailOld, guestOld.passwordOld]
  )
    .then(data => {res.json(data); console.log(data, 'data')})
    .catch(error => res.json({ error: error.message }));
});

//adds a new guest to the database
app.post("/api/guest", (req, res) => {
  const { guest } = req.body;

  //console.log({guest}, "guest new");
  bcrypt.hash(guest.password, saltRounds)
      .then(function(hash) {
          console.log(hash);
          console.log(guest.password);
          return db.one(
              "INSERT INTO guest (email, password, first_name, last_name, telephone, hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
              [guest.email, guest.password, guest.firstName, guest.lastName, guest.mobile, hash]
          )
        })
      .then(result => {
        return res.json({ id: result.id, first_name: guest.firstName, last_name: guest.lastName, telephone: guest.mobile, password: guest.password, email: guest.email});        })
      .catch(error => res.json({ error: error.message }));
});

// add a single booking to bookings table
app.post('/api/booking', (req, res) =>{
  const { bookingData } = req.body;
  console.log(req.body, 'req.body')
  db.one(`INSERT INTO booking
  (property_id, guest_id, date_booked, date_start, date_end)
  VALUES($1, $2, clock_timestamp(), $3, $4 ) RETURNING id`,
  [bookingData.property_id, bookingData.guest_id, bookingData.date_start, bookingData.date_end ])
  .then(booking => {
    const booking_id = booking.id;
    const {bookingData} = req.body;
    const json = { id: booking_id, name: bookingData.name};
    // SMS below works, commented out only for testing period.
    sendSMS(booking_id, bookingData.name, bookingData.telephone);
    return res.json(json)
  })
  .catch(error => res.json({ error: error.message }));
});"guest"

function sendSMS(booking_id, name, telephone) {
  const accountSid = process.env.TWILIO_SID_LIVE
  const authToken = process.env.TWILIO_AUTH_LIVE;
  const twilio = require('twilio');
  const client = new twilio(accountSid, authToken);
  const baseUrl = 'www.heroku.com';
  // To view your order details, please visit ${baseUrl}/?viewBookingId=${booking_id}
  client.messages.create({
      body: `Dear ${name}, thank you for your booking. Your ID is ${booking_id}.`,
      to: telephone,
      from: '+447446494074'
  })
  .then((message) => console.log(message.sid));
}

app.listen(8080, function(){
  console.log('Listening on port 8080');
});

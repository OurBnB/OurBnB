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
    `select id, telephone from guest where email=$1 and password=$2`,
    [guestOld.emailOld, guestOld.passwordOld]
  )
    .then(data => {res.json(data); console.log(data, 'data')})
    .catch(error => res.json({ error: error.message }));
});

//adds a new guest to the database
app.post("/api/guest", (req, res) => {
  const { guest } = req.body;
  console.log({guest}, "guest new");
  db.one(
    "INSERT INTO guest (email, password, name, telephone) VALUES ($1, $2, $3, $4) RETURNING id",
    [
      guest.email,
      guest.password,
      guest.name,
      guest.mobile
    ]
  )
    .then(result => {
      return res.json({ id: result.id, mobile: guest.mobile });
    })
    .catch(error => res.json({ error: error.message }));
});

// add a single booking to bookings table
app.post('/api/booking', (req, res) =>{
  const { property_id, guest_id, date_booked, date_start, date_end, name, telephone, email } = req.body;
  db.one(`INSERT INTO booking 
  (property_id, guest_id, date_booked, date_start, date_end, name, telephone, email) 
  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
  [property_id, guest_id, date_booked, date_start, date_end, name, telephone, email])
  .then(booking => {
    const booking_id = booking.id;
    const json = { booking_id, property_id, guest_id, date_booked, date_start, date_end, name, telephone, email };
    sendSMS(booking_id, name, telephone);
    return res.json(json)
  })
  .catch(error => res.json({ error: error.message }));
});

function sendSMS(booking_id, name, telephone) {
  const accountSid = process.env.TWILIO_SID_LIVE
  const authToken = process.env.TWILIO_AUTH_LIVE;
  const twilio = require('twilio');
  const client = new twilio(accountSid, authToken);
  const baseUrl = 'www.heroku.com';
  client.messages.create({
      body: `Dear ${name}, thank you for your order. Your ID is ${booking_id}. 
      To view your order details, please visit ${baseUrl}/?viewBookingId=${booking_id}`,
      to: telephone,
      from: '+447446494074'
  })
  .then((message) => console.log(message.sid));
}

app.listen(8080, function(){
  console.log('Listening on port 8080');
});

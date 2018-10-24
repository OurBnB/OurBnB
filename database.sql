create database ourbnb;

create table guest (
  id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(50) not null unique,
  telephone varchar(20) not null unique,
  password varchar(15) not null
);

create table host (
  id serial primary key,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  email varchar(50) not null unique,
  telephone varchar(20) not null unique,
  password varchar(15) not null
);

create table property (
  id serial primary key,
  host_id int,
  address_l1 varchar(50) not null,
  address_l2 varchar(50),
  city varchar(50) not null,
  country varchar(50) not null,
  postcode varchar(20),
  price_per_night numeric(5,2) not null,
  image_1 varchar(50) not null,
  image_2 varchar(50),
  image_3 varchar(50),
  image_4 varchar(50),
  image_5 varchar(50),
  bedrooms smallint not null,
  can_sleep smallint not null,
  bathrooms smallint not null,
  description text,
  parking boolean,
  accessiblity varchar(100),
  pets varchar(100),
  smoking boolean,
  check_in_time time with time zone,
  check_out_time time with time zone,
  foreign key (host_id) references host(id)
);

create table booking (
  id serial primary key,
  property_id int,
  guest_id int,
  date_booked timestamp with time zone not null,
  date_start date not null,
  date_end date not null,
  foreign key (guest_id) references guest (id),
  foreign key (property_id) references property (id)
);

create table guest_review (
  id serial primary key,
  property_id int,
  guest_id int,
  host_id int,
  rating smallint check(rating<=5) not null,
  review text,
  foreign key (guest_id) references guest (id),
  foreign key (property_id) references property (id),
  foreign key (host_id) references host (id)
);

create table property_review (
  id serial primary key,
  property_id int,
  guest_id int,
  rating smallint check(rating<=5) not null,
  review text,
  foreign key (guest_id) references guest (id),
  foreign key (property_id) references property (id)
);

insert into guest (id, first_name, last_name, email, telephone, password) values (1, 'John', 'Doe', 'john.doe@whatever.com', '07777777777', 'Tiger23');
insert into guest (id, first_name, last_name, email, telephone, password) values (2, 'Jane', 'Doe', 'jane.doe@whatever.com', '07888888888', 'RayMe6');
insert into guest (id, first_name, last_name, email, telephone, password) values (3, 'Harry', 'Potter', 'harry.potter@whatever.com', '07899999999', 'Hogwarts');
alter sequence guest_id_seq restart with 4 increment by 1;

insert into host (id, first_name, last_name, email, telephone, password) values (1, 'Mary', 'Poppins', 'mary.poppins@whatever.com', '07777124864', 'Children');
insert into host (id, first_name, last_name, email, telephone, password) values (2, 'Luke', 'Skywalker', 'luke.skywalker@whatever.com', '07545454545', 'StarWars');
insert into host (id, first_name, last_name, email, telephone, password) values (3, 'Hannibal', 'Lecter', 'hannibal.lecter@whatever.com', '07666666666', 'Silence');
alter sequence guest_id_seq restart with 4 increment by 1;

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  1, 1, '377 Whitechapel Road', 'Whitechapel', 'London', 'UK', 'E1 1BU', 300,
  'image_1_1.png', 'image_1_2.png', 'image_1_3.png', 'image_1_4.png', 'image_1_5.png',
  5, 10, 3, 'Located in the heart of vibrant Whitechapel our beautiful Victorian home has 4 double bedrooms plus a very large kids bedroom. An excellent central location for visiting all the sights and just a short walk to the tube, Spitalfields Market and Shoreditch.

Immerse yourself in the heart of vibrant Whitechapel with a rich blend of cultures, creatives and artists. There is a deep sense of history here where you can feel part of one of the last truly authentic areas left in Central London while being in one of the worlds most creative and engaged districts.

Built in 1900 and set in a conservation area, our Victorian house offers you a piece of this authentic history in which to call home while you visit this great city! The house is 2400sqft and spread over 4 floors. You will have the use of 4 double bedrooms and 1 large kids room that sleeps 2 children (or 2 adults). The master bedroom has its own ensuite bathroom and dressing area. The large main bathroom has a roll top bath to relax in after exploring the city and separate walk in shower for ease in the mornings. There is also an extra separate WC on the first floor. The living room and dining room are the heart of the house with a large dining table which is perfect for dinners and the beautiful bespoke kitchen with stainless steel work surface is great if you love cooking! Feel free to get inspired by our collection of cook books!

We have lovingly designed and finished our home from head-to-toe whilst keeping original Victorian features throughout. We also offer free superfast Wi-Fi (up to 75Mb) and the free use of 1000s of on demand movies if you ever need a relaxing night in!

The ground floor of the house has an open plan feel and comprises of living room with couch, antique day bed, armchair, coffee table, fireplace and record player. The dining room has a large dining table which seats up to 10 people, an antique dresser, Cinni fan and fireplace. We can provide a high chair if needed. Our bespoke kitchen is spacious with a professional stainless steal worktop, Neff hob and cooker, fridge, freezer, dishwasher, washing machine, microwave, kettle, coffee makers, bread maker and everything else you need to live and cook in comfort.

There is also an outdoor seating area where you can sit and have a quiet coffee in the mornings and read the paper!

On the first floor there is a very large bathroom with stunning cast iron roll top bath, separate stand up shower and toilet. Guests have the use of beautiful Cowshed products that are 100% natural and made in England. We also have a second separate toilet beside this room.

The first bedroom and second bedroom are just a couple of steps up from here. The first bedroom is 200sqft, has a very comfortable kingsized bed with 300 thread count Egyptian cotton sheets, 100% eco wool Swedish blanket, bedside tables and lamps, fresh towels, hair dryer, wardrobe, full length mirror, armchair, fireplace and a 42inch TV. If you have a baby under 2 years we can provide a cot with fresh linen in this room free of charge. The second bedroom is 120sqft. It has a very comfortable double bed with 300 thread count Egyptian cotton sheets, 100% eco wool Swedish blanket, bedside cabinets and lamps, fresh towels, hair dryer, wardrobe, mirror and fireplace.

On the second floor you will find the master bedroom which covers the whole of this floor. The bedroom has a beautiful antique King size bed, fireplace, 42" TV, dressing area and ensuite bathroom with shower, toilet and Belfast sink.

You will find the four and fifth bedrooms on the top floor of the house, it is very quiet and peaceful up there. The fifth bedroom is 120sqft and also has a very comfortable double bed with 300 thread count Egyptian cotton sheets, bedside cabinet and lamp, fresh towels, hair dryer, wardrobe and our favourite feature of the house an original victorian stove that the nanny would have used to warm the milk for the children in Victorian times! The kids room (the 4th bedroom) is 200sqft and sleeps 2. It has a very comfortable bunk bed that is perfect for adults also. The room is filled with plenty of toys and books for girls & boys!

I will provide you a guide of the area with tips about our favourite places in Whitechapel/Shoreditch from the best Indian restaurants to the best pub to go to for a proper English Sunday roast!

You also have the use of free superfast Wi-Fi (up to 75Mb), an iron, ironing board, washing machine and dryer.

When you arrive you will be greeted, shown around and given 3 sets of keys for your stay. If you should need anything or have any questions before, during or after your stay we are always on hand!');

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  2, 1, '5 Raphael Street', 'Knightsbridge', 'London', 'UK', 'SW7 1DL', 130,
  'image_2_1.png', 'image_2_2.png', 'image_2_3.png', 'image_2_4.png', 'image_2_5.png',
  1, 12, 1, 'Self contained flat in an exclusive residential street, in the heart of Knightsbridge.  Perfectly centrally located and close to world-class museums (the Victoria & Albert is 5 minutes door to door), shopping, dining and sightseeing (just a few tube stops from most key attractions).  A home from home - comfortable, clean, peaceful and furnished with a mix of contemporary and vintage furniture. Consisting of a double bedroom with new, good quality bed, separate sitting room, kitchen and bathroom.!');


insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  3, 2, '42 Kennington Park Road', 'Kennington', 'London', 'UK', 'SE11 4RS', 175,
  'image_3_1.png', 'image_3_2.png', 'image_3_3.png', 'image_3_4.png', 'image_3_5.png',
  2, 8, 1, 'Relax with a glass of wine as the afternoon sun streams across the roof terrace. The airy interior is arranged over three levels, with plenty of room for families. Designed by a well-known name in fashion, the apartment oozes style throughout.');

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  4, 2, '45-47 Clerkenwell Road', 'Clerkenwell', 'London', 'UK', 'EC1M 5RS', 175,
  'image_4_1.png', 'image_4_2.png', 'image_4_3.png', 'image_4_4.png', 'image_4_5.png',
  2, 7, 2, 'Spacious 2-bed, 2-bath Clerkenwell flat occupying the third and fourth of a converted jewellery workshop.

The flat is an exceptionally spacious 2-bedroom, 2 bathroom ( (Phone number hidden by Airbnb) ) warehouse conversion located conveniently off the historic Hatton Garden diamond district in Clerkenwell.

This is still our primary residence for most of the year, so the place will be clean and tidy, but don’t mind some belongings.

Finally, please note that there will NOT be a cat in the property during your stay.

Exclusive use of the entire flat during your stay.

Other things to note

- There is no TV but WiFi for streaming content on personal devices
- The master bedroom and reception are equipped with Sonos speakers connected to a Spotify account
- The flat is located on the third and fourth floors of a building with no elevator (but the open plan top floor reception is worth the walk!)');

insert into property (
  id, host_id, address_l1, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  5, 3, '20 W 34th Street', 'New York', 'USA', 'NY 10001', 100,
  'image_5_1.png', 'image_5_2.png', 'image_5_3.png', 'image_5_4.png', 'image_5_5.png',
  1, 5, 1, 'WELCOME TO THE CITY THAT NEVER SLEEPS!

Cozy and quiet private apartment with kitchen.
This apartment is located in the center of Manhattan near Empire State Building, Times Square (15 Minutes by Walk) with almost every major tourist destinations reachable via major public transportation including subways and buses, as well as car service and NYC taxi. You will be in the most prime location of New York City.

The space

This apartment has 2 full size beds in bedroom, Full bathroom and kitchen.
A sofa bed is available in the living area for 5th person.

Guest access

* Free WI-FI is provided.
The information can be found on the back of the door on a poster along with other information.
* We provide a towel per person. (Towel exchange is available in the office. Please bring the used one down to the office to get a fresh one during office hour )
* The window mounted air conditioner is installed during summer season.
* The heating is running by central system on Winter season
* Laundromat is located on the ground floor. It’s running with Laundry Card.
If you wish to use it, you cna get a card at the office with refundable deposit of $10. ( Pay per use )
* Iron and Iron Board will be provided in advance request.

Interaction with guests

The apartment management office is located in the same building lobby.
If necessary, guests can visit and get help.
The building has an elevator and 24/7 doorman.');

insert into property (
  id, host_id, address_l1,  city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  6, 2, '151 W 34th Street', 'New York', 'USA', 'NY 10001', 184,
  'image_6_1.png', 'image_6_2.png', 'image_6_3.png', 'image_6_4.png', 'image_6_5.png',
  3, 8, 1, 'As a family man it is our pleasure to share our home when we travel. We have a Beautifully renovated 3 Bedroom Penthouse in the heart of Murray Hill! We are in the center of it all! Our loft offers lots of space & privacy. 3 Large separate bedrooms with a Huge Living area & Separate dining area. Large new Stainless Steel kitchen & Brand Marble Bathrooms. Surrounded by restaurants, shopping, culture & entertainment. easy walking distance to Bryant Park, Grand Central! Our area, has it all.

The space

The apartment includes:
- Brand new, modern furniture
The living Area is easily used as a 4th private sleeping area, separate from the rest of the home.

-The 3 Large Bedroom have their own large Queen Size Bed with plush new bedding & mattress.

- Brand new kitchen including stainless steel dish washer, New Electric Stove.
-All new White cabinetry & custom Marble Counters.

**Kitchen is ready for all your cooking needs with pots, pans, utensils, cutting board, Knife Block.
- Bedrooms include brand new mattresses, bedding and sheets
-2 Brand new flat-screen LED TVs, equipped with lots of channels and high-speed WiFi internet access

-Air Conditioning in the apartment.
- Extras included such as hair dryer, and iron and ironing board
- Professional cleaning service before every stay
- Lotsof clean linens, towels, pillows, etc provided!

Every room has been redesigned to make the best use of the immense space. This includes fine comfortable bedding, plenty of thick towels, and a fully- stocked kitchen for your cooking pleasures, with new Dishwasher, Stove, & Refrigerator. Access to Internet wifi, cable TV, & lots more. Basically everything you will need to enjoy your stay.');

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  7, 2, '152 Driggs Avenue', 'Brooklyn', 'New York', 'USA', 'NY 11222', 138,
  'image_7_1.png', 'image_7_2.png', 'image_7_3.png', 'image_7_4.png', 'image_7_5.png',
  3, 6, 2, 'Enjoy this three bedroom apartment in the heart of Greenpoint! In one of the most popular areas of Brooklyn. Experience the NY life walking distance to some of the towns tourist attractions.All the best shopping, restaurants, bars and music venues Brooklyn has to offer.

The space

Relax in this bright three bedroom apartment. Newly remodeled for you to enjoy!The apartment includes everything for a comfortable stay and will always be cleaned to the highest standard when guests arrive. Bed linens, towels, coffee machine, tea kettle, hair dryer and iron are all available.

Guest access

You have full access to the entire apartment!

Interaction with guests

Please feel free to contact me or my assistant - we are available 24hrs.');

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  8, 3, '73 MacLeay Street', 'Potts Point', 'Sydney', 'Australia', 'NSW 2011', 144,
  'image_8_1.png', 'image_8_2.png', 'image_8_3.png', 'image_8_4.png', 'image_8_5.png',
  2, 4, 1, 'Wake up and have breakfast with the views of Sydney city skyline in this stylish newly renovated Luxe 2-bedroom apartment.

More information
The space

The apartment is surrounded with a myriad of restaurants, bars and cafes at your doorstep and is only minutes from Kings Cross train station, for access to the cities main shopping precinct and the CBD. This apartment is in the perfect location for your stay in Sydney.

Features include;
- Sunny balcony with stunning city views
- Brand new kitchen and appliances
- Brand new bathroom
- Internal laundry with washer & dryer
- Air Conditioning in lounge and bedrooms
- Common rooftop BBQ area with spectacular harbour and city views & communal
pool
- Located all within a secure building with intercom access
- gym, cafe and hairdresser conveniently located directly under the building
- 10 mins walk to Rushcutters Bay Park or Woolloomooloo');

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  9, 3, '224 Harris Street', 'Pyrmont', 'Sydney', 'Australia', 'NSW 2009', 200,
  'image_9_1.png', 'image_9_2.png', 'image_9_3.png', 'image_9_4.png', 'image_9_5.png',
  3, 6, 2, 'Glamourous Three Bedroom in Quiet Tree-lined Street

Simply beautiful, this property is a newly rebuilt three bedroom terrace with massive amounts of space. Ideal for your trip to Sydney with lounge and kitchen opening to a beautiful alfresco area. All this plus three large bedrooms hidden behind a modest single storey facade, this massive two storey property will excite you.

The space

Located in a quiet tree-lined street, moments from the star casino, darling harbour, fish markets and the cosmopolitan Pyrmont cafe strip and shopping hub. This house is equipped with:
- State of the art kitchen appliances
- BBQ
- Cable TV
- Wifi
- 2 Queen and 2 Single Beds
- Back patio area and bedroom balcony
- Private entrance!');

insert into property (
  id, host_id, address_l1, address_l2, city, country, postcode, price_per_night,
  image_1, image_2, image_3, image_4, image_5,
  bedrooms, can_sleep, bathrooms, description) values (
  10, 2, '19 Kent Street', 'The Rocks', 'Sydney', 'Australia', 'NSW 2000', 147,
  'image_10_1.png', 'image_10_2.png', 'image_10_3.png', 'image_10_4.png', 'image_10_5.png',
  2, 6, 1, 'This newly renovated apartment offers gorgeous views of Sydney Harbour combined with the convenience of the city greatest attractions. Located in Millers Point, it boasts all the benefits of city lifestyle, set amongst the historic homes with nearby pubs and eateries - perfect for a glass of champagne on the balcony while watching a harbour sunset.

The space

Our beautiful, spacious apartment boasts westward views of the harbour. Master bedroom has king bed and balcony with view. Second bedroom with 2 single beds (can be made into one king bed). Living space with Cable TV, sofa bed (double bed) and brand new kitchen. Rooftop outdoor patio perfect for cooking the BBQ. Suitable for up to 6 occupants (max 5 adults!');
alter sequence property_id_seq restart with 11 increment by 1;



insert into booking (id, property_id, guest_id, date_booked, date_start, date_end) values
  (1, 2, 3, '2018-10-22T10:37:33.735972+01:00', '08-Jan-2019', '18-Jan-2019');
insert into booking (id, property_id, guest_id, date_booked, date_start, date_end) values
  (2, 6, 1, '2018-10-21T10:37:33.735972+01:00', '12-Dec-2018', '16-Dec-2018');
alter sequence booking_id_seq restart with 3 increment by 1;


-- ALTER TABLE property
  -- ADD COLUMN lat decimal

-- ALTER TABLE property
  -- ADD COLUMN lng decimal

-- UPDATE property
--   SET lat = -33.8710844, lng = 151.2233585
--     WHERE id = 8

-- UPDATE property
--   SET lat = 33.8687895, lng = 151.1942171
--     WHERE id = 9

-- UPDATE property
--   SET lat = -33.8708464, lng = 151.20733
--     WHERE id = 10

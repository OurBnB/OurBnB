import React from "react";
import "../styles/Property.scss";
import Carousel from "react-image-carousel";
import MapView from "./MapView";

const remark = require("remark");
const reactRenderer = require("remark-react");

class Property extends React.Component {
  constructor() {
    super();
    this.handleToggleDescription = this.handleToggleDescription.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatDateDB = this.formatDateDB.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
    this.daysDifference = this.daysDifference.bind(this);
    this.pluralise = this.pluralise.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setButtonClass = this.setButtonClass.bind(this);
    this.setDescriptionClass = this.setDescriptionClass.bind(this);

    this.state = {
      descriptionToggle: false,
      firstName: null,
      lastName: null,
      telephone: null,
      email: null,
      password: null
    };
  }

  componentDidMount() {
    if (this.props.currentGuest && this.props.currentGuest.id) {
      this.setState({
        firstName: this.props.currentGuest.first_name,
        lastName: this.props.currentGuest.last_name,
        telephone: this.props.currentGuest.telephone,
        email: this.props.currentGuest.email
      });
    }
  }

  handleToggleDescription() {
    this.setState(
      {
        descriptionToggle: !this.state.descriptionToggle
      },
      () => {
        if (this.state.descriptionToggle) {
          document.location = "#description";
        }
      }
    );
  }


  handleSubmit(event) {
    event.preventDefault();
    if (this.props.currentGuest.id) {
        const bookingData = {
            guest_id: this.props.currentGuest.id,
            name: this.props.currentGuest.first_name,
            telephone: this.props.currentGuest.telephone,
            property_id: this.props.property.id,
            date_start: this.formatDateDB(this.props.startDate._d),
            date_end: this.formatDateDB(this.props.endDate._d)
        }
        console.log(bookingData, 'bookingData property.js')
      this.props.addBooking(bookingData);
      delete bookingData.descriptionToggle;
    } else {
      if (
        this.state.firstName &&
        this.state.lastName &&
        this.state.telephone &&
        this.state.email &&
        this.state.password
      ) {
        const newGuest ={
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobile: this.state.telephone,
            email: this.state.email,
            password: this.state.password
        }
        const bookingData = {
            telephone: this.state.telephone,
            property_id: this.props.property.id,
            date_start: this.formatDateDB(this.props.startDate._d),
            date_end: this.formatDateDB(this.props.endDate._d)
        }
        this.props.addBookingNewGuest(newGuest, bookingData);
        delete bookingData.descriptionToggle;
      }
    }

  }

    formatDate (dateObject) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
    }

  setButtonClass() {
    return this.state.firstName &&
      this.state.lastName &&
      this.state.telephone &&
      this.state.email
      ? "booking__button"
      : "booking__button-inactive";
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  formatDateDB(dateObject) {
    return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
  }

  getCurrency(string) {
    return string.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP"
    });
  }

  daysDifference(startDate, endDate) {
    var differenceMs = Math.abs(endDate.getTime() - startDate.getTime());
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil(differenceMs / oneDay);
  }

  pluralise(n) {
    return n > 1 ? `s` : ``;
  }

  setDescriptionClass() {
    const selectedClass = this.state.descriptionToggle
      ? "property__description-text"
      : "property__description-hidden";
    return selectedClass;
  }

  render() {
    const lengthOfStay = this.daysDifference(
      this.props.startDate._d,
      this.props.endDate._d
    );

    const descriptionText = this.props.property.description;

    let images = [],
      i = 0,
      max = 5;
    while (++i <= max) {
      images.push(`../static/images/${this.props.property[`image_${i}`]}`);
    }

    return (
      <div className="property">
        <section className="property__details">
          <h1><i className="fas fa-1x fa-home fa-home-icon" />
            {this.props.property.bedrooms} bedroom property in{" "}
            {this.props.property.city}
          </h1>
          <div className="photo__carousel">
            <Carousel
              images={images}
              thumb={true}
              loop={true}
              autoplay={8000}
            />
          </div>
          <h2>
            {this.props.property.address_l1}, {this.props.property.address_l2}
          </h2>
          <ul className="property__icons">
            <li>
              <img className="icon" src="../static/images/bed.png" />{this.props.property.bedrooms}
            </li>
            <li>
              <img className="icon" src="../static/images/bathroom.png" /> {this.props.property.bathrooms}
            </li>
            <li>
              <img className="icon" src="../static/images/family.png" /> {this.props.property.can_sleep} max
            </li>
            <li>
              <img className="icon" src="../static/images/money.png" />&pound;{Number(this.props.property.price_per_night)}
            </li>
          </ul>
        </section>
        <section className="property__description">

          <button id="description" className="property__description-btn" onClick={this.handleToggleDescription}>
            Description
          </button>
          <div className={this.setDescriptionClass()}>
            {this.state.descriptionToggle &&
              remark()
                .use(reactRenderer)
                .processSync(descriptionText).contents}
          </div>
        </section>

        <section className="property__map">
          <MapView property={this.props.property} />
        </section>

        <section className="property__booking">

           <h2>Make your booking</h2>
           <form onSubmit={this.handleSubmit}>
            <ul className="booking__list">
              <li>Check-in date: {this.formatDate(this.props.startDate._d)}</li>
              <li>Check-out date: {this.formatDate(this.props.endDate._d)}</li>
              <li>
                Length of stay: {lengthOfStay} night
                {this.pluralise(lengthOfStay)}
              </li>
              <li>
                Price per night:{" "}
                {this.getCurrency(Number(this.props.property.price_per_night))}
              </li>
              <li>
                Total price:{" "}
                {this.getCurrency(
                  this.props.property.price_per_night * lengthOfStay
                )}
              </li>
              </ul>
              <ul className="booking__submit">
              {this.props.currentGuest.id ? (
                <React.Fragment>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__fistName"
                      type="text"
                      value={this.props.currentGuest.first_name}
                      name="firstName"
                      autoComplete="on"
                      placeholder="First name"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__lastName"
                      type="text"
                      value={this.props.currentGuest.last_name}
                      name="lastName"
                      autoComplete="on"
                      placeholder="Last name"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__telephone"
                      type="text"
                      value={this.props.currentGuest.telephone}
                      name="telephone"
                      autoComplete="on"
                      placeholder="Telephone"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__email"
                      type="text"
                      value={this.props.currentGuest.email}
                      name="email"
                      autoComplete="on"
                      placeholder="Email"
                    />
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__firstName"
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      autoComplete="on"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__lastName"
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      autoComplete="on"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__telephone"
                      type="text"
                      placeholder="Telephone"
                      name="telephone"
                      autoComplete="on"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__email"
                      type="text"
                      placeholder="Email"
                      name="email"
                      autoComplete="on"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      className="booking__password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="on"
                    />
                  </li>
                </React.Fragment>
              )}
              <li>
                <button type="submit" className={this.setButtonClass()}>
                  Book now
                </button>
              </li>
            </ul>
          </form>
        </section>
      </div>
    );
  }
}
export default Property;

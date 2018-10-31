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
    this.setDescriptionClass = this.setDescriptionClass.bind(this);
    this.setButtonClass = this.setButtonClass.bind(this);
    this.setButtonValue = this.setButtonValue.bind(this);
    this.validInput = this.validInput.bind(this);
    this.validInputPassword = this.validInputPassword.bind(this);

    this.state = {
      descriptionToggle: false,
      first_name: null,
      last_name: null,
      telephone: null,
      email: null,
      password: null
    };
  }

  componentDidMount() {
    if (this.props.currentGuest && this.props.currentGuest.id) {
      this.setState({
        first_name: this.props.currentGuest.first_name,
        last_name: this.props.currentGuest.last_name,
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
      if (this.validInput()) {
        const bookingData = {
            guest_id: this.props.currentGuest.id,
            first_name: this.props.currentGuest.first_name,
            telephone: this.props.currentGuest.telephone,
            property_id: this.props.property.id,
            date_start: this.formatDateDB(this.props.startDate._d),
            date_end: this.formatDateDB(this.props.endDate._d)
        }
        this.props.addBooking(bookingData);
      }
    } else {
      if (this.validInput() && !!this.state.password) {
        const newGuest ={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            telephone: this.state.telephone,
            email: this.state.email,
            password: this.state.password
        }
        const bookingData = {
            property_id: this.props.property.id,
            date_start: this.formatDateDB(this.props.startDate._d),
            date_end: this.formatDateDB(this.props.endDate._d)
        }
        this.props.addBookingNewGuest(newGuest, bookingData);
      }
    }

  }

  formatDate (dateObject) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
  }

  setButtonClass (pw) {
    const passwordCheck = pw ? this.validInputPassword() : this.validInput();
    return passwordCheck ? "booking__button" : "booking__button-inactive";
  }

  setButtonValue (pw) {
    const passwordCheck = pw ? this.validInputPassword() : this.validInput();
    return passwordCheck ? "Book Now": "Enter your details to book...";
  }

  validInput () {
    return !!this.state.first_name && !!this.state.last_name && !!this.state.telephone && !!this.state.email;
  }

  validInputPassword () {
    return !!this.state.first_name && !!this.state.last_name && !!this.state.telephone && !!this.state.email && !!this.state.password;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  formatDateDB(dateObject) {
    return `${dateObject.getFullYear()}-${Number(dateObject.getMonth()+1)}-${dateObject.getDate()}`;
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
              <li className="bullet">{" "}Check-in date: {this.formatDate(this.props.startDate._d)}</li>
              <li className="bullet">{" "}Check-out date: {this.formatDate(this.props.endDate._d)}</li>
              <li className="bullet">
                {" "}Length of stay: {lengthOfStay} night
                {this.pluralise(lengthOfStay)}
              </li>
              <li className="bullet">
                {" "}Price per night:{" "}
                {this.getCurrency(Number(this.props.property.price_per_night))}
              </li>
              <li className="bullet">
                {" "}Total price:{" "}
                {this.getCurrency(
                  this.props.property.price_per_night * lengthOfStay
                )}
              </li>
              </ul>
              {this.props.currentGuest.id ? (
                <React.Fragment>
                <ul className="booking__submit-disabled">
                  <li>
                    <input
                      autoFocus
                      onChange={this.handleChange}
                      type="text"
                      value={this.props.currentGuest.first_name}
                      name="first_name"
                      disabled="true"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      value={this.props.currentGuest.last_name}
                      name="last_name"
                      disabled="true"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      value={this.props.currentGuest.telephone}
                      name="telephone"
                      disabled="true"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      value={this.props.currentGuest.email}
                      name="email"
                      disabled="true"
                    />
                  </li>
                  <li>
                    <button type="submit" className={this.setButtonClass()}>
                    {this.setButtonValue()}
                    </button>
                  </li>
                </ul>
                </React.Fragment>
              ) : (
                <React.Fragment>
                <ul className="booking__submit-enabled">
                  <li>
                    <input
                      autoFocus
                      onChange={this.handleChange}
                      className="booking__first_name"
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      autoComplete="on"
                    />
                  </li>
                  <li>
                    <input
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
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
                  <li>
                    <button type="submit" className={this.setButtonClass("password")}>
                    {this.setButtonValue("password")}
                    </button>
                  </li>
                </ul>
                </React.Fragment>
              )}
          </form>
        </section>
      </div>
    );
  }
}
export default Property;

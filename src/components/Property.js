import React from "react";
import "../styles/Property.scss";
import Carousel from "react-image-carousel";
import MapView from "./MapView"

const remark = require("remark");
const reactRenderer = require("remark-react");

class Property extends React.Component {

    constructor () {
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
          name: null,
          telephone: null,
          email: null
        }
    }

    handleToggleDescription () {
        this.setState({
            descriptionToggle: !this.state.descriptionToggle
        }, () => {
          if (this.state.descriptionToggle) {
            document.location = "#description";
          }
        })
        
    }

    handleSubmit(event){
      event.preventDefault();
      if (this.state.name, this.state.telephone, this.state.email) {
        // const { name, telephone, email} = this.state;
        const today = new Date();
        const bookingData = Object.assign({}, this.state, 
          {property_id: this.props.property.id, 
            guest_id: 1, 
            date_start: this.formatDateDB(this.props.startDate._d), 
            date_end: this.formatDateDB(this.props.endDate._d), 
            date_booked: this.formatDateDB(today)
          });
        delete bookingData.descriptionToggle;
        this.props.addBooking(bookingData);
      }
    }

    setButtonClass () {
      return this.state.name && this.state.telephone && this.state.email ? "booking__button" : "booking__button-inactive";
    }  

    handleChange (event) {
      this.setState({
          [event.target.name]: event.target.value
      })
    }

    formatDate (dateObject) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${dateObject.getDate()} of ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
    }

    formatDateDB (dateObject) {
      return `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()}`;
    }
    
    getCurrency (string) {
        return string.toLocaleString("en-GB", {
          style: "currency", 
          currency: "GBP"
        });
    }

    daysDifference(startDate, endDate) {
        var differenceMs = Math.abs(endDate.getTime() - startDate.getTime());
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.ceil(differenceMs/oneDay);
    }

    pluralise(n) {
        return n > 1 ? `s` : ``;
    }

    setDescriptionClass () {
      const selectedClass = this.state.descriptionToggle ? "property__description-text" : "property__description-hidden"
      return selectedClass;
    }

    render () {

    const lengthOfStay = this.daysDifference(this.props.startDate._d, this.props.endDate._d)

    const descriptionText = this.props.property.description;

    let images = [], i = 0, max = 5;
    while (++i <= max) {
      images.push(`../static/images/${this.props.property[`image_${i}`]}`)
    }
      
    return (
      <div className="property">
        <section className="property__details">
          <h1>
            {this.props.property.bedrooms} bedroom property in{" "}
            {this.props.property.city}
          </h1>
          <div className="photo-carousel">
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
          <ul>
            <li>
              <img className="icon" src="../static/images/bed.png" />
              {this.props.property.bedrooms}
            </li>
            <li>
              <img className="icon" src="../static/images/bathroom.png" />
              {this.props.property.bathrooms}
            </li>
            <li>
              <img className="icon" src="../static/images/family.png" />
              {this.props.property.can_sleep} max
            </li>
            <li>
              <img className="icon" src="../static/images/money.png" />£
              {this.props.property.price_per_night}
            </li>
          </ul>
        </section>
        <section className="property__description">
          <button id="description"
            className="property__description-btn"
            onClick={this.handleToggleDescription}
          >
            Description
          </button>
          <div className={this.setDescriptionClass()}>
          {this.state.descriptionToggle &&
            remark().use(reactRenderer).processSync(descriptionText).contents}
          </div>
        </section>
          
        <section className="property__map">
            <MapView property={this.props.property} />
        </section>

        <section className="property__booking">
           <h3>Make your booking</h3>
            <form onSubmit={this.handleSubmit}>
                <ul className="booking__list">
                    <li>Check-in date: {this.formatDate(this.props.startDate._d)}</li>
                    <li>Check-out date: {this.formatDate(this.props.endDate._d)}</li>
                    <li>Length of stay: {lengthOfStay} night{this.pluralise(lengthOfStay)}</li>
                    <li>Price per night: {this.getCurrency(Number(this.props.property.price_per_night))}</li>
                    <li>Total price: {this.getCurrency(this.props.property.price_per_night * lengthOfStay)}</li>
                    <li><input onChange={this.handleChange} className="booking__name" type="text" placeholder="Name" name="name" autoComplete="on" /></li>
                    <li><input onChange={this.handleChange} className="booking__telephone" type="text" placeholder="Telephone" name="telephone" autoComplete="on" /></li>
                    <li><input onChange={this.handleChange} className="booking__email" type="text" placeholder="Email" name="email" autoComplete="on" /></li>
                    <li><button type="submit" className={this.setButtonClass()}>Book now</button></li>
                </ul>
            </form>
        </section>
      </div>
    );
  }
}
export default Property;

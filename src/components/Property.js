import React from 'react';
import '../styles/Property.scss';

const remark = require('remark');
const reactRenderer = require('remark-react');

class Property extends React.Component {
    constructor () {
        super();
        this.handleToggleDescription = this.handleToggleDescription.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.getCurrency = this.getCurrency.bind(this);
        this.daysDifference = this.daysDifference.bind(this);
        this.pluralise = this.pluralise.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            descriptionToggle: false
        }
    }

    handleToggleDescription () {
        this.setState({
            descriptionToggle: !this.state.descriptionToggle
        })
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /////////////
    // Make booking
    /////////////

    formatDate (dateObject) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${dateObject.getDate()} of ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
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

    render () {

    // const lengthOfStay = this.props.endDate._d.getDate() - this.props.startDate._d.getDate();

    const lengthOfStay = this.daysDifference(this.props.startDate._d, this.props.endDate._d)

    const descriptionText = this.props.property.description;

        return (
            <React.Fragment>
                <header>
                    <h1>{this.props.property.address_l1}</h1>
                </header>
                <section className="property__details">
                    <h2>{this.props.property.address_l1} {this.props.property.address_l2}</h2>
                    <img src="../static/images/image_1.jpg" />
                    <h3>Details</h3>
                    <ul>
                        <li><button onClick={this.handleToggleDescription}>Description</button>
                            { this.state.descriptionToggle && remark().use(reactRenderer).processSync(descriptionText).contents }
                        </li>
                    </ul>
                </section>
                <section>
                    <h3>Make your booking</h3>
                    <form onSubmit={this.handleSubmit}>
                        <ul>
                            <li>Check-in date: {this.formatDate(this.props.startDate._d)}</li>
                            <li>Check-out date: {this.formatDate(this.props.endDate._d)}</li>
                            <li>Length of stay: {lengthOfStay} night{this.pluralise(lengthOfStay)}</li>
                            <li>Price: {this.getCurrency(Number(this.props.property.price_per_night))}</li>
                            <li><input onChange={this.handleChange} className="booking__name" type="text" placeholder="Name" name="name" autoComplete="on" /></li>
                            <li><input onChange={this.handleChange} className="booking__telephone" type="text" placeholder="Telephone" name="telephone" autoComplete="on" /></li>
                            <li><input onChange={this.handleChange} className="booking__email" type="text" placeholder="Email" name="email" autoComplete="on" /></li>
                            <li><button type="submit">Book now</button></li>
                        </ul>
                    </form>
                </section>
            </React.Fragment>
        )
    }
}

export default Property;

import React from 'react';
import '../styles/Property.scss';

const remark = require('remark');
const reactRenderer = require('remark-react');

class Property extends React.Component {
    constructor () {
        super();
        this.handleToggleDescription = this.handleToggleDescription.bind(this);
        this.state = {
            descriptionToggle: false
        }
    }

    handleToggleDescription () {
        this.setState({
            descriptionToggle: !this.state.descriptionToggle
        })
    }

    render () {

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
                    <li>Dates: {this.props.startDate} - {this.props.endDate} </li>
                    <li>{this.props.property.price_per_night}</li>
                    <li>Total: xxx</li>
                    <li><button onClick={this.handleToggleDescription}>Description</button>
                        { this.state.descriptionToggle && remark().use(reactRenderer).processSync(descriptionText).contents }
                    </li>
                </ul>
            </section>
            </React.Fragment>
        )
    }
}

export default Property;

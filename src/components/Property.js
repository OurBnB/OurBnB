import React from 'react';
import '../styles/Property.scss';

// render descriptionText as markdown
// see https://github.com/mapbox/remark-react
// npm install remark
// npm install remark-react

const remark = require('remark');
const reactRenderer = require('remark-react');

class Property extends React.Component {
    constructor () {
        super();
        this.handleClickDescription = this.handleClickDescription.bind(this);
        this.state = {
            descriptionToggle: false
        }
    }

    handleClickDescription () {
        this.setState({
            descriptionToggle: !this.state.descriptionToggle
        })
    }
    
    render () {

    const descriptionText = this.props.property.description;
    console.log(descriptionText);

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
                    <li>Dates: 23 Oct - 26 Oct 2018 </li>
                    <li>{this.props.property.price_per_night}</li>
                    <li>Total: xxx</li>
                    <li><button onClick={this.handleClickDescription}>Description</button>
                        { this.state.descriptionToggle && remark().use(reactRenderer).processSync(descriptionText).contents }
                    </li>
                </ul>
            </section>
            </React.Fragment>
        )
    }
}

export default Property;
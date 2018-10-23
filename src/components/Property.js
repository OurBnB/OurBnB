import React from 'react';
// import '../styles/Property.scss';

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
        return (
            <React.Fragment>
            <header>
                <h1>{this.props.property.address_l1}</h1>
            </header>
            <section className="property__details">
                    <li><button onClick={this.handleClickDescription}>Description</button>
                        { this.state.descriptionToggle && remark().use(reactRenderer).processSync(this.props.property.description) }
                    </li>
                </ul>
            </section>
            </React.Fragment>
        )
    }
}

export default Property;

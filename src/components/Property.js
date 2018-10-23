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

    const descriptionText = 
`#### WELCOME TO THE CITY THAT NEVER SLEEPS!

Cozy and quiet private apartment with kitchen.
This apartment is located in the center of Manhattan near Empire State Building, Times Square (15 Minutes by Walk) with almost every major tourist destinations reachable via major public transportation including subways and buses, as well as car service and NYC taxi. You will be in the most prime location of New York City.

 The space

This apartment has 2 full size beds in bedroom, Full bathroom and kitchen.
A sofa bed is available in the living area for 5th person.

#### Guest access

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
The building has an elevator and 24/7 doorman.`;

        return (
            <React.Fragment>
            <header>
                <h1>Real Brooklyn Home Lifestyle</h1>
            </header>
            <section className="property__details">
                <h2>Address: 20 W 34th Street, NY 10001</h2>
                <img src="../static/images/image_1.jpg" />
                <h3>Details</h3>
                <ul>
                    <li>Dates: 23 Oct - 26 Oct 2018 </li>
                    <li>3 nights</li>
                    <li>$100 per night </li>
                    <li>Total: $300</li>
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
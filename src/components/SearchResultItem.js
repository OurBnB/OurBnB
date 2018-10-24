import React from 'react';
import '../styles/SearchResultItem.scss';

class SearchResultItem extends React.Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (event) {
        event.preventDefault();
        this.props.receiveDisplayProperty(this.props.property)
    }

    render () {
        return (
            <React.Fragment>
              <div>
              <img src={this.props.property.image_1} onClick={this.handleClick} alt="Property Image"/>
              <h3 onClick={this.handleClick} className="search__result-item">{this.props.property.address_l1}</h3>
              <h4>{this.props.property.city}</h4>
              <h5>£{this.props.property.price_per_night}</h5>
              </div>
            </React.Fragment>
        )
    }
}

export default SearchResultItem;

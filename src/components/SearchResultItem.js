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
      const img = `../static/images/${this.props.property.image_1}`
        return (
              <div className = "search-result">
                  <img className = "property-image" src={img} onClick={this.handleClick} alt="Property Image"/>
                <div className = "property-details">
                  <h3 onClick={this.handleClick} className="search__result-title">{this.props.property.address_l1}</h3>
                  <h4>{this.props.property.city}</h4>
                  <h5>&pound;{this.props.property.price_per_night} per night</h5>
                </div>
              </div>

        )
    }
}

export default SearchResultItem;

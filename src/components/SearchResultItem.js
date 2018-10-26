import React from 'react';
import '../styles/SearchResultItem.scss';

class SearchResultItem extends React.Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.pluralise = this.pluralise.bind(this);
    }

    handleClick (event) {
        event.preventDefault();
        this.props.receiveDisplayProperty(this.props.property)
    }

    pluralise(n) {
        return n > 1 ? `s` : ``;
    }

    render () {
      const img = `../static/images/${this.props.property.image_1}`
        return (
              <div onClick={this.handleClick} className="search__result">
                <img className="search__result-image" src={img} onClick={this.handleClick} alt="Property Image"/>
                <div className="search__result-details">
                  <h3 className="search__result-title"><strong><i className="fas fa-1x fa-home fa-home-icon" />{this.props.property.address_l1}</strong></h3>
                  <h4 className = "search__result-city">{this.props.property.city}</h4>
                  <h5 className ="search__result-price">{this.props.property.bedrooms} bed{this.pluralise(this.props.property.bedrooms)}, &pound;{Number(this.props.property.price_per_night)}/night</h5>
                </div>
              </div>

        )
    }
}

export default SearchResultItem;

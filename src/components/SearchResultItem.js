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
                <div onClick={this.handleClick} className="search__result-item">{this.props.property.address_l1}</div>
            </React.Fragment>   
        )
    }
}

export default SearchResultItem;

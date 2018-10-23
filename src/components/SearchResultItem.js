import React from 'react';




class SearchResultItem extends React.Component {
    constructor () {
        super();

    }




    render () {
        return (
            <React.Fragment>
            <header>
                <h1>{this.props.property.address_l1}</h1>
            </header>

            </React.Fragment>
        )
    }
}

export default SearchResultItem;

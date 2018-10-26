import React from 'react'
import SearchResultItem from './SearchResultItem.js'
import MapView from './MapView.js'
import Property from './Property.js';
import '../styles/SearchResults.scss';


class SearchResults extends React.Component {
  constructor(){

  super()

  this.receiveDisplayProperty = this.receiveDisplayProperty.bind(this);
  this.backToResults = this.backToResults.bind(this);

  this.state = {
    display: "searchResults",
    property: null
  }
}

backToResults() {
  this.setState({
    display: "searchResults"
  }, () => document.location = "#results")
}

receiveDisplayProperty(property) {
  this.setState({
    display: "property",
    property: property
  }, () => document.location = "#results")
}

render(){

  const searchResults = this.props.citySearchResults.map(property => {
    return(
      <React.Fragment key={property.id}>
        <SearchResultItem
          key={property.id}
          property={property}
          receiveDisplayProperty={this.receiveDisplayProperty}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
        />
      </React.Fragment>
    )
  })

  const selectedProperty = this.state.property &&
    <React.Fragment>
      <button onClick={this.backToResults} className="search__back-button">&larr; back to results</button>
      <Property
        key={this.state.property.id}
        property={this.state.property}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        addBooking={this.props.addBooking}
        addBookingNewGuest={this.props.addBookingNewGuest}
        currentGuest={this.props.currentGuest}
      />
    </React.Fragment>

  return(
    <React.Fragment>
      {this.state.display === "searchResults" ? searchResults : selectedProperty}
    </React.Fragment>
  )}
}

export default SearchResults;

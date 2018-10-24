import React from 'react'
import SearchResultItem from './SearchResultItem.js'
import MapView from './MapView.js'


class SearchResults extends React.Component {
  constructor(){
  super()

  this.state={
  }
}

render(){
  return(
    <div>
    {this.props.citySearchResults.map(property => {
      return(
        <div>
          <SearchResultItem property={property}/>
          <div style={{ height: '250px', position: 'relative' }}>
            <MapView property={property}/>
          </div>
        </div>
        )
        }
      )
      }
    </div>
  )}
}



export default SearchResults

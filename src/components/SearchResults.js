import React from 'react'
import SearchResultItem from './SearchResultItem.js'
import Map from './Map.js'


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
          <div style={{ height: '250px', overflow: 'hidden' }}>
            <Map property={property}/>
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

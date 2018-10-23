import React from 'react'
import SearchResultItem from './SearchResultItem.js'


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
        <SearchResultItem property={property}/>
        )
        }
      )
      }
    </div>
  )}
}



export default SearchResults

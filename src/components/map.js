import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
    zoom: 11
  }
render() {
    return (
      <div className='google-map' style={{ height: '250px', width: '100%' }}>
        <GoogleMapReact
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          <AnyReactComponent
            lat={ 40.7473310 }
            lng={ -73.8517440 }
            text={ 'Test Location?' }
          />
        </GoogleMapReact>
      </div>
    )
  }
}

// take an address from State
// fetch to the google APi with it
// return the long lat
//that can then go into maps - stage 2

const APIKey = 'AIzaSyBHm1z95Or8WefNxOjZ-wejrcZqEcRkVwY'

function googleGeocoding(postCode, APIKey){
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${APIKey}`)
  .then(function(result){
    return result.json()
  })
  .then(function(data){
    console.log(data)
    console.log(data.results[0].location)
    console.log(data.results[0].location.lat)
    console.log(data.results[0].location.lng)
    //set state with the lat long maybe? Or call this function inside our "proper" GMaps function
  })
}

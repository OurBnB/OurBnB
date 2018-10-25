import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const APIKey = 'AIzaSyBHm1z95Or8WefNxOjZ-wejrcZqEcRkVwY';

// const AnyReactComponent = ({ text }) => <div>{ text }</div>;

class MapView extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Map google={this.props.google} zoom={12}
                 style={{height: '250px', width: '100%'}}
                 initialCenter={{
                     lat: this.props.property.lat,
                     lng: this.props.property.lng
                 }}>

                <Marker onClick={this.onMarkerClick}
                        title={'Property location'}/>

                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>London</h1>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (APIKey)
})(MapView)

// googleGeocoding(postCode, Key){
//   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${Key}`)
//   .then(function(result){
//     return result.json()
//   })
//   .then(function(data){
//     console.log(data.results[0].geometry.location)
//
//     //set state with the lat long maybe? Or call this function inside our "proper" GMaps function
//   })
// }

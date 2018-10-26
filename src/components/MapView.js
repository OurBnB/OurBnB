import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const APIKey = 'AIzaSyBHm1z95Or8WefNxOjZ-wejrcZqEcRkVwY';

class MapView extends Component {
    constructor() {
        super();
        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        this.handleToggleClose = this.handleToggleClose.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
        
    	this.state = {
            isOpen: false,
            activeMarker: {}
        }
    }

    onMapClick () {
        if (this.state.isOpen) {
            this.setState({
                isOpen: false,
                activeMarker: null
            });
        }
    }

    handleToggleOpen (marker, event) {
        console.log(marker);
        this.setState({
          activeMarker: marker,
          isOpen: true
        });
    }

    handleToggleClose(event) {
        console.log("handleToggleClose")
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <Map 
                google={this.props.google} zoom={16}
                style={{height: '250px', width: '100%'}}
                onClick={this.onMapClick}
                initialCenter={{
                    lat: this.props.property.lat,
                    lng: this.props.property.lng
                }}
            >

                <Marker 
                    title={'Property location'}
                    name={this.props.property.address_l1}
                    onClick={this.handleToggleOpen}
                />
                
                { this.state.isOpen &&
                <InfoWindow 
                    marker={this.state.activeMarker} 
                    onCloseClick={this.handleToggleClose}
                    visible={this.state.isOpen}  
                >
                    <div>
                        <h1>Property; {this.props.property.address_l1}</h1>
                    </div>
                </InfoWindow>
                }

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

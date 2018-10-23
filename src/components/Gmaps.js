// take an address from State
// fetch to the google APi with it
// return the long lat
// https://maps.googleapis.com/maps/api/geocode/json?address=5+Raphael+Street,+Knightsbridge,+London&key=AIzaSyBHm1z95Or8WefNxOjZ-wejrcZqEcRkVwY
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

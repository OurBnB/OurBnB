import React from 'react';
import Header from './Header';
import Property from './Property';
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super()

    this.state={
      // propertyList: {},
      citySearchResults: [],
      citySearch: "",
      startDate: "",
      endDate: "",
    }

    // this.propertyCall = this.propertyCall.bind(this);
    this.cityCall = this.cityCall.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleSubmitReceiver = this.handleSubmitReceiver.bind(this);
  }

componentDidMount(){

}

//   propertyCall(){
//   fetch('/api/properties')
//     .then(function(response) {
//       return response.json();
//     })
//     .then(body => {
//       this.setState({
//         propertyList: body
//       })
//     })
// }

cityCall(city){
  fetch(`/api/properties/${city}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        citySearchResults: body
      })
    })
}

handleChangeCity(value){
  this.setState({
    citySearch: value,
  })
}

handleChangeStartDate(value){
  this.setState({
      startDate: value,
  })
}

handleChangeEndDate(value){
  this.setState({
      endDate: value,
  })
}

handleSubmitReceiver(){
  console.log(this.state.citySearch)
  this.cityCall(this.state.citySearch)
}


  render(){
    return(
      <React.Fragment>
        <Header />
        <main className="main">
          <Search
            handleSubmitReceiver={this.handleSubmitReceiver}
            handleChangeCity={this.handleChangeCity}
            handleChangeStartDate={this.handleChangeStartDate}
            handleChangeEndDate={this.handleChangeEndDate}
            cityCall={this.cityCall}
            propertyCall={this.propertyCall}
          />
          <SearchResults citySearchResults={this.state.citySearchResults}/>
        </main>
      </React.Fragment>
    )
  }
}

export default App;

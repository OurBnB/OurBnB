import React from 'react';
import Header from './Header';
import Search from './Search'
import SearchResults from './SearchResults'
import moment from "moment";
import '../styles/App.scss';

class App extends React.Component {
  constructor(){
    super()

    this.state={
      citySearchResults: [],
      citySearch: "",
      startDate: moment(),
      endDate: "",
    }

    this.cityCall = this.cityCall.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleSubmitReceiver = this.handleSubmitReceiver.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.sentenceCase = this.sentenceCase.bind(this);
  }

componentDidMount(){

}

cityCall(city){
  const formattedCityInput = this.sentenceCase(city);
  console.log(formattedCityInput);
  fetch(`/api/properties/${formattedCityInput}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({
        citySearchResults: body
      }, () => document.location = "#results")
    })
}

handleChangeCity(value){
  this.setState({ citySearch: value })
}

handleSubmitReceiver(){
  this.cityCall(this.state.citySearch)
}

submittedStartEndDates(){
  return { endDate: this.state.endDate, startDate: this.state.startDate}
}

handleChangeStartDate(value){
  this.setState({ startDate: value })
}

handleChangeEndDate(value){
  this.setState({ endDate: value })
}

sentenceCase(str) {
  return str.split(" ").map(item => {
    const word = item.split("");
    word[0] = word[0].toUpperCase()
    return word.join("");
  }).join(" ");
}

addBooking (bookingData) {
  fetch('/api/booking', {
    method: 'post',
    body: JSON.stringify(bookingData),
    headers: { 'Content-Type': 'application/json' }
  }
  ).then(response => response.json()
  ).then(bookingId => {
    console.log(bookingId);
  })
  .catch(error => res.json({ error: error.message }));
}

  render(){
      return <React.Fragment>
          <main className="main">
              <Header/>
              <div className="top">
                  <div className="landing-page">
                      <Search
                          handleSubmitReceiver={this.handleSubmitReceiver}
                          handleChangeCity={this.handleChangeCity}
                          handleChangeStartDate={this.handleChangeStartDate}
                          handleChangeEndDate={this.handleChangeEndDate}
                          cityCall={this.cityCall}
                          propertyCall={this.propertyCall}
                      />
                  </div>
              </div>
              <div id="results" className="search-results-feed">
                  <SearchResults
                      citySearchResults={this.state.citySearchResults}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      addBooking={this.addBooking}
                  />
              </div>
          </main>
      </React.Fragment>
  }
}

export default App;

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
  }

componentDidMount(){

}

cityCall(city){
  fetch(`/api/properties/${city}`)
    .then(function(response) {
      return response.json();
    })
    .then(body => {
      this.setState({ citySearchResults: body })
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
  // console.log(value);
  this.setState({ startDate: value })
}

handleChangeEndDate(value){
  // console.log(value);
  this.setState({ endDate: value })
}

  render(){
    return(
      <React.Fragment>
        <main className="main">
          <div className="top">
          <Header />
            <div className ="landing-page">
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
          <div className = "search-results-feed">
            <SearchResults
              citySearchResults={this.state.citySearchResults}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App;

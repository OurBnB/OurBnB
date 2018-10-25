import React from "react";
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import GuestLogin from "./GuestLogin";
import moment from "moment";
import "../styles/App.scss";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      citySearchResults: [],
      citySearch: "",
      startDate: moment(),
      endDate: "",
      activeScreen: "main",
      currentGuest: {}
    };

    this.cityCall = this.cityCall.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleSubmitReceiver = this.handleSubmitReceiver.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.sentenceCase = this.sentenceCase.bind(this);
    this.switchScreen = this.switchScreen.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.retrieveGuest = this.retrieveGuest.bind(this);
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

  handleChangeCity(value) {
    this.setState({ citySearch: value });
  }

  handleSubmitReceiver() {
    this.cityCall(this.state.citySearch);
  }

  submittedStartEndDates() {
    return { endDate: this.state.endDate, startDate: this.state.startDate };
  }

  handleChangeStartDate(value) {
    this.setState({ startDate: value });
  }

  handleChangeEndDate(value) {
    this.setState({ endDate: value });
  }

  addBooking(bookingData) {
    fetch("/api/booking", {
      method: "post",
      body: JSON.stringify(bookingData),
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(bookingId => {
      console.log(bookingId);
    })
    .catch(error => res.json({ error: error.message }));
  }

  switchScreen(screen) {
    this.setState({ activeScreen: screen });
  }

  sentenceCase(str) {
    return str.split(" ").map(item => {
      const word = item.split("");
      word[0] = word[0].toUpperCase()
      return word.join("");
    }).join(" ");
  }

  addGuest(guest) {
    const user = { guest: guest };
    console.log(user, 'addGuest');
    fetch("http://localhost:8080/api/guest", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          currentGuest: data,
          activeScreen: 'main'
        }, () => console.log(this.state.currentGuest));
      });
  }

  retrieveGuest(guestOld) {
    const user = { guestOld: guestOld };
    console.log(user, 'retrieveGuest');
    fetch("http://localhost:8080/api/guestOld", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        currentGuest: data,
        activeScreen: "main"
      }, ()=> console.log(this.state.currentGuest));
    });
  }

  render() {
    return (
      <React.Fragment>
        <main className="main">
          <Header switchScreen={this.switchScreen} />
          {this.state.activeScreen === "main" && (
            <React.Fragment>
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
                  currentGuest={this.state.currentGuest}
                />
              </div>
            </React.Fragment>
          )}
          {this.state.activeScreen === "guestLogin" && (
            <GuestLogin
              addGuest={this.addGuest}
              retrieveGuest={this.retrieveGuest}
            />
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default App;

import React from "react";
import Header from "./Header";
import Search from "./Search";
import SearchResults from "./SearchResults";
import GuestLogin from "./GuestLogin";
import moment from "moment";
import cx from "classnames";
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
      currentGuest: {},
      on: false,
      message: ""
    };

    this.cityCall = this.cityCall.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleSubmitReceiver = this.handleSubmitReceiver.bind(this);
    this.addBooking = this.addBooking.bind(this);
    this.addBookingNewGuest = this.addBookingNewGuest.bind(this);
    this.sentenceCase = this.sentenceCase.bind(this);
    this.switchScreen = this.switchScreen.bind(this);
    this.addGuest = this.addGuest.bind(this);
    this.retrieveGuest = this.retrieveGuest.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  cityCall(city) {
    const formattedCityInput = this.sentenceCase(city);
    fetch(`/api/properties/${formattedCityInput}`)
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({
          citySearchResults: body
        }, () => document.location = "#results__page-top")
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
    const booking = { bookingData: bookingData };
    fetch("/api/booking", {
      method: "post",
      body: JSON.stringify(booking),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          message: `Dear ${
            data.name
          }, thank you for your booking. Your ID is ${data.id}.`
        });
        this.displayModal(data);
        return data;
      })
      .catch(error => res.json({ error: error.message }));
  }

  addBookingNewGuest(newGuest, bookingData) {
    this.addGuest(newGuest)
      .then(currentGuest => {
        const completeData = Object.assign(
          {},
          { bookingData },
          {
            guest_id: currentGuest.id,
            name: currentGuest.first_name,
            telephone: currentGuest.telephone
          }
        );
        this.addBooking(completeData);
      });
  }

  displayModal() {
    this.setState({
      on: !this.state.on
    });
  }

  closeModal() {
    this.setState({
      message: "",
      on: !this.state.on,
    });
  }

  switchScreen(screen) {
    this.setState({ activeScreen: screen });
  }

  sentenceCase(str) {
    return str
      .split(" ")
      .map(item => {
        const word = item.split("");
        word[0] = word[0].toUpperCase();
        return word.join("");
      })
      .join(" ");
  }

  addGuest(guest) {
    const user = { guest: guest };
    return fetch("http://localhost:8080/api/guest", {
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
        this.setState(
          {
            currentGuest: data,
            activeScreen: this.state.activeScreen === 'guestLogin' ? "main" : this.state.activeScreen
          });
        return data
      });
  }

  retrieveGuest(guestOld) {
    const user = { guestOld: guestOld };
    fetch("http://localhost:8080/api/guestOld", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
       console.log(data);
        data.error? (this.setState({
          message: "Incorrect email or password. Please try again."
        }, ()=>this.displayModal())):
        this.setState(
          {
            currentGuest: data,
            activeScreen: "main"
          });
      })
  }

  render() {
    const classes = cx("modal", {
      "modal--active": this.state.on
    });

    return (
      <React.Fragment>
        <main className="main">
          <Header switchScreen={this.switchScreen} activeScreen={this.state.activeScreen}/>
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
              {this.state.citySearchResults.length ?
              <div id="results__page-top" className="results__page-top">
                <div id="results" className="search__results-feed">
                  <SearchResults
                  citySearchResults={this.state.citySearchResults}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  addBooking={this.addBooking}
                  addBookingNewGuest={this.addBookingNewGuest}
                  currentGuest={this.state.currentGuest}
                  />
                </div>
              </div> : null
            }
            </React.Fragment>
          )}
          {this.state.activeScreen === "guestLogin" && (
            <GuestLogin
              addGuest={this.addGuest}
              retrieveGuest={this.retrieveGuest}
            />
          )}
        </main>
        <div id="confirmationModal" className={classes}>
          <span onClick={this.closeModal} className="close">
            &times;
          </span>
          <p className="message">{this.state.message}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

import React from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import '../styles/Search.scss';
import '../styles/datepicker.scss';

class Search extends React.Component {
  constructor(){
    super()
    this.state = {
      startDate: moment()
    };
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.setButtonClass = this.setButtonClass.bind(this);
    this.setButtonValue = this.setButtonValue.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    if (this.state.city && this.state.startDate && this.state.endDate) {
      this.props.handleSubmitReceiver();
    }
  }

  handleChangeStart(date) {
    this.setState({ startDate: date });
    this.props.handleChangeStartDate(date);
  }

  handleChangeEnd(date) {
    this.setState({ endDate: date });
    this.props.handleChangeEndDate(date);
  }

  setButtonClass () {
    return this.validInput() ? "search__button" : "search__button-inactive";
  }

  setButtonValue () {
    return this.validInput() ? "Search": "Enter your destination and dates...";
  }

  validInput () {
    return !!this.state.startDate && !!this.state.endDate && !!this.state.city;
  }

  handleChangeCity(event){
    this.setState({
      city: event.target.value
    });
    this.props.handleChangeCity(event.target.value);
  }

  render(){
    return(
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="search__form">
          <input 
            autoFocus={!this.state.city}
            onChange={this.handleChangeCity} 
            className="search__city" 
            type="text" 
            placeholder="Destination" 
            name="city" 
            autoComplete="off" 
          />
          <div className="search__dates">

            <div className="myDatePickerContainer myDatePickerStart">
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
                locale="en-gb"
                autoComplete="off"
                placeholderText="Start date"
              />
            </div>

            <div className="myDatePickerContainer myDatePickerEnd">
              <DatePicker
                selected={this.state.endDate}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                placeholderText="End date"
                locale="en-gb"
                autoComplete="off"
                popperPlacement="top-end"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: '5px, 1rem'
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: 'viewport'
                  }
                }}
              />
            </div>
          </div>
          <button type="submit" className={this.setButtonClass()}>{this.setButtonValue()}</button>
        </form>
      </React.Fragment>
    )
  }
}

export default Search;

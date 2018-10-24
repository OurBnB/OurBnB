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
    
  }

  handleChangeCity(event){
    this.props.handleChangeCity(event.target.value)
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleSubmitReceiver();
  }

  handleChangeStart(date) {
    this.setState({ startDate: date });
    this.props.handleChangeStartDate(date);
  }

  handleChangeEnd(date) {
    this.setState({ endDate: date });
    this.props.handleChangeEndDate(date);
  }

  render(){
    return(
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="search__form">
          <input onChange={this.handleChangeCity} className="search__city" type="text" placeholder="enter city here" name="city" autoComplete="on" />
          <div className="search__dates">

            <div className="myDatePickerContainer myDatePickerStart">
              <DatePicker
                selected={this.state.startDate}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
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
          <button type="submit" className="search__button">Search</button>
        </form>
      </React.Fragment>
    )
  }
}

export default Search;



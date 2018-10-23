import React from 'react'
import '../styles/Search.scss';

class Search extends React.Component {
  constructor(){
    super()
    this.state = {

    }

    this.handleChangeCity = this.handleChangeCity.bind(this)
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

handleChangeCity(event){
  this.props.handleChangeCity(event.target.value)
}

handleChangeStartDate(event){
  this.props.handleChangeStartDate(event.target.value)
}

handleChangeEndDate(event){
  this.props.handleChangeEndDate(event.target.value)
}

handleSubmit(event){
  event.preventDefault();
  this.props.handleSubmitReceiver();
}

  render(){
    return(
      <form onSubmit={this.handleSubmit} className="search__form">
        <input onChange={this.handleChangeCity} className="search__city" type="text" placeholder="enter city here" name="city" autoComplete="on" />
        <div className="search__dates">
          <input onChange={this.handleChangeStartDate} className="search__date-start" type="text" placeholder="DD/MM/YY" name="start-date" autoComplete="on" />
          <input onChange={this.handleChangeEndDate} className="search__date-end" type="text" placeholder="DD/MM/YY" name="end-date" autoComplete="on" />
        </div>
        <button type="submit" className="search__button">Search</button>
    </form>
    )
  }
}

export default Search;
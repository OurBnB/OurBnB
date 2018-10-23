import React from 'react'

class Search extends React.Component {
  constructor(){
    super()

    this.state={

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChangeCity} type="text" placeholder="enter city here"/>
          <input onChange={this.handleChangeStartDate} type="text" placeholder="DD/MM/YY"/><input onChange={this.handleChangeEndDate} type="text" placeholder="DD/MM/YY" />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default Search

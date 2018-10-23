import React from 'react';
import Header from './Header';
import Property from './Property';
import '../styles/App.scss';


class App extends React.Component {
  constructor(){
    super()
  }

  render(){
    return(
      <React.Fragment>
        <Header />
        <main className="main">
          <Property />
        </main>
      </React.Fragment>
    )
  }
}

export default App;

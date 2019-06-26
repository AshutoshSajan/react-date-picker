import React, { Component } from 'react';
import './App.css';
import Date from './Date';
import DateRange from './DateRange';

class App extends Component {

  state = {
    shwoCalander: false
  }
  
  handleBlur = () => {
    this.setState({ shwoCalander: !this.state.shwoCalander });
  }

  render(){
    return (
      <div className="app" onClick={this.handleBlur} >
        <Date blur={this.state.shwoCalander} />
        <DateRange />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Date from './Date';
import DateRange from './DateRange';

class App extends Component {

  state = {
    shwoCalander: false
  }
  
  // handleBlur = () => {
  //   console.log("fired");
  //   this.setState({ shwoCalander: "hide" });
  // }

  render(){
    return (
      <div className="app" >
        <Date />
        <DateRange />
      </div>
    )
  }
}

export default App;

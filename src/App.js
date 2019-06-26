import React, { Component } from 'react';
import './App.css';
import Date from './Date';
import DateRange from './DateRange';

class App extends Component {
  
  // handleBlur = () => {
  //   var flag = true;
  //   // return fa;
  // }

  render(){
    return (
      <div className="app" onBlur={this.handleBlur} >
        <Date blur={this.handleBlur}/>
        <DateRange />
      </div>
    )
  }
}

export default App;

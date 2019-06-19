import React, { Component } from 'react';
import './App.css';
import Calender from './Calender';

class App extends Component {

  state = {
    date: "",
    type: "",
    icon: true,
    calender: false,
  }

  // handleClick = () => {}

  mouseEnter = () => {
    this.setState({ icon: !this.state.icon });
  }

  handleMouseLeave = () => {
    this.mouseEnter();
  }

  handleClear = () => {
    this.setState({ date: "" });
  }

  handleFocus = () => {
    this.setState({ calender: true });
  }

  handleBlur = () => {
    this.setState({ calender: false });
  }

  today = (data, type) => {
    this.setState({ date: data });
  }

  render() {
    return (
      <div className="app" onFocus={this.handleFocus} /*onBlur={this.handleBlur}*/ >
        <div className="input-box" onMouseEnter={this.mouseEnter} onMouseLeave={this.handleMouseLeave} >
          <input type={this.state.type || "text" } className="main-input" placeholder="Select Date" value={ this.state.date } readOnly/>
            {
              this.state.icon ? <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle" onClick={this.handleClear}></i>
            }
        </div>
        {
          this.state.calender ?  <Calender today={this.today} /> : null
        }

      </div>
    );
  }
}

export default App;

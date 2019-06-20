import React, { Component } from 'react';
import './App.css';
import Calender from './Calender';

class App extends Component {

  state = {
    date: "",
    icon: true,
    calender: false,
    error: "",
    sendDate: false
  }

  // handleClick = () => {}

  mouseEnter = () => {
    if(this.state.date){
      this.setState({ icon: !this.state.icon });
    }
  }

  handleMouseLeave = () => {
    this.mouseEnter();
  }

  handleClear = () => {
    this.setState({ icon: true, date: "" });
  }

  handleFocus = () => {
    this.setState({ calender: true });
  }

  // handleBlur = () => {
  //   this.setState({ calender: false });
  // }

  today = (data, type) => {
    this.setState({ date: data });
  }

  handleChage = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleEnter = (e) => {
    // console.log(e.keyCode, e.target.placeholder, "chage fired...");
    if(e.keyCode === 13 && e.target.value.trim()){
      var a = e.target.value.split("/");
      if(a.length === 3){
        // console.log(a,'a...');
        if((a[0].length <= 2 && Number(a[0]) <= 31) && (a[1].length <= 2 && Number(a[1]) <= 12) && a[2].length === 4){
          this.setState({ date: e.target.value, inputDate: e.target.value });
        } else this.setState({ date: "" , error: "invalid date format", sendDate: true });
      };
    };
  }

  render() {
    // console.log(this.state);
    return (
      <div className="app" onFocus={this.handleFocus} /*onBlur={this.handleBlur}*/ >
        <div className="input-box" onMouseEnter={this.mouseEnter} onMouseLeave={this.handleMouseLeave} >
          <input type="text" className={ this.state.error ? "error main-input" : "main-input" } placeholder={ this.state.error ||"Select Date"} name="date" value={ this.state.date } onChange={ this.handleChage } onKeyDown={ this.handleEnter } />
            {
              this.state.icon ? <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle" onClick={this.handleClear}></i>
            }
        </div>
        {
          this.state.calender ? <Calender today={this.today} date={ this.state.date } /> : null
        }

      </div>
    );
  }
}

export default App;

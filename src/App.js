import React, { Component } from 'react';
import './App.css';
import Calender from './Calender';

class App extends Component {
  constructor(){
    super();
    this.date = new Date();
    this.format = "YYYY/MM/DD";
    this.state = {
      date: this.date.toISOString().split("T")[0].split('-').join("/"),
      icon: true,
      calender: false,
      error: "",
      // sendDate: false,
    }
  }

  handleClick = () => {
    this.setState({ calender: /*!this.state.calender*/ true });
  }

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

  // handleFocus = () => {
  //   this.setState({ calender: !this.state.calender });
  // }

  // handleBlur = () => {
  //   this.setState({ calender: false });
  // }

  // date format handler function
  handleFormat = (format) => {
    this.format = format;
    this.today(this.state.date);
    // console.log(this.format, "app format fired...");
  }

  today = (data) => {
    console.log(data, this.format, "data...");
    var dta = this.date.toISOString().split("T")[0].split('-').join("/");
    var a = 'DD/MM/YYYY';
    var b = 'MM/DD/YYYY';
    var c = 'YYYY/DD/MM';
    var d = 'YYYY/MM/DD'; //current format

    if(this.format === a){
      var res = dta.split('/').reverse().join("/");
      this.setState({ date: res });
    } else if(this.format === b){
      var res = dta.split('/').splice(1).concat(dta.split('/')[0]).join('/');
      this.setState({ date: res });
    } else if(this.format === c){
      var x = dta.split('/');
      var v = x.splice(1,1);
      var res = x.concat(v).join('/');
      this.setState({ date: res });
    } else {
      this.setState({ date: dta });
    }
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
        // if((a[0].length <= 2 && Number(a[0]) <= 31) && (a[1].length <= 2 && Number(a[1]) <= 12) && a[2].length === 4){
        //   this.setState({ date: e.target.value, inputDate: e.target.value });
        // } else this.setState({ date: "" , error: "invalid date format", sendDate: true });
      };
    };
  }

  render() {
    // console.log(this.state, this.format);
    return (
      <div className="app" onClick={ this.handleClick } /*onFocus={this.handleFocus} /*onBlur={this.handleBlur}*/ >
        <div className="input-box" onMouseEnter={this.mouseEnter} onMouseLeave={this.handleMouseLeave} >
          <input type="text" className={ this.state.error ? "error main-input" : "main-input" } placeholder={ this.state.error ||"Select Date"} name="date" value={ this.state.date } onChange={ this.handleChage } onKeyDown={ this.handleEnter } />
            {
              this.state.icon ? <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle" onClick={this.handleClear}></i>
            }
        </div>
        {
          this.state.calender ? <Calender today={this.today} date={ this.state.date } handleFormat={this.handleFormat} format={this.format} />  : null
        }

      </div>
    );
  }
}

export default App;

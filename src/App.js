import React, { Component } from 'react';
import './App.css';
import Calender from './Calender';

class App extends Component {
  constructor(){
    super();
    this.format = "YYYY/MM/DD";
    this.state = {
      date: "",
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
    console.log(this.format, "app format fired...");
  }

  today = (data, type) => {
    console.log(data, this.format, "data...");
    var a = 'DD/MM/YYYY'
    var b = 'MM/DD/YYYY'
    var c = 'YYYY/MM/DD' //current format
    var d = 'YYYY/DD/MM'

    if(this.format === a){
      var res = data.split('/').reverse().join('/');
      this.setState({ date: res });
    } else if(this.format === b){
      var res = data.split('/').sort((a,b)=> b -a ).reverse().join('/');
      this.setState({ date: res });
    } else if(this.format === d){
      var arr = data.split('/');
      arr.splice(1, 2, arr[2], arr[1]);
      console.log(arr, "res....");
      this.setState({ date: arr.join('/') });
    } else {
      this.setState({ date: data });
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

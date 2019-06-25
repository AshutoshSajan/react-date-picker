import React, { Component } from 'react';
import './App.css';
import Calender from './Calender';
import { swap } from './functions/function';

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

  // date format handler function
  handleFormat = (format) => {
    this.format = format;
    this.setState({ date: "" });
    // var date = new Date(this.state.date).toLocaleDateString();
    // console.log(`%c handle format ${date}`, 'color: green');
    // this.today(this.state.date);
    // console.log(this.format, "app format fired...");
  }

  today = (data) => {
    console.log(this.state, data, "state date...");
    this.setState({ date: data })
    console.log(`%c ${data}, ${this.format} data...`, 'color: darkred');
    if(data){
      // var data = new Date(this.state.date).toLocaleDateString() || new Date(data.split('/').reverse().join()).toLocaleDateString();
      // console.log(dta, "dta....");
      // if (typeof(dta) === "string"){
        // console.log(d.getTime());
        // console.log(d, "after normat format data...");
        var a = 'DD/MM/YYYY';
        var b = 'MM/DD/YYYY';
        var c = 'YYYY/DD/MM';
        var d = 'YYYY/MM/DD'; //current format

        if(this.format === a){
          const result = data.split('/').reverse().join("/");
          console.log(result,'d/m/y date format result...');
          this.setState({ date: result });
        } else if(this.format === b){

          var result = data.split('/').splice(1).concat(data.split('/')[0]).join('/');
          console.log(result,'m/d/y date format result...');
          this.setState({ date: result });
        } else if(this.format === c){
          // var x = data.split('/');
          // var v = x.splice(1,1);
          // var result = x.concat(v).join('/');
          const result = swap(data.split('/'), 1, 2).join('/');
          this.setState({ date: result });
          console.log(result,'result...');
        } else {
          this.setState({ date: data });
        } 
      } 
    // }
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
        console.log(a,'a...');
        if((a[0].length <= 2 && Number(a[0]) <= 31) && (a[1].length <= 2 && Number(a[1]) <= 12) && a[2].length === 4){
          this.setState({
            date: e.target.value,
          });
        } else {
          this.setState({ date:"" , error:"DD/MM/YYYY Add This Date Format" });
        }
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
              /*!navigator.online && this.state.icon ?
                <span>[::]</span>
                : <span className="clear-input" onClick={this.handleClear}>+</span>
              :*/
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

import React, { Component } from 'react';
import './App.css';
import Calender from './Calender';
import { swap } from './functions/function';

class App extends Component {
  constructor(props){
    super(props);
    this.date = new Date();
    this.format = "YYYY/MM/DD";
    this.state = {
      date: this.date.toLocaleDateString(),
      icon: true,
      calender: false,
      error: "",
    }
  }

  handleClick = () => {
    this.setState({ calender: !this.state.calender });
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
  }

  today = (data) => {
    if(data){
        var a = 'DD/MM/YYYY';
        var b = 'MM/DD/YYYY';
        var c = 'YYYY/DD/MM';

        if(this.format === a){
          const result = data.split('/').reverse().join("/");
          this.setState({ date: result });
        } else if(this.format === b){

          var result = data.split('/').splice(1).concat(data.split('/')[0]).join('/');
          this.setState({ date: result });
        } else if(this.format === c){
          const result = swap(data.split('/'), 1, 2).join('/');
          this.setState({ date: result });
        } else {
          this.setState({ date: data });
        } 
      } 
  }

  handleChage = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleBlur = () => {
    this.setState({ calender: false });
  }

  render() {
    return (
      <div className="app"  >
        <div className="input-box"
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.handleMouseLeave}
          >
          <input 
            type="text" 
            className={ this.state.error ? "error main-input" : "main-input" }
            placeholder={ this.state.error ||"Select Date"}
            name="date" value={ this.state.date } 
            onChange={ this.handleChage } 
            onKeyDown={ this.handleEnter } 
            onClick={ this.handleClick }
            />
            {
              this.state.icon ?
                <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle"
                  onClick={this.handleClear}>
                </i>
            }
        </div>
        {
          this.state.calender ?
            <Calender today={this.today}
              handleFormat={this.handleFormat}
            />
          : null
        }

      </div>
    );
  }
}

export default App;
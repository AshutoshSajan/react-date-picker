import React, { Component } from 'react';
import Calender from './Calender';

class DateRange extends Component {
  constructor(){
    super();
    this.date = new Date();
    this.format = "YYYY/MM/DD";
    this.state = {
      date: this.date.toISOString().split("T")[0].split('-').join("/"),
      icon: true,
      calender: false,
      startDate: "",
      endDate: "",
      count: 0
    }
  }

  handleClick = () => {
    this.setState({ calender: true });
  }

  mouseEnter = () => {
    if(this.state.date){
      this.setState({ icon: !this.state.icon });
    }
  }

  handleFormat = (format) => {
    this.format = format;
    this.setState({ date: "" });
  }

  handleMouseLeave = () => {
    this.mouseEnter();
  }

  handleClear = () => {
    this.setState({ icon: true, startDate: "", endDate: "" });
  }

  handleChage = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  setDate = (data, name) => {
  	console.log(data, name);
  	if(data && name) {
	  	this.setState({ [name]: data , count: this.state.count + 1 });
	  	if(this.state.count === 1){
	  		this.setState({ count: 0, calender: false });
	  	}
	  }
  }

  hideCalender = () => {
  	this.setState({ calender: false });
  }

  render() {
    return (
      <div className="date-range" >
        <div className="input-box range-input-box " onMouseEnter={this.mouseEnter} onMouseLeave={this.handleMouseLeave} onClick={ this.handleClick }>
          <input type="text" className="range-input" placeholder="Start Date" name="startDate" value={ this.state.startDate } onChange={ this.handleChage } />
          <span> ~ </span>
          <input type="text" className="range-input" placeholder="End Date" name="endDate" value={ this.state.endDate } onChange={ this.handleChage } />
            {
              this.state.icon ?
                <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle" onClick={this.handleClear}></i>
            }
	      </div>
	        {
	          this.state.calender ?
		          <div style={{display: "flex"}}>
		            <Calender hideCalender={this.hideCalender} name="startDate" today={this.setDate}/>
		            <Calender hideCalender={this.hideCalender} name="endDate" today={this.setDate}/>
		          </div>
	          : null
	        }
	    </div>
    );
  }
}

export default DateRange;


import React, { Component } from 'react';
import Calender from './Calender';
// import { swap } from './functions/function';

class DateRange extends Component {
  constructor(){
    super();
    this.date = new Date();
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

  handleMouseLeave = () => {
    this.mouseEnter();
  }

  handleClear = () => {
    this.setState({ icon: true, date: "" });
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


  render() {
    return (
      <div className="date-range" >
        <div className="input-box range-input-box " onMouseEnter={this.mouseEnter} onMouseLeave={this.handleMouseLeave} onClick={ this.handleClick }>
          <input type="text" className={ this.state.error ? "error main-input" : "range-input" } placeholder={ this.state.error ||"Start Date"} name="startDate" value={ this.state.startDate } onChange={ this.handleChage } onKeyDown={ this.handleEnter } />
          <span> ~ </span>
          <input type="text" className={ this.state.error ? "error main-input" : "range-input" } placeholder={ this.state.error ||"End Date"} name="endDate" value={ this.state.endDate } onChange={ this.handleChage } onKeyDown={ this.handleEnter } />
            {
              this.state.icon ?
                <i className="far fa-calendar"></i>
              : <i className="fas fa-times-circle" onClick={this.handleClear}></i>
            }
	      </div>
	        {
	          this.state.calender ?
		          <div style={{display: "flex"}}>
		            <Calender name="startDate" today={this.setDate}/>
		            <Calender name="endDate" today={this.setDate}/>
		          </div>
	          : null
	        }
	    </div>
    );
  }
}

export default DateRange;


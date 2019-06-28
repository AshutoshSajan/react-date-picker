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
    console.log(new Date(data).toLocaleString(), 'date range local date...');

    // var a = "";

    // if (this.state.endDate) { a = data.split('/') }
    // console.log(a ,"aaaa");

  	// if(data && name) {
   //    if(this.state.startDate && name === "endDate"){
   //      console.log('%c helloo', "color: red");
   //      var start = this.state.startDate.split('/');

   //      var end = data.split('/');
   //      console.log(start, end, "aaa");

   //      end.forEach((v,i) => {
   //        if(Number(v) < + Number(start[i])){
   //          console.log(v, 'hello v...');
   //          this.setState({ startDate: data, endDate: data });
   //        }
   //      })

   //    };

   if(name === "endDate" && ""){
      this.setState({ endDate: data });
   } else if(name === "startDate"){
      this.setState({ startDate: data });
   }

      // ===============
	  	this.setState({ [name]: data , count: this.state.count + 1 });
	  	if(this.state.count === 1){
	  		// this.setState({ count: 0, calender: false });
	  	}

      // if(this.state.startDate && this.state.endDate){
      //   // this.setState({ calender: false })
      // }
      // if(this.state.endDate < this.state.startDate ){
      //   // this.setState({ endDate: this.state.endDate });
      // }
	  // }


  }

  hideCalender = () => {
  	this.setState({ calender: false });
  }

  render() {
    // console.log(this.state);
    // console.log(this.state.endDate, "inside daterange rndr...");


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


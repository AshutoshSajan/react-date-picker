import React, { Component } from 'react';

class DateFormat extends Component {
	constructor(props){
		super(props);
		console.log(this.props, this.props.handleFormat, "handleFormat...");
	}

	handleChange = (e) => {
		console.log(e.target.value);
		if(this.props.handleFormat){
			this.props.handleFormat(e.target.value)
		} else return;
	}

	render() {
		return (
			<>
			{
				this.props.handleFormat ?
					<div className="select-format">
							<select className="select-format-btn" name="options" onChange={this.handleChange} >
								<option value="YYYY/MM/DD">select date format</option>
								<option>DD/MM/YYYY</option>
								<option>MM/DD/YYYY</option>
								<option>YYYY/MM/DD</option>
								{/* <option>YYYY/DD/MM</option>*/}
							</select>
					</div>
			: <div>
					<i className="fas fa-times-circle" onClick={this.props.hideCalender}></i>
				</div>
		}
			</>
		);
	}
}

export default DateFormat;

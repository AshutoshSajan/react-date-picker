import React, { Component } from 'react';

class DateFormat extends Component {
	state = {}

	handleChange = (e) => {
		console.log(e.target.value);
	}

	render() {
		return (
			<div className="select-format">
				<select className="select-format-btn" name="options" onChange={this.handleChange} >
					<option>select date format</option>
					<option>DD/MM/YYYY</option>
					<option>MM/DD/YYYY</option>
					<option>YYYY/MM/DD</option>
					<option>YYYY/DD/MMMM</option>
				</select>
			</div>
		);
	}
}

export default DateFormat;

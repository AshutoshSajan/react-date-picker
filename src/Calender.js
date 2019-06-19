import React, { Component } from 'react';

class Calender extends Component {

	constructor(props){
		super(props);
		this.date = new Date();
		console.log(this.props, "prop in calender...")
		this.state = {
			day: this.date.getDay(),
			month: this.date.getMonth(),
			year: this.date.getFullYear(),
			weekDays: ["MON", "TUE", "WED","THU","FRI", "SAT", "SUN"],
			months: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			today: `${this.date.getFullYear()}/${ this.date.getMonth().toString().length < 2 ? "0" + this.date.getMonth(): this.date.getMonth() }/${ this.date.getDay().toString().length < 2 ? "0" + this.date.getDay() : this.date.getDay() }`,
			tableCells: 42,
			days : this.getMonthDays(this.date.getFullYear(), this.date.getMonth()),
			selectedDay: '',
			active: "active"
		}
	}

	handleClick = (e) => {
		if(e.target.dataset.key === "dec-year"){
			this.setState({ year: --this.state.year });
		} else if(e.target.dataset.key === "dec-month"){			
			if(this.state.month === 0){
				this.setState({ year: --this.state.year , month: 11 });
			} else {
				this.setState({ month: --this.state.month });
			}
		} else if(e.target.dataset.key === "inc-year"){
			this.setState({ year: ++this.state.year });
		} else if(e.target.dataset.key === "inc-month"){
			if(this.state.month === 11){
				this.setState({ year: ++this.state.year , month: 0 });
			} else {
				this.setState({ month: ++this.state.month });
			}
		}else	return null;
	}

	getMonthDays = (year, month) => {
    var date = new Date(year, month + 1, 0);
    return date.getDate();
	}

	firstDay = () => {
		const { year, month } = this.state;
		var firstDayOfMonth = new Date(year, month, 1);
		return firstDayOfMonth.toDateString();
	}

	createTable = (num) => {
		var a = [];
		for(var i = 0; i < num; i++ ){
			a.push(i);
		}
		return a;
	}

	handleDay = (e) => {
		const { innerText } = e.target;
		// this.setState({ active: "" });
		// this.setState({ active: "active" });
		const { month, year, active } = this.state;
		// e.target.classList.add(active);
		const selectedDay = `${year}/${month.toString().length < 2 ? "0" + month : month }/${innerText.length < 2 ? "0" + innerText : innerText }`;
		this.setState({ selectedDay });
		this.props.today(selectedDay);
	}

	render() {
		const { month, year, months, weekDays, today, tableCells } = this.state;
		console.log(this.state, "state rnder..., days....");

		var firstDay = this.firstDay().split(' ');
		var totalMonthDays = this.getMonthDays(year,month);
		var position = weekDays.indexOf(firstDay[0].toUpperCase()) + 1;
		console.log(firstDay[0].toUpperCase(), position, totalMonthDays);


		return (
			<div className="calender">
				{
					<div>
						<div className="calender-hdr">
							<span onClick={this.handleClick} data-key="dec-year">{"<<"}</span>
							<span onClick={this.handleClick} data-key="dec-month">{"<"}</span>
							<h3>{ months[month] } { year }</h3>
							<span onClick={this.handleClick} data-key="inc-month">{">"}</span>
							<span onClick={this.handleClick} data-key="inc-year">{">>"}</span>
						</div>
						<div className="month">
							<div className="week-days">
								{
									weekDays.map((day,idx) => (
										<span key={idx}>{day}</span>
									))
								}
							</div>

							<div className="date-table">
								{
									this.createTable(tableCells).map((v, i) => (
										v === position && v < totalMonthDays ?
											<p className={v === this.date.getDay() ? "day current-day": "day" } onClick={this.handleDay} key={i}>{ position + i }</p>
										: null
									))
								}
							</div>
							<p className="today" onClick={() => this.props.today(today)}>today</p>
						</div>

					</div>
				}
			</div>
		);
	}
}

export default Calender;

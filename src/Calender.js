import React, { Component } from 'react';
import DateFormat from './DateFormat';

class Calender extends Component {

	constructor(props){
		super(props);
		// console.log(this.props.blur, "date prop...");
		this.dateFromInput = this.props.date;
		// console.log(`%c ${this.dateFromInput.split('/')[0]} app date...`, "color: red");
		this.date = new Date();
		this.state = {
			format: this.props.format,

			day: this.date.getDay(),

			date: this.props.date ? this.props.date.split('/')[2] : this.date.getDate(),

			month: this.props.date ? this.props.date.split('/')[1] : this.date.getMonth() + 1,

			year: this.props.date ? this.props.date.split('/')[0] : this.date.getFullYear(),

			weekDays: ["SUN","MON", "TUE", "WED","THU","FRI", "SAT"],

			months: ['January','February','March','April','May','June','July','August','September','October','November','December'],

			today: `${this.date.getFullYear()}/${ this.date.getMonth().toString().length < 2 ? "0" + this.date.getMonth().toString(): this.date.getMonth() }/${ this.date.getDate().toString().length < 2 ? "0" + this.date.getDate().toString() : this.date.getDate() }`,

			tableCells: 42,

			selectedDay: `${this.date.getFullYear()}/${ this.date.getMonth().toString().length < 2 ? "0" + this.date.getMonth().toString() : this.date.getMonth() }/${ this.date.getDate().toString().length < 2 ? "0" + this.date.getDate().toString() : this.date.getDate() }`,

			active: "active",

			showMonth: false
		}
	}

	// funtion to get feb days
	// if (this.state.month === 2) {
	//     if ((this.state.year % 100 !== 0) && (this.state.year % 4 === 0) || (this.state.year % 400 === 0)) {
	//       this.febDays = 29;
	//     } else {
	//       this.febDays = 28;
	//     }
	//   }else console.log("month is not == 2");

	
	handleClick = (e) => {

		// const currentDate = `${this.state.year}/${month.toString().length < 2 ? "0" + month.toString() : month }/${date.toString().length < 2 ? "0" + date.toString() : date }`;

		if(e.target.dataset.key === "dec-year"){
			this.setState({
					year: --this.state.year,
					selectedDay: `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }`
				},
				() =>	this.props.today(this.state.selectedDay)
			);
		} else if(e.target.dataset.key === "dec-month"){
				// console.log(this.state.month,"1");			
			if(this.state.month === 1){
				// console.log(this.state.month,"2");	

				this.setState({
					year: --this.state.year,
					month: 12,
					selectedDay: `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }` 
					},
				 () => this.props.today(this.state.selectedDay));
			} else {
				this.setState({
					month: --this.state.month,
					selectedDay: `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }` 
				},
				() => this.props.today(this.state.selectedDay));
			}
		} else if(e.target.dataset.key === "inc-year"){
			this.setState({
				year: ++this.state.year,
				selectedDay: `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }`
			},
			() => this.props.today(this.state.selectedDay));
		} else if(e.target.dataset.key === "inc-month"){
				console.log(this.state.month,"1");		
			if(this.state.month === 12){
				console.log(this.state.month,"2");		
				this.setState({
					year: ++this.state.year,
					month: 1,
					selectedDay: `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }`
				},
				() => this.props.today(this.state.selectedDay));
			} else {
				this.setState({
					month: ++this.state.month,
					selectedDay: `${this.state.year}/${this.state.month.toString().length < 2 ? "0" + this.state.month.toString() : this.state.month }/${this.state.date.toString().length < 2 ? "0" + this.state.date.toString() : this.state.date }` 
				},
				() => this.props.today(this.state.selectedDay));
			}
		}else	return null;
	}

	getMonthDays = (year, month, num = 0) => {
		if(num === 0){
			var date1 = new Date(year, month, num);
    	return date1.getDate();
		} else if (num === 1){
			var date2 = new Date(year, month, num);
    	return date2.toDateString();
		} else { return null };
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
		const { month, year } = this.state;
		// console.log(`%c ${this.props.today} / ${ this.props.name }`, "color: green");
		// user selected date from calender
		const selectedDay = `${year}/${month.toString().length < 2 ? "0" + month : month }/${innerText.length < 2 ? "0" + innerText : innerText }`;

		this.setState(
			{ date: innerText, selectedDay: selectedDay },
			() => this.props.today(selectedDay, this.props.name)
			);
	}

	handleMonth = () => {
		this.setState({ showMonth: !this.state.showMonth });
	}

	selectMonth = (e) => {
		const { date, months, year, showMonth } = this.state;
		var selectedMonth = months.findIndex(v => v === e.target.innerText) + 1;
		// console.log(`%c selectedMonth ${selectedMonth}`, 'color: green');
		
		const selected = `${year}/${selectedMonth.toString().length < 2 ? "0" + selectedMonth.toString() : selectedMonth }/${date.length < 2 ? "0" + date : date }`;
		
		this.setState({
				month: selectedMonth,
				showMonth: !showMonth,
				selectedDay: selected,
		}, () => {
			this.props.today(selected);
		});
	}

	render() {
		// console.log(this.febDays,"febDays", this.state, "rndr state...");
		const { month, year, months, weekDays, today, tableCells, showMonth } = this.state;
		// to get the first day of month
		var firstDay = this.getMonthDays(year, (month - 1), 1).split(' ');

		// console.log(`%c first day ${firstDay}`, 'color:green;');
		// to get the all days of previous month
		var previousMonthDays = this.getMonthDays(year, (month - 1));
		
		// to get the all days of current month
		var currentMonthDays = this.getMonthDays(year, month);
		// console.log(`%c currentMonthDays ${currentMonthDays}`, 'color:yellow;');


		// to get the all days of next month
		// var nextMonthDays = this.getMonthDays(year, (month + 1));
		var position = weekDays.indexOf(firstDay[0].toUpperCase());
		// console.log(`%c position ${position}`, 'color:red;');

		var pastDays =  position;
		// console.log(`%c pastDays... ${ pastDays }`, 'color: blue;');

		var nextDays = tableCells - (position + currentMonthDays);
		var calender = [];
		// var popDay = pastDays + date - 1 ;

		// console.log(date, "date",pastDays,"pastDays", position, "position...", popDay, "popDay");

		// console.log(pastDays + currentMonthDays, "...////");

		// loop to add previous month days into an array
		while (pastDays > 0) { 
		  calender.push(previousMonthDays - (pastDays + 1));
		  --pastDays;
		}

		// loop to add current month days into an array
		for(var i = 1; i <= currentMonthDays; i++){
			calender.push(i);
		}

		// loop to add past month days into an array
		for(var j = 1; j <= nextDays; j++){
			calender.push(j);
		}

		return (
			<div className="calender">
				{
					<div>
						<div className="calender-hdr">
							<span onClick={this.handleClick} data-key="dec-year">{"<<"}</span>
							<span onClick={this.handleClick} data-key="dec-month">{"<"}</span>
							<h3>
								<span className="current-month" onClick={this.handleMonth}>{ months[month - 1] }</span>
								<span> { year }</span>
							</h3>
							<span onClick={this.handleClick} data-key="inc-month">{">"}</span>
							<span onClick={this.handleClick} data-key="inc-year">{">>"}</span>
						</div>

						<div className="disply-month">
							{	
								!showMonth ? null :
									months.map((month, index) => (
										<p key={index} onClick={this.selectMonth}>{month}</p>
									))
							}
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
									calender.length ?
										calender.map((DATE, index) => (
											
											<p className={
												(index < position || index >= position + currentMonthDays) ?
													"fade":
													DATE === this.date.getDate() && index === this.date.getDate() + position - 1 ?
												 	"day current-day" : "day"
												}
												onClick={
												 (index < position || index >= position + currentMonthDays) ? null : this.handleDay 
												}
												key={index}
												data-key={index+1}>
												{DATE}
												</p>
										)) : null
								}
							</div>
							<div className="calender-footer">
								<DateFormat hideCalender={this.props.hideCalender} handleFormat={this.props.handleFormat}/>
								<p className="today" onClick={() => this.props.today(today, this.props.name)}>today</p>

							</div>
						</div>

					</div>
				}
			</div>
		);
	}
}

export default Calender;

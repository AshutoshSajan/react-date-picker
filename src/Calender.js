import React, { Component } from 'react';
import DateFormat from './DateFormat';

class Calender extends Component {

	constructor(props){
		super(props);
		// console.log(this.props.date, "date prop...");
		this.dateFromInput = this.props.date;
		// console.log(this.dateFromInput.split('/')[0], "prop cal...");
		this.date = new Date();
		this.febDays = "";
		this.state = {
			format: this.props.format,
			date: this.props.date ? this.props.date.split('/')[2] : this.date.getDate(),
			day: this.date.getDay(),
			month: this.props.date ? this.props.date.split('/')[1] : this.date.getMonth() + 1,
			year: this.props.date ? this.props.date.split('/')[0] : this.date.getFullYear(),
			weekDays: ["SUN","MON", "TUE", "WED","THU","FRI", "SAT"],
			months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
			daysOfMonth: ["31", `${this.febDays || "" }`, "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],

			today: `${this.date.getFullYear()}/${ this.date.getMonth().toString().length < 2 ? "0" + this.date.getMonth(): this.date.getMonth() }/${ this.date.getDate().toString().length < 2 ? "0" + this.date.getDate() : this.date.getDate() }`,
			tableCells: 42,
			days : this.getMonthDays(this.date.getFullYear(), this.date.getMonth() + 1),
			selectedDay: "" ,
			active: "active",
			showMonth: false
			// allFormats: ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY/MM/DD", "YYYY/DD/MMMM"]
		}
	}

	// componentDidMount() {
	// 	console.log(this.state.month, "componentDidMount fired...");

	// 	if (this.state.month === 2) {
 //      if ((this.state.year % 100 !== 0) && (this.state.year % 4 === 0) || (this.state.year % 400 === 0)) {
 //        this.febDays = 29;
 //      } else {
 //        this.febDays = 28;
 //      }
 //    }else console.log("month is not == 2");
	// }

	// handleFormat = (format) => {
	// 	console.log(format, "cal frmt fired...");
	// }

	handleClick = (e) => {

		const { date, month, months, year, showMonth } = this.state;


		const currentDate = `${year}/${month.toString().length < 2 ? "0" + month : month }/${date < 2 ? "0" + date : date }`;

		// this.setState({  });

		if(e.target.dataset.key === "dec-year"){
			this.setState( (state) => {
				state.year = --state.year;
				state.selectedDay = currentDate;
			},() =>	this.props.today(this.state.selectedDay));
		} else if(e.target.dataset.key === "dec-month"){			
			if(this.state.month === 1){
				this.setState({ year: --this.state.year , month: 12 , selectedDay: currentDate }, () => this.props.today(this.state.selectedDay));
			} else {
				this.setState({ month: --this.state.month, selectedDay: currentDate }, () => this.props.today(this.state.selectedDay));
			}
		} else if(e.target.dataset.key === "inc-year"){
			this.setState({ year: ++this.state.year, selectedDay: currentDate }, () => this.props.today(this.state.selectedDay));
		} else if(e.target.dataset.key === "inc-month"){
			if(this.state.month === 12){
				this.setState({ year: ++this.state.year , month: 1 , selectedDay: currentDate}, () => this.props.today(this.state.selectedDay));
			} else {
				this.setState({ month: ++this.state.month, selectedDay: currentDate }, () => this.props.today(this.state.selectedDay));
			}
		}else	return null;
	}

	getMonthDays = (year, month, num = 0) => {
		if(num === 0){
			var date = new Date(year, month, num);
    	return date.getDate();
		} else if (num === 1){
			var date = new Date(year, month, num);
    	return date.toDateString();
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
		const { month, year, active } = this.state;
		console.log(innerText, "calender innerText...");
		// // this.setState({ active: "" });
		// // this.setState({ active: "active" });
		
		// user selected date from calender
		const selectedDay = `${year}/${month.toString().length < 2 ? "0" + month : month }/${innerText.length < 2 ? "0" + innerText : innerText }`;

		console.log(`%c calender selectedDay ${innerText}`, 'color:green; fontSize:40px;');

		this.setState((state) => {
			 	state.selectedDay = selectedDay;
			 	},() => {
				this.props.today(this.state.selectedDay);
			});
		
	}

	handleMonth = () => {
		this.setState({ showMonth: !this.state.showMonth });
	}

	selectMonth = (e) => {
		const { date,month, months, year, selectedDay, showMonth } = this.state;
		var mnth = (months.indexOf(e.target.innerText) + 1);
		// console.log(mnth, "mnth...");
		const selected = `${year}/${month.toString().length < 2 ? "0" + month : month }/${date.length < 2 ? "0" + date : date }`;

		this.setState({
				month: mnth,
				showMonth: !showMonth
		}, () => {
			console.log('bfr callback...');
			this.props.today(selected);
			console.log('aftr callback...');
		});
	}

	render() {
		// console.log(this.febDays,"febDays", this.state, "rndr state...");
		const { date ,month, year, months, weekDays, today, tableCells, showMonth } = this.state;
		// to get the first day of month
		var firstDay = this.getMonthDays(year, (month - 1), 1).split(' ');

		console.log(`%c first day ${firstDay}`, 'color:green;');
		// to get the all days of previous month
		var previousMonthDays = this.getMonthDays(year, (month - 1));
		
		// to get the all days of current month
		var currentMonthDays = this.getMonthDays(year, month);
		console.log(`%c currentMonthDays ${currentMonthDays}`, 'color:yellow;');


		// to get the all days of next month
		var nextMonthDays = this.getMonthDays(year, (month + 1));
		var position = weekDays.indexOf(firstDay[0].toUpperCase());
		console.log(`%c position ${position}`, 'color:red;');

		var pastDays =  position;
		console.log(`%c pastDays... ${ pastDays }`, 'color: blue;');

		var nextDays = tableCells - (position + currentMonthDays);
		var calender = [];
		var popDay = pastDays + date - 1 ;

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
		for(var i = 1; i <= nextDays; i++){
			calender.push(i);
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
												(index < popDay.toString().slice(0,1) || index >= (Number(popDay.toString().slice(0,1)) + currentMonthDays)) ?
													"fade":
													DATE == this.date.getDate() && index == this.date.getDate() + position - 1 ?
												 	"day current-day" : "day"
												}
												onClick={
												 (index < popDay.toString().slice(0,1) || index >= (Number(popDay.toString().slice(0,1)) + currentMonthDays)) ? null : this.handleDay 
												}
												key={index}
												data-key={index+1}>
												{DATE}
												</p>
										)) : null



											// =========================
										// 	<p className={
										// 		// (index < pastDays || index > (pastDays + currentMonthDays)) ?
										// 		// 	"fade":
										// 		DATE === date && calender.indexOf(DATE) === popDay ?
										// 		 "day current-day" : "day"
										// 		}
										// 		onClick={ /*index > pastDays || index <= (pastDays + currentMonthDays) ? */this.handleDay /*: null*/ }
										// 		key={index}
										// 		data-key={index}>{ DATE }</p>
										// )) : null
								}
							</div>
							<div className="calender-footer">
								<DateFormat handleFormat={this.props.handleFormat}/>
								<p className="today" onClick={() => this.props.today(today)}>today</p>

							</div>
						</div>

					</div>
				}
			</div>
		);
	}
}

export default Calender;

function calculatePayroll(employeeRecords) {
	return employeeRecords.reduce(
		(total, record) => total + allWagesFor.call(record),
		0
	);
}

function createEmployeeRecord(array) {
	return {
		firstName: array[0],
		familyName: array[1],
		title: array[2],
		payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployeeRecords(arrayOfArrays) {
	return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
	this.timeInEvents.push({
		type: 'TimeIn',
		hour: parseInt(dateStamp.split(' ')[1]),
		date: dateStamp.split(' ')[0],
	});
	return this;
}

function createTimeOutEvent(dateStamp) {
	this.timeOutEvents.push({
		type: 'TimeOut',
		hour: parseInt(dateStamp.split(' ')[1]),
		date: dateStamp.split(' ')[0],
	});
	return this;
}

function hoursWorkedOnDate(date) {
	let inEvent = this.timeInEvents.find((e) => e.date === date);
	let outEvent = this.timeOutEvents.find((e) => e.date === date);
	return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(date) {
	let hoursWorked = hoursWorkedOnDate.call(this, date);
	return hoursWorked * this.payPerHour;
}

function allWagesFor() {
	let allDates = this.timeInEvents.map((e) => e.date);
	return allDates.reduce(
		(total, date) => total + wagesEarnedOnDate.call(this, date),
		0
	);
}

function findEmployeeByFirstName(srcArray, firstName) {
	return srcArray.find((rec) => rec.firstName === firstName);
}

// Your code here
function createEmployeeRecord(array) {
    return {
        firstName : array[0],
        familyName : array[1],
        title : array[2],
        payPerHour: array[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    let employees = [];
    for (let array of arrayOfArrays) {
        employees.push(createEmployeeRecord(array));
    }
    return employees;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let info = dateStamp.split(" ");
    let date = info[0];
    let hour = parseInt(info[1]);
   

    let timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date
    };

    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let info = dateStamp.split(" ");
    let date = info[0];
    let hour = parseInt(info[1]);

    let timeOutEvent = {
        type: "TimeOut",
        hour: hour,
        date: date
    }

    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateEntered) {
    let inEvent = employeeRecord.timeInEvents.find(function(timeInEvent) {
        return timeInEvent.date === dateEntered;
    });

    let outEvent = employeeRecord.timeOutEvents.find(function(timeOutEvent) {
        return timeOutEvent.date === dateEntered;
    });
    

    return (outEvent.hour - inEvent.hour) / 100
   
}

function wagesEarnedOnDate(employeeRecord, dateEntered) {
    let totalHours = hoursWorkedOnDate(employeeRecord, dateEntered);
    let rate = parseInt(employeeRecord.payPerHour);

    return totalHours * rate;
}

function allWagesFor(employeeRecord) {
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return payable
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}

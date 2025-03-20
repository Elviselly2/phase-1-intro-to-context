// Your code here
// Creates an employee record from an array:
// [firstName, familyName, title, payPerHour]
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Converts an array of arrays into an array of employee records
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Adds a "TimeIn" event object to the employee's timeInEvents array.
  // The dateStamp argument should be in the format "YYYY-MM-DD HHMM"
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // Adds a "TimeOut" event object to the employee's timeOutEvents array.
  // The dateStamp argument is in the format "YYYY-MM-DD HHMM"
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return employee;
  }
  
  // Given a date string ("YYYY-MM-DD"), finds the corresponding time in/out events
  // and calculates the hours worked on that specific date.
  function hoursWorkedOnDate(employee, targetDate) {
    const timeIn = employee.timeInEvents.find(event => event.date === targetDate);
    const timeOut = employee.timeOutEvents.find(event => event.date === targetDate);
    
    // Divide by 100 to convert "HHMM" (e.g., 0900, 1700) to hours.
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Given a date, calculates the wages earned for that date.
  function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  
  // Accumulates the wages earned for all dates worked by the employee.
  function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, timeInEvent) => {
      return total + wagesEarnedOnDate(employee, timeInEvent.date);
    }, 0);
  }
  
  // Given an array of employee records, calculates the total payroll
  // by summing all wages for every employee.
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
      };
}

function createEmployeeRecords(array){
    return array.map(employeeData => createEmployeeRecord(employeeData));

}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const hoursWorked = (timeOutHour - timeInHour) / 100;
  
    return hoursWorked;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }

  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      return total + wagesEarned;
    }, 0);
  
    return totalWages;
  }

  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
      const employeeWages = allWagesFor(employeeRecord);
      return total + employeeWages;
    }, 0);
  
    return totalPayroll;
  }
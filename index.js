//general references
let timeRef = document.querySelector(".time");
const hour_Input = document.getElementById("hour-Input");
const minute_Input = document.getElementById("minute-Input");
const active_Alarms = document.querySelector(".active-Alarms");
const set_Alarm = document.getElementById("add_Alarm");

let alarms_Array = [];
let alarm_Sound = new Audio("./assets/Alarm clock.mp3");

let initial_Hour = 0,
  initial_Minute = 0,
  alarmIndex = 0;

//Append zeroes to single digits
const appendZeroes = (value) => (value < 10 ? "0" + value : value);

//Search for value in object
const searchObject = (parameter, value) => {
  let alarm_Object,
    objIndex,
    exists = false;
  alarms_Array.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarm_Object = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarm_Object, objIndex];
};

//Display Time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZeroes(date.getHours()),
    appendZeroes(date.getMinutes()),
    appendZeroes(date.getSeconds()),
  ];

  //Display time
  timeRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
  alarms_Array.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarm_Hour}:${alarm.alarm_Minute}` === `${hours}:${minutes}`) {
        alarm_Sound.play();
        alarm_Sound.loop = true;
      }
    }
  });
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZeroes(inputValue);
  }
  return inputValue;
};

hour_Input.addEventListener("input", () => {
  hour_Input.value = inputCheck(hour_Input.value);
});

minute_Input.addEventListener("input", () => {
  minute_Input.value = inputCheck(minute_Input.value);
});

//Create alarm div

const createAlarm = (alarmObj) => {
  //Keys from object
  const { id, alarm_Hour, alarm_Minute } = alarmObj;
  //Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarm_Hour}: ${alarm_Minute}</span>`;

  //checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  //Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  active_Alarms.appendChild(alarmDiv);
};

//Set Alarm
set_Alarm.addEventListener("click", () => {
  alarmIndex += 1;

  //alarmObject
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hour_Input.value}_${minute_Input.value}`;
  alarmObj.alarm_Hour = hour_Input.value;
  alarmObj.alarm_Minute = minute_Input.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarms_Array.push(alarmObj);
  createAlarm(alarmObj);
  hour_Input.value = appendZeroes(initial_Hour);
  minute_Input.value = appendZeroes(initial_Minute);
});

//Start Alarm
const startAlarm = (e) => {
  let search_Id = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", search_Id);
  if (exists) {
    alarms_Array[index].isActive = true;
  }
};

//Stop alarm
const stopAlarm = (e) => {
  let search_Id = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", search_Id);
  if (exists) {
    alarms_Array[index].isActive = false;
    alarm_Sound.pause();
  }
};

//delete alarm
const deleteAlarm = (e) => {
  let search_Id = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", search_Id);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarms_Array.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  initial_Hour = 0;
  initial_Minute = 0;
  alarmIndex = 0;
  alarms_Array = [];
  hour_Input.value = appendZeroes(initial_Hour);
  minute_Input.value = appendZeroes(initial_Minute);
};
// genral references

let timeRef = document.querySelector(".timer");
const hour_Input = document.getElementById("hourInput");
const minute_Input = document.getElementById("minuteInput");
const active_Alarms = document.querySelector(".active");
const set_Alarm = document.getElementById("set");

let alarms_Array = [];
let alarm_Sound = new Audio("/assets/Alarm clock.mp3");

let initial_Hour = 0,
  initial_Minute = 0,
  alarm_Index = 0;

// append zeroes for single digit
const appendZeroes = (value) => (value < 10 ? "0" + value : value);

// search for value in object
const searchObject = (parameter, value) => {
  let alarm_Object,
    obj_Index,
    exists = false;

  alarms_Array.forEach((alarm, index) => {
    if (alarm[parameter] === value) {
      exists = true;
      alarm_Object = alarm;
      obj_Index = index;
      return false;
    }
  });
  return [exists, alarm_Object, obj_Index];
};

//display timer
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZeroes(date.getHours()),
    appendZeroes(date.getMinutes()),
    appendZeroes(date.getSeconds()),
  ];

  timeRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  // alarm
  alarms_Array.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:{minutes}`) {
        alarm_Sound.play();
        alarm_Sound.loop();
      }
    }
  });
}



window.onload = () => {
  setInterval(displayTimer);
  initial_Hour = 0;
  initial_Minute = 0;
  alarm_Index = 0;
  alarms_Array = [];
  hour_Input.value = appendZeroes(initHour);
  minute_Input.value = appendZeroes(initMinute);
};

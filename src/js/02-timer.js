import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      if (selectedDate < Date.now()) {
          Notiflix.Notify.failure("Please choose a date in the future");
          startBtn.disabled = true;
      } else {
          startBtn.disabled = false;
      }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const onStart = () => {
    timerId = setInterval(() => {
        const dateCurrent = new Date(input.value);
        const time = dateCurrent - Date.now();
        const convertTime = convertMs(time);
        updateClock(convertTime);
        if (time <= 1000) {
            clearInterval(timerId);
        }

    }, 1000);
}

startBtn.addEventListener("click", onStart);

function addLeadingZero(value) {
    return String(value).padStart(2,'0')
};

function updateClock({ days, hours, minutes, seconds }) {
    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
};
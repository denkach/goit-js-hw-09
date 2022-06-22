// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    dateTimePickerEl: document.querySelector('#datetime-picker'),
    btnStartEl: document.querySelector('button[data-start]'),
    valueDaysEl: document.querySelector('.value[data-days]'),
    valueHoursEl: document.querySelector('.value[data-hours]'),
    valueMinutesEl: document.querySelector('.value[data-minutes]'),
    valueSecondsEl: document.querySelector('.value[data-seconds]'),
}

const { dateTimePickerEl, btnStartEl, valueDaysEl, valueHoursEl, valueMinutesEl, valueSecondsEl } = refs;
btnStartEl.disabled = true;
let currentDate = new Date();
let choosedDate = 0;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        choosedDate = selectedDates[0];

        if (choosedDate <= currentDate) {
            Notify.warning("Please choose a date in the future");
        } else {
            btnStartEl.disabled = false;
        }
        console.log(choosedDate);
      
  },
};

flatpickr(dateTimePickerEl, options);
btnStartEl.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
    const intervalTime = setInterval(() => {
        currentDate = new Date();
        const timeLeft = choosedDate - currentDate;
        

        const { days, hours, minutes, seconds } = convertMs(timeLeft);

        updateTime({ days, hours, minutes, seconds });

        if (timeLeft < 1000) {
            clearInterval(intervalTime);
            return;
        }
    }, 1000);
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateTime({ days, hours, minutes, seconds }) {
    valueDaysEl.textContent = days;
    valueHoursEl.textContent = hours;
    valueMinutesEl.textContent = minutes;
    valueSecondsEl.textContent = seconds;
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
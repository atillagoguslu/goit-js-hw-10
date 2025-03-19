import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topCenter',
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
  timeout: 3000,
});

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;

function handleOnClose(selectedDates) {
  if (selectedDates[0] <= new Date()) {
    startBtn.disabled = true;
    iziToast.show({
      title: 'Error',
      message: 'Please choose a date in the future',
      color: 'red',
    });
    return;
  }
  startBtn.disabled = false;
  userSelectedDate = selectedDates[0];
  console.log(userSelectedDate);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleOnClose,
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
  const minutes = Math.floor((ms % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((ms % minute) / second);

  return {
    days: addLeadingZero(days),
    hours: addLeadingZero(hours),
    minutes: addLeadingZero(minutes),
    seconds: addLeadingZero(seconds),
  };
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const interval = setInterval(() => {
    const currentDate = new Date();
    const difference = userSelectedDate - currentDate;
    if (difference < 0) {
      clearInterval(interval);
      return;
    }
    let { days, hours, minutes, seconds } = convertMs(difference);
    console.log(
      days,
      'days',
      hours,
      'hours',
      minutes,
      'minutes',
      seconds,
      'seconds'
    );
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
  }, 1000);
});

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('[name="delay"]');
const stateInput = document.querySelector('[name="state"]');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const delay = delayInput.value;
  const state = stateInput.value;
  const message = await returnMessage(delay, state);
  if (state === 'fulfilled') {
    iziToast.show({
      title: 'Status:',
      message: message,
      color: 'green',
      position: 'topCenter',
    });
  } else if (state === 'rejected') {
    iziToast.show({
      title: 'Status:',
      message: message,
      color: 'red',
      position: 'topCenter',
    });
  }
});

async function returnMessage(delay, state) {
  const message = await new Promise((resolve, reject) => {
    // one time timeout
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (state === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      } else {
        reject(`❌ Error in ${delay}ms`);
      }
    }, delay);
  });
  return message;
}

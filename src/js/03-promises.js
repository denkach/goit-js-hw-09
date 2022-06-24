import Notiflix from 'notiflix';    
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  firstDelayField: document.querySelector('input[name="delay"]'),
  delayStepField: document.querySelector('input[name="step"]'),
  amountField: document.querySelector('input[name="amount"]'),
}

const { formEl, firstDelayField, delayStepField, amountField } = refs;

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(firstDelayField.value);
  const amount = Number(amountField.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
       Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += Number(delayStepField.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay});
      }
    }, delay);
  })  
}


const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),

}

const { btnStart, btnStop } = refs;
const CHANGE_BG_DELAY = 1000;
let intervalId = null;

document.body.style.backgroundColor = getRandomHexColor();

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
    btnStart.disabled = true;
     btnStop.disabled = false;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, CHANGE_BG_DELAY);
}

function onBtnStopClick() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

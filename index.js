const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#3cff00', '#ff00c8', '#ff0000', '#00eeff', '#1100ff', '#00ff88'];
let time = 0;
let score = 0;
let audio = document.querySelectorAll('#audio');
let autoClickBtn = document.querySelector('#auto-click');
let stopAutoClick = document.querySelector('#stop-click');
let timer = null;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add("up");
})

autoClickBtn.addEventListener('click', startInterval);

stopAutoClick.addEventListener('click', stopInterval);

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
       time = parseInt(event.target.getAttribute('data-time'));
       screens[1].classList.add('up');
       startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
        getRandomAudio();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
    setColor(circle);
}

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor (e) {
    const color = getRandomColor();
    e.style.background = color;
    e.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function getRandomColor () {
       return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomAudio () {
    return audio[Math.floor(Math.random() * audio.length)].play();
}


function startInterval() {
    timer = setInterval(kill, 50);
    function kill() {
        let circle = document.querySelector('.circle');
        circle.click();
    }
}

function stopInterval () {
    clearInterval(timer);
}
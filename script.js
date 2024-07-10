let startTime, updatedTime,difference,tInterval,running = false, lapTimes = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

function start() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime,1);
        running = true;
        startButton.textContent = "Start";
        pauseButton.style.display = "inline";
        }
}
function pause() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;
    }
}
function reset() {
    clearInterval(tInterval);
    running = false;
    display.textContent = "00:00:00:000";
    startButton.textContent = "Start";
    pauseButton.style.display = "none;"
    lapList.innerHTML = "";
    lapTimes = [];
}

function lap() {
    if (running) {
        const lapTime = display.textContent;
        lapTimes.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 100) ? (milliseconds < 10) ? "00" + milliseconds : "0" + milliseconds : milliseconds;

    display.textContent = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
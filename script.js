let startTime;
let elapsedTime = 0;
let intervalId;
let running = false;
const laps = [];
const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsContainer = document.getElementById('laps');
const timeDisplay = document.getElementById('timeDisplay');

function updateTime() {
    const now = Date.now();
    elapsedTime += now - startTime;
    startTime = now;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600) % 12;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;

    hourHand.style.transform = `rotate(${(hours * 30) + (minutes / 2)}deg)`;
    minuteHand.style.transform = `rotate(${(minutes * 6) + (seconds / 10)}deg)`;
    secondHand.style.transform = `rotate(${seconds * 6}deg)`;

    timeDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStop() {
    if (running) {
        clearInterval(intervalId);
        running = false;
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateTime, 1000 / 60);
        running = true;
        startStopButton.textContent = 'Stop';
    }
}

function lap() {
    if (!running) return;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600) % 12;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;
    const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    laps.push(lapTime);
    renderLaps();
}

function reset() {
    clearInterval(intervalId);
    running = false;
    elapsedTime = 0;
    hourHand.style.transform = 'rotate(0deg)';
    minuteHand.style.transform = 'rotate(0deg)';
    secondHand.style.transform = 'rotate(0deg)';
    timeDisplay.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    laps.length = 0;
    renderLaps();
}

function renderLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);

let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapCounter = 1;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds for millisecond accuracy
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    stopTimer();
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCounter = 1;
    updateDisplay();
    clearLaps();
}

function updateDisplay() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    const display = document.querySelector('.display');
    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatMilliseconds(milliseconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function formatMilliseconds(milliseconds) {
    if (milliseconds < 10) {
        return '00' + milliseconds;
    } else if (milliseconds < 100) {
        return '0' + milliseconds;
    } else {
        return milliseconds;
    }
}

function lap() {
    const lapTime = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatMilliseconds(milliseconds);
    const lapList = document.querySelector('.lap-list');
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
}

function clearLaps() {
    const lapList = document.querySelector('.lap-list');
    lapList.innerHTML = '';
}

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.stop').addEventListener('click', stopTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', lap);

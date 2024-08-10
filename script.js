let interval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapNumber = 1;

function updateTime() {
    const currentTime = new Date().getTime() - startTime + elapsedTime;
    const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((currentTime % 1000) / 10);

    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('milliseconds').textContent = String(milliseconds).padStart(2, '0');
}

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        interval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(interval);
        elapsedTime += new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    elapsedTime = 0;
    isRunning = false;
    lapNumber = 1;
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('milliseconds').textContent = '00';
    document.getElementById('lapsList').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const currentTime = new Date().getTime() - startTime + elapsedTime;
        const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((currentTime % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((currentTime % 1000) / 10);

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber}: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
        document.getElementById('lapsList').appendChild(lapItem);
        lapNumber++;
    }
}

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('pauseBtn').addEventListener('click', pauseStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);
const helpPopup = document.getElementById('helpPopup');
const closePopupBtn = document.getElementById('closePopupBtn');

// Show the help popup when the page loads
window.addEventListener('load', () => {
    helpPopup.style.opacity = '1';
    helpPopup.style.transform = 'translateY(0)';
});

// Hide the help popup when the close button is clicked
closePopupBtn.addEventListener('click', () => {
    helpPopup.style.opacity = '0';
    helpPopup.style.transform = 'translateY(20px)';
});
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    } else if (event.code === 'Enter') {
        recordLap();
    } else if (event.code === 'Escape') {
        resetStopwatch();
    }
});

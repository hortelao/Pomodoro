let timer;
let pomodoro = document.getElementById("pomodoro").value * 60;
let totalTime = pomodoro; // 25 minutes in seconds
let remainingTime = totalTime;
let isRunning = false;

let shortBrake = document.getElementById("short").value * 60;
let longBrake = document.getElementById("long").value * 60;
let fase = 0;
let x = document.getElementById("myAudio"); 


function startTimer() {

    if (!isRunning) {
        document.getElementById("pauseBtn").style.display = "block";
        document.getElementById("startBtn").style.display = "none";
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("pauseBtn").style.display = "none";
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    fase = 0;
    document.getElementById("progressBar").style.stroke = "#76ABAE";
    document.getElementById("text").textContent = "Pomodoro Timer";
    document.getElementById("text").style.color = "#8e8f90";
    document.getElementById("startBtn").style.display = "block";
    document.getElementById("pauseBtn").style.display = "none";
    clearInterval(timer);
    isRunning = false;
    remainingTime = totalTime;
    updateDisplay();
}

function updateTimer() {
    remainingTime--;
    if(fase === 0) {
        document.getElementById("progressBar").style.stroke = "#429c5f";
        document.getElementById("text").textContent = "Work";
        document.getElementById("text").style.color = "#429c5f";

    }
    if (remainingTime <= 0) {
        fase++;
        x.play();
        if(fase === 1) {
            document.getElementById("progressBar").style.stroke = "#ce6038";
            document.getElementById("text").style.color = "#ce6038";
            document.getElementById("text").textContent = "Short Brake";
            
            totalTime = shortBrake;
            remainingTime = shortBrake;

        } else if(fase === 2) {
            document.getElementById("progressBar").style.stroke = "#429c5f";
            document.getElementById("text").textContent = "Work";
            document.getElementById("text").style.color = "#429c5f";
            totalTime = pomodoro;
            remainingTime = pomodoro;
        } else if(fase === 3) {
            document.getElementById("progressBar").style.stroke = "#ce3838";
            document.getElementById("text").textContent = "Long Brake";
            document.getElementById("text").style.color = "#ce3838";
            totalTime = longBrake;
            remainingTime = longBrake;
        } else {
            document.getElementById("progressBar").style.stroke = "#429c5f";
            document.getElementById("text").textContent = "Work";
            document.getElementById("text").style.color = "#429c5f";
            totalTime = pomodoro;
            remainingTime = pomodoro;
            fase = 0;
        }
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "none";
        clearInterval(timer);
        isRunning = false;
        startTimer();
    }
    updateDisplay();
}

function updateDisplay() {
    const displayMinutes = Math.floor(remainingTime / 60);
    const displaySeconds = remainingTime % 60;
    document.getElementById('timer').textContent = `${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
    const progress = (remainingTime / totalTime) * 251.2; // 251.2 is the circumference of the circle
    document.getElementById('progressBar').style.strokeDashoffset = 251.2 - progress;
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);


document.getElementById('saveSettings').addEventListener('click', saveSettings);

function saveSettings() {
    clearInterval(timer);
    pomodoro = document.getElementById("pomodoro").value * 60;
    totalTime = document.getElementById("pomodoro").value * 60;
    remainingTime = document.getElementById("pomodoro").value * 60;
    
    updateDisplay();
    shortBrake = document.getElementById("short").value * 60;
    longBrake = document.getElementById("long").value * 60;
}

updateDisplay();




export function handleRangeInput() {
    const tempoRange = document.getElementById("tempoRange");
    const tempoDisplay = document.getElementById("displayTempo");
    tempoRange.addEventListener('change', function() {    
        tempoDisplay.innerHTML = this.value
        console.log(this.value)
    })
}

export function handleTempoButtons() {
    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");
    const tempoRange = document.getElementById("tempoRange");
    const tempoDisplay = document.getElementById("displayTempo");
    function handlePlusClick() {
        incrementUp(tempoRange, tempoDisplay);
    }
    function handleMinusClick() {
        incrementDown(tempoRange, tempoDisplay);
    }
    function incrementUp(range, display) {
        range.value++;
        display.innerHTML = range.value;
        console.log(range.value)
    }
    function incrementDown(range, display) {
        range.value--;
        display.innerHTML = range.value;
        console.log(range.value)
    }
    plus.addEventListener("click", handlePlusClick);
    minus.addEventListener("click", handleMinusClick);
    
    return () => {
        plus.removeEventListener("click", handlePlusClick);
        minus.removeEventListener("click", handleMinusClick);
    }
}

// AUDIO FUNCTIONS

export function playMetronomeAudio() {
    const playBtn = document.querySelector(".playButton")
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let timeBetweenSteps = 60 / 120;
    let nextStepTime;
    let interval;
    let isPlaying = false;  
    const lookahead = 0.1;
    const timeoutDelay = 30;

    const scheduleBeep = time => {
        const osc = audioContext.createOscillator();
        osc.connect(audioContext.destination);
        osc.frequency.value = 300;
        osc.start(time);
        osc.stop(time + 0.1);
    };

    const schedule = () => {
        while (nextStepTime < audioContext.currentTime + lookahead) {
            nextStepTime += timeBetweenSteps;
            scheduleBeep(nextStepTime);
        }
    };

    function handleButtonClick() {
        console.log("isPlaying: "+isPlaying)
        if (isPlaying) {
            // Stop
            clearInterval(interval);
            isPlaying = false;
        } else {
            // Start
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            nextStepTime = audioContext.currentTime;
            interval = setInterval(schedule, timeoutDelay);
            isPlaying = true;
        }
    }

    playBtn.addEventListener("click", handleButtonClick);
    
    return () => {
        playBtn.removeEventListener("click", handleButtonClick);
        clearInterval(interval);
    };
}
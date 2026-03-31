export function handleRangeInput() {
    const tempoRange = document.getElementById("tempoRange");
    const tempoDisplay = document.getElementById("displayTempo");
    tempoRange.addEventListener('change', function() {    
        tempoDisplay.innerHTML = this.value
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
        tempoRange.dispatchEvent(new Event('change'));
    }
    function incrementDown(range, display) {
        range.value--;
        display.innerHTML = range.value;
        tempoRange.dispatchEvent(new Event('change'));
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
    const tempoRange = document.getElementById("tempoRange")
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let timeBetweenSteps = 60 / 120;
    let nextStepTime;
    let interval;
    let isPlaying = false;  
    const lookahead = 0.1;
    const timeoutDelay = 30;
    
    function scheduleBeep(time) {
        const osc = audioContext.createOscillator();
        osc.connect(audioContext.destination);
        osc.frequency.value = 380;
        osc.start(time);
        osc.stop(time + 0.1);
    };

    function schedule() {
        while (nextStepTime < audioContext.currentTime + lookahead) {
            nextStepTime += timeBetweenSteps;
            scheduleBeep(nextStepTime);
        }
    };

    function handleButtonClick() {
        console.log(isPlaying);
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
    
    function handleBpmChange() {
        const bpm = Number(document.getElementById("displayTempo").innerText);
        timeBetweenSteps = 60 / bpm; 
        console.log(bpm)
    }
    
    function handleSpaceDown(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault;
            handleButtonClick();
        }
    }
    
    playBtn.addEventListener("click", handleButtonClick);
    tempoRange.addEventListener("change", handleBpmChange);
    window.addEventListener("keydown", (handleSpaceDown));
    
    
    return () => {
        playBtn.removeEventListener("click", handleButtonClick);
        tempoRange.removeEventListener("change", handleBpmChange);
        window.removeEventListener("keydown", handleSpaceDown);
        clearInterval(interval);
    };
}
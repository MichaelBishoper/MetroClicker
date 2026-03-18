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
    
}
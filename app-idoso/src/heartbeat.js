var beatsPerMin = 60;
var maxBeats = 90;
var minBeats = 60;
var isBradycardia = false;
var isArrhythmia = false;

function smallVariation() {
    return Math.floor((Math.random() * 10) / 2);
}

function simulate() {
    setTimeout(function () {
        var variation = smallVariation();
        var upDown = Math.random();
        if (upDown > 0.5) {
            beatsPerMin += variation;
        } else {
            beatsPerMin -= variation;
        }

        if (!isArrhythmia && beatsPerMin > maxBeats) {
            beatsPerMin = maxBeats - smallVariation();
        }

        if (!isBradycardia && beatsPerMin < minBeats) {
            beatsPerMin = minBeats + smallVariation();
        }
        console.log(beatsPerMin);
        document.getElementById("beat").innerHTML = beatsPerMin;
        simulate();
    }, 1000);

}

function startArrhythmia() {
    isArrhythmia = true;
    isBradycardia = false;
    maxBeats = 220;
    minBeats = 110;
    sosClick();
}

function startBradycardia() {
    isBradycardia = true;
    isArrhythmia = false;
    maxBeats = 50;
    minBeats = 15;
    sosClick();
}

function startNormal() {
    isBradycardia = false;
    isArrhythmia = false;
    maxBeats = 60;
    minBeats = 90;
}
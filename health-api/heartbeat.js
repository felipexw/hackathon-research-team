'use strict';

var Heartbeat = function () {
    var self = this;
    self.beatsPerMin = 60;
    self.maxBeats = 90;
    self.minBeats = 60;
    self.isBradycardia = false;
    self.isArrhythmia = false;
    
    function smallVariation() {
        return Math.floor((Math.random() * 10)/2);
    }
    
    self.simulate = function() {
        setTimeout(function(){
            var variation = smallVariation();
            var upDown = Math.random();
            if (upDown > 0.5) {
                self.beatsPerMin += variation;
            } else {
                self.beatsPerMin -= variation;
            }
    
            if (!self.isArrhythmia && self.beatsPerMin > self.maxBeats) {
                self.beatsPerMin = self.maxBeats - smallVariation();
            } 
    
            if (!self.isBradycardia && self.beatsPerMin < self.minBeats) {
                self.beatsPerMin = self.minBeats + smallVariation();
            } 
            console.log(self.beatsPerMin);
            self.simulate(); 
       }, 1000);
    
    }

    self.startArrhythmia = function() {
        self.isArrhythmia = true;
        self.isBradycardia = false;
        self.maxBeats = 220;
        self.minBeats = 110;
    }

    self.startBradycardia = function() {
        self.isBradycardia = true;
        self.isArrhythmia = false;
        self.maxBeats = 50;
        self.minBeats = 15;
    }

    self.startNormal = function() {
        self.isBradycardia = false;
        self.isArrhythmia = false;
        self.maxBeats = 60;
        self.minBeats = 90;
    }

};


module.exports = Heartbeat;
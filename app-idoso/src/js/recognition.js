var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "pt-BR";

recognition.onresult = function(event) {
    console.log(event);
    for (var i = event.resultIndex; i < event.results.length; ++i) {      
        if (event.results[i].isFinal) {
            var result = event.results[i][0].transcript
            console.log("Transcrito: " + result);
        } 
    }
};
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "pt-BR";

recognition.onstart = function() {
    console.log("iniciado");
};

recognition.onresult = function(event) {
    console.log(event);
     var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {      
        if (event.results[i].isFinal) {
            var result = event.results[i][0].transcript
            console.log("Transcrito: " + result);

            // socorro
            // me ajuda
            // ajuda
            if (result.match(/socorro/ig) || result.match(/ajuda/ig)) {
                speak("Chamando Emergência.");
            }

            // quando de tomar remédio
            if (result.match(/quando/ig) || result.match(/tomar/ig)) {
                speak("Você deve tomar seu remédio às dez horas da manhã.");
            }

            // devo comprar remédio
            // está faltando medicamentos
            if (result.match(/comprar/ig) || result.match(/faltando/ig)) {
                speak("No momento você não tem remédios faltando.");
            }
        } 
    }
};

recognition.onerror = function(event) {
    console.log("deu erro!!");
    console.log(event);
};

recognition.onend = function() {
    console.log("end!!");
};
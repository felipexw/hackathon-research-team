var text;
var voices;

var text = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();

text.voiceURI = 'Google português do Brasil';
text.lang = "pt-BR";
text.localService = true;
text.voice = voices[15];

function speak(line){
    text.text = line;
    speechSynthesis.speak(text);
}
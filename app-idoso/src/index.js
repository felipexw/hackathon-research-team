function sosClick(event) {
    speak("Chamando Emergência.");
    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/api/sos',
        data: "mi ajuda poh",
        success: function(request, response) {
            console.log('Emergência chamada!!')
        },
        dataType: 'text'
      });
}
simulate();
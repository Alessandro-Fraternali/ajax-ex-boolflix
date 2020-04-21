$(document).ready(function() {

  // al click del bottone #cercatore parte una chiamata Ajax
  $("#cercatore").click( function(){
    var cercato = $("#cercatrice").val();
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "820d435b00f521ca752e8131323a5ef0",
        query: cercato
      },
      dataType: "json",
      success: function(data, stato){
        var listaFilm = data.results;
        // ciclo tutti i contenuti di listaFilm e ne prendo i parametri che mi interessano
        for (var i = 0; i < listaFilm.length; i++) {
          var titolo = listaFilm[i].title;
          var titoloOriginale = listaFilm[i].original_title;
          var lingue = listaFilm[i].original_language;
          var voto = listaFilm[i].vote_average;
          // roba di handlebars
          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          // imposto i contenuti delle variabili prese nel ciclo dentro il div di handlebars
          var context = { titolo: titolo, titoloOriginale: titoloOriginale, lingue: lingue, voto: voto};
          // stampo il div di hanldebars in main
          var html = template(context);
          $("main").append(html);
        }
      },
      error: function(){
        alert("error")
      }
    });
  });
});

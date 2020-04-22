$(document).ready(function() {

  // inizializzazione template di handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  // al click del bottone #cercatore parte una chiamata Ajax
  $("#cercatore").click( function(){
    // resetto la pagina in modo che ospiti solo gli elementi cercati
    $("main").html(" ");
    var cercato = $("#cercatrice").val(); //prendo il valore inserito dall'utente nell'input #cercatrice
    $.ajax({ // parte chiamata ajax per i film
      url: "https://api.themoviedb.org/3/search/movie", // url di riferimento
      method: "GET", // metodo usato per prendere qualcosa
      data: {
        api_key: "820d435b00f521ca752e8131323a5ef0", // codice identificativo
        query: cercato // variabile che contiene il testo inserito nell'input #cercatrice
      },
      dataType: "json", //default
      // Se la chiamata ha successo:
      success: function(data, stato){
        var listaFilm = data.results; // uso data per attingere a results e lo metto nella variabile listaFilm
        // ciclo tutti i contenuti di listaFilm e ne prendo i parametri che mi interessano
        for (var i = 0; i < listaFilm.length; i++) {
          var voto = Math.floor(voto = listaFilm[i].vote_average / 2); //divido il voto per 2
          var stelle = "";
          for (var sp = 0; sp < voto; sp++) { //SP = StellePiene
            stelle += '<i class="fas fa-star"></i>'
          };
          for (var sv = 0; sv < 5-voto; sv++) { //SV = StelleVuote
            stelle += '<i class="far fa-star"></i>'
          };
          // prendo un elemento dal film ciclato in listaFilm (data.results)
          var titolo = listaFilm[i].title;
          var titoloOriginale = listaFilm[i].original_title;
          var lingua = listaFilm[i].original_language;
          // imposto i contenuti delle variabili prese nel ciclo dentro il div di handlebars
          var context = {
            titolo: titolo,
            titoloOriginale: titoloOriginale,
            lingua: bandieraLingua(lingua),
            voto: stelle,
          };
          // stampo il div di hanldebars in main
          var html = template(context);
          $("main").append(html);
        }
      },
      error: function(){
        alert("error")
      }
    });

    // parte chiamata ajax per le serie tv
    $.ajax({
      url: "https://api.themoviedb.org/3/search/tv", // url di riferimento
      method: "GET", // metodo usato per prendere qualcosa
      data: {
        api_key: "820d435b00f521ca752e8131323a5ef0", // codice identificativo
        query: cercato // variabile che contiene il testo inserito nell'input #cercatrice
      },
      dataType: "json", //default
      // Se la chiamata ha successo:
      success: function(data, stato){
        var listaFilm = data.results; // uso data per attingere a results e lo metto nella variabile listaFilm
        // ciclo tutti i contenuti di listaFilm e ne prendo i parametri che mi interessano
        for (var i = 0; i < listaFilm.length; i++) {
          var voto = Math.floor(voto = listaFilm[i].vote_average / 2); //divido il voto per 2
          var stelle = "";
          for (var sp = 0; sp < voto; sp++) { //SP = StellePiene
            stelle += '<i class="fas fa-star"></i>'
          };
          for (var sv = 0; sv < 5-voto; sv++) { //SV = StelleVuote
            stelle += '<i class="far fa-star"></i>'
          };
          // prendo un elemento dal film ciclato in listaFilm (data.results)
          var titolo = listaFilm[i].name;
          var titoloOriginale = listaFilm[i].original_name;
          var lingua = listaFilm[i].original_language;
          var voto = listaFilm[i].vote_average;
          // imposto i contenuti delle variabili prese nel ciclo dentro il div di handlebars
          var context = {
            titolo: titolo,
            titoloOriginale: titoloOriginale,
            lingua: bandieraLingua(lingua),
            tipo: "Serie TV",
            voto: stelle
          };
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

  // funzioni

  function bandieraLingua(lingua){
    if(lingua == "en"){
      lingua = '<img src="img/gb.png">';
    }else if(lingua == "it"){
      lingua = '<img src="img/it.png">';
    }else if(lingua == "es"){
      lingua = '<img src="img/es.png">';
    }else if(lingua == "de"){
      lingua = '<img src="img/de.png">';
    }else if(lingua == "pt"){
      lingua = '<img src="img/pt.png">';
    }else if(lingua == "cn"){
      lingua = '<img src="img/cn.png">';
    }else if(lingua == "jp"){
      lingua = '<img src="img/jp.png">';
    }else {
      lingua = "X";
    }
    return lingua;
  }

});

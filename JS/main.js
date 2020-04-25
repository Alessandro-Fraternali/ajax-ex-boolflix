$(document).ready(function() {

  // Variabili globali
  // Inizializzazione template di handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  // Se premo ENTER mentre sono nella barra di ricerca
  // partono le funzioni chiamaFilm e chiamaSerie
  $('#cercatrice').keypress(function (e) {
    var key = e.which;
    if(key == 13){
      chiamaFilm();
      chiamaSerie()
    }
  })

  // al click del bottone #cercatore partono le funzioni chiamaFilm e chiamaSerie
  $("#cercatore").click( function (){
    chiamaFilm();
    chiamaSerie();
  });

  // ELENCO FUNZIONI

  // Cerca film
  function chiamaFilm(){
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
          var locandina = listaFilm[i].poster_path;
          var titoloOriginale = listaFilm[i].original_title;
          var lingua = listaFilm[i].original_language;
          var trama = listaFilm[i].overview
          // imposto i contenuti delle variabili prese nel ciclo dentro il div di handlebars
          var context = {
            titolo: titolo,
            locandina: locandinaggio(locandina),
            titoloOriginale: titoloOriginale,
            lingua: bandieraLingua(lingua),
            voto: stelle,
            trama: trama.substring(0, 120) + '[...]'
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
  }

  // Cerca serie tv
  function chiamaSerie(){
    // resetto la pagina in modo che ospiti solo gli elementi cercati
    $("main").html(" ");
    var cercato = $("#cercatrice").val(); //prendo il valore inserito dall'utente nell'input #cercatrice
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
          var locandina = listaFilm[i].poster_path;
          var titoloOriginale = listaFilm[i].original_name;
          var lingua = listaFilm[i].original_language;
          var voto = listaFilm[i].vote_average;
          var trama = listaFilm[i].overview
          // imposto i contenuti delle variabili prese nel ciclo dentro il div di handlebars
          var context = {
            titolo: titolo,
            locandina: locandinaggio(locandina),
            titoloOriginale: titoloOriginale,
            lingua: bandieraLingua(lingua),
            tipo: "Serie TV",
            voto: stelle,
            trama: trama.substring(0, 250) + '[...]'
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
  }

  // Al passaggio del mouse, le informazioni del film coprono la locandina
  $('main').on("mouseover", ".pory",
     function () {
      $(this).find(".infofilm").fadeIn(400);
  });
  // Quando il mouse lascia la locandina, le informazioni spariscono
  $('main').on("mouseleave", ".pory",
     function () {
      $(this).find(".infofilm").fadeOut(700);
  });

  // funzione per impostare la bandiera della lingua
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
      lingua = "ostrogoto antico";
    }
    return lingua;
  }

  // funzione per impostare la locandina
  function locandinaggio(locandina){
    var locandina = '<img src="https://image.tmdb.org/t/p/w185/'+locandina+'">'
    if (locandina.includes("null")) {
      locandina = '<img src="img/fail.png">';
    }
    return locandina;
  }
});

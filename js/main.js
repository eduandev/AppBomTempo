$(function() {

  // *** APIs ***
// clima, previsão 12 horas e previsão 5 dias: https://developer.accuweather.com/apis
// pegar coordenadas geográficas pelo nome da cidade: https://docs.mapbox.com/api/
// pegar coordenadas do IP: http://www.geoplugin.net
// gerar gráficos em JS: https://www.highcharts.com/demo

//apikeyt = 	"SzqMTen6C54RHwAfGyrUV2zTzCgHkhSA";

function pegarTempoAtual (localCode) {
  
    $.ajax({
      url : "http://dataservice.accuweather.com/currentconditions/v1/" + localCode + "?apikey=" + apikeyt + "&language=pt-br",
      type: "GET",
      dataType: "json",
    
      success: function(data){
     console.log(data);
      },
      error: function(){
      console.log("Erro na requisição");
      }  
    
    });
}

pegarTempoAtual (36364)


function pegarLocalUsuario (lat, long) {
  
  $.ajax({
    url : "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikeyt + "&q=" + lat +"%2C" + long + "&language=pt-br",
    type: "GET",
    dataType: "json",
  
    success: function(data){
      //var localCode = data.Key;
      //pegarTempoAtual (localCode)
      //console.log(localCode);

    },
    error: function(){
    console.log("Erro na requisição");
    }  
  
  });
}

//pegarLocalUsuario (-22.727448,-47.291195);



});

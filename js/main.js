$(function() {

  // *** APIs ***
// clima, previsão 12 horas e previsão 5 dias: https://developer.accuweather.com/apis
// pegar coordenadas geográficas pelo nome da cidade: https://docs.mapbox.com/api/
// pegar coordenadas do IP: http://www.geoplugin.net
// gerar gráficos em JS: https://www.highcharts.com/demo

let apikey = 	"SzqMTen6C54RHwAfGyrUV2zTzCgHkhSA";


  $.ajax({
    url : "http://dataservice.accuweather.com/currentconditions/v1/7894?apikey=%09" + apikey + "&language=pt-br",
    type: "GET",
    dataType: "json",
  
    success: function(data){
    console.log(data);
    },
    error: function(){
    console.log("Erro na requisição");
    }  
  
  });

});

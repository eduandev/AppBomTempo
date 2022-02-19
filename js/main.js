$(function() {

  // *** APIs ***
// clima, previsão 12 horas e previsão 5 dias: https://developer.accuweather.com/apis
// pegar coordenadas geográficas pelo nome da cidade: https://docs.mapbox.com/api/
// pegar coordenadas do IP: http://www.geoplugin.net
// gerar gráficos em JS: https://www.highcharts.com/demo

apikeyt = 	"SzqMTen6C54RHwAfGyrUV2zTzCgHkhSA"; 

var weatherObject = {
  cidade: "",
  estado: "",
  pais: "",
  temperatura: "",
  texto_clima: "",
  icone_clima: ""
};

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

function pegarCordenadasIP(){

  var lat_padrao = -22.80483179823112;
  var long_padrao = -47.24897972630037;
  
  $.ajax({
    url : "http://www.geoplugin.net/json.gp",
    type: "GET",
    dataType: "json",
  
    success: function(data){

    if(data.geoplugin_latitude && data.geoplugin_longitude){
    pegarLocalUsuario(data.geoplugin_latitude, data.geoplugin_longitude);

    }else{
        pegarLocalUsuario(lat_padrao, long_padrao);
    }
    },
    error: function(){
    console.log("Erro na requisição");
    pegarLocalUsuario(lat_padrao, long_padrao);
    } 
  });
}
   pegarCordenadasIP();

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

function pegarLocalUsuario (lat, long) {
  
  $.ajax({
    url : "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apikeyt + "&q=" + lat +"%2C" + long + "&language=pt-br",
    type: "GET",
    dataType: "json",
  
    success: function(data){
    console.log(data);
    try {
                
      weatherObject.cidade = data.ParentCity.LocalizedName;
    }
    catch{
      weatherObject.cidade = data.LocalizedName;
    }
  
    weatherObject.estado = data.AdministrativeArea.LocalizedName;
    weatherObject.pais = data.Country.LocalizedName;

    var localCode = data.Key;
    pegarTempoAtual(localCode);
    },
    error: function(){
    console.log("Erro na requisição");
    }  
  });
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

function pegarTempoAtual (localCode) {

  $.ajax({
    url : "http://dataservice.accuweather.com/currentconditions/v1/" + localCode + "?apikey=" + apikeyt + "&language=pt-br",
    type: "GET",
    dataType: "json",
    
    success: function(data){
    console.log(data);

    weatherObject.temperatura = data[0].Temperature.Metric.Value;
    weatherObject.texto_clima = data[0].WeatherText;

    var iconNumber = data[0].WeatherIcon <= 9 ? "0" + String(data[0].WeatherIcon) : String(data[0].WeatherIcon); 

    weatherObject.icone_clima = "https://developer.accuweather.com/sites/default/files/" + iconNumber + "-s.png";

    preencherClimaAgora(weatherObject.cidade,weatherObject.estado,weatherObject.pais,weatherObject.temperatura,weatherObject.texto_clima,weatherObject.icone_clima);
    },
    error: function(){
    console.log("Erro na requisição");
    }  
    
    });
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

function preencherClimaAgora(cidade,estado,pais,temperatura,texto_clima,icone_clima){

    var texto_local = cidade + ", " + estado + ". " + pais;
    $("#texto_local").text(texto_local);
    $("#texto_clima").text(texto_clima);
    $("#texto_temperatura").html(String(temperatura) + "&deg;");
    $("#icone_clima").css("background-image", "url('" + weatherObject.icone_clima + "')");
}

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//

function pegarTempo5Dias(localCode){  

  $.ajax({
    url : "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + localCode + "?apikey=" + apikeytemp + "&language=pt-br&metric=true",
    type: "GET",
    dataType: "json",

    success: function(data){
    console.log("5 dias: ", data);
    
  $('#texto_max_min').html(String(data.DailyForecasts[0].Temperature.Minimum.Value) + "&deg: /" + String(data.DailyForecasts[0].Temperature.Maximum.Value) + "&deg:");
               
    preencherTempo5Dias(data.DailyForecasts);
    },
    error: function(){
    console.log("Erro na requisição");
    gerarErros('Erro ao obter previsão de 5 dias');
    }  
  });
}


function preencherTempo5Dias(previsoes){
  $('#info_5dias').html("");

   var diasdaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

  for(var a = 0; a < previsoes.length; a++){
      var datehoje = new Date(previsoes[a].Date);
      var dia_semana = diasdaSemana[datehoje.getDay()];

      var iconNumber = previsoes[a].Day.Icon <= 9 ? "0" + String(previsoes[a].Day.Icon) : String(previsoes[a].Day.Icon); 

      iconeClima = "https://developer.accuweather.com/sites/default/files/" + iconNumber + "-s.png";
      minima = String(previsoes[a].Temperature.Minimum.Value);
      maxima = String(previsoes[a].Temperature.Maximum.Value);

      elementoHtmlDia =  '<div class="day col">';
      elementoHtmlDia += '<div class="day_inner">';
      elementoHtmlDia += '<div class="dayname">';
      elementoHtmlDia += dia_semana;
      elementoHtmlDia += '</div>';
      elementoHtmlDia += '<div style="background-image: url(\'' + iconeClima + '\')" class="daily_weather_icon"></div>';
      elementoHtmlDia += '<div class="max_min_temp">';
      elementoHtmlDia +=  minima + '&deg; / ' + maxima + '&deg;';
      elementoHtmlDia += '</div>';
      elementoHtmlDia +=  '</div>';
      elementoHtmlDia += '</div>'; 
      
      $('#info_5dias').append(elementoHtmlDia);
      elementoHtmlDia = "";
  }

}




});

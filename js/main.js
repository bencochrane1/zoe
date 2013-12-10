var cities = [
  {
    name:"Sydney, AU",
    latitude: -33.8600,
    longitude: 151.2111,
    imgId: "sydney"
  },
  {
    name:"Melbourne, AU",
    latitude: -37.8141,
    longitude: 144.9632,
    imgId: "melbourne"
  },
  {
    name:"Brisbane, AU",
    latitude: -27.4710,
    longitude: 153.0234,
    imgId: "brisbane"
  },
  {
    name:"Darwin, AU",
    latitude: -12.4628,
    longitude: 130.8417,
    imgId: "darwin"
  },
  {
    name:"Adelaide, AU",
    latitude: -34.9286,
    longitude: 138.5999,
    imgId: "adelaide"
  },
  {
    name:"Hobart, AU",
    latitude: -42.8819,
    longitude: 147.3238,
    imgId: "hobart"
  },
  {
    name:"Perth, AU",
    latitude: -31.9530,
    longitude: 115.8574,
    imgId: "perth"
  }
]


var currentCity = cities[0];


$(document).ready(function () {

  $( ".change-location" ).click(function() {
    $('#widget').fadeOut();
    $('#weekly-forecast').fadeOut();
    $('header').fadeOut();
    $('#menu-icon').fadeOut();
    $('.location-dialog').fadeIn();
  });

  $( "#location-header" ).click(function() {
    $('#widget').fadeIn();
    $('header').fadeIn();
    $('#menu-icon').fadeIn();
    $('#weekly-forecast').fadeIn();
    $('.location-dialog').fadeOut();
  });

  $( "#menu-icon" ).click(function() {
    $('#credits').fadeIn();
    $('#credits-header').fadeIn();
    $('#menu-icon').fadeOut();
  });

  $( "#credits-header" ).click(function() {
    $('#credits').fadeOut();
    $('#credits-header').fadeOut();
    $('#menu-icon').fadeIn();
  }) 

});


function renderData(data) {
  console.log(currentCity);
  $('#location h3').text(currentCity.name);
  weatherDescription = $('.weather-description');
  weatherIcon = $('#widget .weather-icon');
  dayZeroMin = $('.day-0 .min');
  dayZeroMax = $('.day-0 .max');
  dayZeroIcon = $('.day-0 .forecast-icon')
  dayOneMin = $('.day-1 .min');
  dayOneMax = $('.day-1 .max');
  dayOneIcon = $('.day-1 .forecast-icon')
  dayTwoMin = $('.day-2 .min');
  dayTwoMax = $('.day-2 .max');
  dayTwoIcon = $('.day-2 .forecast-icon')
  dayThreeMin = $('.day-3 .min');
  dayThreeMax = $('.day-3 .max');
  dayThreeIcon = $('.day-3 .forecast-icon')
  dayFourMin = $('.day-4 .min');
  dayFourMax = $('.day-4 .max');
  dayFourIcon = $('.day-4 .forecast-icon')
  dayFiveMin = $('.day-5 .min');
  dayFiveMax = $('.day-5 .max');
  dayFiveIcon = $('.day-5 .forecast-icon')
  daySixMin = $('.day-6 .min');
  daySixMax = $('.day-6 .max');
  daySixIcon = $('.day-6 .forecast-icon')

  weatherDescription.html("<h2>" + Math.round(data.currently.temperature) + "&deg;C</h2><p>" + data.currently.summary + "</p>");
  weatherIcon.html('<img src="images/' + data.currently.icon + '.svg"/>');
  dayZeroMin.html("<p>" + Math.round(data.daily.data[0].temperatureMin) + "</p>");
  dayZeroMax.html("<p>" + Math.round(data.daily.data[0].temperatureMax) + "</p>");
  dayZeroIcon.html('<img src="images/' + data.daily.data[0].icon + '.svg"/>');
  dayOneMin.html("<p>" + Math.round(data.daily.data[1].temperatureMin) + "</p>");
  dayOneMax.html("<p>" + Math.round(data.daily.data[1].temperatureMax) + "</p>");
  dayOneIcon.html('<img src="images/' + data.daily.data[1].icon + '.svg"/>');
  dayTwoMin.html("<p>" + Math.round(data.daily.data[2].temperatureMin) + "</p>");
  dayTwoMax.html("<p>" + Math.round(data.daily.data[2].temperatureMax) + "</p>");
  dayTwoIcon.html('<img src="images/' + data.daily.data[2].icon + '.svg"/>');
  dayThreeMin.html("<p>" + Math.round(data.daily.data[3].temperatureMin) + "</p>");
  dayThreeMax.html("<p>" + Math.round(data.daily.data[3].temperatureMax) + "</p>");
  dayThreeIcon.html('<img src="images/' + data.daily.data[3].icon + '.svg"/>');
  dayFourMin.html("<p>" + Math.round(data.daily.data[4].temperatureMin) + "</p>");
  dayFourMax.html("<p>" + Math.round(data.daily.data[4].temperatureMax) + "</p>");
  dayFourIcon.html('<img src="images/' + data.daily.data[4].icon + '.svg"/>');
  dayFiveMin.html("<p>" + Math.round(data.daily.data[5].temperatureMin) + "</p>");
  dayFiveMax.html("<p>" + Math.round(data.daily.data[5].temperatureMax) + "</p>");
  dayFiveIcon.html('<img src="images/' + data.daily.data[5].icon + '.svg"/>');
  daySixMin.html("<p>" + Math.round(data.daily.data[6].temperatureMin) + "</p>");
  daySixMax.html("<p>" + Math.round(data.daily.data[6].temperatureMax) + "</p>");
  daySixIcon.html('<img src="images/' + data.daily.data[6].icon + '.svg"/>');
};


var closeCitySelectionModal = function(){
  $('#widget').fadeIn();
  $('header').fadeIn();
  $('#menu-icon').fadeIn();
  $('#weekly-forecast').fadeIn();
  $('.location-dialog').fadeOut();
};


$(document).ready(function() {
  var citiesForSelection = cities.map(function(city){
    return {
      label: city.name,
      value: city.name,
      city: city
    };
  });

  $("#city").autocomplete({
    source: citiesForSelection,
    appendTo: ".location-dialog",
    focus: function( event, ui ) {},
    select: function( event, ui ) {
      currentCity = ui.item.city;
      getWeatherData(currentCity);
    }
  });

  $( "#city" ).on( "autocompletefocus", function( event, ui ) {
  } );

  function getWeatherData(city) {
   var apiKey = '2369dbdb80831f01a1faab100ad71087';
   var url = 'https://api.forecast.io/forecast/';

   if (!city) { return };

   $.getJSON(url + apiKey + "/" + city.latitude + "," + city.longitude + "?units=si&callback=?", function (data) {
      closeCitySelectionModal();
      renderData(data);
   });

   $("body").css("backgroundImage", "url(images/" + city.imgId + ".jpg)");

  }

  getWeatherData(currentCity);

});


var d=new Date();
var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
weekday[7]="Monday";
weekday[8]="Tuesday";
weekday[9]="Wednesday";
weekday[10]="Thursday";
weekday[11]="Friday";
weekday[12]="Saturday";

var dayZero = weekday[d.getDay()];
var dayOne = weekday[d.getDay()+1];
var dayTwo = weekday[d.getDay()+2];
var dayThree = weekday[d.getDay()+3];
var dayFour = weekday[d.getDay()+4];
var dayFive = weekday[d.getDay()+5];
var daySix = weekday[d.getDay()+6];

$(document).ready(function () {

  function renderDays(){
    $("#weekly-forecast .day-0 .day").html("Today");
    $("#weekly-forecast .day-1 .day").html(dayOne);
    $("#weekly-forecast .day-2 .day").html(dayTwo);
    $("#weekly-forecast .day-3 .day").html(dayThree);
    $("#weekly-forecast .day-4 .day").html(dayFour);
    $("#weekly-forecast .day-5 .day").html(dayFive);
    $("#weekly-forecast .day-6 .day").html(daySix);
  }

  renderDays();

  function makeArray() {
    for (i = 0; i<makeArray.arguments.length; i++)
    this[i + 1] = makeArray.arguments[i];
  }

  var months = new makeArray('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var yy = date.getYear();
  var year = (yy < 1000) ? yy + 1900 : yy;

  $("#date h3").html(dayZero + ", " + day + " " + months[month] + " " + year);

  function updateTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();   
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    if (seconds < 10){
      seconds = "0" + seconds;
    }

    var v = hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
      v+="PM";
    } else {
      v+="AM"
    }

    $("#date p").html(v);
  
  }

  updateTime();
  setInterval(updateTime,1000);

});

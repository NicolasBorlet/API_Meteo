$(document).ready(function() {

	$(".day, .navbar_header").hover(
        function () {
          $(this).addClass("is-active");
        },
        function () {
          $(this).removeClass("is-active");
    });

      $( "button" ).click(
        function () {
            $(this).addClass("is-select");
          });

          const settings = {
            "async": true,
            "url": "http://localhost/API-Weather/www/weather.php",
            "method": "GET",
          };
          
          $.ajax(settings).done(function (response) {
            response= JSON.parse(response);
            console.log(response.data[0].sunrise);
            console.log(response.data[0].wind_spd);
            console.log(response.data[0].city_name);
            console.log(response.data[0].precip);
            console.log(response.data[0].sunset);
          
            $('#sunrise').text(response.data[0].sunrise);
            $('#wind_speed').text(response.data[0].wind_spd*3.6+" km/h");
            $('#city').text(response.data[0].city_name);
            $('#sunset').text(response.data[0].sunset);
            $('#humidity').text(response.data[0].precip);
            $('#temp').text(response.data[0].temp+"°");
          
          });
});
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


        //Appel API
        let apiCall = function (){

          let base_url = "http://localhost/API_Meteo/www/weather.php"
          let city = document.querySelector('#search').value;

          
          fetch(base_url)
            .then((response) => 
              response.json().then((data) => {
                console.log(data);
                //Je suis obligé de mettre 2x fois data dans mes appels, je pense que la méthode que j'utilise n'est clairemenent pas la plus optimisée
                document.querySelector('#city').innerHTML = data.city_name;
                document.querySelector('#temp').innerHTML = data.data[0].temp +'°';
                document.querySelector('#wind_speed').innerHTML = data.data[0].wind_spd + ' km/h';
                document.querySelector('#sunrise').innerHTML = data.data[0].sunrise_ts;
                document.querySelector('#sunset').innerHTML = data.data[0].sunset_ts;
                document.querySelector('#humidity').innerHTML = data.data[0].precip;
              })
          )
          .catch(err => console.log('Erreur : ' + err));
        }

        //Ecouteur d'évènement
        document.querySelector('form').addEventListener('submit', function(e) {
          e.preventDefault();

          apiCall(city);
        })
});
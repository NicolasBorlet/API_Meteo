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
            $(".is-select").removeClass("is-select");
            $(this).addClass("is-select");
    });


        //Appel API
        let apiCall = function (){

          let base_url = "http://localhost/API_Meteo/www/weather.php";
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


                //Tentative de céer une fonction récupérant la date et l'affichant de manière convenue sur la page
                  // à l'aide de la méthode getDate()
                function Day(){
                const date = new Date(data.data[0].valid_date);
                const Today = date.getDate()
                document.querySelector('#date').innerHTML = "Today "+ Today;
                }

                //Switch pour modifier l'icone montrant la météo
                switch (data.data[0].weather)
                {
                  case "804" :
                    document.querySelector('#conditions').innerHTML ='cloudy' ;
                }

                //Déclaration D'une boucle "if" pour modifier le dégradé
                  if (data.data[0].temp < 10) {
                    $('body').css('background', 'linear-gradient(72.85deg, #1DA9C2 0%, #F8AD48 100%)');
                  } else if ((data.data[0].temp > 10) && (data.data[0].temp < 25)) {
                      $('body').css('background', 'linear-gradient(72.85deg, #71376E 0%, #F8AD48 100%)');
                  } else if (25 < data.data[0].temp) {
                      $('body').css('background', 'linear-gradient(72.85deg, #D9547B 0%, #F8AD48 100%)');
                  }
              })
          )
          .catch(err => console.log('Erreur : ' + err));
        }

        //Ecouteur d'évènement
        document.querySelector('form').addEventListener('submit', function(e) {
          e.preventDefault();

          apiCall(city);
        })

        //Fonctionne mais n'affiche pas la ville: Affiche soit undefined ou une ville en France si j'ajoute ",fr" à l'url d'appel de l'API
        $(document).ready(function () {
            apiCall('');
        })
});
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
          let cloudy = "<img src='C:/xampp/htdocs/API_Meteo/www/images/cloudy.svg'>"

          
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


                //Switch pour modifier l'icone montrant la météo
                switch (data.data[0].weather.code) 
                {
                  case "804" :
                    document.querySelector('#conditions').innerHTML ='cloudy' ;
                }

                //Déclaration d'une fonction pour modifier le dégradé
                $(function() {
                  var hot =["linear-gradient(72.85deg, #D9547B 0%, #F8AD48 100%)"];
                  var middle =["linear-gradient(72.85deg, #71376E 0%, #F8AD48 100%)"];
                  var cold = ["linear-gradient(72.85deg, #1DA9C2 0%, #F8AD48 100%)"];
                  var temp = document.querySelector('#temp');

                  if (temp > [25-50]) {
                    document.body.style.background = hot;
                  }
                  if (temp < [0-10]){
                    document.body.style.background = cold;
                  }
                  if (temp [10-25]){
                    document.body.style.background = middle;
                  }
                })
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
$(document).ready(function() {

	$(".day, .navbar_header").hover(
        function () {
          $(this).addClass("is-active");
        },
        function () {
          $(this).removeClass("is-active");
        }
      );

      $( "button" ).click(
        function () {
            $(this).addClass("is-select");
        });
        
        const APIKEY = '9c1b608f4d3ae3c233ae3f9f51972492';
        let city = document.querySelector('#search').value;

        //Appel API open weather avec Ville en paramètre
        let apiCall = function (city){
          let url = 'https://api.openweathermap.org/data/2.5/weather?q="${"city"}&units=metric&appid=9c1b608f4d3ae3c233ae3f9f51972492';

          fetch(url)
            .then((response) => 
              response.json().then((data) => {
                console.log(data);
                document.querySelector('#city').innerHTML= data.name;
                document.querySelector('#temp').innerHTML= data.main.temp +'°';
                document.querySelector('#wind_speed').innerHTML= data.wind.speed + ' km/h'; //+ " <i class='fas fa-wind'></i>";
                document.querySelector('#sunrise').innerHTML= data.sys.sunrise; 
                document.querySelector('#sunset').innerHTML= data.sys.sunset; 
              })
          )
          .catch(err => console.log('Erreur : ' + err));
        }

        //Ecouteur d'évènement
        document.querySelector('form').addEventListener('submit', function(e){
          e.preventDefault();
          let ville = document.querySelector('#search').value;

          apiCall(ville);
        })

        //Appel au chargement de la page
        apicall=('Chambéry');
});
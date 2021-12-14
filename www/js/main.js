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


        //Appel API open weather
        let apiCall = function (){

          let base_url="https://api.openweathermap.org/data/2.5/weather?"
          let city = document.querySelector('#search').value;
          const APIKEY = '9c1b608f4d3ae3c233ae3f9f51972492';

          let url = base_url + "q=" + city + "&appid=" + APIKEY + "&units=metric" ;
          
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
          let ville = city;

          apiCall(ville);
        })

        //Appel au chargement de la page
        apicall=('Chambéry');

});

//Test fonction pour changer l'image d'arrière plan
/*function image() {

  let temp = document.ById('temp')

  if (temp > 0){
    document.querySelector('#conditions').innerHTML = <img id="conditions" src="images/partly_cloudy.svg"/>;
  };
}*/
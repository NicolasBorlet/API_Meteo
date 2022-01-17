$(document).ready(function() {

    //Fonction hover qui permet de détecter et d'ajouter une class "is-active" aux éléments survolés"
	$(".day, .navbar_header").hover(
        function () {
          $(this).addClass("is-active");
        },
        function () {
          $(this).removeClass("is-active");
        });

    //Fonction qui permet d'ajouter la class "is-select" aux éléments cliqués
      $( "button" ).click(
        function () {
            $(".is-select").removeClass("is-select");
            $(this).addClass("is-select");
        });


        //Appel API
        let apiCall = function (){

          let base_url = "http://localhost/API_Meteo/www/weather.php";
          let city = document.querySelector('#search').value;

          //Appel de l'url et récupération des donnéees
          fetch(base_url)
            .then((response) => 
              response.json().then((data) => {
                console.log(data);
                //Appel des données qui nous intéresse et mis en place dans le HTML
                //Je suis obligé de mettre 2x fois data dans mes appels, je pense que la méthode que j'utilise n'est clairemenent pas la plus optimisée
                document.querySelector('#city').innerHTML = data.city_name;
                document.querySelector('#temp').innerHTML = data.data[0].temp +'°';
                document.querySelector('#wind_speed').innerHTML = data.data[0].wind_spd + ' km/h';
                document.querySelector('#sunrise').innerHTML = data.data[0].sunrise_ts;
                document.querySelector('#sunset').innerHTML = data.data[0].sunset_ts;
                document.querySelector('#humidity').innerHTML = data.data[0].precip;



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


                  //Création d'une boucle "Switch" pour reconnaitre le mois de l'année
                  // J'aurais pu déclarer une variable et associer chaque mois à un nombre mais je trouvais ça plus contraignant
                  function getMonthString(num)
                  {

                      var month;    //Creation d'une variable local
                      switch(num)
                      {
                          case 0:
                              month="January";
                              break;
                          case 1:
                              month="February";
                              break;
                          case 2:
                              month="March";
                              break;
                          case 3:
                              month="April";
                              break;
                          case 4:
                              month="May";
                              break;
                          case 5:
                              month="June";
                              break;
                          case 6:
                              month="July";
                              break;
                          case 7:
                              month="August";
                              break;
                          case 8:
                              month="September";
                              break;
                          case 9:
                              month="October";
                              break;
                          case 10:
                              month="November";
                              break;
                          case 11:
                              month="December";
                              break;
                      }
                      return month;
                  }
                  theDate = new Date();


                  //Création d'une variable pour récupérer le jour
                  dateVar = new Date();


                  //Appel des 2 fonctions pour afficher le jour et le mois
                  document.querySelector('#date').innerHTML = "Today " + dateVar.getDate() + " " + getMonthString(theDate.getMonth());



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
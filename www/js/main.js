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

        //Création d'une fonction qui permet de ne pas avoir de chiffre à virgule
        function decimal(x) {
            return Number.parseFloat(x).toFixed(0);
        }


        //Appel API
        let apiCall = function (){


          let base_url = "http://localhost/API_Meteo/www/weather.php";
          let city = document.querySelector('#search').value;


          //Appel de l'url et récupération des données
          fetch(base_url)
            .then((response) => 
              response.json().then((data) => {
                console.log(data);
                //Appel des données qui nous intéresse et mis en place dans le HTML
                //Je suis obligé de mettre 2x fois data dans mes appels, je pense que la méthode que j'utilise n'est clairemenent pas la plus optimisée
                document.querySelector('#city').innerHTML = data.city_name;
                document.querySelector('#temp').innerHTML = decimal(data.data[0].temp) +'°';
                document.querySelector('#wind_speed').innerHTML = data.data[0].wind_spd + ' km/h';
                document.querySelector('#sunrise').innerHTML = data.data[0].sunrise_ts;
                document.querySelector('#sunset').innerHTML = data.data[0].sunset_ts;
                document.querySelector('#humidity').innerHTML = data.data[0].precip;


                //Déclaration D'une boucle "if" pour modifier le dégradé
                  if (data.data[0].temp < 10) {
                    $('body').css('background', 'linear-gradient(72.85deg, #1DA9C2 0%, #F8AD48 100%)');
                  } else if ((data.data[0].temp > 10) && (data.data[0].temp < 25)) {
                      $('body').css('background', 'linear-gradient(72.85deg, #71376E 0%, #F8AD48 100%)');
                  } else if (25 < data.data[0].temp) {
                      $('body').css('background', 'linear-gradient(72.85deg, #D9547B 0%, #F8AD48 100%)');
                  }


                  //Déclaration boucle if pour modifier l'icone, j'ai essayé de le faire avec une boucle switch mais pas réussi
                  //Je n'ai pas mis tous les codes j'en ai englobé le maximum
                  if (data.data[0].weather.code === 800){
                      document.querySelector('#conditions').src="images/slight_touch_happyday.svg";
                  }else if ((data.data[0].weather.code > 800) && (data.data[0].weather.code <= 803))
                  {
                      document.querySelector('#conditions').src = "images/partly_cloudy.svg";
                  }else if ((data.data[0].weather.code >= 803) && (data.data[0].weather.code <= 804))
                  {
                      document.querySelector('#conditions').src = "images/cloudy.svg";
                  }else if (data.data[0].weather.code >= 900)
                  {
                    document.querySelector('#conditions').src = "images/rainy.svg";
                  }else if ((data.data[0].weather.code >= 200) && (data.data[0].weather.code <= 202))
                  {
                      document.querySelector('#conditions').src = "images/partly_day_storm.svg";
                  }else if ((data.data[0].weather.code >= 230) && (data.data[0].weather.code <= 233))
                  {
                      document.querySelector('#conditions').src = "images/thnderstorm.svg";
                  }else if ((data.data[0].weather.code >= 300) && (data.data[0].weather.code <= 302))
                  {
                      document.querySelector('#conditions').src = "images/snowy.svg";
                  }else if ((data.data[0].weather.code >= 500) && (data.data[0].weather.code <= 522))
                  {
                      document.querySelector('#conditions').src = "images/rainy.svg";
                  }else if ((data.data[0].weather.code >= 600) && (data.data[0].weather.code <= 610))
                  {
                      document.querySelector('#conditions').src = "images/snowy.svg";
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
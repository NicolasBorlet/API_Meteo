<?php

$curl = curl_init();


curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.weatherbit.io/v2.0/forecast/daily?key=d285450c69b44c8a93f6e7f1cb9d4db1&city=Hautecour&lang=fr",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_POSTFIELDS => "",
]);

//Je voulais créer une variable qui allait récupérer la valeur rentre dans l'input "city_name", puis intégrer la variable dans l'url, cela aurait permit à
//l'utilisateur de pouvoir rechercher la ville qu'il souhaite
//$city = $_GET["city_name"];
$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #:" . $err;
} else {
    echo $response;
}
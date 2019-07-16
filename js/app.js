$(document).ready(function () {
    const icons = {
        '01' : "images/jour_1.png",
        '02' : "images/jour_5.png",
        '03' : "images/jour_5.png",
        '04' : "images/jour_5.png",
        '09' : "images/jour_2.png",
        10 : "images/jour_2.png",
        11 : "images/jour_4.png",
        13 : "images/jour_2.png",
        50 : "images/jour_3.png",
    };
/**
 * retourne une icone en fonction de l'icone openweahter
 * @param {string} icon le code icon openweather
 */
    function getIcons (icon){
        let result = '';
        if(icon && icon.length >= 2){
            let icon_name  = icon.substring(0, 2);
            if (icons.hasOwnProperty(icon_name)){
                result = icons[icon.substring(0, 2)];
            }
        }
        return result;
    }
    // button function declaration
    $("#btnValider").click(function () {
        //function pour recuperer la valeur d'un champs
        let ville = $('#ville').val();
        //Appel ajax
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast',
            type: 'GET', 
            dataType: 'json',
            data: {
                q: ville,
                units: 'metric',
                APPID: '9b7f85bb1af08b932959a75449edf9c5',
            }
        }).done(function (data) {
            // get the city
            $('#recupVille').text(data.city.name);
            //modifiction of the weather data
            for (const i = 0; i <= 4; i++) {
                const weather = data.list[i];
                const icon = getIcons(weather.weather[0].icon);
                $('#bloc_' + (i + 1)).find("span.temps_min_jour").text(weather.main.temp_min);
                $('#bloc_' + (i + 1)).find("span.temps_max_jour").text(weather.main.temp_max);
                $('#bloc_' + (i + 1)).find("span.vitesse_vent_jour").text(weather.wind.speed);
                $('#bloc_' + (i + 1)).find("span.pourcentage_nuage_jour").text(weather.main.humidity);
                $('#bloc_' + (i + 1)).find("span.date_jour").text(moment(weather.dt_txt).format('ll'));
                $('#bloc_' + (i + 1)).find("span.heure").text(moment(weather.dt_txt).locale('fr').format('LT'));
                // modification of the weather icon
                $('#bloc_' + (i + 1)).find("img").attr('src', icon);
            }
        });
    })
});
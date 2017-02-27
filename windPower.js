"use strict"
function initWindPower(map, windData){
    for (var i = 0; i < windData.length; i++) { 
        if(parseFloat(windData[i][15]) > 5.0){
            var positionM = {lat: parseFloat(windData[i][1]), lng: parseFloat(windData[i][2])};
            var marker = new google.maps.Marker({
                position: positionM,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: 'green',
                    fillOpacity: 0.6,
                    strokeWeight: 1,
                }
            });
        }
    }
}
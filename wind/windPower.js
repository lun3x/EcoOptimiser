"use strict"
function initWindPower(map, windData) {
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

function getBestLocations(windData) {
    windData.sort(function (a, b) {
        if (a[15] < b[15]) {
            return -1;
        }
        if (a[15] > b[15]) {
            return 1;
        }
        return 0;
    });
    
    return windData.slice(0, 3);
}
"use strict"

function initWindPower(map, windData) {
    var windMarkers = [];
    for (var i = 0; i < windData.length; i++) { 
        if (parseFloat(windData[i][15]) > 5.7) {
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
                },
                title: windData[i][0],
            });
            windMarkers.push(marker);
        }
    }
    return windMarkers;
}

function getBestWindLocations(windData) {
    windData.sort(function (a, b) {
        if (a[15] < b[15]) {
            return -1;
        }
        if (a[15] > b[15]) {
            return 1;
        }
        return 0;
    }).reverse();
    
    var locData = windData.slice(0,3);
    for (var i = 1; i < 4; i++){
        document.getElementById("windLoc" + i).innerHTML = locData[i-1][0];
    }
    return windData.slice(0, 3);
}

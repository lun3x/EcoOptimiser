"use strict"

function initTidalPower(map, tideData) {
    for (var i = 0; i < tideData.length; i++) { 
        if (parseFloat(tideData[i][3]) > 6.0){
            
            var positionM = {lat: parseFloat(tideData[i][1]), lng: parseFloat(tideData[i][2])};
            
            var marker = new google.maps.Marker({
                position: positionM,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: 'grey',
                    fillOpacity: 0.6,
                    strokeWeight: 1,
                }
            });
        }
    }
}

function getBestTidalLocations(tideData) {
    tideData.sort(function (a, b) {
        if (a[3] < b[3]) {
            return -1;
        }
        if (a[3] > b[3]) {
            return 1;
        }
        return 0;
    });
    
    var locData = tideData.slice(0,3);
    
    for (var i = 1; i < 4; i++) {
        document.getElementById("tidalLoc" + i).innerHTML = locData[i-1][0];
    }
    return tideData.slice(0, 3);
}

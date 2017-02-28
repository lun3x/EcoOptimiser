'use strict'

function getViablePlaces(windData) {
    var viables = [];
    for (var i = 0; i < windData.length; i++) {
        if (parseFloat(windData[i][15]) > 5.6) {
            viables.push(windData[i]);
        }
    }
    return viables;
}

function initWindPower(map, windData) {
    var windMarkers = [];
    var viables = getViablePlaces(windData);
    for (var i = 0; i < viables.length; i++) { 
        var positionM = {lat: parseFloat(viables[i][1]), lng: parseFloat(viables[i][2])};

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
            title: viables[i][0],
            id: i,
        });
        
        addWindPlaceToMarker(marker, viables[i]);
        
        windMarkers.push(marker);
    }
    
    return windMarkers;
}

function addWindPlaceToMarker(marker, place) {
    marker.addListener('click', function() {
        fillInInfoPage(place[0], "wind", place);
        
        document.getElementById('page2').style.display = "block";

        document.getElementById("placetitle").className = "w3-green";
        document.getElementById("potentialenergyyearly").className = "w3-green";
        
        $('html, body').animate({
                scrollTop: $("#page2").offset().top
        }, 750);
    });
}

function initWindFarms(map, windFarmData) {
    var windFarmMarkers = [];
    for (var i = 0; i < windFarmData.length; i++) {
        var positionM = {lat: parseFloat(windFarmData[i][3]), lng: parseFloat(windFarmData[i][4])};
        var marker = new google.maps.Marker({
            position: positionM,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 2,
                fillColor: 'green',
                fillOpacity: 1,
                strokeWeight: 0,
            },
            title: windFarmData[i][0],
        });
        windFarmMarkers.push(marker);
    }
    return windFarmMarkers;
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
    
    var locData = windData.slice(0, 3);
    for (var i = 1; i < 4; i++){
        document.getElementById("windLoc" + i).innerHTML = locData[i-1][0];
    }
    return windData.slice(0, 3);
}

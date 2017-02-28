"use strict"

function getViablePlaces(tideData) {
    var viables = [];
    for (var i = 0; i < tideData.length; i++) {
        if (parseFloat(tideData[i][3]) > 6.0) {
            viables.push(tideData[i]);
        }
    }
    return viables;
}

function initTidalPower(map, tideData) {
    var tidalMarkers = [];
    var viables = getViablePlaces(tideData);
    for (var i = 0; i < viables.length; i++) {       
        var positionM = {lat: parseFloat(viables[i][1]), lng: parseFloat(viables[i][2])};

        var marker = new google.maps.Marker({
            position: positionM,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: 'grey',
                fillOpacity: 0.6,
                strokeWeight: 1,
            },
            title: viables[i][0],
        });

        addTidalPlaceToMarker(marker, viables[i]);

        tidalMarkers.push(marker);
    }
    return tidalMarkers;
}

function addTidalPlaceToMarker(marker, place) {
    marker.addListener('click', function() {
        fillInInfoPage(place[0], "tidal", place);
        
        document.getElementById('page2').style.display = "block";

        document.getElementById("placetitle").className = "w3-grey";
        document.getElementById("potentialenergyyearly").className = "w3-grey";
        
        $('html, body').animate({
                scrollTop: $("#page2").offset().top
        }, 750);
    });
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
    
    var locData = tideData.reverse().slice(0,3);
    
    for (var i = 1; i < 4; i++) {
        document.getElementById("tidalLoc" + i).innerHTML = locData[i-1][0];
    }
    return tideData.slice(0, 3);
}

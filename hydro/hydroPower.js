'use strict'
//hydroData[9] = Latitude
//hydroData[10] = Longitude
//hydroData[6] = meanFlow

function getUpperQuartile(hydroData){
    hydroData.sort(function (a, b) {
        if (a[6] > b[6]){
            return 1;
        }
        if (a[6] < b[6]){
            return -1;
        }
        return 0;
    });
    
    var upperQuartile = parseInt((hydroData.length+1)*0.97);
    var upperQuartData = hydroData.slice(upperQuartile, hydroData.length+1);
    
    return upperQuartData;
}

function initHydroPower(map, hydroData){
    var hydroMarkers = [];
    var upperQuartile = getUpperQuartile(hydroData);
    for (var i = 0; i < upperQuartile.length; i++) { 
        var positionM = {lat: parseFloat(upperQuartile[i][9]), lng: parseFloat(upperQuartile[i][10])};
        
        var marker = new google.maps.Marker({
            position: positionM,
            map: map,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                fillColor: 'blue',
                fillOpacity: 0.6,
                strokeWeight: 1,
            },
            title: upperQuartile[i][2]
        });
        
        addHydroPlaceToMarker(marker, upperQuartile[i]);
        
        hydroMarkers.push(marker);
    }
    return hydroMarkers;
}

function addHydroPlaceToMarker(marker, place) {
    marker.addListener('click', function() {
        fillInInfoPage(place[2], "hydro", place);
        
        document.getElementById('page2').style.display = "block";
        
        document.getElementById("placetitle").className = "w3-blue";
        document.getElementById("potentialenergyyearly").className = "w3-blue";

        $('html, body').animate({
                scrollTop: $("#page2").offset().top
        }, 750);
    });
}

function getBestHydroLocations(hydroData) {
    hydroData.sort(function (a, b) {
        if (a[6] < b[6]) {
            return -1;
        }
        if (a[6] > b[6]) {
            return 1;
        }
        return 0;
    });
    
    var locData = hydroData.reverse().slice(0, 3);
    
    for (var i = 1; i < 4; i++) {
        document.getElementById("hydroLoc" + i).innerHTML = "River: " + locData[i-1][1] + " | Location: " + locData[i-1][2];
    }
    
    return hydroData.slice(0, 3);
}

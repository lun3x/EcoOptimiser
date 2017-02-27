"use strict"
//hydroData[9] = Latitude
//hydroData[10] = Longitude
//hydroData[6] = meanFlow
function calculateUpperQuartile(hydroData){
    var meanFlow = []
    for (var i = 0; i < hydroData.length; i++) { 
        meanFlow.push(hydroData[i][6]);
    }
    meanFlow.sort();
    var upperQuartile = parseInt((meanFlow.length+1)*0.75);
    var upperQuartData = [];
    for (var j = upperQuartile; j < hydroData.length; j++){
        upperQuartData.push(meanFlow[j]);
    }
    return upperQuartData;
}

function initHydroPower(map, hydroData){
    var upperQuartile = calculateUpperQuartile(hydroData);
    for (var i = 0; i < hydroData.length; i++) { 
        if(parseFloat(hydroData[i][6]) > upperQuartile[0]){
            var positionM = {lat: parseFloat(hydroData[i][9]), lng: parseFloat(hydroData[i][10])};
            var marker = new google.maps.Marker({
                position: positionM,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: 'blue',
                    fillOpacity: 0.6,
                    strokeWeight: 1,
                }
            });
        }
    }
}

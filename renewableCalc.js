"use strict"


//Predicted turbine outputs:
// Scilly: 2,945,327 kWh
// Tiree: 2,567,033 kWh
// Shetland Islands: 2,427,124 kWh


function hydroPower(volumeFlow){
    var efficiency = 0.9;
    var density = 1000;
    var fallingHeight = 50;
    var gravAccel = 9.81;
    
    var kiloWatts = efficiency * density * fallingHeight * gravAccel * 60 * 60;
    
    return Math.floor(kiloWatts);
}

function tidalPower(tideChange){
    var gravAccel = 9.81;
    var barrageBasin = 1000;
    var densitySW = 1025;
    var efficiency = 0.8;
    
    var kiloWatts = 0.5 * barrageBasin * gravAccel * densitySW * tideChange * tideChange * 86400 * 2 * efficiency;
    
    return Math.floor(kiloWatts); 
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Scilly: 2,945,327 kWh
// Tiree: 2,567,033 kWh
// Shetland Islands: 2,427,124 kWh

function fillInInfoPage(placeTitle, energyType, energyData) {
    document.getElementById("placetitle").innerHTML = placeTitle;
    document.getElementById("energytype").innerHTML = energyType;
    var potentialValue;
    
    switch (energyType) {
        case "wind":
            switch (placeTitle) {
                case "Scilly":
                    potentialValue = "2,945,327";
                    break;
                case "Tiree":
                    potentialValue = "2,567,033";
                    break;
                case "Shetland Island":
                    potentialValue = "2,427,124";
                    break;
            }
            break;
        case "tidal":
            potentialValue = tidalPower(energyData[3]);
            break;
        case "hydro":
            potentialValue = hydroPower(energyData[6]);
            break;
    }
    
    document.getElementById("potentialenergyyearly").innerHTML = numberWithCommas(potentialValue) + " kWh";
}
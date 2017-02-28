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
    
    return Math.floor(kiloWatts / 1000);
}

function tidalPower(tideChange){
    var gravAccel = 9.81;
    var barrageBasin = 1000;
    var densitySW = 1025;
    var efficiency = 0.8;
    
    var kiloWatts = 0.5 * barrageBasin * gravAccel * densitySW * tideChange * tideChange * 86400 * 2 * efficiency;
    
    return Math.floor(kiloWatts / 1000); 
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Scilly: 2,945,327 kWh
// Tiree: 2,567,033 kWh
// Shetland Islands: 2,427,124 kWh

function fillInInfoPage(placeTitle, energyType, energyData) {
    document.getElementById("placetitle").innerHTML = placeTitle;
    document.getElementById("potentialenergytext").innerHTML = "of " + energyType + " energy could potentially be produced per year!";
    var dataSource = "Data sources: ";
    var potentialValue;
    var url = "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyArmSsMW1jE6PGnwFVljdROcq7LIejxGMw&size=900x300&maptype=hybrid&zoom=12&scale=2&center=";
    
    switch (energyType) {
        case "wind":
            switch (placeTitle) {
                case "Scilly":
                    potentialValue = "2945327";
                    break;
                case "Tiree":
                    potentialValue = "2567033";
                    break;
                case "Shetland Island":
                    potentialValue = "2427124";
                    break;
            }
            url += energyData[1] + "," + energyData[2];
            dataSource += "<br> Information on viability of wind farms: http://windeis.anl.gov/guide/basics/ <br> Wind speed data: http://www.rensmart.com/Weather/WindArchive#monthlyLayer";
            break;
        case "tidal":
            potentialValue = tidalPower(energyData[3]);
            url += energyData[1] + "," + energyData[2];
            dataSource += "<br> Tidal height difference data: https://www.bodc.ac.uk/data/hosted_data_systems/sea_level/uk_tide_gauge_network/processed/";
            break;
        case "hydro":
            potentialValue = hydroPower(energyData[6]);
            url += energyData[9] + "," + energyData[10];
            dataSource += "<br> Daily gauge flow river data: ";
            break;
    }
    
    $("#satellitepic").attr("src", url);
    document.getElementById("potentialenergyyearly").innerHTML = numberWithCommas(potentialValue) + " kWh";
    document.getElementById("datasources").innerHTML = dataSource;
}
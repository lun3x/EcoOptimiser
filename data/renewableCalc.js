"use strict"

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
    var  kiloWatts = barrageBasin * densitySW * gravAccel * tideChange * tideChange * efficiency * 365;
    
    return Math.floor(kiloWatts); 
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    document.getElementById("energyInHouses").innerHTML = "This would power " + numberWithCommas(numberOfHome(potentialValue)) + " homes every year!";
    document.getElementById("energyInOil").innerHTML = "This is equivalent to " + numberWithCommas(barrelsOfOilConv(potentialValue)) + " barrels of oil every year! This is valued at &pound" + numberWithCommas(valueOfOil(barrelsOfOilConv(potentialValue))) + "!";
}

function barrelsOfOilConv(kiloWatts){
    return parseInt(kiloWatts/1628);
}

function numberOfHome(kiloWatts){
    return parseInt(kiloWatts/3600);
}

function valueOfOil(barrels){
    return parseInt(barrels*53.92*0.8);
}
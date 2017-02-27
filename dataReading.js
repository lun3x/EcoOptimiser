/*$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8000/WindSpeed.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});*/

function processData(data) {
    var result = $.csv.toArrays(data);
    return(result);
}

$(document).ready(function () {
    var ApiKey = "490204d27c988ccb9e991f177de168ad";
    var requestURL = "https://developers.zomato.com/api/v2.1/geocode";



    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {

            x = position.coords.latitude;
            y = position.coords.longitude;
            ajaxCall(x, y);
        });
    } else {
        console.log("doesn't work")
    }

    function ajaxCall(x, y) {

        $.ajax(requestURL + "?lat=" + x + "&lon=" + y,
            {
                type: "GET",
                success: geoLoc,
                headers: {
                    "user-key": "490204d27c988ccb9e991f177de168ad"
                }
            });
    }

    function geoLoc(response) {
        console.log(response);
    }

});
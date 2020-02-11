
var x;
var y;

$(document).ready(function () {
    var ApiKey = "490204d27c988ccb9e991f177de168ad";
    var requestURL = "https://developers.zomato.com/api/v2.1/geocode";



    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log(position);
            // console.log(position.coords.latitude);
            // console.log(position.coords.longitude);
            x = position.coords.latitude;
            y = position.coords.longitude;
        });
    } else {
        console.log("doesn't work")
    }





    $.ajax(requestURL + "?api-key=" + ApiKey + "&lat=" + lat + "&lon=" + lon,
        {
            method: "GET",
            success: geoLoc,
        }



    // // /Example
    // var settings = {
    //   async: true,
    //   crossDomain: true,
    //   url: "https://ip-geo-location.p.rapidapi.com/ip/37.140.128.11?format=json",
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
    //     "x-rapidapi-key": "ca48c06477mshca75f4e1c6d9d69p1aaabbjsn3192200da84b"
    //   }
    // };

    // // $.ajax(settings).done(function (response) {
    // //   $("#results").text(response.city.name);

    // //   console.log(response);
});
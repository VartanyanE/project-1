
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

    function geoLoc(data) {
        console.log(data);
        var restaurants = [data.nearby_restaurants[0].restaurant.name, data.nearby_restaurants[1].restaurant.name, data.nearby_restaurants[2].restaurant.name, data.nearby_restaurants[3].restaurant.name, data.nearby_restaurants[4].restaurant.name,
        data.nearby_restaurants[5].restaurant.name, data.nearby_restaurants[6].restaurant.name, data.nearby_restaurants[7].restaurant.name, data.nearby_restaurants[8].restaurant.name];

        // console.log(restaurants);
        for (let i = 0; i < restaurants.length; i++) {
            var name = $('<h5>');
            name.text(restaurants[i]);
            $('#name').append(name);
            console.log(restaurants[i]);
        }

    }

});

$(document).ready(function () {
    // var ApiKey = "490204d27c988ccb9e991f177de168ad";
    // var requestURL = "https://developers.zomato.com/api/v2.1/geocode";
    var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food";


    // $('#money-btn').click(function () {

    //     var money = $('#money').val();

    //     if (money <= '25.00') {

    //         if (money <= 25.00) {

    //             if (money > 26.00, 26) {

    //                 var modal = document.getElementById("myModal");

    //                 var btn = document.getElementById('money-btn');

    //                 var span = document.getElementsByClassName("close")[0];

    //                 btn.onclick = function () {
    //                     modal.style.display = "block";
    //                 }

    //                 span.onclick = function () {
    //                     modal.style.display = "none";
    //                 }

    //                 window.onclick = function (event) {
    //                     if (event.target == modal) {
    //                         modal.style.display = "none";
    //                     }
    //                 }
    //             }

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {

            x = position.coords.latitude;
            y = position.coords.longitude;

            yelpLocation(x, y)

        });
    } else {
        console.log("doesn't work")
    }




    function yelpLocation(x, y) {

        $.ajax(yelpUrl + "&latitude=" + x + "&longitude=" + y,
            {

                headers: {
                    Authorization:
                        "Bearer GGKInxcrN9s2C6wXxP4rKWkvrs_86igKC3pHY69hh8Odjb8DNWW3YeVzLZccB-hynav7Ac-vE1bqPnAKRCa6y1QNHT10XIjOXfGsxsA7SdZ3L88CoX_6SFKjk9FEXnYx"
                },
                method: "GET",
                success: yelpCall

            });
    }


    function yelpCall(yelpData) {
        console.log(yelpData);
        yelpData.businesses.forEach(function (arrayData) {
            var name = $('<div>');
            var link = $("<a></a>");
            var showResults = $('#showResults');
            link.attr("href", arrayData.url);
            name.addClass('name');
            // name.attr('data-id', arrayData.id);
            name.text(arrayData.name + ' has a ' + arrayData.rating + ' star rating');

            var image = $('<img>');
            image.addClass("image");
            image.attr("src", arrayData.image_url);
            image.attr("href", arrayData.url);
            $('.image').append(link);
            $(showResults).append(image, name);


        })


    }
    // function ajaxCall(x, y) {

    //     $.ajax(requestURL + "?lat=" + x + "&lon=" + y,
    //         {
    //             type: "GET",
    //             success: geoLoc,
    //             headers: {
    //                 "user-key": "490204d27c988ccb9e991f177de168ad"
    //             }
    //         });
    // }

    // function geoLoc(data) {
    //     data.nearby_restaurants.forEach(function (x, ind, arr) {


    //         var name = $('<div>');
    //         name.addClass('name');
    //         name.attr('data-id', x.restaurant.id);
    //         name.text(x.restaurant.name);
    //         $('#showResults').append(name);
    //     })
    // }
    // }
    //         }
    //     })

});
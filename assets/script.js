// $("#submit-btn").click(function () {
// var ApiKey = "490204d27c988ccb9e991f177de168ad";
// var requestURL = "https://developers.zomato.com/api/v2.1/geocode";
var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food";

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
                    "Bearer y9ss5NF_aALqyqZ6T5XUvxnu3cPPlRQBBucLsGR_k0TVxhglsuLP0szHwxzHAIQ5VGBQlqknbSoxBlV440oZoAqFJhLyKoKSDaVKx_Yirpi6M5Nwa0I59RoEMY5IXnYx"
            },
            method: "GET",
            success: yelpCall

        });
}

function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}

function yelpCall(yelpData) {
    console.log(yelpData);
    var $results = $('#showResults');
    $results.html("");
    var businesses = chunk(yelpData.businesses, 3);
    console.log(businesses);
    businesses.forEach(function (row) {
        var $row = $('<div>');
        $row.addClass('row');
        row.forEach(function (business) {
            // console.log(business);
            var $col = $('<div>');
            $col.addClass('four columns');

            var $card = $('<div>');
            $card.addClass("card");
            var $img = $('<img>');


            $img.attr("src", business.image_url);
            $img.attr("alt", business.name);

            $card.append($img);
            $img.on('click', function () {
                window.location.href = business.url;
            });


            var $name = $('<strong>');
            $name.text(business.name);
            $card.append($name);

            var location = business.location;
            var $address = $('<p>');
            $address.append(location.address1);
            var address2 = (location.city + ", " + location.state + " " + location.zip_code);
            $address.append('<br>');
            $address.append(address2);
            $card.append($address);

            $col.html($card);
            $row.append($col);
        });
        $results.append($row);
    });

    // yelpData.businesses.forEach(function (arrayData) {

    // var name = $('<div>');
    // name.addClass('name');
    // // name.attr('data-id', arrayData.id);
    // name.text(arrayData.name + ' has a ' + arrayData.rating + ' star rating');

    // var image = $('<img>');
    // image.addClass("image");
    // image.attr("src", arrayData.image_url);
    // $('#showResults').append(name, image);

    // })


}

// });
$("#submit-btn").click(function () {


    // The URL for the yelp API
    var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food";

    //  Geolocation API
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Storing the current latitude and longitude in variables

            x = position.coords.latitude;
            y = position.coords.longitude;
            //Calling the function that makes the AJAX call for the Yelp API and passing the lat and lon variables
            yelpLocation(x, y)
        });
    } else {
        console.log("doesn't work")
    }

    // Ajax call for the Yelp API, it takes the latitude and longitude as parameters
    function yelpLocation(x, y) {
        $.ajax(yelpUrl + "&latitude=" + x + "&longitude=" + y, {
            headers: {
                Authorization: "Bearer y9ss5NF_aALqyqZ6T5XUvxnu3cPPlRQBBucLsGR_k0TVxhglsuLP0szHwxzHAIQ5VGBQlqknbSoxBlV440oZoAqFJhLyKoKSDaVKx_Yirpi6M5Nwa0I59RoEMY5IXnYx"
            },
            method: "GET",
            success: yelpCall
        });
    }

    // Function that will let us determine how many results we want to display per row
    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }

    // Function that renders our results
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
                var $col = $('<div>');
                $col.addClass('four columns');
                var $card = $('<div>');
                $card.addClass("card");
                var $img = $('<img>');
                var $link = $('<img>');
                $link.attr("src", "./assets/burst_icon@2x.png");
                $link.attr("id", "logo");
                $img.attr("src", business.image_url);
                $img.attr("alt", business.name);
                $card.append($img);
                $img.on('click', function (e) {
                    e.preventDefault();
                    window.location.href = business.url;
                });
                $link.on('click', function (e) {
                    e.preventDefault();
                    window.location.href = "https://www.yelp.com"
                })
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
                $card.append($link);
                $col.html($card);
                $row.append($col);
            });
            $results.append($row);
        });

    }
});
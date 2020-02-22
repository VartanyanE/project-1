$("#submit-btn").click(function () {
    // var ApiKey = "490204d27c988ccb9e991f177de168ad";
    // var requestURL = "https://developers.zomato.com/api/v2.1/geocode";

    // The query URL for the yelp API
    var yelpUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food";


    // The Geolocation API function
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {

            // Storing the current latitude and longitude in variables
            x = position.coords.latitude;
            y = position.coords.longitude;

            //  Calling the function that has the Yelp AJAX call that gets the current location, and takes the latitude and longitude as parameters
            yelpLocation(x, y)
        });
    } else {
        console.log("doesn't work")
    }


    // The Yelp location function
    function yelpLocation(x, y) {
        $.ajax(yelpUrl + "&latitude=" + x + "&longitude=" + y, {
            headers: {
                Authorization: "Bearer y9ss5NF_aALqyqZ6T5XUvxnu3cPPlRQBBucLsGR_k0TVxhglsuLP0szHwxzHAIQ5VGBQlqknbSoxBlV440oZoAqFJhLyKoKSDaVKx_Yirpi6M5Nwa0I59RoEMY5IXnYx"
            },
            method: "GET",
            success: yelpCall
        });
    }
    // Function that lets us determine how many results per row we will render
    function chunk(arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    }
    // Function that fetches our data and renders the results
    function yelpCall(yelpData) {


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
                var $link = $('<img>');
                $link.attr("src", "./assets/burst_icon@2x.png");
                $link.attr("id", "logo");
                $img.attr("src", business.image_url);
                $img.attr("alt", business.name);
                $card.append($img);
                $img.on('click', function (e) {
                    e.preventDefault();
                    modal1.style.display = "block";
                    $('#submit-btn1').on('click', function () {
                        // window.open(business.url, '_blank');
                        // window.location.reload();
                        // return false;

                    })
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
                $card.append($link);
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
});

// Variables for our modals
var modal = document.getElementById("myModal");
var btn = document.getElementById("modalBtn");
var modal1 = document.getElementById("myModal1");
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close1")[0];

// Onclick functions for our modals

btn.onclick = function () {
    modal.style.display = "block";
}


span.onclick = function () {
    modal.style.display = "none";
}

span1.onclick = function () {
    modal1.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}


// Functions for the TOP button
mybutton = document.getElementById("topButton");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topReturn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}


// Event Listener for the input field that runs the search by location AJAX call 
$('.searchForm').on('submit', function (e) {
    var inputValue = $('#search').val().trim();
    var searchUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=";
    e.preventDefault();
    $.ajax(searchUrl + inputValue, {
        headers: {
            Authorization: "Bearer y9ss5NF_aALqyqZ6T5XUvxnu3cPPlRQBBucLsGR_k0TVxhglsuLP0szHwxzHAIQ5VGBQlqknbSoxBlV440oZoAqFJhLyKoKSDaVKx_Yirpi6M5Nwa0I59RoEMY5IXnYx"
        },
        method: "GET",
        success: yelpCallSearch
    });
})
// Function that fetches our data and renders the results for the search by location
function yelpCallSearch(yelpData) {
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
            var $link = $('<img>');
            $link.attr("src", "./assets/burst_icon@2x.png");
            $link.attr("id", "logo");
            $img.attr("src", business.image_url);
            $img.attr("alt", business.name);
            $card.append($img);
            $img.on('click', function (e) {
                e.preventDefault();
                modal1.style.display = "block";
                $('#submit-btn1').on('click', function () {

                    window.open(business.url, '_blank');
                    window.location.reload();
                    return false;
                })
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
            $card.append($link);
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
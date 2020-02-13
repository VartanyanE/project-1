$(document).ready(function() {
    var ApiKey = "490204d27c988ccb9e991f177de168ad";
    var requestURL = "https://developers.zomato.com/api/v2.1/geocode";


    $('#money-btn').click(function() {

        var money = $('#money').val();

        if (money <= '25.00') {

            if (money <= 25.00) {

                if (money > 26.00, 26) {

                    var modal = document.getElementById("myModal");

                    var btn = document.getElementById('money-btn');

                    var span = document.getElementsByClassName("close")[0];

                    btn.onclick = function() {
                        modal.style.display = "block";
                    }

                    span.onclick = function() {
                        modal.style.display = "none";
                    }

                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
                }

                if ("geolocation" in navigator) {

                    navigator.geolocation.getCurrentPosition(function(position) {

                        x = position.coords.latitude;
                        y = position.coords.longitude;
                        ajaxCall(x, y);
                    });
                } else {
                    console.log("doesn't work")
                }

                function ajaxCall(x, y) {

                    $.ajax(requestURL + "?lat=" + x + "&lon=" + y, {
                        type: "GET",
                        success: geoLoc,
                        headers: {
                            "user-key": "490204d27c988ccb9e991f177de168ad"
                        }
                    });
                }

                function geoLoc(data) {
                    data.nearby_restaurants.forEach(function(x) {
                        var name = x.restaurant.name;
                        console.log(name);
                    })
                }
            }
        }
    })
});
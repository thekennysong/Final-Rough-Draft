// Uber API Constants

var eventTemplateFunction = Handlebars.compile($('#page-template').html());

var uberClientId = "qVKKs4BjQlqHY06HXn5i4H9Chi2g4IxS"
  , uberServerToken = "lFdfJgCSnohPg0LVm8NN3qBviR0-cwl42exRYqAU";

// Create variables to store latitude and longitude
var userLatitude
  , userLongitude;
var partyLat = 34.0208106;
var partyLong = -118.2841455;

navigator.geolocation.watchPosition(function(position) {
	// Update latitude and longitude
	userLatitude = position.coords.latitude;
	userLongitude = position.coords.longitude;

    // Query Uber API if needed
	getEstimatesForUserLocation(userLatitude, userLongitude);
});



function getEstimatesForUserLocation(latitude,longitude) {
  $.ajax({
    url: "https://api.uber.com/v1/estimates/price",
    headers: {
    	Authorization: "Token " + uberServerToken
    },
    data: { 
      start_latitude: latitude,
      start_longitude: longitude,
      end_latitude: partyLat,
      end_longitude: partyLong
    },
    success: function(result) {
      //console.log(JSON.stringify(result));
  for(var i = 0; i < result.prices.length; i++){
        var html = '';
            html += eventTemplateFunction(result.prices[0]);
        }
        $('#uberResults').html(html);    

    }
  });
}
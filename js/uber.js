// Uber API Constants

var eventTemplateFunction = Handlebars.compile($('#page-template').html());

var uberClientId = "qVKKs4BjQlqHY06HXn5i4H9Chi2g4IxS"
  , uberServerToken = "lFdfJgCSnohPg0LVm8NN3qBviR0-cwl42exRYqAU";


function getEstimatesForUserLocation(startLatitude,startLongitude, endLatitude, endLongitude) {
  $.ajax({
    url: "https://api.uber.com/v1/estimates/price",
    headers: {
    	Authorization: "Token " + uberServerToken
    },
    data: { 
      start_latitude: startLatitude,
      start_longitude: startLongitude,
      end_latitude: endLatitude,
      end_longitude: endLongitude
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
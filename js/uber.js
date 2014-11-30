// Uber API Constants

var eventTemplateFunction = Handlebars.compile($('#page-template').html());

var uberClientId = "qVKKs4BjQlqHY06HXn5i4H9Chi2g4IxS"
  , uberServerToken = "lFdfJgCSnohPg0LVm8NN3qBviR0-cwl42exRYqAU";

var uberInfo = [];


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
        document.getElementById(endLatitude).innerHTML = "<b>Estimated Travel Mins: </b>" + Math.round(result.prices[0].duration/60);
        document.getElementById(endLongitude).innerHTML = "<b>UberX Estimated Cost: </b> " + result.prices[0].estimate;
        //document.getElementById(endLongitude).innerHTML = "<b>UberBlack Estimated Cost: </b> " + result.prices[3].estimate;
    }, 
    error: function(result){
          
          document.getElementById('spaSalonName').innerHTML = 'Too Far for Uber';
          
          window.setTimeout(function(){
              document.getElementById('spaSalonName').innerHTML = 'Spa/Salon Name';
          }, 5000);
          
    }
    
   
  });
}

console.log(uberInfo);
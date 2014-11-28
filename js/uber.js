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

        uberInfo.push({
            time: result.prices[0].duration,
            eta: result.prices[0].estimate
        }); 
        // //uberXL
        // uberInfo.push({
        //     time1: result.prices[1].duration,
        //     eta1: result.prices[1].estimate
        // }); 
        // //uberPlus
        // uberInfo.push({
        //     time2: result.prices[2].duration,
        //     eta2: result.prices[2].estimate
        // });       
        // //uberBlack
        // uberInfo.push({
        //     time3: result.prices[3].duration,
        //     eta3: result.prices[3].estimate
        // });   
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
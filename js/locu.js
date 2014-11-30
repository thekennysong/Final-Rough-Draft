
var songTemplateFunction = Handlebars.compile($('#page-template').html());

// var spaLatitude = []; //34.0208106
// var spaLongitude = []; //-118.2841455
var spaLatLong = [];
var spaName = [];
var marker;


var search = function(searchTerm){
  //spaLatLong.clear();
  searchTerm = encodeURIComponent(searchTerm);
  var url = 'https://api.locu.com/v1_0/venue/search/?postal_code=' + searchTerm + '&category=spa&api_key=e68af90b8be3f900ffef494e9b1fa8d0f82cf9f6&callback=?';
  $.getJSON(url, function(response){  //can use $ or jQuery
    //console.log(response);
    arrayLength = response.objects.length;
    var html = '';

    for(var i = 0; i < response.objects.length; i++){

      spaLatLong.push({
          latitude: response.objects[i].lat,
          longitude: response.objects[i].long
      });
      spaName.push({
          name: response.objects[i].name
      });
      //console.log(spaLatitude);
      html += songTemplateFunction(response.objects[i]);
      //console.log(currentPosition.coords.latitude, currentPosition.coords.longitude, response.objects[i].lat,response.objects[i].long);
      getEstimatesForUserLocation(currentPosition.coords.latitude, currentPosition.coords.longitude, response.objects[i].lat,response.objects[i].long);

    }
    // console.log(arrayLength);
    $('#results').html(html);
    setPoints(spaLatLong, spaName, uberInfo);
    //injectData(spaLatLong, uberInfo);
    //console.log(uberInfo.time);
  });

};

// var injectData = function(spaLatLong, uberInfo){
//       var newTime;
//       var cost;
//       for(var i = 0; i < uberInfo.length; i++){
//       newTime = Math.round((uberInfo[i].time)/60); 
//       cost = uberInfo[i].eta;
//       //console.log(spaLatLong[i].latitude_spaLatLong[i].longitude);
//       document.getElementById(spaLatLong[i].latitude).innerHTML = newTime;
//       }
// };
      


var setPoints = function(spaLatLong, spaName, uberInfo){
                  
                  var markers = [];

          for (var i = 0; i < spaLatLong.length; i++) {

                  var latLng = new google.maps.LatLng(spaLatLong[i].latitude, spaLatLong[i].longitude);
                  //var markers = [];

                  var infowindow = new google.maps.InfoWindow({
                        //map: map,
                        position: latLng,
                        //content: spaName[i].name
                    });
                      console.log(latLng);
                  // Creating a marker and putting it on the map
                  marker = new google.maps.Marker({
                      position: latLng,
                      map: map,
                      icon: "beer.png"
                  });
                  markers.push(marker);

                  google.maps.event.addListener(marker, 'click', function(marker, i){
                        return function(){
                           
                            infowindow.setContent("<b>Name: </b></br>" + spaName[i].name);
                            infowindow.open(map, marker);
                            //set the lat and long when the user clicks 

                        }                       
                    }(marker, i));

          }  
};

$('form').on('submit', function(e){
  e.preventDefault();


  var searchTerm = $('#search-term').val();

  console.log(searchTerm);

  // $('#results').html('Loading....');
  search(searchTerm);
});

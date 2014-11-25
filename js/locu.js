
var songTemplateFunction = Handlebars.compile($('#page-template').html());

// var spaLatitude = []; //34.0208106
// var spaLongitude = []; //-118.2841455
var spaLatLong = [];
var spaName = [];



var search = function(searchTerm){
  //spaLatLong.clear();
  searchTerm = encodeURIComponent(searchTerm);
  var url = 'https://api.locu.com/v1_0/venue/search/?postal_code=' + searchTerm + '&category=spa&api_key=e68af90b8be3f900ffef494e9b1fa8d0f82cf9f6&callback=?';
  $.getJSON(url, function(response){  //can use $ or jQuery
    //console.log(response);
    arrayLength = response.objects.length;
    var html = '';

    for(var i = 0; i < response.objects.length; i++){
      //append lat and long to the array 
      // spaLatitude.push(response.objects[i].lat);
      // spaLongitude.push(response.objects[i].long);

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
          // var latLng = new google.maps.latLng(spaLatitude,spaLongitude);
          // console.log(latLng);
          // var marker = new google.maps.Marker({
          //     map: map,
          //     position: latLng,
          //     animation: google.maps.Animation.DROP,
          //     icon: 'beer.png'
          // });

          

    }
    // console.log(arrayLength);
    $('#results').html(html);
    setPoints(spaLatLong, spaName);

  });

};
var setPoints = function(spaLatLong, spaName){
                  var marker;
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
                            infowindow.setContent(spaName[i].name);
                            infowindow.open(map, marker);
                        }                       
                    }(marker, i));

          }  
};



$('form').on('submit', function(e){
  e.preventDefault();
  // spaLongitude.clear();
  // spaLatitude.clear();

  var searchTerm = $('#search-term').val();

  console.log(searchTerm);

  $('#results').html('Loading....');
  search(searchTerm);
});

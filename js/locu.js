
var songTemplateFunction = Handlebars.compile($('#page-template').html());

// var spaLatitude = []; //34.0208106
// var spaLongitude = []; //-118.2841455
var spaLatLong = [];




var search = function(searchTerm){
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

      //console.log(spaLatitude);
      html += songTemplateFunction(response.objects[i]);


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
    setPoints(spaLatLong);

  });

};
var setPoints = function(spaLatLong){
          for (var i = 0; i < spaLatLong.length; i++) {

                  var latLng = new google.maps.LatLng(spaLatLong[i].latitude, spaLatLong[i].longitude);

                  // var infowindow = new google.maps.InfoWindow({
                  //       //map: map,
                  //       position: latLng,
                  //       content: 'Name of spa ' + response.objects[i].name
                  //   });
                      //console.log(info.latitude);
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                      position: latLng,
                      map: map,
                      icon: "beer.png"
                  });
                  // google.maps.event.addListener(marker, 'click', function(){
                  //       infowindow.open(map);
                  //   });

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

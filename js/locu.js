
var songTemplateFunction = Handlebars.compile($('#page-template').html());

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
      html += songTemplateFunction(response.objects[i]);
      getEstimatesForUserLocation(currentPosition.coords.latitude, currentPosition.coords.longitude, response.objects[i].lat,response.objects[i].long);

    }

    $('#results').html(html);
    setPoints(spaLatLong, spaName);

  });

};

var setPoints = function(spaLatLong, spaName){
                  
                  var markers = [];

          for (var i = 0; i < spaLatLong.length; i++) {

                  var latLng = new google.maps.LatLng(spaLatLong[i].latitude, spaLatLong[i].longitude);
                  //var markers = [];

                  var infowindow = new google.maps.InfoWindow({
                        position: latLng,
                    });
                      console.log(latLng);
                  
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
                            

                        }                       
                    }(marker, i));

          }  
};

$('form').on('submit', function(e){
  e.preventDefault();


  var searchTerm = $('#search-term').val();

  console.log(searchTerm);


  search(searchTerm);
});

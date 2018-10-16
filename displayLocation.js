function displayLocation(position){ //display location function 
    
  var latitude = position.coords.latitude; //lat of current user position 
  var longitude = position.coords.longitude; //lng of current user position 

  var latLng = new google.maps.LatLng(latitude,longitude); //forms a new google maps latLng object

  initMap(latLng); //calls init map with latLng as argument
  createMarker(latLng); //also calling createMarker function 
}
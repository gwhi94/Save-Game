var map;
function initMap(latLng){ //function to display the map
        //Map options
        var options ={
          zoom:12,
          center:latLng, //map centers on user
          gestureHandling:'greedy' //allows zooming without cntrl key
        };


        //creating a new google map
        map = new google.maps.Map(document.getElementById('map'),options);

        var request = {
        	location:options.center,
        	radius:10000,
        	types:['cafe']
		};


		var service = new google.maps.places.PlacesService(map);

		service.nearbySearch(request,callback);

	}

	function callback(results,status){
		if(status == google.maps.places.PlacesServiceStatus.OK){
			for (let i = 0; i < results.length; i++){
				var requestDetails ={
					placeId:results[i].place_id,
					fields: ['name', 'formatted_address', 'geometry','website','formatted_phone_number']

				};

				service = new google.maps.places.PlacesService(map);
				service.getDetails(requestDetails,createMarker);

			}
		}
	}

	function createMarker(place){	
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map:map,
			position:place.geometry.location,
			name:place.name,
			phone:place.formatted_phone_number,
			web:place.website,
			address:place.formatted_address
			
		});

		marker.addListener('click',function(){
			$("#shopName").html(this.name);
			$("#shopAdd").html(this.address);
			$("#shopWeb").html(this.web);
			$("#shopNum").html(this.phone);
		});
	}









      function initMap() {

      	var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var  map = new google.maps.Map(document.getElementById('maparea'), {
          center: {lat: 28.6139, lng: 77.2090},
          zoom: 8
        });

        directionsDisplay.setMap(map);

        document.getElementById('showdir').onclick=function(){
         displaydir(directionsService,directionsDisplay);
    }
      }


   function displaydir(directionsService, directionsDisplay) {
  var request = {
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  };


  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
    else
      	console.log(status);
  });

  var service = new google.maps.DistanceMatrixService();
  var newreq={
  	origins:[document.getElementById('start').value],
  	destinations:[document.getElementById('end').value],
  	travelMode: 'DRIVING'
  }
   
   var ttime;
   var tdist;

service.getDistanceMatrix(newreq, function(response,status){
	if(status=='OK'){
		tdist=response.rows[0].elements[0].distance.text;
		ttime=response.rows[0].elements[0].duration.text;
		var rdist=parseFloat(tdist);
    var charges=(rdist-2)*8;
    document.getElementById('ttldist').innerHTML=tdist;
    document.getElementById('ttltime').innerHTML=ttime;
    document.getElementById('txichg').innerHTML=charges;
	}
});
}

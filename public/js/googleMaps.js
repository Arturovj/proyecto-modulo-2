
// set map options
var myLatLng = { lat: 38.3460, lng: -0.4907};
var mapOptions = { 
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};




//create Map 

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)


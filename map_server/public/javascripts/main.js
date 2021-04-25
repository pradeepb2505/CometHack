
var MAPAPP = {};
MAPAPP.markers = [new google.maps.LatLng(32.987299, -96.773472)];
MAPAPP.currentInfoWindow;
MAPAPP.pathName = window.location.pathname;

$(document).ready(function() {
    initialize();
    populateMarkers(MAPAPP.pathName);
});

function initialize() {
    var center = new google.maps.LatLng(32.987299, -96.773472);
    var mapOptions = {
        zoom: 20,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
    };
    this.map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
};

function populateMarkers(dataType) {
    apiLoc = typeof apiLoc !== 'undefined' ? apiLoc : '/data/' + dataType + '.json';
    $.getJSON(apiLoc, function(data) {
        $.each(data, function(i, ob) {
            console.log(data)
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(this.location.coordinates[0], this.location.coordinates[1]),
                details: this.details,
                image: this.image,
                // icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                icon: this.icon
            });
            var content = '<h3 class="mt0"><a href="' + marker.image + '" target="_blank"> Image </a></h3><p>' + marker.details + '</p>';
        	marker.infowindow = new google.maps.InfoWindow({
            	content: content,
            	maxWidth: 400
            });
            google.maps.event.addListener(marker, 'click', function() {
                if (MAPAPP.currentInfoWindow) MAPAPP.currentInfoWindow.close();
                marker.infowindow.open(map, marker);
                MAPAPP.currentInfoWindow = marker.infowindow;
            });
            MAPAPP.markers.push(marker);
        });
    });
};

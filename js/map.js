'use strict';

var map;
function initMap() {
  //   google.maps.event.addDomListener(window, 'resize', function() {
  //     map.setCenter(center);
  // });

  map = new google.maps.Map(document.querySelector('.interactive-map'), {
    zoom: 17,
    center: new google.maps.LatLng(51.2510058, 7.1290000), //  left: 27px;
    //center: new google.maps.LatLng(51.2510058, 7.1323998), // when about us on the right (right: 27px)
    mapTypeId: 'roadmap'
  });

  var contentString = '<div id="content" class="map-popup">' +
    '<h2 id="firstHeading" class="popup-header">dev4you GmbH</h2>' +
    '<div id="bodyContent">' +
    '<p class="popup-text">Moritzstraße 14 <br>' +
    ' 42117 Wuppertal <br>' +
    'Germany <br>' +
    '<a href="https://www.google.com/maps/place/Moritzstra%C3%9Fe+14,+42117+Wuppertal,+Germany/@51.2510058,7.1288998,17z/data=!3m1!4b1!4m5!3m4!1s0x47b8d655dd6db85b:0x1f57da223bbff299!8m2!3d51.2510025!4d7.1310885">' +
    'View on Google Maps</a> </p> ' +
    '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });


  var markerImage = new google.maps.MarkerImage(
    'img/pin-marker.png',
    null,
    new google.maps.Point(0, 0),
    new google.maps.Point(42, 42)
  );

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(51.2509358, 7.1311998),  //59.938794, 30.323083
    icon: markerImage,
    map: map
  });

  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
};

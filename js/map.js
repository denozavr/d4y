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
};

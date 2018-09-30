(function () {
    var position = { lat: -1.4558345, lng: -48.4883062 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: position
    });
    var infowindow = new google.maps.InfoWindow({
        content: "Local-Store"
    });
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Local-Store',
        icon: './_image/maps-flags-48x48.svg',
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
})();

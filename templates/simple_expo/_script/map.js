(function () {
    var position = { lat: -1.45193, lng: -48.49995 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: position
    });
    var infowindow = new google.maps.InfoWindow({
        content: "Local-Store"
    });
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: 'Local'
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
})();

(function() {
   // var map = L.map('map').setView([43.07265,-89.400929], 10);
   var map = L.map('map').setView([0.2, 6.6], 10);




   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);



   // L.marker([0.2,6.6]).addTo(map)
   //  .bindPopup('Science Hall<br>Where the GISC was born.')
   //  .openPopup();

   L.marker([0.2,6.6]).addTo(map)
    .bindPopup('Science Hall<br>Where the GISC was born.');

    // var domelem = document.createElement('a');
    // domelem.href = "#point_555_444";
    // domelem.innerHTML = "Click me";
    // domelem.onclick = function() {
    //     alert(this.href);
    //     // do whatever else you want to do - open accordion etc
    // };



})();
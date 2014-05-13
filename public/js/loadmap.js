(function() {
   // var map = L.map('map').setView([43.07265,-89.400929], 10);
   var map = L.map('map').setView([0.2, 6.6], 11);
   var markerArray = [];



   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);



   // L.marker([0.2,6.6]).addTo(map)
   //  .bindPopup('Science Hall<br>Where the GISC was born.')
   //  .openPopup();

   // L.marker([0.2,6.6]).addTo(map)
   //  .bindPopup('Science Hall<br>Where the GISC was born.');

    // var domelem = document.createElement('a');
    // domelem.href = "#point_555_444";
    // domelem.innerHTML = "Click me";
    // domelem.onclick = function() {
    //     alert(this.href);
    //     // do whatever else you want to do - open accordion etc
    // };



    function pinTheMap(data){
      //clear the current pins
      map.removeLayer(markerLayerGroup);
      //add the new pins
      var markerArray = new Array(data.length)
      for (var i = 0; i < data.length; i++){
        var pin = data[i];
        markerArray[i] = L.marker([pin.lat, pin.lon]).bindPopup(pin.name);
      }
      markerLayerGroup = L.layerGroup(markerArray).addTo(map);
    }

    // // 223
    // L.marker([0.194333333333,6.69913888889]).addTo(map)
    // .bindPopup('<a href="/223">223</a>')
    // .on('click', function (e){ window.location.href="/223"; });

    // // 225
    // L.marker([0.195861111111,6.68877777778]).addTo(map)
    // .bindPopup('<a href="/225">225</a>')
    // .on('click', function (e){ window.location.href="/225"; });

    console.log("LOADMAP test get: /geoapi");
    $.get("/geoapi", function (ret_data){
      // console.log("ret data");
      // console.log(ret_data);
      ret_data.forEach(function (elem){
        // console.log(elem);
        var aux_elem = elem;

          L.marker([elem.lat,elem.lon]).addTo(map)
          .bindPopup('<a href="/'+elem.id+'">'+elem.id+'</a>')
          // .on('click', function (e){ window.location.href="/"+elem.id; })
          .on('click', function (e){
            // console.log(aux_elem.lat);
            // var bounds_arr = [];
            // bounds_arr.push([aux_elem.lat, aux_elem.lon]);
            // console.log(bounds_arr);
            // map.fitBounds(bounds_arr);
            $.get("/"+elem.id);
          });
      });
    });


})();
function initAutocomplete() {

    // $("#pac-input").css("display","inline-block");
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.Autocomplete(input,{
      fields: ["name"]
    });
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.setComponentRestrictions({'country': ['tz']});

   
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      localStorage.searching = 0;
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }


      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // if (place.geometry.viewport) {
        //   // Only geocodes have viewport.
        //   bounds.union(place.geometry.viewport);
        // } else {
        //   bounds.extend(place.geometry.location);
        // }
      });
    });

  }


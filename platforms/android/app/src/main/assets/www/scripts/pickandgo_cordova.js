function onDeviceReady() { 
    var onSuccess = function(position) {
        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;

        if(first_marker == 0 && position.coords.accuracy < 5000){
            // Add first marker
            addMarker(map, localStorage.lat*1, localStorage.lng*1);
            if(localStorage.map_drag == 0){
                map.animateCamera({
                  target: {lat: localStorage.lat*1, lng: localStorage.lng*1},
                  zoom: 14,
                  duration: 500
                }); 
            }
            get_name_address(localStorage.lat, localStorage.lng);
            first_marker = 1;
            localStorage.pg_cords =  localStorage.lat+','+localStorage.lng;
        }

        if(position.coords.accuracy > 50){     
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 1000, timeout: 3000, enableHighAccuracy: true });                 
            localStorage.pg_cords =  localStorage.lat+','+localStorage.lng;
        } else {
            localStorage.gpsInitiated = 1;
            // Add last marker
            map.clear();
            addMarker(map, localStorage.lat*1, localStorage.lng*1);
            if(localStorage.map_drag == 0){
                map.animateCamera({
                  target: {lat: localStorage.lat*1, lng: localStorage.lng*1},
                  zoom: 17,
                  duration: 500
                }); 
            }
            get_name_address(localStorage.lat, localStorage.lng);
            localStorage.pg_cords =  localStorage.lat+','+localStorage.lng;
        }
             
    };

    // onError Callback receives a PositionError object
    function onError(error) {
       // navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });                 
    }

    // Initiate GPS reading
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 1000, timeout: 3000, enableHighAccuracy: true });

    FCMPlugin.onNotification(function(notification) {  
        
        if(notification.wasTapped){

              swal({
                  title: "",
                  text: notification.body,
                  // type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#13A89F",
                  iconColor: '#13A89F',
                  confirmButtonText: notification.confirm_label,
                  cancelButtonText: "Dismiss",
                  closeOnConfirm: false,
                  closeOnCancel: true },
                  function (isConfirm) {
                    if (isConfirm) { 
                        if(notification.url_link.substring(0, 4) == 'pick'){
                            window.location = notification.url_link;
                        } else {
                            window.location = 'index.html?goto='+notification.url_link;
                        }
                        
                    } 
                  }
                ); 

        } else {
            navigator.notification.beep(1); 
              swal({
                  title: "",
                  text: notification.body,
                  // type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#13A89F",
                  iconColor: '#13A89F',
                  confirmButtonText: notification.confirm_label,
                  cancelButtonText: "Dismiss",
                  closeOnConfirm: false,
                  closeOnCancel: true },
                  function (isConfirm) {
                    if (isConfirm) { 
                        if(notification.url_link.substring(0, 4) == 'pick'){
                            window.location = notification.url_link;
                        } else {
                            window.location = 'index.html?goto='+notification.url_link;
                        }
                    } 
                  }
                ); 
        }
        

    }, function(error) {
        console.error(error);
    });    

    document.addEventListener("backbutton", onBackKeyDown, false);

}

$(document).on("deviceready", onDeviceReady);




 
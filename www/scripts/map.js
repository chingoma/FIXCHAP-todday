function load_plugins() {
    // Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);         
}

localStorage.clickMyLocation = 1;



    // PhoneGap is ready
function onDeviceReady() {


    FCMPlugin.onNotification(function(notification) {
      var flag = 0;
        if(notification.wasTapped){
          $("#theBody").css("display", "none");
        } else {
            // $("#theBody").css("display", "none");
            notifyMe(notification.title, notification.body);
            flag = 1;
        }
        
        if(flag == 0){
            $("#theBody").css("display", "none");
            if(notification.title == 'New Request'){
                window.location="index.html";
            } else if (notification.title == 'New Update Available'){
                if(device.platform == 'iOS'){
                    window.location.href = 'https://apps.apple.com/tz/app/fixchap/id1474252168';
                  } else {
                    window.location.href = 'https://play.google.com/store/apps/details?id=app.fixchap.com';
                  }
            } else {
              var title_array = notification.title.split(" ");
                localStorage.back_address = 'index.html';
               localStorage.request_id = title_array[0].substring(2); 
               window.location="request.html";            
            }          
        }
    }, function(error) {
        console.error(error);
    });  


    function notifyMe(title, body){
        // cordova.plugins.notification.local.schedule({
        //     title: title,
        //     text: body,
        //     smallIcon: 'res://notification_icon',
        //     foreground: true
        // }); 
        // cordova.plugins.notification.local.on("click", function (notification) {
        //     if(title == 'New Request'){
        //         window.location="index.html";
        //     } else if (title == 'New Update Available'){
        //             window.location= localStorage.latest_version_link;
        //         } else {
        //       var title_array = title.split(" ");
        //       localStorage.back_address = 'index.html';
        //       localStorage.request_id = title_array[0].substring(2); 
        //       window.location="request.html";            
        //     }
        // });   
        // bootbox.confirm({
        //     title: title,
        //     message: body,
        //     buttons: {
        //         'cancel': {
        //             label: 'Ok'
        //         },
        //         'confirm': {
        //             label: 'Go to Request'
        //         }
        //     },
        //     callback: function(result) {
        //         if (result) {
        //           var title_array = title.split(" ");
        //           // localStorage.back_address = 'index.html';
        //           localStorage.request_id = title_array[0].substring(2); 
        //           window.location="request.html";                  
        //         }
        //     }
        // }).find('.modal-content').css({ 'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/17; return h+"px"; } }); 
        navigator.notification.beep(1);
        navigator.notification.confirm(
            body, // message
             onConfirm,            // callback to invoke with index of button pressed
            title,           // title
            ['Open','Dismiss']     // buttonLabels
        );
        function onConfirm (results){
            if(results == 1){
              var title_array = title.split(" ");
              // localStorage.back_address = 'index.html';
              localStorage.request_id = title_array[0].substring(2); 
              window.location="request.html";  
            }
           
        }


         
    }    


      var div = document.getElementById("map");

      // Create a Google Maps native view under the map_canvas div.  , 
      var map = plugin.google.maps.Map.getMap(div);

     if(localStorage.new_lat && localStorage.new_long){
      var latitude = localStorage.new_lat*1;
      var longitude = localStorage.new_long*1;
      var lozoom = 16;
    } else {
        if (!localStorage.lat) {
            var latitude = -6.764425;
            var longitude = 39.229607;
            var lozoom = 12;
        } else {
            var latitude = localStorage.lat*1;
            var longitude = localStorage.lng*1;
            var lozoom = 16;
        }
    }

        
      map.setOptions({
          'camera': {
                'target': {lat: latitude, lng: longitude},
                'zoom': lozoom
              },
                  'gestures': {
            'scroll': true,
            'tilt': false,
            'rotate': false,
            'zoom': true
          },
          'styles': [
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d6e2e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#cddbe0"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7492a8"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "lightness": 25
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d6e2e6"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#cddbe0"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dae6eb"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7492a8"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#d6e2e6"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#588ca4"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": -100
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#cae7a8"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#bae6a1"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c6e8b3"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#bae6a1"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#41626b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": -45
                    },
                    {
                        "lightness": 10
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f7fdff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#beced4"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eef3f5"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#cddbe0"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#edf3f5"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#cddbe0"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "saturation": -70
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#588ca4"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#008cb5"
                    }
                ]
            },
            {
                "featureType": "transit.station.airport",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": -5
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a6cbe3"
                    }
                ]
            }
        ]
        });

    map.one(plugin.google.maps.event.MAP_READY, function() {

        if(localStorage.new_lat && localStorage.new_long){
          var latitude = localStorage.new_lat*1;
          var longitude = localStorage.new_long*1;
          var lozoom = 16;
        } else {
            if (!localStorage.lat) {
                var latitude = -6.764425;
                var longitude = 39.229607;
                var lozoom = 12;

            } else {
                var latitude = localStorage.lat*1;
                var longitude = localStorage.lng*1;
                var lozoom = 16;
            }
        }

         upload_details(latitude, longitude, localStorage.new_serviceId*1);  
        // get_name_address(latitude, longitude);


         
        // $("#done_btn").css("display","inline-block"); 

        $('<div/>').addClass('centerMarker').appendTo(map.getDiv());

        $("#pac-input").css("display","inline-block");

        

        map.on(plugin.google.maps.event.MAP_DRAG_START, function() {
            localStorage.searching = 0;
        });

        map.on(plugin.google.maps.event.MAP_DRAG_END, function() {
              // Get the current camera position.


              var cameraPosition = map.getCameraPosition();
              get_name_address(cameraPosition.target.lat, cameraPosition.target.lng);
            upload_details(cameraPosition.target.lat, cameraPosition.target.lng, localStorage.new_serviceId*1);

            $("#done_search").css("display","none"); 
            $("#done_btn").css("display","inline-block");             
        });   

        $("#pac-input").focus(function(){
            $("#done_btn").css("display","none"); 
            $("#done_search").css("display","inline-block"); 
        });

        // $("#pac-input").keyup(function(event) {
        //     // if (event.keyCode === 13) {
        //     //    search_location($("#pac-input").val());
        //     // }
        //     if($("#pac-input").val().length > 10){
        //         search_location($("#pac-input").val());
        //     }
        // });

        $("#pac-input").focusout(function(){
              setTimeout(
                function() {
                  search_location($("#pac-input").val());
                }, 50);
        });

        // $('#pac-input').on('input',function(e){
        //     //search_location($("#pac-input").val());
        // });

        // $("#pac-input").focusout(function(){
        //     // search_location($("#pac-input").val());
        // });


        // $('#pac-input').change(function() {
        //     // if($('#pac-input').val().length > 10){
        //         // search_location($("#pac-input").val());
        //     // }
        // });

        $("#pac-input").focus(function() {
            $("#pac-input").val('');
        });

        $("#done_search").click(function(event) {
            search_location($("#pac-input").val());
        });

        function search_location(name){
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://maps.googleapis.com/maps/api/geocode/json?address="+name+"&key=AIzaSyD-T2yF06JC5U_8Lou45QeKVV8XXqXoZNE",
            "method": "POST",
            "headers": {
              "cache-control": "no-cache"
            }
          };

          $.ajax(settings).done(function (response) {
            var data = JSON.parse(JSON.stringify(response));
            if(data.status == 'OK'){
              var slat = data.results[0].geometry.location.lat;
              var slong = data.results[0].geometry.location.lng;


                // console.log(slat+','+slong);  
                // Change the map options
                map.setOptions({
                  'camera': {
                    'target': {
                      lat: slat,
                      lng: slong
                    },
                    'zoom': 15
                  }
                });  
             get_name_address(slat, slong);
             upload_details(slat, slong, localStorage.new_serviceId*1);


            }
          });
        $("#done_search").css("display","none"); 
        // $("#done_btn").css("display","inline-block");          
        }



    });

    
    // get_name_address(localStorage.lat*1, localStorage.lng*1);

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        window.location="index.html";
    }
    
    function search_for_accurace() {
        if(localStorage.searching == 1){
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });
        } 
    }

    var onSuccess = function(position) {
        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;
        
       
        localStorage.locationaccuracy = position.coords.accuracy;
          if(position.coords.accuracy < 50){
                localStorage.searching = 0;
          }
        
        // Initialy 50 meters
        // if(position.coords.accuracy > 1000){
        //     search_for_accurace();
        // } else if (position.coords.accuracy <= 1000){
            $("#loading").css('display','none');
            map.clear();
            onMapInit(map, localStorage.lat*1, localStorage.lng*1);
            map.animateCamera({
              target: {lat: localStorage.lat*1, lng: localStorage.lng*1},
              zoom: 17,
              duration: 500
            }); 
            get_name_address(localStorage.lat*1, localStorage.lng*1);

            search_for_accurace();

            // upload_details(localStorage.lat*1, localStorage.lng*1, localStorage.new_serviceId*1);                       
        // }        
    };




    // onError Callback receives a PositionError object
    //
    function onError(error) {
        // alert('error')
        // navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });
    }

    if(localStorage.accurateStatus == 0){
        search_for_accurace();
        $("#done_btn").css("display","inline-block");   
    } else {
        $("#loading").css('display','none');
        map.clear();
        onMapInit(map, localStorage.lat*1, localStorage.lng*1);
        map.animateCamera({
          target: {lat: localStorage.lat*1, lng: localStorage.lng*1},
          zoom: 17,
          duration: 500
        });
        get_name_address(localStorage.lat*1, localStorage.lng*1);
            upload_details(localStorage.lat*1, localStorage.lng*1, localStorage.new_serviceId*1); 
    }
      

     
} 

        function get_name_address(latitude, longitude){
            // $("#thInfo").html('name geted');
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+",%20"+longitude+"&key=AIzaSyD-T2yF06JC5U_8Lou45QeKVV8XXqXoZNE",
              "method": "GET"
            };

            $.ajax(settings).done(function (response) {
              if(response.status == 'OK'){
                // $("#thInfo").html('response ok');
                // $("#pac-input").val('potea');
                localStorage.new_locationName = response.results[0].address_components[0].short_name+', '+response.results[0].address_components[1].long_name+', '+response.results[0].address_components[2].long_name;
                
                $("#pac-input").val(response.results[0].address_components[0].short_name+', '+response.results[0].address_components[1].long_name+', '+response.results[0].address_components[2].long_name);
                // $("#pac-input").val('tambaa');
                $("#done_btn").css("display","inline-block");    
              }
            });          
        }  


    function onMapInit(map, lat, lng) {
         var google = {"lat": lat, "lng": lng};
      // Add a marker
      map.addMarker({
        'position': google,
        'title': "Pick my location",
          'icon': {
            'url': 'images/maker27.png'
           }
      }, function(marker) {

        // Show the infoWindow
        if (localStorage.clickMyLocation == 1){
            // marker.showInfoWindow();
        }

          marker.on(plugin.google.maps.event.INFO_CLICK, function(LatLng) {
            marker.hideInfoWindow();
            localStorage.clickMyLocation = 0;

            var data = JSON.parse(LatLng);
            // $("#thInfo").html('lat: '+ data.lat+' long: '+data.lng); 
            // $("#thInfo").html(data.lat+' '+data.lng);

                map.setOptions({
                  'camera': {
                    'target': {
                      lat: data.lat,
                      lng: data.lng
                    },
                    'zoom': 17
                  }
                }); 
                // $("#thInfo").html('before get name'); 
                var cameraPosition = map.getCameraPosition();
                get_name_address(cameraPosition.target.lat, cameraPosition.target.lng);
                // 

                // get_name_address(data.lat*1, data.lng*1); 
                $("#done_btn").css("display","inline-block");           
          });
          $("#done_btn").css("display","inline-block");         

      });
    } 

        function upload_details(lat, long, service_id){
          localStorage.new_lat = lat;
          localStorage.new_long = long;          

        }      
   
load_plugins();
var min_limit_alert = 0;

function close_menu(){
    $("#taptoclose").removeClass("active-tap-close");
    $("#theleftnav").removeClass("active-sidebar-box");
}

function rating_display(x){
    if(x==0){
        return '';
        // return '<span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==1){
        return '<span class="fa fa-star"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==2){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==3){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==4){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star-o"></span>';
    } else if(x==5){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>';
    }
}

function fc_loading(title){
    swal({ html: true, title: "", text: '<div style="margin: -20px 0px -20px 0px;">'+title+'</div>', showConfirmButton: false});
}

function fc_error(message){
    swal({ html: true, title: "", text: '<p style="line-height: 23px;">'+message+'</p>', allowOutsideClick: true, confirmButtonColor: "#13A89F"})
}

function fc_success(title, message){
    swal(title, message, "success");
}

//// ///// TIME CONVERTER ///////////
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

function jsdate_to_datetime(x) {
    return x.getUTCFullYear() + "-" + twoDigits(1 + x.getUTCMonth()) + "-" + twoDigits(x.getUTCDate()) + " " + twoDigits(x.getUTCHours()) + ":" + twoDigits(x.getUTCMinutes()) + ":" + twoDigits(x.getUTCSeconds());
};

$(function() {
    FastClick.attach(document.body);
});


function datetime_display_block(datedetails){
    datedetails = datedetails+' ';
    if(datedetails.substring(8, 9) == "0"){
        var date = datedetails.substring(9, 10);
    } else {
        var date = datedetails.substring(8, 10);
    }

    $(".date_display").html(datedetails.substring(0, 3)+' '+date+' '+datedetails.substring(4, 7));

    $(".time_display").html(datedetails.substring(16, 21));

}
///////// end of time converter//////////

$("#alt_number").val(localStorage.alt_number);


var go_back_array = ["exit"];

function goBack(x){
    block_select_service = 0;
    if($('.sweet-alert').is(':visible')){
        swal.close();
    } else if ( $('.bootbox').hasClass('in') ) {
        bootbox.hideAll();
    } else if(x == 'exit'){
        navigator.app.exitApp();
    } else {
        go_back_array.pop();
        navigate(x);
    }  
}

function onBackKeyDown() {
    goBack(go_back_array[go_back_array.length-1]);
}

function backdownfromPricing(){
    $(".page").css('display','none');
    $(".panel-collapse").removeClass("in");
    setTimeout(function(){ 
        onBackKeyDown();
    }, 200);    
}

function onDeviceReady() {
    universalLinks.subscribe('ul_myExampleEvent', function (eventData) {
        // do some work
        var item_id = eventData.url.split("?n=")[1];

        console.log('Redirect to marketplace item_ID: '+item_id);

        if(item_id) {
            window.location.href="marketplace/index.html?id="+item_id;
        }

        
    });

    $("#open_gallery").click(function() {
        // fc_loading('Opening gallery..');
        navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
            quality: 100,
            correctOrientation: false,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,

        });  
    });

    $("#open_camera").click(function() {

        
        // fc_loading('Opening camera..');
        navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
            quality: 100,
            correctOrientation: false,
            sourceType: Camera.PictureSourceType.CAMERA,
            destinationType: Camera.DestinationType.FILE_URI ,
     
        });  

    });



    function onCameraSuccess(imageURI) {
        StatusBar.overlaysWebView(true);
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#11978E");
        swal.close();
        // $("#uploading_status").html("<center>Uploading photo.. Please wait!</center>");
            $("#desc_photo").append('<div class="column imgbckdispl" id="uploadingimg" style="background-image:url(\'images/uploading.jpg\');"></div>');            
        


        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";


        var params = new Object();
        params.value1 = "test";
        params.value2 = "param";
        
        options.params = params;
        options.chunkedMode = false;

        var ft = new FileTransfer();
        ft.upload(imageURI, "https://fixchap.com/dev/img/api/upload_with_code/"+localStorage.upload_code,
        function (result) {

            $("#uploadingimg").remove();
            $("#desc_photo").append(''+
              '<div class="column imgbckdispl" id="imgfc'+result.response+'" style="background-image:url(\''+imageURI+'\');">'+
                '<span class="closebtn" onclick="remove_image(\''+result.response+'\')"><i class="fa fa-trash"></i></span>'+
              '</div>');
                     
        },
        function (error) {
            $("#uploadingimg").remove();
            // fc_error('Failed to upload file.');
        }, options); 
    }

    function onCameraFail(imageURI) {
        StatusBar.overlaysWebView(true);
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#11978E");
        // $("#uploading_status").html("<center>Uploading photo.. Please wait!</center>");
        //     $("#desc_photo").append(`
        //       <div class="column imgbckdispl" id="uploadingimg" style="background-image:url('images/uploading.jpg');">
        //       </div>
        //     `);            
        // getFileEntry(imageURI); 
        fc_error('File discarded.');  
    }


    function remove_image(id) {
        fc_loading('Deleting image..');

        $.ajax({
            url:"https://fixchap.com/dev/img/api/delete_photo",
            type:'post',
            data: "{\"id\": \""+id+"\"}",
            beforeSend: function(){
                console.log("sending request");
                // alert("sending request");
            },
            success: function(response){
                var data = JSON.parse(response);
                if(data.success){ 
                    fc_success('Done','Thank you for the information.');
                } else {
                    fc_error('Failed to delete image.');  
                }
            },
            error: function(xhr){
                console.log("error on sending request");
                // alert("error on sending");
                fc_error("Connection Error. Please try again later.");
            }
        });


        //   var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://fixchap.com/dev/img/api/delete_photo",
        //     "method": "POST",
        //     "headers": {
        //       "Content-Type": "application/json"
        //     },
        //     "processData": false,
        //     "data": "{\"id\": \""+id+"\"}"
        //   };
        //   $.ajax(settings).done(function (response) {
        //     var data = JSON.parse(response);
        //     if(data.success){ 
        //         fc_success('Done','Thank you for the information.');
        //     } else {
        //         fc_error('Failed to delete image.');  
        //     }
        //   }).fail(function() {
        //       fc_error('Failed to delete image.');  
        //   });
    }   



    // Request for GPS to be on (location Acuracy plugin)
    cordova.plugins.locationAccuracy.request(successCallback, errorCallback, 3);
    function successCallback(argument) { }
    function errorCallback(){ }

    // Initiate Map to start at Dar es Salaam (googlemap plugin)
    var latitude = -6.764425;
    var longitude = 39.229607;
    var lozoom = 12;
    var div = document.getElementById("map_canvas");


    // Create a Google Maps native view under the map_canvas div.
    var map = plugin.google.maps.Map.getMap(div);
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
      'styles': [{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#d6e2e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#cddbe0"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#7492a8"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"lightness":25}]},{"featureType":"administrative.land_parcel","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#d6e2e6"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#cddbe0"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"color":"#dae6eb"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#7492a8"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#d6e2e6"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#588ca4"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"saturation":-100}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#cae7a8"}]},{"featureType":"poi.park","elementType":"geometry.stroke","stylers":[{"color":"#bae6a1"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#c6e8b3"}]},{"featureType":"poi.sports_complex","elementType":"geometry.stroke","stylers":[{"color":"#bae6a1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#41626b"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"saturation":-45},{"lightness":10},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f7fdff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#beced4"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#eef3f5"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#cddbe0"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#edf3f5"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#cddbe0"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"saturation":-70}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#588ca4"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#008cb5"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"saturation":-100},{"lightness":-5}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a6cbe3"}]}]
    });

    map.one(plugin.google.maps.event.MAP_READY, function() {
        $('<div/>').addClass('centerMarker').appendTo(map.getDiv());
    });

    // GPS Plugin
    var first_marker = 0;
    localStorage.map_drag = 0;
    localStorage.gpsInitiated = 0;

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

    function trigger_gps(){
        if(localStorage.gpsInitiated == 0){
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 1000, timeout: 3000, enableHighAccuracy: true });
        }    
    }

    setInterval(function(){
        trigger_gps();
    }, 4000);

    // Add marker function
    function addMarker(map, lat, lng) {
        var google = {"lat": lat, "lng": lng};
          // Add a marker
        map.addMarker({
            'position': google,
            'title': "Pick my location",
            'icon': {
                'url': 'images/maker27.png'
            }
        }, function(marker) { });
    } 



    // Convert Word Address to lat and long
    function search_location(name){
       
        let formData = {"platform": "android"}
        $.ajax({
            url:"https://maps.googleapis.com/maps/api/geocode/json?address="+name+"&key=AIzaSyD-T2yF06JC5U_8Lou45QeKVV8XXqXoZNE",
            type:'post',
            data: formData,
            beforeSend: function(){
                console.log("sending request");
                // alert("sending request");
            },
            success: function(response){
                var data = JSON.parse(JSON.stringify(response));
                if(data.status == 'OK'){
                    var slat = data.results[0].geometry.location.lat;
                    var slong = data.results[0].geometry.location.lng;
                    localStorage.lat = slat;
                    localStorage.lng = slong;
                    localStorage.address_name = name;
                    
                    map.setOptions({
                    'camera': {
                        'target': {
                        lat: slat,
                        lng: slong
                        },
                        'zoom': 15
                    }
                    });  
                }
            },
            error: function(xhr){
                console.log("error on sending request");
                // alert("error on sending");
            }
        })
 

        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "http://apis.agripoa.com/api/test?platform=android",
        //     "method": "GET",
        //     "processData": false,
        //     "data": "{}"
        //   };
        
        // $.ajax(settings).done(function (response) {
        //     console.log(response);
        // }).fail(function(){
        //     console.log('fail');
        // });



        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://maps.googleapis.com/maps/api/geocode/json?address="+name+"&key=AIzaSyD-T2yF06JC5U_8Lou45QeKVV8XXqXoZNE",
        //     "method": "POST",
        //     "headers": {
        //         "Content-Type": "application/json"
        //     },
        //     "processData": false
        // };
        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "https://fixchap.com/dev/marketplace/etc/api/hey",
        //     "method": "POST",
        //     "headers": {
        //         "Content-Type": "application/json"
        //     },
        //     "processData": false
        // };
        // alert("1234");
        // $.ajax(settings).done(function (response) {
        //     alert("1ffff234");
        //     alert(response);
        //     var data = JSON.parse(JSON.stringify(response));
        //     if(data.status == 'OK'){
        //         var slat = data.results[0].geometry.location.lat;
        //         var slong = data.results[0].geometry.location.lng;
        //         localStorage.lat = slat;
        //         localStorage.lng = slong;
        //         localStorage.address_name = name;
                
        //         map.setOptions({
        //           'camera': {
        //             'target': {
        //               lat: slat,
        //               lng: slong
        //             },
        //             'zoom': 15
        //           }
        //         });  
        //     } else {
        //         alert("I am here else!");
        //     }
        // });

        $("#done_btn").css("display","inline-block");          
    }

    // After Search
    $("#pac-input").focusout(function(){
      setTimeout(
        function() {
          search_location($("#pac-input").val());
        }, 50);
    });

    $('#location_search_form').submit(function(e){
        e.preventDefault();
        search_location($("#pac-input").val());
    });

    // Clear search box
    $("#pac-input").focus(function() {
        $("#pac-input").val('');
    });

    // Convert lat and log to text and put it on search location
    // Convert lat and log to text and put it on search location
    function get_name_address(latitude, longitude){
       var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fixchap.com/dev/googlemap/api/get_address_name",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "f7d96d68-5e5b-489e-833b-3a666bb3f8b3"
          },
          "processData": false,
          "data": "{\"latitude\":"+latitude+",\"longitude\":"+longitude+"}"
        };

        $.ajax(settings).done(function (response) {
            var data = JSON.parse(response);
            if(data.success){ 
                localStorage.address_name = data.address_name;
                $("#pac-input").val(localStorage.address_name);
                $("#done_btn").css("display","inline-block"); 
            } else {
                fc_error("FixChap failed to retrieve address name. Please try again.");
            } 
        });            
    } 

    // Draging the map
    map.on(plugin.google.maps.event.MAP_DRAG_START, function() {
        localStorage.map_drag = 1;
    });

    map.on(plugin.google.maps.event.MAP_DRAG_END, function() {
        // Get the current camera position.
        var cameraPosition = map.getCameraPosition();
        localStorage.lat = cameraPosition.target.lat;
        localStorage.lng = cameraPosition.target.lng;
        get_name_address(cameraPosition.target.lat, cameraPosition.target.lng);
        $("#done_btn").css("display","inline-block");             
    });
       

    //Back button and on app resume
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("resume", onResume, false);

    function onResume() {
        sync();
    }



    // setInterval(function(){
    //     FCMPlugin.getToken(function(token) {
    //         localStorage.device_id = token;
    //     }, function(error) {
            
    //     }); 

    // }, 10000);

}

$(document).on("deviceready", onDeviceReady);


$(function () {
    var place_date = new Date(localStorage.booking_datetime.replace(/-/g,"/"));

    var myDate = new Date(place_date); // From model.
    // var maxDate = new Date(localStorage.booking_maxdate);
    // var minDate = new Date(localStorage.booking_datetime);
    datetime_display_block(myDate);


    $('#datetimepicker12').datetimepicker({
        inline: true,
        sideBySide: true,
        format: 'DD/MM/YYYY HH:mm',
        stepping: 30,
        viewMode: 'days',
        defaultDate: myDate,
        // options: [],
    }).on('dp.change',function(e){
        var selectedDatetime = e.date.format('YYYY-MM-DD HH:mm:ss');
        var results = check_date(selectedDatetime);
        localStorage.datetime = selectedDatetime;
        if(results == 110){
            if(min_limit_alert == 0){
                swal({
                    html: true,
                    title: "",
                    text: "Need the service urgently?<br>Please confirm to cover additional transport charges to facilitate this.",
                    // type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#13A89F",
                    iconColor: '#13A89F',
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: true },
                    function (isConfirm) {
                        if (isConfirm) {
                            localStorage.datetime = selectedDatetime;
                            min_limit_alert = 1;  
                            swal.close();
                        } else {
                            localStorage.datetime = localStorage.booking_mindate;
                            reset_datetimepicker('min'); 
                        }
                    }
                );  

            }            
        }

        // if(results == 109){
        //     localStorage.datetime = localStorage.booking_mindate;
        //     reset_datetimepicker('min'); 
        // } else if(results == 120){
        //     localStorage.datetime = selectedDatetime;
        // } else if(results == 110){
        //     swal({
        //         html: true,
        //         title: "",
        //         text: "Need the service urgently?<br>Please confirm to cover additional transport charges to facilitate this.",
        //         // type: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#13A89F",
        //         iconColor: '#13A89F',
        //         confirmButtonText: "Yes",
        //         cancelButtonText: "No",
        //         closeOnConfirm: false,
        //         closeOnCancel: true },
        //         function (isConfirm) {
        //             if (isConfirm) {
                      
        //                 localStorage.datetime = selectedDatetime;
        //                 swal.close();
        //             } else {
        //                 localStorage.datetime = localStorage.booking_mindate;
        //                 reset_datetimepicker('min'); 
        //             }
        //         }
        //     );    
        // } else if(results == 130){
        //     localStorage.datetime = localStorage.booking_maxdate;
        //     reset_datetimepicker('max');
        // }
        var myDateDisplay = new Date(localStorage.datetime.replace(/-/g,"/"));
        datetime_display_block(myDateDisplay);
    });

    $('.timepicker').prepend('<div style="text-align: center; padding: 8px; color: #4f6b83; font-weight: bold;">Time</div>')
});

function confirm_time(){
   var results = check_date(localStorage.datetime);
    if(results == 109){
        localStorage.datetime = localStorage.booking_mindate;
        reset_datetimepicker('min');        
    } else if(results == 120 || results == 110){
        go_back_array.push("time"); navigate("review");
    } else if(results == 130){
        localStorage.datetime = localStorage.booking_maxdate;
        reset_datetimepicker('max');
    }
}



function check_date(datetime){
    var date_test = new Date(datetime.replace(/-/g,"/"));
    var minDate = new Date(localStorage.booking_mindate.replace(/-/g,"/"));
    var maxDate = new Date(localStorage.booking_maxdate.replace(/-/g,"/"));
    var this_time_limit = new Date();

    this_time_limit.setMinutes(this_time_limit.getMinutes() + 15); 
    this_time_limit = new Date(this_time_limit); 
    if(date_test < this_time_limit){
        return 109;
    } else if(date_test < minDate){
        return 110;
    } else if (date_test > maxDate) {
        return 130;
    } else {
        return 120;
    }
}


function reset_datetimepicker(x){
    var the_date = new Date(localStorage.datetime.replace(/-/g,"/"));

    if(x=='min'){
        // fc_error("The recommended minimum time to make a request is <span style='color: #4f6b83; font-weight: bold;'>"+the_date+"</span>");
        fc_error("Sorry, the minimum time to book for a service is 15mins from the current time.");
    } else if (x=='max'){
        fc_error("The maximum time to make a request is <span style='color: #4f6b83; font-weight: bold;'>"+the_date+"</span>");
    }

    $('#datetimepicker12').data("DateTimePicker").date(the_date);
    
}

function save_recommend_fundi(id){
    bootbox.hideAll();
    if($.trim($("#recommend_full_name").val()) == '' || $.trim($("#recommend_proffesion").val()) == '' || $.trim($("#recommend_mobile_number").val()) == ''){
        fc_error("All fields are required.");
    } else {
        fc_loading('Sending information..');
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fixchap.com/dev/request/api/recommendFundi",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"
          },
          "processData": false,
          "data": "{\"user_id\":\""+localStorage.user_id+"\",\"name\":\""+$.trim($("#recommend_full_name").val())+"\",\"profession\":\""+$.trim($("#recommend_proffesion").val())+"\",\"mobile\":\""+$.trim($("#recommend_mobile_number").val())+"\"}"
        };

        $.ajax(settings).done(function (response) {
            var data = JSON.parse(response);
            if(data.success){ 
                navigate("home");
                fc_success('Thank you for your feedback!','Information submitted.');
            } else {
                fc_error("FixChap failed to send the information. Please try again.");
            }     
        }).fail(function(){
            fc_error("Connection Error. Please try again later.");
        });
    }
}

function remove_image(id){
    fc_loading('Removing photo..');

	$.ajax({
		url:"https://fixchap.com/dev/request/api/initiate_remove_photo",
		type:'post',
		data: "{\"photo_id\":\""+id+"\"}",
		beforeSend: function(){
			console.log("sending request");
			// alert("sending request");
		},
		success: function(response){
            var data = JSON.parse(response);
            if(data.success){ 
                $("#imgfc"+id).css('display','none');  
                swal.close();
            } else {
                fc_error("FixChap failed to remove image. Please try again.");
            } 
		},
		error: function(xhr){
			console.log("error on sending request");
			// alert("error on sending");
			fc_error("Connection Error. Please try again later.");
		}
	});




    // var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://fixchap.com/dev/request/api/initiate_remove_photo",
    //   "method": "POST",
    //   "headers": {
    //     "Content-Type": "application/json",
    //     "cache-control": "no-cache"
    //   },
    //   "processData": false,
    //   "data": "{\"photo_id\":\""+id+"\"}"
    // };

    // $.ajax(settings).done(function (response) {
    //     var data = JSON.parse(response);
    //     if(data.success){ 
    //         $("#imgfc"+id).css('display','none');  
    //         swal.close();
    //     } else {
    //         fc_error("FixChap failed to remove image. Please try again.");
    //     }     
    // }).fail(function(){
    //     fc_error("Connection Error. Please try again later.");
    // });    
}



$("#user_name").html(localStorage.first_name+' '+localStorage.last_name);

localStorage.pageMap = 0;

if(localStorage.fromlogin == 1) {

} else if (localStorage.thisIsRecentAddress == 1){
    
} else {
    localStorage.locationaccuracy = 2000;
}
localStorage.thisIsRecentAddress = 0;
localStorage.fromlogin = 0;




function get_service2(x, y){
    // localStorage.new_serviceId = x;
    // localStorage.new_serviceName = y;

     
    // localStorage.pageMap = 1;
    // $("#service_nametitle").html(localStorage.new_serviceName);

    //             var checkNav = JSON.parse(localStorage.data);
    //             if(checkNav.recent_addresses_count != 0){
    //                 window.location="pre_map.html";          
    //             } else {
    //                 window.location = 'map.html';
    //             } 

    // // window.location="map.html";

    // // $("#home_page").css('display','none');  
    // // $("#map_page").css('display','block');
    //     bootbox.confirm(`<font style="font-size: 16px; font-weight: bold; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Plumbing Pricing</center></font>
    //         <p style="line-height: 18px; text-align: center; padding-bottom: 0px;">The prices below are labor charges only. They do not include material costs.</p>


    //          <div class="scrollbar  js-scrollbar" style="padding: 0px; border: none; background-color: rgba(255, 255, 255, 0);">
    //         <table>
    //         <tr>
    //           <td class="price_desc price_odd">Assessment Consultation</td>
    //           <td class="price_amount price_odd" style=" ">3,000</td>
    //         </tr>
    //         <tr>
    //           <td  class="price_desc">Sink Installation</td><td class="price_amount">30,000</td>
    //           </tr>
    //         <tr>
    //           <td class="price_desc price_odd">Water Pump Repar</td><td class="price_amount price_odd">25,000</td>
    //           </tr>
    //         <tr>
    //           <td class="price_desc">Toilet Bowl Repair</td><td class="price_amount">20,000</td>
    //         </tr>
    //         <tr>
    //           <td class="price_desc price_odd">Assessment Consultation</td><td class="price_amount price_odd">3,000</td>
    //         </tr>
    //         <tr>
    //           <td class="price_desc">Sink Installation</td><td class="price_amount">30,000</td>
    //           </tr>
    //         <tr>
    //           <td class="price_desc price_odd">Water Pump Repar</td><td class="price_amount price_odd">25,000</td>
    //           </tr>
    //         <tr>
    //           <td class="price_desc">Toilet Bowl Repair</td><td class="price_amount">20,000</td>
    //         </tr>
    //         </table>
    //         </div>
    //         `, function(result){

    //         if(result){
    //             //
    //             var checkNav = JSON.parse(localStorage.data);
    //             if(checkNav.recent_addresses_count != 0){
    //                 window.location="pre_map.html";          
    //             } else {
    //                 window.location = 'map.html';
    //             }  
    //         }

            


    //     }).find('.modal-content').css({ 'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/2; return h+"px"; } });

    

}

function updateApp(){
    // window.location = localStorage.latest_version_link;
    if(device.platform == 'iOS'){
        window.location.href = 'https://apps.apple.com/tz/app/fixchap/id1474252168';
      } else {
        window.location.href = 'https://play.google.com/store/apps/details?id=app.fixchap.com';
      }
}
if (localStorage.getItem("locationaccuracy") === null){
    
    localStorage.locationaccuracy = 20000;
    localStorage.accurateStatus = 0;
}


function onDeviceReady() {

      var div = document.getElementById("mapnotvisible");

      // Create a Google Maps native view under the map_canvas div.  , 
      var map = plugin.google.maps.Map.getMap(div);
 
    var onSuccess = function(position) {
        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;

        // if(localStorage.locationaccuracy > position.coords.accuracy){
        //     localStorage.locationaccuracy = position.coords.accuracy;
        // }

        localStorage.locationaccuracy = position.coords.accuracy;
        
        if(position.coords.accuracy > 50){
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });
            localStorage.accurateStatus = 0;
        } else if (position.coords.accuracy <= 50){
            localStorage.accurateStatus = 1;
            localStorage.lat = position.coords.latitude;
            localStorage.lng = position.coords.longitude;
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });
        }

    };
 
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        // alert('code: '    + error.code    + '\n' +
        //       'message: ' + error.message + '\n');
        navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });
    }
 
    

    
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });


 

    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("resume", onResume, false);

    function onBackKeyDown() {
        navigator.app.exitApp();
    }

    function onResume() {
        // alert("App has been resumed");
    }

    // alert("this is just outside");
    // cordova.plugins.notification.local.schedule({
    //     title: 'My first notification',
    //     text: 'Thats pretty easy...',
    //     foreground: true
    // });

// cordova.plugins.notification.local.schedule({
//     // title: 'My first notification',
//     // text: 'Thats pretty easy...',
//     // foreground: true
// });    

    // cordova.plugins.backgroundMode.setEnabled(false);

    FCMPlugin.getToken(function(token) {
        // alert("This is token Refreshing "+token);
        localStorage.device_id = token;
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fixchap.com/dev/login/api/update/device_id",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "processData": false,
          "data": "{\n\t\"user_id\": \""+localStorage.user_id+"\",\n\t\"device_id\": \""+localStorage.device_id+"\"\n}"
        };

        $.ajax(settings).done(function (response) {
          console.log(response);
        });     
    }, function(error) {
            console.error(error);
    });  

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

    // Bind events
    $(document).on("resume", onResume);

    // $("#theBody").css("display", "block");

var onSuccessLocationFound = function(position) {

        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;
       localStorage.new_lat = position.coords.latitude;
       localStorage.new_long = position.coords.longitude;
    };    
    function onErrorLocation(error) {
        // alert('code: '    + error.code    + '\n' +
        //       'message: ' + error.message + '\n');
    }
    // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation,{enableHighAccuracy: true });   

    // Bind events
    $(document).on("resume", onResume);

    // $('#location-settings').on("click", function(){
    //     cordova.plugins.diagnostic.switchToLocationSettings();
    // });


    function onRequestSuccess(accuracyName, success){
        // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation,{enableHighAccuracy: true }); 
         // window.location="index.html";
        // handleSuccess("Successfully requested accuracy '"+accuracyName+"': "+success.message);
         // navigator.geolocation.getCurrentPosition(onSuccess, onError, { maximumAge: 10000, timeout: 30000, enableHighAccuracy: true });

    }

    function onRequestFailure(error){
        onError("Accuracy request failed: error code="+error.code+"; error message="+error.message);
        // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation, {enableHighAccuracy: true });
    }

    // $('#request-accuracy').on("click", function(){
    //     var accuracy = $('#location-accuracy').val(),
    //         accuracyName  =  $('#location-accuracy option:selected').text();
    //     cordova.plugins.locationAccuracy.request(onRequestSuccess.bind(this, accuracyName), onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
    // });

    cordova.plugins.locationAccuracy.request(onRequestSuccess.bind(this, 3), onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);

    // $('#request-authorization').on("click", function () {

        cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
            if(!authorized){
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                    // handleSuccess("Requested location authorization: authorization was " + status);
                    // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation, {enableHighAccuracy: true });

                }, onError, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
                window.location="index.html";
            }else{
                // onError("App is already authorized to use location");
                // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation, {enableHighAccuracy: true });
                window.location="index.html";
            }
        }, onError);
    // });

    checkState(); 

   

}
$(document).on("deviceready", onDeviceReady);

function notifyMe(title, body){
    // cordova.plugins.notification.local.schedule({
    //     title: title,
    //     text: body,
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

    navigator.notification.beep(1); 
    bootbox.confirm({
        title: title,
        message: body,
        buttons: {
            'cancel': {
                label: 'Dismiss'
            },
            'confirm': {
                label: 'Open'
            }
        },
        callback: function(result) {
            if (result) {
              var title_array = title.split(" ");
              // localStorage.back_address = 'index.html';
              localStorage.request_id = title_array[0].substring(2); 
              window.location="request.html";                  
            }
        }
    }).find('.modal-content').css({ 'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/17; return h+"px"; } }); 
    
    // navigator.notification.confirm(
    //     body, // message
    //      onConfirm,            // callback to invoke with index of button pressed
    //     title,           // title
    //     ['Open','Dismiss']     // buttonLabels
    // );
    // function onConfirm(results){
     
    //     if(results == 1){
    //       var title_array = title.split(" ");
    //       // localStorage.back_address = 'index.html';
    //       localStorage.request_id = title_array[0].substring(2); 
    //       window.location="request.html";  
    //     }
        
       
    // }

}


var onSuccessLocationFound = function(position) {
     
        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;
       localStorage.new_lat = position.coords.latitude;
       localStorage.new_long = position.coords.longitude;
    }; 


function checkState(){
    console.log("Checking location state...");

    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            
             // alert('Can request accuracy');
             // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation, {enableHighAccuracy: true });
        }else{
             // alert('can not request accuracy');
             // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation, {enableHighAccuracy: true });
        }
    });

    // cordova.plugins.diagnostic.isLocationAuthorized(function (authorized) {
    //     if(authorized){
    //         $('#request-authorization').attr('disabled', 'disabled');
    //     }else{
    //         $('#request-authorization').removeAttr('disabled');
    //     }
    // }, onError);

    function evaluateMode(mode){
        //$('#location-mode').text(mode.toUpperCase());
        alert(mode.toUpperCase());
    }
    cordova.plugins.diagnostic.getLocationMode(evaluateMode, onError);
}

function onError(error) {
    // var msg = "An error occurred: " + error;
    // console.error(msg);
    // alert(msg);
     checkState();
}

function handleSuccess(msg){
    // console.log(msg);
    // alert(msg);
    checkState();
}

function onResume(){
    checkState();
}

$(document).on("deviceready", onDeviceReady);




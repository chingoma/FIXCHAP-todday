


function onDeviceReady() {
 


    function onBackKeyDown() {
        // navigator.app.exitApp();
    }

    function onResume() {
        // alert("App has been resumed");
    }




  
    function onErrorLocation(error) {

    }
    // navigator.geolocation.getCurrentPosition(onSuccessLocationFound, onErrorLocation,{enableHighAccuracy: true });   

    // Bind events
    $(document).on("resume", onResume);

    // $('#location-settings').on("click", function(){
    //     cordova.plugins.diagnostic.switchToLocationSettings();
    // });


    function onRequestSuccess(accuracyName, success){

    }

    function onRequestFailure(error){

    }


    cordova.plugins.locationAccuracy.request(onRequestSuccess.bind(this, 3), onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);



    checkState();    

}
$(document).on("deviceready", onDeviceReady);

// function notifyMe(title, body){
//     cordova.plugins.notification.local.schedule({
//         title: title,
//         text: body,
//         smallIcon: 'res://notification_icon',
//         foreground: true
//     }); 
//     cordova.plugins.notification.local.on("click", function (notification) {
//         if(title == 'New Request'){
//             window.location="index.html";
//         } else if (title == 'New Update Available'){
//                 window.location= localStorage.latest_version_link;
//             } else {
//           var title_array = title.split(" ");
//           localStorage.back_address = 'index.html';
//           localStorage.request_id = title_array[0].substring(2); 
//           window.location="request.html";            
//         }
//     });    
// }


var onSuccessLocationFound = function(position) {
     
        localStorage.lat = position.coords.latitude;
        localStorage.lng = position.coords.longitude;
       localStorage.new_lat = position.coords.latitude;
       localStorage.new_long = position.coords.longitude;
    }; 


function checkState(){

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
function load_plugins() {
    // Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);			
}

    // PhoneGap is ready
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);


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

    function onBackKeyDown() {
        window.location=localStorage.returnfromtime;
    }  
} 

load_plugins();
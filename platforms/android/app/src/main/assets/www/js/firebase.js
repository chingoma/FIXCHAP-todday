function formatNow() {
  var now = new Date();
  return (
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds() +
    "." +
    now.getMilliseconds()
  );
}

function addToLog(log) {
  
}

function trySomeTimes(asyncFunc, onSuccess, onFailure, customTries) {
  var tries = typeof customTries === "undefined" ? 100 : customTries;
  var interval = setTimeout(function () {
    if (typeof asyncFunc !== "function") {
      onSuccess("Unavailable");
      return;
    }
    asyncFunc()
      .then(function (result) {
        if ((result !== null && result !== "") || tries < 0) {
          onSuccess(result);
        } else {
          trySomeTimes(asyncFunc, onSuccess, onFailure, tries - 1);
        }
      })
      .catch(function (e) {
        clearInterval(interval);
        onFailure(e);
      });
  }, 100);
}

function setupOnTokenRefresh() {
  FCM.eventTarget.addEventListener(
    "tokenRefresh",
    function (data) {
        localStorage.device_id = data.detail;
        sync();
      addToLog("<p>FCM Token refreshed to " + data.detail + "</p>");
    },
    false
  );
}

function setupOnNotification() {
  FCM.eventTarget.addEventListener(
    "notification",
    function (data) {
      const obj = JSON.parse(JSON.stringify(data.detail, null, 2));
        handleNotification(obj)
    },
    false
  );
  FCM.getInitialPushPayload()
    .then((payload) => {
      if(payload != null){
          var string = device.platform;
          if(string == "iOS"){
              const obj = JSON.parse(JSON.stringify(payload, null, 2));
              if(localStorage.wasTapped != obj.item_id){
                  handleNotification(obj)
              }else{
                  localStorage.wasTapped = 0;
              }
          }

      }
      
    })
    .catch((error) => {
      addToLog(
        "<p>Initial Payload Error</p><pre>" +
          JSON.stringify(error, null, 2) +
          "</pre>"
      );
    });
}

function logFCMToken() {
  trySomeTimes(
    FCM.getToken,
    function (token) {
        localStorage.device_id = token;
        sync();
      addToLog("<p>Started listening FCM as " + token + "</p>");
    },
    function (error) {
      addToLog("<p>Error on listening for FCM token: " + error + "</p>");
    }
  );
}

function logAPNSToken() {
  if (cordova.platformId !== "ios") {
    return;
  }
  FCM.getAPNSToken(
    function (token) {
      addToLog("<p>Started listening APNS as " + token + "</p>");
    },
    function (error) {
      addToLog("<p>Error on listening for APNS token: " + error + "</p>");
    }
  );
}

function setupClearAllNotificationsButton() {
  document.getElementById("clear-all-notifications").addEventListener(
    "click",
    function () {
      FCM.clearAllNotifications();
    },
    false
  );
}

function setupClearAllNotificationsButton() {
  document.getElementById("delete-instance-id").addEventListener(
    "click",
    function () {
      FCM.deleteInstanceId().catch(function (error) {
        
      });
    },
    false
  );
}

function waitForPermission(callback) {
  FCM.requestPushPermission()
    .then(function (didIt) {
      if (didIt) {
        callback();
      } else {
        addToLog("<p>Push permission was not given to this application</p>");
      }
    })
    .catch(function (error) {
      addToLog("<p>Error on checking permission: " + error + "</p>");
    });
}

function logHasPermissionOnStart() {
  FCM.hasPermission().then(function (hasIt) {
    addToLog("<p>Started with permission: " + JSON.stringify(hasIt) + "</p>");
  });
}

function setupListeners() {
  logHasPermissionOnStart();
  waitForPermission(function () {
    FCM.createNotificationChannel({
      id: "sound_alert6",
      name: "Sound Alert6",
      // description: "Useless",
      importance: "high",
      // visibility: "public",
      sound: "elet_mp3",
      // lights: false,
      // vibration: false,
    });
    logFCMToken();
    logAPNSToken();
    setupOnTokenRefresh();
    setupOnNotification();
  });
}


  function handleNotification(notification){ 

    if(notification.wasTapped){
            if(notification.request_id > 0){
                load_request(notification.request_id, 'on_progress');
            } else if(notification.item_id > 0){
                window.location.href="marketplace/index.html?id="+notification.item_id;
            } else if(notification.request_id == 0){
                swal({
                    title: notification.title,
                    text: notification.body,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#13A89F",
                    iconColor: '#13A89F',
                    confirmButtonText: notification.confirm_label,
                    cancelButtonText: "Dismiss",
                    closeOnConfirm: true,
                    closeOnCancel: true },
                    function (isConfirm) {
                        if (isConfirm) {
                            if(notification.url_link.substring(0, 9) == 'pickandgo'){
                                window.location.href = notification.url_link;
                            } else {
                                window.location.href = notification.url_link+"?id="+localStorage.user_id;
                            }

                        }
                    }
                ); 
                $(".sa-warning").css('display','none'); 
            }  else {
                fc_error(notification.body);
            }
        } else {
            navigator.notification.beep(1); 
            if(notification.request_id > 0){
                if(localStorage.current_page_request_id != notification.request_id){
                    swal({
                        title: "FC"+notification.request_id,
                        text: notification.body,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#13A89F",
                        iconColor: '#13A89F',
                        confirmButtonText: "View",
                        cancelButtonText: "Dismiss",
                        closeOnConfirm: true,
                        closeOnCancel: true },
                        function (isConfirm) {
                            if (isConfirm) {
                                load_request(notification.request_id, 'on_progress');
                            }
                        }
                    );                    
                }  else {
                    fc_error(notification.body);
                }
            } else if (notification.item_id > 0){
                swal({
                    title: notification.title,
                    text: notification.body,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#13A89F",
                    iconColor: '#13A89F',
                    confirmButtonText: notification.confirm_label,
                    cancelButtonText: "Dismiss",
                    closeOnConfirm: true,
                    closeOnCancel: true },
                    function (isConfirm) {
                        if (isConfirm) {
                            window.location.href="marketplace/index.html?id="+notification.item_id;
                        }
                    }
                ); 
            } else if(notification.request_id == 0){
                swal({
                    title: notification.title,
                    text: notification.body,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#13A89F",
                    iconColor: '#13A89F',
                    confirmButtonText: notification.confirm_label,
                    cancelButtonText: "Dismiss",
                    closeOnConfirm: true,
                    closeOnCancel: true },
                    function (isConfirm) {
                        if (isConfirm) {
                            if(notification.url_link.substring(0, 9) == 'pickandgo'){
                                window.location.href =notification.url_link;
                            } else {
                                window.location.href =notification.url_link+"?id="+localStorage.user_id;
                            }
                            
                        }
                    }
                ); 
                $(".sa-warning").css('display','none');                     
            } else {
                fc_error(notification.body);
            }
        }
  }

document.addEventListener("deviceready", setupListeners, false);
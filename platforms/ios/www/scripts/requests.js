


$("#user_name").html(localStorage.first_name+' '+localStorage.last_name);

function load_plugins() {
    // Wait for PhoneGap to load
    document.addEventListener("deviceready", onDeviceReady, false);			
}

    // PhoneGap is ready
function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown() {
        window.location="index.html";
    }  

    window.FirebasePlugin.onNotificationOpen(function(notification) {
        if(notification.tap){
            window.location="index.html";
        } else {
            notifyMe(notification.title, notification.body);
        }
    }, function(error) {
        console.error(error);
    });    

    // Bind events
    $(document).on("resume", onResume);    
} 

load_plugins();

function go_to_request(x){
   localStorage.request_id = x;
   window.location="request.html";
}

function notifyMe(title, body){
    cordova.plugins.notification.local.schedule({
        title: title,
        text: body,
        smallIcon: 'res://notification_icon',
        foreground: true
    }); 
    cordova.plugins.notification.local.on("click", function (notification) {
      window.location="index.html";
    });    
}

function sync(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/request/api/customerSync",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": "{\"user_id\": \""+localStorage.user_id+"\"}"
  };


  $.ajax(settings).done(function (response) {
    var data = JSON.parse(response);
      if(JSON.stringify(data) != localStorage.data){
        if(data.success){
          localStorage.data = JSON.stringify(data);   
            $('#sync_upcoming').html(''); 
            $('#sync_upcoming').html(''); 
            update();


            // if(JSON.stringify(data.upcoming) != localStorage.sync_upcoming){
            //     localStorage.sync_upcoming = JSON.stringify(data.upcoming);
            //     adjust('upcoming');
            // } else {
            // 		adjust('upcoming');
            // }
            // if(JSON.stringify(data.completed) != localStorage.sync_completed){
            //     localStorage.sync_completed = JSON.stringify(data.completed);
            //     adjust('completed');
            // } else {
            // 		adjust('completed');
            // }
            // localStorage.upcoming_count = data.upcoming_count;
        }
    }
  }).fail(function() {
       adjust('upcoming');
       adjust('completed');
  });    
}

function update(){
  if(localStorage.data != ''){
    var data = JSON.parse(localStorage.data);
    for(var i in data.upcoming){
      $('#sync_upcoming').prepend(`
        <button id="request-`+data.upcoming[i].request_id+`" class="details_panel" style="text-align: left; line-height: 17px;" onclick="go_to_request(`+data.upcoming[i].request_id+`)">
          <font class="details_head">FC`+data.upcoming[i].request_id+`  `+data.upcoming[i].service_name+`</font><br>
          <font style="font-size: 12px; color: #888C78;">`+data.upcoming[i].mapName+`</font>
          <table style="margin: -5px 0px 0px 0px;">
            <tr>
              <td style="text-align: left; font-style: italic;"><font class="details_value" >`+data.upcoming[i].request_status+`</font></td>
              <td style="text-align: right;"><font class="details_value" style="color: #989A89;">`+data.upcoming[i].request_attend_datetime+`</font></td>
            </tr>
          </table>
        </button>
        `);            
    }  
    for(var i in data.completed){
      $('#sync_completed').prepend(`
        <button id="request-`+data.completed[i].request_id+`" class="details_panel" style="text-align: left; line-height: 17px;" onclick="go_to_request(`+data.completed[i].request_id+`)">
          <font class="details_head">FC`+data.completed[i].request_id+`  `+data.completed[i].service_name+`</font><br>
          <font style="font-size: 12px; color: #888C78;">`+data.completed[i].mapName+`</font>
          <table style="margin: -5px 0px 0px 0px;">
            <tr>
              <td style="text-align: left; font-style: italic;"><font class="details_value" >`+data.completed[i].request_status+`</font></td>
              <td style="text-align: right;"><font class="details_value" style="color: #989A89;">`+data.completed[i].request_attend_datetime+`</font></td>
            </tr>
          </table>
        </button>
        `);            
    }  
  } 
}

update();


function adjust(x){
      if(x == 'upcoming'){
        var onlinelist = JSON.parse(localStorage.sync_upcoming);
        if($('#sync_upcoming').html() == ''){
        	var offlinelist = JSON.parse('[]');   
        } else {
        	var offlinelist = JSON.parse(localStorage.sync_upcomingOffline);   
        }
             
      } else if(x== 'completed'){
        var onlinelist = JSON.parse(localStorage.sync_completed);
      	if($('#sync_completed').html() == ''){
        	var offlinelist = JSON.parse('[]');   
        } else {
        	var offlinelist = JSON.parse(localStorage.sync_completedOffline);    
        }      
      }


      var onlineArray = new Array();
      var offlineArray = new Array();

      var onlineService = new Array();
      var onlineMapName = new Array();
      var onlineDate = new Array();
      var onlineStatus = new Array();
      var offlineStatus = new Array();

      for (var i in onlinelist) {
        onlineArray[i] = onlinelist[i].request_id;
        onlineService[i] = onlinelist[i].service_name;
        onlineMapName[i] = onlinelist[i].mapName;
        onlineDate[i] = onlinelist[i].request_attend_datetime;
        onlineStatus[i] = onlinelist[i].request_status;
        $('#status-'+onlineArray[i]).html(onlineStatus[i]);        
      }

      for (var i in offlinelist) {
        offlineArray[i] = offlinelist[i].request_id;
        offlineStatus[$i] = offlinelist[i].request_status;
      }
    

      for (var i in offlineArray) {         
        if(onlineArray.indexOf(offlineArray[i]) < 0){
          $('#request-'+offlineArray[i]).remove();
        }
      }

      for (var i in onlineArray) {         
        if(offlineArray.indexOf(onlineArray[i]) < 0){
          $('#sync_'+x).prepend(`
            <button id="request-`+onlineArray[i]+`" class="details_panel" style="text-align: left; line-height: 17px;" onclick="go_to_request(`+onlineArray[i]+`)">
              <font class="details_head">FC`+onlineArray[i]+`  `+onlineService[i]+`</font><br>
              <font style="font-size: 12px; color: #888C78;">`+onlineMapName[i]+`</font>
              <table style="margin: -5px 0px 0px 0px;">
                <tr>
                  <td style="text-align: left; font-style: italic;"><font class="details_value" id="status-`+onlineArray[i]+`">`+onlineStatus[i]+`</font></td>
                  <td style="text-align: right;"><font class="details_value" style="color: #989A89;">`+onlineDate[i]+`</font></td>
                </tr>
              </table>
            </button>
            `);
        }

      } 


      if(x == 'upcoming'){
        localStorage.sync_upcomingOffline = localStorage.sync_upcoming;
      } else if(x == 'completed'){
        localStorage.sync_completedOffline = localStorage.sync_completed;
      }
      
}

sync();      
setInterval(function(){
   sync();
}, 5000);
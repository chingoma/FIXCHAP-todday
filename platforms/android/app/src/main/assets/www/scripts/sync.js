if (localStorage.intro == null){
    window.location.href="about.html";
} 

if(localStorage.session == null){
  // log_me_out(650);
  // IOS Comment the following
  // window.location="login.html";
} 

function log_me_out(x){
    if(x == 650){
      $(".registered").css('display','none');
      $(".unregistered").css('display','block');  
      localStorage.clear();
      window.location="about.html";       
    } else {
      fc_loading("<div style='line-height: 24px;'>Signing out..</div>");
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/login/api/update/device_id",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
         "data": "{\"user_id\": \""+localStorage.user_id+"\",\"device_id\": \"undefined\"}"
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if(data.success){ 
          $(".registered").css('display','none');
          $(".unregistered").css('display','block');  
          localStorage.clear();
          window.location="about.html"; 
        } else {
          fc_error('Failed to sign out. Try again!'); 
        }
      }).fail(function() {
          fc_error('No connection!'); 
      });

    }
}


localStorage.current_version = "1.1.3";
localStorage.offline = 0;

if(localStorage.session == 1){
  $("#user_name").html(localStorage.first_name+' '+localStorage.last_name);
  $(".unregistered").css('display','none');
  $(".registered").css('display','block');  
} else {
    $(".registered").css('display','none');
    $(".unregistered").css('display','block');  
}


$("#version_code").html(localStorage.current_version);

function display_mobile_number(x){
  return "+"+x.substring(0, 3)+" "+x.substring(3, 6)+" "+x.substring(6, 9)+" "+x.substring(9, 12);
}

function sync(){
  if(localStorage.session == null){
    $(".registered").css('display','none');
    $(".unregistered").css('display','block');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/app_sync/api/unregisteredSync",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        $(".fixchap-connection").css('display','none');
        if(data.success){ 
          localStorage.offline = 0;
          var stringdata = JSON.stringify(data).replace("'", "`");
          if(stringdata != localStorage.data){
            localStorage.data = stringdata;
            update();
          }
        } else {
          localStorage.offline++;
        }
      }).fail(function() {
          localStorage.offline++;
      });  
    } else {
      $(".unregistered").css('display','none');
      $(".registered").css('display','block');
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/app_sync/api/customerSync",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"device_id\": \""+localStorage.device_id+"\"}"
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        $(".fixchap-connection").css('display','none');
        if(data.success){ 
          localStorage.offline = 0;
          var stringdata = JSON.stringify(data).replace("'", "`");
          if(stringdata != localStorage.data){
            localStorage.data = stringdata;
            if(localStorage.current_page_request_id != 0){
              load_request(localStorage.current_page_request_id,localStorage.current_page_channel);
            }
            update();
          }
        } else {
          localStorage.offline++;
        }
      }).fail(function() {
          localStorage.offline++;
      });  
    }
}

function update(){
  if(localStorage.data != ''){
    display();
  }   
}

function menu_superscript(menu, number){
    if(number > 0 && number < 10){
        $("#sup_"+menu).html('<font class="the_sup">&nbsp;'+number+'&nbsp;</font><br><br><br>');
    } else if(number >= 10){
        $("#sup_"+menu).html('<font class="the_sup">'+number+'</font><br><br><br>');
    } else if(number == 0){
        $("#sup_"+menu).html('');
    }
}



// menu_superscript('onprogress', 56);

function display(){
    var data = JSON.parse(localStorage.data);

    localStorage.latest_version = data.latest_version;
    localStorage.new_date = data.booking_date;
    localStorage.booking_hour = data.booking_hour;
    localStorage.booking_min = data.booking_min;

    // localStorage.syc_datetime = data.sync_type;
    localStorage.dpo = data.dpo;
    localStorage.latest_version_link = data.latest_version_link;

    localStorage.booking_datetime = data.booking_datetime;
    localStorage.booking_mindate = data.booking_datetime;
    localStorage.booking_maxdate = data.booking_maxdate;

    localStorage.on_progress_request_id = 0;
    localStorage.on_progress_count = 0;

    localStorage.toRate = data.toRate;

     if(localStorage.session == null){

      } else {
        localStorage.pname = data.user_info.user_name;    
        localStorage.pemail = data.user_info.user_email;
        localStorage.pmobile = data.user_info.user_mobile;
        localStorage.paltmobile = data.user_info.alt_number;
        localStorage.planguage = data.user_info.user_language;

        $('#user_name').html(data.user_info.user_name);
        $('#st_name').html(data.user_info.user_name);
        $('#st_email').html(data.user_info.user_email);
        $('#st_mobile').html(display_mobile_number(data.user_info.user_mobile));
        $('#st_altmobile').html(display_mobile_number(data.user_info.alt_number));
        $('#st_language').html(data.user_info.user_language);

        $(".up_photo").attr('src', data.user_info.user_photo);

        if(data.user_info.user_language == null){
          $('#st_language').html('English');
          localStorage.planguage = 'English';
        }        
      }

 
    // Check for update
    var latest = localStorage.latest_version;
    var current = localStorage.current_version;

    latest = latest.replace(".", "");
    latest = latest.replace(".", "");

    current = current.replace(".", "");
    current = current.replace(".", "");
    
    
    if(latest*1 > current*1){
      swal({
          html: true,
          title: "<span style='color: #13A89F;'>Update FixChap Now</span>",
          text: '<p style="line-height: 23px;">You are using an old version of FixChap App. To continue using FixChap services update the app.</p>',
          allowOutsideClick: false, 
          confirmButtonColor: "#13A89F",
          confirmButtonText: "Update Now",
          closeOnConfirm: false,
          closeOnCancel: true },
          function (isConfirm) {
              if (isConfirm) {
                  if(device.platform == 'iOS'){
                    window.location.href = 'https://apps.apple.com/tz/app/fixchap/id1474252168';
                  } else {
                    window.location.href = 'https://play.google.com/store/apps/details?id=app.fixchap.com';
                  }
              }
          }
      );
      setTimeout(function(){ 
        if(device.platform == 'iOS'){
          window.location.href = 'https://apps.apple.com/tz/app/fixchap/id1474252168';
        } else {
          window.location.href = 'https://play.google.com/store/apps/details?id=app.fixchap.com';
        }
      }, 6000);  
    } 

    if(localStorage.session == 1){

        // Auto logout when login with another device
        if(localStorage.code != data.login_token){
            log_me_out(650);     
        }

        // Update Address List
        $('#fc-address-list').html('');
        for(var i in data.recent_addresses){  
          data.recent_addresses[i].address_name = data.recent_addresses[i].address_name.replace("'", "`");
          $('#fc-address-list').append('<div class="address-card-body"><table style="margin-bottom: 10px;"><tr><td onclick="select_address(\''+data.recent_addresses[i].address_id+'\',\''+data.recent_addresses[i].fullName+'\',\''+data.recent_addresses[i].address_name+'\')" class="address-card-title">'+data.recent_addresses[i].address_name+'</td><td style="width: 20%; text-align: center;" onclick="address_options(\''+data.recent_addresses[i].address_id+'\',\''+data.recent_addresses[i].address_name+'\')"><i class="fa fa-ellipsis-h"></i></td></tr><tr><td onclick="select_address(\''+data.recent_addresses[i].address_id+'\',\''+data.recent_addresses[i].fullName+'\',\''+data.recent_addresses[i].address_name+'\')" colspan="2" class="address-card-details">'+data.recent_addresses[i].fullName+'</td></tr></table></div>');    
        }

        $('#on_progress_list').html('');
        count = 0;
        for(var i in data.onprogress){  
          $('#on_progress_list').prepend('<div class="fc-req-card" onclick="load_request(\''+data.onprogress[i].request_id+'\',\'on_progress\')"><div class="fc-rc-req_no">FC'+data.onprogress[i].request_id+'</div><div class="row"><div class="col-xs-7"><div class="fc-rc-title">'+data.onprogress[i].service_name+'</div></div><div class="col-xs-5"><div class="fc-rc-date">'+data.onprogress[i].request_attend_date_display+'</div></div><div class="col-xs-12"><div class="fc-rc-address">'+data.onprogress[i].mapName+'</div></div><div class="col-xs-12"><div class="fc-rc-time">'+data.onprogress[i].request_attend_time_display+'</div></div></div></div>');
          count++;     
          localStorage.on_progress_request_id = data.onprogress[i].request_id; 
        }
        menu_superscript('onprogress', count);
        localStorage.on_progress_count = count;

        count=0;
        $('#completed_list').html('');
        for(var i in data.completed){
          var rating_string = rating_display(data.completed[i].rating);
          $('#completed_list').append('<div class="fc-req-card" onclick="load_request(\''+data.completed[i].request_id+'\',\'completed\')"><div class="fc-rc-req_no">FC'+data.completed[i].request_id+'</div><div class="row"><div class="col-xs-7"><div class="fc-rc-title">'+data.completed[i].service_name+'</div></div><div class="col-xs-5"><div class="fc-rc-date">'+data.completed[i].request_attend_date_display+'</div></div><div class="col-xs-12"><div class="fc-rc-address">'+data.completed[i].mapName+'</div></div><div class="col-xs-6"><div class="fc-rc-rate">'+rating_string+'</div></div><div class="col-xs-6"><div class="fc-rc-time">'+data.completed[i].request_attend_time_display+'</div></div></div></div>');
          count++;  
        }
        menu_superscript('completed', count);
    }

    $('#accordion').html('');
    for(var i in data.pricing){
        var theList = '<table>';
        for(var j in data.pricing[i].pricelist){
          theList += '<tr><td style="text-align: left; border-bottom: 1px solid #E4E4E4; padding: 8px 0px 8px 0px;">'+data.pricing[i].pricelist[j].charge_details+'</td><td style="border-bottom: 1px solid #E4E4E4; text-align: right; padding: 8px 0px 8px 0px; width: 20%;">'+number_format(data.pricing[i].pricelist[j].charge_amount)+'</td></tr>';
        }
        theList += '</table>'; // #f5f5f5

        $('#accordion').append('<div class="panel panel-default"><a data-toggle="collapse" data-parent="#accordion" href="#collapse'+data.pricing[i].service_id+'" id="vp_'+data.pricing[i].service_id+'" style="text-decoration: none; color: black;"><div class="panel-heading" style="background-color: #f5f5f5;"><h4 class="panel-title" style="text-align: center;">'+data.pricing[i].service_name+'</h4></div></a><div id="collapse'+data.pricing[i].service_id+'" class="panel-collapse collapse"><div class="panel-body">'+theList+'</div></div></div>');

        // $('#accordion').append('<div class="panel panel-default"><a onclick="view_pricing('+data.pricing[i].service_id+',\''+data.pricing[i].service_name+'\')" style="text-decoration: none; color: black;"><div class="panel-heading" style="background-color: #f5f5f5;"><h4 class="panel-title" style="text-align: center;">'+data.pricing[i].service_name+'</h4></div></a></div>');
    }

    // Check if there is a request to rate
    
    
}
display();
sync(); 
     
setInterval(function(){
   sync();
   if(localStorage.offline >= 4){
      $(".fixchap-connection").html('Sorry! FixChap Connection Error.');
      $(".fixchap-connection").css('display','block');    
   }
}, 4000);



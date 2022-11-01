localStorage.likeUpdate = '[]';

var go_to_new_item_marketplace = 0;

function sign_in(x){
    go_to_new_item_marketplace = 0;
    bootbox.hideAll();
    setTimeout(function(){ 
        var more_clarify = '';
        if(x == 130){
            more_clarify = '<h3 style="color: #13A89F; font-size:15px; line-height: 19px;">To access all features please verify your mobile number.</h3>';
        } else {
            if(x==5565666){
                go_to_new_item_marketplace = 1;
            }
            go_to_address = 0;
            more_clarify = '<h3 style="color: #13A89F; font-size:18px;">Verify your mobile number</h3>';
        }

        var login_panel = ''+
            '<center>'+more_clarify+
            '<p style="font-size: 12px; line-height: 16px; padding: 10px 20px 10px 20px; color: #4f6b83">FixChap will send an SMS to verify your mobile number.</p>'+
            '<input spellcheck="false" id="mobile_number_login" placeholder="Enter mobile number" class="fc-bootbox-input-login login_element" style="font-size: 24px; text-align: center;" value="" type="number">'+
            '<div style="color: #e13247; font-size: 12px;" id="login_error_msg">&nbsp;</div>'+
            '<button onclick="bootbox.hideAll();" style="background-color: #B2AFAF; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Cancel</button>'+
            '<button onclick="send_code()" style="background-color: #13A89F; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Send Code</button>'+
            '</center>'+
        '';

        bootbox.alert({
            message: login_panel
        }).find('.modal-content').css({ 
            'margin-top': function (){
                var w = $( window ).height(); 
                var b = $(".modal-dialog").height(); 
                var h = (w-b)/4; 
                return h+"px"; 
            } 
        });
        $(".bootbox-close-button").css('display','none');
        $(".modal-footer").css('display','none'); 
    }, 300);


 
}
var verified = 0;
var login_data = '';
var number = '';

function verify(x, code){
    if($.trim($("#verification_code").val()) == code){
        verified = 1;
        update_personal_information();
    } else {
        if(x == 105){
            fc_error("Incorrect code.");
        }
    }
}


function update_personal_information(){
    if(login_data.email == 'null' || login_data.email == null){
        login_data.email = '';
    }
    var panel = ''+
        '<center>'+
        '<h3 style="color: #13A89F; font-size:18px;">Personal Information</h3>'+
        '</center>'+
           ' <div class="fc-bootbox-title" style="color: #A4A4A4; font-size: 14px;">First Name</div>'+
            '<div style="padding: 0px;">'+
               '<input spellcheck="false" id="update_first_name" value="'+login_data.first_name+'" class="fc-bootbox-input" style="margin: 0px;" placeholder="" type="text"/>'+
            '</div>'+
            '<div style="margin-top: 10px; color: #A4A4A4; font-size: 14px;" class="fc-bootbox-title">Last Name</div>'+
            '<div>'+
               '<input spellcheck="false" id="update_last_name" value="'+login_data.last_name+'"  class="fc-bootbox-input" style="margin: 0px;" placeholder="" type="text"/>'+
            '</div>'+
            '<div style="margin-top: 10px; color: #A4A4A4; font-size: 14px;" class="fc-bootbox-title">Emergency Contact</div>'+
            '<div style="margin-top: -10px; color: #A4A4A4; font-size: 11px;" class="fc-bootbox-title">Incase we can\'t reach you</div>'+
            '<div>'+
               ' <input spellcheck="false" id="update_econtact" class="fc-bootbox-input" value="'+login_data.alt_number+'" style="margin: 0px;" placeholder="" type="number"/>'+
            '</div>'+
            '<div style="margin-top: 10px; color: #A4A4A4; font-size: 14px;"  class="fc-bootbox-title">Email Address</div>'+
            '<div>'+
            '    <input spellcheck="false" id="update_email" class="fc-bootbox-input" value="'+login_data.email+'"  style="margin: 0px;" placeholder="" type="text"/>'+
            '</div>'+
            '<div class="fc-bootbox-btns">'+
                '<font onclick="update_personal_information_save();">SUBMIT</font>'+
            '</div> ' +               
    '';

    bootbox.alert({
        message: panel
    }).find('.modal-content').css({ 
        'margin-top': function (){
            var w = $( window ).height(); 
            var b = $(".modal-dialog").height(); 
            var h = (w-b)/4; 
            return h+"px"; 
        } 
    });
    $(".bootbox-close-button").css('display','none');
    $(".modal-footer").css('display','none'); 
}


function update_personal_information_save(){
    var firstname = $("#update_first_name").val().trim();
    var lastname = $("#update_last_name").val().trim();
    var econtact = $("#update_econtact").val().trim();
    var user_email = $("#update_email").val().trim();

    firstname = firstname.toLowerCase();
    lastname = lastname.toLowerCase();

    firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);

    if(firstname == ''){
        fc_error("Enter first name.");
    } else if(!firstname.match(/^[A-Za-z]+$/)){
        fc_error("The first name is incorrect.");
    } else if(lastname == ''){
        fc_error("Enter last name.");
    } else if(!lastname.match(/^[A-Za-z]+$/)){
        fc_error("The last name is incorrect");
    } else if(econtact == ''){
        fc_error("Enter emergency number.");
    } else if(!econtact.match(/^[+][2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/) 
        && !econtact.match(/^[2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)            
        && !econtact.match(/^[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)){
        fc_error("The emergency contact is incorrect.");
    } else if(econtact.substring(econtact.length - 9) == number){
        fc_error("Enter another emergency number. It should be different from your login number.");
    } else if(user_email == ''){
        fc_error("Enter email address");
    } else if(!user_email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        fc_error("The email address is ivalid");
    } else {
        fc_loading("<div style='line-height: 24px;'>Updating..</div>");
        var theecontact = "255"+econtact.substring(econtact.length - 9);
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fixchap.com/dev/login/api/update/name",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "processData": false,
           "data": "{\"user_id\":\""+login_data.user_id+"\",\"code\":\""+login_data.code+"\",\"user_email\":\""+user_email+"\",\"first_name\":\""+firstname+"\",\"alt_number\":\""+theecontact+"\",\"platform\":\""+localStorage.platform+"\",\"user_agent\":\""+localStorage.user_agent+"\",\"the_last_name\":\""+lastname+"\"}" 
        };

        $.ajax(settings).done(function (response) {
            var data = JSON.parse(response);
            if(data.success){
                

                localStorage.alt_number = theecontact;
                localStorage.first_name = firstname;
                localStorage.last_name = lastname;
                localStorage.user_photo = login_data.user_photo;
                localStorage.email = user_email;
                localStorage.user_id = login_data.user_id;
                localStorage.code = login_data.code;
                localStorage.session = 1;

                if(go_to_new_item_marketplace == 1){
                    window.location.href = "marketplace/index.html?new_item=1";
                }

                $("#user_name").html(localStorage.first_name+' '+localStorage.last_name);
                $('#alt_number').val(localStorage.alt_number);
                $(".unregistered").css('display','none');
                $(".registered").css('display','block');



                function first_sync(){
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
                    if(data.success){ 
                        var stringdata = JSON.stringify(data).replace("'", "`");

                        var settings = {
                            "async": true,
                            "crossDomain": true,
                            "url": "https://fixchap.com/dev/pickgo/sync/api/sync",
                            "method": "POST",
                            "headers": {
                              "Content-Type": "application/json"
                            },
                            "processData": false,
                            "data": "{\"user_id\": \""+localStorage.user_id+"\"}"
                          };
                          $.ajax(settings).done(function (response) {
                                var data_pickandgo = JSON.parse(response);
                                if(data_pickandgo.success){ 
                                      var stringdata_pickandgo = JSON.stringify(data_pickandgo).replace("'", "`");
                                      localStorage.pickandgo_data = stringdata_pickandgo;

                                      
                                      if(stringdata != localStorage.data){
                                        localStorage.data = stringdata;
                                        var data = JSON.parse(localStorage.data);
                                        bootbox.hideAll(); 

                                        if(localStorage.pg_src_frc == 13){
                                            window.location="pickandgo.html"; 
                                        } else {
                                            if(go_to_address == 1){
                                                update();

                                                go_back_array.push("home");

                                                setTimeout(function(){ 
                                                    if(data.recent_addresses_count > 0){
                                                        navigate("address");
                                                    } else {                            
                                                        navigate("map");
                                                    } 
                                                }, 2000);
                                                
                                        
                                            } else if(go_to_address == 420){
                                                window.location="pickandgo.html";  
                                            } else if(go_to_market_place == 1){
                                                marketplace();
                                            } else {
                                                update();
                                            }                                            
                                        }
  
                                      }
                                      bootbox.hideAll(); 
                                      fc_success('Welcome '+firstname, 'You have logged in.'); 

                                }

                        }).fail(function() {
                              first_sync();
                              fc_success('API failed!'); 
                          });  


                    }
                  }).fail(function() {
                      first_sync();
                      fc_success('API failed!'); 
                  });                      
                }
                first_sync();



            } else {
                fc_error('Connection error! Try again.');   
            }
        }).fail(function(){
            fc_error('Connection error! Try again.');
        });         
    }

}



function send_code(){
    mobile_number = $("#mobile_number_login").val().trim();
    if(mobile_number == ''){
        fc_error("Enter mobile number.");
    }
    else if(!mobile_number.match(/^[+][2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/) 
        && !mobile_number.match(/^[2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)            
        && !mobile_number.match(/^[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)){    
        fc_error("Incorrect mobile number");
    } else {
        number = mobile_number.substring(mobile_number.length - 9);
        var display_number = "+255 "+number.substring(0, 3)+" "+number.substring(3, 6)+" "+number.substring(6, 9);
        bootbox.hideAll();
        fc_loading("<div style='line-height: 24px;'>Sending verification code to <br><font style='color: #4f6b83; font-weight: bold;'>"+display_number+"</font></div>");
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fixchap.com/dev/login/api/send/code",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "processData": false,
          "data": "{\"mobile\": \"255"+number+"\",\"platform\":\""+localStorage.platform+"\",\"user_agent\":\""+localStorage.user_agent+"\"}"
        };

        $.ajax(settings).done(function (response) {
            var data = JSON.parse(response);
            if(data.success){
                localStorage.mobile_number = "255"+number;
                login_data = data;
                swal.close();

                setInterval(function(){
                    if(verified == 0){
                        verify(104, data.code);
                    }
                }, 1000);

                var panel = ''+
                    '<center>'+
                    '<h3 style="color: #13A89F; font-size:18px;">Verify your mobile number</h3>'+
                    '<p style="font-size: 12px; line-height: 16px; padding: 10px 20px 10px 20px; color: #4f6b83">Enter verification code which has been sent to<br>'+display_number+'.</p>'+
                    
                    '<input spellcheck="false" id="verification_code" placeholder="- - - -" class="fc-bootbox-input-login-verify login_element" style="font-size: 24px; text-align: center;" value="" type="number">'+
                    '<div style="color: #e13247; font-size: 12px;">&nbsp;</div>'+
                    '<button onclick="bootbox.hideAll();" style="background-color: #B2AFAF; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Cancel</button>'+
                    '<button onclick="verify(105, '+data.code+')" style="background-color: #13A89F; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Verify</button>'+
                    '</center>'+
                '';

                bootbox.alert({
                    message: panel
                }).find('.modal-content').css({ 
                    'margin-top': function (){
                        var w = $( window ).height(); 
                        var b = $(".modal-dialog").height(); 
                        var h = (w-b)/4; 
                        return h+"px"; 
                    } 
                });
                $(".bootbox-close-button").css('display','none');
                $(".modal-footer").css('display','none');       

            } else {
                fc_error('Connection error! Try again.');   
            }
        }).fail(function(){
            fc_error('Connection error! Try again.');  
        });        
    }
}
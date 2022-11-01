var profile_phone_verified = 0;

function profile_edit_name(){
	var res = localStorage.pname.split(" ");

	var fname = res[0];
	var lname = res[1];

	swal.close();
	bootbox.alert({
	    message: '<div class="fc-bootbox-title2">First Name</div><div><input spellcheck="false" id="txbxfname" maxlength="20" class="fc-bootbox-input" placeholder="" type="text" value="'+fname+'"/></div><div class="fc-bootbox-title2">Last Name</div><div><input spellcheck="false" id="txbxlname" maxlength="20" class="fc-bootbox-input" placeholder="" type="text" value="'+lname+'"/></div><div class="fc-bootbox-btns"><font onclick="bootbox.hideAll();">CANCEL</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font onclick="profile_save_name();">SAVE</font></div>',
	    backdrop: true
	}).find('.modal-content').css({ 
		'margin-top': function (){
			var w = $( window ).height(); 
			var b = $(".modal-dialog").height(); 
			var h = (w-b)/5; 
			return h+"px"; 
		} 
	});
	$(".bootbox-close-button").css('display','none');
	$(".modal-footer").css('display','none');


    $("#txbxfname, #txbxlname").keydown(function(e) { 
      if( e.which == 8 || (65 <= e.which && e.which <= 90) || e.which == 39 || e.which == 37 || e.which == 189){
        
      } else {
        return false;
      }
    });
}

function profile_save_name(name){
	var name = $( "#txbxfname" ).val().trim()+' '+$( "#txbxlname" ).val().trim();
	fc_loading('Loading...');
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://fixchap.com/dev/profile/api/edit_name",
	  "method": "POST",
	  "headers": {
	    "Content-Type": "application/json",
	    "cache-control": "no-cache"
	  },
	  "processData": false,
	  "data": "{\"user_id\":\""+localStorage.user_id+"\",\"new_name\":\""+name+"\"}"
	};

	$.ajax(settings).done(function (response) {
		var data = JSON.parse(response);
	    if(data.success){ 
	    	    localStorage.first_name = $( "#txbxfname" ).val().trim();
                localStorage.last_name = $( "#txbxlname" ).val().trim();
                localStorage.pname = name;
	    	    $('#user_name').html(name);
    			$('#st_name').html(name);
    			bootbox.hideAll();
	    	sync();
	    	swal.close();
	    } else {
	    	fc_error("FixChap failed to update name. Please try again.");
	    }	  
	}).fail(function(){
		fc_error("Connection Error. Please try again later.");
	});
}

function profile_edit_email(){
	swal.close();
	bootbox.alert({
	    message: '<div class="fc-bootbox-title2">Email Address</div><div><input spellcheck="false" id="txbxemail"  class="fc-bootbox-input" placeholder="" type="email" value="'+localStorage.pemail+'"/></div><div class="fc-bootbox-btns"><font onclick="bootbox.hideAll();">CANCEL</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font onclick="profile_save_email();">SAVE</font></div>',
	    backdrop: true
	}).find('.modal-content').css({ 
		'margin-top': function (){
			var w = $( window ).height(); 
			var b = $(".modal-dialog").height(); 
			var h = (w-b)/5; 
			return h+"px"; 
		} 
	});
	$(".bootbox-close-button").css('display','none');
	$(".modal-footer").css('display','none');
}

function profile_save_email(){
	var email = $( "#txbxemail" ).val().trim();
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(!re.test(email)){
		fc_error("The email address you have entered is invalid.");
	} else {
		bootbox.hideAll();
		fc_loading('Loading...');
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://fixchap.com/dev/profile/api/edit_email",
		  "method": "POST",
		  "headers": {
		    "Content-Type": "application/json",
		    "cache-control": "no-cache"
		  },
		  "processData": false,
		  "data": "{\"user_id\":\""+localStorage.user_id+"\",\"new_email\":\""+email+"\"}"
		};

		$.ajax(settings).done(function (response) {
			var data = JSON.parse(response);
		    if(data.success){ 
    			$('#st_email').html(email);
    			localStorage.email = email;
			    
				localStorage.pemail = email;    			
	    		sync();
	    		swal.close();
		    } else {
		    	fc_error("FixChap failed to update email address. Please try again.");
		    }	  
		}).fail(function(){
			fc_error("Connection Error. Please try again later.");
		});			
	}
}


function profile_edit_phone(){
	profile_phone_verified = 0;

	swal.close();
	bootbox.alert({
	    message: '<div class="fc-bootbox-title2"><center>Mobile Number</center></div><div><center><input spellcheck="false" id="txbxphone"  class="fc-bootbox-input bootbox-phone-input" placeholder="" maxlength="13" type="text" value="'+localStorage.pmobile+'"/></center></div><p class="fc-bootbox-veifyp">FixChap will send an SMS to verify your mobile number.</p><div class="fc-bootbox-btns fc-bootbox-btns-center"><font onclick="bootbox.hideAll();">CANCEL</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font onclick="profile_verify_phone();">VERIFY</font></div>',
	    backdrop: true
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

	$("#txbxphone").keydown(function(e) { 
      if( e.which == 8 || (48 <= e.which && e.which <= 57) || e.which == 39 || e.which == 37 || e.which == 107){
        
      } else {
        return false;
      }
    });
}

function save_new_number(mobile){
	bootbox.hideAll();
	fc_loading('Updating..');
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://fixchap.com/dev/profile/api/edit_phone",
	  "method": "POST",
	  "headers": {
	    "Content-Type": "application/json",
	    "cache-control": "no-cache"
	  },
	  "processData": false,
	  "data": "{\"user_id\":\""+localStorage.user_id+"\",\"new_phone\":\""+mobile+"\"}"
	};

	$.ajax(settings).done(function (response) {
		var data = JSON.parse(response);
	    if(data.success){ 
			$('#st_mobile').html(display_mobile_number(mobile));
	
			localStorage.pmobile = mobile;

    		sync();
    		swal.close();
	    } else {
	    	fc_error("The mobile number belongs to another account.");
	    }	  
	}).fail(function(){
		fc_error("Connection Error. Please try again later.");
	});		
}




function profile_phone_verify(x, code, number){
    if($.trim($("#profile_phone_verification_code").val()) == code){
        profile_phone_verified = 1;
        save_new_number('255'+number);
    } else {
        if(x == 105){
            fc_error("Incorrect code.");
        }
    }
}

function profile_verify_phone(){
	var phone = $( "#txbxphone" ).val().trim();
    if(!phone.match(/^[+][2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/) 
        && !phone.match(/^[2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)            
        && !phone.match(/^[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)){    
        fc_error("Incorrect mobile number");
    } else {	
        number = phone.substring(phone.length - 9);
        if('255'+number == localStorage.pmobile){
        	bootbox.hideAll();
        	fc_error("Your account mobile number is <br><font style='color: #4f6b83; font-weight: bold;'>"+display_mobile_number(localStorage.pmobile)+"</font>.");
        } else {
	        var display_number = "+255 "+number.substring(0, 3)+" "+number.substring(3, 6)+" "+number.substring(6, 9);
	        bootbox.hideAll();
	        fc_loading("<div style='line-height: 24px;'>Sending verification code to <br><font style='color: #4f6b83; font-weight: bold;'>"+display_number+"</font></div>");
	        var settings = {
	          "async": true,
	          "crossDomain": true,
	          "url": "https://fixchap.com/dev/profile/api/send_code",
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
	                swal.close();
	                setInterval(function(){
	                    if(profile_phone_verified == 0){
	                        profile_phone_verify(104, data.code, number);
	                    }
	                }, 1000);

	                var panel = ''+
	                    '<center>'+
	                    '<h3 style="color: #13A89F; font-size:18px;">Verify your mobile number</h3>'+
	                    '<p style="font-size: 12px; line-height: 16px; padding: 10px 20px 10px 20px; color: #4f6b83">Enter verification code which has been sent to<br>'+display_number+'.</p>'+
	                    
	                    '<input spellcheck="false" id="profile_phone_verification_code" placeholder="- - - -" class="fc-bootbox-input-login-verify login_element" style="font-size: 24px; text-align: center;" value="" type="number">'+
	                    '<div style="color: #e13247; font-size: 12px;">&nbsp;</div>'+
	                    '<button onclick="bootbox.hideAll();" style="background-color: #B2AFAF; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Cancel</button>'+
	                    '<button onclick="profile_phone_verify(105, '+data.code+','+number+')" style="background-color: #13A89F; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Verify</button>'+
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
	            	fc_error("The mobile number <br><font style='color: #4f6b83; font-weight: bold;'>"+display_number+"</font><br> belongs to another account.");
	            }
	        }).fail(function(){
				fc_error("Connection Error. Please try again later.");
			});	
        }
    }
}


function profile_edit_altnumber(){
	swal.close();
	bootbox.alert({
	    message: '<div class="fc-bootbox-title2">Emergency Contact</div><div><input spellcheck="false" id="txbxaltnumber" maxlength="13"  class="fc-bootbox-input" placeholder="" type="text" value="'+localStorage.paltmobile+'"/></div><div class="fc-bootbox-btns"><font onclick="bootbox.hideAll();">CANCEL</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font onclick="profile_save_altnumber();">SAVE</font></div>',
	    backdrop: true
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

	$("#txbxaltnumber").keydown(function(e) { 
      if( e.which == 8 || (48 <= e.which && e.which <= 57) || e.which == 39 || e.which == 37 || e.which == 107){
        
      } else {
        return false;
      }
    });	
}

function profile_save_altnumber(){
	var phone = $( "#txbxaltnumber" ).val().trim();
    if(!phone.match(/^[+][2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/) 
        && !phone.match(/^[2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)            
        && !phone.match(/^[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)){    
        fc_error("Incorrect mobile number");
    } else {	
        number = phone.substring(phone.length - 9);
        if('255'+number == localStorage.pmobile){
        	fc_error("Emergency number must be different from your primary account number.");
        } else {
        	var new_phone = '255'+number;
        	bootbox.hideAll();
			fc_loading('Loading...');
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": "https://fixchap.com/dev/profile/api/edit_altnumber",
			  "method": "POST",
			  "headers": {
			    "Content-Type": "application/json",
			    "cache-control": "no-cache"
			  },
			  "processData": false,
			  "data": "{\"user_id\":\""+localStorage.user_id+"\",\"new_phone\":\""+new_phone+"\"}"
			};

			$.ajax(settings).done(function (response) {
				var data = JSON.parse(response);
			    if(data.success){ 
	    			$('#st_altmobile').html(display_mobile_number(new_phone));
	    			localStorage.alt_number = new_phone;

				    localStorage.paltmobile = new_phone;


		    		sync();
		    		swal.close();
			    } else {
			    	fc_error("FixChap failed to update email address. Please try again.");
			    }	  
			}).fail(function(){
				fc_error("Connection Error. Please try again later.");
			});	        	
        }
    }
}

function profile_edit_language(){
	var img_en = 'images/unchecked.png';
	var img_sw = 'images/unchecked.png';
	var lang_title = '';
	if(localStorage.planguage == 'English'){
		img_en = 'images/checked2.png';
		lang_title = 'Language';
	} else if (localStorage.planguage == 'Kiswahili'){
		img_sw = 'images/checked2.png';
		lang_title = 'Lugha';
	}
	swal.close();
	bootbox.alert({
	    message: '<div class="fc-bootbox-title2">'+lang_title+'</div>'+
			'<div class="lang-radio">'+
			    '<div>'+
							'<img src="'+img_en+'" class="nMenuIcon" onclick="change_language(101)"/>'+
							'<div class="nMenuFont"  onclick="change_language(101)">English</div>'+
			    '</div>'+
			   	'<div style="padding-top: 15px;">'+
							'<img src="'+img_sw+'" class="nMenuIcon"  onclick="change_language(102)"/>'+
							'<div class="nMenuFont" onclick="change_language(102)">Kiswahili</div>'+
			    '</div>'+
			'</div>'+
	    '',
	    backdrop: true
	}).find('.modal-content').css({ 
		'margin-top': function (){
			var w = $( window ).height(); 
			var b = $(".modal-dialog").height(); 
			var h = (w-b)/8; 
			return h+"px"; 
		} 
	});
	$(".bootbox-close-button").css('display','none');
	$(".modal-footer").css('display','none');
	
}

function change_language(x){
	if(x==101 && localStorage.planguage == 'English'){
		bootbox.hideAll();
	} else if (x==102 && localStorage.planguage == 'Kiswahili'){
		bootbox.hideAll();
	} else {
		if(x==101){
			var new_language = "English";
		} else {
			var new_language = "Kiswahili";
		}
		bootbox.hideAll();
		fc_loading('Loading...','Tafadhali subiri...');
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "https://fixchap.com/dev/profile/api/edit_language",
		  "method": "POST",
		  "headers": {
		    "Content-Type": "application/json",
		    "cache-control": "no-cache"
		  },
		  "processData": false,
		  "data": "{\"user_id\":\""+localStorage.user_id+"\",\"new_language\":\""+new_language+"\"}"
		};

		$.ajax(settings).done(function (response) {
			var data = JSON.parse(response);
		    if(data.success){ 
    			$('#st_language').html(new_language);
    			localStorage.planguage = new_language;			
    			if(new_language == 'Kiswahili'){
    				$('body').translate({lang: "sw", t: dict});
    				 $('#pac-input').attr("placeholder","Tafuta Eneo");
    			} else {
    				$('body').translate({lang: "en", t: dict});
    				 $('#pac-input').attr("placeholder","Search Location");
    			}
    			
	    		sync();
	    		swal.close();
		    } else {
		    	fc_error("FixChap failed to update email address. Please try again.");
		    }	  
		}).fail(function(){
			fc_error("Connection Error. Please try again later.");
		});	 		
	}
}


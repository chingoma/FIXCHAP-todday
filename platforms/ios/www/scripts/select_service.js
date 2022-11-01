var block_select_service = 0;


localStorage.platform = navigator.platform;
localStorage.user_agent = navigator.userAgent;

$( document ).ready(function() {
	var url = window.location.href;
	var url_item_id = url.split("?login=")[1];

	if(url_item_id == 1){	
        if(localStorage.session == null){
            sign_in(5565666);
        }		
	}
});


function satellite(){
    get_service(3,'Satellite Dish');
    // swal({ 
    //     html: true,
    //     title: '', 
    //     text: '<div class="fc-vendor-dstv" onclick="swal.close();get_service(19,\'DSTV\')"><center><img src="images/dstv.png" height="20"></center></div><div class="fc-vendor-border"></div><div class="fc-vendor-others" onclick="swal.close();get_service(3,\'Satellite Dish\')">Others</div>', 
    //     showConfirmButton: false,
    //     allowOutsideClick: true
    // });    
}

function cookersandstoves(){
    var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #506A85; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Which device are you using?</center></font>';
   modalTitle += '<div class="row">';
        modalTitle += '<div class="col-xs-12">';
           modalTitle += ''+
                       '<ul style="">'+
                           '<li style="width: 15%;"></li>'+
                          ' <li>'+
                           '<a href="#" onclick="get_service(26, \'Electric cookers & ovens\')" style="color: #0C5E99; text-decoration: none;">'+
                           '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #5D52A1;">'+
                               '<center><img src="images/icons/cooker_gas.png" width="35" height="35"></center>'+
                           '</i>'+
                           '<em style="line-height: 16px;">Electric<br>cookers &<br>ovens</em>'+
                           '</a>'+
                           '</li>'+
                           '<li>'+
                           '<a onclick="get_service(26, \'Gas cookers & ovens\')" style="color: #0C5E99;  text-decoration: none;">'+
                           '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #0F9D58;">'+
                               '<center><img src="images/icons/cooker_gas.png" width="35" height="35"></center>'+
                           '</i>'+
                           '<em style="line-height: 16px;">Gas<br>cookers &<br>ovens</em>'+
                           '</a>'+
                           '</li>'+
                       '</ul>'+
           '';        


        modalTitle += '</div>';

   modalTitle += '</div>';

       modalTitle += '<div onclick="block_select_service = 0; bootbox.hideAll();" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px; color: #506A85;">Back</div>';



   bootbox.alert(modalTitle, function(result){
       backdrop: true
   }).find('.modal-content').css({ 
       'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/2; return h+"px"; },
       'background-color': "rgba(255, 255, 255, 1)"
   }).find('.bootbox-accept').css({
       'background-color': "#13A89F",
       'border-color':"#13A89F"
   }).find('.modal-body').css({
       'background-color': "#13A89F"
   });

   $(".bootbox-close-button").css('display','none');
   $(".modal-footer").css('display','none');    

    $(".modal-body").css('background','url(images/17.jpg) no-repeat center center fixed');  
    $(".modal-body").css('-webkit-background-size','cover'); 
    $(".modal-body").css('-moz-background-size','cover'); 
    $(".modal-body").css('-o-background-size','cover'); 
    $(".modal-body").css('background-size','cover');  
    $(".modal-body").css('border-radius','12px');     
}

function computer_repair(){
     var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #506A85; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Which device are you using?</center></font>';
    modalTitle += '<div class="row">';
         modalTitle += '<div class="col-xs-12">';
            modalTitle += ''+
                        '<ul style="">'+
                            '<li style="width: 15%;"></li>'+
                           ' <li>'+
                            '<a href="#" onclick="get_service(5, \'Windows\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #5D52A1;">'+
                                '<center><img src="images/icons/windows.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Windows<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(24, \'macOS\')" style="color: #0C5E99;  text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #0F9D58;">'+
                                '<center><img src="images/icons/macOS.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">macOS<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                        '</ul>'+
            '';        


         modalTitle += '</div>';

    modalTitle += '</div>';

        modalTitle += '<div onclick="block_select_service = 0; bootbox.hideAll();" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px; color: #506A85;">Back</div>';



    bootbox.alert(modalTitle, function(result){
        backdrop: true
    }).find('.modal-content').css({ 
        'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/2; return h+"px"; },
        'background-color': "rgba(255, 255, 255, 1)"
    }).find('.bootbox-accept').css({
        'background-color': "#13A89F",
        'border-color':"#13A89F"
    }).find('.modal-body').css({
        'background-color': "#13A89F"
    });

    $(".bootbox-close-button").css('display','none');
    $(".modal-footer").css('display','none');    

     $(".modal-body").css('background','url(images/17.jpg) no-repeat center center fixed');  
     $(".modal-body").css('-webkit-background-size','cover'); 
     $(".modal-body").css('-moz-background-size','cover'); 
     $(".modal-body").css('-o-background-size','cover'); 
     $(".modal-body").css('background-size','cover');  
     $(".modal-body").css('border-radius','12px');     
}


function electronics(){
    var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #506A85; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Electronics</center></font>';
    modalTitle += '<div class="row">';
         modalTitle += '<div class="col-xs-12">';
            modalTitle += ''+
                        '<ul style="">'+
                           ' <li>'+
                            '<a href="#" onclick="get_service(31, \'Microwave\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #5D52A1;">'+
                                '<center><img src="images/icons/microwave.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Microwave<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(31, \'Blender\')" style="color: #0C5E99;  text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #0F9D58;">'+
                                '<center><img src="images/icons/brander.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Blender<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(31, \'Rice Cooker\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #506A85;">'+
                                '<center><img src="images/icons/rice_cooker.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Rice Cooker<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            ' <li>'+
                            '<a href="#" onclick="get_service(31, \'Toaster\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #F4B400;">'+
                                '<center><img src="images/icons/toster.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Toaster<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(31, \'Kettle\')" style="color: #0C5E99;  text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #DB4437;">'+
                                '<center><img src="images/icons/kettle.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Kettle<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(31, \'Iron\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #13A89F;">'+
                                '<center><img src="images/icons/iron.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Iron<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a  onclick="get_service(31, \'Hair Dryer\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #506A85;">'+
                                '<center><img src="images/icons/drier.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Hair Dryer<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(31, \'Fan\')" style="color: #0C5E99;  text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #0F9D58;">'+
                                '<center><img src="images/icons/fan.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Fan<br>&nbsp;&nbsp;</em>'+
                            '</a>'+
                            '</li>'+
                            '<li>'+
                            '<a onclick="get_service(31, \'Radio & Speakers\')" style="color: #0C5E99; text-decoration: none;">'+
                            '<i class="icon" style="font-size: 25px; padding-top: 15px; background-color: #DB4437;">'+
                                '<center><img src="images/icons/radio.png" width="35" height="35"></center>'+
                            '</i>'+
                            '<em style="line-height: 16px;">Radio<br>& Speakers</em>'+
                            '</a>'+
                            '</li>'+
                        '</ul>'+
            '';        


         modalTitle += '</div>';

    modalTitle += '</div>';

        modalTitle += '<div onclick="block_select_service = 0; bootbox.hideAll();" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px; color: #506A85;">Back</div>';



    bootbox.alert(modalTitle, function(result){
        backdrop: true
    }).find('.modal-content').css({ 
        'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/2; return h+"px"; },
        'background-color': "rgba(255, 255, 255, 1)"
    }).find('.bootbox-accept').css({
        'background-color': "#13A89F",
        'border-color':"#13A89F"
    }).find('.modal-body').css({
        'background-color': "#13A89F"
    });

    $(".bootbox-close-button").css('display','none');
    $(".modal-footer").css('display','none');    

     $(".modal-body").css('background','url(images/17.jpg) no-repeat center center fixed');  
     $(".modal-body").css('-webkit-background-size','cover'); 
     $(".modal-body").css('-moz-background-size','cover'); 
     $(".modal-body").css('-o-background-size','cover'); 
     $(".modal-body").css('background-size','cover');  
     $(".modal-body").css('border-radius','12px');  
}

var go_to_address = 0;

function get_service(service_id, service_name){
    bootbox.hideAll();
    localStorage.service_name = service_name;
    localStorage.pre_desc = '';
    if(service_id == 31){
        localStorage.pre_desc = service_name+' ';
    }

    min_limit_alert = 0;
    localStorage.pre_quote_charge_id = 0;
    localStorage.prev_official_id = 0;
    if(block_select_service == 0){
        block_select_service = 1;

        var initial_charge_select = 0;
        
        $('#alt_number').val(localStorage.alt_number);

        var timestamp = + new Date();

      
        localStorage.datetime = localStorage.booking_datetime;

        var the_date = new Date(localStorage.datetime.replace(/-/g,"/"));
        $('#datetimepicker12').data("DateTimePicker").date(the_date);



        localStorage.upload_code = localStorage.user_id+'FC'+timestamp;
        $("#new_desc").val('');
        $("#desc_photo").html('');

        var myDate = new Date(localStorage.datetime.replace(/-/g,"/"));

        datetime_display_block(myDate);

        $(".service_nametitle").html(service_name);
        localStorage.service_id = service_id;

        // service_name = service_name.replace(/Service/g, "");
       
        var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #13A89F; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>What '+service_name+' issue are you experiencing?</center></font>';

        modalTitle += '<div>';
       
        var data = JSON.parse(localStorage.data);
        for(var i in data.pricing){
            if(data.pricing[i].service_id == service_id){
            
                for(var j in data.pricing[i].pricelist){
                    
                    if(data.pricing[i].pricelist[j].charge_priority != "0"){

                        var book_assessment_color_item = 'white';

                        if(initial_charge_select == 0){
                            initial_charge_select = data.pricing[i].pricelist[j].charge_id;
                            localStorage.pre_quote_charge_id = data.pricing[i].pricelist[j].charge_id;
                           
                            book_assessment_color_item = '#C5F4F1';
                        }
                    
                        modalTitle += '<div class="charge_select" id="charge_'+data.pricing[i].pricelist[j].charge_id+'" onclick="pre_quote('+data.pricing[i].pricelist[j].charge_id+')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: '+book_assessment_color_item+';">';

                        modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">'+data.pricing[i].pricelist[j].charge_details+'</h6>';

                        modalTitle += '<p style="font-size: 18px; margin: 0px;">'+number_format(data.pricing[i].pricelist[j].charge_amount)+' <small>TZS</small></p>';



                        modalTitle += '</div>';
                    }                              
                
                }  

                var book_assessment_color = 'white';
                if(initial_charge_select == 0){
                    book_assessment_color = '#C5F4F1';
                }

                modalTitle += '<div class="charge_select" id="charge_0" onclick="pre_quote(0)" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: '+book_assessment_color+'">';
                modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Book for Assessment</h6>';
                modalTitle += '<p style="font-size: 16px; margin: 0px; color:#7D7D7D;  margin-top: 5px; line-height: 17px;"><small>I don\'t know the problem/My problem is not listed. Don\'t worry, we\'ll figure it out.</small></p>';
                modalTitle += '</div>';                                     
            }
        }

        // modalTitle += '<p style="text-align: center; line-height: 20px; padding-top: 15px;">Problem not listed? Don\'t worry. Book an assessment and we shall figure it out.</p>';
        modalTitle += '<div onclick="continue_booking()" class="fc-request-btn" style="margin: 20px 0px 10px 0px; ">Select</div>';
        modalTitle += '<div onclick="block_select_service = 0; bootbox.hideAll();" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px;">Cancel</div>';

        modalTitle += '<p style="text-align: center; padding-top: 10px; color: #13A89F;" onclick="close_menu(); navigate(\'pricing\');">View our detailed pricing.</p>';


        modalTitle += '</div>';
        
        bootbox.confirm(modalTitle, function(result){
            block_select_service = 0;
            if(result){

            }
        }).find('.modal-content').css({ 
            'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/17; return h+"px"; },
            'background-color': "rgba(255, 255, 255, 1)"
        }).find('.bootbox-accept').css({
            'background-color': "#13A89F",
            'border-color':"#13A89F"
        });

        $(".bootbox-close-button").css('display','none');
        $(".modal-footer").css('display','none');
    }

}

function pre_quote(charge_id){
    $(".charge_select").css('background-color','white');

    localStorage.pre_quote_charge_id = charge_id;

    $("#charge_"+charge_id).css('background-color','#C5F4F1');
    // continue_booking();
}

function select_h_random(){
    $("#list_rand").css("background-color","#C5F4F1");
    $("#the_prev_list").css("display","none");
    localStorage.prev_official_id = 0;
}

var innitial_officer = 0;

function select_h_from_list(){
    $("#list_rand").css("background-color","white");
    $("#the_prev_list").css("display","block");
    localStorage.prev_official_id = innitial_officer;
    
}

function prev_official(officer_id){
    localStorage.prev_official_id = officer_id;
    innitial_officer = officer_id;
    $(".prev_f_select").css("background-color","white");
    $("#prev_official_id_"+officer_id).css("background-color","#C5F4F1");
}



function continue_booking(){
    bootbox.hideAll();
    block_select_service = 0;
    // check previous fundis

    var view_previous_modal = 0;

    var data = JSON.parse(localStorage.data);
    for(var i in data.pricing){
        if(data.pricing[i].service_id == localStorage.service_id){
            if(data.pricing[i].count_prev > 0){
                view_previous_modal = 1;
            }
        }
    }


    if(view_previous_modal == 1){

        var thisHomeCount = 0;
        
     
        var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #13A89F; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Do you want a previous handyman or should we pick one for you?</center></font>';

        modalTitle += '<div>';
  

        modalTitle += '<div class="charge_select" id="list_rand" onclick="select_h_random()" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: #C5F4F1;">';
        modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Select one for me</h6>';
        modalTitle += '<p style="font-size: 16px; margin: 0px; color:#7D7D7D;  margin-top: 5px; line-height: 17px;"><small>System selects one to fit your schedule.</small></p>';
        modalTitle += '</div>';   



        modalTitle += '<div class="charge_select" id="list_prev" onclick="select_h_from_list()"  style=" padding: 10px 10px 9px 10px; background-color: white;">';
        modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Select from previous handymen</h6>';
        modalTitle += '<p style="font-size: 16px; margin: 0px; color:#7D7D7D;  margin-top: 5px; line-height: 17px;"><small>Please allow some flexibility on your booking time to sync with handyman schedule.</small></p>';
        modalTitle += '</div>'; 

       

            modalTitle +='<div id="the_prev_list" style="padding-left: 30px; display: none;">';
            var data = JSON.parse(localStorage.data);
            for(var i in data.pricing){
                if(data.pricing[i].service_id == localStorage.service_id){
                    for(var j in data.pricing[i].officials){
                            if(thisHomeCount == 0){
                                var thisHomeCountColor = '#C5F4F1';
                                innitial_officer = data.pricing[i].officials[j].official_id;
                            } else {
                                var thisHomeCountColor = 'white';
                            }

                            thisHomeCount++;


                            modalTitle += '<div class="prev_f_select" id="prev_official_id_'+data.pricing[i].officials[j].official_id+'" onclick="prev_official('+data.pricing[i].officials[j].official_id+')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: '+thisHomeCountColor+';">';
                            modalTitle += '<div style="text-align:left; line-height:40px;"><img src="'+data.pricing[i].officials[j].official_photo+'" height="40" style="border-radius: 50%; vertical-align: middle;  float:left;" class="up_photo" onerror="this.src=\'images/profile.jpg\'"><span style="padding-top: 20px; color:#7D7D7D;">&nbsp;&nbsp;&nbsp;'+data.pricing[i].officials[j].official_name+'</span></div>';
                            modalTitle += '</div>';
                    }                
                }
            }
            modalTitle +='</div>';

        modalTitle += '<div onclick="continue_booking_after_check_prev()" class="fc-request-btn" style="margin: 20px 0px 10px 0px; ">Continue</div>';
        modalTitle += '<div onclick="block_select_service = 0; bootbox.hideAll(); get_service('+localStorage.service_id+', \''+ localStorage.service_name+'\')" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px;">Back</div>';
        

        modalTitle += '</div>';

        bootbox.confirm(modalTitle, function(result){
            block_select_service = 0;
            if(result){

            }
        }).find('.modal-content').css({ 
            'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/17; return h+"px"; },
            'background-color': "rgba(255, 255, 255, 1)"
        }).find('.bootbox-accept').css({
            'background-color': "#13A89F",
            'border-color':"#13A89F"
        });

        $(".bootbox-close-button").css('display','none');
        $(".modal-footer").css('display','none');

    } else {
        continue_booking_after_check_prev();
    }

            
}

function continue_booking_after_check_prev(){
    if(localStorage.session == null){
        go_to_address = 1;
        sign_in(130);
    } else {
        go_back_array.push("home");
        var data = JSON.parse(localStorage.data);
        if(data.recent_addresses_count == 0){
            navigate("map");
        } else {
            navigate("address");
        }                    
    }    
}

var go_to_market_place = 0;

function marketplace(){
    bootbox.dialog({
        closeButton: false,
        message: '<div style="height: 100vh; padding-top: 20vh;"><center><div class="lds-ring"><div></div><div></div><div></div><div></div></div></center></div>'   
    }).find('.modal-body').css('background-color','#13A89F');
    $('.modal-dialog').css('width','100% !important');
    $('.modal-dialog').css('margin','0px');   

    window.location='marketplace/index.html';

    // fc_loading('Openning Marketplace..');  window.location='marketplace/index.html';
}

function pre_marketplace(){
    // window.location = 'marketplace/camera.html';
    if(localStorage.session == null){
        go_to_market_place = 1;
        // sign_in();
        marketplace();    
    } else {
         marketplace();                   
    }    
}


function view_more(){
    $(".scrollbar").css('height','auto');
    $("#vMore").css('display','none');
    $("#vLess").css('display','block');
}
function view_less(){
    $(".scrollbar").css('height','200px');
    $("#vMore").css('display','block');
    $("#vLess").css('display','none');
}

function submit_request(){
    var alt_number = $("#alt_number").val();
    var desc = localStorage.pre_desc+$.trim($("#new_desc").val());
    if(!$.trim(alt_number).match(/^[+][2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/) 
        && !$.trim(alt_number).match(/^[2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)            
        && !$.trim(alt_number).match(/^[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)){
         fc_error("Please enter a valid emergency contact.");          
    } else {
        fc_loading('Submitting...');
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fixchap.com/dev/request/api/initiate_modern",
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "processData": false,
          "data": "{\"user_id\": \""+localStorage.user_id+"\",\"alt_number\": \""+alt_number+"\",\"address_id\":\""+localStorage.address_id+"\",\"desc\":\""+desc+"\",\"service_id\":\""+localStorage.service_id+"\",\"datetime\":\""+localStorage.datetime+"\",\"image_code\":\""+localStorage.upload_code+"\",\"user_agent\":\""+localStorage.user_agent+"\",\"platform\":\""+localStorage.platform+"\",\"charge_id\":\""+localStorage.pre_quote_charge_id+"\",\"official_id\":\""+localStorage.prev_official_id+"\"}"
        };

        $.ajax(settings).done(function (response) {
            var data = JSON.parse(response);
            if(data.success){
                swal.close();
                bootbox.alert({
                    closeButton: false,
                    title: '<center style="color: #13A89F; font-size: 15px;">Thank you for Booking a service with us, here\'s whats next..</center>',
                    message: "<table><tr><td style='text-align: center;' width='30%'><i class='glyphicon glyphicon-link comp_icon'></i></td><td rowspan='2' style='text-align: left;'><font class='comp_title'><br>1. Handyman Matching</font><p class='comp_details'>In a few minutes you will be matched with a handyman and you will receive notification on it.</p></td></tr><tr><td><center><br><img src='images/line2.png' height='30'></center></td></tr><tr><td style='text-align: center;' width='30%'><i class='glyphicon glyphicon-tasks comp_icon'></i></td><td rowspan='2' style='text-align: left;'><font class='comp_title'><br>2. Job Assesment</font><p class='comp_details'>After handyman’s arrival, assesment is done, and you will receive a notification about the Qoutation after your approval the work starts.</p></td></tr><tr><td><center><br><img src='images/line2.png' height='30'></center></td></tr><tr><td style='text-align: center;' width='30%'><i class='glyphicon glyphicon-usd comp_icon'></i></td><td rowspan='2' style='text-align: left;'><font class='comp_title'><br>3. Payment and Ratings</font><p class='comp_details'>When the service is complete you can pay, rate and comment about the service and handyman’s performance.</p></td></tr><tr><td><center><br></center></td></tr></table>",
                    buttons: {
                        'ok': {
                            label: '<font style="color: white;">Okay</font>',
                            className: 'fc-boot-save'
                        }
                    },
                    callback: function(result) {        
                      navigate("on_progress");
                    }
                }).find('.modal-content').css({ 'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/17; return h+"px"; } });


            } else {
                fc_error(data.message);  
            }
        }).fail(function(){
            fc_error('Connection error!');  
        });
    }   
}
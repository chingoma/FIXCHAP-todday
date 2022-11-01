function load_request(request_id, channel){
	// fc_loading('Loading...');
	localStorage.current_page_request_id = request_id;
	localStorage.current_page_channel = channel;
	localStorage.quotation_total = 0;
	$("#fc-status-searching").css('display','none');
	$("#fc-status-canceled").css('display','none');
	$("#fc-status-advanced").css('display','none');
	$("#request_details").css('display','none');
	$("#quotation_panel").css('display','none');
	$("#rating_panel").css('display','none');
	$("#call_handyman").css('display','none');  
	$("#cancel_request_btn").css('display','none');
	$("#reject_quotation").css('display','none');
	$("#accept_quotation").css('display','none'); 
	$("#pay_via_mobile_money").css('display','none');
	$("#pay_mpesa").css('display','none');
	$("#pay_tigopesa").css('display','none');
	$("#pay_airtelmoney").css('display','none');
	$("#pay_cash").css('display','none');
	$("#job_status").css('display','none');
	
	$("#fc-rq-no").html('FC'+request_id);

	var requests_data = JSON.parse(localStorage.data);

	if(channel == 'completed'){
		go_back_array.push("completed");
		var requests = requests_data.completed;
	} else {
		go_back_array.push("on_progress");
		var requests = requests_data.onprogress;
	}

	var handyman_profile = 1;
	var handyman_activity = '';
	var quotation_panel = 0;
	var quotation_title = '';	
	var quotation_total = 0;
	var quotation_status = '';
	var request_found = 0;


	for(var i in requests){
		if(requests[i].request_id == request_id){
			request_found = 1;
			if(requests[i].request_status == 'waiting'){
				handyman_profile = 0;
				if(requests[i].private_officer){
					$("#fc-status-searching-text").html('Waiting for Response');
					$("#rq_dt_status").html('Waiting for '+requests[i].private_officer_name+' to accept your request.');
				} else {
					$("#fc-status-searching-text").html('Searching for Handyman');
					$("#rq_dt_status").html('Matching you to the nearest available handyman.');
				}
				$("#fc-status-searching").css('display','block');

				$("#cancel_request_btn").css('display','block');
				
				$("#job_status").css('display','block');

			} else if(requests[i].request_status == 'completed'){
				if(requests[i].my_quotation.length == 0){
					handyman_profile = 0;
					$("#fc-status-canceled").css('display','block');
				} else {
					handyman_activity = 'Completed the work';
				}
			} else if(requests[i].request_status == 'on_progress'){
				$("#call_handyman").attr('href','tel: +'+requests[i].official_phone);
				$("#call_handyman").css('display','block');
				if(requests[i].my_quotation.length == 0){
					handyman_activity = 'Confirmed';
					$("#cancel_request_btn").css('display','block');
					$("#rq_dt_status").html('Handyman will arrive at specified time, perform an assessment and prepare a qoute.');
					$("#job_status").css('display','block');					
				} else {
					for(var j in requests[i].my_quotation){
						if(requests[i].my_quotation[j].quotation_status != 'deleted'){
							quotation_panel = 1;
							quotation_title = 'Quotation:';
							if(requests[i].my_quotation[j].quotation_status == 'pending'){
								quotation_status = 'pending';
								handyman_activity = 'Raised a quotation';
								$("#rq_dt_status").html('Waiting for you to confirm the quotation.');
								$("#job_status").css('display','block');
							} else if (requests[i].my_quotation[j].quotation_status == 'accepted'){
								handyman_activity = 'On work';
								$("#rq_dt_status").html('Work is on Progress, you will be notified once complete.');
								$("#job_status").css('display','block');
							}
						}
					}
				}
			} else if(requests[i].request_status == 'confirmed_later'){
				handyman_activity = 'Waiting for your appropriate time';
			} else if(requests[i].request_status == 'work_done'){
				handyman_activity = 'Completed the work';
				quotation_panel = 1;
				quotation_title = 'Invoice:';	
				if(requests[i].assessment_quotation.length > 0){
					handyman_profile = 0;
					$("#fc-status-canceled").css('display','block');
				}		
			}

			if(requests[i].request_status == 'completed' && (requests[i].assessment_quotation.length > 0 || requests[i].my_quotation.length > 0)){
				quotation_panel = 1;
				quotation_title = 'Invoice:';				
			}

			if(handyman_profile == 1){
				$("#handyman_profile_pic").attr('src', requests[i].official_photo);
				$("#handyman_profile_name").html(requests[i].official_name);
				$("#handyman_id").html("ID No. "+requests[i].official_id);
				$("#handyman_profile_message").html(handyman_activity);
				$("#fc-status-advanced").css('display','block');
			}

			$("#rq_dt_name").html(requests[i].service_name);
			$("#rq_dt_location").html(requests[i].mapName);
			$("#rq_dt_time").html(requests[i].request_attend_datetime);
			$("#request_details").css('display','block');

			if(requests[i].assessment_quotation.length == 0){
				for(var j in requests[i].my_quotation){
					quotation_total += requests[i].my_quotation[j].quotation_charge_amount*requests[i].my_quotation[j].quotation_charge_quantity;
				}				
			} else {
				for(var j in requests[i].assessment_quotation){
					quotation_total += requests[i].assessment_quotation[j].quotation_charge_amount*requests[i].assessment_quotation[j].quotation_charge_quantity;
				}
			}

			if(requests[i].request_status == 'completed' && requests[i].cash_received >= quotation_total){
				if(quotation_total > 0){
					quotation_panel = 1;
					quotation_title = 'Receipt:';	

					if(requests[i].rating == 0){
						if(requests[i].my_quotation.length > 0){
							rate_service(requests[i].official_name, requests[i].service_name.replace("Service", ""));
						} else if(requests[i].assessment_quotation.length > 0 && requests[i].assessment_quotation[0].quotation_notes == 'Made after rejection of the previous.'){
							rate_service(requests[i].official_name, requests[i].service_name.replace("Service", ""));
						}
					} else if (requests[i].rating > 0){
						var rating_string = rating_display(requests[i].rating);
						var comment_string = '';
						if(requests[i].request_comments == '' || requests[i].request_comments == null){
							comment_string = '';
						} else {
							var comment_string = '<div style="font-size: 12px; padding-top: 5px; line-height: 13px; text-align: center;"><i>"'+requests[i].request_comments+'"</i></div>';
						}
						$("#rating_panel_rate").html(rating_string+comment_string); 
						$("#rating_panel").css('display','block');
					}	
				}			
			}

			if(quotation_panel == 1){
				localStorage.quotation_title = quotation_title;
				localStorage.quotation_total = quotation_total;
				$("#rq_dt_qout_title").html(quotation_title);
				$("#rq_dt_quot_amount").html(' TZS '+ number_format(quotation_total));
				$("#quotation_panel").css('display','block');
			}

			if(quotation_title == 'Quotation:' && quotation_status == 'pending'){
				$("#reject_quotation").css('display','block');
				$("#accept_quotation").css('display','block'); 
			}

			if(quotation_title == 'Invoice:' && requests[i].cash_received < quotation_total){
				if(handyman_profile == 1){
					$("#rq_dt_status").html('The work is complete, please verify. If everything is ok kindly proceed with payments');
					$("#job_status").css('display','block');	
				}
				if(localStorage.pay_mobile == 0){
					if(localStorage.dpo == 1){
						$("#pay_via_mobile_money").css('display','block');
					}
					$("#pay_cash").css('display','block'); 	
				} else {
					chooses_mobile_money();
				}
			}

		}
	}

	if(request_found == 0){
		if(channel == 'completed'){
			load_request(request_id, 'on_progress');
		} else {
			load_request(request_id, 'completed');
		}
	}
		
	navigate("request");


}

function cancel_request(){
	fc_loading('Cancelling...');

	var swal_text = "Cancel request FC"+localStorage.current_page_request_id+". ";
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/cancelRequest_checkingtime",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
	    var data = JSON.parse(response);
	    if(data.success){ 
	    	cancel_request_proceeds(101);
	    } else {
	    	swal_text = swal_text+" Late cancellation charges may apply.";
	    	cancel_request_proceeds(102);
	    }
	  }).fail(function() {
	      fc_error('Cancellationg failed! Try again later.');
	  }); 	
}

var cancel_reason = 'I was just testing the app.';

function cancel_reason_function(x){
	cancel_reason = x;
	$(".cr_class").css("background-color","white");
	if(x == 'I was just testing the app.'){
		$("#cr_1").css('background-color','#C5F4F1');
	} else if(x == 'Changes on my schedule.'){
		$("#cr_2").css('background-color','#C5F4F1');
	} else if(x == 'I solved the issue in another way.'){
		$("#cr_3").css('background-color','#C5F4F1');
	} else if(x == 'Other.'){
		$("#cr_4").css('background-color','#C5F4F1');
		cancel_reason = $("#cancellation_reason_others").val();
	}
}





function cancel_request_proceeds(x){
	cancel_reason = 'I was just testing the app.';

	var lateCancelNotice = '';
	if(x==102){
		var lateCancelNotice = '<br><br><span style="color: #B6B6B6;">Late cancellation charges may apply.</span>';
	}

    var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #13A89F; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Sad to see you cancel.<br>Please tell us why.'+lateCancelNotice+'</center></font>';

    modalTitle += '<div>';


	    modalTitle += '<div class="cr_class" id="cr_1" onclick="cancel_reason_function(\'I was just testing the app.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: #C5F4F1;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">I was just testing the app.</h6>';
	    modalTitle += '</div>';  

	    modalTitle += '<div class="cr_class" id="cr_2" onclick="cancel_reason_function(\'Changes on my schedule.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Changes on my schedule.</h6>';
	    modalTitle += '</div>'; 

	    modalTitle += '<div class="cr_class" id="cr_3" onclick="cancel_reason_function(\'I solved the issue in another way.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">I solved the issue in another way.</h6>';
	    modalTitle += '</div>'; 

	    modalTitle += '<div class="cr_class" id="cr_4" onclick="cancel_reason_function(\'Other.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Others.</h6>';
	    modalTitle += '<p style="font-size: 16px; margin: 0px; color:#7D7D7D;  margin-top: 5px; line-height: 17px;"><small>Please leave comments.</small></p>';
	    modalTitle += '<textarea id="cancellation_reason_others" rows="4" style="border: 1px solid #B6B6B6; padding: 5px; width: 100%; border-radius: 4px; margin-top: 5px;"></textarea>';
	    modalTitle += '</div>'; 

	    modalTitle += '<div onclick="now_cancel_request()" class="fc-request-btn" style="margin: 20px 0px 10px 0px; ">Continue</div>';
	    modalTitle += '<div onclick="bootbox.hideAll();" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px;">Back</div>';
	       
	modalTitle += '</div>';

	swal.close();

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


	$("#cancellation_reason_others").keyup(function() {
	   cancel_reason =$("#cancellation_reason_others").val();
	});

    // swal({
    //     title: "Are you sure?",
    //     text: msg,
    //     type: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#13A89F",
    //     iconColor: '#13A89F',
    //     confirmButtonText: "Yes",
    //     cancelButtonText: "No",
    //     closeOnConfirm: false,
    //     closeOnCancel: true },
    //     function (isConfirm) {
    //         if (isConfirm) {
    //         	fc_loading('Please wait..');
				//   var settings = {
				//     "async": true,
				//     "crossDomain": true,
				//     "url": "https://fixchap.com/dev/request/api/cancelRequest",
				//     "method": "POST",
				//     "headers": {
				//       "Content-Type": "application/json"
				//     },
				//     "processData": false,
				//     "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\"}"
				//   };
				//   $.ajax(settings).done(function (response) {
				//     var data = JSON.parse(response);
				//     if(data.success){ 
				//     	fc_success('Done!','Request has been cancelled.');
				//     } else {
				//     	fc_error('Cancellationg failed! Try again later.');
				//     }
				//   }).fail(function() {
				//       fc_error('Cancellationg failed! Try again later.');
				//   }); 

    //         }
    //     }
    // );	
}

function now_cancel_request(){
	if(cancel_reason == ''){
		fc_error('Please tell us why do you want to cancel.');
	} else {
		reason_to_post = btoa(cancel_reason);
    	fc_loading('Please wait..');
		  var settings = {
		    "async": true,
		    "crossDomain": true,
		    "url": "https://fixchap.com/dev/request/api/cancelRequest",
		    "method": "POST",
		    "headers": {
		      "Content-Type": "application/json"
		    },
		    "processData": false,
		    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\",\"reason\": \""+reason_to_post+"\"}"
		  };
		  $.ajax(settings).done(function (response) {
		    var data = JSON.parse(response);
		    if(data.success){ 
		    	bootbox.hideAll();
		    	fc_success('Done!','Request has been cancelled.');
		    } else {
		    	fc_error('Cancellationg failed! Try again later.');
		    }
		  }).fail(function() {
		      fc_error('Cancellationg failed! Try again later.');
		  }); 

	}
}



function view_quotation_invoice(){
	var quotation_title = localStorage.quotation_title.toUpperCase().replace(":", "");

	var requests_data = JSON.parse(localStorage.data);

	if(localStorage.current_page_channel == 'on_progress'){
		var requests = requests_data.onprogress;
	} else {
		var requests = requests_data.completed;
	}

	var total = 0;
	var items = '';	
	var additional_notes = '';

	for(var i in requests){
		if(requests[i].request_id == localStorage.current_page_request_id){
			if(requests[i].my_quotation.length > 0){
				var theQuotationList = requests[i].my_quotation;
			} else {
				var theQuotationList = requests[i].assessment_quotation;
			}

			var number = theQuotationList[0].quotation_id;

			for(var j in theQuotationList){
				var subtotal = theQuotationList[j].quotation_charge_amount*theQuotationList[j].quotation_charge_quantity;
				total += subtotal;
				items = items+'<tr><td>'+(j*1+1)+'.</td><td>'+theQuotationList[j].charge_details+'</td><td>'+theQuotationList[j].quotation_charge_quantity+'</td><td style="text-align: right;">'+number_format(subtotal)+'</td></tr>';
			}

			if(theQuotationList[0].quotation_notes != null && theQuotationList[0].quotation_notes != '' && theQuotationList[0].quotation_notes != 'Made after rejection of the previous.'){
				additional_notes = '<div style="border-top: 1px solid #B9B9B9"><h4 style="text-align: left; font-size: 13px; color: #414141; margin-bottom: 5px;">Materials needed for this job:</h4><div style="font-size: 13px; line-height: 14px; text-align: left; padding-bottom: 20px;">'+theQuotationList[j].quotation_notes+'</div></div></div>';
			}				
		}
	}

	swal({ 
		html: true, 
		title: "", 
		text: '<div class="containertoptriangle"><span style="color: black;">'+quotation_title+'</span><br><span style="font-size: 12px;">No. '+number+'</span><table class="tbl-invoice"><tr class="tbl-inv-hd"><td>#</td><td>Item</td><td>Qty.</td><td style="text-align: right;">Total</td></tr>'+items+'<tr><td></td><td colspan="2" style="text-align: left; padding-top: 5px; color: #414141;">Total Labor Cost</td><td style="border-top: 1px solid black; color: black; text-align: right; padding-top: 3px; font-weight: bold;">'+number_format(total)+'</td></tr></table>'+additional_notes+'</div><div style="padding-top: 20px;"><a href="#" style="color: #13A89F" onclick="swal.close();">Back</a></div>', 
		allowOutsideClick: true, 
		showConfirmButton: false,
      	showCancelButton: false});
}



function reject_quotation_confirm_box(){

	var header = '<h1 class="fc-sure">Are you sure?</h1><div class="fc-ammend-info"><h1 class="fc-ammend-title">Ammend</h1><div class="fc-reject-info">Allow a handyman to recreate another quotation of your choice.</div></div><div class="fc-fullreject-info"><h1 class="fc-reject-title">Reject</h1><div class="fc-reject-info">Reject quotation and agree to pay consultation fee.</div></div>';
    
    var buttons = '<div style="margin-top: 30px;"></div><a href="#" onclick="swal.close();" style="background-color: #A6A6A6; color: white; padding: 8px 10px 8px 10px; font-size: 12px; border-radius: 4px; margin: 5px;">Back</a><a href="#" onclick="ammend_quotation()" style="border-radius: 4px; margin: 5px; background-color: #13A89F; color: white; padding: 8px 10px 8px 10px; font-size: 12px;">Ammend</a><a href="#" onclick="reject_quotation()" style="border-radius: 4px; margin: 5px; background-color: #4f6b83; color: white; padding: 8px 10px 8px 10px; font-size: 12px;">Reject</a>';
    swal({
    	html: true, 
      title: "",
      text: header+buttons,
      showConfirmButton: false,
      showCancelButton: false
    });
}

function ammend_quotation(){
	fc_loading('Please wait..');
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/ammendQuotation",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
	    var data = JSON.parse(response);
	    if(data.success){ 
			$("#reject_quotation").css('display','none');
			$("#accept_quotation").css('display','none'); 	    	
	    	fc_success('Done!','Quotation reversed for ammendment.');
	    } else {
	    	fc_error('System error! Try again later.');
	    }
	  }).fail(function() {
	      fc_error('Connection error! Try again later.');
	  }); 	
}

var cancel_quote_reason = 'Not in a position to fix it now.';

function reject_quote_function(x){
	cancel_quote_reason = x;
	$(".cr_class").css("background-color","white");
	if(x == 'Not in a position to fix it now.'){
		$("#qr_1").css('background-color','#C5F4F1');
	} else if(x == 'Price is very high.'){
		$("#qr_2").css('background-color','#C5F4F1');
	} else if(x == 'I do not trust the handymen you have just sent.'){
		$("#qr_3").css('background-color','#C5F4F1');
	} else if(x == 'I have found an alternative.'){
		$("#qr_4").css('background-color','#C5F4F1');
	} else if(x == 'Other.'){
		$("#cr_5").css('background-color','#C5F4F1');
		cancel_reason = $("#cancellation_reason_others").val();
	}
}

function reject_quotation(){

	cancel_quote_reason = 'Not in a position to fix it now.';

    var modalTitle = '<font style="font-size: 16px; font-weight: bold; color: #13A89F; padding: 4px 4px 2px 4px; margin-bottom: 0px;"><center>Sad to see you reject the quotation.<br>Please tell us why.</center></font>';

    modalTitle += '<div>';


	    modalTitle += '<div class="cr_class" id="qr_1" onclick="reject_quote_function(\'Not in a position to fix it now.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: #C5F4F1;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Not in a position to fix it now.</h6>';
	    modalTitle += '</div>';  

	    modalTitle += '<div class="cr_class" id="qr_2" onclick="reject_quote_function(\'Price is very high.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Price is very high.</h6>';
	    modalTitle += '</div>'; 

	    modalTitle += '<div class="cr_class" id="qr_3" onclick="reject_quote_function(\'I do not trust the handymen you have just sent.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">I don\'t trust the handymen you have just sent.</h6>';
	    modalTitle += '</div>'; 

	    modalTitle += '<div class="cr_class" id="qr_4" onclick="reject_quote_function(\'I have found an alternative.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">I have found an alternative.</h6>';
	    modalTitle += '</div>';

	    modalTitle += '<div class="cr_class" id="qr_5" onclick="reject_quote_function(\'Other.\')" style="border-bottom: 1px solid #C5F4F1; padding: 10px 10px 9px 10px; background-color: white;">';
	    modalTitle += '<h6 style="font-size: 15px; color:#7D7D7D; margin: 0px;">Others.</h6>';
	    modalTitle += '<p style="font-size: 16px; margin: 0px; color:#7D7D7D;  margin-top: 5px; line-height: 17px;"><small>Please leave comments.</small></p>';
	    modalTitle += '<textarea id="cancellation_quote_reason_others" rows="4" style="border: 1px solid #B6B6B6; padding: 5px; width: 100%; border-radius: 4px; margin-top: 5px;"></textarea>';
	    modalTitle += '</div>'; 

	    modalTitle += '<div onclick="now_reject_quote()" class="fc-request-btn" style="margin: 20px 0px 10px 0px; ">Continue</div>';
	    modalTitle += '<div onclick="bootbox.hideAll();" class="fc-request-btn-cancel" style="margin: 10px 0px 10px 0px;">Back</div>';
	       
	modalTitle += '</div>';

	swal.close();

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


	$("#cancellation_quote_reason_others").keyup(function() {
	   cancel_quote_reason =$("#cancellation_quote_reason_others").val();
	});

}

function now_reject_quote(){
	if(cancel_quote_reason == ''){
		fc_error('Please tell us why do you want to reject quotation.');
	} else {
		var reason2_to_post = btoa(cancel_quote_reason);
	  	  var settings = {
		    "async": true,
		    "crossDomain": true,
		    "url": "https://fixchap.com/dev/request/api/rejectQuotationNew",
		    "method": "POST",
		    "headers": {
		      "Content-Type": "application/json"
		    },
		    "processData": false,
		    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\",\"reason\": \""+reason2_to_post+"\"}"
		  };
		  $.ajax(settings).done(function (response) {
		    var data = JSON.parse(response);
		    if(data.success){ 
				$("#reject_quotation").css('display','none');
				$("#accept_quotation").css('display','none'); 	    	
		    	fc_success('Done!','Quotation cancelled.');
		    	bootbox.hideAll();
		    } else {
		    	fc_error('System error! Try again later.');
		    }
		  }).fail(function() {
		      fc_error('Connection error! Try again later.');
		  }); 
	}
}

function accept_quotation(){
    swal({
    	html: true,
        title: "<div style='margin-bottom: 30px;'><center><img src='images/quotation_icon.png' height='60'/></center></div>Are you sure?",
        text: "Accept TZS "+number_format(localStorage.quotation_total)+" Quotation",
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
			  fc_loading('Please wait..');
			  var settings = {
			    "async": true,
			    "crossDomain": true,
			    "url": "https://fixchap.com/dev/request/api/acceptQuotation",
			    "method": "POST",
			    "headers": {
			      "Content-Type": "application/json"
			    },
			    "processData": false,
			    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\"}"
			  };
			  $.ajax(settings).done(function (response) {
			    var data = JSON.parse(response);
			    if(data.success){ 
			    	$("#reject_quotation").css('display','none');
					$("#accept_quotation").css('display','none'); 
					$("#handyman_profile_message").html('On work');
			    	fc_success('Done!','Quotation accepted.');
			    } else {
			    	fc_error('System error! Try again later.');
			    }
			  }).fail(function() {
			      fc_error('Connection error! Try again later.');
			  }); 
            }
        }
    );		
}


function chooses_mobile_money(){
	localStorage.pay_mobile = 1;
	$("#pay_via_mobile_money").css('display','none');
	$("#pay_cash").css('display','none');
	$("#pay_mpesa").css('display','block');
	$("#pay_tigopesa").css('display','block');
	$("#pay_airtelmoney").css('display','block');
}

function pay_cash(){
		text = '<div style="text-align: left; font-size: 3px;">'+
      			'<h3 style="text-align: center; font-size: 17px; color: #13A89F; line-height: 22px;">Please submit <span class="fc-imp">Tshs '+number_format(localStorage.quotation_total)+'</span> to handyman.</h3>'+
      			
      		'<div style="margin-top: 30px;">'+
      		'</div>'+
      		'<center><a href="#" onclick="swal.close();" style="background-color: #A6A6A6; color: white; padding: 8px 10px 8px 10px; font-size: 12px; border-radius: 4px; margin: 5px; max-width: 80px;">Back</a></center>'+
      		'';	
    swal({
	  html: true, 
      title: "",
      text: text,
      showConfirmButton: false,
      showCancelButton: false
    }); 	
}


function pay_mobile(network){
	create_dpo_token(network);
}

function create_dpo_token(network){
	  fc_loading('Please wait..');
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/dpoTesting/mobile_app_initiate",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
	    var data = JSON.parse(response);
	    if(data.success){
	    	if(network == 'tigo'){
	    		var mno = 'tigo';
				swal({
				  title: "",
				  text: "Enter Tigo Number you want to pay with:",
				  type: "input",
				  showCancelButton: true,
				  closeOnConfirm: false,
				  animation: "slide-from-top",
				  inputPlaceholder: "e.g: 0712345678"
				},
				function(inputValue){
					if(!$.trim(inputValue).match(/^[+][2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)	
						    		&& !$.trim(inputValue).match(/^[2][5][5][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)			
						    		&& !$.trim(inputValue).match(/^[0][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/)){
						    swal.showInputError("Invalid Mobile Number");
				    		return false			          
					} else {
			    		var mobile = '255'+ inputValue.substring(inputValue.length - 9);
			    		view_instructions(mno, mobile, data.token); 						
					}
				});
	    	} else if (network == 'voda'){
	    		var mno = 'Vodacom';
	    		var mobile = localStorage.mobile;
	    		view_instructions(mno, mobile, data.token);  	    		
	    	} else if (network == 'airtel'){
	    		var mno = 'airtel';
	    		var mobile = localStorage.mobile;	
	    		view_instructions(mno, mobile, data.token);   
	    	}	
	    } else {
	    	fc_error('Failed to generate payment token! Try again.');
	    }
	  }).fail(function() {
	      fc_error('Connection error! Try again.');
	  }); 	
}

function view_instructions(mno, mobile, token){
	  fc_loading('Please wait..');
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/dpoTesting/mobile_app_get_instruction",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\"token\": \""+token+"\",\"mobile\": \""+mobile+"\", \"mno\": \""+mno+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
	    var data = JSON.parse(response);
	    if(data.success){
	    	var text = '';
	    	if(mno == 'Vodacom'){
	    		text = '<div style="text-align: left; font-size: 3px;">'+
		      			'<h3 style="text-align: center; font-size: 17px; color: #13A89F;">M-Pesa</h3>'+
		      			'<p style="font-size: 15px;">1. Dial <span class="fc-imp">*150*00#</span></p>'+
		      			'<p style="font-size: 15px;">2. Select <span class="fc-imp">Pay by M-Pesa</span></p>'+
		      			'<p style="font-size: 15px;">3. Select <span class="fc-imp">Enter business number</span></p>'+
		      			'<p style="font-size: 15px;">4. Enter business no:  <span class="fc-imp">644644</span></p>'+
		      			'<p style="font-size: 15px;">5. Enter reference no:  <span class="fc-imp" id="the_ref_no">'+data.reference_no+'</span> <br><span style="font-size: 10px; padding-left: 18px;">Press <i class="fa fa-copy"></i> button to copy ref. to clipboard.</span></p>'+
		      			'<p style="font-size: 15px;">6. Enter Amount:  <span class="fc-imp">'+localStorage.quotation_total+'</span></p>'+
		      			'<p style="font-size: 15px;">7. Enter PIN:  <span class="fc-imp"></span></p>'+
		      			'<p style="font-size: 15px;">8. Press <span class="fc-imp">1</span> to Confirm: Pay '+localStorage.quotation_total+' to utility DIRECT PAY ONLINE 644644 for account '+data.reference_no+'</p>'+
		      		'</div><div id="copiedstatus" style="display:none; background-color: #ff9c34; font-size: 12px; padding: 7px; color: white; margin-top: 10px; text-align:center;">Reference No. Copied to Clipboard</div>'+
		      		'<div style="margin-top: 30px;">'+
		      		'</div>'+
		      		'<a href="#" onclick="swal.close();" style="background-color: #A6A6A6; color: white; padding: 8px 10px 8px 10px; font-size: 12px; border-radius: 4px; margin: 5px;">Back</a>'+
		      		'<a href="#" onclick="copyToClipboard(\'#the_ref_no\')" style="border-radius: 4px; margin: 2px; background-color: #13A89F; color: white; padding: 8px 10px 8px 10px; font-size: 12px; text-decoraton: none;"><i class="fa fa-copy"></i></a>'+
		      		'';
	    	} else if (mno == 'airtel'){
	    		text = '<div style="text-align: left; font-size: 3px;">'+
		      			'<h3 style="text-align: center; font-size: 17px; color: #13A89F;">Airtel Money</h3>'+
		      			'<p style="font-size: 15px;">1. Dial <span class="fc-imp">*150*60#</span></p>'+
		      			'<p style="font-size: 15px;">2. Select <span class="fc-imp">Make Payments</span></p>'+
		      			'<p style="font-size: 15px;">3. Select <span class="fc-imp">Enter Business Number</span></p>'+
		      			'<p style="font-size: 15px;">4. Enter business name:  <span class="fc-imp">directpay</span></p>'+
		      			'<p style="font-size: 15px;">5. Enter Amount:  <span class="fc-imp">'+localStorage.quotation_total+'</span></p>'+
		      			'<p style="font-size: 15px;">6. Enter the reference number  <span class="fc-imp" id="the_ref_no">'+data.reference_no+'</span> <br><span style="font-size: 10px; padding-left: 18px;">Press <i class="fa fa-copy"></i> button to copy ref. to clipboard.</span></p></p>'+
		      			'<p style="font-size: 15px;">7. Enter PIN to confirm paying 3G DIRECT PAY, Tshs '+localStorage.quotation_total+' with reference number '+data.reference_no+'</p>'+
		      		'</div><div id="copiedstatus" style="display:none; background-color: #ff9c34; font-size: 12px; padding: 7px; color: white; margin-top: 10px; text-align:center;">Reference No. Copied to Clipboard</div>'+
		      		'<div style="margin-top: 30px;">'+
		      		'</div>'+
		      		'<a href="#" onclick="swal.close();" style="background-color: #A6A6A6; color: white; padding: 8px 10px 8px 10px; font-size: 12px; border-radius: 4px; margin: 5px;">Back</a>'+
		      		'<a href="#" onclick="copyToClipboard(\'#the_ref_no\')" style="border-radius: 4px; margin: 2px; background-color: #13A89F; color: white; padding: 8px 10px 8px 10px; font-size: 12px; text-decoraton: none;"><i class="fa fa-copy"></i></a>'+
		      		'';
	    	} else if (mno == 'tigo'){
	    		text = '<div style="text-align: left; font-size: 3px;">'+
		      			'<h3 style="text-align: center; font-size: 17px; color: #13A89F;">Tigopesa</h3>'+
		      			'<p style="font-size: 15px;">Tigo will send you a prompt to enter your Tigopesa PIN.<br><br></p>'+
		      		'</div>'+
		      		'<a href="#" onclick="swal.close();" style="background-color: #A6A6A6; color: white; padding: 8px 10px 8px 10px; font-size: 12px; border-radius: 4px; margin: 5px;">Back</a>'+
		      		'';
	    	}


		    swal({
    		  html: true, 
		      title: "",
		      text: text,
		      showConfirmButton: false,
		      showCancelButton: false
		    });  	
	    } else {
	    	fc_error('Failed to get instructions! Try again.');
	    }
	  }).fail(function() {
	      fc_error('Connection error! Try again.');
	  });     

}


function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();

  $("#copiedstatus").css('display','block');

  setTimeout(function() { $("#copiedstatus").css('display','none'); }, 2000);
}

function rate_service(name, service){
	text = '<h3 style="text-align: center; font-size: 20px; color: #13A89F;">Rate Service FC'+localStorage.current_page_request_id+'</h3>'+
		'<p style="text-align: center; font-size: 16px; line-height: 20px; color: #4f6b83;">How was your '+service+' Service with '+name+'?</p>'+
    
      		'<div style="margin-top: 20px;"><center>'+
      			'<div style="margin-top: -5px; font-size: 12px; margin-bottom: 5px;" id="rate-translate">&nbsp;</div>'+
				'<div class="rate" style="color: #00a89f; font-size: 35px; line-height: 1; text-align: center; with: 100%;"></div>'+
      			
      		'</center></div>'+
      		'<div class="pre-rating-btn" style="height: 140px;"></div>'+
      		'<div id="rating-btn" style="display: none;">'+
      			'<textarea id="customer_comments" class="textarea" rows="3" placeholder="Describe your experience (optional)"></textarea>'+
				'<div>'+
	      			'<center><div onclick="submit_rating()" style="background-color: #13A89F; max-width: 90px; color: white; margin-top: 20px; padding: 10px; border-radius: 3px;">Submit</div></center>'+
	      		'</div>'+
      		'</div>';
    swal({
	  html: true, 
      title: "",
      text: text,
      showConfirmButton: false,
      showCancelButton: false
    });	


     var options = {
        max_value: 5,
        step_size: 1,
    }
    $(".rate").rate(options);

    $(".rate").on("change", function(ev, data){
    	if(data.to >= 1){ 
    		$(".pre-rating-btn").css('display','none');
    		$("#rating-btn").css('display','block');
    	} 

        localStorage.ratingReport = data.to;

        if(data.to == 1){
        	$("#rate-translate").html('Terrible');
        } else if (data.to == 2){
        	$("#rate-translate").html('Bad');
        } else if (data.to == 3){
        	$("#rate-translate").html('Average');
        } else if (data.to == 4){
        	$("#rate-translate").html('Good');
        } else if (data.to == 5){
        	$("#rate-translate").html('Great');
        }
    });

}

function fail_submitting_review(){
	fc_loading('Failed to submit your review! Please try again.');
	setTimeout(function() { rate_service(); }, 3000);
}

function submit_rating(){
	var client_comments = $("#customer_comments").val();
	fc_loading('Submitting review..');
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/rateFundi",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\"request_id\": \""+localStorage.current_page_request_id+"\",\"rate\": \""+localStorage.ratingReport+"\",\"comments\": \""+client_comments+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
	    var data = JSON.parse(response);
	    if(data.success){ 
	    	fc_success('Thank you for your feedback!','Reviews submitted.');
	    } else {
	    	fail_submitting_review();
	    }
	  }).fail(function() {
	      fail_submitting_review();
	  });
}



if(localStorage.getItem("session") == 1){

	if(localStorage.toRate != 0){
		load_request(localStorage.toRate,'completed');
	} else {
		if(localStorage.on_progress_count == 1){
			load_request(localStorage.on_progress_request_id,'on_progress');
		} else if (localStorage.on_progress_count > 1){
			navigate("on_progress");
		}	
	}

}














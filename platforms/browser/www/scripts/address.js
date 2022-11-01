function fixchap_availability(){
	  fc_loading('Checking availability...');
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/location/check",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\n\t\"lat\": "+localStorage.lat+",\n\t\"long\":  "+localStorage.lng+",\n\t\"service_id\": "+localStorage.service_id*1+" \n}"
	  };

	  $.ajax(settings).done(function (response) {
	    var data = JSON.parse(response);
	    if(data.success){
	        save_new_address();
	    } else {
	    	fc_error("FixChap service is not available on the selected area.");
	    }
	  }).fail(function() {
	    fc_error("Error: Connection failed.");
	  });
}

function save_new_address(){
	swal.close();
	bootbox.prompt({
	    closeButton: false,
	    title: '<center><font style="font-size: 18px; color: #13A89F;">Save this address</font></center>', 
	    centerVertical: true,
	    placeholder: 'e.g Home, Office',
	    buttons: {
	        confirm: {
	            label: '<font style="color: white;">Save</font>',
	            className: 'fc-boot-save'
	        },
	        cancel: {
	            label: 'Not now',
	            className: 'fc-boot-cancel'
	        }
	    },    
	    callback: function(result){ 
	    	if(result){
	    		fc_loading('Loading...');
	    		get_address_id(localStorage.lat, localStorage.lng, localStorage.address_name, result);
	    	} else {
	    		fc_loading('Loading...');
	    		get_address_id(localStorage.lat, localStorage.lng, localStorage.address_name, "Unnamed Address");
	    	}
	        
	    }
	}).find('.modal-content').css({ 'margin-top': function (){var w = $( window ).height(); var b = $(".modal-dialog").height(); var h = (w-b)/4; return h+"px"; } });

}

function get_address_id(lat, long, name, title){
	  var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": "https://fixchap.com/dev/request/api/address/retrieve",
	    "method": "POST",
	    "headers": {
	      "Content-Type": "application/json"
	    },
	    "processData": false,
	    "data": "{\"lat\":\""+lat+"\",\"long\": \""+long+"\",\"title\":\""+title+"\",\"name\":\""+name+"\",\"user_id\":\""+localStorage.user_id+"\"}"
	  };

	  $.ajax(settings).done(function (response) {
		  console.log(response);
	    var data = JSON.parse(response);
	    if(data.success){
	        localStorage.address_id = data.address_id;
	        swal.close();
	        go_back_array.push("map");
	        navigate('time');
	    } else {
	    	fc_error("FixChap server error.");
	    }
	  }).fail(function() {
	    fc_error("Error: Connection failed.");
	  });
}

function select_address(id, name, title){
	localStorage.address_id = id;
	localStorage.address_name = name;
	localStorage.address_title = title;
	go_back_array.push("address");
	navigate("time");
}

function address_options(id, name){
	swal({ 
	    html: true,
	    title: '', 
	    text: '<div class="fc-edit-text-first" onclick="edit_address('+id+',\''+name+'\')">Edit Address</div><div style="margin: 20px;"></div><div class="fc-edit-text-last" onclick="delete_address('+id+')">Delete Address</div>', 
	    showConfirmButton: false,
	    allowOutsideClick: true
	}); 
}

var edit_address_name = '';

function edit_address(id, name){
	edit_address_name = '';
	if(name == "Unnamed Address"){
		name = '';
	}
	swal.close();
	bootbox.alert({
	    message: '<div class="fc-bootbox-title">Enter address title</div><div><input spellcheck="false" id="address_name45" maxlength="10" class="fc-bootbox-input" placeholder="eg. Home, Work" type="text" value="'+name+'"/></div><div class="fc-bootbox-btns"><font onclick="bootbox.hideAll();">CANCEL</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font onclick="save_edit_address('+id+');">SAVE</font></div>',
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

	$("#address_name45").keyup(function(event) {
		edit_address_name = $("#address_name45").val();
	});
}


function save_edit_address(id){
	bootbox.hideAll();
	fc_loading('Loading...');


	$.ajax({
		url:"https://fixchap.com/dev/request/api/address/edit",
		type:'post',
		data: "{\"address_id\":\""+id+"\",\"address_name\":\""+edit_address_name+"\"}",
		beforeSend: function(){
			console.log("sending request");
			// alert("sending request");
		},
		success: function(response){
			var data = JSON.parse(response);
			console.log($('#address_name').val());
			console.log(response);
			if(data.success){ 
				sync();
				swal.close();
			} else {
				fc_error("FixChap failed to update address. Please try again.");
			}	
		},
		error: function(xhr){
			console.log("error on sending request");
			// alert("error on sending");
			fc_error("Connection Error. Please try again later.");
		}
	});



	// var settings = {
	//   "async": true,
	//   "crossDomain": true,
	//   "url": "https://fixchap.com/dev/request/api/address/edit",
	//   "method": "POST",
	//   "headers": {
	//     "Content-Type": "application/json",
	//     "cache-control": "no-cache"
	//   },
	//   "processData": false,
	//   "data": "{\"address_id\":\""+id+"\",\"address_name\":\""+$('#address_name').val()+"\"}"
	// };

	// $.ajax(settings).done(function (response) {
	// 	var data = JSON.parse(response);
	// 	console.log($('#address_name').val());
	// 	console.log(response);
	//     if(data.success){ 
	//     	sync();
	//     	swal.close();
	//     } else {
	//     	fc_error("FixChap failed to update address. Please try again.");
	//     }	  
	// }).fail(function(){
	// 	fc_error("Connection Error. Please try again later.");
	// });
}

function delete_address(id){
	fc_loading('Loading...');

	$.ajax({
		url:"https://fixchap.com/dev/request/api/address/delete",
		type:'post',
		data: "{\"address_id\":\""+id+"\"}",
		beforeSend: function(){
			console.log("sending request");
			// alert("sending request");
		},
		success: function(response){
			var data = JSON.parse(response);
			if(data.success){ 
				sync();
				swal.close();
			} else {
				fc_error("FixChap failed to delete address. Please try again.");
			}
		},
		error: function(xhr){
			console.log("error on sending request");
			// alert("error on sending");
			fc_error("Connection Error. Please try again later.");
		}
	});






	// var settings = {
	//   "async": true,
	//   "crossDomain": true,
	//   "url": "https://fixchap.com/dev/request/api/address/delete",
	//   "method": "POST",
	//   "headers": {
	//     "Content-Type": "application/json",
	//     "cache-control": "no-cache"
	//   },
	//   "processData": false,
	//   "data": "{\"address_id\":\""+id+"\"}"
	// };

	// $.ajax(settings).done(function (response) {
	// 	var data = JSON.parse(response);
	//     if(data.success){ 
	//     	sync();
	//     	swal.close();
	//     } else {
	//     	fc_error("FixChap failed to delete address. Please try again.");
	//     }	  
	// }).fail(function(){
	// 	fc_error("Connection Error. Please try again later.");
	// });
}
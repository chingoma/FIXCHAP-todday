function loading_spinner(x){
	$("#"+x).html('<div class="spinner-div"><div class="spinner-border"></div></div>');
}

// function loading_failed(x){
// 	$("#"+x).html('<div class="spinner-div"><div class="spinner-border"></div></div>');
// }


var current_nav = 'cat';

var back = 'repair';





$(function() {

	// $carousel.flickity({'adaptiveHeight': true});
    $('#go_to_cat,  #main-menu-browse').on('click', function() {
    	
       // $carousel.flickity( 'select', 0 );
	   general_hides();
	
       category();

	  
    });
    $('#go_to_browse').on('click', function() {

      // $carousel.flickity( 'select', 1 );
	  general_hides();
	  $('.bc-btn, .filter-item, #buy_comment').hide();
      browse();

	  
	  
    });

    $('#main-menu-sales').on('click', function() {
   
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
      	sales_live();

    });

    $('#go_to_sales_live').on('click', function() {
   
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
      	sales_live();

    });

    $('#go_to_sales_sold').on('click', function() {
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
      	sales_sold();

	});

	$("#go_to_purchases-booking").on('click', function(){
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
      	purchases();		
	})
	
	$('#main-menu-likes').on('click', function() {
		if(localStorage.session == null){
			localStorage.likestarget = 1;
			window.location.href="../index.html?login=1";
		} else {
			general_hides();
			$('.bc-btn, .filter-item, #buy_comment').hide();
			likes();
		}

	});

	$('#main-menu-purchases').on('click', function() {
		
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
		purchases();
	});

	$('#go_to_purchases-completed').on('click', function() {
		
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
		purchases_sold();
	});

	

	$('#main-menu-wishlist').on('click', function() {
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
		pg_wishlist();
	});


    $('#back-icon, #post-back-icon').on('click', function() {
		general_hides();
		$('.bc-btn, .filter-item, #buy_comment').hide();
    	go_back();
	});
	


});

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function go_back(){
	if($('.bootbox').hasClass('show')){
		bootbox.hideAll();
	} else {
		general_hides();
	
		$('.bc-btn').hide();
		if(back.split("-")[0]=='view'){

			open_post(back.split("-")[1],'','','','','','','','','','','','','','','','','','','','',true);
			// open_post(back.split("-")[1],'','','','','','','','','','','','','','','','','','','','',true);
			
			// $('.header_search_text, .header2, .add-item-icon, .hh_purchases_pg, .content, .book-item, .add-item, #page-content2').hide();
			// $('#page-content, .header').show();
			// $('.header').hide();

			// $('#page-content-view-comment, .header, .comment-item').hide();
			
			
			// $("#page-content-view-comment").hide();
			// $("#page-content").show();
			if(my_post ==1 ){
				$("#unlist_edit").show();
				my_post = 0;
			}
			
			$('.page-title').html(page_title_ac);
			back = vc_back;
		} else if(back.split("-")[0]=='mcat'){
			
			var title = '';
			var id = back.split("-")[1]*1;
	
			var data = JSON.parse(localStorage.marketplacedata);
			for(var i in data.categories){
				if(data.categories[i].category_group_id == id){
					title = data.categories[i].category_group_name;
					break;
				}
			}		
	
			browse();
	
			subcategory(id,title);
			
		}else if (back.split("-")[0]=='msub'){
	
			var title = '';
			var id = back.split("-")[1]*1;
	
			var data = JSON.parse(localStorage.marketplacedata);
			var loop = 1;
			for(var i in data.categories){
				for (var j in data.categories[i].sub_category){
					if(data.categories[i].sub_category[j].category_id == id){
						title = data.categories[i].category_group_name;
						id = data.categories[i].category_group_id;
						loop = 0;
						break;
					} 
				}
				if(loop == 0){
					break;   
				}
			}  		
	
			category();
	
			subcategory(id,title);
		}else if(back == 'repair'){
			window.location = '../index.html';
		} else if (back == 'browse'){
			browse();
		} else if (back == 'cat' || back == 'category'){
			category();
		} else if (back == 'sales_sold') {
			sales_sold(false);
		} else if (back == 'sales_live'){
			sales_live(false);
		} else if (back == 'likes'){
			likes(false);
		} else if (back == 'filter'){
			pg_filter();
		} else if (back == 'search'){
			start_filtering(false);
		} else if (back == 'wishlist'){
			pg_wishlist();
		} else if (back == 'purchases'){
			purchases(false);
		} else if (back == 'trending'){
			trending(false);
		} else if (back == 'purchases_sold')  {
			purchases_sold(false);
		} else {
			browse(); 
		}
	}


}

function general_hides(){
	
	$('.bc-btn .hh_home_pg, .book-item, .search-div, #page-content2, #page-content-browse, .content, .add-item-min').hide();
}


// $(window).scroll(function() {
//   if ($(this).scrollTop() > 0) {
//     $('.header2').fadeOut();
//     $('.header1').css('box-shadow-bottom','4px #9A9A9A');
//   } 
//   // else {
//   //   $('.header2').fadeIn();
//   // }
// });





var lastScrollTop = 0;
$(window).scroll(function(event){
	console.log()
   var st = $(this).scrollTop();
   if(current_nav == 'browse' || current_nav == 'cat'){
	   if (st > lastScrollTop){		
		    $('.header2').fadeOut();
		    $('.header1').css('box-shadow-bottom','4px #9A9A9A');		    
		    $('.add-item').fadeOut();
		    $('.add-item-min').fadeIn();   			   
	   } else {
	   		if(lastScrollTop - st > 30 || st < 50){
		    $('.header2').fadeIn();
		    $('.header1').css('box-shadow-bottom','0px #9A9A9A');
		    $('.add-item-min').fadeOut();
		    $('.add-item').fadeIn();
		    }
	   }
	   lastScrollTop = st;
   }
});

// open_post();
// function open_category(){

// }

$('#profile-icon').on('click', function() {
	back = current_nav;
	current_nav = 'profile';
	profile();
});

$('.notifications-fields').on('click', function() {
	back = current_nav;
	notifications();
	
});




function profile(){


  
    $('.add-item').fadeIn();
    $('.hh_home_pg, .header2, .book-item, .search-div, #page-content2, .content,#status_layer, .add-item').hide();
    $('.header').show();
  
    
    $('.content').css('padding','50px 10px 130px 10px');
    $('.page-title').html('My Profile');

	$('.f-icon,#main-menu-sales,#main-menu-browse').removeClass('f-icon-active');

	$('#page-profile').show();
    
    // $('.f-icon,#main-menu-sales,#main-menu-browse').removeClass('f-icon-active');
    // $('#main-menu-likes').addClass('f-icon-active');
  


  
}

function notifications(){


    $('.add-item').fadeIn();
    $('.hh_home_pg, .header2, .book-item, .search-div, #page-content2, .content,#status_layer, .add-item').hide();
    $('.header').show();
  
    
    $('.content').css('padding','50px 10px 130px 10px');
    $('.page-title').html('Notifications');

	$('.f-icon,#main-menu-sales,#main-menu-browse').removeClass('f-icon-active');

	$('#page-notifications').html('<div style="margin-left: -5%; margin-top: 40vh;"><div class="lds-ripple"><div></div><div></div></div></div>');

	var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/notificatoin_sync",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\"}"
    };
    $.ajax(settings).done(function (response) {
		var data = JSON.parse(response); 
        if(data.success){
			var not_count = 0;
			if(data.notifications.length == 0){
				$('#page-notifications').html('<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">You have 0 notifications.</div>');
			} else {
				if(data.notifications.length > 1){
					$('#page-notifications').html('<div style="height: 40px;"></div><div id="mrb_all" style="text-align: center; padding-top: 4px;" onclick="mark_notification_read(\'all\',\'all\')"><span style="border: 1px solid #E7E7E7; font-weight: normal; padding: 3px 5px 3px 5px; border-radius: 3px;">Mark All as Read</span></div><hr>');
				} else {
					$('#page-notifications').html('<div style="height: 40px;"></div>');
				}
				
				for(var i in data.notifications){
					not_count++;
					var bold='';
					var mark_read_btn = '';
					if(data.notifications[i].notification_status == 'PENDING'){
						bold=' style="font-weight: bold;"';
						mark_read_btn = '<div id="mrb_'+not_count+'" style="text-align: right; padding-top: 4px;" onclick="mark_notification_read('+data.notifications[i].notification_id+','+not_count+')"><span style="border: 1px solid #E7E7E7; font-weight: normal; padding: 3px 5px 3px 5px; border-radius: 3px;">Mark as Read</span></div>';

					}
					$('#page-notifications').append('<div '+bold+' class="not-body"  id="notification_no_'+not_count+'"><div onclick="mark_notification_read('+data.notifications[i].notification_id+'); open_post('+data.notifications[i].item_id+',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',true)" style="font-size: 14px; text-align: left; color: #13A89F;">'+data.notifications[i].created_at+'</div><div onclick="mark_notification_read('+data.notifications[i].notification_id+','+not_count+'); open_post('+data.notifications[i].item_id+',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',\'\',true)" style="font-size: 14px; text-align: left;">'+data.notifications[i].notification_body+'</div>'+mark_read_btn+'<hr></div>');
				}
			}
		} else {
			$('#page-notifications').html('<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">Connection Error</div>');
		}
    }).fail(function() {
			$('#page-notifications').html('<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">Network Error</div>');
    });	

	$('#page-notifications').show();	
}

function mark_notification_read(id, not_count=0){
	if(id == 'all'){
		$(".not-body").css('font-weight','normal');
	} else {
		$("#notification_no_"+not_count).css('font-weight','normal');
	}
	
	$("#mrb_"+not_count).remove();
	var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/notificatoin_sync_mark_red",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"notification_id\": \""+id+"\"}"
    };
    $.ajax(settings).done(function (response) {
		var data = JSON.parse(response); 
        if(data.success){
			sync_notifications();
		} else {
			mark_notification_read(id);
		}
    }).fail(function() {
		mark_notification_read(id);
	});	
}

function sync_notifications(){
	var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/notificatoin_sync_count",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\"}"
    };
    $.ajax(settings).done(function (response) {
		if(response > 0){
			if(response < 10){
				$('#notification_count_in, #notification_count_out').html('&nbsp;'+response);
			} else {
				$('#notification_count_in, #notification_count_out').html(response);
			}
			$('#notification_count_in, #notification_count_out').show();
		} else {
			$('#notification_count_in, #notification_count_out').hide();
		}
    })	
}

sync_notifications();
setInterval(function(){
	sync_notifications();
	
}, 5000);




$('#camera-change-profile-photo').on('click', function() {
	$("#modal-profile-pic").modal("show");
});

$('.verified-fields').on('click', function() {
	$("#modal_about_verification").modal("show");
});



function onCameraSuccess(data){
	StatusBar.overlaysWebView(true);
	StatusBar.overlaysWebView(false);
	StatusBar.backgroundColorByHexString("#11978E");
	$('.the-footer').removeClass("footer");
	$('.the-footer').addClass("footer");
	upload_profile_image(data);
}

function onCameraFail(data){
	StatusBar.overlaysWebView(true);
	StatusBar.overlaysWebView(false);
	StatusBar.backgroundColorByHexString("#11978E");
	$('.the-footer').removeClass("footer");
	$('.the-footer').addClass("footer");
	upload_profile_image(data);
}

function upload_profile_image(data){
	$('#the_profile_img_section').attr("src","data:image/jpeg;base64,"+data);
    var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://fixchap.com/dev/marketplace/etc/api/item/add_profile_photos",
		"method": "POST",
		"headers": {
		  "Content-Type": "application/json"
		},
		"processData": false,
		"data": "{\"images\": \""+data+"\",\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
		// console.log(response);  
  
	  }).fail(function() {
		// console.log('fail');
	  }); 	
}

$('#pi-open-camera').on('click', function() {
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
		quality: 100,
		correctOrientation: true,
		sourceType: Camera.PictureSourceType.CAMERA,
		destinationType: Camera.DestinationType.DATA_URL,
		allowEdit: true,
		saveToPhotoAlbum: true      
	}); 
	$("#modal-profile-pic").modal("hide");
});

$('#pi-open-gallery').on('click', function() {
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { 
		quality: 100,
		correctOrientation: true,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		destinationType: Camera.DestinationType.DATA_URL,
		allowEdit: true,
		saveToPhotoAlbum: true
	}); 
	$("#modal-profile-pic").modal("hide");
});

$('#remove_image_profile').on('click', function() {
	$("#the_profile_img_section").attr("src","../images/profile.jpg");
	$("#modal-profile-pic").modal("hide");
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://fixchap.com/dev/marketplace/etc/api/sync_name_and_photo_remove_photo",
		"method": "POST",
		"headers": {
		  "Content-Type": "application/json"
		},
		"processData": false,
		"data": "{\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\"}"
	  };
	  $.ajax(settings).done(function (response) {

	  });

});


function retreave_photo_and_name(){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://fixchap.com/dev/marketplace/etc/api/sync_name_and_photo",
	  "method": "POST",
	  "headers": {
		"Content-Type": "application/json"
	  },
	  "processData": false,
	  "data": "{\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\"}"
	};
	$.ajax(settings).done(function (response) {
	  var data = JSON.parse(response);
	  if(data.success){ 

		
		$('#the_profile_img_section').attr('src','data:image/png;base64,'+data.base64);
		$('#the_profile_img_section').attr('height','150');
		$('#the_profile_img_section').attr('width','150');

		$('#the_name_section').html(data.name);

		if(data.verify == 'virified'){
			$('#the_vefiry_section').html('<td class="verified-fields" style="width: 10%; border-bottom: 1px solid #d4d4d4;"><img src="assets/images/verified.png" height="20"></td>');
			$('#the_vefiry_section').append('<td class="verified-fields" style="text-align: left; font-size: 18px; border-bottom: 1px solid #d4d4d4;padding: 10px;">Verified</td>');
		} else {
			$('#the_vefiry_section').html('<td class="verified-fields" style="width: 10%; border-bottom: 1px solid #d4d4d4;"><img src="assets/images/unverified.png" height="20"></td>');
			$('#the_vefiry_section').append('<td class="verified-fields" style="text-align: left; font-size: 18px; border-bottom: 1px solid #d4d4d4;padding: 10px;">Not Verified</td>');		
		}

	  } else {
		//   retreave_photo_and_name();
	  }    
	}).fail(function() {
	//   retreave_photo_and_name();
	});  
  }
  

  retreave_photo_and_name();


if(localStorage.session == null){
 $("#profile-icon").hide();
}
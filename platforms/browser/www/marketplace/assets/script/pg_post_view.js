var this_item_like = 0;
var likes_count = 0;
var post_pictures_ready = 0;
var vc_back = '';
var current_id = '';
var item_location = 'SELLER';
var buying_option = 1;
var buying_option_item_id = 0;

$("#comment_to_seller").click(function() {
	if(localStorage.session == null){
		window.location.href="../index.html?login=1";
	} else {
		item_comment(current_id);
	}
	
});

$("#buy_now").click(function() {
	if(localStorage.session == null){
		localStorage.gotoitem = current_id;
		window.location.href="../index.html?login=1";
	} else {
		buy_item(current_id, item_location);
	}
});

function open_post(
	id,
	title,
	desc,
	price,
	file_content,
	total_images,
	likes_status,
	total_likes, 
	selflike,
	like_and_comment,
	book_count,
	book_count_number,
	category,
	total_views,
	posted_on,
	book_btn,
	status,
	unpublish_message,
	purpose,
	condition,
	admin_comments,
	refresh=false
	){
		
		localStorage.wasTapped = id;
		
		item_location = 'SELLER';

		if(price.includes("<br>")){
			var payary = price.split("<br>");
			price = payary[0];
		}
		
		current_id = id;
		clearInterval(search_setInterval);

		post_pictures_ready = 0;
		$('.page-title').html(title);

		page_title_ac = title;

		image_index = 0;
		image_array = [];

		var post_loaded  = 0;	
	
		var photo_list = '';
		var photo_indicators = '';

		var photo_list2 =  '';
		var thumbnail = '';
		for(var i=0; i<total_images; i++){

			var src = 'assets/images/cat_icon.png';
			if(i==0){
				src = 'data:image/jpeg;base64,'+file_content;
			}

			photo_list2 += `
				<div class="sp-slide">
					<img class="sp-image sp-image-count-`+(i+1)+`" src="`+src+`" onerror="this.src='assets/images/cat_icon.png'"/>
				</div>			
			`;

			thumbnail += `
			<img class="sp-thumbnail sp-image-count-`+(i+1)+`" src="`+src+`" onerror="this.src='assets/images/cat_icon.png'"/>
			`;

		}

		var new_slider = `

		<div id="example3" class="slider-pro">
		<div class="sp-slides">
			`+photo_list2+`
		</div>

		<div class="sp-thumbnails">
		 	`+thumbnail+`
		</div>
    </div>		
		`;

		back = current_nav;
		vc_back = current_nav;

		current_nav = "post";
	
		$('.header_search_text, .header2, .add-item-icon, .hh_purchases_pg, .content, .book-item, .add-item, #page-content2').hide();
		$('#page-content, .header').show();

		$('.header').hide();
		
		
		$(window).scrollTop(0);
		$('.content').css('padding','0px 10px 130px 10px');
	
		
	
		// $('.content').css('padding','0px');
		// $('#page-sub-content').html('');
	
	
		$('#page-content').css("max-width","100%");
		$('#page-content').html('<center><div style="margin-top: 30vh;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></center>');
	

		if(refresh && localStorage.session == null){
			localStorage.gotoitem = id;
			window.location.href="../index.html?login=1";
		}


		if(refresh && localStorage.session != null){
			
		
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_items",
				"method": "POST",
				"headers": {
				"Content-Type": "application/json"
				},
				"processData": false,
				"data": "{\"exclude_items_array\":"+JSON.stringify([])+",\"user_id\": \""+localStorage.user_id+"\",\"page\": \"all2\",\"item_id\": \""+id+"\"}"
			};
			$.ajax(settings).done(function (response) {
				
				var data = JSON.parse(response);
				if(data.success){ 
					if(data.items.length > 0){
						for(var i in data.items){
							title = data.items[i].item_desc_title;
							desc = data.items[i].item_desc_details
							price = 'TZS '+number_format(data.items[i].item_desc_selling_price);
							file_content = data.items[i].file_content;
							total_images = data.items[i].total_images;
							likes_status = data.items[i].like_status;
							total_likes = data.items[i].total_likes;
							selflike = data.items[i].selflike;
							like_and_comment = data.items[i].like_and_comment;
							book_count = data.items[i].book_count;
							book_count_number = data.items[i].book_count_number;
							category = data.items[i].category;
							total_views = data.items[i].total_views;
							posted_on = data.items[i].posted_on;
							book_btn = data.items[i].book_btn;
							status = data.items[i].item_status_title;
							unpublish_message =  data.items[i].unpublish_message;
							admin_comments = '';
							post_loaded = 1;
							
						}
					} 
				}
			}).fail(function() {
				
			}); 
		} else {
			post_loaded = 1;
		}

		if(category == 'null') {
			category = "Category: Others";
		} 
		
		
		setInterval(function(){ 
			if(post_loaded == 1){
				post_loaded = 2;
				price = price.replace("TZS ", "");

				image_array.push(file_content);
		
				image_index++;  
		
				photo_indicators += '<li data-target="#carouselExampleIndicators" class="active"></li>';
				  photo_list +=	'<div class="carousel-item active" onclick="view_pictures(0)">'+
						  '<!--<img src="watermark.png" class="watermark"/>--><img id="not_loaded_count_1" class="d-block w-100" style="object-fit: cover; height: 400px;"   src="data:image/jpeg;base64,'+file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'" alt="First slide"><div style="position: absolute; bottom: 0; background-color: red; height: 100%; width: 100%; background: rgba(0, 0, 0, 0.1);"></div>'+
						'</div>';
		
				for(var i=1; i<total_images; i++){

					// image_array.push(file_content);
		
					// image_index++; 
		
					photo_indicators += '<li data-target="#carouselExampleIndicators"></li>';
						photo_list +=	'<div class="carousel-item" onclick="view_pictures('+i+')">'+
								'<!--<img src="watermark.png" class="watermark"/>--><img id="not_loaded_count_'+(i+1)+'"  class="d-block w-100 " style="object-fit: cover; height: 400px;"   src="assets/images/cat_icon.png" onerror="this.src=\'assets/images/cat_icon.png\'" alt="First slide">'+
							'</div>';
					photo_active = '';					
				}
		
				$('#page-content').html('<div style="position: absolute; top: 15px; left: 15px; z-index: 9999; padding:10px;" onclick="go_back();"><i class="fas fa-arrow-left" style="color: white; font-size: 20px;"></i></div>'+
				'<div style="position: absolute; top: 15px; right: 65px; z-index: 9999; padding: 10px;"><i class="likeclass far fa-heart" style="display: none; color: white; font-size: 20px;" onclick="like_item('+id+')"></i></div>'+
				'<div style="position: absolute; top: 15px; right: 25px; z-index: 9999; padding: 10px;" onclick="share_item()"><i class="fas fa-share-alt" style="color: white; font-size: 20px;"></i></div>'+
					'<div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel" style="margin: 0px -10px 0px -10px; ">'+
					'<ol class="carousel-indicators round_indicators">'+
						photo_indicators+
					'</ol>'+
					'<div class="carousel-inner" style="position:relative;"><div id="overlay" class="the-img-prv-overlay" style="display: none; position:absolute;"> <center><div style="margin-top: 150px;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></center> </div>'+
						photo_list+
					'</div>'+
					'<a class="carousel-control-prev" href="#carouselExampleIndicators2" role="button" data-slide="prev">'+
						'<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
						'<span class="sr-only">Previous</span>'+
					'</a>'+
					'<a class="carousel-control-next" href="#carouselExampleIndicators2" role="button" data-slide="next">'+
						'<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
						'<span class="sr-only">Next</span>'+
					'</a>'+
					'</div>'					
				); 
				// $('#page-content').html('<div style="position: absolute; top: 15px; left: 15px; z-index: 9999; padding:10px;" onclick="go_back();"><i class="fas fa-arrow-left" style="color: white; font-size: 20px;"></i></div>'+
				// '<div style="position: absolute; top: 15px; right: 65px; z-index: 9999; padding: 10px;"><i class="likeclass far fa-heart" style="display: none; color: white; font-size: 20px;" onclick="like_item('+id+')"></i></div>'+
				// '<div style="position: absolute; top: 15px; right: 25px; z-index: 9999; padding: 10px;" onclick="share_item()"><i class="fas fa-share-alt" style="color: white; font-size: 20px;"></i></div>'+
				// new_slider						
				// ); 

				// $( document ).ready(function( $ ) {
				// 	$( '#example3' ).sliderPro({
				// 		width: 960,
				// 		height: 500,
				// 		fade: true,
				// 		arrows: true,
				// 		buttons: false,
				// 		fullScreen: true,
				// 		shuffle: false,
				// 		smallSize: 500,
				// 		mediumSize: 1000,
				// 		largeSize: 3000,
				// 		thumbnailArrows: true,
				// 		autoplay: false
				// 	});
				// });

				// jQuery( '.sp-slide' ).click(function(){
				// 	if( ! jQuery('.slider-pro').hasClass('sp-swiping') ) {
				// 		 jQuery( '.sp-full-screen-button' ).trigger( 'click' );
				// 	}
			   	// });

				
				
				$('#page-content').append(''+
					'<div class="post temp_pricing_dsp">'+
						'<div class="row post-desc">'+
							'<div class="col-12">'+
								
								'<h1 style="font-size: 25px; color: black;">TZS '+number_format(price)+'</h1>'+
								'<h1 style="font-size: 23px; color: black;">'+title+'</h1>'+
							'</div>'+
							'<div class="col-4" style="">'+
							// '<h1 style="color: #13A89F; text-align: right;">'+number_format(price)+'/=</h1>'+
							'</div>'+
						'</div>'+
					'</div>'	
				);	
				
		
				$('.temp_pricing_dsp').remove();
		
				likes_count = total_likes;
				
				var like_btn = "";


				if(status != 'SOLD' && status != 'UNLISTED'){
					if(selflike > 0){
						this_item_like = 1;
						like_btn = '<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+id+')"></i> ';

					} else {
						this_item_like = 0;
						like_btn = '<i class="far fa-heart" onclick="like_item('+id+')"></i> ';

					}
				}
		
					var comment = flag = '';
					if(like_and_comment){
						// comment = '<div style="padding-top: 5px; padding-left: 4px;" class="col-12 pa-left" onclick="item_comment('+id+')"><i class="far fa-comment"></i> Send a comment to seller</div></div>';
						$('.bc-btn').show();

						flag = '<p onclick="item_report('+id+')" style="letter-spacing: 1px; line-height: 10px;"><i class="far fa-flag"></i>&nbsp;<br><span style="font-size: 9px; letter-spacing: 1px;">Report</span></p>';
					} else {
						if(book_count){
							flag = '<span  style="letter-spacing: 1px;"><font style="font-size: 12px; letter-spacing: 1px;">'+book_count_number+' bookings</font></span>';

						}
					}
				
				var padding_edit = 'padding-bottom: 20px;';
				if(localStorage.session == null){
					padding_edit = '';
				}
		
				$('#page-content').append('<center><div class="row" style="width: 100%; padding-top: 5px; '+padding_edit+'"><div class="col-4 pa-left" style="padding-left: 4px; font-size: 11px;"><span id="likes_comments_span"><font id="views_count">'+total_views+'</font> Views | <font id="likes_count">'+total_likes+'</font> Likes</span></div>'+
								'<div class="col-4" style="text-align: center; font-size: 10px;"><span style="display: none;" id="click_to_fullscreen">Click image to view fullscreen</span></div><div class="col-4 post-actions pa-right">'+flag+'</div>'+comment+'</div></center>');
		
	
					
				share_title = 'Share Item';
				share_desc = 'https://fixchap.com/mp/?n='+id;

				

				$price_tag = '<h1 style="font-size: 24px; color: black;">TZS '+number_format(price)+'</h1>';
				if(localStorage.bonus_amount*1 > 0){
					$price_tag = '<!-- <h1 style="font-size: 24px; color: black;">TZS '+number_format((price.replace(/,/g, ""))-localStorage.bonus_amount)+'<br><span style="text-decoration: line-through; color: red; font-weight: normal; font-size: 16px;">&nbsp;TZS '+number_format(price)+'&nbsp;</span></h1>-->';
					$price_tag = '<h1 style="font-size: 24px; color: black;">TZS '+number_format(price)+'</h1><p>You have a bonus balance of TZS '+number_format(localStorage.bonus_amount)+' from using promocode. This item shall be sold to you at a price of TZS '+number_format((price.replace(/,/g, ""))-localStorage.bonus_amount)+'.</p>';
				}

				$('#page-content').append(''+
					'<div class="post">'+

					'<div class="row" id="status_div" style="text-align: left; font-size: 16px; color: #13A79E; display: none; padding-bottom: 20px;"><div class="col-12" id="status_value"></div></div>'+
					

					'<div class="post" id="view-comments-top-panel" style="display: none; margin-bottom: 10px;"><div class="row"><div class="col-1"></div><div class="col-10" style="border-radius: 5px; color: white; background-color: black; padding: 10px;"  onclick="view_admin_comments('+id+')">VIEW ADMIN COMMENTS </div></div></div>'+

					
					'<div class="row" id="the-map-pin" style="display:none; padding:5px;"><div class="col-1"></div><a href="#" id="pin-map-href" class="col-10" style="font-size: 16px; background-color: white; text-decoration: none; color: #13A79E; border: 1px solid #13A79E;  border-radius: 5px; padding: 10px;"><i class="fas fa-map-marker-alt"></i>&nbsp; FixChap Store Direction</a></div>'+

					'<div class="row" id="the-call-support" style="display:none; padding:5px"><div class="col-1"></div><a href="tel:+255" id="call-support-ref" class="col-10" style="font-size: 16px; background-color: white; text-decoration: none; color: #13A79E; border: 1px solid #13A79E;  border-radius: 5px; padding: 10px;"><i class="fas fa-phone fa-flip-horizontal"></i>&nbsp; For Inquiries Call Support</a></div>'+
					
	
					'<div class="row" id="admin_comments_panel" style="display: none;">'+
						'<div class="col-12 admin_comment_title"><hr/>Admin\'s Comment</div>'+
						'<div id="admin_comments">'+
						'</div>'+
					'</div>'+
					'<div id="the_padding_border" style="height: 30px; display: none;"></div>'+
					'<div class="row" id="cancel_booking_div" style="text-align: center; display: none; margin-bottom: 30px;"><div class="col-1"></div><div class="col-10" style="border-radius: 5px; color: white; background-color: #13A89F; padding: 10px;" onclick="cancel_booking('+id+')">CANCEL BOOKING</div></div>'+

						'<div class="row post-desc">'+

						  
												
							'<div class="col-12" style="margin-top: -30px;">'+
								$price_tag+
							'</div>'+

							'<div class="col-12">'+
								'<h1 style="font-size: 23px; color: black;">'+title+'</h1>'+
							'</div>'+	
							

							'<div class="col-12" >'+
								'<p style="font-size: 17px; line-height:21px;">'+desc+'</p>'+
							'</div>'+
							'<div class="col-12" style="text-align: left; font-size: 16px; color: #13A79E; line-height: 24px; margin-top: -20px;">'+
								
								'<br>Condition: <span id="the_condition">'+condition+'</span><br>'+
								'<!-- Purpose: <span id="the_purpose">'+purpose+'</span><br> -->'+
							
							'</div>'+
							
							'<div class="col-12" style="text-align: left; font-size: 16px; color: #13A79E; margin-top: -20px;">'+
								'<br><p style="color: #13A79E; font-size: 16px;">'+category+'</p>'+
							'</div>'+

							'<div class="col-6"  style="padding-top: 10px; text-align: left; font-size: 16px; color: #13A79E;">'+
							'<span id="the_item_no_display" style="display:none;">Item No. '+id+'</span></div>'+

							'<div class="col-6" style="padding-top: 10px; text-align: right; font-size: 12px;">'+
							'Posted '+posted_on+''+

							'</div>'+

							'<div class="col-12"><hr/></div>'+
						
						'</div>'+


						
						'<div style="height: 50px"></div>'+
					'</div>'
					
				);


			

				
		
				if(like_and_comment){
					
				} else {
					
					$('#the-call-support').after('<div class="post" id="view-comments-panel" sytle="display: none;"><div class="row"><div class="col-1"></div><div class="col-10" style="border-radius: 5px; color: white; background-color: #13A89F; padding: 10px;"  onclick="view_comments('+id+')">View Buyers\' Comments <span id="comment_count"></span></div></div></div>');
					
				}

				
				
				$('.bc-btn').hide();

				
				

				if(book_btn) {
					$('#buy_comment').show();
					// $('#page-content').append('<div class="item-act-btn" onclick="buy_item('+id+')">Buy</div>'); 
		
				} else {
					
					if(status == 'WAITING_FOR_APPROVAL'){
						if(admin_comments) {
							if(admin_comments.length == 0){
								$('#unlist_delete').show();
							} else {
								$('#unlist_edit').show();
							}
						} else {
							$('#unlist_edit').show();
						}
					}
					if(status != 'SOLD'){
						$('#unlist_edit').show();
					}
					
					// $('#page-content').append('<div class="item-act-btn" onclick="add_post_master('+id+')">Edit</div>'); 
				}
		
			
				if(admin_comments) {
				
					if(admin_comments.length>0){

						$('#page-content').append('<div class="post" id="view-comments-panel" sytle="display: none;"><div class="row"><div class="col-1"></div><div class="col-10" style="border-radius: 5px; color: white; background-color: black; padding: 10px;"  onclick="view_admin_comments('+id+')">VIEW ADMIN COMMENTS </div></div></div>');
				
						for(var i in admin_comments){ 
							if(admin_comments[i].item_feedback_read_status == 'UNREAD'){
								$('#view-comments-top-panel').show();
							}
						}
						
						// for(var i in admin_comments){ 
						// $('#admin_comments').append(''+
						// '<div class="col-12 admin_comment_content"><font class="admin_comment_time">'+admin_comments[i].created_on+'</font> '+admin_comments[i].item_feedback_text+'</div>'+
						// '');
						// }
						// $('#admin_comments_panel').show();   
					}
				}
		
				if(status != 'LIVE'){

					if(status.replace(/_/g, " ") != 'SOLD'){
						$('#status_value').html('<hr>Status: '+status.replace(/_/g, " ")+'<br><br>'); 
					}
		
					if(status.replace(/_/g, " ") == 'UNPUBLISHED'){
						$('#status_value').html('<hr>Status: '+status.replace(/_/g, " ")+' - '+unpublish_message+'<br><br>');
					}
		
					$('#status_div').show();
				} else {


				}
		
		
				$(".carousel").carousel({
					interval: false,
					pause: true
				});
			
				$('.carousel .carousel-inner').on('dragstart', 'a', function () {
					return false;
				});  


				$('#like_btn,#likes_comments_span').hide();

				$('#buy_comment').hide();

				var settings_img_view = {
					"async": true,
					"crossDomain": true,
					"url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_likes",
					"method": "POST",
					"headers": {
					"Content-Type": "application/json"
					},
					"processData": false,
					"data": "{\"item_id\": \""+id+"\",\"user_id\": \""+localStorage.user_id+"\"}"
				};
				$.ajax(settings_img_view).done(function (response) {
				var data = JSON.parse(response);
					if(data.success){ 
						$("#call-support-ref").attr('href','tel:'+data.call_support_number);
						if(data.show_call_support){
							$("#the-call-support").show();
							$("#the_item_no_display").show();
							$("#the_padding_border").show();

						}

						$("#pin-map-href").attr('href','http://www.google.com/maps/place/'+data.map_location);


						if(data.book_btn) {
							$('#buy_comment').show();
						}

						$('#like_btn,#likes_comments_span').show();


						if(status != 'SOLD' && status != 'UNLISTED'){
							if(data.like_status > 0 ){
								this_item_like = 1;	
								
								$("#like_btn, .like-icon_"+id).html('<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+id+')"></i>');
								$('.likeclass').removeClass('far fas fa-heart');
								$('.likeclass').addClass('fas fa-heart');
								$('.likeclass').show();
							} else {
								this_item_like = 0;		
								$("#like_btn, .like-icon_"+id).html('<i class="far fa-heart" onclick="like_item('+id+')"></i>');
								$('.likeclass').removeClass('far fas fa-heart');
								$('.likeclass').addClass('far fa-heart');
								$('.likeclass').show();
							}
						}

						
						
						$("#comment_count").html('('+data.total_comments+')');

						if(data.total_comments > 0){
							$("#view-comments-panel").show();
						}

						$("#likes_count").html(data.total_likes);
						$("#views_count").html(data.total_views);

						$('.page-title').html(data.item_title);
						$("#the_condition").html(data.item_condintion);
						$("#the_purpose").html(data.item_purpose);

						item_location = data.item_location;

						likes_count = data.total_likes;

						if(data.admin_comments) {
							
							if(data.admin_comments.length > 0) {

								$('#page-content').append('<div class="post" id="view-comments-panel" sytle="display: none;"><div class="row"><div class="col-1"></div><div class="col-10" style="border-radius: 5px; color: white; background-color: black; padding: 10px;"  onclick="view_admin_comments('+id+')">VIEW ADMIN COMMENTS </div></div></div>');
								
						
								for(var i in data.admin_comments){ 
									if(data.admin_comments[i].item_feedback_read_status == 'UNREAD'){
										$('#view-comments-top-panel').show();
									}
								}
								// for(var i in data.admin_comments){ 
								// 	$('#admin_comments').append(''+
								// 	'<div class="col-12 admin_comment_content"><font class="admin_comment_time">'+data.admin_comments[i].created_on+'</font> '+data.admin_comments[i].item_feedback_text+'</div>'+
								// 	'');
								// }
								// $('#admin_comments_panel').show();   
						
							}
						}

						if(data.seller_status){
							var theSStutus = 'Status: '+data.seller_status.replace(/_/g, " ");

							if(data.disbursment_counts == 0 && data.seller_status.replace(/_/g, " ")=='SOLD'){
								theSStutus += ' | Please wait for the money (TZS '+data.seller_price+') to be transfered to you.';
							} else if(data.disbursment_counts > 0 && data.seller_status.replace(/_/g, " ")=='SOLD'){
								theSStutus += ' | Money (TZS '+data.seller_price+') successful transfered.';
							}
							
							if(data.bookings > 0 && data.item_location == 'SELLER'){
								theSStutus += ' (Bring item to FixChap store)';
								$('#the-map-pin').show();
							} else if (data.bookings > 0 && data.item_location == 'STORE' && data.item_status == 'LIVE') {
								theSStutus += ' (Waiting for customer to verify the item)';
							}
							$('#status_value').html(theSStutus);
							$('#status_div').show();

						}

						if(data.waiting_to_arrive_to_store)	{
							$('#cancel_booking_div').show();
							// $('#status_layer_message').html('Status: Waiting for an item to arrive at FixChap store.'); 
							// $('#status_layer').show();   
							$('#status_value').html('Status: Waiting for an item to arrive at FixChap store.');
							$('#status_div').show();
							// $('#the-map-pin').show();
							$("#the-call-support").show();
						}	

						if(data.waiting_to_you_to_verify)	{
							$('#cancel_booking_div').show();
							// $('#status_layer_message').html('Status: The item is at FixChap store. Waiting for you verify.'); 
							// $('#the-map-pin').show();
							// $('#status_layer').show();  
							
							$('#status_value').html('Status: The item is at FixChap store. Waiting for you to verify.');
							$('#status_div').show();
							$('#the-map-pin').show();
							$("#the-call-support").show();
						}	

						if(!data.wait_disbursment){
							if(data.please_rate) {

								$('#status_layer_message').html('<span onclick="rate('+id+')">Thank you for using FixChap. Please click here rate.</span>'); 
								$('#status_layer').show(); 
							}
						}


						
						if(data.rate_results){
							$('#status_value').html('Status: Purchase Completed!');
							$('#status_div').show();
							$('#status_value').append(
								'<br><br>You have rated: '+data.stars+' star(s)<br>Your comments: '+data.comments
							);
						}

						

						
					}
				});


			
				for(var i=0; i<total_images; i++){
					
					var settings_img_view = {
						"async": true,
						"crossDomain": true,
						"url": "https://fixchap.com/dev/marketplace/etc/api/view_unloaded_photo",
						"method": "POST",
						"headers": {
						"Content-Type": "application/json"
						},
						"processData": false,
						"data": "{\"item_id\": \""+id+"\",\"count\": \""+(i+1)+"\"}"
					};
					$.ajax(settings_img_view).done(function (response) {
					var data = JSON.parse(response);
					if(data.success){ 
						post_pictures_ready = 1;
						$("#click_to_fullscreen").show();
						if(id = data.item_id){
							image_array.push(data.file_content);
							image_index++;  
		
							$("#not_loaded_count_"+data.count).attr('src',"data:image/png;base64,"+data.file_content);
						}
						// post_pictures_ready = 1;
						// if(id = data.item_id){
						// 	image_array.push(data.file_content);
						// 	image_index++;  
		
						// 	$(".sp-image-count-"+data.count).attr('src',"data:image/png;base64,"+data.file_content);
						// }
						// 
						// post_pictures_ready = 1;
						// $("#click_to_fullscreen").show();

						// for(var i in data.photos){
						// 	image_array.push(data.photos[i].file_content);
						// 	image_index++;  
		
						// 	$("#not_loaded_count_"+data.photos[i].file_count).attr('src',"data:image/png;base64,"+data.photos[i].file_content);
						// }

						// $('.the-img-prv-overlay').hide();

						// if(id = data.item_id){

							// var before = data.count-2;
							// if(before < 0) {before = 0; }

							// image_array.splice(data.count-1, before, data.file_content);
						// 	image_array.push(data.file_content);
						// 	image_index++;  
		
						// 	$("#not_loaded_count_"+data.count).attr('src',"data:image/png;base64,"+data.file_content);
						// }
					}
		
					});
		
									
				}
				if(localStorage.session == null){
					$('#buy_comment').show();
				}
			}
	
		}, 500);

		
		
						
}

function like_item(id){
	if(localStorage.session == null){
		window.location.href="../index.html?login=1";
	} else {
		var like_flag = '';
		if(this_item_like > 0){
			this_item_like = 0;
			likes_count--;
			$("#likes_count").html(likes_count);
			$("#like_btn, .like-icon_"+id).html('<i class="far fa-heart" onclick="like_item('+id+')"></i>');
			like_update_add(id, 'dislike');
			like_flag = 'dislike';
			$('.likeclass').removeClass('far fas fa-heart');
			$('.likeclass').addClass('far fa-heart');
	
		} else {
			this_item_like = 1;
			likes_count++;
			$("#likes_count").html(likes_count);		
			$("#like_btn, .like-icon_"+id).html('<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+id+')"></i>');
			like_update_add(id, 'like');
			like_flag = 'like';
			$('.likeclass').removeClass('far fas fa-heart');
			$('.likeclass').addClass('fas fa-heart');
		}
	
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://fixchap.com/dev/marketplace/etc/api/like",
			"method": "POST",
			"headers": {
			  "Content-Type": "application/json"
			},
			"processData": false,
			"data": "{\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+id+"\",\"flag\": \""+like_flag+"\"}"
		  };
		  $.ajax(settings).done(function (response) {
			like_update_remove(id, like_flag);
		  });
		  item_storage('likes');
	}
}

function item_comment(id){
	swal({
		title: "",
		text: "Write a comment to seller",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		confirmButtonText: 'Send',
		// inputPlaceholder: "Write something"
	  }, function (inputValue) {
		if(inputValue === false){

		} else {
			if (inputValue === "") {
				swal.showInputError("You need to write something!");
				return false;
			  } else {
				  swal({ html: true, title: "", 
				  text: 'Sending...', 
					allowOutsideClick: true, showConfirmButton: false});
				  var settings = {
					  "async": true,
					  "crossDomain": true,
					  "url": "https://fixchap.com/dev/marketplace/etc/api/comment/add",
					  "method": "POST",
					  "headers": {
						"Content-Type": "application/json"
					  },
					  "processData": false,
					  "data": "{\"message\": \""+btoa(inputValue)+"\",\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+id+"\"}"
					};
					$.ajax(settings).done(function (response) {
					  swal.close();
					  return false;
					}).fail(function() {
					  swal.close();
					  return false;
				  });		
			  }
		}
	  });
}


function item_report(id){
	swal({
		title: "",
		text: "Report this post",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		confirmButtonText: 'Post',
		// inputPlaceholder: "Write something"
	  }, function (inputValue) {
		if (inputValue === "") {
		  swal.showInputError("You need to write something!");
		  return false;
		} else {
			swal({ html: true, title: "", 
			text: 'Sending...', 
		  	allowOutsideClick: true, showConfirmButton: false});
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://fixchap.com/dev/marketplace/etc/api/comment/report",
				"method": "POST",
				"headers": {
				  "Content-Type": "application/json"
				},
				"processData": false,
				"data": "{\"message\": \""+btoa(inputValue)+"\",\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+id+"\"}"
			  };
			  $.ajax(settings).done(function (response) {
				swal.close();
				return false;
			  }).fail(function() {
				swal.close();
				return false;
			});		
		}
	  });
}

function pre_book_for_assessment(id){
	swal({
        title: "",
        html: true,
        showCancelButton: true,
        text: "Upon selection of this option, we will notify you once the item is at our store ready for verification and sale.  All clients who booked will be notified and the item will be sold on a first come first served basis.<br>Are sure you want to do this?",
        icon: "warning",
        buttons: true,
        confirmButtonText: 'Yes',
		cancelButtonText: 'No',
        dangerMode: true,
        },  function (isConfirm) {
        if (isConfirm) {
			book_for_assessment(id);     
        }
      });
}


function book_for_assessment(id){

	swal({ html: true, title: "", text: 'Submiting..', allowOutsideClick: false, showConfirmButton: false});
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://fixchap.com/dev/marketplace/etc/api/booking/add",
		"method": "POST",
		"headers": {
		  "Content-Type": "application/json"
		},
		"processData": false,
		"data": "{\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+id+"\",\"promocode\":\""+localStorage.promocode+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
		var data = JSON.parse(response);
		if(data.success){ 
			$(".item-act-btn").hide();
			// error_message("Congratulations! You shall be informed on when item has arrived at the store.");
			just_added = 1;
			purchases();
			// open_post(id,'','','','','','','','','','','','','','','','','','','','',true);
			swal.close();

			
			$("#buy_comment").hide();
			if(item_location=='STORE'){
				// swal({ html: true, title: "", text: 'The item is already in store. Please come and verfy.', allowOutsideClick: false, showConfirmButton: true});
				$('#modal_bring_item_to_store').modal('show');
				$("#modal_bring_item_to_store .modal-dialog").css('margin-top','40vh');
				$("#modal_bring_item_to_store .modal").css('text-align','center');
				$("#modal_bring_item_to_store .modal-dialog").css('text-align','center');
			}


		} else {
			error_message(data.message);
		}		
	  }).fail(function() {
		error_message('Connection Error!');
	});		
}



function reserve(id){
	error_message("Sorry this feature is still on development.");
}

function change_buying_option(option){
	buying_option = option;
	if(option == 1){
		$('.b-o-1').addClass('buy_option_selected');
		$('.b-o-2').removeClass('buy_option_selected');
	} else {
		$('.b-o-1').removeClass('buy_option_selected');
		$('.b-o-2').addClass('buy_option_selected');
	}
}

function buy_after_change(){
	promocode();

}

function buy_item(id){
	buying_option = 1;
	buying_option_item_id = id;

    var text =  '<div>'+
                    '<div class="condition_title">Buying Options</div>'+
					'<div class="b-o-1 add_condition_select buy_option_selected" onclick="change_buying_option(1)">'+
                    '<h4>Verify & Buy in Store</h4>'+
                    '<p>Upon selection of this option, we will notify you once the item is at our store ready for verification and sale.  All clients who booked will be notified and the item will be sold on a first come first served basis.</p>'+
                    '</div>'+
                    '<div class="b-o-2 add_condition_select" onclick="change_buying_option(2)">'+
                    '<h4>Pay in Advance (Reserve)</h4>'+
                    '<p>Upon selection of this option, we allow you to make a down payment to reserve the item only for you, we will notify you once the item is at our store ready for your verification and closing the sale.</p>'+
                    '</div>'+
					'<div style="color: white; background-color: #13A79E; margin-bottom: 10px; padding: 10px; border-radius: 5px;" onclick="buy_after_change()">Continue</div>'+
					'<div style="color: 13A79E; background-color: #white; padding: 10px; border: 1px solid #13A79E; border-radius: 5px;" onclick="swal.close();">Cancel</div>'+
                '</div>';


	    // var text =  '<div>'+
                    
                    
		// 			'<div style="color: white; margin-bottom: 10px; background-color: #13A79E; padding: 10px; border-radius: 5px;" onclick="pre_book_for_assessment('+id+')">Verify & Buy in Store</div>'+
		// 			'<div style="color: white; margin-bottom: 10px; background-color: black; padding: 10px; border-radius: 5px;" onclick="reserve('+id+')">Pay in Advance</div>'+
		// 			'<div style="color: white; background-color: white; color: #13A79E; border: 1px solid #13A79E;  padding: 10px; border-radius: 5px;" onclick="swal.close();">Cancel</div>'+
        //         '</div>';


    // swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});	
	buy_after_change();
}

function promocode(){
	localStorage.promocode = 0;
	swal({
		title: "Buy an Item",
		text: "Are you sure you want to buy this item? Enter a promocode to get a discount.",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		animation: "slide-from-top",
		inputPlaceholder: "",
		confirmButtonText: "Continue",
		cancelButtonText: "Cancel",   
	  },
	  function(inputValue){
		if (inputValue === "") {
			localStorage.promocode = inputValue;
			now_book();
		} else {
			localStorage.promocode = inputValue;
			now_book();
		}
	  },
	  function (){
		  
	  }
	  
	  );
}

function now_book(){
	swal({ html: true, title: "", text: 'Submiting..', allowOutsideClick: false, showConfirmButton: false});
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://fixchap.com/dev/marketplace/etc/api/booking/add",
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
		},
		"processData": false,
		"data": "{\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+localStorage.wasTapped+"\",\"promocode\":\""+localStorage.promocode+"\"}"
		};
		$.ajax(settings).done(function (response) {
		var data = JSON.parse(response);
		if(data.success){ 
			// error_message("Congratulations! You shall be informed on when item has arrived at the store.");
			// just_added = 1;
			// purchases();
			// alert("Am here");
			
			open_post(localStorage.wasTapped,'','','','','','','','','','','','','','','','','','','','',true);
			swal.close();



		} else {
			error_message(data.message);
		}		
		}).fail(function() {
		error_message('Connection Error!');
	});

};

$( document ).ready(function() {
	var url = window.location.href;
	var url_item_id = url.split("?id=")[1];
	if(url_item_id){	
		open_post(url_item_id,'','','','','','','','','','','','','','','','','','','','',true);		
	}
});





function share_item(){
	navigator.share(share_desc,share_title,"text/plain");
}


$("#unlist, #unlist_delete").click(function() {
	item_unlist(current_id);
});


$("#edit_post").click(function() {
	// item_unlist(current_id);
	add_post_master(current_id);
});

function item_unlist(id){
	swal({
		title: "",
		text: "Please tell us why.",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		confirmButtonText: 'Remove Item',
		// inputPlaceholder: "Write something"
	  }, function (inputValue) {
		
		if(inputValue === false){
			
		} else {
			if (inputValue === "") {
				swal.showInputError("You need to write something!");
				return false;
			  } else {
				  swal({ html: true, title: "", 
				  text: 'Sending...', 
					allowOutsideClick: true, showConfirmButton: false});
					// console.log('Unlisted');
				  var settings = {
				  	"async": true,
				  	"crossDomain": true,
				  	"url": "https://fixchap.com/dev/marketplace/etc/api/item/unlist",
				  	"method": "POST",
				  	"headers": {
				  	  "Content-Type": "application/json"
				  	},
				  	"processData": false,
				  	"data": "{\"message\": \""+btoa(inputValue)+"\",\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+id+"\"}"
				    };
				    $.ajax(settings).done(function (response) {
				  	swal.close();
	  
				  	$('#the_item_listed_id_col'+id).remove();
				  	$('.bc-btn').hide();

					item_storage_loading('sold'); 
					sales_live();
				  	// browse();
	  
	  
	  
				  	return false;
				    }).fail(function() {
				  	swal.close();
				  	return false;
				  });		
			  }			
		}
	  });
}

function rate(id){
	text = '<h3 style="text-align: center; font-size: 20px; color: #13A89F;">Rate Service </h3>'+
		'<p style="text-align: center; font-size: 16px; line-height: 20px; color: #4f6b83;">How was your buying experience?</p>'+
    
      		'<div style="margin-top: 20px;"><center>'+
      			'<div style="margin-top: -5px; font-size: 12px; margin-bottom: 5px;" id="rate-translate">&nbsp;</div>'+
				'<div class="rate" style="color: #00a89f; font-size: 35px; line-height: 1; text-align: center; with: 100%;"></div>'+
      			
      		'</center></div>'+
      		'<div class="pre-rating-btn" style="height: 140px;"></div>'+
      		'<div id="rating-btn" style="display: none;">'+
      			'<textarea id="customer_comments" class="textarea" style="width: 100%;" rows="3" placeholder="Describe your experience (optional)"></textarea>'+
				'<div>'+
	      			'<center><div onclick="submit_rating('+id+')" style="background-color: #13A89F; max-width: 90px; color: white; margin-top: 20px; padding: 10px; border-radius: 3px;">Submit</div></center>'+
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

function submit_rating(id){
	swal.close();
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://fixchap.com/dev/marketplace/etc/api/item/rate",
		"method": "POST",
		"headers": {
		  "Content-Type": "application/json"
		},
		"processData": false,
		"data": "{\"item_id\": \""+id+"\",\"stars\": \""+localStorage.ratingReport+"\",\"comment\": \""+btoa($("#customer_comments").val())+"\",\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\"}"
	  };
	  $.ajax(settings).done(function (response) {
		console.log(response);
		var data = JSON.parse(response);
		if(data.success){ 
			// swal.close();
			open_post(id,'','','','','','','','','','','','','','','','','','','','',true);
		} else {
			swal.close();
		}
	  });
}

function cancel_booking(id){
	
	swal({
        title: "",
        html: true,
        showCancelButton: true,
        text: "Are you sure you want to cancel this booking?",
        icon: "warning",
        buttons: true,
        confirmButtonText: 'Yes',
		cancelButtonText: 'No',
        dangerMode: true,
        },  function (isConfirm) {
        if (isConfirm) {
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://fixchap.com/dev/marketplace/etc/api/item/cancel_booking",
				"method": "POST",
				"headers": {
				  "Content-Type": "application/json"
				},
				"processData": false,
				"data": "{\"item_id\": \""+id+"\",\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\"}"
			  };
			  $.ajax(settings).done(function (response) {
				console.log(response);
				var data = JSON.parse(response);
				if(data.success){ 
					swal.close();
					// open_post(id,'','','','','','','','','','','','','','','','','','','','',true);
					browse();
				} else {
					swal.close();
				}
			});	         
        }
      });
}


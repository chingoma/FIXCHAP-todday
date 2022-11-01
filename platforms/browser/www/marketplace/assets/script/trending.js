
function trending(refresh=true){


    // $('.content').css('padding','0px 10px 130px 10px');
   
    search_sync_play = 0;
    
   
    item_id_browse_arrays = [];
    
    $(window).scrollTop(0);

    back = current_nav;
  
    current_nav = 'trending';

    
  

  
    $('.add-item').fadeIn();
  
    $('.hh_home_pg, .header2, .book-item, .search-div, .hh_purchases_pg, #page-content2, .content').hide();
    $('#page-content-browse-search, .header').show();
  
    
    $('.content').css('padding','50px 10px 130px 10px');
    $('.page-title').html('Trending');
    
    $('.f-icon,#main-menu-sales,#main-menu-browse').removeClass('f-icon-active');
    $('#main-menu-browse').addClass('f-icon-active');
  
    // $('#page-content').html('<center><div style="margin-top: 30vh;"><div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div></div><br>Loading..</center>');
  
  

    if(refresh==true){
      $('#list_panel_search_loader').show();
      $("#list_panel_search").html('');
      $("#list_panel_search").show();
      search_setInterval = setInterval(function() {
        
      
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_items",
                "method": "POST",
                "headers": {
                "Content-Type": "application/json"
                },
                "processData": false,
                "data": "{\"exclude_items_array\":"+JSON.stringify(item_id_browse_arrays)+",\"user_id\": \""+localStorage.user_id+"\",\"page\": \"trending\",\"sort\": \"Trending\"}"
            };
            $.ajax(settings).done(function (response) {
                
                var data = JSON.parse(response);
                if(data.success){ 
                if(data.items.length > 0){
                    $("#list_panel_search_loader").hide();
                    
                    
                    for(var i in data.items){
                      
                        if(!item_id_browse_arrays.includes(data.items[i].item_id)){
                            item_id_browse_arrays.push(data.items[i].item_id);
                            var pricing = 'TZS '+number_format(data.items[i].item_desc_selling_price);
                            var price_class = 'post-price';
                
                            var like_status = '';

                            if(localStorage.session == null){

                            } else {
                                if(data.items[i].like_status > 0){
                                    like_status = '<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+data.items[i].item_id+')"></i>';
                                    } else {
                                    like_status = '<i class="far fa-heart" onclick="like_item('+data.items[i].item_id+')"></i>';
                                    } 
                            }
 
                        
                            $(".item-loader").remove();
                            
                            $("#list_panel_search").append(
                            '<div class="col-6 col-md-3 cat-icon-col">'+
                                '<div class="sell-post" onclick="open_post('+data.items[i].item_id+',\''+data.items[i].item_desc_title+'\',\''+data.items[i].item_desc_details+'\',\''+pricing+'\',\''+data.items[i].file_content+'\',\''+data.items[i].total_images+'\',\''+data.items[i].like_status+'\',\''+data.items[i].total_likes+'\',\''+data.items[i].selflike+'\','+data.items[i].like_and_comment+','+data.items[i].book_count+','+data.items[i].book_count_number+',\''+data.items[i].category+'\',\''+data.items[i].total_views+'\',\''+data.items[i].posted_on+'\','+data.items[i].book_btn+',\''+data.items[i].item_status_title+'\',\''+data.items[i].unpublish_message+'\',\''+data.items[i].item_desc_purpose+'\',\''+data.items[i].item_condition_title+'\','+data.items[i].admin_comments+')">'+
                                    '<img id="item_img_'+data.items[i].item_id+'" style="object-fit: cover;" src="data:image/png;base64,'+data.items[i].file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'">'+
                                    '<span class="'+price_class+'  item_p'+data.items[i].item_id+'">'+pricing+'</span>'+
                                '</div>'+
                                '<div class="post-title"><table><tr><td  class="pt-t">'+data.items[i].item_desc_title+'</td><td class="pt-l like-icon_'+data.items[i].item_id+'">'+like_status+'</td></tr></table></div>'+
                            '</div>'
                            );  
                            
                            $("#list_panel_search").append(
                                '<div class="col-6 col-md-3 cat-icon-col item-loader">'+
                                    '<div style="margin-top: 40%; margin-right: 8%;">'+
                                        // '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'+
                                        '<div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div>'+
                                    '</div>'+
                                '</div>'
                            );
                        }
                    }
                } else {
                    sales_sync_play = 0;
                    $(".item-loader").remove();
                    clearInterval(search_setInterval);
                    if(item_id_browse_arrays.length == 0){
                        $("#list_panel_search_loader").hide();
                        $("#list_panel_search").html('<div class="col-12" style="margin-top: 90px;"><h3>No item found!</h3>Do you want so sell an item? <span style="color: #13A79E;" onclick="add_post_master()">Click here</span>!</div>');
                    }
                }
                }
            }).fail(function() {
                
            });   
      
      }, 2000); 
    }

  
  }
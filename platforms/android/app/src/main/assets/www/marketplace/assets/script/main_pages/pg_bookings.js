
function purchases(refresh=true){
    // $('.content').css('padding','0px 10px 130px 10px');
   
    search_sync_play = 0;
    
   
    item_id_browse_arrays = [];
    
    $(window).scrollTop(0);
  
    current_nav = 'purchases';

    back = 'category';
  

  
    $('.add-item').fadeIn();
  
 

    $('.hh_home_pg, .book-item, .hh_sales_pg, .search-div, #page-content2, #page-content-browse, .content,#status_layer').hide();
    $('.sales_pg, .hh_purchases_pg, .header2, .header, #page-content-browse-search').show();
  
    $('.header2').css('height','50px');
    $('.content').css('padding','100px 10px 130px 10px');
  
    
    $('.page-title').html('Purchases');
    
    $('.f-icon,#main-menu-sales,#main-menu-browse').removeClass('f-icon-active');
    $('#main-menu-purchases').addClass('f-icon-active');

    $('.sub-menu').removeClass('sub-menu-active');
    $('#go_to_purchases-booking').addClass('sub-menu-active');
  
    // $('#page-content').html('<center><div style="margin-top: 30vh;"><div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div></div><br>Loading..</center>');
  
    if(refresh){
        item_storage_loading('booking');      
    } 

    item_storage('booking',true);

    if(just_added == 1){
        sleep(2000).then(() => {
            purchases();
        });
        just_added = 0;
    }

  }
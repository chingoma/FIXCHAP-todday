

function sales_live(refresh=true){

    
    sold_sync_play = 0;
    search_sync_play = 0;
    
    if(refresh == false){
      sales_sync_play = 0;
    } else {
      sales_sync_play = 1;
    }
    item_id_browse_arrays = [];
  
  
    $(window).scrollTop(0);
  
    current_nav = 'sales_live';
    back = 'category';
  
    $('.page-title').html('');
  
    $('.add-item').fadeIn();
  
    $('.hh_home_pg, .book-item, .hh_purchases_pg, .search-div, #page-content2, #page-content-browse, .content, .add-item-min,#status_layer').hide();
    $('.sales_pg, .hh_sales_pg, .header2, .header, #page-content-browse-search').show();
  
    $('.header2').css('height','50px');
    $('.content').css('padding','100px 10px 130px 10px');
    $('.page-title').html('Sales');
  
    
    $('.f-icon, #main-menu-likes').removeClass('f-icon-active');
    $('#main-menu-sales').addClass('f-icon-active');
    $('.sub-menu').removeClass('sub-menu-active');
    $('#go_to_sales_live').addClass('sub-menu-active');
  
    if(refresh==true){
        item_storage_loading('sales');        
    } 

    item_storage('sales',true);

    if(just_added == 1){
      sleep(2000).then(() => {
        sales_live();
      });
      just_added = 0;
    }


  }
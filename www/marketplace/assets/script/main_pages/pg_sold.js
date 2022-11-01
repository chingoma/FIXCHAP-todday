var sales_sync_play = 1;
var item_id_sales_arrays = [];

function sales_sold(refresh=true){
  sold_sync_play = 1;
  search_sync_play = 0;
  sales_sync_play = 0;
  item_id_browse_arrays = [];

  $(window).scrollTop(0);

  current_nav = 'sales_sold';
  back = 'category';

  $('.page-title').html('Sales');

  $('.page-title').html('');

  $('.add-item').fadeIn();

  $('.hh_home_pg, .book-item, hh_purchases_pg, .search-div, #page-content2, #page-content-browse, .content,#status_layer').hide();
  $('.sales_pg, .hh_sales_pg, .header2, .header, #page-content-browse-search').show();

  $('.header2').css('height','50px');
  $('.content').css('padding','100px 10px 130px 10px');

  
  $('.f-icon, #main-menu-likes').removeClass('f-icon-active');
  $('#main-menu-sales').addClass('f-icon-active');
  $('.sub-menu').removeClass('sub-menu-active');
  $('#go_to_sales_sold').addClass('sub-menu-active');

    if(refresh){
        item_storage_loading('sold');      
    } 

    item_storage('sold',true);

}
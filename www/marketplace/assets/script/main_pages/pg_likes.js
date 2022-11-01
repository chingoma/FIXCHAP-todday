
function likes(refresh=true){

    search_sync_play = 0;
    item_id_browse_arrays = [];
    
    $(window).scrollTop(0);
    current_nav = 'likes';

    back = 'category';
  
    $('.add-item').fadeIn();
    $('.hh_home_pg, .header2, .book-item, .search-div, #page-content2, .content,#status_layer').hide();
    $('#page-content-browse-search, .header').show();
  
    
    $('.content').css('padding','50px 10px 130px 10px');
    $('.page-title').html('Likes');
    
    $('.f-icon,#main-menu-sales,#main-menu-browse').removeClass('f-icon-active');
    $('#main-menu-likes').addClass('f-icon-active');
  


    if(refresh==true){
        item_storage_loading('likes');
    }

    item_storage('likes',true);
  
}
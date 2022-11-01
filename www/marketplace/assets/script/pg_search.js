var back_to_search = '';
function pg_search(){
    $(".content, .header2, .header, #clear_search").hide();
    $(".header_search_text, #page-content-browse-search").show();
  
    document.getElementById("search_text_input").focus();
    $('#search_text_input').val('');
  
    $('.content').css('padding','60px 10px 130px 10px');
    back = current_nav;
    current_nav = 'search';
    search_items('');

}

function clear_search(){
    back_to_search = '';
    $("#clear_search").hide();
    $('#search_text_input').val('');
    $("#clear_search, #page-content-browse-search").hide();
    $("#page-content-browse").show();
}

$('#search_text_input').keyup(function() {
    var search_word = $('#search_text_input').val().trim();
    back_to_search = search_word;
    search_items(search_word);
    
    if(search_word.length > 0){
        $("#clear_search").show();
    } else {
        $("#clear_search, #page-content-browse-search").hide();
        $("#page-content-browse").show();
    }
});

$('#search_form').submit(function(e){
    e.preventDefault();
    var search_word = $('#search_text_input').val().trim();
    search_items(search_word);
});

var search_sync_play = 1;
var srch_founds = 0;

var item_id_browse_arrays = [];

function search_items(keyword,category="",subcategory="",sort="",refresh=true,filter=false,min="0",max="800,000,000"){
    
    if(keyword == '' && filter==false){
        $("#list_panel_search").html(''); 
        $("#list_panel_search_loader").hide();
    } else {
        search_sync_play = 1;
        srch_founds = 0;

        clearTimeout(search_setInterval);
        var b_keyword = btoa(keyword);
      
        back = current_nav;
        current_nav = 'search';
       
    
    
    
        if(refresh){
    
            $("#list_panel_search_loader").show();
            $('#list_panel_search').html('');
            $(".content").hide();
            $("#page-content-browse-search").show();
        
    
            item_id_browse_arrays = [];
    
            search_setInterval = setInterval(function() {
                if(search_sync_play == 1){
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_items",
                        "method": "POST",
                        "headers": {
                        "Content-Type": "application/json"
                        },
                        "processData": false,
                        "data": "{\"exclude_items_array\":"+JSON.stringify(item_id_browse_arrays)+",\"user_id\": \""+localStorage.user_id+"\",\"page\": \"browse\",\"keyword\": \""+b_keyword+"\",\"category_id\": \""+category+"\",\"subcategory\": \""+subcategory+"\",\"min\": \""+min+"\",\"max\": \""+max+"\",\"sort\": \""+sort+"\"}"
                    };
                    $.ajax(settings).done(function (response) {
                        
                        var data = JSON.parse(response);
                        if(data.success){ 
                        if(data.items.length > 0){
                            $("#list_panel_search_loader").hide();
                            
                            srch_founds++;
                            for(var i in data.items){
                                if(!item_id_browse_arrays.includes(data.items[i].item_id)){
                                    item_id_browse_arrays.push(data.items[i].item_id);
                                    var pricing = 'TZS '+number_format(data.items[i].item_desc_selling_price);
                                    var price_class = 'post-price';
                        
                                    var like_status = '';
                                    if(data.items[i].like_status > 0){
                                    like_status = '<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+data.items[i].item_id+')"></i>';
                                    } else {
                                    like_status = '<i class="far fa-heart" onclick="like_item('+data.items[i].item_id+')"></i>';
                                    }  
                                    
                                    $("#list_panel_search").append(
                                    '<div class="col-6 col-md-3 cat-icon-col">'+
                                        '<div class="sell-post" onclick="open_post('+data.items[i].item_id+',\''+data.items[i].item_desc_title+'\',\''+data.items[i].item_desc_details+'\',\''+pricing+'\',\''+data.items[i].file_content+'\',\''+data.items[i].total_images+'\',\''+data.items[i].like_status+'\',\''+data.items[i].total_likes+'\',\''+data.items[i].selflike+'\','+data.items[i].like_and_comment+','+data.items[i].book_count+','+data.items[i].book_count_number+',\''+data.items[i].category+'\',\''+data.items[i].total_views+'\',\''+data.items[i].posted_on+'\','+data.items[i].book_btn+',\''+data.items[i].item_status_title+'\',\''+data.items[i].unpublish_message+'\',\''+data.items[i].item_desc_purpose+'\',\''+data.items[i].item_condition_title+'\','+data.items[i].admin_comments+')">'+
                                            '<img id="item_img_'+data.items[i].item_id+'" style="object-fit: cover;" src="data:image/png;base64,'+data.items[i].file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'">'+
                                            '<span class="'+price_class+'  item_p'+data.items[i].item_id+'">'+pricing+'</span>'+
                                        '</div>'+
                                        '<div class="post-title"><table><tr><td  class="pt-t">'+data.items[i].item_desc_title+'</td><td class="pt-l like-icon_'+data.items[i].item_id+'">'+like_status+'</td></tr></table></div>'+
                                    '</div>'
                                    );  
                                    
                                     
                                }
                            }
                        } else {
                            search_sync_play = 0;
                            $("#list_panel_search_loader").hide();
                            if(srch_founds == 0){
                                $("#list_panel_search").append(
                                    '<div class="col-12 no_item_found" style="margin-top: 90px;"><h3>No item found!</h3>Do you want so sell an item? <span style="color: #13A79E;" onclick="add_post_master()">Click here</span>!</div>'         
                                    ); 
                            }
                           
    
                        }
                        }
                    }).fail(function() {
                        
                    });   
                }
            }, 2000);
        } else {
            $(".content").hide();
            $("#page-content-browse-search").show();
        }        
    }

}
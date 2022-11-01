
// localStorage.storageLikes = JSON.stringify([]); 
// localStorage.storagePosted = JSON.stringify([]);
// localStorage.storageSold = JSON.stringify([]);
// localStorage.storageOnprogress = JSON.stringify([]);
// localStorage.storageCompleted = JSON.stringify([]);
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


$sync_url = "https://fixchap.com/dev/marketplace/etc/api/app_sync_items";
var arr = [];

function item_storage(page, refresh=false){
   
    var settings = { "async": true, "crossDomain": true, "url": $sync_url, "method": "POST", "headers": {"Content-Type": "application/json" },"processData": false,
    "data": "{\"exclude_items_array\":"+JSON.stringify(arr)+",\"user_id\": \""+localStorage.user_id+"\",\"page\": \""+page+"\",\"limit\": \"6\"}"};
    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response); 
        if(data.success){
            if(page == 'likes') {
                localStorage.storageLikes = JSON.stringify(data.items.reverse()); 
            } else if (page == 'sales'){
                localStorage.storagePosted = JSON.stringify(data.items);
            } else if (page == 'sold') {
                localStorage.storageSold = JSON.stringify(data.items);
            } else if (page == 'booking') {
                localStorage.storageOnprogress = JSON.stringify(data.items);
            } else if (page == 'purchases') {
                localStorage.storageCompleted = JSON.stringify(data.items);
            }
            
            if(refresh == true){
                if(page == 'likes' && current_nav == 'likes'){
                    item_storage_loading(page)
                }
            }
        }
    });
}

function item_storage_loading(page){
    $('#list_panel_search_loader').show();
    $("#list_panel_search").html('');
    $("#list_panel_search").show();
    $("#list_panel_search_loader").hide();

    var data = [];

    if(page == 'likes') {
        data = JSON.parse(localStorage.storageLikes); 
    } else if (page == 'sales'){
        data = JSON.parse(localStorage.storagePosted);
    } else if (page == 'sold') {
        data = JSON.parse(localStorage.storageSold);
    } else if (page == 'booking') {
        data = JSON.parse(localStorage.storageOnprogress);
    } else if (page == 'purchases') {
        data = JSON.parse(localStorage.storageCompleted);
    }

    for(var i in data){
        item_id_browse_arrays.push(data[i].item_id);
        var pricing = 'TZS '+number_format(data[i].item_desc_selling_price);
        var price_class = 'post-price';

        var like_status = '';
        if(data[i].item_status_title != 'SOLD' && data[i].item_status_title != 'UNLISTED'){
            if(localStorage.session == null){

            } else {
                if(data[i].like_status > 0){
                    like_status = '<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+data[i].item_id+')"></i>';
                    } else {
                    like_status = '<i class="far fa-heart" onclick="like_item('+data[i].item_id+')"></i>';
                    } 
            }

        }


        if(page == 'sales'){
            if(data[i].item_status_title == 'LIVE' && data[i].bookings > 0 && data[i].item_desc_stage_location == 'SELLER'){
                price_class = 'post-price2';
                pricing += '<br>Waiting for you<br>to bring item in-store.';
            } else if(data[i].item_status_title == 'LIVE' && data[i].bookings > 0 && data[i].item_desc_stage_location == 'STORE'){
                price_class = 'post-price2';
                pricing += '<br>Waiting for customer<br>to approve.';
            } else {
                price_class = 'post-price2';
                pricing += '<br>'+data[i].item_status_title.replace(/_/g, " ");
            }
        } else if(page == 'sold' || page == 'browse'){
            price_class = 'post-price2';
            pricing += '<br>'+data[i].item_status_title.replace(/_/g, " ");
        } else if (page == 'booking'){
            if(data[i].item_desc_stage_location == 'SELLER'){
                price_class = 'post-price2';
                pricing += '<br>Waiting for item<br>to arrive in-store.';
            } else {
                price_class = 'post-price2';
                pricing += '<br>Waiting for you to verify<br>the item at FixChap store.';
            }
        }

    
        $(".item-loader").remove();
        

        $("#list_panel_search").append(
        '<div class="col-6 col-md-3 cat-icon-col">'+
            '<div class="sell-post" onclick="open_post('+data[i].item_id+',\''+data[i].item_desc_title+'\',\''+data[i].item_desc_details+'\',\''+pricing+'\',\''+data[i].file_content+'\',\''+data[i].total_images+'\',\''+data[i].like_status+'\',\''+data[i].total_likes+'\',\''+data[i].selflike+'\','+data[i].like_and_comment+','+data[i].book_count+','+data[i].book_count_number+',\''+data[i].category+'\',\''+data[i].total_views+'\',\''+data[i].posted_on+'\','+data[i].book_btn+',\''+data[i].item_status_title+'\',\''+data[i].unpublish_message+'\',\''+data[i].item_desc_purpose+'\',\''+data[i].item_condition_title+'\',\'\')">'+
                '<img id="item_img_'+data[i].item_id+'" style="object-fit: cover;" src="data:image/png;base64,'+data[i].file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'">'+
                '<span class="'+price_class+'  item_p'+data[i].item_id+'">'+pricing+'</span>'+
            '</div>'+
            '<div class="post-title"><table><tr><td  class="pt-t">'+data[i].item_desc_title+'</td><td class="pt-l like-icon_'+data[i].item_id+'">'+like_status+'</td></tr></table></div>'+
        '</div>'
        );  
    }

    if(data.length == 0){
        $("#list_panel_search_loader").hide();
        $("#list_panel_search").html('<div class="col-12" style="margin-top: 90px;"><h3>No item found!</h3>Do you want so sell an item? <span style="color: #13A79E;" onclick="add_post_master()">Click here</span>!</div>');            
    }
}

item_storage('likes');
item_storage('sales');
item_storage('sold');
item_storage('booking');
item_storage('purchases');




function like_update_add(item_id, flag){
    var like_update_array = JSON.parse(localStorage.likeUpdate); 
    var lu_found = 0;
    var lu_index = 0;
    for(var i in like_update_array){
        if(like_update_array[i].item_id == item_id && like_update_array[i].status == 'pending'){
            like_update_array[i].flag = flag;
            lu_found = 1;
        }
        lu_index++;
    }
    if(lu_found == 0){
        like_update_array.push({"item_id":item_id,"flag":flag,"status":"pending"});
    }
    localStorage.likeUpdate = JSON.stringify(like_update_array);
}

function like_update_remove(item_id, flag){
    var like_update_array = JSON.parse(localStorage.likeUpdate); 

    var string = JSON.stringify(like_update_array);

    string = string.replace('{"item_id":'+item_id+',"flag":"'+flag+'","status":"pending"},', "");
    string = string.replace('{"item_id":'+item_id+',"flag":"'+flag+'","status":"pending"}', "");
    
    localStorage.likeUpdate = string;
}


function like_update_sync(){
    var like_sync_array = JSON.parse(localStorage.likeUpdate);
    if(like_sync_array.length > 0){
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/like",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+like_sync_array[0].item_id+"\",\"flag\": \""+like_sync_array[0].flag+"\"}"
        };
        $.ajax(settings).done(function (response) {
            like_update_remove(like_sync_array[0].item_id, like_sync_array[0].flag);
            item_storage('likes');
        });
    }
}

setInterval(function() {
    like_update_sync();
}, 20*1000); 

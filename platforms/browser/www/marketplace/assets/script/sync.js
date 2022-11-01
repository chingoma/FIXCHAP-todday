var first_update_time = '2020-12-12 12:00:00';
var update_first_update_time = 1;
localStorage.bonus_amount = 0;

function sync(){
    if(localStorage.offlinecontent){
      cat_synced = 2;
      localStorage.offline = 0;
      $("#list_panel").html(localStorage.offlinecontent);
      $("#list_panel").show();
    }

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/app_sync",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"device_id\": \""+localStorage.device_id+"\"}"
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if(data.success){ 
          localStorage.offline = 0;
          var stringdata = JSON.stringify(data).replace("'", "`");
         
          if(stringdata != localStorage.marketplacedata){
            localStorage.marketplacedata = stringdata;
            
            
            // update();
            //  for(var i in data.sales){
            //     if(data.sales[i].status == 'PENDING' || data.sales[i].status == 'UNPUBLISHED'){
            //       $(".item_p"+data.sales[i].item_id).html(data.sales[i].status);
            //       $(".item_p"+data.sales[i].item_id).removeClass('post-price');
            //       $(".item_p"+data.sales[i].item_id).addClass('post-price-pending');
            //     } else {
            //       $(".item_p"+data.sales[i].item_id).html('TZS '+number_format(data.sales[i].item_desc_selling_price));
            //       $(".item_p"+data.sales[i].item_id).removeClass('post-price-pending');
            //       $(".item_p"+data.sales[i].item_id).addClass('post-price');
            //     }              
                
            //  }
          }
          cat_synced = 1;
        } else {
          localStorage.offline++;
        }
      }).fail(function() {
          localStorage.offline++;
      });  
  
}


sync(); 
     
setInterval(function(){
   sync();
}, 300000);


var db_datetime = 1613044443;
var sync_item_interval = '';
var sync_item_interval_play = 1;
var ready_to_refresh = 0;

$("#list_panel").html('');

// alert(localStorage.user_id);


function sync_items(load="append"){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_items",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": "{\"exclude_items_array\":"+JSON.stringify(item_id_arrays)+",\"user_id\": \""+localStorage.user_id+"\",\"page\": \"browse\"}"
  };
  $.ajax(settings).done(function (response) {
    var data = JSON.parse(response);
    if(data.success){ 
      if(data.items.length > 0){
        for(var i in data.items){
          if(update_first_update_time == 1){
            first_update_time = data.items[i].loaded_at;
            update_first_update_time = 0;
          }

          if(!item_id_arrays.includes(data.items[i].item_id)){
            item_id_arrays.push(data.items[i].item_id);
            var pricing = 'TZS '+number_format(data.items[i].item_desc_selling_price);
            var price_class = 'post-price';

            var like_status = '';
            if(data.items[i].item_status_title != 'SOLD' && data.items[i].item_status_title != 'UNLISTED'){
              if(localStorage.session == null){

              } else {
                if(data.items[i].like_status > 0){
                  like_status = '<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+data.items[i].item_id+')"></i>';
                } else {
                  like_status = '<i class="far fa-heart" onclick="like_item('+data.items[i].item_id+')"></i>';
                }  
              }
              

            }

            $(".item-loader-master").remove();

            

            if(load == "append"){
              if(data.items[i].item_status_title == 'SOLD'){
                price_class = 'post-price2';
                pricing += '<br>SOLD';
              }


              $("#list_panel").append(
                '<div class="col-6 col-md-3 cat-icon-col  cat-all category-'+data.items[i].dcat_id+' sub-category-'+data.items[i].dsubcat_id+'" id="the_item_listed_id_col'+data.items[i].item_id+'" data-updated_at="'+data.items[i].updated_at+'">'+
                  '<div class="sell-post" id="the_item_listed_id_'+data.items[i].item_id+'" onclick="open_post('+data.items[i].item_id+',\''+data.items[i].item_desc_title+'\',\''+data.items[i].item_desc_details+'\',\''+pricing+'\',\''+data.items[i].file_content+'\',\''+data.items[i].total_images+'\',\''+data.items[i].like_status+'\',\''+data.items[i].total_likes+'\',\''+data.items[i].selflike+'\','+data.items[i].like_and_comment+','+data.items[i].book_count+','+data.items[i].book_count_number+',\''+data.items[i].category+'\',\''+data.items[i].total_views+'\',\''+data.items[i].posted_on+'\','+data.items[i].book_btn+',\''+data.items[i].item_status_title+'\',\''+data.items[i].unpublish_message+'\',\''+data.items[i].item_desc_purpose+'\',\''+data.items[i].item_condition_title+'\','+data.items[i].admin_comments+')">'+
                      '<img id="item_img_'+data.items[i].item_id+'" style="object-fit: cover;" src="data:image/png;base64,'+data.items[i].file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'">'+
                      '<span class="'+price_class+'  item_p'+data.items[i].item_id+'">'+pricing+'</span>'+
                  '</div>'+
                  '<div class="post-title"><table><tr><td  class="pt-t">'+data.items[i].item_desc_title+'</td><td class="pt-l like-icon_'+data.items[i].item_id+'">'+like_status+'</td></tr></table></div>'+
                '</div>'
              ); 
              
              $("#list_panel").append(
                '<div class="col-6 col-md-3 cat-icon-col item-loader-master">'+
                    '<div style="margin-top: 40%; margin-right: 8%;">'+
                        // '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'+
                        '<div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div>'+
                    '</div>'+
                '</div>'
              );
            } else {

            // if(data.items[i].item_status_title == 'SOLD'){
            //   price_class = 'post-price2';
            //   pricing += '<br>'+data.items[i].item_status_title.replace(/_/g, " ");
            // }


              $("#list_panel").prepend(
                '<div class="col-6 col-md-3 cat-icon-col">'+
                  '<div class="sell-post" id="the_item_listed_id_'+data.items[i].item_id+'" onclick="open_post('+data.items[i].item_id+',\''+data.items[i].item_desc_title+'\',\''+data.items[i].item_desc_details+'\',\''+pricing+'\',\''+data.items[i].file_content+'\',\''+data.items[i].total_images+'\',\''+data.items[i].like_status+'\',\''+data.items[i].total_likes+'\',\''+data.items[i].selflike+'\','+data.items[i].like_and_comment+','+data.items[i].book_count+','+data.items[i].book_count_number+',\''+data.items[i].category+'\',\''+data.items[i].total_views+'\',\''+data.items[i].posted_on+'\','+data.items[i].book_btn+',\''+data.items[i].item_status_title+'\',\''+data.items[i].unpublish_message+'\',\''+data.items[i].item_desc_purpose+'\',\''+data.items[i].item_condition_title+'\','+data.items[i].admin_comments+')">'+
                      '<img id="item_img_'+data.items[i].item_id+'" style="object-fit: cover;" src="data:image/png;base64,'+data.items[i].file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'">'+
                      '<span class="'+price_class+'  item_p'+data.items[i].item_id+'">'+pricing+'</span>'+
                  '</div>'+
                  '<div class="post-title"><table><tr><td  class="pt-t">'+data.items[i].item_desc_title+'</td><td class="pt-l like-icon_'+data.items[i].item_id+'">'+like_status+'</td></tr></table></div>'+
                '</div>'
              );               
            }
            

            
  
          }
        }
      } else {
        $(".item-loader-master").remove();
        sync_item_interval_play = 0;
        ready_to_refresh = 1;
        if(item_id_arrays.length == 0){
          $("#list_panel").html('<div class="col-12" style="margin-top: 90px;"><h3>No item found!</h3>Do you want so sell an item? <span style="color: #13A79E;" onclick="add_post_master()">Click here</span>!</div>');
        }
        clearInterval(browse_setInterval);
      }

      localStorage.offlinecontent = $("#list_panel").html();
    }
  }).fail(function() {
      
  });  


  

}

sync_items();
browse_setInterval = setInterval(function(){
  if(sync_item_interval_play == 1){
    sync_items();
  }
}, 2000);


function items_refresh(){

}

function refresh_main_items(){
  if(ready_to_refresh == 1){
    $("#list_panel").prepend(
      '<div class="col-12 col-md-3 cat-icon-col item-loader-master refresher_loader">'+
      '<div style="margin-top: 0%; margin-bottom: 3%; margin-right: 4%;">'+
          // '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'+
          '<div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div>'+
      '</div>'+
      '</div>'
    ); 
    sync_items();

  }
}

function check_updates(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_check_updates",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": "{\"user_id\": \""+localStorage.user_id+"\",\"last_update\": \""+first_update_time+"\"}"
  };
  $.ajax(settings).done(function (response) {
    var data = JSON.parse(response);
    if(data.success){ 
     
      $("#promocode_value").html(data.promocode+' &nbsp;&nbsp;<i style="z-index: 99999;" onclick="cordova.plugins.clipboard.copy(\''+data.promocode+'\')" class="fas fa-copy"></i>');
      $("#promocode_balance").html(number_format(data.promobalance));
      localStorage.bonus_amount = data.promobalance;
      
      for(var i in data.updates){
         update_post_data(data.updates[i].item_id, data.updates[i].updated_at);
      }
    }
  });
}


setInterval(function(){
  check_updates();
}, 10000);

function update_post_data(id, updated_at){

  var local_updated_at = new Date($("#the_item_listed_id_col"+id).data('updated_at'));
  var cloud_updated_at = new Date(updated_at);

  if(cloud_updated_at > local_updated_at){
    var the_ex_array = [];

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fixchap.com/dev/marketplace/etc/api/app_sync_items",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "processData": false,
      "data": "{\"exclude_items_array\":"+JSON.stringify(the_ex_array)+",\"user_id\": \""+localStorage.user_id+"\",\"page\": \"browse\",\"item_id\": \""+id+"\"}"
    };
    $.ajax(settings).done(function (response) {
      var data = JSON.parse(response);
      if(data.success){ 
          for(var i in data.items){
            if(data.items[i].item_status_title != 'LIVE'){
              $("#the_item_listed_id_col"+data.items[i].item_id).remove();
            } else {
              var pricing = 'TZS '+number_format(data.items[i].item_desc_selling_price);
              var price_class = 'post-price';
  
              var like_status = '';

              if(data.items[i].item_status_title != 'SOLD' && data.items[i].item_status_title != 'UNLISTED'){

                if(data.items[i].like_status > 0){
                  like_status = '<i class="fas fa-heart" style="color: #13A79E;" onclick="like_item('+data.items[i].item_id+')"></i>';
                } else {
                  like_status = '<i class="far fa-heart" onclick="like_item('+data.items[i].item_id+')"></i>';
                }  

              }


              if($("#the_item_listed_id_col"+data.items[i].item_id).length == 0){
                $("#list_panel").append('<div class="col-6 col-md-3 cat-icon-col  cat-all category-'+data.items[i].dcat_id+' sub-category-'+data.items[i].dsubcat_id+'" id="the_item_listed_id_col'+data.items[i].item_id+'" data-updated_at="'+data.items[i].updated_at+'">'+'</div>');
              }
             
              $("#the_item_listed_id_col"+data.items[i].item_id).removeClass();
              $("#the_item_listed_id_col"+data.items[i].item_id).addClass('col-6');
              $("#the_item_listed_id_col"+data.items[i].item_id).addClass('col-md-3');
              $("#the_item_listed_id_col"+data.items[i].item_id).addClass('cat-icon-col');
              $("#the_item_listed_id_col"+data.items[i].item_id).addClass('cat-all');
              $("#the_item_listed_id_col"+data.items[i].item_id).addClass('category-'+data.items[i].dcat_id);
              $("#the_item_listed_id_col"+data.items[i].item_id).addClass('sub-category-'+data.items[i].dsubcat_id);
              
              var item_info = 
              '<div class="sell-post" id="the_item_listed_id_'+data.items[i].item_id+'" onclick="open_post('+data.items[i].item_id+',\''+data.items[i].item_desc_title+'\',\''+data.items[i].item_desc_details+'\',\''+pricing+'\',\''+data.items[i].file_content+'\',\''+data.items[i].total_images+'\',\''+data.items[i].like_status+'\',\''+data.items[i].total_likes+'\',\''+data.items[i].selflike+'\','+data.items[i].like_and_comment+','+data.items[i].book_count+','+data.items[i].book_count_number+',\''+data.items[i].category+'\',\''+data.items[i].total_views+'\',\''+data.items[i].posted_on+'\','+data.items[i].book_btn+',\''+data.items[i].item_status_title+'\',\''+data.items[i].unpublish_message+'\',\''+data.items[i].item_desc_purpose+'\',\''+data.items[i].item_condition_title+'\','+data.items[i].admin_comments+')">'+
                  '<img id="item_img_'+data.items[i].item_id+'" style="object-fit: cover;" src="data:image/png;base64,'+data.items[i].file_content+'" onerror="this.src=\'assets/images/cat_icon.png\'">'+
                  '<span class="'+price_class+'  item_p'+data.items[i].item_id+'">'+pricing+'</span>'+
              '</div>'+
              '<div class="post-title"><table><tr><td  class="pt-t">'+data.items[i].item_desc_title+'</td><td class="pt-l like-icon_'+data.items[i].item_id+'">'+like_status+'</td></tr></table></div>'
              ;
              $("#the_item_listed_id_col"+data.items[i].item_id).html(item_info);

              $("#the_item_listed_id_col"+data.items[i].item_id).data("updated_at", data.items[i].updated_at );

              
            }
     
          }
  
      }
    }).fail(function() {
        
    }); 
  }

}

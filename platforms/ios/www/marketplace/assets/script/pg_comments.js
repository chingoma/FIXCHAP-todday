var page_title_ac = '';
var my_post = 0;
function view_comments(id){



    // $('.content').css('padding','0px 10px 130px 10px');
    
  
    $(window).scrollTop(0);
  
    my_post = 1;

    back = 'view-'+id;
  
    $('.page-title').html('Comments');
  
    $('.add-item').fadeIn();
  
    $('.hh_home_pg, .header2, .book-item, .content, .search-div, #page-content2,  .add-item-icon, #unlist_edit').hide();
    $('#page-content-view-comment, .header, .comment-item').show();
  
    
    $('.content').css('padding','50px 10px 130px 10px');

    
    $('.f-icon').removeClass('f-icon-active');
    $('#main-menu-likes').addClass('f-icon-active');
  
    $('#page-content-view-comment').html('<center><div style="margin-top: 30vh;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></center>');
  
    var items = '';

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/comment/list",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"item_id\": \""+id+"\",\"user_id\": \""+localStorage.user_id+"\",\"device_id\": \""+localStorage.device_id+"\"}"
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if(data.success){ 
            for(var i in data.comments){
                items += ''+
                '<div class="col-12" style="text-align: left; padding-top: 10px; font-size: 12px; margin-bottom: 0px; padding-bottom: 0px;">'+
                    '<font style="font-weight: bold;">'+data.comments[i].name+'</font> '+data.comments[i].comment_content+'<br>'+
                    '<font style="color: #A7A7A7;">'+data.comments[i].created_at+'</font>'+
                    '<hr style="margin: 5px 0px;"/>'+
                '</div>'; 
            }
        }
        if(items == ''){
            items = '<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">No comment found</div>';
        } 
    
        $('#page-content-view-comment').html(''+
        '<div class="post">'+
            '<div class="row">'+
                items+
            '</div>'+
        '</div>');         
      }).fail(function(){
        if(items == ''){
            items = '<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">No comment found</div>';
        } 
        $('#page-content-view-comment').html(''+
        '<div class="post">'+
            
            '<div class="row">'+
                items+
            '</div>'+
        '</div>');           
      });


    
}



function view_admin_comments(id){



    // $('.content').css('padding','0px 10px 130px 10px');
    
  
    $(window).scrollTop(0);
  
    my_post = 1;

    back = 'view-'+id;
  
    $('.page-title').html('Admin Comments');
  
    $('.add-item').fadeIn();
  
    $('.hh_home_pg, .header2, .book-item, .content, .search-div, #page-content2,  .add-item-icon, #unlist_edit').hide();
    $('#page-content-view-comment, .header, .comment-item').show();
  
    
    $('.content').css('padding','50px 10px 130px 10px');

    
    $('.f-icon').removeClass('f-icon-active');
    $('#main-menu-likes').addClass('f-icon-active');
  
    $('#page-content-view-comment').html('<center><div style="margin-top: 30vh;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></center>');
  
    var items = '';

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/comment/list_admin",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"item_id\": \""+id+"\",\"user_id\": \""+localStorage.user_id+"\",\"device_id\": \""+localStorage.device_id+"\"}"
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if(data.success){ 
            for(var i in data.comments){
                var weight = fmark_read = '';
                if(data.comments[i].item_feedback_read_status == 'UNREAD'){
                    weight = 'font-weight: bold;';
                    fmark_read = '<div style="text-align: right; padding-top: 4px; margin-top:-20px;" onclick="mark_feedback_read('+data.comments[i].item_feedback_id+','+id+')"><span style="border: 1px solid #E7E7E7; font-weight: normal; padding: 3px 5px 3px 5px; border-radius: 3px;">Mark as Read</span></div>';
                }

                items += ''+
                '<div class="col-12" id="afd_'+id+'" style="text-align: left; '+weight+' padding-top: 10px; font-size: 12px; margin-bottom: 0px; padding-bottom: 0px;">'+
                    '<font style="font-weight: bold;"></font> '+data.comments[i].item_feedback_text+'<br>'+
                    '<font style="color: #A7A7A7;">'+data.comments[i].created_at+'</font>'+
                    fmark_read+
                    '<hr style="margin: 5px 0px;"/>'+
                '</div>'; 
            }
        }
        if(items == ''){
            items = '<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">No comment found</div>';
        } 
    
        $('#page-content-view-comment').html(''+
        '<div class="post">'+
            '<div class="row">'+
                items+
            '</div>'+
        '</div>');         
      }).fail(function(){
        if(items == ''){
            items = '<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">No comment found</div>';
        } 
        $('#page-content-view-comment').html(''+
        '<div class="post">'+
            
            '<div class="row">'+
                items+
            '</div>'+
        '</div>');           
      });


    
}

function mark_feedback_read(id,item_id){
    $('#afd_'+item_id).css('font-weight','normal');

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/comment/feedback_markread",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"id\": \""+id+"\"}"
    };
    $.ajax(settings).done(function (response) {
		var data = JSON.parse(response); 
        if(data.success){
            view_admin_comments(item_id)
		} else {
            view_admin_comments(item_id)
		}
    }).fail(function() {
        view_admin_comments(item_id)
	});	
}
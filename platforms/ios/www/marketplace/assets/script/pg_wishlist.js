var wishlist_count = 0;

function pg_wishlist(){
    back = 'browse';
    current_nav = 'wishlist';

    $('.content, .header2, .add-item-icon, .hh_purchases_pg, .wishlist-add-btn').hide();
    $('#page-wishlist').show();

    $('.content').css('padding','60px 10px 130px 10px');
    $('.f-icon').removeClass('f-icon-active');
    $('#main-menu-wishlist').addClass('f-icon-active');


    $('.page-title').html("My Wishlist");

    $("#wishlist-list").html('<div style="margin: 30vh 0px 40px 0px;" class="col-12"><div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div></div>');

    wishlist_count = 0;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/wishlist/sync",
        "method": "POST",
        "headers": {
        "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\"}"
    };
    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if(data.success){ 
           
            $("#wishlist-list").html('');
            $(".wishlist-add-btn").show();
            for(var i in data.wishlist){
                wishlist_count++;
                $("#wishlist-list").append(''+
                    '<div class="col-12 wishlist-box" id="wishlist_div_id'+data.wishlist[i].wishlist_id+'" onclick="remove_wishlist_dialog('+data.wishlist[i].wishlist_id+')">'+
                        '<table style="width: 100%">'+
                            '<tr>'+
                            '<td style="width: 3%; background-color: #13A79E;"></td>'+
                            '<td><div class="wishlist-txt-div"><span class="wishlist-txt">'+data.wishlist[i].details+'</span></div></td>'+
                            '</tr>'+
                        '</table>'+
                    '</div>'+               
                '');
            }

            if(wishlist_count ==  0){
                $("#wishlist-list").html('<div class="col-12" style="margin-top: 90px;"><h3>No wish found!</h3> Wishlist allows you to select the type of items you "wish" to buy; once they are posted we notify you right-away!')
            }
        }
    }).fail(function() {
       
    });  

}

var wishlist_var_category = 0;
var wishlist_var_subcategory = 0;
var wishlist_var_purpose = 'All';
var wishlist_var_subcategory = 0;
var wishlist_var_pricerange = 'All';
var wishlist_var_min_price = '0';
var wishlist_var_max_price = '100,000,000';

$("#title_wishlist_price_min, #title_wishlist_price_max").focusin(function() {
    $(this).val('');
  });

function pg_wishlist_add(){
    if(localStorage.session == null){
        localStorage.wishlisttarget = 1;
		window.location.href="../index.html?login=1";
	} else {
        wishlist_var_min_price = '0';
        wishlist_var_max_price = '100,000,000';
        wishlist_count++;
        wishlist_var_category = 0;
        wishlist_var_subcategory = 0;
        wishlist_var_purpose = 'All';
        wishlist_var_pricerange = 'All';
    
        
        $('#title_wishlist_price_min').html(wishlist_var_min_price);
        $('#title_wishlist_price_max').html(wishlist_var_max_price);
        $('#title_wishlist_category').html("All Categories");
        $('#title_wishlist_purpose').html("All");
        $('#title_wishlist_purpose').html("Any");  
        $('#title_wishlist_subcategory').html("All");
    
        $('.wl-sc').hide();
    
        back = 'wishlist';
        $('.content, .header2, .add-item-icon').hide();
        $('#page-new-wishlist').show();
        $('.page-title').html("Add to Wishlist");
        $(".wishlist-add-btn").show();		
	}
}



function wishlist_filter_category(){
    $('.wl-sc').hide();
    $('#title_wishlist_subcategory').html("All");
    wishlist_var_subcategory = 0;

    var data = JSON.parse(localStorage.marketplacedata);
    var categories_select_list = '';
    categories_select_list += ''+
                        '<div class="row category-item" onclick="select_wishlist_category(\'0\',\'All Categories\')">'+
                            '<div class="col-12">All Categories</div>'+
                        '</div>';

        '';
    for(var i in data.categories){
        categories_select_list += ''+
                        '<div class="row category-item" onclick="select_wishlist_category('+data.categories[i].category_group_id+',\''+data.categories[i].category_group_name+'\')">'+
                            '<div class="col-12">'+data.categories[i].category_group_name+'</div>'+
                        '</div>';

        '';
    }      

        var text =  '<div class="select_category">'+
                        '<div class="sc_title">Categories</div>'+
                        categories_select_list
                        +
                    '</div>';

        swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});

}

function select_wishlist_category(id,name){
    swal.close();
    wishlist_var_category = id;
    $('#title_wishlist_category').html(name);

    
    var data = JSON.parse(localStorage.marketplacedata);

    var found = 0;




    for(var i in data.categories){
        
      if (data.categories[i].category_group_id == wishlist_var_category){
          for (var j in data.categories[i].sub_category){
            found = 1;          
          }
      }

    }  
    
    if(found == 1){
        $('.wl-sc').show();
    } else {
        $('.wl-sc').hide();
    }
    
}

function wishlist_filter_subcategory(){
    var data = JSON.parse(localStorage.marketplacedata);
    var subcategories_select_list = '';
    subcategories_select_list += ''+
                        '<div class="row category-item" onclick="select_wishlist_subcategory(\'0\',\'All Sub-categories\')">'+
                            '<div class="col-12">All Sub-categores</div>'+
                        '</div>';

    for(var i in data.categories){

        if (data.categories[i].category_group_id == wishlist_var_category){
            for (var j in data.categories[i].sub_category){
                found = 1;
                
                subcategories_select_list += ''+
                '<div class="row category-item" onclick="select_wishlist_subcategory('+data.categories[i].sub_category[j].category_id+',\''+data.categories[i].sub_category[j].category_title+'\')">'+
                    '<div class="col-12">'+data.categories[i].sub_category[j].category_title+'</div>'+
                '</div>';
    
            
            }
        }
    
    }

    var text =  '<div class="select_category">'+
                    '<div class="sc_title">Sub-Categories</div>'+
                    subcategories_select_list
                    +
                '</div>';

    swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});    
}

function select_wishlist_subcategory(id,name){
    swal.close();
    wishlist_var_subcategory = id;
    $('#title_wishlist_subcategory').html(name);
}

function wishlist_filter_purposes(){
    var purpose_select_list = '';
    
    purpose_select_list += ''+
        '<div class="row category-item" onclick="select_wishlist_purposes(\'Commercial\')">'+
            '<div class="col-12">Commercial</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_wishlist_purposes(\'Charity\')">'+
            '<div class="col-12">Charity</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_wishlist_purposes(\'All\')">'+
            '<div class="col-12">All</div>'+
        '</div>'+
    '';
     
  
      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Purpose</div>'+
                      purpose_select_list
                      +
                  '</div>';
  
      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});    
}

function select_wishlist_purposes(name){
    swal.close();
    wishlist_var_purpose = name;
    $('#title_wishlist_purpose').html(name);   
}

function wishlist_filter_pricerange(){
    var pricerange_select_list = '';
    
    pricerange_select_list += ''+
        '<div class="row category-item" onclick="select_wishlist_pricerange(50000)">'+
            '<div class="col-12">0 - 50,000</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_wishlist_pricerange(100000)">'+
            '<div class="col-12">0 - 100,000</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_wishlist_pricerange(300000)">'+
            '<div class="col-12">0 - 300,000</div>'+
        '</div>'+
    '';
     
  
      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Price</div>'+
                      pricerange_select_list
                      +
                  '</div>';
  
      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});    
}
function select_wishlist_pricerange(amount){
    swal.close();
    wishlist_var_pricerange = amount;
    $('#title_wishlist_pricerange').html('0 - '+number_format(amount));      
}

function submit_add_wishlist(){
    var min = $('#title_wishlist_price_min').val();
    var max = $('#title_wishlist_price_max').val();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/wishlist/add",
        "method": "POST",
        "headers": {
        "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"min\": \""+min.replace(/,/gi, "")+"\",\"max\": \""+max.replace(/,/gi, "")+"\",\"user_id\": \""+localStorage.user_id+"\",\"category\": \""+wishlist_var_category+"\",\"purpose\": \""+wishlist_var_purpose+"\",\"pricerange\": \""+wishlist_var_pricerange+"\",\"subcategory\": \""+wishlist_var_subcategory+"\"}"
    };
    $.ajax(settings).done(function (response) {
        pg_wishlist();
    }).fail(function() {
        error_message('Connection error! Try again.');
    });   
}

function remove_wishlist_dialog(wishlist_id){
   
    var text =  '<div class="row">'+
                    '<div class="col-12 h-left" style="color: #717171; margin-top: -30px; font-size: 16px;">Remove from list?</div>'+
                    '<div class="col-6"></div>'+
                    '<div class="col-3 h-right" onclick="swal.close()" style="color: #717171; padding-left:45px; font-size: 14px; color: #13A89F; font-weight: bold;" >NO</div>'+
                    '<div class="col-3 h-left" onclick="remove_wishlist('+wishlist_id+')" style="color: #717171; padding-right:45px; font-size: 14px; color: #13A89F; font-weight: bold;">YES</div>'+
                '</div>';

    swal({ html: true, title: "", text: text, showConfirmButton: false});


      
}



function remove_wishlist(id){
    swal({ html: true, title: "", 
    text: 'Please wait..', 
     allowOutsideClick: false, showConfirmButton: false});

     var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/wishlist/remove",
        "method": "POST",
        "headers": {
        "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"wishlist_id\": \""+id+"\"}"
    };
    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        if(data.success){ 
            swal.close();
            $("#wishlist_div_id"+id).remove();
            wishlist_count--;
            if(wishlist_count ==  0){
                $("#wishlist-list").html('<div class="col-12" style="margin-top: 90px;"><h3>No wish found!</h3> Wishlist allows you to select the type of items you "wish" to buy; once they are posted we notify you right-away!')
            }
        } else {
            error_message('System error! Try again.');
        }
    }).fail(function() {
        error_message('Connection error! Try again.');
    });       
}
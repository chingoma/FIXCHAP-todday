
var filter_category_id = '';
var filter_subcategory_id = '';
var filter_subcategory_name = '';
var filter_category_name = '';
var filter_purpose = 'All';
var filter_sort_order = 'Newest';
var filter_price_min = '0';
var filter_price_max =  '100,000,000';

function pg_filter(new_filter=true){
    filter_price_min = '0';
    filter_price_max =  '100,000,000';
    $('#title_filter_price_min').val(filter_price_min);
    $('#title_filter_price_max').val(filter_price_max);
    $(window).scrollTop(0);
    current_nav = 'filter';
    back = 'browse';
    $(".header2, #clear_search, .content, .add-item-icon").hide();
    $("#page-content-browse-filter, .filter-item").show();
    $('.page-title').html('Filter');
    $('.content').css('padding','60px 10px 130px 10px');    
    if(!new_filter){
        // start_filtering(true);
    } else {
        // start_filtering(true);
        // $("#title_filter_category").html("Select Category");
        // $("#title_filter_sort_order").html("Newest");  
        // $("#title_filter_purposes").html("All");   
        // filter_sort_order = 'Newest';
        // filter_purpose = 'All';
        // filter_category_id = '';
        // filter_category_name = '';
    }
  }

  function filter_category(){
    var data = JSON.parse(localStorage.marketplacedata);
    var categories_select_list = '';
    for(var i in data.categories){
        categories_select_list += ''+
                      '<div class="row category-item" onclick="select_filter_category('+data.categories[i].category_group_id+',\''+data.categories[i].category_group_name+'\')">'+
                          '<div class="col-12">'+data.categories[i].category_group_name+'</div>'+
                      '</div>';
  
        '';
    }  
    
    categories_select_list += ''+
                      '<div class="row category-item" onclick="select_filter_category(0,\'Others\')">'+
                          '<div class="col-12">Others</div>'+
                      '</div>';
  
        '';
  
      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Categories</div>'+
                      categories_select_list
                      +
                  '</div>';
  
      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
    //   $(".sweet-alert").css("top","25%");
  }

  function select_filter_category(category_id, category_name){
    swal.close();
    filter_category_id = category_id;
    filter_category_name = category_name;
    $("#title_filter_category").html(category_name);

    var data = JSON.parse(localStorage.marketplacedata);

    var found = 0;

    for(var i in data.categories){
        
      if (data.categories[i].category_group_id == category_id){
          for (var j in data.categories[i].sub_category){
            found = 1;          
          }
      }

    }  

    
    if(found == 1){
        $('.filter_sc').show();
    } else {
        $('.filter_sc').hide();
    }
  }

  function filter_sub_category(){
    var data = JSON.parse(localStorage.marketplacedata);
    var subcategories_select_list = '';
    subcategories_select_list += ''+
                        '<div class="row category-item" onclick="select_filter_subcategory(\'0\',\'All Sub-categories\')">'+
                            '<div class="col-12">All</div>'+
                        '</div>';

    for(var i in data.categories){

        if (data.categories[i].category_group_id == filter_category_id){
            for (var j in data.categories[i].sub_category){
                found = 1;
                
                subcategories_select_list += ''+
                '<div class="row category-item" onclick="select_filter_subcategory('+data.categories[i].sub_category[j].category_id+',\''+data.categories[i].sub_category[j].category_title+'\')">'+
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


function select_filter_subcategory(category_id, category_name){
    swal.close();
    filter_subcategory_id = category_id;
    filter_subcategory_name = category_name;
    $("#title_filter_subcategory").html(category_name);
}

  function filter_sort(){
    var sort_select_list = '';
    
    sort_select_list += ''+
        '<div class="row category-item" onclick="select_filter_sort(\'Newest\')">'+
            '<div class="col-12">Newest</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_filter_sort(\'Lowest Price\')">'+
            '<div class="col-12">Lowest Price</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_filter_sort(\'Highest Price\')">'+
            '<div class="col-12">Highest Price</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_filter_sort(\'A to Z\')">'+
            '<div class="col-12">A to Z</div>'+
        '</div>'+
    '';
     
  
      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Sort Order</div>'+
                      sort_select_list
                      +
                  '</div>';
  
      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
    //   $(".sweet-alert").css("top","45%");
  }

  function select_filter_sort(sort_order){
    swal.close();
    filter_sort_order = sort_order;
    $("#title_filter_sort_order").html(sort_order);    
  }

  function filter_purposes(){
    var purpose_select_list = '';
    
    purpose_select_list += ''+
        '<div class="row category-item" onclick="select_filter_purposes(\'Commercial\')">'+
            '<div class="col-12">Commercial</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_filter_purposes(\'Charity\')">'+
            '<div class="col-12">Charity</div>'+
        '</div>'+
        '<div class="row category-item" onclick="select_filter_purposes(\'All\')">'+
            '<div class="col-12">All</div>'+
        '</div>'+
    '';
     
  
      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Purpose</div>'+
                      purpose_select_list
                      +
                  '</div>';
  
      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
    //   $(".sweet-alert").css("top","45%");
  }

  function select_filter_purposes(purposes){
    swal.close();
    filter_purpose = purposes;
    $("#title_filter_purposes").html(purposes);        
  }

  function start_filtering(new_filter=true){

    var page_title = filter_category_name;
    if(filter_category_name != ''){
        page_title += ' - '+filter_sort_order;
    } else {
        page_title += 'All - '+filter_sort_order;
    }
    $('.page-title').html(page_title);
      if(!new_filter){


          
          if(back_to_search == ''){
            search_items('','','','',false,true);
          } else {
           
            pg_search();
          }

          $('.header').show();
          $('.content').css('padding-top','50px');
          
       
      } else {
        current_nav = 'filter';
        $(".filter-item").hide();
        var min = $("#title_filter_price_min").val();
        var max = $("#title_filter_price_max").val();
        search_items('',filter_category_id,filter_subcategory_id,filter_sort_order,true,true,min,max);
        
      }
  }

  $("#title_filter_price_min, #title_filter_price_max").focusin(function() {
    $(this).val('');
  });
  

  $('.number_format').on('keyup', function() {
    $(this).val(numeral($(this).val()).format('0,0')); 

});
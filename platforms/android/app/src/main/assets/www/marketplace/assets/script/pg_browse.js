
var item_id_browse_arrays = [];

function category(){
  $('.page-title').html('');
  $('.bc-btn, .filter-item, #buy_comment').hide();
  $(".content, #page-content, .header_search_text, .filter-item, .hh_purchases_pg, #status_layer").hide();

  back = 'repair';

  current_nav = 'cat';
  $(window).scrollTop(0);

  $('.sub-menu').removeClass('sub-menu-active');
  $('#go_to_cat').addClass('sub-menu-active');
  $('.book-item, .content, .hh_purchases_pg').hide();
  $('.header2, .header, #page-content').show();
  $('.header2, .header, .search-div').show();
  $('.hh_home_pg').show();
  $('.f-icon').removeClass('f-icon-active');
  $('#main-menu-browse').addClass('f-icon-active');
  $('#unlist_edit, #postedunlisted').hide();

  $('#categorybrowse').css("background-color","#13A79E");
  $('.search-col').css("background-color","#13A79E");

  
  $('.add-item').fadeIn();




  var categories = '';

  var data = JSON.parse(localStorage.marketplacedata);

  categories += 
  '<div class="col-4 col-md-2 cat-icon-col" onclick="trending()">'+
    '<div class="cat-icon-div"><img src="assets/images/trending.png"><br>Trending</div>'+
  '</div>'; 

  for(var i in data.categories){
      categories += 
        '<div class="col-4 col-md-2 cat-icon-col" onclick="subcategory(\''+data.categories[i].category_group_id+'\',\''+data.categories[i].category_group_name+'\')">'+
          '<div class="cat-icon-div"><img src="data:image/png;base64,'+data.categories[i].file_content+'"><br>'+data.categories[i].category_group_name+'</div>'+
        '</div>'; 

     
  }  

  $("#page-content").html('<div class="spinner-div"><div class="spinner-border"></div></div>');
  $("#page-content").html(''+
    '<div class="post">'+
      '<div class="row">'+
          categories+
      '</div>'+
    '</div>'
  );

  $('.content').css('padding','160px 10px 130px 10px');
  
}


function subcategory(cat_id, cat_name){
   

    $(window).scrollTop(0);
    back = 'cat';
    current_nav = 'subcat';



    var subcategory = 
    '<div class="col-12 col-md-12 sub-category" onclick="go_to_category_group('+cat_id+',\''+cat_name+'\')">'+
    '<div class="row"><div class="col-2" style="padding-top: 8px;  text-align: right;"><i class="fas fa-align-justify"></i></div><div class="col-10" style="padding-top: 8px;">All</div></div>'+
  '</div>'
    ;
    var data = JSON.parse(localStorage.marketplacedata);


    for(var i in data.categories){
     
      if (data.categories[i].category_group_id == cat_id){
        
          for (var j in data.categories[i].sub_category){
            subcategory += 
              '<div class="col-12 col-md-12 sub-category" onclick="go_to_subcategory('+data.categories[i].sub_category[j].category_id+',\''+data.categories[i].sub_category[j].category_title+'\')">'+
                '<div class="row"><div class="col-2"><img width="40" src="data:image/png;base64,'+data.categories[i].sub_category[j].file_content+'"></div><div class="col-10" style="padding-top: 8px;">'+  data.categories[i].sub_category[j].category_title+'</div></div>'+
              '</div>'
              ; 
          }
      }

    }

  if(subcategory == ''){
    go_to_category_group(cat_id);
    subcategory = '<div class="no-item-found"><i class="far fa-hourglass"></i></div><div class="no-item-found-txt">No item found</div>';
  }




    $('.header2, .add-item-icon').hide();
    $('.page-title').html(cat_name);
    $("#page-content").html('<div class="spinner-div"><div class="spinner-border"></div></div>');
    $("#page-content").html(''+
      '<div class="post ">'+
        '<div class="sub-category-div">'+
          '<div class="row">'+
              subcategory+
          '</div>'+
        '</div>'+
      '</div>'
    );    
}


var load_list = '';

function browse(cat="all", title=""){

  back = 'repair';

  back_to_search = '';
  clearInterval(search_setInterval);
  $('.bc-btn, .filter-item, #buy_comment').hide();
  $(".content, #page-content, .header_search_text, .filter-item, .hh_purchases_pg, #status_layer").hide();
  $("#page-content-browse").show();

  
  if(cat=="all"){
    $('.content').css('padding','160px 10px 130px 10px');
    $(".cat-all").show();
    $('.header2, .header, .search-div').show();
    current_nav = 'browse';

    $('.page-title').html('');
    $('.sub-menu').removeClass('sub-menu-active');
    $('#go_to_browse').addClass('sub-menu-active');
  } else {
    $('.content').css('padding','60px 10px 130px 10px');
    back = 'cat';
    current_nav = 'browse';
    $('.page-title').html(title);
  }
  
  if (cat.substr(0, 3)=='sub'){
    $(".cat-all").hide();
    $(".sub-category-"+cat.substr(3)).show();
    back = 'msub-'+cat.substr(3);
  } else if (cat.substr(0, 3)=='cat'){
    $(".cat-all").hide();
    $(".category-"+cat.substr(3)).show();
    back = 'mcat-'+cat.substr(3);
  }

 


  

  $('#page-content2').hide(); 
  //  $('#page-content').show();

  // item_id_browse_arrays = [];
	
	$(window).scrollTop(0);




	
	$('.book-item').hide();
	$('.add-item').fadeIn();

  $('.header2').css('height','100px');

  $('.hh_home_pg').show();

  $('.hh_sales_pg').hide();

  $('.f-icon, #main-menu-sales, #main-menu-likes').removeClass('f-icon-active');
  $('#main-menu-browse').addClass('f-icon-active');

  $('#page-content').html('<center><div style="margin-top: 30vh;"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div></center>');


}

function load_item_browse(){

}



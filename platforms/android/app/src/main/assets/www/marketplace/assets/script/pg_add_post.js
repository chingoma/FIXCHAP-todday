// $(function() {
//   $('textarea').each(function() {
//       $(this).height($(this).prop('scrollHeight'));
//   });
// });


var image_index=0;
var image_array = [];
var item_condition = '';
var item_category_id = '';
var item_sub_category_id = 0;
var item_purpose = '';
var post_tag_code = '';
var coursel_count = 1;
var done_upload = 0;
var photo_stage = 0;
var add_item_id = 0;
var just_added = 0;
var img_upload_count = 0;


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function predict_price(){
  $('#selling_price').html(number_format(Math.round(selling_price(removeCommas($("#addItemPrice").val())))));
}

$('.add-item-icon').on('click', function() {

  add_post_master();
  
});

function add_post_master(item_id=0){


  if(item_id == 0){
    $("#promocode-section").show();
  } else {
    $("#promocode-section").hide();
  }

  $("#edit_picture_btn").hide();

  if(localStorage.session == null){
    window.location.href="../index.html?login=1";
  } else {
    $('.header_search_text').hide();
    $('.header').show();
    coursel_count = 1;
    $('.bc-btn').hide();
    add_item_id = item_id;
    post_tag_code = localStorage.user_id+'D'+Date.now();
    img_upload_count = 0;
    image_array = [];
    image_index = 0;
    $(".to_d").remove();
    $("#photo-continue-btn").hide();
    $("#pictures_count").html('Pictures ('+img_upload_count+'/10) <small style="color: #13A79E"><i>Upload atleast 3 pictures</i></small>');   
  
    if(item_id > 0){
      var sync_done = 0;
      $("#add_submit_btn").html("Save Changes");
      $(".content").hide();
      $("#page-content").show();
      $('#page-content').html('<center><div style="margin-top: 30vh;"><div style="margin-left: -5%;"><div class="lds-ripple"><div></div><div></div></div></div></div><br>Loading..</center>');
  
  
  
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/marketplace/etc/api/view_item_for_edit",
        "method": "POST",
        "headers": {
        "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+item_id+"\"}"
      };

      $.ajax(settings).done(function (response) {
  
        if(sync_done == 0){
          var data = JSON.parse(response);
  
          img_upload_count = 0;
          image_array = [];
          image_index = 0;
          for(var i in data.photos){
            capture_image(data.photos[i].file_content);
            
          }
    
          if(data.success){ 
            console.log(data);
            after_add_post_master(
              data.title,
              data.desc.replace(/<br>/g,"\n"),
              number_format(data.price),
              data.item_condition_id,
              data.purpose,
              data.category_id,
              data.group_id,
              0,
              0,
              img_upload_count,
              image_array
            );
          }
          sync_done++;
        }
  
      }).fail(function() {
        
      });     
  
    } else {
      $("#add_submit_btn").html("Submit");
      after_add_post_master('','','','','',0,0,0,0,0,[]);
    }
    predict_price();
  }
}

var $htmlOrBody = $('html, body');// scrollTop works on <body> for some browsers, <html> for others
var scrollTopPadding = 90;

$('input').focus(function() {
    // get textarea's offset top position
    var textareaTop = $(this).offset().top;
    // scroll to the textarea
    $htmlOrBody.scrollTop(textareaTop - scrollTopPadding);
    console.log($(window).height());
    
});

$("input").focusout(function(){
  console.log($(window).height());
});

function after_add_post_master(
  f_title='',
  f_desc='',
  f_price='',
  f_condition_id='',
  f_purpose='',
  f_item_category_id,
  f_item_group_id,
  f_done_upload,
  f_photo_stage,
  f_img_upload_count,
  f_image_array
  ){
    $(".content").hide();
    
    $(".uplbtns").show();

    image_array = f_image_array;
    item_category_id = f_item_group_id;
    item_sub_category_id = f_item_category_id;
    img_upload_count = f_img_upload_count;
    done_upload = f_done_upload;
    photo_stage = f_photo_stage;

    $("#addItemName").val(f_title);
    $("#addItemDesc").val(f_desc);
    $("#addItemPrice").val(f_price);

    if(f_title == ''){
      $('.page-title').html('Sell an Item');
        } else {
      $('.page-title').html(f_title);
    }

    if(f_condition_id == ''){
      $("#addItemCondition").html('Choose condition');
      item_condition = '';
    } else if(f_condition_id == 1){
      $("#addItemCondition").html('Excellent');
      item_condition = 'Excellent';
    } else if(f_condition_id == 2){
      $("#addItemCondition").html('Good');
      item_condition = 'Good';
    } else if(f_condition_id == 3){
      $("#addItemCondition").html('Fair');
      item_condition = 'Fair';
    }

    item_purpose = 'N/A';

    // if(f_purpose == ''){
    //   $("#addItemSelectPurpose").html('Select Purpose');
    //   item_purpose = '';
    // } else if(f_purpose == 'COMMERCIAL'){
    //   $("#addItemSelectPurpose").html('Commercial');
    //   item_purpose = 'COMMERCIAL';
    // } else if(f_purpose == 'CHARITY'){
    //   $("#addItemSelectPurpose").html('Charity');
    //   item_purpose = 'CHARITY';
    // }

    categories_data = JSON.parse(localStorage.marketplacedata).categories;

  
    if(item_category_id == 0){
      $("#addItemSelectCategory").html('Select category');
      item_category_id = 0;
    } else {
      for(var i in categories_data){
        if(categories_data[i].category_group_id == item_category_id){
          $("#addItemSelectCategory").html(categories_data[i].category_group_name);
          break;
        }
      }
    }

    
    if(item_sub_category_id == 0){
      $("#addItemSelectSubCategory").html('Select sub-category');
      item_sub_category_id = 0;
    } else {
      for(var i in categories_data){
        var loop_found_answer = 0;
        for(var j in categories_data[i].sub_category){
          if(categories_data[i].sub_category[j].category_id == item_sub_category_id){
            $("#addItemSelectSubCategory").html(categories_data[i].sub_category[j].category_title);
            loop_found_answer = 1;
            break;
          }
        }
        if(loop_found_answer == 1){
          break;
        }
      }
    }
    
    
    

    $("#image_list").html('');
    $(".photo_count").hide();
      $(window).scrollTop(0);
      back = 'browse';
    current_nav = 'new';
    
    $('.header2, .add-item-icon').hide();
    $("#page-content").html('<div class="spinner-div"><div class="spinner-border"></div></div>');


    $('#page-content').hide();

    $('#page-content2').show();

    $('.content').css('padding','80px 10px 130px 10px');

    $("#addItemCat").change(function(){
        var  subcategory = '';
        for(var i in data.categories){
          if (data.categories[i].category_group_id ==  $("#addItemCat").val()){
              for (var j in data.categories[i].sub_category){
                  subcategory += 
                  '<option id="'+data.categories[i].sub_category[j].category_id+'">'+
                      data.categories[i].sub_category[j].category_title+
                  '</option>'
                  ; 
              }
          }
        }
        $("#addItemSubCat").html(subcategory);
    });

    $("#photo-delete-instructions").hide();
    $("#form-div").attr("style","opacity: 0.3; pointer-events:none;");
}


$( "#addItemName" ).keyup(function() {
    if(img_upload_count < 3){
      error_message('You must add atleast 3 photos');
      $("#addItemName").val('');
    } else {
      var inputlength = $("#addItemName").val().length;
      $("#addItemNameLabel").html('Title ('+(50-inputlength)+'/50)');      
    }
});

$( "#addItemDesc" ).keyup(function() {
    var inputlength = $("#addItemDesc").val().length;
    $("#addItemDescLabel").html('Descriptions ('+(250-inputlength)+'/250)');
});

// $(function() {
//   $('textarea').each(function() {
//       $(this).height($(this).prop('scrollHeight'));
//   });
// });

$(document).ready(function() {
  var textbox = '#ThousandSeperator_commas';
  var hidden = '#ThousandSeperator_num';

  $( ".input_commas" ).keydown(function(e) {
      // console.log(e.which);    
      if( e.which == 8 || (48 <= e.which && e.which <= 57) || e.which == 39 || e.which == 37 || e.which == 13){
        
      } else {
        return false;
      }
  });


  $('.input_commas').keyup(function () {
    // var num = $('.input_commas').val();


    var num = this.value;

    // console.log(num);

    if(num == ''){
      // $('.input_commas').val('0');
      // this.value = 0;
      $('#selling_price').html('0');
      
    }  else {
    
      if(num.replace(/^0+/, '') == ''){
        num = 0;
      } else {
        num = num.replace(/^0+/, '');
      }      

      var numCommas = addCommas(num);
      // $('.input_commas').val(numCommas);

      this.value = numCommas;

      if(numCommas.replace(/^0+/, '') != ''){
        // $('#amount').val(numCommas.replace(/^0+/, ''));
        this.value = numCommas.replace(/^0+/, '')
      } else {
        
      }
     
    }
  });



  $('#addItemPrice').keyup(function () {

    predict_price();

  });

  $('#addPromocode').keyup(function () {

    localStorage.promocode = $('#addPromocode').val();

  });





var textarea = document.querySelector('textarea');

// textarea.addEventListener('keydown', autosize);
});
             
// function autosize(){
//   // var el = this;
//   // setTimeout(function(){
//   //   el.style.cssText = 'height:auto; padding:0';
//   //   // for box-sizing other than "content-box" use:
//   //   // el.style.cssText = '-moz-box-sizing:content-box';
//   //   el.style.cssText = 'height:' + el.scrollHeight + 'px';
//   // },0);
// }

$("#addItemSelectCategory").on('click', function() {
  var data = JSON.parse(localStorage.marketplacedata);
  var categories_select_list = '';
  for(var i in data.categories){
      categories_select_list += ''+
                    '<div class="row category-item" onclick="select_category('+data.categories[i].category_group_id+',\''+data.categories[i].category_group_name+'\')">'+
                        '<div class="col-12">'+data.categories[i].category_group_name+'</div>'+
                    '</div>';

      '';
  }      

    var text =  '<div class="select_category">'+
                    '<div class="sc_title">Select Category</div>'+
                    categories_select_list
                    +
                '</div>';

    swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
    $('.sweet-alert').css("margin-top","5vh");
});

$("#addItemSelectSubCategory").on('click', function() {
  if(item_category_id != 0 ){
    var data = JSON.parse(localStorage.marketplacedata);
    var sub_categories_select_list = '';

        for(var i in data.categories){
          if (data.categories[i].category_group_id ==  item_category_id){
              for (var j in data.categories[i].sub_category){
                  sub_categories_select_list += ''+
                      '<div class="row category-item" onclick="select_sub_category('+data.categories[i].sub_category[j].category_id+',\''+data.categories[i].sub_category[j].category_title+'\')">'+
                          '<div class="col-12">'+data.categories[i].sub_category[j].category_title+'</div>'+
                      '</div>';
                  ; 
              }
          }
        }
       

      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Select Sub-Category</div>'+
                      sub_categories_select_list
                      +
                  '</div>';

      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
      $('.sweet-alert').css("margin-top","5vh");
    } else {
      error_message('Select category');
    }
});

$("#addItemSelectPurpose").on('click', function() {
  if(item_category_id != 0 ){
    var data = JSON.parse(localStorage.marketplacedata);
    var sub_categories_select_list = '';

        for(var i in data.categories){
          if (data.categories[i].category_group_id ==  item_category_id){
              for (var j in data.categories[i].sub_category){
                  sub_categories_select_list += ''+
                      '<div class="row category-item" onclick="select_sub_category('+data.categories[i].sub_category[j].category_id+',\''+data.categories[i].sub_category[j].category_title+'\')">'+
                          '<div class="col-12">'+data.categories[i].sub_category[j].category_title+'</div>'+
                      '</div>';
                  ; 
              }
          }
        }
       

      var text =  '<div class="select_category">'+
                      '<div class="sc_title">Select Sub-Category</div>'+
                      sub_categories_select_list
                      +
                  '</div>';

      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
      $('.sweet-alert, showSweetAlert, visible').css("margin-top","5vh");
    } else {
      error_message('Select category');
    }
});

$("#addItemSelectPurpose").on('click', function() {


        var text =  '<div>'+
                    '<div class="condition_title">Choose Purpose</div>'+
                    '<div class="add_condition_select" onclick="select_purpose(1,\'Commercial\')">'+
                    '<h4>Commercial</h4>'+
                    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'+
                    '</div>'+
                    '<div class="add_condition_select" onclick="select_purpose(2,\'Charity\')">'+
                    '<h4>Charity</h4>'+
                    '<p>TLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'+
                    '</div>'+
                '</div>';

      swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
      // $('.sweet-alert').css("margin-top","10vh");
 
});

$("#addItemCondition").on('click', function() {
    var text =  '<div>'+
                    '<div class="condition_title">Choose Item Condition</div>'+
                    '<div class="add_condition_select" onclick="select_condition(\'Excellent\')">'+
                    '<h4>Excellent</h4>'+
                    '<p>The product is rarely used and is in perfect working condition. It may have minor scraches only.</p>'+
                    '</div>'+
                    '<div class="add_condition_select" onclick="select_condition(\'Good\')">'+
                    '<h4>Good</h4>'+
                    '<p>This product is gently used and is in good working condition and may have minor scratches & dents.</p>'+
                    '</div>'+
                    '<div class="add_condition_select" onclick="select_condition(\'Fair\')">'+
                    '<h4>Fair</h4>'+
                    '<p>This product is in proper working condition but may have visible scratches & dents.</p>'+
                    '</div>'+
                '</div>';

    swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
    $('.sweet-alert').css("margin-top","5vh");
});

$("#addItemLocation").on('click', function() {
  var text =  '<div>'+
                  '<p>FixChap Marketplace operates in Dar es Salaam</p>'+
              '</div>';

  swal({ html: true, title: "", text: text, showConfirmButton: false, allowOutsideClick: true});
  $('.sweet-alert').css("margin-top","5vh");
});

function select_condition(x){
    $("#addItemCondition").html(x);
    item_condition = x;
    swal.close();
}

function selling_price(x){
    // var result = x;
    // var data = JSON.parse(localStorage.marketplacedata);
    // for(var i in data.commisions){
    //   if (data.commisions[i].price_range_starts*1 <= x && x <= data.commisions[i].price_range_ends*1){
    //       result =  x*1+(data.commisions[i].price_range_commision*1);
    //       break;
    //   }
    // }
    // return result; 

    if(item_sub_category_id == 0 || item_category_id == 0){
      return (x*0.25)*1;
    } else {
      var data = JSON.parse(localStorage.marketplacedata);
      for(var i in data.categories){
          if(data.categories[i].category_group_id == item_category_id){
            for(var j in data.categories[i].sub_category){
                if(data.categories[i].sub_category[j].category_id == item_sub_category_id){
                  return (x*((data.categories[i].sub_category[j].category_commission*1)/100));
                  break;
                }
            }
            break;
          }
      }
    }
    
}

function submit_add_form(){
    var item_name = $("#addItemName").val().replace(/"/g, "'");
    swal({ html: true, title: "", text: '<p style="line-height: 23px;">Preparing post..</p>', allowOutsideClick: false, showConfirmButton: false});

    if(add_item_id == 0){
      var confirmation_dialog = ''+item_name+
      '<br>TZS '+number_format($("#addItemPrice").val())+'/=<br>'+
      'Conditiong: '+item_condition+' <br>'+
      '<hr><br>'+
      'By clicking sell now, you agree to the <a style="color:#13A79E; text-decoration:none;" href="https://fixchap.com/terms.html"> FixChap Marketplace '+
      ' terms and conditions</a>.';


      swal({
        title: "",
        html: true,
        showCancelButton: true,
        text: confirmation_dialog,
        icon: "warning",
        buttons: true,
        confirmButtonText: 'Sell Now',
        dangerMode: true,
        },  function (isConfirm) {
        if (isConfirm) {
          post_form_data('add');
        }
      });
      $('.sweet-alert').css('margin-top','30px');
    } else {
      post_form_data('edit');
    }
}

function post_form_data(flag){
  swal.close();
  
  swal({ html: true, title: "", text: '<p style="line-height: 23px;">Preparing post..</p>', allowOutsideClick: false, showConfirmButton: false});
  // swal({ html: true, title: "", 
  // text: ' <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><br><br>Uploading..', 
  //   allowOutsideClick: false, showConfirmButton: false});
  $("#form-div").attr("style","opacity: 0.3; pointer-events:none;");
  $("#add_submit_btn").html('Submiting..');


  $("#modal_preparingpost").modal('show');
  $("#modal_preparingpost .modal-dialog").css('margin-top','40vh');
  $("#modal_preparingpost .modal").css('text-align','center');
  $("#modal_preparingpost .modal-dialog").css('text-align','center');
  


  var item_name = $("#addItemName").val().replace(/"/g, "'");
  var item_desc = $("#addItemDesc").val().replace(/"/g, "'");
  item_desc = item_desc.replace(/\n/g, "<br>");

    $("textarea#addItemDesc").each(function () {
        this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    }).on("input", function () {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    });

  var token = btoa('{"title":"'+item_name+'","desc":"'+item_desc+'","condition":"'+item_condition+'","price":"'+$("#addItemPrice").val()+'","category":"'+item_category_id+'","subcategory":"'+item_sub_category_id+'","purpose":"'+item_purpose+'"}');
  
  swal({ html: true, title: "", text: '<p style="line-height: 23px;">Preparing post..</p>', allowOutsideClick: false, showConfirmButton: false});
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/marketplace/etc/api/item/add",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json"
    },
    "processData": false,
    "data": "{\"promocode\": \""+localStorage.promocode+"\",\"post_tag_code\": \""+post_tag_code+"\",\"item_data\": \""+token+"\",\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\",\"item_id\": "+add_item_id+",\"flag\": \""+flag+"\"}"
  };
  $.ajax(settings).done(function (response) {
    $("#modal_preparingpost").modal('hide');
    console.log(response);
    var data = JSON.parse(response);
    if(data.success){ 
      $("#form-div").attr("style","opacity: 1; pointer-events:default;");
      $("#add_submit_btn").html('Submit');
        $('#page-content2').hide();
        swal.close();
        just_added = 1;
        sales_live();
       
    } else {
      $("#form-div").attr("style","opacity: 1; pointer-events:default;");
      $("#add_submit_btn").html('Submit');
        error_message(data.message);
    }
  }).fail(function() {
      error_message('Connection error! Try again.');
  }); 
}

function check_upload_status(){
  if(done_upload < image_array.length){
      swal({ html: true, title: "", 
        text: ' <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><br><br>Uploading images..', 
      allowOutsideClick: false, showConfirmButton: false});
      setTimeout(function(){ check_upload_status(); }, 5000);
  } else {
    submit_add_form();
  }
}

$('#add_item_form').submit(function(e){
    e.preventDefault();

    console.log("Uploading Information");

    if(img_upload_count < 3){
        error_message('Add atleast 3 photos');
    } else if($("#addItemName").val() == ''){
        error_message('Enter item title');
    } else if ($("#addItemDesc").val() == ''){
        error_message('Enter item description');
    } else if (item_category_id == ''){
       error_message('Select Category');
    } else if (item_condition == ''){
        error_message('Enter item condition');
    } else if (item_purpose == ''){
        error_message('Select Purpose');
    } else if ($("#addItemPrice").val() == ''){
        error_message('Enter price');
    } else {
      console.log("Checking success start ajax");

      check_upload_status();



    }
});

function select_category(id,text){
    $("#addItemSelectCategory").html(text);
    item_category_id = id;

    item_sub_category_id = 0;

    
    $("#addItemSelectSubCategory").html('Select sub-category');

    swal.close();  
}

function select_sub_category(id,text){
    $("#addItemSelectSubCategory").html(text);
    item_sub_category_id = id;
    swal.close();    
}

function select_purpose(id,text){
    $("#addItemSelectPurpose").html(text);
    item_purpose = text;
    swal.close();    
}

function back_to_select_photo(){
  
  swal.close();
}

function continue_add_post(){

  $("#edit_picture_btn").show();

  photo_stage = 1;
  $("#form-div").attr("style","opacity: 1; pointer-events:default;");

  $( "#addItemNameLabel" ).trigger( "click" );

  // var $htmlOrBody = $('html, body');// scrollTop works on <body> for some browsers, <html> for others
  // var scrollTopPadding = 90;


  // // get textarea's offset top position
  // var textareaTop = $("#addItemNameLabel").offset().top;
  // // scroll to the textarea
  // $htmlOrBody.scrollTop(textareaTop - scrollTopPadding);

  // $('html, body').scrollTop(71);


  $(".img-uploading-loader").show();

  // $("#addItemNameLabel").focus();

  

  // swal.close();
  $("#photo-continue-btn").hide();
  $(".uplbtns").hide();
  $("#photo-delete-instructions").hide();


  $( "#page-content2" ).scrollTop(0);

  // swal({ html: true, title: "", text: "Upload has started", allowOutsideClick: false, showConfirmButton: true});         

  // console.log("Preparing uploading");

  for(var i=0; i<image_array.length; i++){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fixchap.com/dev/marketplace/etc/api/item/add_photos",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "processData": false,
      "data": "{\"images\": \""+image_array[i]+"\",\"count\": \""+(i+1)+"\",\"post_tag_code\": \""+post_tag_code+"\",\"user_id\": \""+localStorage.user_id+"\",\"user_agent\": \""+localStorage.user_agent+"\",\"platform\": \""+localStorage.platform+"\",\"item_id\": "+add_item_id+"}"
    };
    $.ajax(settings).done(function (response) {
      console.log("Uploading Done");
      console.log(response);

      var data = JSON.parse(response);
      if(data.success){ 
        $("#loader_count_"+data.count).hide();
      }      

      
     
      done_upload++;
    }).fail(function() {
      console.log("Uploading Failed");
    }); 
  }

}      





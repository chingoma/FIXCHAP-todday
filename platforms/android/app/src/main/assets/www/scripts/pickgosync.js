function sync(){
    var pg_cords = '';
    if(localStorage.pg_cords != null){
      pg_cords = localStorage.pg_cords;
    }


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/pickgo/sync/api/sync",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\"user_id\": \""+localStorage.user_id+"\",\"pg_cords\": \""+pg_cords+"\",\"order_by\": \""+localStorage.order_by+"\"}"
      };
      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        // $(".fixchap-connection").css('display','none');
        if(data.store_control){
          if(data.store_control == 'available'){
            $('#myshopmenu').css('display','block');
            $('.myshopmenuname').html(data.store_name);
            $('#myshopmenuname').html(data.store_name);
            
          }
        }

        if(data.success){ 
          localStorage.offline = 0;
          var stringdata = JSON.stringify(data).replace("'", "`");
          if(stringdata != localStorage.pickandgo_data || localStorage.pickandgo_data == null){
            localStorage.pickandgo_data = stringdata;
            update();
          }
        } else {
          localStorage.offline++;
        }
      }).fail(function() {
          localStorage.offline++;
      });  
}


$('#user_name').html(localStorage.pname);



function update(){
  if(localStorage.pickandgo_data != ''){
    $('#store_list').html('');
    var data = JSON.parse(localStorage.pickandgo_data);
    for(var i in data.store){  
      var distancestring = '';
      if(data.store[i].distance != ''){
        distancestring = '<i class="fa fa-location-arrow"></i> '+data.store[i].distance;
      }

      $('#store_list').append(''+
        '<div class="col-md-4" onclick="pre_cat('+data.store[i].store_id+',\''+data.store[i].store_name+'\')">'+
          '<div style="background-color: white; border-radius: 10px; margin-bottom: 10px;">'+
            '<div class="row">'+
              '<div class="col-md-4 col-sm-4 col-xs-4" style="padding-right: 7px;">'+
               ' <img id="store_icon'+data.store[i].store_id+'" onerror="this.src=\'./images/bsk.png\'" src="./images/bsk.png" style="width: 100%; border-bottom-left-radius: 10px; border-top-left-radius: 10px;" />'+
              '</div>'+
              '<div class="col-md-8 col-sm-8 col-xs-8" style="padding-left: 0px;">'+
                '<h4 style="padding: 0px; line-height: 12px; color: #4F6C83;">'+data.store[i].store_name+'</h4>'+
                '<p style="padding: 5px 0px 0px 0px; color: #4F6C83; line-height: 0px; font-size: 12px;">'+data.store[i].store_location_name+'</p>'+
                '<div class="row">'+
                 ' <div class="col-md-12 col-xs-12 col-sm-12" style="color: #13A89F;">'+
                    '<div>'+
                      rating_display(data.store[i].store_rate)+
                      '<div style="text-align: right; padding-right: 20px;"><font style="color: #4F6C83;"> '+distancestring+'</font></div>'+
                    '</div>'+
                  '</div>'+
                  '<!--<div class="col-md-6 col-xs-6 col-sm-6" style="text-align: right; color: #13A89F; font-weight: bold; padding-right: 40px;">'+
                    
                    '<div style=" text-align: right;"><br></div>-->'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
            
          '</div>'+
        '</div>'+
      '');
      $('#store_icon'+data.store[i].store_id).attr('src',data.store[i].store_icon);
    }
    $('#the_cart_master_count').html(data.cart_count);

    
    // $('#cat_list').html('');
    // for(var i in data.cat){  
    //   $('#cat_list').append(''+
    //       '<div class="col-md-4 col-sm-6 col-xs-6" style="padding-left:8px; padding-right:8px;">'+
    //           '<div style="background-color: white; border-radius: 20px; padding: 20px; margin-top: 10px;">'+
    //               '<div style="min-height: 40px;">'+
    //                 '<font style="font-weight: bold;">'+data.cat[i].cat_name+'</font>'+
    //               '</div>'+
    //               '<div>'+
    //                 '<img  id="cat_icon'+data.cat[i].cat_id+'" src="./images/cat_def.png" onerror="this.src=\'./images/cat_def.png\'"  style="width: 100%;" />'+
    //               '</div>'+
    //         '</div>'+
    //       '</div>'+
    //   '');
    //   $('#cat_icon'+data.cat[i].cat_id).attr('src', data.cat[i].cat_icon);
    // }
  } 
  
  setTimeout(function(){ 
    $('#store_loader').css('display','none'); 
     $('#store_list').css('display','block'); 
     $('#store_list_title').css('display','block');
   }, 2000);
      
}
update();
sync();

function refresh_cat(){
   $('#cats_strore_title').html(localStorage.pg_store_title); 
  var data = JSON.parse(localStorage.pickandgo_data);
  var available_cats = [];
  for(var i in data.product) {
    if(data.product[i].store_id == localStorage.pg_store_id){
        for(var j in data.product[i].cats){
          available_cats.push(data.product[i].cats[j]);
        }
    } 
  }

  
  $('#cat_list').html('');
  
  var cat_found = 0;

  for(var i in data.cat){ 

      $("#cat_list").css('display','none');

      if(available_cats.includes(data.cat[i].cat_id)){
        cat_found++;
        $('#cat_list').append(''+
            '<div class="col-md-4 col-sm-6 col-xs-6" onclick="pre_products('+data.cat[i].cat_id+')" style="padding-left:8px; padding-right:8px;">'+
                '<div style="background-color: white; border-radius: 20px; padding: 20px; margin-top: 10px;">'+
                    '<div style="min-height: 40px;">'+
                      '<font style="font-weight: bold;">'+data.cat[i].cat_name+'</font>'+
                    '</div>'+
                    '<div>'+
                      '<img  id="cat_icon'+data.cat[i].cat_id+'" src="./images/cat_def.png" onerror="this.src=\'./images/cat_def.png\'"  style="width: 100%;" />'+
                    '</div>'+
              '</div>'+
            '</div>'+
        '');
        $('#cat_icon'+data.cat[i].cat_id).attr('src', data.cat[i].cat_icon); 
        
      } 
  }

   if(cat_found < 1){
       $('#cat_list').html(' '+
                '<div class="col-md-12 col-sm-12 col-xs-12">'+
                  '<div style="text-align: center; padding-top: 50px; color:#4F6C83;">No data found!</div>'+
                '</div>'+
        ' ');
  }
  setTimeout(function(){ 
    $("#cat_loader").css('display','none');  

     $("#cat_list").css('display','block');
  }, 500);  
}

function pre_cat(id, store_title){
  localStorage.pg_store_title = store_title;
  localStorage.pg_store_id = id;
  navigate("cats");
}

function pre_products(id){
  localStorage.pg_cat_id = id;
  navigate("products");
}


function refresh_products(){
   $('#products_strore_title').html(localStorage.pg_store_title); 
  var data = JSON.parse(localStorage.pickandgo_data);


  $('#product_list').html('');
  $("#product_list").css('display','none');  
   

  for(var i in data.product){ 
    if(data.product[i].store_id == localStorage.pg_store_id){

       if(data.product[i].cats.includes(localStorage.pg_cat_id)){

        $('#product_list').append(''+
            '<div onclick="addtocart('+data.product[i].product_id+','+data.product[i].product_price+',\''+data.product[i].product_name+'\')" class="col-md-4 col-sm-6 col-xs-6" style="padding-left:8px; padding-right:8px;">'+
                '<div style="background-color: white; border-radius: 20px; padding: 20px; margin-top: 10px;">'+
                    '<div style="text-align: right;"><font style=" color: #4F6C83; font-size: 10px;">TZS</font><font style="font-weight: bold; color: #4F6C83; font-size: 20px;"> '+number_format(data.product[i].product_price)+'</font></div>'+
                    '<div>'+
                      '<img  id="product_icon'+data.product[i].product_id+'" src="./images/cat_def.png" onerror="this.src=\'./images/cat_def.png\'"  style="width: 100%;" />'+
                    '</div>'+
                    '<div style="min-height: 50px;">'+
                    
                     ' <div class="row">'+
                          '<div class="col-md-9 col-sm-9 col-xs-9 col-lg-9" style="line-height: 14px;">'+
                              '<font style="color: #4F6C83; font-size: 13px; ">'+data.product[i].product_name+'</font>'+
                          '</div>'+
                      '</div>'+
                    '</div>'+                    
              '</div>'+
            '</div>'+
        '');
          $('#product_icon'+data.product[i].product_id).attr('src', data.product[i].product_icon); 
       }
           
        setTimeout(function(){ 
        $("#product_loader").css('display','none');   
         $("#product_list").css('display','block');
       }, 500); 
    }    
  }
}


setInterval(function(){
   sync();
   // if(localStorage.offline >= 4){
   //    $(".fixchap-connection").html('Sorry! FixChap Connection Error.');
   //    $(".fixchap-connection").css('display','block');    
   // }
}, 4000);

function rating_display(x){
    if(x==0 || x == null){
        return '<span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
        // return '<span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==1){
        return '<span class="fa fa-star"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==2){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==3){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star-o"></span> <span class="fa fa-star-o"></span>';
    } else if(x==4){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star-o"></span>';
    } else if(x==5){
        return '<span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>';
    }
}
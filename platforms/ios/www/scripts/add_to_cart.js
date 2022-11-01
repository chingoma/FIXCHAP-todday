function close_menu(){
      $("#taptoclose").removeClass("active-tap-close");
    $("#theleftnav").removeClass("active-sidebar-box");
}

function fc_loading(title){
    swal({ html: true, title: "", text: '<div style="margin: -20px 0px -20px 0px;">'+title+'</div>', showConfirmButton: false});
}

function fc_error(message){
    swal({ html: true, title: "", text: '<p style="line-height: 23px;">'+message+'</p>', allowOutsideClick: true, confirmButtonColor: "#13A89F"})
}

function fc_success(title, message){
    swal(title, message, "success");
}

function orderby(){
  localStorage.order_by = $("#orderby").val();
  window.location = 'pickandgo.html';
}

function initialize_order(){
    if(localStorage.order_by == 'location'){
        $("#orderby").val('location');
    } else if (localStorage.order_by == 'az'){
        $("#orderby").val('az');
    }
}

initialize_order();

var new_item_count = 0;



function addtocart(id, amount, name){
    new_item_count = 1;
    var html = '<div style="font-size: 22px; padding-bottom: 20px; font-weight: bold; text-align: center; color: #4F6C83;">'+name+'</div>'+
    	'<div style="color: #13A89F; font-size: 20px; font-weight:bold; padding-bottom: 20px;">@ TZS '+number_format(amount)+'</div>'+
                   ' <span class="input-group-btn" style="text-align: right;">'+
                        '<div style="background-color: #4F6C83; color: white; padding: 10px 15px 10px 15px;" onclick="new_cart_quantity_substract()" class="btn btn-default btn-number"  >'+
                            '<span class="glyphicon glyphicon-minus"></span>'+
                        '</div>'+
                    '</span>'+
                    '<span class="input-group-btn">'+
                        '<h4 style="font-weight: bold; padding-top: 0px; font-size: 25px; " id="new_count_label">1</h4>'+
                           
                       
                    '</span>'+
                    '<span class="input-group-btn" style="text-align: left;">'+
                        '<div  style="background-color: #4F6C83;  color: white; padding: 10px 15px 10px 15px;" onclick="new_cart_quantity_add()" class="btn btn-default btn-number" >'+
                            '<span class="glyphicon glyphicon-plus"></span>'+
                        '</div>'+
                    '</span>'+    	

    	'<center>'+
          '<div class="row" style="margin-top: 40px;">'+


          '<div class="col-xs-12 col-sm-12 col-md-12">'+
              '<span  onclick="swal.close();" style="max-width: 100px; background-color: #4F6C83; color: white; padding: 15px 15px 15px 15px; font-size: 18px; border-radius: 4px; margin: 60px 5px 5px 5px;">'+
              'Cancel'+
            '</span>'+        
            '<span onclick="add_cart('+id+', \'shop\')" style="max-width: 100px;  background-color: #13A89F; color: white; padding: 15px 15px 15px 15px; font-size: 18px; border-radius: 4px; margin: 60px 5px 5px 5px;">'+
    		      'Submit'+
    	      '</span>'+

          '</div>'+
          '</div>'+
      '</center>';
    swal({
    	html: true, 
      title: "",
      text: html,
      showConfirmButton: false,
      showCancelButton: false
    });
}

   function new_cart_quantity_add(){
      new_item_count++;
       $("#new_count_label").html(new_item_count);
    }


    function new_cart_quantity_substract(){
      if(new_item_count>1){
          new_item_count--;
          $("#new_count_label").html(new_item_count);        
      }
    }

function add_cart(id, flag){
	fc_loading('Please wait..');
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://fixchap.com/dev/pickgo/etc/api/cart/add",
	  "method": "POST",
	  "headers": {
	    "Content-Type": "application/json",
	    "cache-control": "no-cache"
	  },
	  "processData": false,
	   "data": "{\"user_mobile\":\""+localStorage.mobile_number+"\",\"user_name\":\""+localStorage.first_name+' '+localStorage.last_name+"\",\"product_id\":\""+id+"\",\"user_id\": \""+localStorage.user_id+"\",\"product_quantity\": \""+new_item_count+"\"}"
	}

	$.ajax(settings).done(function (response) {
      var data = JSON.parse(response);
      $(".fixchap-connection").css('display','none');
      if(data.success){
  			if(flag == 'shop'){
          swal.close();
          sync();
          onBackKeyDown();
  			} else if(flag == 'checkout'){
          swal.close();
          sync();
          navigate("carts");
  			}
      } else {
      	fc_error(data.message);
      }
	}).fail(function(){
		fc_error("Failed to add cart. Connection Error!");
	});	
}

function delete_cart_item(id){
  fc_loading('Please wait..');
  
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/cart/remove",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
     "data": "{\"id\":\""+id+"\"}"
  }

  $.ajax(settings).done(function (response) {
      var data = JSON.parse(response);
      $(".fixchap-connection").css('display','none');
      if(data.success){
          navigate("carts");
      } else {
        fc_error("Failed to remove item.");
      }
  }).fail(function(){
    fc_error("Failed to remove item. Connection Error!");
  });
}


function list_carts(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/cart/list",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": "{\"user_id\":\""+localStorage.user_id+"\"}"
  };

  $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);

        if(data.success){
          localStorage.cart_to_local = JSON.stringify(data.carts);
          var cart_list_content = '';
            for(var i in data.carts){ 
              var thelist = '';
              var items_count = cart_total = 0;
              for(var j in data.carts[i].items){

                items_count++;
                cart_total += data.carts[i].items[j].product_price*data.carts[i].items[j].cart_product_quantity;
                thelist += ''+
                    '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; ">'+
                      '<div class="row" style="padding: 10px; border-bottom: 1px solid #C0C9D0;">'+
                        '<div class="col-xs-2 col-sm-1 col-md-1">'+
                         ' <div style="margin-top: 90%;" onclick="delete_cart_item('+data.carts[i].items[j].cart_product_id+')"><img src="./images/trash_icon.png" style="width: 20px;" /></div>'+
                        '</div>'+
                       ' <div class="col-xs-5 col-sm-5 col-md-5" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+data.carts[i].items[j].product_name+'</div>'+
                          '<div style="color: #13A89F; padding-top: 7px;">@ TZS '+number_format(data.carts[i].items[j].product_price)+'</div>'+
                        '</div>'+
                        '<div class="col-xs-5 col-sm-6 col-md-6">'+
                          '<div class="input-group" style="margin-top: 20%;">'+
                             ' <span class="input-group-btn">'+
                                  '<button type="button" onclick="cart_quantity_substract('+data.carts[i].items[j].cart_product_id+','+data.carts[i].items[j].product_price+','+data.carts[i].cart_id+')" class="btn btn-default btn-number"  >'+
                                      '<span class="glyphicon glyphicon-minus"></span>'+
                                  '</button>'+
                              '</span>'+
                              '<input type="text" id="quantity'+data.carts[i].items[j].cart_product_id+'" class="form-control input-number"  style="background-color: white; text-align: center; padding: 0px 5px 0px 5px; min-width: 30px;" value="'+data.carts[i].items[j].cart_product_quantity+'" min="1" max="20" disabled>'+
                              '<span class="input-group-btn">'+
                                  '<button type="button" onclick="cart_quantity_add('+data.carts[i].items[j].cart_product_id+','+data.carts[i].items[j].product_price+','+data.carts[i].cart_id+')" class="btn btn-default btn-number" >'+
                                      '<span class="glyphicon glyphicon-plus"></span>'+
                                  '</button>'+
                              '</span>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                '';
              }

              if(items_count>0){


               cart_list_content += ''+
                    '<div class="panel-group" id="accordion'+data.carts[i].store_id+'" style="margin: 10px;">'+
                        '<div class="panel panel-default"><a data-toggle="collapse" data-parent="#accordion" href="#324'+data.carts[i].store_id+'" style="text-decoration: none; color: black;"><div class="panel-heading" style="background-color: #4F6C83; color: white;"><h4 class="panel-title" style="text-align: left;">'+data.carts[i].store_name+' <small style="color: white;"> Click to View</small></h4></div></a>'+
                          '<div id="324'+data.carts[i].store_id+'" class="panel-collapse collapse">'+
                            '<div class="panel-body">'+thelist+
                                  '<input type="hidden" value="'+cart_total+'" id="cart_total'+data.carts[i].cart_id+'"/>'+
                                  '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                                    '<div style="text-align: center; padding-top: 20px; font-size: 20px;">Total TZS <font id="total_label'+data.carts[i].cart_id+'">'+number_format(cart_total)+'</font></div>'+
                                    '<div style="padding: 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="submit_cart('+data.carts[i].cart_id+',\''+data.carts[i].store_name+'\')">Submit</div>'+
                                  '</div>'+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '';





                // cart_list_content += ''+
                //     '<div>'+
                //       '<div class="col-xs-12 col-sm-12" style=" margin-top: 20px; background-color: #4F6C83; padding: 10px 10px 10px 30px; border-top-left-radius: 12px; border-top-right-radius: 12px; color: white; font-size: 16px; ">'+
                //         data.carts[i].store_name+
                //       '</div>'+thelist+
                //       '<input type="hidden" value="'+cart_total+'" id="cart_total'+data.carts[i].cart_id+'"/>'+
                //       '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                //         '<div style="text-align: center; padding-top: 20px; font-size: 20px;">Total TZS <font id="total_label'+data.carts[i].cart_id+'">'+number_format(cart_total)+'</font></div>'+
                //         '<div style="padding: 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="submit_cart('+data.carts[i].cart_id+',\''+data.carts[i].store_name+'\')">Submit</div>'+
                //       '</div>'+
                //     '</div>'+
                // ''; 
            
              }
            }
            
            swal.close();
            $("#carts_list").html('');
             $("#carts_list").html(cart_list_content);
            // $("#carts_loader").css('display','none');
        } else {
          fc_error("Failed to list carts.");
        }
  }).fail(function(){
    fc_error("Failed to list carts. Connection Error!");
  }); 

}

function cart_quantity_add(x, amount, cart_id){
  
  var current_value = $("#quantity"+x).val();
  current_value++;
  $("#quantity"+x).val(current_value);

  var total = $("#cart_total"+cart_id).val()*1;
  total += amount;
  $("#cart_total"+cart_id).val(total);

  $("#total_label"+cart_id).html(number_format(total));

  var update_local = JSON.parse(localStorage.cart_to_local);
  
  for(var i in update_local){  
      for(var j in update_local[i].items){
        if(update_local[i].items[j].cart_product_id == x){
          update_local[i].items[j].cart_product_quantity = current_value;
        }
      }
  }

  localStorage.cart_to_local = JSON.stringify(update_local);

  update_cart();
}

function cart_quantity_substract(x, amount, cart_id){

  var current_value = $("#quantity"+x).val();
  if(current_value-1 > 0){
      current_value--;
      $("#quantity"+x).val(current_value);

      var total = $("#cart_total"+cart_id).val()*1;
      total -= amount;
      $("#cart_total"+cart_id).val(total);

      $("#total_label"+cart_id).html(number_format(total));   

      var update_local = JSON.parse(localStorage.cart_to_local);
      
      for(var i in update_local){  
          for(var j in update_local[i].items){
            if(update_local[i].items[j].cart_product_id == x){
              update_local[i].items[j].cart_product_quantity = current_value;
            }
          }
      }

      localStorage.cart_to_local = JSON.stringify(update_local);

  }

  update_cart();
}

function update_cart(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/cart/update",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": localStorage.cart_to_local
  };

  $.ajax(settings).done(function (response) {
  
  });  
}







function submit_cart(cart_id, store_name){


  swal({
      title: "Are you sure?",
      text: "Submit order to "+store_name+".",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#13A89F",
      iconColor: '#13A89F',
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true },
      function (isConfirm) {

        if (isConfirm) {
          fc_loading('Please wait..');
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://fixchap.com/dev/pickgo/etc/api/cart/update",
              "method": "POST",
              "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": localStorage.cart_to_local
            };

            $.ajax(settings).done(function (response) {
              var data = JSON.parse(response);
                if(data.success){
                    var settings = {
                      "async": true,
                      "crossDomain": true,
                      "url": "https://fixchap.com/dev/pickgo/etc/api/order/add",
                      "method": "POST",
                      "headers": {
                        "Content-Type": "application/json",
                        "cache-control": "no-cache"
                      },
                      "processData": false,
                       "data": "{\"platform\":\""+localStorage.platform+"\",\"cart_id\":\""+cart_id+"\",\"user_id\": \""+localStorage.user_id+"\"}"
                    };

                    $.ajax(settings).done(function (response) {
                        var data = JSON.parse(response);
                        if(data.success){
                            fc_success("Order Submited", "Please wait for confirmation from the store.");
                            navigate("orders");
                        } else {
                          fc_error(data.message);
                        }
                    }).fail(function(){
                        fc_error("Failed to submit request. Connection Error!");
                    });    
                } else {
                  fc_error("Failed to submit request. (Error Code: 281)");
                }    
            }).fail(function(){
                fc_error("Failed to submit request. Connection Error!");
            });
        } 
      }
    );  


 
}

function list_pickup_orders(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/order/list/client_pickup",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": "{\"user_id\":\""+localStorage.user_id+"\"}"
  };

  $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);

        if(data.success){
            var order_list_content = '';
            for(var i in data.orders){ 

              
              var thelist = '';


              var action_button = '<br><br>';

              if(data.orders[i].order_status=="CONFIRMED"){
                 action_button = '<div style="padding: 13px 13px 13px 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="checkout_order('+data.orders[i].order_id+')">Checkout</div>';
              } else if (data.orders[i].order_status=="REVERTED"){
                  action_button = '<div style="padding: 13px 13px 13px 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="send_to_cart('+data.orders[i].order_id+')">Send Back to Cart</div>';
              } 



              // console.log(data.orders[i]);
              var cart_total = 0;
              for(var j in data.orders[i].carts.items){


                cart_total += data.orders[i].carts.items[j].product_price*data.orders[i].carts.items[j].cart_product_quantity;
                thelist += ''+
                    '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; ">'+
                      '<div class="row" style="padding: 10px; border-bottom: 1px solid #C0C9D0;">'+
                        ' <div class="col-xs-1 col-sm-1 col-md-1" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+(j*1+1)+'.</div>'+
                        '</div>'+
                       ' <div class="col-xs-8 col-sm-8 col-md-8" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+data.orders[i].carts.items[j].product_name+'</div>'+
                          '<div style="color: #13A89F; padding-top: 7px;">@ TZS '+number_format(data.orders[i].carts.items[j].product_price)+'</div>'+
                        '</div>'+
                        '<div class="col-xs-2 col-sm-2 col-md-2">'+
                          '<div class="input-group" style="margin-top: 0%;">'+
                              '<div style="text-align: right; font-size: 18px;">'+data.orders[i].carts.items[j].cart_product_quantity+'</div>'+
                             
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                '';
              }


               order_list_content += ''+
                    '<div class="panel-group" id="accordion'+data.orders[i].order_id+'" style="margin: 10px;">'+
                        '<div class="panel panel-default"><a data-toggle="collapse" data-parent="#accordion" href="#325'+data.orders[i].order_id+'" style="text-decoration: none; color: black;"><div class="panel-heading" style="background-color: #4F6C83; color: white;"><h4 class="panel-title" style="text-align: left;">#'+leading_zero(data.orders[i].order_id)+' - '+data.orders[i].carts.store_name+' <small style="color: white;"> Click to View</small> </h4></div></a>'+
                          '<div id="325'+data.orders[i].order_id+'" class="panel-collapse collapse">'+
                            '<div class="panel-body">'+thelist+
                              '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                                '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                                '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                                                    '<div class="row" style="margin-top: 30px;">'+
                                                        '<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
                                                              '<div style="text-align: center;">Pickup Code:</div>'+
                                                               '<div style="text-align: center; color:#4F6C83; font-size: 25px; font-weight: bold;">'+data.orders[i].order_pickup_code+'</div>'+
                                                        '</div>'+
                                                    '</div>'+

                                action_button+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '';



           
                // order_list_content += ''+
                //     '<div>'+
                //       '<div class="col-xs-12 col-sm-12" style=" margin-top: 20px; background-color: #4F6C83; padding: 10px 10px 10px 30px; border-top-left-radius: 12px; border-top-right-radius: 12px; color: white; font-size: 16px; ">'+
                //         'Order #'+data.orders[i].order_id+' - '+data.orders[i].carts.store_name+
                //       '</div>'+thelist+
                //       '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                //         '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                //         '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                //         action_button+
                //       '</div>'+
                //     '</div>'+
                // ''; 
            
          
            }
            
            swal.close();
            $("#pick_up_orders_list").html('');
            $("#pick_up_orders_list").html(order_list_content);
            // $("#carts_loader").css('display','none');
        } else {
          fc_error("Failed to list carts.");
        }
  }).fail(function(){
    fc_error("Failed to list carts. Connection Error!");
  });   

}

function leading_zero(x){
  if(x.length == 1){
    return '000'+x;
  } else if (x.length == 2){
    return '00'+x;
  } else if (x.length == 3){
    return '0'+x;
  } else {
    return x;
  }
}


function list_orders(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/order/list/client_pending",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": "{\"user_id\":\""+localStorage.user_id+"\"}"
  };

  $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);

        if(data.success){
            var order_list_content = '';
            for(var i in data.orders){ 

              
              var thelist = '';


              var action_button = '<br><br>';

              if(data.orders[i].order_status=="CONFIRMED"){
                 action_button = '<div style="padding: 13px 13px 13px 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="checkout_order('+data.orders[i].order_id+')">Checkout</div>';
              } else if (data.orders[i].order_status=="REVERTED"){
                  action_button = '<div style="padding: 13px 13px 13px 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="send_to_cart('+data.orders[i].order_id+')">Send Back to Cart</div>';
              } 



              // console.log(data.orders[i]);
              var cart_total = 0;
              for(var j in data.orders[i].carts.items){
                cart_total += data.orders[i].carts.items[j].product_price*data.orders[i].carts.items[j].cart_product_quantity;
                thelist += ''+
                    '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; ">'+
                      '<div class="row" style="padding: 10px; border-bottom: 1px solid #C0C9D0;">'+
                        ' <div class="col-xs-1 col-sm-1 col-md-1" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+(j*1+1)+'.</div>'+
                        '</div>'+
                       ' <div class="col-xs-8 col-sm-8 col-md-8" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+data.orders[i].carts.items[j].product_name+'</div>'+
                          '<div style="color: #13A89F; padding-top: 7px;">@ TZS '+number_format(data.orders[i].carts.items[j].product_price)+'</div>'+
                        '</div>'+
                        '<div class="col-xs-2 col-sm-2 col-md-2">'+
                          '<div class="input-group" style="margin-top: 0%;">'+
                              '<div style="text-align: right; font-size: 18px;">'+data.orders[i].carts.items[j].cart_product_quantity+'</div>'+
                             
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                '';
              }


               order_list_content += ''+
                    '<div class="panel-group" id="accordion'+data.orders[i].order_id+'" style="margin: 10px;">'+
                        '<div class="panel panel-default"><a data-toggle="collapse" data-parent="#accordion" href="#321'+data.orders[i].order_id+'" style="text-decoration: none; color: black;"><div class="panel-heading" style="background-color: #4F6C83; color: white;"><h4 class="panel-title" style="text-align: left;">#'+leading_zero(data.orders[i].order_id)+' - '+data.orders[i].carts.store_name+' <small style="color: white;"> Click to View</small></h4></div></a>'+
                          '<div id="321'+data.orders[i].order_id+'" class="panel-collapse collapse">'+
                            '<div class="panel-body">'+thelist+
                              '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                                '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                                '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                                action_button+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '';



           
                // order_list_content += ''+
                //     '<div>'+
                //       '<div class="col-xs-12 col-sm-12" style=" margin-top: 20px; background-color: #4F6C83; padding: 10px 10px 10px 30px; border-top-left-radius: 12px; border-top-right-radius: 12px; color: white; font-size: 16px; ">'+
                //         'Order #'+data.orders[i].order_id+' - '+data.orders[i].carts.store_name+
                //       '</div>'+thelist+
                //       '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                //         '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                //         '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                //         action_button+
                //       '</div>'+
                //     '</div>'+
                // ''; 
            
          
            }
            
            swal.close();
            $("#orders_list").html('');
            $("#orders_list").html(order_list_content);
            // $("#carts_loader").css('display','none');
        } else {
          fc_error("Failed to list carts.");
        }
  }).fail(function(){
    fc_error("Failed to list carts. Connection Error!");
  }); 

}


function list_completed(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/order/list/client_completed",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": "{\"user_id\":\""+localStorage.user_id+"\"}"
  };

  $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);

        if(data.success){
            var order_list_content = '';
            for(var i in data.orders){ 

              
              var thelist = '';


              var action_button = '<br><br>';

              if(data.orders[i].order_status=="CONFIRMED"){
                 action_button = '<div style="padding: 13px 13px 13px 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="checkout_order('+data.orders[i].order_id+')">Checkout</div>';
              } else if (data.orders[i].order_status=="REVERTED"){
                  action_button = '<div style="padding: 13px 13px 13px 13px; margin: 25px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="send_to_cart('+data.orders[i].order_id+')">Send Back to Cart</div>';
              }

              var action_confirm_pickup = '';

                if(data.orders[i].order_status=="COMPLETED"){
                   action_confirm_pickup = ''+
                    '<div class="row" style="margin-top: -30px;">'+
                        '<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
                              '<div style="text-align: center;">Pickup Code:</div>'+
                               '<div style="text-align: center; color:#4F6C83; font-size: 25px; font-weight: bold;">'+data.orders[i].order_pickup_code+'<br><br></div>'+
                        '</div>'+
                    '</div>'+
                    '';
                } else if (data.orders[i].order_status=="PICKED"){
                  action_confirm_pickup = '<div style="padding: 13px 13px 13px 13px; margin: -10px 0px 25px 0px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="rate_order('+data.orders[i].order_id+',\''+data.orders[i].carts.store_name+'\')">Please Rate</div>';
                } else if (data.orders[i].order_status=="RATED"){
                  action_confirm_pickup = '<div style="margin: -25px 0px 20px 0px;"><center><h4>Reviews</h4>'+rating_display(data.orders[i].order_rate)+'<p>'+data.orders[i].order_rate_comment+'</p></center></div>';
                }


              // console.log(data.orders[i]);
              var cart_total = 0;
              for(var j in data.orders[i].carts.items){
                cart_total += data.orders[i].carts.items[j].product_price*data.orders[i].carts.items[j].cart_product_quantity;
                thelist += ''+
                    '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; ">'+
                      '<div class="row" style="padding: 10px; border-bottom: 1px solid #C0C9D0;">'+
                        ' <div class="col-xs-1 col-sm-1 col-md-1" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+(j*1+1)+'.</div>'+
                        '</div>'+
                       ' <div class="col-xs-8 col-sm-8 col-md-8" >'+
                          '<div style="font-size: 15px; font-weight: bold;">'+data.orders[i].carts.items[j].product_name+'</div>'+
                          '<div style="color: #13A89F; padding-top: 7px;">@ TZS '+number_format(data.orders[i].carts.items[j].product_price)+'</div>'+
                        '</div>'+
                        '<div class="col-xs-2 col-sm-2 col-md-2">'+
                          '<div class="input-group" style="margin-top: 0%;">'+
                              '<div style="text-align: right; font-size: 18px;">'+data.orders[i].carts.items[j].cart_product_quantity+'</div>'+
                             
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                '';
              }

               order_list_content += ''+
                    '<div class="panel-group" id="accordion'+data.orders[i].order_id+'" style="margin: 10px;">'+
                        '<div class="panel panel-default"><a data-toggle="collapse" data-parent="#accordion" href="#322'+data.orders[i].order_id+'" style="text-decoration: none; color: black;"><div class="panel-heading" style="background-color: #4F6C83; color: white;"><h4 class="panel-title" style="text-align: left;">#'+leading_zero(data.orders[i].order_id)+' - '+data.orders[i].carts.store_name+' <small style="color: white;"> Click to View</small> </h4></div></a>'+
                          '<div id="322'+data.orders[i].order_id+'" class="panel-collapse collapse">'+
                            '<div class="panel-body">'+thelist+
                                '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                                  '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                                  '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                                  action_button+action_confirm_pickup+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '';

                // order_list_content += ''+
                //     '<div>'+
                //       '<div class="col-xs-12 col-sm-12" style=" margin-top: 20px; background-color: #4F6C83; padding: 10px 10px 10px 30px; border-top-left-radius: 12px; border-top-right-radius: 12px; color: white; font-size: 16px; ">'+
                //         'Order #'+data.orders[i].order_id+' - '+data.orders[i].carts.store_name+
                //       '</div>'+thelist+
                //       '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                //         '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                //         '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                //         action_button+action_confirm_pickup+
                //       '</div>'+
                //     '</div>'+
                // ''; 


           
                // order_list_content += ''+
                //     '<div>'+
                //       '<div class="col-xs-12 col-sm-12" style=" margin-top: 20px; background-color: #4F6C83; padding: 10px 10px 10px 30px; border-top-left-radius: 12px; border-top-right-radius: 12px; color: white; font-size: 16px; ">'+
                //         'Order #'+data.orders[i].order_id+' - '+data.orders[i].carts.store_name+
                //       '</div>'+thelist+
                //       '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                //         '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                //         '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                //         action_button+action_confirm_pickup+
                //       '</div>'+
                //     '</div>'+
                // ''; 
            
          
            }
            
            swal.close();
            $("#completed_list").html('');
            $("#completed_list").html(order_list_content);
            // $("#carts_loader").css('display','none');
        } else {
          fc_error("Failed to list carts.");
        }
  }).fail(function(){
    fc_error("Failed to list carts. Connection Error!");
  }); 

}

function list_myshop(x){
    // myShopNew myShopWaiting myShopCompleted
    $("#shop_orders_list").html('');
    
    $("#my_shop_loader").css('display','block');

    $(".myShop").removeClass( "myShopActive" );
    var filter = '';
    if(x == 'new'){
        $(".myShop").removeClass( "myShopActive" );
        $("#myShopNew").addClass( "myShopActive" );
        filter = 'store_new';
    } else if (x == 'pending'){
        $(".myShop").removeClass( "myShopActive" );
        $("#myShopWaiting").addClass( "myShopActive" );
        filter = 'store_pending';
    } else if(x == 'completed'){
        $(".myShop").removeClass( "myShopActive" );
        $("#myShopCompleted").addClass( "myShopActive" );     
         filter = 'store_completed';
    } else if(x == 'pickup'){
        $(".myShop").removeClass( "myShopActive" );
        $("#myShopPickup").addClass( "myShopActive" );     
         filter = 'store_pickup';
    }

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fixchap.com/dev/pickgo/etc/api/order/list/"+filter,
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": "{\"user_id\":\""+localStorage.user_id+"\"}"
    };

    $.ajax(settings).done(function (response) {
          var data = JSON.parse(response);

          if(data.success){
              var order_list_content = '';
              for(var i in data.orders){ 

                
                var thelist = '';


                var action_button = '<br><br>';

                if(data.orders[i].order_status=="WAITING"){
                   action_button = ''+
                    '<div class="row" style="margin-top: 30px; margin-bottom: 20px;">'+
      '<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
      '<center>'+
              '<span  onclick="revert_order('+data.orders[i].order_id+')" style="max-width: 100px; background-color: #4F6C83; color: white; padding: 15px 15px 15px 15px; font-size: 18px; border-radius: 4px; margin: 60px 5px 5px 5px;">'+
              'Revert'+
            '</span>'+        
            '<span  onclick="confirm_order('+data.orders[i].order_id+')" style="max-width: 100px;  background-color: #13A89F; color: white; padding: 15px 15px 15px 15px; font-size: 18px; border-radius: 4px; margin: 60px 5px 5px 5px;">'+
              'Confirm'+
            '</span>'+
             '</div>'+

             '<center>'+
                    '</div>'+
                    '';

                }

                var action_confirm_pickup = '';
                

                if(data.orders[i].order_status=="COMPLETED"){
                   action_confirm_pickup = ''+
                    '<div class="row" style="margin-top: -30px;">'+
                        '<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
                              '<div style="text-align: center;">Pickup Code:</div>'+
                               '<div style="text-align: center; color:#4F6C83; font-size: 25px; font-weight: bold;">'+data.orders[i].order_pickup_code+'</div>'+
                        '</div>'+
                        '<div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">'+
                              '<div style="padding: 13px 13px 13px 13px; margin: 10px 0px 20px 0px; background-color: #13A89F; color: white; text-align: center; font-size: 18px; border-radius: 12px;" onclick="confirm_pickup('+data.orders[i].order_id+',\''+data.orders[i].order_pickup_code+'\')">Confirm Pickup</div>'+
                        '</div>'+
                    '</div>'+
                    '';
                } else if(data.orders[i].order_status=="RATED"){
                  action_confirm_pickup = '<div style="margin: -25px 0px 20px 0px;"><center><h4>Reviews</h4>'+rating_display(data.orders[i].order_rate)+'<p>'+data.orders[i].order_rate_comment+'</p></center></div>';
                }

                // console.log(data.orders[i]);
                var cart_total = 0;
                for(var j in data.orders[i].carts.items){
                  cart_total += data.orders[i].carts.items[j].product_price*data.orders[i].carts.items[j].cart_product_quantity;
                  thelist += ''+
                      '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; ">'+
                        '<div class="row" style="padding: 10px; border-bottom: 1px solid #C0C9D0;">'+
                          ' <div class="col-xs-1 col-sm-1 col-md-1" >'+
                            '<div style="font-size: 15px; font-weight: bold;">'+(j*1+1)+'.</div>'+
                          '</div>'+
                         ' <div class="col-xs-8 col-sm-8 col-md-8" >'+
                            '<div style="font-size: 15px; font-weight: bold;">'+data.orders[i].carts.items[j].product_name+'</div>'+
                            '<div style="color: #13A89F; padding-top: 7px;">@ TZS '+number_format(data.orders[i].carts.items[j].product_price)+'</div>'+
                          '</div>'+
                          '<div class="col-xs-2 col-sm-2 col-md-2">'+
                            '<div class="input-group" style="margin-top: 0%;">'+
                                '<div style="text-align: right; font-size: 18px;">'+data.orders[i].carts.items[j].cart_product_quantity+'</div>'+
                               
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                  '';
                }

               order_list_content += ''+
                    '<div class="panel-group" id="accordion'+data.orders[i].order_id+'" style="margin: 10px;">'+
                        '<div class="panel panel-default">'+
                           '<a data-toggle="collapse" data-parent="#accordion" href="#323'+data.orders[i].order_id+'" style="text-decoration: none; color: black;">'+
                              '<div class="panel-heading" style="background-color: #4F6C83; color: white;">'+
                                  '<h4 class="panel-title" style="text-align: left;">'+
                                      'Order #'+leading_zero(data.orders[i].order_id)+' - '+ 
                                      // data.orders[i].carts.store_name+
                                      ' <small style="color: white;"> Click to View</small>'+
                                  '</h4>'+
                              '</div>'+
                            '</a>'+
                          '<div id="323'+data.orders[i].order_id+'" class="panel-collapse collapse">'+
                            '<div class="panel-body">'+thelist+
                              '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                                '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                                '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                                action_button+action_confirm_pickup+
                                '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                    '</div>'+
                '';


             
                  // order_list_content += ''+
                  //     '<div>'+
                  //       '<div class="col-xs-12 col-sm-12" style=" margin-top: 20px; background-color: #4F6C83; padding: 10px 10px 10px 30px; border-top-left-radius: 12px; border-top-right-radius: 12px; color: white; font-size: 16px; ">'+
                  //         'Order #'+data.orders[i].order_id+' - '+data.orders[i].carts.store_name+
                  //       '</div>'+thelist+
                  //       '<div class="col-xs-12 col-sm-12" style="background-color: white; color: #4F6C83; border-bottom-right-radius: 12px; border-bottom-left-radius: 12px;">'+
                  //         '<div style="text-align: center; padding-top: 20px; font-size: 17px;">'+data.orders[i].order_status_desc+'</font></div>'+
                  //         '<div style="text-align: center; padding-top: 10px; font-size: 25px; font-weight: bold; color: #13A89F;">TZS <font>'+number_format(cart_total)+'</font></div>'+
                  //         action_button+action_confirm_pickup+
                  //       '</div>'+
                  //     '</div>'+
                  // ''; 

                 
              
            
              }
              
              swal.close();
              $("#shop_orders_list").html('');
              $("#my_shop_loader").css('display','none');
              $("#shop_orders_list").html(order_list_content);
              // $("#carts_loader").css('display','none');
          } else {
            fc_error("Failed to list carts.");
          }
    }).fail(function(){
      fc_error("Failed to list carts. Connection Error!");
    }); 
   
}


function confirm_order(id){
  swal({
      title: "Are you sure?",
      text: "Confirm order #"+id+".",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#13A89F",
      iconColor: '#13A89F',
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true },
      function (isConfirm) {

        if (isConfirm) {
          fc_loading('Please wait..');
            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://fixchap.com/dev/pickgo/etc/api/order/confirm",
              "method": "POST",
              "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
              },
              "processData": false,
              "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\":\""+id+"\"}"
            };

            $.ajax(settings).done(function (response) {
              var data = JSON.parse(response);
                if(data.success){

                  fc_success("Confirmed!", 'Order #'+id+' confimred for checkout.');

                  setTimeout(function() {
                    list_myshop('new');
                  }, 3000);

                } else {
                  fc_error("Operation failed. (Error Code: 580)");
                }    
            }).fail(function(){
                fc_error("Operation failed. Connection Error!");
            });
        } 
      }
    );  


}


function checkout_order(order_id){
          // fc_loading('Please wait..');
          //   var settings = {
          //     "async": true,
          //     "crossDomain": true,
          //     "url": "https://fixchap.com/dev/pickgo/etc/api/order/checkout",
          //     "method": "POST",
          //     "headers": {
          //       "Content-Type": "application/json",
          //       "cache-control": "no-cache"
          //     },
          //     "processData": false,
          //     "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\":\""+order_id+"\"}"
          //   };

          //   $.ajax(settings).done(function (response) {
          //     var data = JSON.parse(response);
          //       if(data.success){
          //         fc_error(data.instructions);
          //       } else {
          //         fc_error("Operation failed. (Error Code: 616)");
          //       }    
          //   }).fail(function(){
          //       fc_error("Operation failed. Connection Error!");
          //   });
        var mobile_money = '<div><img class="pg_mobilePay" onclick="receiveCash('+order_id+')" src="images/mpesa.jpg" width="100%"/></div>'+
        '<div><img class="pg_mobilePay" onclick="receiveCash('+order_id+')" src="images/tigopesa.jpg" width="100%"/></div>'+
        '<div><img class="pg_mobilePay" onclick="receiveCash('+order_id+')" src="images/airtelmoney.jpg" width="100%"/></div>'+
        '<div style="padding-top: 20px;"><center><button onclick="bootbox.hideAll();" style="background-color: #B2AFAF;  color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Back</button></center></div>'+
        '';

        bootbox.alert({
            message: mobile_money
        }).find('.modal-content').css({ 
            'margin-top': function (){
                var w = $( window ).height(); 
                var b = $(".modal-dialog").height(); 
                var h = (w-b)/4; 
                return h+"px"; 
            } 
        });
        $(".bootbox-close-button").css('display','none');
        $(".modal-footer").css('display','none'); 



}

function receiveCash(order_id){
  bootbox.hideAll();
  fc_loading("Please wait..");
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://fixchap.com/dev/pickgo/etc/api/order/receive_cash",
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\":\""+order_id+"\"}"
  };

  $.ajax(settings).done(function (response) {
    var data = JSON.parse(response);
      if(data.success){
        navigate("completed");
      } else {
        fc_error("Operation failed. (Error Code: 715)");
      }    
  }).fail(function(){
      fc_error("Operation failed. Connection Error!");
  }); 


}

function revert_order(order_id){
        var revert_panel = ''+
            '<center style padding: 0px;><h3 style="color: #13A89F; font-size:15px; line-height: 22px;">Write Revert Descriptions</h3>'+
            '<textarea spellcheck="false" id="revert_text" rows="4" style="font-size: 17px; text-align: left; border: 1px solid #13A89F; width: 100%;"></textarea>'+
            '<div style="color: #e13247; font-size: 12px;" id="login_error_msg">&nbsp;</div>'+
            '<button onclick="bootbox.hideAll();" style="background-color: #B2AFAF; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Cancel</button>'+
            '<button onclick="revert_order_submit('+order_id+')" style="background-color: #13A89F; margin-top: 10px; color: white; padding: 10px 15px 10px 15px; font-size: 12px; border-radius: 4px; margin: 5px;">Revert</button>'+
            '</center>'+
        '';

        bootbox.alert({
            message: revert_panel
        }).find('.modal-content').css({ 
            'margin-top': function (){
                var w = $( window ).height(); 
                var b = $(".modal-dialog").height(); 
                var h = (w-b)/4; 
                return h+"px"; 
            } 
        });
        $(".bootbox-close-button").css('display','none');
        $(".modal-footer").css('display','none'); 
}


function revert_order_submit(order_id){
  if( $("#revert_text").val().trim() == ''){
      fc_error("Enter revert descriptions.")
  } else {
      fc_loading("Please wait..");
      var revert_text = $("#revert_text").val().trim();
      revert_text = revert_text.replace("\"", "'");
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/pickgo/etc/api/order/revert",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\":\""+order_id+"\",\"revert_text\":\""+revert_text+"\"}"
      };

      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
          if(data.success){

            bootbox.hideAll();
             fc_success("Submited!", 'Revert completed!');
              setTimeout(function() {
                list_myshop('new');
              }, 1000);
          } else {
            fc_error("Operation failed. (Error Code: 580)");
          }    
      }).fail(function(){
          fc_error("Operation failed. Connection Error!");
      });
  }
}

function send_to_cart(order_id){
      fc_loading("Please wait..");
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://fixchap.com/dev/pickgo/etc/api/order/send_to_cart",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\":\""+order_id+"\"}"
      };

      $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
          if(data.success){
            navigate("carts");
          } else {
            fc_error("Operation failed. (Error Code: 715)");
          }    
      }).fail(function(){
          fc_error("Operation failed. Connection Error!");
      });  
}

function confirm_pickup(order_id,code){
  swal({
      title: "Are you sure?",
      text: "Confirm order #"+order_id+" pickup. (Code: "+code+")",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#13A89F",
      iconColor: '#13A89F',
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: true },
      function (isConfirm) {

        if (isConfirm) {
      fc_loading("Please wait..");
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://fixchap.com/dev/pickgo/etc/api/order/confirm_pickup",
            "method": "POST",
            "headers": {
              "Content-Type": "application/json",
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\":\""+order_id+"\"}"
          };

          $.ajax(settings).done(function (response) {
            var data = JSON.parse(response);
              if(data.success){
                      fc_success("Confirmed!", 'Order #'+order_id+' confirmed pickup.');

                      setTimeout(function() {
                        list_myshop('completed');
                      }, 3000);
              } else {
                fc_error("Operation failed. (Error Code: 917)");
              }    
          }).fail(function(){
              fc_error("Operation failed. Connection Error!");
          }); 
        } 
      }
    );  
}

function rate_order(order_id, store_name){
  text = '<h3 style="text-align: center; font-size: 20px; color: #13A89F;">Rate Order #'+order_id+' </h3>'+
    '<p style="text-align: center; font-size: 16px; line-height: 20px; color: #4f6b83;">How was your experience with '+store_name+'?</p>'+
    
          '<div style="margin-top: 20px;"><center>'+
            '<div style="margin-top: -5px; font-size: 12px; margin-bottom: 5px;" id="rate-translate">&nbsp;</div>'+
        '<div class="rate" style="color: #00a89f; font-size: 35px; line-height: 1; text-align: center; with: 100%;"></div>'+
            
          '</center></div>'+
          '<div class="pre-rating-btn" style="height: 140px;"></div>'+
          '<div id="rating-btn" style="display: none;">'+
            '<textarea id="customer_comments" class="textarea" rows="3" placeholder="Describe your experience (optional)"></textarea>'+
        '<div>'+
              '<center><div onclick="submit_rating('+order_id+',\''+store_name+'\')" style="background-color: #13A89F; max-width: 90px; color: white; margin-top: 20px; padding: 10px; border-radius: 5px;">Submit</div></center>'+
            '</div>'+
          '</div>';
    swal({
    html: true, 
      title: "",
      text: text,
      showConfirmButton: false,
      showCancelButton: false
    }); 


     var options = {
        max_value: 5,
        step_size: 1,
    }
    $(".rate").rate(options);

    $(".rate").on("change", function(ev, data){
      if(data.to >= 1){ 
        $(".pre-rating-btn").css('display','none');
        $("#rating-btn").css('display','block');
      } 

        localStorage.ratingReport = data.to;

        if(data.to == 1){
          $("#rate-translate").html('Terrible');
        } else if (data.to == 2){
          $("#rate-translate").html('Bad');
        } else if (data.to == 3){
          $("#rate-translate").html('Average');
        } else if (data.to == 4){
          $("#rate-translate").html('Good');
        } else if (data.to == 5){
          $("#rate-translate").html('Great');
        }
    });
}

function submit_rating(order_id, store_name){
  var client_comments = $("#customer_comments").val();
  client_comments = client_comments.replace("\"", "'");
  fc_loading('Submitting review..');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://fixchap.com/dev/pickgo/etc/api/order/rate",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "processData": false,
      "data": "{\"user_id\":\""+localStorage.user_id+"\",\"order_id\": \""+order_id+"\",\"rate\": \""+localStorage.ratingReport+"\",\"comments\": \""+client_comments+"\"}"
    };
    $.ajax(settings).done(function (response) {
      var data = JSON.parse(response);
      if(data.success){ 
        fc_success('Thank you for your feedback!','Reviews submitted.');
        setTimeout(function() { navigate("completed"); }, 2000);  
         
      } else {
        fc_loading('Failed to submit your review! Please try again.');
        setTimeout(function() { rate_order(order_id, store_name); }, 3000);        
      }
    }).fail(function() {
        fail_submitting_review();
    });  
}




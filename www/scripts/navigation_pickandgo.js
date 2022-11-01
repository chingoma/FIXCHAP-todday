var go_back_array = ["fixchap"];

function goBack(x){
    if($('.sweet-alert').is(':visible')){
        swal.close();
    } else if ( $('.bootbox').hasClass('in') ) {
        bootbox.hideAll();
    } else if(x == 'fixchap'){
        window.location = 'index.html';
    } else {
        go_back_array.pop();
        navigate(x);
    }  
}

function onBackKeyDown() {
    goBack(go_back_array[go_back_array.length-1]);
}

function navigate(page){
	$(".pg_page").css('display','none');
	$("#pg_menu_icon").css('display','none');
	$("#pg_back_icon").css('display','none');
	$("#pg_page_stores").css('display','none');
	$("#pg_page_cats").css('display','none');
	$("#pg_page_carts").css('display','none');

	
	$('body').scrollTop(0);


	if(page == "completed"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_completed").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_completed();
      	
		
	} else if(page == "orders"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_orders").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_orders();
      	
		
	} else if(page == "pickup"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_pickuporders").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_pickup_orders();
      	
		
	} else if(page == "myshop"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_myshop").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_myshop('new');
      	

	} else if(page == "myshop_new"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_myshop").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_myshop('new');
      	

	} else if(page == "myshop_waiting"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_myshop").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_myshop('pending');
      	

	}else if(page == "myshop_pickup"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_myshop").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_myshop('pickup');
      	

	}else if(page == "myshop_completed"){
		// $("#orders_loader").css('display','block');
		$("#pg_page_myshop").css('display','block');
		$("#pg_back_icon").css('display','block');
      	go_back_array = ["stores"];
      	// go_back_array.push("home");	
		fc_loading('Loading..');

		list_myshop('completed');
      	

	}
	else if(page == "stores"){
		$("#pg_page_stores").css('display','block');
		$("#pg_menu_icon").css('display','block');
      	go_back_array = ["fixchap"];
      	// go_back_array.push("home");	
      	
		
	} else if (page == "cats"){ 
		$("#cat_loader").css('display','block');
		$("#pg_back_icon").css('display','block');
		$("#pg_page_cats").css('display','block');

		refresh_cat();

      	go_back_array.push("stores");	

	} else if (page == "products"){ 
		$("#product_loader").css('display','block');
		$("#pg_back_icon").css('display','block');
		$("#pg_page_products").css('display','block');

		
		refresh_products();

      	go_back_array.push("cats");	

	} else if (page == "carts"){ 
		$("#carts_loader").css('display','none');
		$("#pg_back_icon").css('display','block');
		$("#pg_page_carts").css('display','block');

		fc_loading('Loading..');

		list_carts();
		
		
      	go_back_array.push("stores");	

	} 


}
// navigate("orders");


var address = window.location.href;
var idArray = address.split("?page=");

if(idArray[1]){
   var page = idArray[1];
   navigate(page);
} else {
	navigate("stores");
}






function navigate(page){
	$(".header-fixed").css('display','none');
	$(".fc-request-header-fix").css('display','none');
	$(".page").css('display','none');
	$("#app_out_map").css('display','block');
	$(".map-address-header").css('display','none');
	$(".fc-search-input").css('display','none');

	
	$('body').scrollTop(0);

	if(page != 'request'){
		localStorage.current_page_request_id = 0;
	}

	if(page == "home"){
		$(".fixchap-home-header").css('display','block');
		$(".page-home").css('display','block');
	} else if (page == "address"){
      	go_back_array = ["exit"];
      	go_back_array.push("home");
		
		$(".fixchap-address-header").css('display','block');
		$(".page-address").css('display','block');

	} else if (page == "time"){
		$(".fixchap-time-header").css('display','block');
		$(".page-time").css('display','block');
		// $(".fc-scheduled-date").trigger("click");
	} else if (page == "review"){
		$("#location_review").html(localStorage.address_name);
		$(".fixchap-review-header").css('display','block');
		$(".page-review").css('display','block');
	} else if (page == "request"){
		$(".fixchap-request-header").css('display','block');
		$(".page-request").css('display','block');
	} 
	else if (page == "on_progress"){
      	go_back_array = ["exit"];
      	go_back_array.push("home");
      	localStorage.pay_mobile = 0;
		$(".fixchap-on_progress-header").css('display','block');
		$(".page-on_progress").css('display','block');
	} 

	else if (page == "completed"){
      	go_back_array = ["exit"];
      	go_back_array.push("home");

		$(".fixchap-completed-header").css('display','block');
		$(".page-completed").css('display','block');
	} 

	else if (page == "settings"){
      	go_back_array = ["exit"];
      	go_back_array.push("home");

		$(".fixchap-settings-header").css('display','block');
		$(".page-settings").css('display','block');
	} 

	else if (page == "recommend_fundi"){
      	go_back_array = ["exit"];
      	go_back_array.push("home");

		$(".fixchap-recommend_fundi-header").css('display','block');
		$(".page-recommend_fundi").css('display','block');
	} 

	else if (page == "map"){
		$("#app_out_map").css('display','none');
		$(".map-address-header").css('display','block');
		$(".fc-search-input").css('display','block');
	}

	else if (page == "pricing"){
      	go_back_array = ["exit"];
      	go_back_array.push("home");

		  if(localStorage.service_id){
			$( "#vp_"+localStorage.service_id ).trigger( "click" );
		  }
		

		$(".fixchap-pricing-header").css('display','block');
		$(".page-pricing").css('display','block');
	}
	bootbox.hideAll();
}

navigate("home");

localStorage.pg_src_frc = 0;

function pickandgoservice(){
    if(localStorage.session == null){
        go_to_address = 420;
        localStorage.pg_src_frc = 13;
        sign_in(420);
    } else {
        window.location="pickandgo.html";             
    }	
}
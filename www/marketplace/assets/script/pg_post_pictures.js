function view_pictures(n){
  if(post_pictures_ready == 1){
    var indicators = '';
    var images = '';

  
    var active = 'active';

    for(var i=1; i<image_index; i++){

      if(i-1==n){
        active = 'active';
      } else {
        active = '';
      }

      indicators += '<li data-target="#carouselExampleIndicators_view" data-slide-to="0" class="'+active+'"></li>';
      images += '<div class="carousel-item '+active+'" style="height: 90vh; position: relative;">'+
            '<img class="d-block mx-auto w-100" style="max-width: 100%; max-height: 100%; position: absolute; top: 0; bottom: 0; margin: auto;"   src="data:image/png;base64,'+image_array[i]+'" alt="First slide">'+
          '</div>';
      active='';
    }

    var photo = ''+
       '<div style="height: 96vh;">'+
       '<div style="height: 88vh; max-height: 88vh;">'+
      '<div id="carouselExampleIndicators_view" class="carousel slide" data-ride="carousel" style="margin: 0px -15px 0px -15px; ">'+
        '<ol class="carousel-indicators">'+
          indicators+
        '</ol>'+
        '<div class="carousel-inner">'+
          images+
        '</div>'+
        '<a class="carousel-control-prev" href="#carouselExampleIndicators_view" role="button" data-slide="prev">'+
          '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
          '<span class="sr-only">Previous</span>'+
        '</a>'+
        '<a class="carousel-control-next" href="#carouselExampleIndicators_view" role="button" data-slide="next">'+
          '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
          '<span class="sr-only">Next</span>'+
        '</a>'+
      '</div>'+
      '</div>'+
      '<div class="row" style="padding-top: 10px;">'+   
      // '<div class="col-12" style="z-index: 99999"><div onclick="bootbox.hideAll();" class="book-btn" style="width: 100%; border: 0px solid white; margin: 0px; background-color: #b3b2b2; text-align: center;">Back</div></div>'+  
    '</div>'+
      '</div>';

   // swal({ html: true, title: "", text: photo, allowOutsideClick: false, showConfirmButton: true});      

         
   // bootbox.alert(photo);

   bootbox.dialog({
       closeButton: false,
       message: photo     
   }).find('.modal-body').css('background-color','black');
   $('.modal-dialog').css('width','100% !important');
   $('.modal-dialog').css('margin','0px');
   // $('.modal-dialog').css('padding','0px !important');

   
   
   $(".carousel").carousel({
       interval: false,
       pause: true
   });

   $('.carousel .carousel-inner').on('dragstart', 'a', function () {
       return false;
   });
  }
}



function previewandcontinue(){
      
    coursel_count++;
     
      
      var indicators = '';
      var images = '';

    
      var active = 'active';

      
      for(var i=0; i<image_index; i++){
        indicators += '<li data-target="#carouselExampleIndicators'+coursel_count+'" data-slide-to="0" class="'+active+'"></li>';
        images += '<div class="carousel-item '+active+'" style="height: 90vh; position: relative;">'+
              '<img class="d-block mx-auto w-100" src="data:image/png;base64,'+image_array[i]+'" style="max-width: 100%; max-height: 100%; position: absolute; top: 0; bottom: 0; margin: auto;" alt="First slide">'+
            '</div>';
        active='';
      }

      var photo = ''+
      '<div style="height: 96vh;">'+
      '<div style="height: 88vh; max-height: 88vh;">'+
        '<div id="carouselExampleIndicators'+coursel_count+'" class="carousel slide" data-ride="carousel">'+
          '<ol class="carousel-indicators">'+
            indicators+
          '</ol>'+
          '<div class="carousel-inner"  style="max-height: 85%;">'+
            images+
          '</div>'+
          '<a class="carousel-control-prev" href="#carouselExampleIndicators'+coursel_count+'" role="button" data-slide="prev">'+
            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
            '<span class="sr-only">Previous</span>'+
          '</a>'+
          '<a class="carousel-control-next" href="#carouselExampleIndicators'+coursel_count+'" role="button" data-slide="next">'+
            '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
            '<span class="sr-only">Next</span>'+
          '</a>'+
        '</div>'+
        '</div>'+
        '<div class="row" style="padding-top: 10px; z-index: 9000;">'+   
          '<div class="col-6"><div onclick="bootbox.hideAll();" class="book-btn" style="width: 100%; border: 0px solid white; margin: 0px; background-color: #b3b2b2; text-align: center; z-index: 9000;">Back</div></div>'+   
          '<div class="col-6"><div onclick="bootbox.hideAll();continue_add_post()" class="book-btn" style="width: 100%; border: 0px solid white; margin: 0px; text-align: center; z-index: 9000">Continue</div></div>'+   
        '</div>'+
        '</div>'; 

       

      bootbox.dialog({
          closeButton: false,
          message: photo     
      }).find('.modal-body').css('background-color','black');
      $('.modal-dialog').css('width','100% !important');
      $('.modal-dialog').css('margin','0px');;         

      $(".carousel").carousel({
          interval: false,
          pause: true
      });
  
      $('.carousel .carousel-inner').on('dragstart', 'a', function () {
          return false;
      }); 
      
      $(".sweet-alert").css("top","20%");
}
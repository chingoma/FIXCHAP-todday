

    var html = ''+
       '<div style="height: 96vh;">'+
        '<div class="row">'+
        '<div class="col-12" style="text-align: center; padding-top: 30vh; font-size: 20px;">Tap "Continue" to agree to the <a href="https://fixchap.com/terms.html" style="text-decoration: none; color: #13A89E;">Service Terms</a> and <a href="https://fixchap.com/privacy.html" style="text-decoration: none; color: #13A89E;">Privacy Policy</a>.</div>'+
        '<div class="col-12" style="z-index: 99999; margin-top: 50px;"><div onclick="bootbox.hideAll(); sliders();" class="book-btn" style="width: 100%; border: 0px solid white; margin: 0px; background-color: #13A79E; text-align: center;">Continue</div></div>'+
        '</div>'+
      '</div>';

  if(!localStorage.marketplace_term){
    bootbox.dialog({
        closeButton: false,
        message: html     
    }).find('.modal-body').css('background-color','white');
    $('.modal-dialog').css('width','100% !important');
    $('.modal-dialog').css('margin','0px');
    localStorage.marketplace_term = true;
  }








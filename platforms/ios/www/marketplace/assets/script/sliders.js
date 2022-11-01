var slider =  localStorage.showmpslider;

function sliders(){
    
    if(localStorage.showmpslider == 0){
       
        $('#the_main_marketplace').show(); 
    } else {
     
        $('#the_main_marketplace').hide(); 
        $("#swiper-slider").show();
    
        var swiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
        });
        
        $( ".snext" ).click(function() {
        swiper.slideNext();
        });
    
        $('.snextom').click(function() {
            if($('input[name="donot"]:checked').length > 0){
                localStorage.showmpslider = 0;
            } 
    
            $("#swiper-slider").hide(); 
            $('#the_main_marketplace').show(); 
            
        });
    }
}
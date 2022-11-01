
autosize(document.querySelectorAll('textarea'));

function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }    
    return new File([u8arr], 'dkdk.png', {type:mime});
}
   


var img_upload_count = 0;

var share_title = '';
var share_desc = ''

function onDeviceReady() {

 
    // $(".share_button").click(function() {
    //     console.log("class share_button clicked");
    //     navigator.share(share_desc,share_title,"text/plain");
    // }


    $(".open_gallery").click(function() {


       window.imagePicker.getPictures(
                function(results) {
                    console.log(results)
                    for (var i = 0; i < results.length; i++) {
                        capture_image(results[i])
                    }
                },
                function (error) {
                    console.log('Error: ' + error);
                },
                 {
                    maximumImagesCount: 10,
                    outputType: window.imagePicker.OutputType.BASE64_STRING,
                    width: 1000,
                    height: 800,
                    quality: 90,
                }
            );
        
    });

    $(".open_camera").click(function() {
        swal({ html: true, title: "", text: '<p style="line-height: 23px;">Processing..</p>', allowOutsideClick: false, showConfirmButton: false});

        navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
            quality: 90,
            targetWidth: 1000,
            targetHeight: 800,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true,
            sourceType: Camera.PictureSourceType.CAMERA,
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: false,
            saveToPhotoAlbum: true
        }); 

    });

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onCameraSuccess(data) {
        StatusBar.overlaysWebView(true);
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#11978E");
        $('.the-footer').removeClass("footer");
        $('.the-footer').addClass("footer");

        let imageFile = reduce_image_file_size(data);
        capture_image(data);
    }

    function onCameraFail(imageURI) {
        StatusBar.overlaysWebView(true);
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#11978E");
        $('.the-footer').removeClass("footer");
        $('.the-footer').addClass("footer");
        $('#overlay').hide();
        $(".choose-upload-method").hide();
        swal.close();
    }


}

$(document).on("deviceready", onDeviceReady);


var myModal = 0;

function add_item_photo() {
    // 

    $('#overlay').show();
   
    $(".choose-upload-method").show();

   
   setTimeout(function() {
    myModal = 1;
  }, 500);


}

$(document).click(function(event) { 
  var $target = $(event.target);
  if(!$target.closest('.overflowswal').length && 
  $('.overflowswal').is(":visible") && myModal == 1) {
    $('.overflowswal').hide();
    $('#overlay').hide();
    myModal = 0;
  }        
});



var remove_id = '';
var remove_index = 0;

function pre_remove_image(id,image_id) {
    if(photo_stage == 0){
        remove_id = image_id;
        remove_index = id;

       //  $('#overlay').show();
       
       //  $(".choose-remove-photo").show();

       
       // setTimeout(function() {
       //      myModal = 1;
     
            var text =  '<div class="row">'+
                            '<div class="col-12 h-left" style="color: #717171; margin-top: -30px; font-size: 16px;">Remove photo?</div>'+
                            '<div class="col-6"></div>'+
                            '<div class="col-3 h-right" onclick="cancel_remove()" style="color: #717171; padding-left:45px; font-size: 14px; color: #13A89F; font-weight: bold;" >NO</div>'+
                            '<div class="col-3 h-left" onclick="remove_image()" style="color: #717171; padding-right:45px; font-size: 14px; color: #13A89F; font-weight: bold;">YES</div>'+
                        '</div>';

            swal({ html: true, title: "", text: text, showConfirmButton: false});
    }            
}  

function remove_image(){
    // $('#overlay').hide();
    // $(".choose-remove-photo").hide();

    $("#"+remove_id).remove();
    const index = remove_index;
    if (index > -1) {
      image_array.splice(index, 1);
    } 
    image_index--;
    img_upload_count--;

    if(image_index == 0){
        image_array = [];
        image_index = 0;
    }


    $("#pictures_count").html('Pictures ('+img_upload_count+'/10) <small style="color: #13A79E"><i>Upload atleast 3 pictures</i></small>');   
    swal.close();

    if(img_upload_count > 9){
        $(".uplbtns").hide();
   } else {
       $(".uplbtns").show();
   }

   if(img_upload_count > 2){
       $("#photo-continue-btn").show();
   } else {
       $("#photo-continue-btn").hide();
   }

   if(img_upload_count > 0){
       $("#photo-delete-instructions").show();
   } else {
       $("#photo-delete-instructions").hide();
   }    
}

function cancel_remove(){
    // $('#overlay').hide();
    // $(".choose-remove-photo").hide(); 
     swal.close();
}


function onBackKeyDown(){
    if( $(".sweet-alert, .visible").length > 0){
        swal.close();
    } else {
        go_back();
    }
}

function getBase64(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const a = reader.result;

            let strImage = a.replace(/^data:image\/[a-z]+;base64,/, "");


        };
        reader.onerror = function (error) {
            console.log('Read Error: ', error);
        };
    }


    async function  reduce_image_file_size(base64, MAX_WIDTH,MAX_HEIGHT){
            let resized_base64 = await new Promise((resolve) => {
                let img = new Image();
                img.src = base64;
                img.onload = () => {
                    let canvas = document.createComment('canvas');
                    let width= img.width;
                    let heigth = img.height;
                    if(width > heigth){
                        if(width > MAX_WIDTH){
                            heigth *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    }else{
                        if(heigth > MAX_HEIGHT){
                            width *= MAX_HEIGHT / heigth;
                            heigth = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = heigth;
                    let ctx = canvas.getContext('2d');
                    ctx.drawImage(img,0,0,width,heigth);
                    resolve(canvas.toDataURL());
                }
            });

            return resized_base64;
    }

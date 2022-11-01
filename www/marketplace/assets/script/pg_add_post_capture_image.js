async function  reduce_image_file_size(base64, MAX_WIDTH,MAX_HEIGHT){
        let resized_base64;
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
            console.log("============================")
            console.log(canvas.toDataURL())
            resized_base64 = canvas.toDataURL()
        }
    return resized_base64;
}

function capture_image(data){

    if(data.length == 1){

    } else {

        img_upload_count++;
  
        var random_number = Math.floor(Math.random() * 100000);

        $(".camera-img").before('' +
            '<div class="col-3 to_d"  style="padding: 2px;" id="img_'+image_index+random_number+'">' +
            '<div class="img-uploading-loader" id="loader_count_'+img_upload_count+'"></div> ' +
            '<img class="item_photo" style="width: 90px; height: 90px; object-fit: cover;" onclick="pre_remove_image('+image_index+',\'img_'+image_index+random_number+'\')"  src="data:image/jpeg;base64,' +data+ '"></div>');
        
        if(img_upload_count < 3){
            $("#pictures_count").html('Pictures ('+img_upload_count+'/10) <small style="color: #13A79E"><i>Upload atleast 3 pictures</i></small>');
        } else {
            $("#pictures_count").html('Pictures ('+img_upload_count+'/10)');
        }
      
       
      
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
        swal.close();
        image_array.push(data);
        image_index++;
    }


  }

  function edit_picture(){
    post_tag_code = localStorage.user_id+'D'+Date.now();
    // var go_on = 0;
    // if(add_item_id != 0){
    //     var settings = {
    //         "async": true,
    //         "crossDomain": true,
    //         "url": "https://fixchap.com/dev/marketplace/etc/api/item/clear_photos",
    //         "method": "POST",
    //         "headers": {
    //             "Content-Type": "application/json"
    //         },
    //         "processData": false,
    //         "data": "{\"user_id\": \""+localStorage.user_id+"\",\"item_id\": \""+add_item_id+"\"}"
    //     };
    //     $.ajax(settings).done(function (response) {
    //         var data = JSON.parse(response); 
    //         if(data.success){
    //             go_on = 1;
    //         } else {
               
    //         }
    //     }).fail(function() {
            
    //     });	        
    // } else {
    //     go_on = 1;
    // }
    // if(go_on == 1){
        $("#photo-continue-btn").show();
        $(".uplbtns").show();
        $("#photo-delete-instructions").show();
        $("#edit_picture_btn").hide();
        photo_stage = 0;
        $("#form-div").attr("style","opacity: 0.3; pointer-events:none;");
    // }
   
  }
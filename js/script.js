$(document).ready(function (){

    $('#uploadImage').change(function(e){
        previewImage(this, $("#previewImg"));
    });

    $('#name').change(function(){
        console.log($('#name').val());
        if($('#name').val() != ""){
            $('#err_name').html("")
        }
    });

    $('#email').change(function(){
        if($('#email').val() !== ""){
            $('#err_email').html("")
        }
    });

    $('#reset').click(function(){
        $("#uploadedImage").attr("src", "");
        $("#previewImg").attr("src", "./img/google_doc.png");
    })

    $("#form").submit(function(e){
        e.preventDefault();


        $.ajax({
            url : "ajax_upload.php",
            type : "POST",
            data : new FormData(this),
            contentType : false,
            cache : false,
            processData : false,
            beforeSend : function (){
                $("#loading").show(300);
            },
            success : function(res){
                console.log(res);
                if(res.status == "success"){
                    $("#uploadedImage").attr("src", res.image_link);
                    $("#previewImg").attr("src", "./img/google_doc.png");
                    errMessageClear();
                }
            },
            error : function(res){
                // console.log(res);
                let resJson = res.responseJSON;
                if(res.status == 422){

                    if(resJson.messages.err_name != ""){
                        $("#err_name").html(resJson.messages.err_name);
                    }

                    if(resJson.messages.err_email != ""){
                        $("#err_email").html(resJson.messages.err_email);
                    }

                    if(resJson.messages.err_image != ""){
                        $("#err_image").html(resJson.messages.err_image);
                    }
                }
                else if(res.status >= 500){
                    $("#err_common").html(resJson.message);
                }
            },
            complete: function(res){
                $("#loading").hide(400);
            }
        });
    });

    function errMessageClear(){
        $("#err_name").html("");
        $("#err_email").html("");
        $("#err_image").html("");
        $("#err_common").html("");
    }
});

let previewImage = (input, block) => {
    block.show();
    let fileTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    let extension = input.files[0].name.split('.').pop().toLowerCase();
    let checkAllowedExt = fileTypes.indexOf(extension) > -1;
    let fileSize = input.files[0].size;

    if((fileSize / 1024 / 1024) > 5){
        $("#err_image").html("Chosen file size should be less 5 MB.");
    }
    else if(!checkAllowedExt){
        $("#err_image").html("It is not valid extension. Valid extension are jpg, jpeg, png, gif, bmp");
    }
    else{
        let reader = new FileReader();

        reader.onload = function(e){
            block.attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        $("#err_image").html("");

    }

}
$(document).ready(function (){

    $('#uploadImage').change(function(e){
        previewImage(this, $("#previewImg"));
    });

    $('#name').change(function(){
        console.log($('#name').val());
        if($('#name').val() != ""){
            $('#err_name').html("");
        }
    });

    $('#email').change(function(){
        if($('#email').val() !== ""){
            $('#err_email').html("");
        }
    });

    $('#reset').click(function(){
        $("#uploadedImage").attr("src", "");
        $("#previewImg").attr("src", "./img/google_doc.png");
        errMessageClear();
    })

    $("#btnUpload").click(function(e){
        // e.preventDefault();


        $('#form').ajaxForm({
            target: "#uploadedImage",
            url : "ajax_upload.php",
            // type : "POST",
            // data : new FormData($('#form')[0]),
            // contentType : false,
            // cache : false,
            // processData : false,
            beforeSubmit : function (){
                $("#loading_image_gif").show(300);
                $("#progressDivId").show();
                // $("#percent").html("0%");
                $("#progressBar").width("0%");
                // console.log("before send trigger");
                $("#btnUpload").prop('disabled', true);
                $('#reset').prop('disabled', true);

            },
            success : function(res){
                console.log(res);
                if(res.status == "success"){
                    $("#uploadedImage").attr("src", res.image_link);
                    $("#previewImg").attr("src", "./img/google_doc.png");
                    errMessageClear();
                }
            },
            uploadProgress : function(event, position, total, percentComplete){
                let percentValue = percentComplete + "%";

                $("#progressBar").animate({
                    width: '' + percentValue + ''
                }, {
                    // duration : 3000,
                    easing : "linear",
                    step : function(x){

                        let percentText = Math.round(x * 100 / percentComplete);

                        // console.log(percentText);
                        $("#progressBar").html(percentText+"%");

                        if(percentText == "100"){

                        }
                    }
                });

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
                $("#loading_image_gif").hide(500);
                $("#progressDivId").hide();
                // $("#percent").html("0%");
                $("#progressBar").width("0%");
                $("#percent").css("color", "black");
                $("#btnUpload").prop('disabled', false);
                $('#reset').prop('disabled', false);
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
$(document).ready(function (){
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
                    $("#previewImg").attr("src", res.image_link);
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
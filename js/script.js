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
                }
            },
            error : function(res){
                console.log(res);
            },
            complete: function(res){
                $("#loading").hide(400);
            }
        });
    });
});
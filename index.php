<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="img/dev_logo.png" type="image/x-icon">
    
    <title>AJAX File upload with PHP and AJAX</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="./css/style.css">
    <script src="./js/script.js"></script>

</head>
<body>
    <div id="loading">
        <div>
            <img src="./img/loading.gif" class="fluid-image"/>
        </div>

    </div>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1><a href="#" target="_blank"><img src="./img/logo_dev.gif" alt="Logo" width="80px"> Ajax File Uploading with Database MySql</a></h1>
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-8">
                <form action="ajax_upload.php" method="post" enctype="multipart/form-data" id="form">
                    <div class="form-group">
                        <label for="name">Name <span class="text-danger">*</span>: </label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name"  />
                        <small id="err_name" class="text-danger"></small>
                    </div>

                    <div class="form-group">
                        <label for="email">Email <span class="text-danger">*</span>: </label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email"  />
                        <small id="err_email" class="text-danger"></small>
                    </div>

                    <div class="form-group">
                        <label for="uploadImage">Your Image <span class="text-danger">*</span> : </label>
                        <input type="file" id="uploadImage" accept="image/*" name="image" />
                        <small id="err_image" class="text-danger"></small>
                        <small id="err_common" class="text-danger"></small>
                        <div id="preview" ><img src="./img/google_doc.png" alt="image preview" width="128px" id="previewImg"></div>
                        <input type="submit" value="Upload" class="btn btn-success" />
                        <input type="reset" value="Reset" class="btn btn-warning" id="reset"/>
                    </div>
                </form>
            </div>
            <div class="col-lg-4 col-4" id="uploadedImageContainer">
                <img src="" id="uploadedImage" width="100%" style="2px solid #000;"/>
            </div>
        </div>
    </div>

</body>
</html>
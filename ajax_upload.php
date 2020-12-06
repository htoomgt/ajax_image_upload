<?php

function getMySqlPDOConnection(): PDO
{
    $dbHost = "127.0.0.1";
    $dbUsername = "root";
    $dbPassword = "abcd1234";
    $dbName = "db_test";


    $connection = new PDO("mysql:host={$dbHost};dbname={$dbName}", $dbUsername, $dbPassword);
    //set error mode to exception
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $connection;




}

function getImageLink($uploadedFile):string{
    $imageLink = "";
    if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')
        $url = "https://";
    else {
        $url = "http://";
// Append the host(domain name, ip) to the URL.
        $url .= $_SERVER['HTTP_HOST'];

// Append the requested resource location to the URL
        $requestDomain = str_replace("ajax_upload.php", "", $_SERVER['REQUEST_URI']);
        $url .= $requestDomain;

        $imageLink = $url."/upload/".$uploadedFile;
    }
    return $imageLink;
}
sleep(1);

$uploadedFile = "";
$tmpFileName = "";
$errorImg = "";
$valid_extensions = array('jpeg', 'jpg', 'png', 'gif', 'bmp' , 'pdf' , 'doc' , 'ppt');
$path = './upload/'; // upload directory
$uploaderName = "";
$uploaderEmail = "";
$targetUpload = __DIR__."/upload/".$uploadedFile;

$response['status'] = "";
$response['messages'] = [];
$httpStatus = 200;
$errorStatus = 0;
//die($uploaderName);

if(empty($_POST['name'])){
    $response['status'] = "invalid";
    $httpStatus = 422;
    $nameErr = ['err_name' => 'Uploader name is missing!'];
    $response['messages'] = array_merge($response['messages'],$nameErr);
    $errorStatus = 1;
}
else{
    $uploaderName = $_POST['name'];
}
if(empty($_POST['email'])){
    $response['status'] = "invalid";
    $httpStatus = 422;
    $emailErr = ['err_email' => 'Uploader email is missing!'];
    $response['messages'] = array_merge($response['messages'], $emailErr);
    $errorStatus = 1;
}
else{
    $uploaderEmail = $_POST['email'];
}

if(!empty($_FILES['image'])){
    $uploadedFile = $_FILES['image']['name'];
    $tmpFileName = $_FILES['image']['tmp_name'];
    $errorImg = $_FILES['image']['error'];
    // get uploaded file's extension
    $ext = strtolower(pathinfo($uploadedFile, PATHINFO_EXTENSION));
    if(!in_array($ext, $valid_extensions)){
        $response['status'] = "invalid";
        $httpStatus = 422;
        $imageErr = ['err_image' => 'Invalid file extension. Valid ext are jpg, jpeg, png, gif, bmp'];
        $response['messages'] = array_merge($response['messages'], $imageErr);
        $errorStatus = 1;
    }
}

if($errorStatus == 0){
    try {


        $finalImage = date('YmdHis').$uploadedFile;
        $path = $path.strtolower($finalImage);

        move_uploaded_file($tmpFileName, $path);
        $imageLink = getImageLink($finalImage);


        $dbConn =  getMySqlPDOConnection();
        $sqlInsert = "INSERT INTO upload_img (`name`,`email`, `file_name`)
        VALUES
        ('$uploaderName', '$uploaderEmail', '$finalImage')
        ";
        $stmt = $dbConn->prepare($sqlInsert);
        $stmt->execute();



        $response['status'] = "success";
        $successMessage = ["form_save_msg" => "Your upload has been saved successfully!"];
        $response['messages'] = array_merge($response['messages'], $successMessage);
        $response['image_link'] = $imageLink;
        $httpStatus = 200;

    }catch(Exception $e){
        $errorMessage = $e->getMessage();
        $insertError = ['error_msg' => $errorMessage];
        $response['status'] = "error";
        $response['messages'] = array_merge($response['messages'], $insertError);
        $httpStatus = 500;
    }

}




header("Content-Type:application/json; charset:UTF-8");
echo json_encode($response);



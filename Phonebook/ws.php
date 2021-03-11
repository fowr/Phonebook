<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$connection= mysqli_connect('127.0.0.1', 'root','root','phonebook');




if($_SERVER['REQUEST_METHOD'] == 'GET') {

    $query="SELECT * from person";
    $stack=array();
    $result=mysqli_query($connection,$query);

    while ($rows = mysqli_fetch_assoc($result)){
        array_push($stack,$rows);
        }

echo json_encode( $stack);
    

} 
elseif($_SERVER['REQUEST_METHOD'] == 'POST') {


    $req=file_get_contents("php://input");
    $req_object=json_decode($req);
    
    $name=$req_object->{'name'};
    $number=$req_object->{'number'};
    
    $query="insert into person (name , number) values (";
    $query.= "'$name' , '$number')";
    echo $query;
    
    $result=mysqli_query($connection,$query);

    if($result){
        echo "success";
    }
    

} 


elseif($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $req=file_get_contents("php://input");
    $req_object=json_decode($req);

    $id=$req_object->{'id'};
    $name=$req_object->{'name'};
    $number=$req_object->{'number'};

    $query="UPDATE PERSON SET ";
    $query.="name ='$name' , number='$number' ";
    $query.="where id= $id ";

    $result=mysqli_query($connection,$query);
    if($result){
        echo "success";
    }
   
}
else{
    $req=file_get_contents("php://input");
    $req_object=json_decode($req);

    $id=$req_object->{'id'};

    $query="DELETE FROM person WHERE ";
    $query.= "id=$id ";

    $result=mysqli_query($connection,$query);
    if($result){
        echo "success";
    }
}
?>
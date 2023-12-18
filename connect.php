<?php

    $name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$age = $_POST['age'];
	$password = $_POST['password'];
	$repassword = $_POST['repassword'];

	// Database connection
	$conn = new mysqli('localhost','root','','contactus');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into registration(name, email, phone, age, password, repassword) values(?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssiiss", $name, $email, $phone, $age, $password, $repassword);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}






?>
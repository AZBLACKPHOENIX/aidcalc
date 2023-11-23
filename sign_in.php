<?php
$servername = "sql12.freemysqlhosting.net";
$username = "sql12664364";
$password = "5Fu4sRdynw";
$database = "sql12664364";
$port = 3306;

// Create connection
$conn = new mysqli("sql12.freemysqlhosting.net", "sql12664364", "5Fu4sRdynw", "sql12664364", 3306);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

// Generate a random user ID with seven digits
$userID = mt_rand(1000000, 9999999);

// Insert user into the database
$sql = "INSERT INTO users (id, username, password, email) VALUES ('$userID', '$username', '$password', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "User account created successfully";
} else {
    echo "Error creating user account: " . $conn->error;
}

// Close connection
$conn->close();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

?>


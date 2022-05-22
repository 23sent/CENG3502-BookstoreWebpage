<?php

function clear_input($data)
{
  $data = trim($data);
  $data = htmlspecialchars($data);
  return $data;
}

$username  = "";
$password = "";
$email = "";
$role = 2; // customer


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = clear_input($_POST["username"]);
  $password = clear_input($_POST["password"]);
  $email = clear_input($_POST["email"]);

  if (!empty($username) && !empty($password) && !empty($email)) {
    try {
      $connection = new PDO(
        "mysql:host=localhost;dbname=BookStore",
        "root",
        ""
      );
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sqlCommand = "INSERT INTO users (username, password, role, email) VALUES (:username, :password, :role,  :email)";
      $stmt = $connection->prepare($sqlCommand);
      $stmt->execute(['username' => $username, 'passowrd' => $password, 'role' => $role, 'email' =>  $email]);

      echo "<h1> Acount Created Successfully </h1>";
      header("location: ../signIn.php");
    } catch (PDOException $e) {
      echo "Connection Failed: " . $e->getMessage();
    }
  }
}

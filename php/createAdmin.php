<?php
include("functions.php"); // start session and import some useful functions.

if (!isLoggedIn() || $_SESSION["role"] != 1) {
  exit();
}

$username  = "";
$password = "";
$email = "";
$role = 1; // admin


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
      $stmt =  $connection->prepare($sqlCommand);
      $stmt->execute(['username' => $username, 'password' => $password, 'role' => $role, 'email' => $email]);

      $query  = $connection->query("SELECT * FROM users WHERE role=1", PDO::FETCH_ASSOC);
      $customer = $query->fetchAll();

      header('Content-type: application/json');
      echo json_encode($customer);
    } catch (PDOException $e) {
      echo "Connection Failed: " . $e->getMessage();
    }
  }
}

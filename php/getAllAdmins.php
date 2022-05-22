<?php
include("functions.php"); // start session and import some useful functions.

if (!isLoggedIn() || $_SESSION["role"] != 1) {
  exit();
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  $connection = connectDatabase();

  $query  = $connection->query("SELECT * FROM users WHERE role = 1", PDO::FETCH_ASSOC);

  $customer = $query->fetchAll();

  header('Content-type: application/json');
  echo json_encode($customer);
}

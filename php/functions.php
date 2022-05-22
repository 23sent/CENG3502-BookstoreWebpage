<?php
session_start();

function isLoggedIn()
{
  return isset($_SESSION["session"]) && $_SESSION["session"];
}

function clear_input($data)
{
  $data = trim($data);
  $data = htmlspecialchars($data);
  return $data;
}


function connectDatabase()
{
  try {
    $connection = new PDO(
      "mysql:host=localhost;dbname=BookStore",
      "root",
      ""
    );
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $connection;
  } catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
    return $e;
  }
}

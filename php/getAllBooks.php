<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  try {
    $connection = new PDO(
      "mysql:host=localhost;dbname=BookStore",
      "root",
      ""
    );
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query  = $connection->query("SELECT * FROM books", PDO::FETCH_ASSOC);
    $books = $query->fetchAll();

    header('Content-type: application/json');
    echo json_encode($books);
  } catch (PDOException $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Connection Failed: " . $e->getMessage();
  }
}

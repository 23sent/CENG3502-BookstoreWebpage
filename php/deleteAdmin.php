<?php
include("functions.php"); // start session and import some useful functions.

if (!isLoggedIn() || $_SESSION["role"] != 1) {
  exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $request_body = json_decode(file_get_contents('php://input'), true);
  $id = $request_body["id"];

  if (is_numeric($id) && $_SESSION["id"] != $id) {
    try {
      $connection = new PDO(
        "mysql:host=localhost;dbname=BookStore",
        "root",
        ""
      );

      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      // $sqlCommand = "DELETE FROM books WHERE books.id = '$id'";

      $stmt = $connection->prepare('DELETE FROM users WHERE id = :idP');
      $stmt->bindParam(':idP', $id, PDO::PARAM_INT);
      $stmt->execute();

      $query  = $connection->query("SELECT * FROM users WHERE role = 1", PDO::FETCH_ASSOC);
      $books = $query->fetchAll();

      header('Content-type: application/json');
      echo json_encode($books);
    } catch (PDOException $e) {
      header('HTTP/1.1 500 Internal Server Error');
      echo "Connection Failed: " . $e->getMessage();
    }
  }
}

<?php
include("functions.php");

if (!isLoggedIn() || $_SESSION["role"] != 1) {
  exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $request_body = json_decode(file_get_contents('php://input'), true);

  $id = $request_body["id"];
  $title = clear_input($request_body["title"]);
  $author = clear_input($request_body["author"]);
  $description = clear_input($request_body["description"]);
  $image_url = clear_input($request_body["image_url"]);
  $price = clear_input($request_body["price"]);
  $category = json_encode($request_body["category"]);

  if (!empty($title) && !empty($author) && !empty($description) && !empty($image_url) && !empty($category) && !empty($price) && !empty($id)) {
    try {
      $connection = new PDO(
        "mysql:host=localhost;dbname=BookStore",
        "root",
        ""
      );
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      $sqlCommand = "UPDATE books SET title = :title, author = :author, description = :description, image_url = :image_url, category = :category, price = :price WHERE id = :id;";

      $stmt = $connection->prepare($sqlCommand);
      $stmt->execute(['title' => $title, 'author' => $author, 'description' => $description, 'image_url' => $image_url, 'category' => $category, 'price' => $price, 'id' => $id]);

      $query  = $connection->query("SELECT * FROM books", PDO::FETCH_ASSOC);
      $books = $query->fetchAll();

      header('Content-type: application/json');
      echo json_encode($books);
    } catch (PDOException $e) {
      header('HTTP/1.1 500 Internal Server Error');
      echo "Connection Failed: " . $e->getMessage();
    }
  }
}

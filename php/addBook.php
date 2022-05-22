<?php
include("functions.php"); // start session and import some useful functions.

if (!isLoggedIn() || $_SESSION["role"] != 1) {
  exit();
}

/**
 * Add new book
 * JSON body
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $request_body = json_decode(file_get_contents('php://input'), true);
  $title = clear_input($request_body["title"]);
  $author = clear_input($request_body["author"]);
  $description = clear_input($request_body["description"]);
  $image_url = clear_input($request_body["image_url"]);
  $price = clear_input($request_body["price"]);
  $category = json_encode($request_body["category"]);


  if (!empty($title) && !empty($author) && !empty($description) && !empty($image_url) && !empty($category) && !empty($price)) {
    try {
      $connection = new PDO(
        "mysql:host=localhost;dbname=BookStore",
        "root",
        ""
      );
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $sqlCommand = "INSERT INTO books (title, author, description, image_url, category, price) VALUES (:title, :author, :description,  :image_url, :category, :price)";

      $stmt = $connection->prepare($sqlCommand);
      $stmt->execute(['title' => $title, 'author' => $author, 'description' => $description, 'image_url' => $image_url, 'category' => $category, 'price' => $price]);

      $query  = $connection->query("SELECT * FROM books", PDO::FETCH_ASSOC);
      $customer = $query->fetchAll();

      header('Content-type: application/json');
      echo json_encode($customer);
    } catch (PDOException $e) {
      header('HTTP/1.1 500 Internal Server Error');
      echo "Connection Failed: " . $e->getMessage();
    }
  }
}

<?php
include("./php/functions.php");

$book = array();

if (isset($_GET["id"])) {
  try {
    $connection = new PDO(
      "mysql:host=localhost;dbname=BookStore",
      "root",
      ""
    );
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id =  $_GET["id"];
    $query  = $connection->query("SELECT * FROM books WHERE id = $id LIMIT 1", PDO::FETCH_ASSOC);
    $book = $query->fetch();
  } catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
  }
} else {
  header("location: ./index.php");
}

?>

<!DOCTYPE html>

<html lang="en">

<head>
  <title>Book</title>
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.css">
  <link rel="stylesheet" href="./index.css" />
</head>


<script src="./js/books.js"></script>
<script src="./js/DataClasses.js"></script>
<script src="./js/CreateElementFunctions.js"></script>
<script>
  const book = new Book(<?php echo json_encode($book) ?>)
</script>

<body>
  <?php include("navbar.php") ?>

  <div class="container my-5 py-5">

    <div class="row flex-wrap">
      <div class="col col-12 col-sm-5 mb-2">
        <img src="<?php echo $book["image_url"] ?>" style="max-width: 100%; height: auto; border: 1px solid black;">
      </div>
      <div class="col col-12 col-sm-7 p-4 d-flex flex-column" style="border: 1px solid black;">
        <div class="row mb-2">
          <h2 style="text-align: center"><?php echo $book["title"] ?></h2>
        </div>
        <div class="row mb-2" style="text-align: center">
          <h3><?php echo $book["author"] ?></h3>
        </div>
        <div class="row mt-4" style="flex-grow: 2">
          <p><?php echo $book["description"] ?></p>
        </div>
        <div class="row mb-2">
          <button id="buy-button" style="width: 100%; font-size: 16px; "><?php echo $book["price"] ?> - add to basket</button>
        </div>
        <div class="row ">
          <a style="width: 100%; text-align: center;" href="index.php">Continue Shopping</a>
        </div>
      </div>
    </div>
  </div>

  <?php include("footer.php") ?>
  <script src="./book.js"></script>
</body>

</html>
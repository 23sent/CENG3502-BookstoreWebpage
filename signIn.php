<?php
include("php/functions.php"); // start session and import some useful functions.

$email = "";
$password = ";";

if (isLoggedIn()) {
  header("location: ./index.php");
}

$isWrong = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  $password = $_POST["password"];

  try {
    $connection = new PDO(
      "mysql:host=localhost;dbname=BookStore",
      "root",
      ""
    );
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query  = $connection->query("SELECT * FROM users WHERE email='$email' && password='$password' LIMIT 1", PDO::FETCH_ASSOC);
    if ($rowCount = $query->rowCount()) {
      if ($rowCount == 1) {
        $user = $query->fetch();

        $_SESSION['session'] = true;
        $_SESSION['id'] =  $user["id"];
        $_SESSION['username'] = $user["username"];
        $_SESSION['email'] =  $user["email"];
        $_SESSION['role'] =  $user["role"];

        header("location: ./index.php");
      } else {
        $isWrong = true;
      }
    } else {
      $isWrong = true;
    }
  } catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
  }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Sign In</title>
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.css">
  <link rel="stylesheet" href="./index.css" />


</head>

<body>
  <script src="./signIn.js"></script>

  <?php include("navbar.php") ?>

  <div class="container mt-4">
    <div class="row">
      <div class="column d-flex justify-content-center">
        <h2>Sign In</h2>
      </div>
    </div>

    <div class="row">
      <div class="column d-flex justify-content-center">
        <form id="sing-in-form" action="./signIn.php" method="post">
          <div class="form-group m-1">
            <label>Email</label>
            <div class="col">
              <input type="email" name="email" required="required">
            </div>
            </span>
          </div>
          <div class="form-group m-1">
            <label>Password</label>
            <div class="col">
              <input type="password" name="password" required="required">
            </div>
            </span>
          </div>
          <div class="form-group m-1">
            <div class="col">
              <button class="w-100" type="submit"> Sign In</button>
            </div>
          </div>

          <div class="form-group m-1">
            <div class="col d-flex justify-content-end"><a href="signUp.php" class="d-inline-block">Sign Up</a>
            </div>
          </div>
        </form>
      </div>
      <?php if ($isWrong) : ?>
        <div class="row justify-content-center">
          <p style="color: red; text-align: center;"> Email or password is incorrect.</p>
        </div>
      <?php endif ?>
    </div>
  </div>
</body>

</html>
<?php
include("php/functions.php");

$username = $_SESSION["username"];
$password = "";
$email = $_SESSION["email"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST["username"];
  $password = $_POST["password"];

  if (!empty($username)) {
    try {
      $connection = new PDO(
        "mysql:host=localhost;dbname=BookStore",
        "root",
        ""
      );
      $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      if (empty($password)) {
        $sqlCommand = "UPDATE users SET username = :username WHERE email = :email;";
        $defArray = ['username' =>  $username, 'email' => $email];
      } else {
        $sqlCommand = "UPDATE users SET username = :username, password= :password WHERE email = :email;";
        $defArray = ['username' =>  $username, 'password' => $password, 'email' => $email];
      }
      $stmt = $connection->prepare($sqlCommand);
      $stmt->execute($defArray);

      $_SESSION['username'] = $username;
    } catch (PDOException $e) {
      echo "Connection Failed: " . $e->getMessage();
    }
  }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Profile</title>
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.css">
  <link rel="stylesheet" href="./index.css" />


</head>

<body>
  <script src="./profile.js"></script>

  <?php include("navbar.php") ?>

  <div class="container mt-4">
    <div class="row">
      <div class="column d-flex justify-content-center">
        <h2>Profile</h2>
      </div>
    </div>

    <div class="row">
      <div class="column d-flex justify-content-center">
        <form id="sing-in-form" action="./profile.php" method="post">
          <div class="form-group m-1">
            <label>Username</label>
            <div class="col">
              <input type="text" name="username" value="<?php echo $_SESSION["username"] ?>">
            </div>
            </span>
          </div>
          <div class="form-group m-1">
            <label>Email</label>
            <div class="col">
              <input type="text" name="email" value="<?php echo $_SESSION["email"] ?>" disabled>
            </div>
            </span>
          </div>
          <div class="form-group m-1">
            <label>Password</label>
            <div class="col">
              <input type="password" name="password" value="">
            </div>
            </span>
          </div>
          <div class="form-group m-1">
            <div class="col">
              <button class="w-100" type="submit"> Update Profile</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>

</html>
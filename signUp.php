<?php include("php/functions.php"); // start session and import some useful functions. 
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Sign Up</title>
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.css">
  <link rel="stylesheet" href="./index.css" />

</head>

<body>

  <?php include("navbar.php") ?>

  <div class="container mt-4">
    <div class="row">
      <div class="column d-flex justify-content-center">
        <h2>Sign Up</h2>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="column d-flex justify-content-center">
      <form action="./php/signUp.php" method="post">
        <div class="form-group m-1">
          <label>Username</label>
          <div class="col">
            <input type="text" name="username" required="required">
          </div>
        </div>

        <div class="form-group m-1">
          <label>Email</label>
          <div class="col">
            <input type="email" name="email" required="required">
          </div>
        </div>

        <div class="form-group m-1">
          <label>Password</label>
          <div class="col">

            <input type="password" name="password" required="required" minlength="8" maxlength="15">
          </div>
        </div>


        <div class="form-group m-1">
          <div class="col"> <button class="w-100" type="submit"> Sign Up </button>
          </div>
        </div>

        <div class="form-group m-1">
          <div class="col d-flex justify-content-end"><a href="signIn.php" class="d-inline-block">Sign in</a>
          </div>
        </div>
      </form>
    </div>

  </div>
</body>

</html>
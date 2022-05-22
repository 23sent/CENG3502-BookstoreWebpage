<?php
include("functions.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  session_destroy();
  echo "Session end.";
  header("location: ../index.php");
}

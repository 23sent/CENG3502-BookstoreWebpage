<?php
include("functions.php"); // start session and import some useful functions.

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  session_destroy();
  echo "Session end.";
  header("location: ../index.php");
}

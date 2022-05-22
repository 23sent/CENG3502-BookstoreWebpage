<!-- A navbar  component that uses by all pages.-->
<header>
  <nav class="navbar">
    <h1 class="navbar-title"><a class="only_link" href=" ./index.php">Library</a></h1>
    <div class="navbar-right-part">
      <div style="text-align: center;">
        <button id="navbar-basket-container" class="my-1" onclick="openPage(PAGES.BASKET)" style="display: none">
          <span id="basket-badge"></span>
          <span>books in basket</span>
        </button>
        <?php if (isLoggedIn() && $_SESSION["role"] == 1) : ?>
          <a class="d-inline-block my-1" href="admin.php">Admin Panel</a>
        <?php endif ?>


        <?php if (isLoggedIn()) : ?>
          <a class="d-inline-block my-1" href="profile.php">Profile</a>
          <a class="d-inline-block my-1" href="php/signOut.php">Log out</a>
        <?php else : ?>
          <a class=" d-inline-block my-1" href="signIn.php">Sign In</a> <a href="signUp.php">Sign Up</a>
        <?php endif ?>

      </div>
    </div>
  </nav>
</header>
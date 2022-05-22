<?php
include("./php/functions.php"); // start session and import some useful functions.

if (!isLoggedIn() || $_SESSION["role"] != 1) {
  exit();
}


?>

<head>
  <title>Admin Panel</title>
  <link rel="stylesheet" href="./index.css" />
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.css" />
  <link rel="stylesheet" href="./admin.css" />
  <link rel="stylesheet" href="./functions.css" />
</head>

<body>

  <script src="./js/books.js"></script>
  <script src="./js/DataClasses.js"></script>
  <script src="./js/CreateElementFunctions.js"></script>
  <?php include("navbar.php"); ?>

  <div class="container">
    <div class="row">
      <div class="col">
        <button class="w-100" onclick="openPage(PAGES.ADMINS)">Admins</button>
      </div>
      <div class="col">
        <button class="w-100" onclick="openPage(PAGES.BOOKS)">Books</button>
      </div>
    </div>
  </div>


  <div class="container">
    <div id="admins">
      <div class="d-flex justify-content-end m-2 mb-3">
        <button onclick="openAddAdminModal()">Add Admin User</button>
      </div>
      <table id="admins-table">
        <thead id="admins-thead"></thead>
        <tbody id="admins-tbody"></tbody>
      </table>
    </div>

    <div id="books">
      <div id="booklist-page" style="display: block">
        <div class="row justify-content-end">
          <div class="d-flex m-2 mb-3 justify-content-end  align-items-center px-2">
            <div class="search-input-div">
              <input id="search-input" type="text" placeholder="Search..." />
              <span id="search-button" class="search-input-icon" onclick="searchBooks()">&#x1F50E;&#xFE0E;</span>
            </div>
            <div style="margin-right: 24px">
              <select id="category-filter"></select>
            </div>
            <button id="open-add-book-button" onclick="openAddBookModal()">+ Add Book</button>
          </div>
        </div>

        <table id="books-table">
          <thead id="books-thead"></thead>
          <tbody id="books-tbody"></tbody>
        </table>
      </div>
    </div>
  </div>


  <div id="add-admin-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header justify-content-between">
        <span class="modal-title">Add New Admin User</span>
        <button onclick="closeAddAdminModal()">X</button>
      </div>

      <form id="add-admin-form">
        <div class="form-row">
          <label>Username</label>
          <input class="d-block mx-1" name="username" type="text" />
        </div>
        <div class="form-row">
          <label>Email</label>
          <input class="d-block mx-1" name="email" type="text" />
        </div>
        <div class="form-row">
          <label>Password</label>
          <input class="d-block mx-1" name="password" type="password" />
        </div>
      </form>
      <div class="d-flex justify-content-end">
        <button id="add-admin-button" onclick="createAdminUser()">Create</button>
      </div>
    </div>
  </div>



  <div id="add-book-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">Add New Book to Library</span>
        <button id="add-book-close-button" onclick="closeAddBookModal()">X</button>
      </div>

      <form id="add-book-form">
        <div class="add-book-form-question">
          <label>Title</label>
          <input name="title" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Author</label>
          <input name="author" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Description</label>
          <input name="description" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Image Url</label>
          <input name="image_url" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Category</label>
          <select name="category" id="category-seletion" multiple> </select>
        </div>
        <div class="add-book-form-question">
          <label>Price</label>
          <input name="price" type="number" />
        </div>
      </form>
      <div class="add-book-button-div">
        <button id="add-book-button" onclick="addBookButtonFunc()">+ Add Book</button>
      </div>
    </div>
  </div>


  <div id="update-book-modal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">Edit Book</span>
        <button id="add-book-close-button" onclick="closeUpdateBookModal()">X</button>
      </div>

      <form id="update-book-form">
        <div class="add-book-form-question">
          <label>Id</label>
          <input name="id" type="number" style="pointer-events: none" />
        </div>
        <div class="add-book-form-question">
          <label>Title</label>
          <input name="title" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Author</label>
          <input name="author" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Description</label>
          <input name="description" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Image Url</label>
          <input name="image_url" type="text" />
        </div>
        <div class="add-book-form-question">
          <label>Category</label>
          <select name="category" id="update-category-seletion" multiple> </select>
        </div>
        <div class="add-book-form-question">
          <label>Price</label>
          <input name="price" type="number" />
        </div>
      </form>
      <div class="add-book-button-div">
        <button id="add-book-button" onclick="updateBookButtonFunc()">Update</button>
      </div>
    </div>
  </div>

  <footer>
    <div>MSKU CENG</div>
    <div>CENG 3502 - Dynamic Web Programming</div>
    <div>Utku Sağocak</div>
  </footer>

  <script src="./admin.js"></script>
</body>

</html>
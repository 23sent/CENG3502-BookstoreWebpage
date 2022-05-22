let admins = [];
let booklist = [];

// Pages and element ids
const PAGES = {
  ADMINS: "admins",
  BOOKS: "books",
};

const BOOK_CATEGORY = {
  SCIFI: "Sci-Fi",
  FANTASY: "Fantasy Fiction",
  BILDUNG: "Bildungsroman",
  POETRY: "Poetry",
};

/**
 *
 * @param {string} id pass page id from PAGES constant
 *
 * This function hides all other pages(specific part in html) and shows the one.
 */
function openPage(page) {
  for (let pageId in PAGES) {
    const el = document.getElementById(PAGES[pageId]);
    el.style.display = "none";
  }

  if (page) {
    const el = document.getElementById(page);
    el.style.display = "block";
  }
}

function openAddAdminModal() {
  // Show Modal, Hide Scrollbar
  const addBookModal = document.getElementById("add-admin-modal");
  addBookModal.style.display = "flex";
  document.documentElement.style.overflow = "hidden";
}

function closeAddAdminModal() {
  // Hide Modal, Show scrollbar
  const addBookModal = document.getElementById("add-admin-modal");
  addBookModal.style.display = null;
  document.documentElement.style.overflow = null;
}

function createAdminUser() {
  const form = document.getElementById("add-admin-form");
  const formData = new FormData(form);

  // Create admin and update admins.
  fetch("./php/createAdmin.php", { method: "post", body: formData })
    .then((response) => response.json())
    .then((data) => initAdmins(data));
}

function addBookButtonFunc() {
  // Get form data
  const form = document.getElementById("add-book-form");
  const formData = new FormData(form);

  // Create book data
  const bookData = {
    author: formData.get("author"),
    title: formData.get("title"),
    description: formData.get("description"),
    image_url: formData.get("image_url"),
    price: formData.get("price"),
  };

  for (const field in bookData) {
    if (
      bookData[field] === undefined ||
      bookData[field] === null ||
      bookData[field].toString().trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }
  }

  // Add book and update booklist.
  fetch("./php/addBook.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      author: formData.get("author"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      category: formData.getAll("category"),
      price: formData.get("price"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      books = data;
      initBooks(data);
    });

  closeAddBookModal();

  form.reset();
}

function updateBookButtonFunc() {
  // Get form data
  const form = document.getElementById("update-book-form");
  const formData = new FormData(form);

  // Update book.
  fetch("./php/updateBook.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: formData.get("id"),
      title: formData.get("title"),
      author: formData.get("author"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      category: formData.getAll("category"),
      price: formData.get("price"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      books = data;
      initBooks(data);
    });

  closeUpdateBookModal();

  form.reset();
}

function openAddBookModal() {
  // Show Modal, Hide Scrollbar
  const addBookModal = document.getElementById("add-book-modal");
  addBookModal.style.display = "flex";
  document.documentElement.style.overflow = "hidden";

  const categorySelection = document.getElementById("category-seletion");
  categorySelection.innerHTML = "";
  for (let category in BOOK_CATEGORY) {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = BOOK_CATEGORY[category];
    categorySelection.appendChild(option);
  }
}

function closeAddBookModal() {
  // Hide Modal, Show scrollbar
  const addBookModal = document.getElementById("add-book-modal");
  addBookModal.style.display = null;
  document.documentElement.style.overflow = null;
}

function openUpdateBookModal(book) {
  // Show Modal, Hide Scrollbar
  const updateBookModal = document.getElementById("update-book-modal");
  updateBookModal.style.display = "flex";
  document.documentElement.style.overflow = "hidden";

  const form = document.getElementById("update-book-form");
  form.elements.id.value = book["id"];
  form.elements.title.value = book["title"];
  form.elements.author.value = book["author"];
  form.elements.description.value = book["description"];
  form.elements.image_url.value = book["image_url"];
  form.elements.price.value = book["price"];

  const categorySelection = document.getElementById("update-category-seletion");
  const categories = JSON.parse(book["category"]);
  categorySelection.innerHTML = "";
  for (let category in BOOK_CATEGORY) {
    const option = document.createElement("option");
    option.value = category;
    if (categories?.includes?.(category)) {
      option.selected = true;
    }
    option.innerText = BOOK_CATEGORY[category];
    categorySelection.appendChild(option);
  }
}

function closeUpdateBookModal() {
  // Hide Modal, Show scrollbar
  const updateBookModal = document.getElementById("update-book-modal");
  updateBookModal.style.display = null;
  document.documentElement.style.overflow = null;
}

/**
 * Create admins table.
 * @param {array} a Admin users list
 */
function initAdmins(a) {
  admins = a;
  const adminsThead = document.getElementById("admins-thead");
  const adminsBody = document.getElementById("admins-tbody");
  adminsThead.innerHTML = "";
  adminsBody.innerHTML = "";

  const columns = {
    id: "Id",
    username: "Username",
    email: "Email",
    created_at: "Created at",
  };

  const theadTr = document.createElement("tr");
  for (let col in columns) {
    const td = document.createElement("th");
    td.innerText = columns[col];
    theadTr.appendChild(td);
  }
  adminsThead.appendChild(theadTr);

  for (let row in admins) {
    const tr = document.createElement("tr");
    for (let col in columns) {
      const td = document.createElement("td");
      td.innerText = admins[row][col];
      tr.appendChild(td);
    }

    const editTd = document.createElement("td");
    editTd.classList.add("edit-column");
    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = "🗑";
    deleteBtn.onclick = () => {
      fetch("./php/deleteAdmin.php", {
        method: "post",
        body: JSON.stringify({
          id: admins[row]["id"],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          initAdmins(data);
        });
    };

    editTd.appendChild(deleteBtn);
    tr.appendChild(editTd);

    adminsBody.appendChild(tr);
  }
}

/**
 * Create books table
 * @param {array} booklist
 */
function initBooks(booklist) {
  const booksThead = document.getElementById("books-thead");
  const booksBody = document.getElementById("books-tbody");
  booksThead.innerHTML = "";
  booksBody.innerHTML = "";

  const columns = {
    id: "Id",
    title: "Title",
    author: "Author",
    price: "Price",
  };

  const theadTr = document.createElement("tr");
  for (let col in columns) {
    const td = document.createElement("th");
    td.innerText = columns[col];
    theadTr.appendChild(td);
  }

  const editTd = document.createElement("th");
  editTd.classList.add("edit-column");
  theadTr.appendChild(editTd);

  booksThead.appendChild(theadTr);

  for (let row in booklist) {
    const tr = document.createElement("tr");
    for (let col in columns) {
      const td = document.createElement("td");
      td.innerText = booklist[row][col];
      tr.appendChild(td);
    }

    const editTd = document.createElement("td");
    editTd.classList.add("edit-column");

    const editBtn = document.createElement("span");
    editBtn.innerText = "🖊";
    editBtn.onclick = () => {
      openUpdateBookModal(booklist[row]);
    };

    const deleteBtn = document.createElement("span");
    deleteBtn.innerText = "🗑";
    deleteBtn.onclick = () => {
      fetch("./php/deleteBook.php", {
        method: "post",
        body: JSON.stringify({
          id: booklist[row]["id"],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          books = data;
          initBooks(data);
        });
    };

    editTd.appendChild(editBtn);
    editTd.appendChild(deleteBtn);
    tr.appendChild(editTd);

    booksBody.appendChild(tr);
  }
}

// Filter books by title/author/description text and category.
function searchAdminBooks() {
  const searchText = document.getElementById("search-input").value;
  const category = document.getElementById("category-filter").value;

  const filteredBook = books.filter((book) => {
    let correct =
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase()) ||
      book.description.toLowerCase().includes(searchText.toLowerCase());

    if (category) {
      correct = correct && JSON.parse(book.category).includes(category);
    }

    return correct;
  });
  initBooks(filteredBook);
}

window.onload = () => {
  openPage(PAGES.ADMINS);

  fetch("./php/getAllAdmins.php", {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      initAdmins(data);
    });

  // initialize books
  fetch("./php/getAllBooks.php", {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      books = data;
      initBooks(data);
    });

  // Add eventlistener to search after click enter key
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchAdminBooks();
    }
  });

  // Add category options to select element.
  const categoryFilter = document.getElementById("category-filter");
  const option = document.createElement("option");
  option.value = "";
  option.innerText = "Select a category";
  categoryFilter.appendChild(option);

  for (let category in BOOK_CATEGORY) {
    const option = document.createElement("option");
    option.value = category;
    option.innerText = BOOK_CATEGORY[category];
    categoryFilter.appendChild(option);
  }

  categoryFilter.onchange = (e) => {
    searchAdminBooks();
  };
};

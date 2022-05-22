// Pages and element ids
const PAGES = {
  BOOKS: "booklist-page",
  BASKET: "basket-page",
  PAYMENT: "payment-page",
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

function init() {
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  if (localBasket?.books?.length) {
    basket = Object.assign(new Basket(), localBasket);
  }

  // initialize books page
  fetch("./php/getAllBooks.php", {
    method: "get",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      initBookListPage(data);
    });

  // initialize basket page
  initBasketPage();

  // Add eventlistener to search after click enter key
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  });

  document.getElementById("navbar-basket-container").style.display = null;

  const url = new URL(window.location);
  const query = new URLSearchParams(url.searchParams);
  if (query.has("page")) {
    openPage(PAGES[query.get("page")]);
  }

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
    searchBooks();
  };
}

window.onload = init;

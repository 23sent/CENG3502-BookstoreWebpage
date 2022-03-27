const booklist = new BookList();
const basket = new Basket();

const PAGES = {
  BOOKS: "booklist-page",
  BASKET: "basket-page",
  PAYMENT: "payment-page",
};

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

function addBookButtonFunc() {
  const form = document.getElementById("add-book-form");
  const formData = new FormData(form);

  const bookData = {
    author: formData.get("author"),
    title: formData.get("title"),
    description: formData.get("title"),
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

  booklist.addBook(new Book({ ...bookData }));

  closeAddBookModal();

  form.reset();
}

function openAddBookModal() {
  const addBookModal = document.getElementById("add-book-modal");
  addBookModal.style.display = "flex";
}

function closeAddBookModal() {
  const addBookModal = document.getElementById("add-book-modal");
  addBookModal.style.display = null;
}

function searchBooks() {
  openPage(PAGES.BOOKS);

  const bookListContent = document.getElementById("booklist-content");
  const bookListElement = BookListElement(booklist, basket);
  bookListContent.innerHTML = "";
  bookListContent.appendChild(bookListElement);
}

function initBookListPage() {
  // Create books
  for (let bookData of booksData) {
    const book = new Book({
      ...bookData,
    });
    booklist.addBook(book);
  }

  const bookListContent = document.getElementById("booklist-content");

  // Set Observer
  booklist.setObserver((newBookList) => {
    const bookListElement = BookListElement(newBookList, basket);
    bookListContent.innerHTML = "";
    bookListContent.appendChild(bookListElement);
  });

  const bookListElement = BookListElement(booklist, basket);
  bookListContent.appendChild(bookListElement);
}

function initBasketPage() {
  const basketBadge = document.getElementById("basket-badge");
  basketBadge.innerText = basket.getCount();

  const totalPriceDiv = document.getElementById("total-price");
  totalPriceDiv.innerText = `${basket.getPrice()}$`;

  basket.setObserver((basket) => {
    const basketBadge = document.getElementById("basket-badge");
    basketBadge.innerText = basket.getCount();

    const totalPriceDiv = document.getElementById("total-price");
    totalPriceDiv.innerText = `${basket.getPrice()}$`;

    const basketContent = document.getElementById("basket-content");
    const basketElement = BasketElement(basket);
    basketContent.innerHTML = "";
    basketContent.appendChild(basketElement);
  });

  const basketContent = document.getElementById("basket-content");
  const basketElement = BasketElement(basket);
  basketContent.appendChild(basketElement);
}

function openPaymentPage() {
  if (basket.getCount() == 0) {
    if (confirm("Your basket is empty. Do you want to continue shopping?")) {
      openPage(PAGES.BOOKS);
    }
    return;
  }

  const order = new Order(basket);

  const paymentUpdate = (order) => {
    // Update Shop Details
    const shopDetailsName = document.getElementById("order-customername");
    shopDetailsName.innerText = `${order.customer_name} ${order.customer_surname}`;

    const shopDetailsAddress = document.getElementById("order-address");
    shopDetailsAddress.innerText = `${order.address}`;

    const shopDetailsPrice = document.getElementById("order-total-price");
    shopDetailsPrice.innerText = `${order.basket.getPrice()}$`;

    // Update payment method buttons
    const creditCardBtn = document.getElementById("credit-card-option-button");
    const wireTransferBtn = document.getElementById(
      "wire-transfer-option-button"
    );

    creditCardBtn.classList.remove("selected");
    wireTransferBtn.classList.remove("selected");

    const creditCardForm = document.getElementById("payment-credit-card-form");
    const wireTransferForm = document.getElementById(
      "payment-wire-transfer-form"
    );

    creditCardForm.style.display = "none";
    wireTransferForm.style.display = "none";

    if (order.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
      creditCardBtn.classList.add("selected");
      creditCardForm.style.display = "block";
    } else if (order.paymentMethod === PAYMENT_METHODS.WIRE_TRANSFER) {
      wireTransferBtn.classList.add("selected");
      wireTransferForm.style.display = "block";
    }
  };

  paymentUpdate(order);
  order.setObserver(paymentUpdate);

  // Bindings
  const nameInput = document.getElementById("customer-name");
  nameInput.oninput = (e) => {
    order.setCustomerName(e.target.value);
  };

  const surnameInput = document.getElementById("customer-surname");
  surnameInput.oninput = (e) => {
    order.setCustomerSurname(e.target.value);
  };

  const adressInput = document.getElementById("customer-address");
  adressInput.oninput = (e) => {
    order.setAdress(e.target.value);
  };

  const creditCardBtn = document.getElementById("credit-card-option-button");
  const wireTransferBtn = document.getElementById(
    "wire-transfer-option-button"
  );

  creditCardBtn.onclick = () => {
    order.setPaymentMethod(PAYMENT_METHODS.CREDIT_CARD);
  };

  wireTransferBtn.onclick = () => {
    order.setPaymentMethod(PAYMENT_METHODS.WIRE_TRANSFER);
  };

  openPage(PAGES.PAYMENT);
}

function init() {
  initBookListPage();
  initBasketPage();

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  });
}

window.onload = init;

const booklist = new BookList();
const basket = new Basket();

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

  // Create book object and add to the list
  booklist.addBook(new Book({ ...bookData }));

  closeAddBookModal();

  form.reset();
}

function openAddBookModal() {
  // Show Modal, Hide Scrollbar
  const addBookModal = document.getElementById("add-book-modal");
  addBookModal.style.display = "flex";
  document.documentElement.style.overflow = "hidden";
}

function closeAddBookModal() {
  // Hide Modal, Show scrollbar
  const addBookModal = document.getElementById("add-book-modal");
  addBookModal.style.display = null;
  document.documentElement.style.overflow = null;
}

function openOrderDetailsModal(order) {
  const creditCardForm = document.getElementById("payment-credit-card-form");
  const addressForm = document.getElementById("payment-address-form");

  // Get Payment Info from form
  if (order.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
    const paymentFormData = new FormData(creditCardForm);

    const paymentInfo = {};
    paymentFormData.forEach((value, key) => (paymentInfo[key] = value));
    order.paymentInfo = paymentInfo;
  }

  // Check if there is any empty info
  if (!order.validateOrder()) {
    alert("Please fill all fields correctly.");
    return true;
  }

  // Update Order Info Modal
  const customerInfo = document.getElementById("customer-info");
  customerInfo.innerText = `${order.customer_name} ${order.customer_surname}`;

  const adressInfo = document.getElementById("address-info");
  adressInfo.innerText = `${order.address}`;

  const paymentMethodInfo = document.getElementById("payment-method-info");
  paymentMethodInfo.innerText = `${order.getPaymentMethodName()}`;

  const paymentInfo = document.getElementById("payment-info");
  if (order.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
    paymentInfo.innerText = `Cardholder: ${order.paymentInfo.cardholder}
     Card Number: ${order.paymentInfo.card_number} 
     Expiry date: ${order.paymentInfo.expiry_date} `;
  } else {
    paymentInfo.innerText = ``;
  }

  const basketInfo = document.getElementById("order-basket-info");
  const basketElement = BasketElement(basket, true);
  basketInfo.appendChild(basketElement);

  // Show Modal, Hide Scrollbar
  const modal = document.getElementById("order-details-modal");
  modal.style.display = "flex";
  document.documentElement.style.overflow = "hidden";

  // Reset forms
  creditCardForm.reset();
  addressForm.reset();

  // reset basket
  basket.clearBasket();
}

function closeOrderDetailsModal() {
  // Hide Modal, Show scrollbar
  const modal = document.getElementById("order-details-modal");
  modal.style.display = null;
  document.documentElement.style.overflow = null;

  // Back to books page
  openPage(PAGES.BOOKS);
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

  // Create and append basket elements
  const bookListElement = BookListElement(booklist, basket);
  bookListContent.appendChild(bookListElement);
}

function initBasketPage() {
  // Bind basket button on navbar to basket object.
  const basketBadge = document.getElementById("basket-badge");
  basketBadge.innerText = basket.getCount();

  const totalPriceDiv = document.getElementById("total-price");
  totalPriceDiv.innerText = `${basket.getPrice()}$`;

  // Set observer
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

  // Create and append basket elements
  const basketContent = document.getElementById("basket-content");
  const basketElement = BasketElement(basket);
  basketContent.appendChild(basketElement);
}

function openPaymentPage() {
  // Check if basket is empty
  if (basket.getCount() == 0) {
    if (confirm("Your basket is empty. Do you want to continue shopping?")) {
      openPage(PAGES.BOOKS);
    }
    return;
  }

  // Create new order
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

    // Hide both credit card and wire transfer forms
    creditCardForm.style.display = "none";
    wireTransferForm.style.display = "none";

    // Show selected one
    if (order.paymentMethod === PAYMENT_METHODS.CREDIT_CARD) {
      creditCardBtn.classList.add("selected");
      creditCardForm.style.display = "block";
    } else if (order.paymentMethod === PAYMENT_METHODS.WIRE_TRANSFER) {
      wireTransferBtn.classList.add("selected");
      wireTransferForm.style.display = "block";
    }
  };

  // Set observer
  order.setObserver(paymentUpdate);
  paymentUpdate(order);

  // Bind form inputs to order object
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

  // Add onclick eventlistener to "Order Now" button
  const orderButton = document.getElementById("order-button");
  orderButton.addEventListener("click", () => openOrderDetailsModal(order));

  openPage(PAGES.PAYMENT);
}

function init() {
  // initialize books page
  initBookListPage();

  // initialize basket page
  initBasketPage();

  // Add eventlistener to search after click enter key
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBooks();
    }
  });
}

window.onload = init;

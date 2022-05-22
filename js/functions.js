const booklist = new BookList();
let basket = new Basket();

const BOOK_CATEGORY = {
  SCIFI: "Sci-Fi",
  FANTASY: "Fantasy Fiction",
  BILDUNG: "Bildungsroman",
  POETRY: "Poetry",
};

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
  localStorage.setItem("basket", null);
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
  const bookListContent = document.getElementById("booklist-content");
  const bookListElement = BookListElement(booklist, basket);
  bookListContent.innerHTML = "";
  bookListContent.appendChild(bookListElement);
}

function initBookListPage(data) {
  booklist.clearBooks();

  // Create books
  for (let bookData of data) {
    const book = new Book({
      ...bookData,
    });
    booklist.addBook(book);
  }

  const bookListContent = document.getElementById("booklist-content");
  bookListContent.innerHTML = "";

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

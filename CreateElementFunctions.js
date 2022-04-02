function BasketElement(basket, readonly) {
  const basketList = document.createElement("div");
  basketList.classList.add("basket-list");

  for (let book of basket.books) {
    const basketItem = document.createElement("div");
    basketItem.classList.add("basket-item");

    const bookImg = document.createElement("img");
    bookImg.classList.add("basket-item-img");
    bookImg.src = book.image_url;

    const basketItemInfo = document.createElement("div");
    basketItemInfo.classList.add("basket-item-info");

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("basket-item-title");
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("basket-item-author");
    bookAuthor.innerText = book.author;

    const bookPrice = document.createElement("div");
    bookPrice.classList.add("basket-item-price");
    bookPrice.innerText = `${(book.price * book.count).toFixed(2)}$`;

    basketItemInfo.appendChild(bookTitle);
    basketItemInfo.appendChild(bookAuthor);
    basketItemInfo.appendChild(bookPrice);

    const addRemoveButtons = document.createElement("div");
    addRemoveButtons.classList.add("basket-item-add-remove-buttons");

    const addButton = document.createElement("button");
    addButton.innerText = "+";
    addButton.onclick = () => {
      basket.addBook(book);
    };

    const countDiv = document.createElement("div");
    countDiv.innerText = book.count + 0;

    const removeButton = document.createElement("button");
    removeButton.innerText = "-";
    removeButton.onclick = () => {
      basket.removeBook(book);
    };

    if (!readonly) {
      addRemoveButtons.appendChild(removeButton);
    }
    addRemoveButtons.appendChild(countDiv);
    if (!readonly) {
      addRemoveButtons.appendChild(addButton);
    }

    basketItem.appendChild(bookImg);
    basketItem.appendChild(basketItemInfo);
    basketItem.appendChild(addRemoveButtons);

    basketList.appendChild(basketItem);
  }

  return basketList;
}

function BookElement(book, basket) {
  const bookItem = document.createElement("div");
  bookItem.classList.add("book-item");

  const bookItemBody = document.createElement("div");
  bookItemBody.classList.add("book-item-body");

  const bookImg = document.createElement("img");
  bookImg.classList.add("book-img");

  bookImg.src = `${book.image_url}`;

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");

  const bookTitle = document.createElement("div");
  bookTitle.classList.add("book-title");
  bookTitle.innerText = `${book.title}`;

  const bookAuthor = document.createElement("div");
  bookAuthor.classList.add("book-author");
  bookAuthor.innerText = `${book.author}`;

  const bookDesc = document.createElement("div");
  bookDesc.classList.add("book-desc");
  bookDesc.innerText = `${book.description}`;

  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookAuthor);
  bookInfo.appendChild(bookDesc);

  bookItemBody.appendChild(bookImg);
  bookItemBody.appendChild(bookInfo);

  const bookBuyButtonDiv = document.createElement("div");
  bookBuyButtonDiv.classList.add("book-buy-button-div");

  const buyButton = document.createElement("button");
  buyButton.classList.add("book-buy-button");
  buyButton.innerText = `${book.price}$ - add to basket`;

  buyButton.onclick = () => {
    basket.addBook(book);
  };

  bookBuyButtonDiv.appendChild(buyButton);

  bookItem.appendChild(bookItemBody);
  bookItem.appendChild(bookBuyButtonDiv);

  return bookItem;
}

function BookListElement(bookList, basket) {
  const row = document.createElement("div");
  row.classList.add("row");

  const searchText = document.getElementById("search-input").value;
  const books = bookList.getBooks(searchText);

  for (let book of books) {
    const bookElement = BookElement(book, basket);
    row.appendChild(bookElement);
  }

  return row;
}

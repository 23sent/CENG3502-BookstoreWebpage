class Book {
  constructor({ id, author, title, image_url, price, description }) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.image_url = image_url;
    this.price = price;
    this.description = description;
  }
}

class BasketBook extends Book {
  constructor({ ...bookdata }) {
    super(bookdata);
    this.count = 1;
  }
}

class BookList {
  constructor() {
    this.books = [];
    this._observer = null;
  }

  addBook(book) {
    this.books.push(book);
    if (this._observer) {
      this._observer(this);
    }
  }

  getBooks(searchText) {
    return this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchText.toLowerCase()) ||
        book.author.toLowerCase().includes(searchText.toLowerCase()) ||
        book.description.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  setObserver(observerFunc) {
    this._observer = observerFunc;
  }
}

class Basket {
  constructor() {
    this.books = [];
    this._observer = null;
  }

  addBook(book) {
    if (this.books.some((b) => b.id === book.id)) {
      const bookInBasket = this.books.find((b) => b.id === book.id);
      bookInBasket.count += 1;
    } else {
      this.books.push(new BasketBook({ ...book }));
    }

    if (this._observer) {
      this._observer(this);
    }
  }

  removeBook(book) {
    const bookInBasket = this.books.find((b) => b.id === book.id);
    bookInBasket.count -= 1;

    if (bookInBasket.count <= 0) {
      // Remove book from basket
      this.books = this.books.filter((b) => b.id !== book.id);
    }

    if (this._observer) {
      this._observer(this);
    }
  }

  setObserver(observerFunc) {
    this._observer = observerFunc;
  }

  getCount() {
    return this.books.reduce((sum, book) => sum + Number(book.count), 0);
  }

  getPrice() {
    return this.books
      .reduce((sum, book) => sum + Number(book.price) * Number(book.count), 0)
      .toFixed(2);
  }
}

const PAYMENT_METHODS = {
  CREDIT_CARD: "CREDIT_CARD",
  WIRE_TRANSFER: "WIRE_TRANSFER",
};

class Order {
  constructor(basket) {
    this.customer_name = "";
    this.customer_surname = "";
    this.address = "";
    this.paymentMethod = PAYMENT_METHODS.CREDIT_CARD;
    this.paymentInfo = {};
    this.basket = basket;
    this._observer = null;
  }

  setCustomerName(value) {
    this.customer_name = value;
    if (this._observer) {
      this._observer(this);
    }
  }

  setCustomerSurname(value) {
    this.customer_surname = value;
    if (this._observer) {
      this._observer(this);
    }
  }

  setAdress(value) {
    this.address = value;
    if (this._observer) {
      this._observer(this);
    }
  }

  setPaymentMethod(method) {
    this.paymentMethod = method;
    if (this._observer) {
      this._observer(this);
    }
  }

  setObserver(observer) {
    this._observer = observer;
  }
}

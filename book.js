let basket = new Basket();

function init() {
  const localBasket = JSON.parse(localStorage.getItem("basket"));
  if (localBasket?.books?.length) {
    basket = Object.assign(new Basket(), localBasket);
  }

  // Bind basket button on navbar to basket object.
  const basketBadge = document.getElementById("basket-badge");
  basketBadge.innerText = basket.getCount();

  const basketButton = document.getElementById("navbar-basket-container");
  basketButton.onclick = () => {
    window.location = "index.php?page=BASKET";
  };

  // Set observer
  basket.setObserver((basket) => {
    const basketBadge = document.getElementById("basket-badge");
    basketBadge.innerText = basket.getCount();
  });

  const buyButton = document.getElementById("buy-button");
  buyButton.onclick = () => {
    basket.addBook(book);
    localStorage.setItem("basket", JSON.stringify(basket));
  };

  document.getElementById("navbar-basket-container").style.display = null;
}

window.onload = init;

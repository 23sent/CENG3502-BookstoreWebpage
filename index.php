<?php
include("./php/functions.php"); // start session and import some useful functions.
?>

<!DOCTYPE html>

<html lang="en">

<head>
  <title>Library</title>
  <link rel="stylesheet" href="./bootstrap/bootstrap-grid.css">
  <link rel="stylesheet" href="./index.css" />
</head>

<script src="./js/books.js"></script>
<script src="./js/DataClasses.js"></script>
<script src="./js/CreateElementFunctions.js"></script>
<script src="./js/functions.js"></script>

<body>
  <?php include("navbar.php") ?>


  <div id="booklist-page" class="container" style="display: block">
    <div class="page-header">
      <div class="page-title">Books </div>
      <div class="d-flex justify-content-center" style="flex-wrap: wrap">
        <div class="search-input-div my-1">
          <input id="search-input" type="text" placeholder="Search..." />
          <span id="search-button" class="search-input-icon" onclick="searchBooks()">&#x1F50E;&#xFE0E;</span>
        </div>
        <div>
          <select id="category-filter" class="my-1"></select>
        </div>
      </div>
    </div>
    <div id="booklist-content"> </div>
  </div>



  <div id="basket-page" class="container" style="display: none">
    <div class="page-header">
      <div class="page-title">Basket</div>
      <div class="total-price-div">
        <button onclick="openPage(PAGES.BOOKS)" style="margin: 2px">Continue Shopping</button>

        <button onclick="openPaymentPage()" style="margin: 2px">
          <span>Total: </span>
          <span id="total-price"></span>
          <span> - Buy it</span>
        </button>
      </div>
    </div>
    <div id="basket-content"> </div>
  </div>

  <div id="payment-page" style="display: none">
    <div class="container">
      <div class="page-title">Payment</div>
      <div class="payment-form-div">
        <div class="payment-form-title">Address</div>
        <form id="payment-address-form" class="payment-form">
          <div class="payment-form-row">
            <div class="payment-form-question">
              <label>Name</label>
              <input id="customer-name" name="customer-name type=" text" />
            </div>
            <div class="payment-form-question">
              <label>Surname</label>
              <input id="customer-surname" name="customer-surname" type="text" />
            </div>
          </div>

          <div class="payment-form-row">
            <div class="payment-form-question">
              <label>Address</label>
              <textarea id="customer-address" name="customer-address" rows="5"></textarea>
            </div>
          </div>
        </form>
      </div>

      <div class="payment-form-div">
        <div class="payment-form-title">
          <span>Payment Method: </span>
          <span class="payment-option-list">
            <button id="credit-card-option-button" class="payment-option">Credit Card</button>
            <button id="wire-transfer-option-button" class="payment-option">Wire Transfer</button>
          </span>
        </div>


        <form id="payment-credit-card-form" class="payment-form">
          <div class="payment-form-row">
            <div class="payment-form-question">
              <label>Name Surname</label>
              <input name="cardholder" type="text" />
            </div>
            <div class="payment-form-question">
              <label>Card Number</label>
              <input name="card_number" type="text" />
            </div>
          </div>

          <div class="payment-form-row">

            <div class="payment-form-question">
              <label>Expiry Date</label>
              <input name="expiry_date" type="text" />
            </div>
            <div class="payment-form-question">
              <label>CVC Code</label>
              <input name="cvc" type="number" />
            </div>
          </div>
        </form>

        <div id="payment-wire-transfer-form" class="payment-form">
          <div class="payment-form-row">
            <div class="wire-transfer-info">
              <div> Please use following transfer details:</div>
              <div> Bank Name: İŞ BANK</div>
              <div> Account Number: 01XXXXXXXXXXXXXXX </div>
              <div> ........ </div>
            </div>
          </div>
        </div>
      </div>


      <div class="payment-info">
        <div class="payment-form-title">Customer Details</div>
        <div class="payment-info-col">
          <div class="payment-info-item">
            <div class="payment-info-title">Name Surname</div>
            <div id="order-customername"></div>
          </div>
          <div class="payment-info-item">
            <div class="payment-info-title">Adress</div>
            <div id="order-address"></div>
          </div>
        </div>

        <div class="payment-info-col">
          <div class="payment-info-item">
            <div class="payment-info-title">Total</div>
            <div id="order-total-price"> </div>
          </div>
          <div class="payment-info-item">
            <button id="order-button">Order Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="order-details-modal" class="modal modal-lg">
    <div class="modal-content">
      <div class="container">
        <h2>Order Details</h2>
        <h3>Your order is on its way.</h3>
      </div>

      <div class="container">
        <h2>Customer</h2>
        <div class="padding-10">
          <div id="customer-info"></div>
        </div>
      </div>

      <div class="container">
        <h2>Adress</h2>
        <div class="padding-10">
          <div id="address-info"></div>
        </div>
      </div>

      <div class="container">
        <h2>Payment Method</h2>
        <div class="padding-10">
          <h3 id="payment-method-info"></h3>
          <div id="payment-info"></div>
        </div>
      </div>

      <div class="container">
        <h2>Ordered Books</h2>
        <div id="order-basket-info"></div>
      </div>

      <div class="add-book-button-div">
        <button onclick="closeOrderDetailsModal()">Continue Shopping</button>
      </div>
    </div>
  </div>

  <?php include("footer.php") ?>
  <script src="./index.js"></script>
</body>

</html>
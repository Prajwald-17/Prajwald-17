'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}

// let cart = [];

// function addToCart(item ) {
//   cart.push(item);
//   updateCartPopup();
// }

// function updateCartPopup() {
//   const cartItemsElement = document.getElementById('cartItems');
//   cartItemsElement.innerHTML = '';

//   cart.forEach(function(item) {
//     const li = document.createElement('li');
//     li.textContent = item;
//     cartItemsElement.appendChild(li);
//   });
// }

// function showCart() {
//   document.getElementById('overlay').style.display = 'block';
//   document.getElementById('cartPopup').style.display = 'block';
//   updateCartPopup(); // important
// }

// function closeCart() {
//   document.getElementById('overlay').style.display = 'none';
//   document.getElementById('cartPopup').style.display = 'none';
// }
 
/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});



let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartPopup();
  updateCartCount();
}

function updateCartPopup() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartTotal.textContent = `Total: ₹${total}`;
}

function updateCartCount() {
  const cartCount = document.querySelector('.iconcart span');
  cartCount.textContent = cart.length;
}

function openCart() {
  document.getElementById('cart-popup').style.display = 'flex';
  updateCartPopup();
}

function closeCart() {
  document.getElementById('cart-popup').style.display = 'none';
}

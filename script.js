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

// Add padding to the body to account for the fixed header
document.body.style.paddingTop = header.offsetHeight + 'px';

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
const GST_RATE = 0.18; // 18% GST

function addToCart(name, price) {
  // Check if item already exists in cart
  const existingItemIndex = cart.findIndex(item => item.name === name);
  
  if (existingItemIndex !== -1) {
    // If item exists, increase quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // If item doesn't exist, add new item with quantity 1
    cart.push({ name, price, quantity: 1 });
  }
  
  // Show notification
  showAddedToCartNotification(name);
  
  // Update cart UI
  updateCartPopup();
  updateCartCount();
}

function removeFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCartPopup();
  updateCartCount();
}

function showAddedToCartNotification(itemName) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById('cart-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    document.body.appendChild(notification);
  }
  
  // Set notification content and show it
  notification.textContent = `${itemName} added to cart!`;
  notification.className = 'show-notification';
  
  // Hide notification after 2 seconds
  setTimeout(() => {
    notification.className = '';
  }, 2000);
}

function updateCartPopup() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  
  let subtotal = 0;
  
  // Show/hide fallback checkout button
  const fallbackCheckout = document.getElementById('fallback-checkout');
  
  if (cart.length === 0) {
    const emptyCartMsg = document.createElement('li');
    emptyCartMsg.className = 'empty-cart-message';
    emptyCartMsg.textContent = 'Your cart is empty';
    cartItems.appendChild(emptyCartMsg);
    cartTotal.innerHTML = '';
    
    // Hide fallback checkout when cart is empty
    if (fallbackCheckout) {
      fallbackCheckout.style.display = 'none';
    }
    return;
  }
  
  // Show fallback checkout when cart has items
  if (fallbackCheckout) {
    fallbackCheckout.style.display = 'block';
  }
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    
    li.innerHTML = `
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₹${item.price} × ${item.quantity}</span>
      </div>
      <div class="cart-item-total">₹${itemTotal}</div>
      <div class="cart-item-actions">
        <button class="cart-item-remove" onclick="removeFromCart(${index})">−</button>
        <button class="cart-item-add" onclick="addToCart('${item.name}', ${item.price})">+</button>
      </div>
    `;
    
    cartItems.appendChild(li);
  });
  
  // Calculate GST and total
  const gstAmount = subtotal * GST_RATE;
  const total = subtotal + gstAmount;
  
  // Display the totals
  cartTotal.innerHTML = `
    <div class="cart-totals">
      <div class="cart-subtotal">
        <span>Subtotal:</span>
        <span>₹${subtotal.toFixed(2)}</span>
      </div>
      <div class="cart-gst">
        <span>GST (18%):</span>
        <span>₹${gstAmount.toFixed(2)}</span>
      </div>
      <div class="cart-final-total">
        <span>Total:</span>
        <span>₹${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" id="checkout-button" type="button" onclick="showOrderConfirmation()">Proceed to Checkout</button>
    </div>
  `;
  
  // The checkout button already has an onclick attribute, so we don't need to add an event listener
}


function updateCartCount() {
  const cartCount = document.querySelector('.iconcart span');
  // Calculate total quantity of items
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function openCart() {
  console.log('Opening cart...');
  const cartPopup = document.getElementById('cart-popup');
  console.log('Cart popup element:', cartPopup);
  if (cartPopup) {
    // Force display to flex
    cartPopup.style.display = 'flex';
    console.log('Cart popup display set to flex');
    // Update the cart contents
    updateCartPopup();
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Cart popup element not found!');
    alert('Cart popup not found! Please check the console for more information.');
  }
}

function closeCart() {
  console.log('Closing cart...');
  const cartPopup = document.getElementById('cart-popup');
  if (cartPopup) {
    cartPopup.style.display = 'none';
    console.log('Cart popup display set to none');
    // Restore scrolling on the body
    document.body.style.overflow = '';
  } else {
    console.error('Cart popup element not found!');
  }
}

// Test function to directly show the cart popup
function testShowCart() {
  const cartPopup = document.getElementById('cart-popup');
  if (cartPopup) {
    cartPopup.style.display = 'flex';
    console.log('Cart popup shown via test function');
  } else {
    console.error('Cart popup not found in test function');
    alert('Cart popup not found in test function');
  }
}

// Function to redirect to the order confirmation page
function showOrderConfirmation() {
  // First close the cart popup if it's open
  const cartPopup = document.getElementById('cart-popup');
  if (cartPopup) {
    cartPopup.style.display = 'none';
  }
  
  // Calculate order totals
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
  });
  
  const gstAmount = subtotal * GST_RATE;
  const total = subtotal + gstAmount;
  
  // Save order details to localStorage for the confirmation page
  const orderDetails = {
    items: cart,
    subtotal: subtotal,
    gst: gstAmount,
    total: total
  };
  
  localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  localStorage.setItem('orderPlaced', 'true');
  
  // Clear the cart
  cart = [];
  updateCartCount();
  
  // Redirect to the order confirmation page
  window.location.href = 'order-confirmation.html';
}

// Initialize cart count on page load and set up event listeners
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  
  console.log('DOM fully loaded');
  
  // Test if cart popup exists
  const cartPopupTest = document.getElementById('cart-popup');
  console.log('Cart popup element on load:', cartPopupTest);
  
  // Add event listener to cart button
  const cartButton = document.querySelector('.view-cart-btn');
  if (cartButton) {
    console.log('Cart button found, adding event listener');
    cartButton.addEventListener('click', function(event) {
      console.log('Cart button clicked via event listener');
      // Call openCart directly
      openCart();
      // Prevent any default behavior
      if (event.preventDefault) event.preventDefault();
      return false;
    });
  } else {
    console.error('Cart button not found!');
  }
  
  // Add event listener to close button
  const closeButton = document.querySelector('.close-btn');
  if (closeButton) {
    console.log('Close button found, adding event listener');
    closeButton.addEventListener('click', function(event) {
      console.log('Close button clicked via event listener');
      closeCart();
    });
  } else {
    console.error('Close button not found!');
  }
  
  // Add event listener to close cart when clicking outside
  const cartPopup = document.getElementById('cart-popup');
  if (cartPopup) {
    console.log('Cart popup found, adding click outside listener');
    cartPopup.addEventListener('click', function(event) {
      // If the click is on the background (not on the cart content)
      if (event.target === cartPopup) {
        console.log('Clicked outside cart content, closing cart');
        closeCart();
      }
    });
  } else {
    console.error('Cart popup not found for outside click listener!');
  }
  
  // Add event listener for order confirmation popup to close when clicking outside
  document.addEventListener('click', function(event) {
    const confirmationPopup = document.getElementById('order-confirmation-popup');
    if (confirmationPopup && confirmationPopup.style.display === 'flex') {
      // If the click is on the background (not on the popup content)
      if (event.target === confirmationPopup) {
        console.log('Clicked outside confirmation popup, closing it');
        confirmationPopup.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
    
    // Check if the clicked element is the checkout button
    if (event.target.classList.contains('checkout-btn')) {
      console.log('Checkout button clicked via event delegation');
      showOrderConfirmation();
    }
  });
  
  // Add a timeout to test if cart popup can be shown after a delay
  setTimeout(function() {
    console.log('Testing cart popup visibility after 2 second delay');
    const delayedCartPopup = document.getElementById('cart-popup');
    if (delayedCartPopup) {
      console.log('Cart popup found after delay');
      
      // Add direct event listener to checkout button if it exists
      const checkoutBtn = document.getElementById('checkout-button');
      if (checkoutBtn) {
        console.log('Checkout button found, adding direct event listener');
        checkoutBtn.addEventListener('click', function() {
          console.log('Checkout button clicked via direct event listener');
          showOrderConfirmation();
        });
      } else {
        console.log('Checkout button not found after delay, will use event delegation');
      }
    } else {
      console.error('Cart popup still not found after delay');
    }
  }, 2000);
  
  // Add a mutation observer to watch for the checkout button being added to the DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.nodeType === 1 && node.classList && node.classList.contains('checkout-btn')) {
            console.log('Checkout button detected by mutation observer');
            node.addEventListener('click', function() {
              console.log('Checkout button clicked via mutation observer');
              showOrderConfirmation();
            });
          }
        }
      }
    });
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
  
  /* Uncomment to automatically test the order confirmation popup
  setTimeout(function() {
    console.log('Testing order confirmation popup after 3 second delay');
    // Create a test item in the cart
    if (cart.length === 0) {
      cart.push({ name: 'Test Item', price: 100, quantity: 1 });
      updateCartCount();
    }
    // Show the confirmation popup
    showOrderConfirmation();
  }, 3000);
  */
});

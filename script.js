document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle --- (Existing Code)
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
            }
        });
    }

    // --- Wishlist Button Interaction --- (Enhanced for separate buttons)
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const wishlistCountSpan = document.querySelector('.wishlist-count'); // Get wishlist count span
    let wishlistCount = 0; // Placeholder count

    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Prevent triggering the product link if clicked

            const isActive = this.classList.toggle('active'); // Toggle visual state
            const icon = this.querySelector('i');

            if (isActive) {
                icon.classList.remove('far'); icon.classList.add('fas'); // Solid heart
                wishlistCount++;
                console.log('Added to wishlist (placeholder)');
                // ADD ACTUAL WISHLIST LOGIC HERE
            } else {
                icon.classList.remove('fas'); icon.classList.add('far'); // Regular heart
                wishlistCount--;
                console.log('Removed from wishlist (placeholder)');
                // ADD ACTUAL WISHLIST REMOVAL LOGIC HERE
            }

            // Update Wishlist Count Display (Optional)
            if (wishlistCountSpan) {
                 wishlistCountSpan.textContent = wishlistCount;
                 wishlistCountSpan.style.display = wishlistCount > 0 ? 'flex' : 'none'; // Show/hide count
            }
        });
    });


    // --- Add to Cart Button Interaction --- (Enhanced for separate buttons)
     const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
     const cartCountSpan = document.querySelector('.cart-count');

     addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation(); // Prevent triggering product link
            console.log('Add to cart clicked (placeholder)');

            // Find the product card associated with this button if needed
            const productCard = this.closest('.product-card');
            // You could get product ID, name, price from the card here if structured correctly
            // const productName = productCard.querySelector('.product-name').textContent;
            // console.log(`Adding ${productName} to cart`);

            // Update Cart Count (Visual Only)
            if(cartCountSpan) {
                let currentCount = parseInt(cartCountSpan.textContent, 10);
                cartCountSpan.textContent = currentCount + 1;
                 // Animation (Optional)
                const cartIcon = cartCountSpan.closest('.action-icon');
                if (cartIcon) {
                    cartIcon.style.transform = 'scale(1.2)';
                    setTimeout(() => { cartIcon.style.transform = 'scale(1)'; }, 200);
                }
            }
             // ADD ACTUAL ADD-TO-CART LOGIC HERE (Update data, send to server)
        });
    });

    // --- Placeholder for Filter Button Interaction ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            console.log(`Filter button clicked: ${filterType}`);
            // Toggle active state for visual feedback
            this.classList.toggle('active');

            // --- VERY BASIC Example: Show/Hide a corresponding options div ---
            // In a real app, this would involve fetching data or complex UI updates
            const optionsDiv = document.getElementById(`filter-options-${filterType}`);
            if (optionsDiv) {
                 if(this.classList.contains('active')) {
                     optionsDiv.style.display = 'block'; // Show options
                     // You might want to hide other open filter options here
                 } else {
                    optionsDiv.style.display = 'none'; // Hide options
                 }
            }
            // ADD ACTUAL FILTERING LOGIC HERE
        });
    });


    // --- Placeholder for Search ---
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-bar button');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Performing search for: ${query} (placeholder)`);
            // In a real app:
            // 1. Redirect to a search results page:
            //    window.location.href = `/search?q=${encodeURIComponent(query)}`;
            // 2. Or, if using SPA/AJAX, fetch results and update the product grid.
            alert(`Search initiated for: "${query}" (This is just a placeholder)`);
        }
    };

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }

    // --- Placeholder for Live Chat ---
    const chatLink = document.getElementById('live-chat-link');
    if (chatLink) {
        chatLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Live Chat integration would open here! (Placeholder)');
            // Integrate with a third-party chat service SDK or open a chat window/modal.
        });
    }

     // --- Placeholder for showing Detail/Cart/Wishlist/Account Pages ---
     // This is VERY basic - just shows/hides sections. A real site uses routing.
     const navLinks = document.querySelectorAll('.main-nav a, .header-actions a, .footer-section a');
     const pageSections = document.querySelectorAll('main > section[id$="-placeholder"]'); // Select placeholder sections
     const mainContentSections = document.querySelectorAll('main > section:not([id$="-placeholder"])'); // Select regular homepage sections

     navLinks.forEach(link => {
         link.addEventListener('click', (e) => {
             const targetId = link.getAttribute('href');
             if (targetId && targetId.startsWith('#') && targetId.endsWith('-placeholder')) {
                 e.preventDefault(); // Prevent default anchor jump
                 const targetSection = document.getElementById(targetId.substring(1)); // Remove #

                 if (targetSection) {
                     // Hide all main content and other placeholder sections
                     mainContentSections.forEach(sec => sec.style.display = 'none');
                     pageSections.forEach(sec => sec.style.display = 'none');
                     // Show the target placeholder section
                     targetSection.style.display = 'block';
                     window.scrollTo(0, 0); // Scroll to top
                 }
             } else if (targetId && targetId === '#homepage' || (link.closest('.logo') && targetId === '#')) {
                 // Handle clicking logo or a dedicated home link
                  e.preventDefault();
                  pageSections.forEach(sec => sec.style.display = 'none');
                  mainContentSections.forEach(sec => sec.style.display = 'block'); // Might need refinement based on specific section IDs
                  document.getElementById('homepage').style.display = 'block'; // Ensure main tag is visible
                  window.scrollTo(0, 0);
             }
             // Allow default behavior for external links or non-placeholder anchors
         });
     });


}); // End DOMContentLoaded

// cart.js - Handles interactions on the shopping cart page

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selections ---
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartSummary = document.querySelector('.cart-summary');
    const cartEmptyMessage = document.querySelector('.cart-empty');
    const subtotalEl = document.getElementById('cart-subtotal');
    const shippingEl = document.getElementById('cart-shipping'); // For dynamic shipping info
    const totalEl = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const couponForm = document.getElementById('coupon-form');
    const couponInput = document.getElementById('coupon-code');
    const couponMessageEl = document.getElementById('coupon-message');
    const headerCartCount = document.querySelector('.site-header .cart-count'); // To update header count

    // --- Constants & State ---
    const SHIPPING_COST = 5.00; // Example fixed shipping cost
    const VALID_COUPONS = { // Example valid coupons (CODE: discount percentage)
        'SAVE10': 10,
        'SUMMER20': 20
    };
    let currentDiscount = 0; // Stores the currently applied discount percentage
    let appliedCouponCode = null;

    // --- Utility Functions ---
    function formatCurrency(amount) {
        // Ensure amount is a number and handle potential NaN
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) {
            return '0.00'; // Or some error indicator
        }
        return numAmount.toFixed(2);
    }

    // --- Core Cart Functions ---

    /**
     * Updates the subtotal display for a single cart item based on its price and quantity.
     * @param {HTMLElement} itemElement - The cart item's container element.
     * @returns {number} The calculated subtotal for the item.
     */
    function updateItemSubtotal(itemElement) {
        const price = parseFloat(itemElement.dataset.price);
        const quantityInput = itemElement.querySelector('.item-quantity-input');
        const quantity = parseInt(quantityInput.value, 10);
        const subtotalValueEl = itemElement.querySelector('.item-subtotal-value');

        // Basic validation for quantity
        if (isNaN(price) || isNaN(quantity) || quantity < 1) {
            quantityInput.value = 1; // Reset quantity if invalid
            const singleItemPrice = isNaN(price) ? 0 : price;
            subtotalValueEl.textContent = formatCurrency(singleItemPrice);
            return singleItemPrice;
        }

        const itemSubtotal = price * quantity;
        subtotalValueEl.textContent = formatCurrency(itemSubtotal);
        return itemSubtotal;
    }

    /**
     * Checks if the cart is empty and updates the UI accordingly.
     */
    function checkCartEmpty() {
        const cartItems = cartItemsList.querySelectorAll('.cart-item');
        const hasItems = cartItems.length > 0;

        if (cartEmptyMessage) {
            cartEmptyMessage.style.display = hasItems ? 'none' : 'block';
        }
        if (cartSummary) {
            cartSummary.style.display = hasItems ? 'block' : 'none'; // Hide summary if cart is empty
        }
         // Optionally hide the items list container itself, although CSS might handle spacing better
        // cartItemsList.style.display = hasItems ? 'block' : 'none';

        // Disable checkout if cart is empty
        if(checkoutButton) {
            checkoutButton.classList.toggle('disabled', !hasItems);
            checkoutButton.setAttribute('aria-disabled', !hasItems);
            if(!hasItems) {
                checkoutButton.removeAttribute('href'); // Prevent navigation if disabled
            } else {
                 checkoutButton.setAttribute('href', 'checkout.html'); // Ensure link is active
            }
        }
    }


    /**
     * Recalculates and updates the entire cart summary (subtotal, discount, shipping, total).
     */
    function updateCartTotals() {
        const cartItems = cartItemsList.querySelectorAll('.cart-item');
        let calculatedSubtotal = 0;

        cartItems.forEach(item => {
            calculatedSubtotal += updateItemSubtotal(item); // Update each item and sum subtotals
        });

        // --- Update Subtotal Display ---
        subtotalEl.textContent = `$${formatCurrency(calculatedSubtotal)}`;

        // --- Apply Discount ---
        const discountAmount = calculatedSubtotal * (currentDiscount / 100);
        // Display coupon message if a valid coupon is applied
        if (appliedCouponCode && couponMessageEl) {
            couponMessageEl.textContent = `Coupon "${appliedCouponCode}" applied (${currentDiscount}% off)! -$${formatCurrency(discountAmount)}`;
            couponMessageEl.className = 'coupon-message success'; // Use class for styling
        } else if (appliedCouponCode === false && couponMessageEl) { // Handle invalid coupon attempt
             couponMessageEl.textContent = `Invalid coupon code.`;
             couponMessageEl.className = 'coupon-message error';
        } else if (couponMessageEl) {
            couponMessageEl.textContent = ''; // Clear message if no coupon or invalid attempt reset
            couponMessageEl.className = 'coupon-message';
        }


        // --- Calculate Shipping ---
        // Only add shipping if items exist and subtotal meets a threshold (optional)
        // const freeShippingThreshold = 50;
        // let shippingCost = (calculatedSubtotal > 0 && calculatedSubtotal < freeShippingThreshold) ? SHIPPING_COST : 0;
        let shippingCost = calculatedSubtotal > 0 ? SHIPPING_COST : 0; // Simple: shipping if items exist
        if (shippingEl) {
            if (calculatedSubtotal <= 0) {
                shippingEl.textContent = '$0.00';
            } else if (shippingCost === 0) {
                shippingEl.textContent = 'FREE'; // Indicate free shipping
            } else {
                shippingEl.textContent = `$${formatCurrency(shippingCost)}`;
            }
        }


        // --- Calculate Grand Total ---
        const calculatedTotal = calculatedSubtotal - discountAmount + shippingCost;
        totalEl.textContent = `$${formatCurrency(calculatedTotal)}`;

        // --- Update Header Cart Count ---
        if (headerCartCount) {
            // Could count unique items or total quantity based on needs
            headerCartCount.textContent = cartItems.length; // Example: count unique items
        }

        checkCartEmpty(); // Show/hide empty message, disable checkout if needed
    }


    // --- Event Handlers ---

    /**
     * Handles changes in the quantity input fields.
     * @param {Event} event - The input event object.
     */
    function handleQuantityChange(event) {
        if (event.target.classList.contains('item-quantity-input')) {
            const itemElement = event.target.closest('.cart-item');
            updateItemSubtotal(itemElement); // Update only the specific item's subtotal first
            updateCartTotals(); // Then recalculate the overall cart summary
            // Add logic here to update the actual cart data (e.g., send request to backend)
            console.log(`Quantity changed for item ${itemElement.dataset.id} to ${event.target.value}`);
        }
    }

    /**
     * Handles clicks on the remove item buttons.
     * @param {Event} event - The click event object.
     */
    function handleRemoveItem(event) {
        const button = event.target.closest('.remove-item-btn');
        if (button) {
            const itemToRemove = button.closest('.cart-item');
            const itemName = itemToRemove.querySelector('.item-name').textContent; // Get name for confirmation/logging

            // Optional: Add a confirmation dialog
            // if (!confirm(`Are you sure you want to remove "${itemName}" from your cart?`)) {
            //     return; // Stop if user cancels
            // }

            itemToRemove.remove(); // Remove from DOM
            updateCartTotals(); // Recalculate totals
            // Add logic here to update the actual cart data (e.g., send request to backend)
            console.log(`Removed item ${itemToRemove.dataset.id} (${itemName}) from cart`);
        }
    }

    /**
     * Handles the submission of the coupon code form.
     * @param {Event} event - The submit event object.
     */
    function handleCouponApply(event) {
        event.preventDefault(); // Prevent default form submission
        const code = couponInput.value.trim().toUpperCase(); // Get code, trim whitespace, uppercase

        if (!code) {
            couponMessageEl.textContent = 'Please enter a coupon code.';
            couponMessageEl.className = 'coupon-message error';
            appliedCouponCode = null; // Ensure no previous coupon stays active visually
            currentDiscount = 0;
            updateCartTotals(); // Recalculate totals without discount
            return;
        }

        if (VALID_COUPONS.hasOwnProperty(code)) {
            currentDiscount = VALID_COUPONS[code];
            appliedCouponCode = code; // Store the valid code that was applied
             console.log(`Applied coupon: ${code} for ${currentDiscount}% discount`);
        } else {
            currentDiscount = 0;
            appliedCouponCode = false; // Indicate an invalid code was attempted
             console.log(`Invalid coupon code entered: ${code}`);
        }

        couponInput.value = ''; // Clear the input field after attempt
        updateCartTotals(); // Recalculate totals with or without the discount
    }


    // --- Event Listeners Setup ---

    // Listen for changes/inputs in the quantity fields within the cart list
    if (cartItemsList) {
        cartItemsList.addEventListener('input', handleQuantityChange); // 'input' is often better than 'change' for responsiveness
        cartItemsList.addEventListener('click', handleRemoveItem); // Listen for clicks on remove buttons
    }

    // Listen for coupon form submission
    if (couponForm) {
        couponForm.addEventListener('submit', handleCouponApply);
    }

     // Prevent checkout navigation if button is disabled
     if (checkoutButton) {
        checkoutButton.addEventListener('click', (e) => {
            if (checkoutButton.classList.contains('disabled')) {
                e.preventDefault(); // Stop navigation
                console.log("Checkout prevented: Cart is empty or button disabled.");
            }
        });
     }

    // --- Initial Cart Calculation ---
    // Run once on page load to calculate totals for initially loaded items
    updateCartTotals();

}); // End DOMContentLoaded
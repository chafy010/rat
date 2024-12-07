// Wait for the page to load
document.addEventListener("DOMContentLoaded",  () => {
    // Find all the product cards
    // ".list-products > .card-body" ensures only direct children of .list-products are selected (the outermost ones).
    let products = document.querySelectorAll(".list-products > .card-body");
  
    // Find the total price element
    const totalPriceElement = document.querySelector(".total");
  
    // Function to calculate the total price
    function calculateTotal() {
      let total = 0; // Start with total = 0
  
      // Loop through each product
      products.forEach((product) => {
        // Get the price of the product
        const priceText = product.querySelector(".unit-price").textContent;
        const price = parseFloat(priceText.replace("$", ""));
  
        // Get the quantity of the product
        const quantityText = product.querySelector(".quantity").textContent;
        const quantity = parseInt(quantityText);
  
        // Add price * quantity to the total
        total += price * quantity;
      });
  
      return total; // Return the total amount
    }
  
    // Function to update the displayed total price
    function updateTotal() {
      const total = calculateTotal(); // Recalculate total
      totalPriceElement.textContent = total + " $"; // Update total on the page
    }
  
    // Add event listeners for the “+”, “-”, and delete buttons
    function addEventListenersToProduct(product) {
      // Find the “+”, “-”, and delete buttons and the quantity element
      const plusButton = product.querySelector(".fa-plus-circle");
      const minusButton = product.querySelector(".fa-minus-circle");
      const deleteButton = product.querySelector(".fa-trash-alt");
      const quantityElement = product.querySelector(".quantity");
  
      // When the “+” button is clicked
      plusButton.addEventListener("click", () => {
        let quantity = parseInt(quantityElement.textContent); // Get current quantity
        quantity += 1; // Increase quantity by 1
        quantityElement.textContent = quantity; // Update quantity on the page
        updateTotal(); // Update total price
      });
  
      // When the “-” button is clicked
      minusButton.addEventListener("click", () => {
        let quantity = parseInt(quantityElement.textContent); // Get current quantity
        if (quantity > 0) {
          quantity -= 1; // Decrease quantity by 1 (but not below 0)
          quantityElement.textContent = quantity; // Update quantity on the page
          updateTotal(); // Update total price
        }
      });
  
      // When the delete button is clicked
      deleteButton.addEventListener("click", () => {
        product.remove(); // Remove the product from the DOM
        products = document.querySelectorAll(".list-products > .card-body"); // Refresh the products list
        updateTotal(); // Update the total price after deletion
      });

      const heartButton = product.querySelector(".fa-heart");
      // When the heart button is clicked
        heartButton.addEventListener("click", () => {
        heartButton.classList.toggle("liked"); // Toggle red color 
      });

    }
  
    // Loop through each product and add event listeners
    products.forEach((product) => {
      addEventListenersToProduct(product);
    });
  
    // Show the initial total price
    updateTotal();
  });
  
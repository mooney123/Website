document.addEventListener('DOMContentLoaded', function () {
    
    // Retrieve cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Display cart items in the table
    const tableBody = document.getElementById('checkoutTableBody');
    const totalCostElement = document.getElementById('totalCost');

    let totalCost = 0;

    cartItems.forEach(item => {
        const row = tableBody.insertRow();
        
        // Product Image column
        const cellImage = row.insertCell(0);
        const image = document.createElement('img');
        image.src = item.imageUrl; // Assuming imageUrl is stored in the cart item
        image.alt = 'Product Image';
        image.style.maxWidth = '50px'; // Adjust the maximum width of the product image
        cellImage.appendChild(image);

        // Product Name column
        const cellName = row.insertCell(1);
        cellName.innerText = item.title;

        // Quantity column
        const cellQuantity = row.insertCell(2);
        cellQuantity.innerText = item.quantity;

        // Assuming that the price is in the format "X LYD", extract the numeric value
        const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));

        // Calculate total cost for the specific item
        const itemTotalCost = numericPrice * item.quantity;
        
        // Total Cost column
        const cellTotalCost = row.insertCell(3);
        cellTotalCost.innerText = `${itemTotalCost} LYD`;

        // Add the item's total cost to the overall total cost
        totalCost += itemTotalCost;
    });
    

    // Display the total cost
    totalCostElement.innerText = totalCost;
});

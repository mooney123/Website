document.addEventListener("DOMContentLoaded", function () {
// Variables to recognize the icon and the container block where the cart product list appears
const sbCart = document.querySelector('.iconbasket');
const cartProducts = document.querySelector('.container-cart-products');

// Add event listener to toggle the visibility of the cart products
sbCart.addEventListener('click', () => {
    cartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Query selector which helps us get all the products
const productsList = document.querySelector('.products');

// Array for the products
let allProducts = [];

// Variables to store the total value of the products in the shopping bag
const totalValue = document.querySelector('.Total-pay');
const countProducts = document.querySelector('#product-counterID');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// EventListener for the productsList that listens every time the user clicks
productsList.addEventListener('click', e => {
    // Add the item to the shopping bag when the user clicks on the button with the class add-cart
    if (e.target.classList.contains('add-cart')) {
        const product = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h4').textContent,
            price: product.querySelector('.price').textContent,
        };

        const exists = allProducts.some(
            product => product.title === infoProduct.title
        );

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
    }
});

// EventListener for the rowProduct that listens every time the user clicks
rowProduct.addEventListener('click', e => {
    // If the user clicks on the X icon of the product inside the shopping basket
    if (e.target.classList.contains('icon-X')) {
        // Remove that product from the cart
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );

        showHTML();
    }
});

// EventListener for the search bar to filter products
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value.toLowerCase();
        filterProductsBySearch(searchTerm);
    }
});

// Function to filter products based on the search term
function filterProductsBySearch(searchTerm) {
    const allProducts = document.querySelectorAll('.item');
    allProducts.forEach(product => {
        const productName = product.querySelector('h4').textContent.toLowerCase();
        const isVisible = productName.includes(searchTerm);
        product.style.display = isVisible ? 'block' : 'none';
    });
}

// Function to update the page and show the actual information in the shopping basket
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = '';
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = ` 
            <div class="cart-info-product">
                <span class="products-cart-cuantity">${product.quantity}</span>
                <p class="product-cart-name">${product.title}</p>
                <span class="price-cart-item">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-X"
            >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
        total = total + parseInt(product.quantity * numericPrice);
        totalOfProducts = totalOfProducts + product.quantity;
    });

    totalValue.innerText = ` ${total} LYD`;
    countProducts.innerText = totalOfProducts;
    localStorage.setItem('shoppingCart', JSON.stringify(allProducts));
};

window.addEventListener('load', () => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        allProducts = JSON.parse(storedCart);
        showHTML();
    }
});


const products = document.querySelectorAll(".item");

    function filterProducts() {
        const sortBy = document.querySelector(".sephora-select").value;
        const brand = document.querySelector(".sephora-select.brand").value;
        const type = document.querySelector(".sephora-select.type").value;
        const priceRange = document.querySelector(".sephora-select.price").value;

        products.forEach(product => {
            const productBrand = product.dataset.brand;
            const productType = product.dataset.type;
            const productPrice = parseInt(product.dataset.price);

            // Check conditions based on selected filters
            const showProduct = (
                (brand === "All Brands" || productBrand === brand) &&
                (type === "All Types" || productType === type) &&
                (priceRange === "All prices" || checkPriceRange(productPrice, priceRange))
            );

            // Show/hide products based on conditions
            if (showProduct) {
                product.classList.remove("hidden");
            } else {
                product.classList.add("hidden");
            }
        });

        // Additional code for updating product counter, total, etc.
        // ...

    }

    // Helper function to check if a product's price falls within the selected range
    function checkPriceRange(price, range) {
        const [min, max] = range.split("-").map(val => parseInt(val));
        return price >= min && price <= max;
    }

    // Event listener for dropdown changes
    document.querySelectorAll(".sephora-select").forEach(select => {
        select.addEventListener("change", filterProducts);
    });

    // Initial filtering when the page loads
    filterProducts();
});

 
//this are the variables to recognize the icon and the container block where the cart product list appear
// Query selector allows us to select a class or div or element by ID 
const sbCart = document.querySelector('.iconbasket')
const cartProducts = document.querySelector('.container-cart-products')

//this is and add event listener that is gonna check everytime that we do a click on the icon referenced in the variable
//sbCart,and this will letting us procced to use the cartPoducts box appear and dissapear from the screen.
sbCart.addEventListener('click', () =>{
    cartProducts.classList.toggle('hidden-cart')
})

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// query selector which help us to get all the products
const productsList = document.querySelector('.products');

// array for the products 
let allProducts = [
	// Product. [Quantity,Name,Price]
	// 1. 		[2,"Kint Wear",15.00],
	// 2. 		[1,"Turtle Neck",125.00]
];

//variable that gonna store the total value of the products in the shopping bag
const totalValue = document.querySelector('.Total-pay');
//variable to store the quantity of the products
const countProducts = document.querySelector('#product-counterID');


const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

//EventListener for the productsList that will listen every time 
//that the user click doing the next =
productsList.addEventListener('click', e => {
	//adding the item to the shopping bag when the user 
	//click on the button with the class add-cart
	//that is inside each product
	if (e.target.classList.contains('add-cart')) {
		const product = e.target.parentElement;
		
		const infoProduct = {
			quantity: 1,									//1
			title: product.querySelector('h4').textContent, //Knit wear
			price: product.querySelector('.price').textContent, //45.00
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);
		//and it will check if the product already exist 
		//in the shopping cart, if this exist it will modify the
		//quantity of the product and if this item doesnt exist 
		//it will be added to the shopping bag	
		if (exits) {
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
		//we use showHTML() to update the page and show the 
		//actual information in the shopping basket
		showHTML();
	}
});

//EventListener for the rowProduct that will listen every time 
//that the user click doing the next =
rowProduct.addEventListener('click', e => {

	//if the user click on the X icon of the product 
	//inside the shopping basket
	if (e.target.classList.contains('icon-X')) {
		//the event its gonna remove that product from the cart
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// function  to update the page and show the 
//actual information in the shopping basket
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

	// cleaning the HTML setting as empty removing all the 
	//content inside the rowProduct
	rowProduct.innerHTML = '';
	//initializing the total dn totalofProducts 
	//to 0, helping us with the total price and the quantity of the products 
	let total = 0;
	let totalOfProducts = 0;

	//checking in each product in the allProducts array
	//and will help us mantaining updates in the shopping basket
	//and when we add a new product or removing the product
	//showing the actual state of allProducts in the shopping bag
	allProducts.forEach(product => {

		//(Document Object Model) DOM API which allows JavaScript to create and manipulate HTML content
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

		//updating the total price and the total quantity for each product
		//and changing the values to integers multiplying the quantity by the price
		//and storing that to the current total
		total =
			total + parseInt(product.quantity * numericPrice);
		totalOfProducts = totalOfProducts + product.quantity;
	});
	//outside the loop we update the total price and total quantity of the products 
	//iside the shopping bag
	totalValue.innerText = ` ${total} LYD`;
	countProducts.innerText = totalOfProducts;
	localStorage.setItem('shoppingCart', JSON.stringify(allProducts));
	
};
window.addEventListener('load', () => {
    // Retrieve the cart data from localStorage
    const storedCart = localStorage.getItem('shoppingCart');

    // Parse the stored data if available
    if (storedCart) {
        allProducts = JSON.parse(storedCart);
        showHTML(); // Update the cart display
    }
});

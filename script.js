const productsGrid = document.getElementById('products-grid');
const searchBar = document.getElementById('searchbar_id');
let allProducts = [];
let cartItems = [];

// Function to fetch products from Fake Store API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error in fetching products:', error);
    }
}

// Function to display products
function displayProducts(products) {
    productsGrid.innerHTML = ''; 

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="Btnclick('${product.title.replace(/'/g, "\\'")}', '${product.description.replace(/'/g, "\\'")}', ${product.price})">Buy</button>
        `;

        productsGrid.appendChild(productElement);
    });
}

// Search filter function
searchBar.addEventListener('input', () => {
    const searchText = searchBar.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.title.toLowerCase().includes(searchText)
    );
    displayProducts(filteredProducts);
});


let Btnclick = (productTitle, productDescription, productPrice) => {
    let modal = document.createElement('div');
    modal.classList.add('modal_1');
    modal.innerHTML = `
    <div class="modal_2">
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <p><b>Product: ${productTitle}</b></p>
        <p><b>Description: </b>${productDescription}</p>
        <div class="quantity-controls">
          <b>Quantity: </b>
          <button id="decrease" class="btn">-</button>
          <span id="quantity">1</span> <!-- Initial quantity -->
          <button id="increase" class="btn">+</button>
        </div>
        <div class="p_flex">
          <div><p><button class="btn confirm-purchase" id="addToCart">Add to Cart</button></p></div>
          <div class="price_div"><p><b>Price: $<span id="finalPrice">${productPrice.toFixed(2)}</span></b></p></div>
        </div>
      </div>
    </div>`;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    modal.querySelector('.close-button').onclick = () => {
        modal.style.display = 'none';
        modal.remove();
    };

    let quantity = 1;
    const quantityDisplay = modal.querySelector('#quantity');
    const totalPriceDisplay = modal.querySelector('#finalPrice');

    // price changes when quantity changes
    const updateTotalPrice = () => {
        const totalPrice = (quantity * productPrice).toFixed(2);
        totalPriceDisplay.innerText = totalPrice;
    };

    modal.querySelector('#increase').onclick = () => {
        quantity++;
        quantityDisplay.innerText = quantity;
        updateTotalPrice();
    };

    modal.querySelector('#decrease').onclick = () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.innerText = quantity;
            updateTotalPrice();
        }
    };

    // Add product to cart when clicked
    modal.querySelector('#addToCart').onclick = () => {
        const cartItem = {
            title: productTitle,
            price: productPrice,
            quantity: quantity
        };
        cartItems.push(cartItem);
        modal.style.display = 'none';
        modal.remove();
        // console.log('Cart:', cartItems); 
    };
};



// Function to show the cart popup
const showCart = () => {
    let cartModal = document.createElement('div');
    cartModal.classList.add('cart_modal');

    cartModal.innerHTML = `
    <div class="cart_modal_content">
      <span class="cart-close-button">&times;</span>
      <h2>Your Cart</h2>
      <div id="cartItemsContainer"></div>
      <button class="btn" id="checkout">Checkout</button>
    </div>`;

    document.body.appendChild(cartModal);
    cartModal.style.display = 'block';

    const cartItemsContainer = cartModal.querySelector('#cartItemsContainer');
    cartItemsContainer.innerHTML = '';  // Clear previous items if any

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }
    cartModal.querySelector('.cart-close-button').onclick = () => {
        cartModal.style.display = 'none';
        cartModal.remove();
    };
    cartModal.querySelector('#checkout').onclick = () => {
        alert('Proceed to checkout!');
    };
};

// View cart button
const viewCartButton = document.createElement('button');
viewCartButton.classList.add('view-cart');
viewCartButton.innerText = 'View Cart';
document.body.appendChild(viewCartButton);
viewCartButton.onclick = showCart;

fetchProducts();


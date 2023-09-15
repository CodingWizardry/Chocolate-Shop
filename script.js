// Array to store selected chocolates
const selectedChocolates = [];

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartDetails = document.createElement("div");
    cartDetails.style.display = "flex";
    cartDetails.style.justifyContent = "space-between";

    const totalPriceDiv = document.createElement("div");
    totalPriceDiv.style.fontSize = "25px";

    const quantityDiv = document.createElement("div");

    cartItems.innerHTML = "";

    let total = 0;
    selectedChocolates.forEach(chocolate => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item", "d-flex");

        const imageDiv = document.createElement("div");
        const image = document.createElement("img");
        image.src = chocolate.image;
        image.alt = "Chocolate Image";
        image.style.maxWidth = "20vw";
        imageDiv.appendChild(image);
        itemDiv.appendChild(imageDiv);

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("flex-grow-1", "ml-3");

        const name = document.createElement("p");
        name.textContent = chocolate.name;
        name.style.fontSize = "20px";
        detailsDiv.appendChild(name);

        const price = document.createElement("p");
        price.textContent = `Price: ₹${chocolate.price}`;
        price.style.fontSize = "20px";
        detailsDiv.appendChild(price);

        itemDiv.appendChild(detailsDiv);

        const quantityDiv = document.createElement("div");
        quantityDiv.classList.add("quantity-input", "col-md-4", "col-sm-6");

        const quantity = document.createElement("select");
        quantity.classList.add("form-control");
        quantity.addEventListener("change", () => {
            chocolate.quantity = parseInt(quantity.value);
            updateCart();
        });

        for (let i = 1; i <= 8; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            quantity.appendChild(option);
        }

        quantity.value = chocolate.quantity;
        quantityDiv.appendChild(quantity);
        detailsDiv.appendChild(quantityDiv);

        cartItems.appendChild(itemDiv);

        total += chocolate.price * chocolate.quantity;
    });

    totalPriceDiv.textContent = `Total Price: ₹${total.toFixed(2)}`;

    cartDetails.appendChild(totalPriceDiv);
    cartDetails.appendChild(quantityDiv);

    cartItems.appendChild(cartDetails);
}

function addToCart(name, price, image) {
    const existingChocolate = selectedChocolates.find(chocolate => chocolate.name === name);

    if (existingChocolate) {
        if (existingChocolate.quantity < 8) {
            existingChocolate.quantity++;
            updateCart();
        } else {
            alert("You can select up to 8 chocolates of the same type.");
        }
    } else {
        selectedChocolates.push({
            name: name,
            price: price,
            quantity: 1,
            image: image,
        });
        updateCart();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const chocolateName = card.querySelector(".card-title").textContent;
            const chocolatePrice = parseFloat(card.querySelector(".card-text").textContent.replace("Price: ₹", ""));
            const chocolateImage = card.querySelector(".card-img-top").src;

            addToCart(chocolateName, chocolatePrice, chocolateImage);
        });
    });
});

const placeOrderBtn = document.getElementById("placeOrderBtn");
placeOrderBtn.addEventListener("click", () => {
    alert("Your order has been placed!");
});

updateCart();

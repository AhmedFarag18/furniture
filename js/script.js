const bagCartCount = document.querySelector(".shopping-cart-count");
const shoppingCart = document.querySelector(".shopping-cart");
const addToCart = document.querySelectorAll(".addToCart");
const itemPrice = document.querySelector(".item-price");
const totalPrice = document.querySelector(".total-price");
const deleteItem = document.querySelectorAll(".delete-item");
const shoppingBag = document.querySelector(".fa-shopping-bag");
const shoppingCartPrice = document.querySelector(".shopping_cart-price");

// show & hide shopping cart
bagCartCount.addEventListener("click", () => {
    shoppingCart.classList.toggle("show");
});

addToCart.forEach(btn => {
    btn.addEventListener("click", function(event) {
        if (event.target.parentElement.classList.contains("addToCart")) {
            selectedItem(event);
            addedSucess();
            showTotal();
        }
    });
});

// ================= show alert when added new product to cart ================= 
function addedSucess() {
    let alertAdded = document.querySelector(".alert-added");
    alertAdded.innerHTML = `<div class="alert alert-success">Product Added Successfully</div>`;
    document.querySelector(".alert").classList.add("show");
    setTimeout(() => {
        document.querySelector(".alert").classList.remove("show");
    }, 2000);
}

// ================= Selected the Item you clicked it  ================= 
function selectedItem(event) {
    let fullPath = event.target.parentElement.parentElement.previousElementSibling.src;
    let pos = fullPath.indexOf('images') + 15;
    let imgPath = fullPath.slice(pos);

    let item = {};
    item.img = `images/category${imgPath}`;
    let name = event.target.closest(".products-img").nextElementSibling.children[1].textContent;
    item.name = name;
    let price = event.target.closest(".products-img").nextElementSibling.children[2].children[0].textContent;
    let finalPrice = price.slice(1).trim();
    item.price = finalPrice;

    document.querySelector(".no_products").innerHTML = "";
    // call function to update changes at the page
    updateUI(item);
    // delete item from cart
    DeleteItemCart();
}

// ================= Make changes in the page UI ================= 
function updateUI(item) {
    const cartItem = document.createElement("div");
    cartItem.className = "item";
    cartItem.innerHTML = `
                    <img src="${item.img}" alt="item">
                    <div class="name">
                    <span class="title">${item.name}</span>
                        <span class="item-price">${item.price}</span>$
                        &nbsp;<input type="number" class="cart-quantity" value="1"></input>  
                    </div>
                    <i class="fa fa-trash delete-item"></i>
            `;
    shoppingCart.insertBefore(cartItem, shoppingCartPrice);
}

// ===================== change quantity ===================== 
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    showTotal();
}

// ================= Remove Items from Cart ================= 
function DeleteItemCart() {
    const deleteBtns = document.querySelectorAll(".delete-item")
    for (let i = 0; i < deleteBtns.length; i++) {
        const button = deleteBtns[i];
        button.addEventListener("click", removeCartItem);
    }
    // whwn change quantity
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        const input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
};

// ================= remove the Div item from Html ================= 
function removeCartItem(event) {
    var itemClicked = event.target;
    itemClicked.parentElement.remove();
    showTotal();
}

// ===================== update total price ================
function showTotal() {
    let cartContent = document.querySelector(".shopping-cart");
    let cartBoxes = cartContent.querySelectorAll(".item");
    let totalP = 0;
    let quantity = 0;

    cartBoxes.forEach(function(ele) {
        let priceElement = ele.querySelector(".item-price");
        let quantityElement = ele.querySelector(".cart-quantity");

        let price = parseFloat(priceElement.innerHTML);
        quantity = parseInt(quantity + +quantityElement.value);
        totalP = totalP + (price * quantity);
    });
    shoppingBag.setAttribute("data-count", quantity);

    const finalMoney = totalP.toFixed(2);
    console.log(totalP);
    totalPrice.innerHTML = finalMoney + " $";
}
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {


    var quantityInputs = document.getElementsByClassName('pro-quantity')
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


    var addtoCartButtons = document.getElementsByClassName('btn')
    for(var i = 0; i < addtoCartButtons.length; i++) {
        var button = addtoCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }


    var removeCartItemButtons =  document.getElementsByClassName('btn-cart')
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }


    document.getElementsByClassName('purchase-cart')[0].addEventListener('click', purchaseClicked)
}


function purchaseClicked() {
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}


function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


function quantityChanged(event) {
        var input = event.target
        if(isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
}


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var shopOut = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('pro-title')[0].innerText
    var price = shopItem.getElementsByClassName('pro-price')[0].innerText
    var imageSrc = shopOut.getElementsByClassName('pro-image')[0].src
   
    addItemtoCart(title, price, imageSrc)
    updateCartTotal()
}


function addItemtoCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-pro-title')
    for(var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerHTML == title) {
            alert('This item is already in cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-pro-title"><p>${title}</p></span>
        </div>
        <span class="cart-price cart-column"><p>${price}</p></span>
        <div class="cart-quantity cart-column">
            <input class="pro-quantity" type="number" value="1">
            <button class="btn btn-cart" type="button">Remove</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-cart')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('pro-quantity')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('pro-quantity')[0]


        var price = parseFloat(priceElement.innerText.replace('$', ''))


        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total*100) / 100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}






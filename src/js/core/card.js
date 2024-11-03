import Swal from "sweetalert2";
import { cardItemTemplate, cartCount, cartItem, cartItemCount, cartTotal, productGroup } from "./selector"

export const createCardItem = (product, quantity) => {
    const template = cardItemTemplate.content.cloneNode(true);
    template.querySelector(".cart-item").setAttribute("cart-product-id", product.id);
    template.querySelector(".card-item-img").src = product.image;
    template.querySelector(".card-item-title").innerText = product.title;
    template.querySelector(".card-item-price").innerText = product.price;
    template.querySelector(".card-item-cost").innerText = product.price * quantity;
    template.querySelector(".card-quantity").innerText = quantity;
    return template;
}

export const countCartItem = () => {
    const totalItemCart = document.querySelectorAll(".cart-item");
    return totalItemCart.length;
}

export const updateCartItemCount = () => {
    const currentTotal = countCartItem();
    cartCount.innerText = currentTotal;
    cartItemCount.innerText = currentTotal;
}

export const calculateCartCostTotal = () => {
    const total = [...document.querySelectorAll(".card-item-cost")].reduce((pv, cv) => pv + parseFloat(cv.innerText), 0);
    return total;
    // let total = 0;
    // cartCostItems.forEach((cost) => {total+=parseFloat(cost.innerText);});
}

export const updateCartTotal = () => {
    const total = calculateCartCostTotal();
    cartTotal.innerText = total.toFixed(2);
}

export const HandlerCardItemGroup = (event) => {
    if (event.target.classList.contains("cart-item-remove")) {
        const currentCart = event.target.closest(".cart-item");
        const currentProductId = currentCart.getAttribute("cart-product-id");


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                currentCart.remove();
                updateCartItemCount();
                updateCartTotal();
                const currentProduct = productGroup.querySelector(`[product-id = '${currentProductId}']`)

                if (currentProduct) {
                    const currentProductAddCardBtn = currentProduct.querySelector(".product-add-cart-btn");
                    currentProductAddCardBtn.removeAttribute("disabled");
                    currentProductAddCardBtn.innerText = "Add To Cart";
                }

            }
        });
    } else if (event.target.classList.contains("card-q-add")) {
        // console.log("Q add");
        const currentCart = event.target.closest(".cart-item");
        const currentQuantity = currentCart.querySelector(".card-quantity");
        const currentCost = currentCart.querySelector(".card-item-cost");
        const currentPrice = currentCart.querySelector(".card-item-price");

        currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
        currentCost.innerText = (parseFloat(currentPrice.innerText) * currentQuantity.innerText).toFixed(2);
        updateCartTotal();


    } else if (event.target.classList.contains("card-q-sub")) {
        const currentCart = event.target.closest(".cart-item");
        const currentQuantity = currentCart.querySelector(".card-quantity");
        const currentCost = currentCart.querySelector(".card-item-cost");
        const currentPrice = currentCart.querySelector(".card-item-price");

        if (currentQuantity.innerText > 1) {
            currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
            currentCost.innerText = (parseFloat(currentPrice.innerText) * currentQuantity.innerText).toFixed(2);
            updateCartTotal();
        }

    }

};

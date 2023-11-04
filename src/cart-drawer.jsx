import React from "react";
import ReactDOM  from "react-dom";

const Cart = () => {
    useEffect(() => {
        const getCart = async () => {
            const cartItems = await fetch("/cart.js", {
                method: "GET"
            }).then(response => {
                console.log(response);
            });
        }
        getCart();
    });
    return <div>
        Hello
    </div>
}

const root= document.querySelector('.cart-drawer-items');
ReactDOM.render(<Cart />, root);

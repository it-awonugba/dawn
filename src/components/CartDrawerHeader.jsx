import React from "react";
import styles from "./CartDrawerHeader.module.css";

function CartDrawerHeader({cartItems}) {

  const totalItemsInCart = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  return (
    <div className={styles.reactCartHeader}>
      {cartItems.length == 0  ?
        <h1>Your cart is empty</h1> :
        <h1>{`Cart(${totalItemsInCart()})`}</h1>
      }
    </div>
  )
}

export default CartDrawerHeader;

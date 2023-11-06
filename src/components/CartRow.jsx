import React, { useState } from 'react';
import styles from './CartRow.module.css';
import {RiDeleteBin6Line} from "react-icons/ri";

function CartRow({ cartItem, currency, setCart }) {
  const [item, setItem] = useState(cartItem);

  const updateQuantity = (step, variant_id) => {
    let newQuantity = step + item.quantity;
    let data = { [variant_id] : newQuantity };
    if (newQuantity > 0) {
      setItem((prevItem) => ({
        ...prevItem,
        quantity: newQuantity,
        final_line_price: prevItem.price * newQuantity
      }));
    } else {
      setItem((prevItem) => ({ ...prevItem, quantity: 0 }));
    }
    updateShopifyCart(data);
  };

  const handleDelete = (variant) => {
    setItem((prevItem) => ({ ...prevItem, quantity: 0 }));
    updateShopifyCart({[variant]: 0});
  }

  const updateShopifyCart = async (data) => {
    console.log(data);
    await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({updates: data})
    }).then((response) => {
       return response.json();
    }).then(data => {
       const {items} = data;
       setCart((prev) => ({...prev, items}));
    });
  };

  return (
    <div className={styles.reactCartItem}>
      <div className={styles.productInformation}>
        <img src={item.image} alt={item.title} className={styles.reactCartItemImage} />
        <div className={styles.reactCartItemDescription}>
          <h2 className={styles.reactCartItemTitle}>{item.title}</h2>
          <span className={styles.reactCartItemPrice}>
            {`${currency} ${
              Number(item.price) / 100.0
            }`}
          </span>
          <div className={styles.reactCartItemControls}>
            <button
              className={styles.reactCartItemBtn}
              onClick={() => updateQuantity(-1, item.variant_id)}>
              -
            </button>
            <span className={styles.reactCartItemQuantity}>{item.quantity}</span>
            <button
              className={styles.reactCartItemBtn}
              onClick={() => updateQuantity(1, item.variant_id)}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.reactCartItemLineTotal}>
        {`${currency} ${Number(item.final_line_price) / 100.0}`}
      </div>
      <div className={styles.reactCartItemDelete}>
        <RiDeleteBin6Line onClick={() => handleDelete(item.variant_id)} />
      </div>
    </div>
  );
}

export default CartRow;

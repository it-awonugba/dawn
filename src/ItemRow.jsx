import React, { useState, useEffect } from 'react';
import styles from "./item-row.module.css";

function ItemRow({ cartItem, currency }) {
    const [item, setItem] = useState(cartItem);
    const shop = "https://my-demo-store-01.myshopify.com";

    const handleChange = (step, variant_id) => {
        console.log(variant_id);
        let newQuantity  = step + item.quantity;
        let data =  { 'id': variant_id, 'quantity': newQuantity};
        if(newQuantity > 0) {
            setItem((prevItem) => ({...prevItem, quantity: newQuantity, final_line_price: prevItem.price * newQuantity }));
        } else {
            setItem((prevItem) => ({...prevItem, quantity: 0 }));
        }
        updateShopifyCart(data);
    }

    const updateShopifyCart = async(data) => {
        console.log(data);
        await fetch(`${shop}/cart/change.js`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response.json());
        });
    }

  return (
    <div className={styles.reactCartItem}>
        <img src={item.image} alt={item.title} className={styles.reactCartItemImage} />
        <div className={styles.reactCartItemDescription}>
            <h2 className={styles.reactCartItemTitle}>{item.title}</h2>
            <span className={styles.reactCartItemPrice}>{`${currency} ${Number(item.price)/100.0}`}</span>
            <div className={styles.reactCartItemControls}>
                <button className={styles.reactCartItemBtn} onClick={() => handleChange(-1, item.variant_id)}>-</button>
                <input value={item.quantity} className={styles.reactCartItemQuantity} />
                <button className={styles.reactCartItemBtn} onClick={() => handleChange(1, item.variant_id)}>+</button>
            </div>
        </div>
        <div className={styles.reactCartItemLineTotal}>
            {`${currency} ${Number(item.final_line_price)/100.0}`}
        </div>
    </div>
  )
}

export default ItemRow;

import React, { useState } from 'react';
import styles from './CartRow.module.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import getSymbolFromCurrency from 'currency-symbol-map';

function CartRow({ cartItem, currency, loading, setLoading, setCart }) {
  const [item, setItem] = useState(cartItem);

  const updateCartRow = async (quantity) => {
    let data = { [item.variant_id]: quantity };
    if (quantity > 0) {
      setItem((prevItem) => ({
        ...prevItem,
        quantity,
        final_line_price: prevItem.price * quantity
      }));
    } else {
      setItem((prevItem) => ({ ...prevItem, quantity: 0 }));
    }
    try {
      setLoading(true);
      await updateShopifyCart(data);
    } catch(e) {
      setLoading(false);
    }
  };

  const updateQuantity = (e) => {
    e.preventDefault();
    let newQuantity = 0;
    if (e.target.name === 'plus') {
      newQuantity = Number(item.quantity) + 1;
    }

    if (e.target.name === 'minus') {
      newQuantity = Number(item.quantity) - 1;
    }
    updateCartRow(newQuantity);
  };

  const handleChange = (e) => {
    updateCartRow(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    updateCartRow(0);
  };

  const updateShopifyCart = async (data) => {
    await fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updates: data })
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCart(result);
        setLoading(false);
      });
  };

  return (
    <div className={styles.reactCartItem}>
      <div className={styles.productInformation}>
        <img src={item.image} alt={item.title} className={styles.reactCartItemImage} />
        <div className={styles.reactCartItemDescription}>
          <h2 className={styles.reactCartItemTitle}>{item.title}</h2>
          <span className={styles.reactCartItemPrice}>
            {`${getSymbolFromCurrency(currency)} ${Number(item.price) / 100.0}`}
          </span>
          <div className={styles.reactCartItemControls}>
            <button
              name="minus"
              className={styles.reactCartItemBtn}
              onClick={updateQuantity}
              disabled={loading}>
              -
            </button>
            <input
              name={item.variant_id}
              className={styles.reactCartItemQuantity}
              value={item.quantity}
              onChange={handleChange}
            />
            <button
              name="plus"
              className={styles.reactCartItemBtn}
              disabled={loading}
              onClick={updateQuantity}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.reactCartItemLineTotal}>
        {`${getSymbolFromCurrency(currency)} ${Number(item.final_line_price) / 100.0}`}
      </div>
      <button
        className={styles.reactCartItemDelete}
        onClick={handleDelete}
        disabled={loading}
      >
        <RiDeleteBin6Line  />
      </button>
    </div>
  );
}

export default CartRow;

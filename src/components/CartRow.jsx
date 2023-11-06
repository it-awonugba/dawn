import React, { useState } from 'react';
import styles from './CartRow.module.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import getSymbolFromCurrency from 'currency-symbol-map';

function CartRow({ cartItem, currency, setCart }) {
  const [item, setItem] = useState(cartItem);

  const updateRow = async (quantity) => {
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
    await updateShopifyCart(data);
  };

  const updateQuantity = (step) => {
    let newQuantity = step + Number(item.quantity);
    updateRow(newQuantity);
  };

  const handleChange = (e) => {
    updateRow(e.target.value);
  };

  const handleDelete = () => {
    setItem((prevItem) => ({ ...prevItem, quantity: 0 }));
    updateShopifyCart({ [item.variant]: 0 });
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
            <button className={styles.reactCartItemBtn} onClick={() => updateQuantity(-1)}>
              -
            </button>
            <input
              name={item.variant_id}
              className={styles.reactCartItemQuantity}
              value={item.quantity}
              onChange={handleChange}
            />
            <button className={styles.reactCartItemBtn} onClick={() => updateQuantity(1)}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className={styles.reactCartItemLineTotal}>
        {`${getSymbolFromCurrency(currency)} ${Number(item.final_line_price) / 100.0}`}
      </div>
      <div className={styles.reactCartItemDelete}>
        <RiDeleteBin6Line onClick={handleDelete} />
      </div>
    </div>
  );
}

export default CartRow;

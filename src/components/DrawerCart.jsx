import React, { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import CartRow from './CartRow.jsx';
import styles from './DrawerCart.module.css';
import CartDrawerHeader from './CartDrawerHeader.jsx';

const DrawerCart = () => {
  const [cart, setCart] = useState({ currency: '', items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        await fetch('/cart.js', {
          method: 'GET'
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (loading) {
              const { currency, items } = data;
              setCart({ currency: getSymbolFromCurrency(currency), items });
              setLoading(false);
            }
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCart();
  }, [loading, cart]);

  if(loading) {
    return;
  }

  console.log(cart);

  return (
    <div className={styles.reactCart}>
      <CartDrawerHeader cartItems={cart.items} />
      <div className={styles.reactCartBody} >
      {cart.items.length == 0 && loading === false ? (
        <h1>You have {cart.items.length} item in your cart</h1>
      ) : (
        cart.items.map((item) => (
          <CartRow cartItem={item} currency={cart.currency} setCart={setCart} key={item.variant_id} />
        ))
      )}
      </div>
      <div className={styles.reactCartFooter}></div>
    </div>
  );
};

export default DrawerCart;

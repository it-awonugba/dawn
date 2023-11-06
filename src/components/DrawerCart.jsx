import React, { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import CartRow from './CartRow.jsx';
import styles from './DrawerCart.module.css';
import CartDrawerHeader from './CartDrawerHeader.jsx';
import CartDrawerFooter from './CartDrawerFooter.jsx';

const DrawerCart = () => {
  const [cart, setCart] = useState({ currency: '', items: [] });
  const [loading, setLoading] = useState(true);
  const [toggleCartDrawer, setToggleCartDrawer] = useState(false);

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

    return () => {
      document.querySelectorAll('a[href="/cart"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          setToggleCartDrawer(true);
        });
      });
    };
  }, [loading, cart]);

  if (loading) {
    return;
  }

  console.log(cart);

  return (
    <div
      className={`${styles.reactCart} ${
        toggleCartDrawer ? styles.reactCartActive : styles.reactCartInactive
      }`}>
      <CartDrawerHeader toggleCart={setToggleCartDrawer} />
      <div className={styles.reactCartBody}>
        {cart.items.length == 0 ? (
          <h2>Your cart is empty</h2>
        ) : (
          cart.items.map((item) => (
            <CartRow
              cartItem={item}
              currency={cart.currency}
              setCart={setCart}
              key={item.variant_id}
            />
          ))
        )}
      </div>
      <CartDrawerFooter cart={cart} />
    </div>
  );
};

export default DrawerCart;

import React, { useEffect, useState } from 'react';
import CartRow from '../cart-row/CartRow.jsx';
import CartDrawerHeader from '../cart-header/CartDrawerHeader.jsx';
import CartDrawerFooter from '../cart-footer/CartDrawerFooter.jsx';
import styles from './DrawerCart.module.css';

const DrawerCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [toggleCartDrawer, setToggleCartDrawer] = useState(false);

  useEffect(() => {
    // Loadin cart from Shopify into state
    const getCart = async () => {
      try {
        await fetch('/cart.js', {
          method: 'GET'
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (loading) {
              setCart(data);
              setLoading(false);
            }
          });
      } catch (error) {
        //console.log(error);
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

  return (
    <form action="/checkout">
      <div
        className={`${styles.reactCart} ${
          toggleCartDrawer ? styles.reactCartActive : styles.reactCartInactive
        }`}>
        <CartDrawerHeader toggleCart={setToggleCartDrawer} />
        <div className={styles.reactCartBody}>
          {!loading && Number(cart.item_count) === 0 ? (
            <h2>Your cart is empty</h2>
          ) : (
            cart.items.map((item) => (
              <CartRow
                cartItem={item}
                currency={cart.currency}
                setCart={setCart}
                key={item.variant_id}
                loading={loading}
                setLoading={setLoading}
              />
            ))
          )}
        </div>
        <CartDrawerFooter cart={cart} loading={loading} />
      </div>
    </form>
  );
};

export default DrawerCart;

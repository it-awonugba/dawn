import React from 'react';
import styles from './CartDrawerHeader.module.css';
import { RiCloseLine } from 'react-icons/ri';

function CartDrawerHeader({ toggleCart }) {
  return (
    <div className={styles.reactCartHeader}>
      <h1>Your Cart</h1>
      <span className={styles.reactCartHeaderClose}>
        <RiCloseLine
          className={styles.reactCartHeaderCloseIcon}
          onClick={() => toggleCart(false)}
        />
      </span>
    </div>
  );
}

export default CartDrawerHeader;

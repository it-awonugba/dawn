import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import styles from './CartDrawerHeader.module.css';

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

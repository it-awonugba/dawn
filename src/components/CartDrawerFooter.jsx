import React from 'react';
import { RiLockLine } from 'react-icons/ri';
import styles from './CartDrawerFooter.module.css';

function CartDrawerFooter({ cart }) {
  const checkout = () => {
    
  };

  return (
    <div className={styles.reactCartFooter}>
      <div className={styles.reactCartFooterSummary}></div>
      <button onClick={checkout} className={styles.reactCartFooterCheckoutBtn}>
        <RiLockLine />
        <span>Checkout</span>
      </button>
    </div>
  );
}

export default CartDrawerFooter;

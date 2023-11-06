import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { RiLockLine } from 'react-icons/ri';
import styles from './CartDrawerFooter.module.css';

function CartDrawerFooter({ cart, loading }) {
  const { items_subtotal_price, currency } = cart;

  return (
    <div className={styles.reactCartFooter}>
      <div className={styles.reactCartFooterSummary}>
        {`${getSymbolFromCurrency(currency)} ${Number(items_subtotal_price) / 100.0} ${currency}`}
      </div>
      <div className={styles.reactCartFooterCheckout}>
        <button className={styles.reactCartFooterCheckoutBtn} disabled={loading}>
          <RiLockLine />
          <span>Checkout</span>
        </button>
      </div>
    </div>
  );
}

export default CartDrawerFooter;

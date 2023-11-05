import React, {useEffect, useState} from "react";
import { createRoot } from "react-dom/client";
import getSymbolFromCurrency from "currency-symbol-map";
import ItemRow from "./ItemRow.jsx";
import styles from "./cart-drawer.module.css";

const Cart = () => {
    const [items, setItems] = useState({currency: "", items: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCart = async () => {
            try {
                await fetch("/cart.js", {
                    method: "GET"
                }).then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if(loading) {
                        const {currency, items} = data;
                        setItems({ currency: getSymbolFromCurrency(currency), items });
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getCart();
    }, [loading, items]);

    console.log(items);
    return (
        <div className={styles.reactCart}>
            {
                (items.items.length == 0 && loading === false) ?
                    <h1>You have {items.items.length} item in your cart</h1> :
                    (items.items.map(item => (
                            <ItemRow cartItem={item} currency={items.currency} key={item.variant_id} />
                        ))
                    )
            }
        </div>
    );
}

const div = document.querySelector('.cart-drawer');
const root = createRoot(div);
root.render(<Cart />);

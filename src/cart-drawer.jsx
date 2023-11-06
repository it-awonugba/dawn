import React from 'react';
import { createRoot } from 'react-dom/client';
import DrawerCart from './components/drawer-cart/DrawerCart.jsx';

const div = document.querySelector('.cart-drawer');
const root = createRoot(div);
root.render(<DrawerCart />);

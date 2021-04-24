import React from 'react';

import CartItem from '../CartItem/CartItem';
import {Wrapper} from './Cart.styles'
import type { CartItemType } from '../types';

interface Props {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (itemId: number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      {cartItems.length == 0 && <p>No items in the cart</p>}
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
    </Wrapper>
  )
} 

export default Cart;
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
  const calculateTotal = (items: CartItemType[]): number => 
    items.reduce((acc, item) => (item.amount * item.price) + acc, 0)

  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      {cartItems.length == 0 && <p>No items in the cart</p>}
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <h2>Total: ${(calculateTotal(cartItems)).toFixed(2)}</h2>
    </Wrapper>
  )
} 

export default Cart;
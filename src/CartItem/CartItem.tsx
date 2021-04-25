import React from 'react'

import { Wrapper } from './CartItem.styles';
import { Button } from '@material-ui/core'
import type { CartItemType } from '../types';

interface Props {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
  <Wrapper>
    <div> 
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons-and-image">
        <Button size="small" disableElevation variant="contained" onClick={() => removeFromCart(item.id)}> - </Button>
        <p>{item.amount}</p>
        <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}> + </Button>
        <img src={item.image} alt={item.title}/>
      </div>
    </div>
  </Wrapper>
)


export default CartItem;
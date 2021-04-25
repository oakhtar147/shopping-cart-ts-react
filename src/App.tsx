import React, { useState } from 'react';
import { useQuery } from "react-query";
import axios from 'axios';
import {
  Drawer,
  LinearProgress,
  Grid,
  Badge
} from "@material-ui/core"
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { Wrapper, CartButton } from './App.styles'
import type { CartItemType } from './types'
import Item from './Item/Item';
import Cart from './Cart/Cart';

const getProducts = async (): Promise<CartItemType[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  const data: CartItemType[] = response.data;
  return data;
}  

const App: React.FC = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { isLoading, error, data } = useQuery<CartItemType[]>('products', getProducts);

  const getTotalItems = (items: CartItemType[]): number => 
    items.reduce((acc: number, item) => acc += item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prevState => {
      const itemInCart = prevState.find(item => item.id === clickedItem.id);

      if (itemInCart) {
        const index = prevState.indexOf(itemInCart);
        return [...prevState.slice(0, index), {...itemInCart, amount: itemInCart.amount + 1}, ...prevState.slice(index+1)];
      }

      return [...prevState, {...clickedItem, amount: 1}]
    })
  };
  
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prevState => {
      const itemInCart = prevState.find(item => item.id === id);
      if (itemInCart) {
        if (itemInCart.amount === 1)
          return prevState.filter(item => item.id !== id);
        const index = prevState.indexOf(itemInCart);
        return [...prevState.slice(0, index), {...itemInCart, amount: itemInCart.amount - 1}, ...prevState.slice(index+1)];
      }
      return prevState;
  })
};

  if (isLoading) return <LinearProgress />
  
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartIsOpen} onClose={() => setCartIsOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <CartButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="primary">
          <AddShoppingCartIcon />
        </Badge>
      </CartButton>
      <Grid container spacing={4}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={3} >
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;

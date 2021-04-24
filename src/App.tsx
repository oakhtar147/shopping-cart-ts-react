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
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { isLoading, error, data } = useQuery<CartItemType[]>('products', getProducts);

  const getTotalItems = (items: CartItemType[]): number => 
    items.reduce((acc: number, item) => acc += item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prevState => prevState.concat(clickedItem))
  };
  const handleRemoveFromCart = () => null;

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

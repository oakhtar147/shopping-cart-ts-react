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

import { Wrapper } from './App.styles'
import type { CartItemType } from './types'
import Item from './Item/Item';


const getProducts = async (): Promise<CartItemType[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  const data: CartItemType[] = response.data
  return data;
}
  
const App = () => {
  const { isLoading, error, data } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = () => null;
  const handleAddToCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;

  if (isLoading) return <LinearProgress />
  
  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;

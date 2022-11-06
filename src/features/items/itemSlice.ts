
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Items from '../../pages/Items/ItemsPage';
import { RootState, AppThunk } from '../../redux/store';
import { fetchItems } from './itemsAPI';


export interface Item {
  tags: string[];
  price: number;
  name: string;
  description: string;
  slug: string;
  added: number;
  manufacturer: string;
  itemType: string;
}

export interface ItemState {
  value: Item[] | [];
  totalCount: number
  basket: Basket;
  status: 'idle' | 'loading' | 'failed';
}

export interface Basket {
  items: BasketItem[] | [],
  totolPrice: number,
}
interface BasketItem extends Item {
  quantity: number;
}


const initialState: ItemState = {
  value: [],
  totalCount: 0,
  basket: {
    items: [],
    totolPrice: 0
  },
  status: 'idle',
};



export const getItems = createAsyncThunk(
  'getItems',
  async (args, { getState }) => {
    const state = getState() as RootState
    const filters = state.filters

    const response = await fetchItems(filters);
    return response
  }
);


export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      const currentBasket = state.basket
      const items = currentBasket.items
      const item = items?.find(
        (basketItem) => basketItem.name === action.payload.name,
      ) as BasketItem;
      if (item) {
        item.quantity += 1

      } else {
        items?.push({ ...action.payload, quantity: 1 })
      }
      currentBasket.totolPrice += action.payload.price
      currentBasket.totolPrice = +currentBasket.totolPrice.toFixed(2)
      state.basket = currentBasket;
    },
    removeFromBasket: (state, action: PayloadAction<Item>) => {
      const currentBasket = state.basket
      const items = currentBasket.items
      const item = items?.find(
        (basketItem) => basketItem.name === action.payload.name
      ) as BasketItem
      if (item?.quantity === 1) {
        const filteredItems = items.filter(item => item.name !== action.payload.name)
        currentBasket.items = filteredItems

      } else {
        item.quantity -= 1
      }
      currentBasket.totolPrice -= action.payload.price
      currentBasket.totolPrice = +currentBasket.totolPrice.toFixed(2)
      state.basket = currentBasket;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.data;
        state.totalCount = +action.payload.totalCount
      })
      .addCase(getItems.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { addToBasket, removeFromBasket } = itemSlice.actions;

export const selectItems = (state: RootState) => state.items;



export default itemSlice.reducer;

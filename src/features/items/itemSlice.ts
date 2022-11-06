
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ItemState = {
  value: [],
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getItems.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

// export const { increment, decrement, incrementByAmount } = itemSlice.actions;

export const selectItems = (state: RootState) => state.items;



export default itemSlice.reducer;

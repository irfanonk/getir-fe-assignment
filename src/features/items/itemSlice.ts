
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
type FetchItemsParams = {
  limit: number,
  page: number,

}
export const getItems = createAsyncThunk(
  'getItems',
  async (params: FetchItemsParams) => {
    const response = await fetchItems(params.limit, params.page);
    // The value we return becomes the `fulfilled` action payload
    return response
  }
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    filterByCompany: (state, action: PayloadAction<string>) => {
      state.value = state.value?.filter(item => item.manufacturer === action.payload) || []
    },
  },
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

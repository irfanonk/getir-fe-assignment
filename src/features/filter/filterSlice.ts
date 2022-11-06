import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';


export interface FilterState {
  itemType: string;
  sorting: string;
  brand: string;
  tag: string,
  limit: number,
  page: number;
}

const initialState: FilterState = {
  itemType: "",
  sorting: "",
  brand: "",
  tag: "",
  limit: 16,
  page: 1,
};



export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterByItemType: (state, action: PayloadAction<string>) => {
      state.itemType = action.payload;
    },
    filterByBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    filterByTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
    sort: (state, action: PayloadAction<string>) => {

      state.sorting = action.payload;
    },
    paginate: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { filterByItemType, filterByBrand, filterByTag, sort, paginate } = filterSlice.actions;

export const selectFilters = (state: RootState) => state.filters;




export default filterSlice.reducer;

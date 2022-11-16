

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import itemSlice from '../features/items/itemSlice';
import companiesSlice from '../features/companies/companiesSlice';
import filterSlice from '../features/filter/filterSlice';
import tagsSlice from '../features/tags/tagsSlice';




export const store = configureStore({
  reducer: {
    items: itemSlice,
    companies: companiesSlice,
    filters: filterSlice,
    tags: tagsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

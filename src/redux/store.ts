

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import itemSlice from '../features/items/itemSlice';
import companiesSlice from '../features/companies/companiesSlice';
import filterSlice from '../features/filter/filterSlice';




export const store = configureStore({
  reducer: {
    counter: counterReducer,
    items: itemSlice,
    companies: companiesSlice,
    filters: filterSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

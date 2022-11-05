
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';
import { fetchCompanies } from './companiesAPI';


export interface Company {
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  account: number;
  contact: string;
}

export interface CompanyState {
  value: Company[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CompanyState = {
  value: [],
  status: 'idle',
};

export const getCompanies = createAsyncThunk(
  'getCompanies',
  async () => {
    const response = await fetchCompanies();
    // The value we return becomes the `fulfilled` action payload
    return response
  }
);

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getCompanies.rejected, (state) => {
        state.status = 'failed';
      });
  },
});



export const selectComponies = (state: RootState) => state.companies;



export default companiesSlice.reducer;

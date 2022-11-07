
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';
import { fetchTags } from './tagsAPI';

export interface Tag {
  name: string;
  slug: string;
}

export interface TagsState {
  value: Tag[] | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TagsState = {
  value: [],
  status: 'idle',
};

export const getTags = createAsyncThunk(
  'getTags',
  async () => {
    const response = await fetchTags();
    // The value we return becomes the `fulfilled` action payload
    return response
  }
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getTags.rejected, (state) => {
        state.status = 'failed';
      });
  },
});



export const selectTags = (state: RootState) => state.tags;



export default tagsSlice.reducer;

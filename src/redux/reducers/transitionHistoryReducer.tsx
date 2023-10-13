import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { CourseTransitionHistory } from '../../helper/ApiHelper';

const initialState = {
  transitionHistory:[],
  loading: false,
  error: null as string | null,
};

export const transitionHistoryAsync = createAsyncThunk(
  "dashboard/transition-History",
  async () => {
    try {
      const response = await CourseTransitionHistory();             
      return response.data.data;
    } catch (error) {      
      throw error;
    }
  }
);

const transitionHistorySlice = createSlice({
    name: 'totalBalance',
    initialState,
    reducers: {
      setData: (state, action) => {
        state.transitionHistory = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(transitionHistoryAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(transitionHistoryAsync.fulfilled, (state, action) => {
          state.transitionHistory = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(transitionHistoryAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred';
        });
    },
  });
  export const { setData, setLoading, setError } = transitionHistorySlice.actions;
  export default transitionHistorySlice.reducer;

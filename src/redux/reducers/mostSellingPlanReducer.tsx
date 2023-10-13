import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { MostSellingPlan } from '../../helper/ApiHelper';

const initialState = {
  sellingPlan: [],
  loading: false,
  error: null,
};

export const mostSellingPlanAsync = createAsyncThunk(
  "dashboard/most-selling-plan",
  async () => {
    try {
      const response = await MostSellingPlan(); 
      // console.log("most selling", response.data.data);          
      return response.data.data;
    } catch (error) {      
      throw error;
    }
  }
);

const mostSellingPlanSlice = createSlice({
    name: 'totalBalance',
    initialState,
    reducers: {
      setData: (state, action) => {
        state.sellingPlan = action.payload;
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
        .addCase(mostSellingPlanAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(mostSellingPlanAsync.fulfilled, (state, action) => {
          state.sellingPlan = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(mostSellingPlanAsync.rejected, (state, action) => {
          state.loading = false;
          // state.error = action.error.message || 'An error occurred';
        });
    },
  });
  
  export const { setData, setLoading, setError } = mostSellingPlanSlice.actions;
  export default mostSellingPlanSlice.reducer;

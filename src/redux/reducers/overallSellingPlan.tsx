import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { OverallSellingPlan } from '../../helper/ApiHelper';
import { OverallSellingPlanType } from '../../helper/Types';

const initialState = {
  overAllSelling:  [] as OverallSellingPlanType[],
  loading: false,
  error: null as string | null,
};

export const overAllSellingAsync = createAsyncThunk(
  "dashboard/Overall-selling-plan",
  async () => {
    try {
      const response = await OverallSellingPlan();  
      // console.log(response.data.data,"overallselling plan");         
      return response.data.data;
    } catch (error) {      
      throw error;
    }
  }
);

const overallSellingPlanSlice = createSlice({
    name: 'totalBalance',
    initialState,
    reducers: {
      setData: (state, action) => {
        state.overAllSelling = action.payload;
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
        .addCase(overAllSellingAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(overAllSellingAsync.fulfilled, (state, action) => {
          state.overAllSelling = action.payload;
          state.loading = false;
          state.error = null;
        })
        .addCase(overAllSellingAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred';
        });
    },
  });
  
  export const { setData, setLoading, setError } = overallSellingPlanSlice.actions;
  export default overallSellingPlanSlice.reducer;

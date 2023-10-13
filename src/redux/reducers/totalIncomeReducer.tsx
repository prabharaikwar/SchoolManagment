import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { totalIncomeFetch } from '../../helper/ApiHelper'; 
import {IncomeDataType} from "../../helper/Types";

const initialState = {
  // chartData: null | IncomeDataType,
  loading: false,
  error: null,
};

export const setTimeframeThunk = createAsyncThunk(
  'totalIncome/setTimeframe',
  async (selectedTimeframe: string, { dispatch }) => {
    try {
          const response = await totalIncomeFetch(selectedTimeframe);      
           
      dispatch(updateChartData(response.data));
      return selectedTimeframe;
    } catch (error) {
      throw error;
    }
  }
);

const totalIncomeSlice = createSlice({
  name: 'totalIncome',
  initialState,
  reducers: {
    updateChartData: (state, action) => {
      // state.chartData = action.payload;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(setTimeframeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setTimeframeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(setTimeframeThunk.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message || 'Failed to set timeframe';
      });
  },
});

export const { updateChartData } = totalIncomeSlice.actions;
export default totalIncomeSlice.reducer;

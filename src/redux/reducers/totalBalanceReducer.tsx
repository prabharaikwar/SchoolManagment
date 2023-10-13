import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { TotalBalance } from '../../helper/ApiHelper';

const initialState = {
  TotalBalanceData: 0,
  loading: false,
  error: null,
};

export const totalBalanceAsync = createAsyncThunk(
  "dashboard/total-balance",
  async () => {
    try {
      const response = await TotalBalance();
      // console.log(response.data.data, "total balance 15");
      return response.data.data ; 
    } catch (error) {
      throw error;
    }
  }
);

const totalBalanceSlice = createSlice({
    name: 'totalBalance',
    initialState,
    reducers: {
      setData: (state, action) => {
        state.TotalBalanceData = action.payload;
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(totalBalanceAsync.fulfilled, (state, action) => {
        state.TotalBalanceData = action.payload; 
        state.loading = false;
        state.error = null;
      });
    },
  });
  
  export const { setData, setLoading, setError } = totalBalanceSlice.actions;
  export default totalBalanceSlice.reducer;

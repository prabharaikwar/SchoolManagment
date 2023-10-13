import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Plan, CouponType } from "../../helper/Types";
import { CreatePlan, GetAllPlans, ViewPlan, getCoupons } from "../../helper/ApiHelper";

interface PlanState {
  Plans: Plan[];
  singlePlan: Plan | null;
  coupons: CouponType[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  enteredPlanData: Partial<Plan> | null; // for viewing data entered by user
}

const initialState: PlanState = {
  Plans: [],
  singlePlan: null,
  coupons: [],
  loading: 'idle',
  error: null,
  enteredPlanData: null,
};

export const planHistoryAsync = createAsyncThunk('plan/allPlans', async () => {
  try {
    const response = await GetAllPlans();
    // console.log(response,'24 plan');

    return response.data.data as Plan[];
  } catch (error) {
    throw error;
  }
});

export const getCouponsAsync = createAsyncThunk('coupon/getAllCoupons', async () => {
  try {
    const response = await getCoupons();
    // console.log(response.data.data ,'getCoupons');

    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const singlePlanAsync = createAsyncThunk(
  'plan/singlePlan',
  async (id: string) => {
    try {
      const response = await ViewPlan(id);
      // console.log(response, "view single plan ")
      return response.data.data as Plan;
    } catch (error) {
      throw error;
    }
  }
);

export const createPlanAsync = createAsyncThunk('plan/createPlan', async (planData: Partial<Plan>) => {
  try {
    const response = await CreatePlan(planData);
    // console.log(response.data.data,"create plan post successfully!")
    return response;
  } catch (error) {
    // console.log(error,"err in create plan")
    throw error;
  }
});

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    createPlan: (state, action: PayloadAction<Plan>) => {
      state.Plans.push(action.payload);
    },
    // viewPlan: (state, action: PayloadAction<{ id: number; inputData: Partial<Plan> }>) => {
    //   const { id, inputData } = action.payload;
    //   const planIndex = state.Plans.findIndex((plan) => plan._id === id);
    //   if (planIndex !== -1) {
    //     state.Plans[planIndex] = { ...state.Plans[planIndex], ...inputData };
    //   }
    // },
    storeEnteredPlanData: (state, action: PayloadAction<Partial<Plan>>) => {
      state.enteredPlanData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlanAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createPlanAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // state.Plans.push(action.payload);
      })
      .addCase(createPlanAsync.rejected, (state, action) => {
      })
      .addCase(singlePlanAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(singlePlanAsync.fulfilled, (state, action) => {
        state.singlePlan = action.payload;
      })
      .addCase(singlePlanAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(planHistoryAsync.fulfilled, (state, action) => {
        state.Plans = action.payload;
      })
      .addCase(getCouponsAsync.fulfilled, (state, action) => {
        state.coupons = action.payload;
      });
  },
});

export const { actions: planActions, reducer: planReducer } = planSlice;

export default planSlice.reducer;
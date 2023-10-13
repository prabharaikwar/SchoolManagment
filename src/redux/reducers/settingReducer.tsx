import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSettingPersonalDetails, passwordSecurity } from "../../helper/ApiHelper";
import { loginUserAsync } from "./userReducer";
import { changePassword, personalDetails } from "../../helper/Types";

interface SettingState {
  userData: personalDetails | null;
  error: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  passwordChangeError: string | null;
  passwordChangeSuccess: boolean;
}

const initialState: SettingState = {
  userData:{} as personalDetails,
  error: null,
  passwordChangeError: null,
  passwordChangeSuccess: false,
  loading: 'idle',
};


export const getUserData = createAsyncThunk(
  'setting/getUserPersonalData',
  async () => {
    try {
      const response = await getSettingPersonalDetails();        
      return response.data.data;
    } catch (error) {     
      throw error;
    }
  }
);

export const passwordChanged = createAsyncThunk(
  'setting/changePassword',
  async (passwordField: Partial<changePassword>) => {
    try {
      const response = await passwordSecurity(passwordField);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {})
     
      .addCase(getUserData.pending, (state) => {})
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
      })
      .addCase(passwordChanged.fulfilled, (state, action) => {
        state.passwordChangeSuccess = true;
        state.passwordChangeError = null;
      })
      .addCase(passwordChanged.rejected, (state, action) => {
        state.passwordChangeSuccess = false;
        state.passwordChangeError = action.error.message || "An error occurred during password change";
      });
  },
});

export default settingSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUser } from "../../helper/ApiHelper";
import { login } from "../../helper/Types";
import { ANALYTICS } from '../../helper/PageRoute';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_BASE_URL

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (credentials: login, { rejectWithValue }) => {
    try {
      const response = await LoginUser(`${apiUrl}/login`, credentials);
      const userInfo = response.data;
      const token = await response.data.token;
      if (token) {
        localStorage.setItem('token', token); 
      }      
      return userInfo;
    } catch (error: any) {
      console.error("API call failed:", error);
      console.log(error.response.data,"err")
      return rejectWithValue(error.response.data);  
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    data: null,
    accessToken: localStorage.getItem("token") || '',
    loading: false,
    error: null,
    errorMessage: null,
  } as { isAuthenticated: boolean; data: login | null; accessToken: string | null; loading: boolean; error: string | null; errorMessage: string | null },
  reducers: {
    logoutAction: (state) => {
      state.isAuthenticated = false;
      state.accessToken="";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
        state.errorMessage = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log(action.payload, "token two");
       
        state.loading = false;
        state.data = action.payload;
        state.accessToken = action.payload.token;
        state.error = null;
        state.errorMessage = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.accessToken = null;
        // state.error = 
        console.log(state,"ddd");
        
        if(action.payload)
        {
          // state.error = action.payload.message;
        }
        
        if (action.error.message === "Request failed with status code 401") {
          state.error = "The email/password is incorrect"
        }
        else {
          state.errorMessage = action.error?.message ?? null;
          // console.log(state.errorMessage)
        }
        // state.errorMessage = action.error?.message ?? null; // Set errorMessage to error.message or null
      });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
export const { logoutAction } = userSlice.actions;
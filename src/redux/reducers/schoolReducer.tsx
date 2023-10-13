import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllSchools, AddSchool, EditSchool, ViewSingleSchool, planSelection } from '../../helper/ApiHelper';
import { School, PlanSelectionType } from '../../helper/Types';

interface SchoolState {
  schools: School[];
  singleSchool: School | null;
  planSelection: {
    _id: string;
    planName: string;
    pricing: number;
    planActivation: string;
  }[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SchoolState = {
  schools: [],
  singleSchool: null,
  planSelection: [],
  loading: 'idle',
  error: null,
};

export const addSchoolAsync = createAsyncThunk('school/addSchool', async (newSchoolData: Partial<School>) => {
  console.log("i work");

  try {
    const response = await AddSchool(newSchoolData);
    console.log(response, "i am add school");
    return response.data as School;
  } catch (error) {
    throw error;
  }
});

export const editSchoolAsync = createAsyncThunk(
  'school/editSchool',
  async ({ id, inputData }: { id: string; inputData: Partial<School> }) => {
    try {
      const response = await EditSchool(id, inputData);
      console.log(response, "edits");

      return response.data.data as School;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllSchoolsAsync = createAsyncThunk('school/getAllSchools', async () => {
  try {
    const response = await GetAllSchools();
    return response.data.data as School[];
  } catch (error) {
    throw error;
  }
});

export const getSingleSchoolAsync = createAsyncThunk('school/getSingleSchool', async (id: string) => {
  try {
    const response = await ViewSingleSchool(id);
    return response.data.data as School;
  } catch (error) {
    throw error;
  }
});

export const fetchPlanSelectionAsync = createAsyncThunk('school/planSelection', async () => {
  try {
    const response = await planSelection();
    return response.data.data as PlanSelectionType[];
  } catch (error) {
    throw error;
  }
});

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    addSchool: (state, action: PayloadAction<School>) => {
      state.schools.push(action.payload);
    },
    editSchool: (state, action: PayloadAction<{ id: string; inputData: Partial<School> }>) => {
      const { id, inputData } = action.payload;
      const schoolIndex = state.schools.findIndex((school) => school._id === id);
      if (schoolIndex !== -1) {
        state.schools[schoolIndex] = { ...state.schools[schoolIndex], ...inputData };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editSchoolAsync.fulfilled, (state, action) => {
        state.singleSchool = action.payload;
      })
      .addCase(getAllSchoolsAsync.fulfilled, (state, action) => {
        state.schools = action.payload;
      })
      .addCase(addSchoolAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addSchoolAsync.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.schools.push(action.payload);
      })
      .addCase(addSchoolAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(getSingleSchoolAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getSingleSchoolAsync.fulfilled, (state, action) => {
        state.singleSchool = action.payload;
      })
      .addCase(getSingleSchoolAsync.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(fetchPlanSelectionAsync.fulfilled, (state, action) => {
        state.planSelection = action.payload;
      });

  },
});

export const { editSchool, addSchool } = schoolSlice.actions;
export default schoolSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

// --- Async Thunks ---
export const fetchJobs = createAsyncThunk("jobs/fetch", async (params) => {
  const { title, company_name, location, page } = params;
  const res = await axios.get(`${VITE_ADMIN_URL}/jobs`, {
    params: { title, company_name, location, page },
  });
  return res.data;
});

export const createJob = createAsyncThunk("jobs/create", async (newJob) => {
  const res = await axios.post(`${VITE_ADMIN_URL}/job`, newJob);
  return res.data;
});

export const updateJob = createAsyncThunk("jobs/update", async ({ id, updatedData }) => {
  const res = await axios.put(`${VITE_ADMIN_URL}/job/${id}`, updatedData);
  return res.data.data;
});

export const deleteJob = createAsyncThunk("jobs/delete", async (id) => {
  
  await axios.delete(`${VITE_ADMIN_URL}/job/${id}`);
  console.log(id);
  
  return id;
});

// --- Slice ---
const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.totalJobs = action.payload.totalJobs;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(createJob.fulfilled, (state, action) => {
  state.jobs.unshift(action.payload); // add the new job to the beginning
})
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job._id === action.payload._id);
        if (index !== -1) state.jobs[index] = action.payload;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      });
  },
});

export const { setCurrentPage } = jobSlice.actions;
export default jobSlice.reducer;

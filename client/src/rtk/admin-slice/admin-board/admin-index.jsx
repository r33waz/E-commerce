import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  getAllUser,
  getProductNumChart,
  getTotalUser,
  getUserMonthlyStats,
  getUserStatus,
} from "./admin-thunk";

const initialState = {
  chartloading: false,
  error: null,
  prodCatChart: [],
  userCharData: {
    userStatus: [],
    totalUser: [],
    userMonthlyStats: [],
  },
  allUser: [],
  deleteUserLoading: false,
  deleteUserError: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductNumChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductNumChart.fulfilled, (state, action) => {
        state.loading = false;
        state.prodCatChart = action.payload;
      })
      .addCase(getProductNumChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // use status
    builder.addCase(getUserStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.userCharData.userStatus = action.payload;
    });
    builder.addCase(getUserStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //total user
    builder.addCase(getTotalUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTotalUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userCharData.totalUser = action.payload;
    });
    builder.addCase(getTotalUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //user monthly stats
    builder.addCase(getUserMonthlyStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserMonthlyStats.fulfilled, (state, action) => {
      state.loading = false;
      state.userCharData.userMonthlyStats = action.payload;
    });
    builder.addCase(getUserMonthlyStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //get al user
    builder.addCase(getAllUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.loading = false;
      state.allUser = action.payload;
    });
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.deleteUserLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteUserLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleteUserLoading = false;
      state.deleteUserError = action.error.message;
    });
    
  },
});

export default adminSlice.reducer;

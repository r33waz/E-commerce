import { ErrorToast, SuccessToast } from "@/components/common/tosatComp";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductNumChart = createAsyncThunk(
  "get/product-chart",
  async () => {
    try {
      const response = await main_url.get("/api/v1/products-count");
      return response.data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        ErrorToast({ message: error?.response?.data?.message });
      } else {
        return;
      }
    }
  }
);

export const getUserStatus = createAsyncThunk("get/user-status", async () => {
  try {
    const response = await main_url.get("/api/v1/user-status");
    return response.data.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message) {
      ErrorToast({ message: error?.response?.data?.message });
    } else {
      return;
    }
  }
});

export const getTotalUser = createAsyncThunk("get/total-user", async () => {
  try {
    const response = await main_url.get("/api/v1/total-user");
    return response.data.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message) {
      ErrorToast({ message: error?.response?.data?.message });
    } else {
      return;
    }
  }
});

export const getUserMonthlyStats = createAsyncThunk(
  "get/user-stats",
  async (month) => {
    console.log(month);
    try {
      const response = await main_url.get(
        `/api/v1/user-stats/?filterType=${month}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        ErrorToast({ message: error?.response?.data?.message });
      } else {
        return;
      }
    }
  }
);

export const getAllUser = createAsyncThunk(
  "get/all-user",
  async (search) => {
    console.log(search);
    try {
      const response = await main_url.get(
        `/api/v1/all-users/?search=${search?search:""}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        ErrorToast({ message: error?.response?.data?.message });
      } else {
        return;
      }
    }
  }
);


//delete user
export const deleteUser = createAsyncThunk(
  "delete/user",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await main_url.delete(`/api/v1/delete-user/${id}`);
      console.log(response);
      SuccessToast({ message: response.data.message });
      return response.data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        ErrorToast({ message: error?.response?.data?.message });
      } else {
        return;
      }
      return rejectWithValue(error);
    }
  }
);
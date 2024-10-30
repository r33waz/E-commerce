import { ErrorToast, SuccessToast } from "@/components/common/tosatComp";
import { main_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await main_url.post("/api/v1/login", data);
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

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await main_url.post(`/api/v1/signup`, data);
      SuccessToast({ message: response?.data?.message });
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

export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  try {
    const response = await main_url.post("/api/v1/logout");
    SuccessToast({ message: response.data.message });
  } catch (error) {
    if (error?.response?.data?.message) {
      ErrorToast({ message: error?.response?.data?.message });
    } else {
      return;
    }
  }
});

//checking the auth
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response = await main_url.get("/api/v1/auth-check");
    return response.data;
  } catch {
    if (error?.response?.data?.message) {
      ErrorToast({ message: error?.response?.data?.message });
    } else {
      return;
    }
  }
});

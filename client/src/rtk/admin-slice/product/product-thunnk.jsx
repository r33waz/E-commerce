import { SuccessToast } from "@/components/common/tosatComp";
import { main_url, photo_url } from "@/service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProduct = createAsyncThunk(
  "create/product",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await photo_url.post("/api/v1/add-product", data);
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

export const getAllProducts = createAsyncThunk("get/all-products", async () => {
  try {
    const response = await main_url.get("/api/v1/all-products");
    return response.data;
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.message) {
      ErrorToast({ message: error?.response?.data?.message });
    } else {
      return;
    }
  }
});


//delete product
export const deleteProduct = createAsyncThunk(
  "delete/product",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await main_url.delete(`/api/v1/delete-product/${id}`);
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
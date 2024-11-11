import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  eiditProduct,
  getAllProducts,
} from "./product-thunnk";

const initialState = {
  loading: false,
  error: null,
  products: [],
  totalProducts: null,
};

const producSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.totalProducts = action.payload.length;
      state.products = action.payload.data;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // delete post
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //eidit product s
    builder.addCase(eiditProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(eiditProduct.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(eiditProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default producSlice.reducer;

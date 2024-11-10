import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/rtk/auth-slice/auth-index";
import prodReducer from "@/rtk/admin-slice/product/product-index";

// const persistConfig = {
//     key: "root",
//     storage: storage,
//   }

const rootReducer = combineReducers({
  auth: authReducer,
  prod: prodReducer,
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/rtk/auth-slice/auth-index";
import prodReducer from "@/rtk/admin-slice/product/product-index";
import adminReducer from "@/rtk/admin-slice/admin-board/admin-index";

// const persistConfig = {
//     key: "root",
//     storage: storage,
//   }

const rootReducer = combineReducers({
  auth: authReducer,
  prod: prodReducer,
  admin: adminReducer,
});

export default rootReducer;

import { combineReducers } from "@reduxjs/toolkit";
import  authReducer  from "@/rtk/auth-slice/auth-index";

// const persistConfig = {
//     key: "root",
//     storage: storage,
//   }

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;

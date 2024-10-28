import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/rootRoducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;

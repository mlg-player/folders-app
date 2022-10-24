import mainReducer from "./store/reducer";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const setupStore = () => {
  return configureStore({
    reducer: mainReducer,
    devTools: {
      name: "Apps",
    },
  });
};


export type RootState = ReturnType<typeof mainReducer>;
export type MainStore = ReturnType<typeof setupStore>;
export type MainDispatch = MainStore['dispatch'];
export const useAppDispatch = () => useDispatch<MainDispatch>()
const store = setupStore();
export default store;
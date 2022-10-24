import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { setCurrentFolder } from "../actions/LeftPanelActions";

export const CurrentStateStore = createSlice({
  name: "folderStore",
  initialState: {
    folder_id: "",
  },
  reducers: {},
  extraReducers: {
    [setCurrentFolder.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.folder_id = action.payload
    }
  }
});

const currentReducer = CurrentStateStore.reducer;
export default currentReducer;

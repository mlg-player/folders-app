import {
    createSlice,
    PayloadAction,
    createEntityAdapter
  } from "@reduxjs/toolkit";

  export type iItem = {
    title: string,
    description?: string,
    folder_id: string,
    created_at: number,
  }
  const items = createEntityAdapter<iItem>({});
  
  export const FolderItems = createSlice({
    name: "folderItems",
    initialState: {
      items: items.getInitialState(),
    },
    reducers: {},
    extraReducers: {},
  });
  
  const folderItemsReducer = FolderItems.reducer;
  export default folderItemsReducer;
  
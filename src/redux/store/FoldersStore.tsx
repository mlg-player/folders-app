import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

export type IFolder = {
  name: string;
  order?: number;
  id?: string;
};

const folderEntety = createEntityAdapter<IFolder>({
  selectId: (i) => i?.id,
  sortComparer: (i) => i?.order,
});

export const FoldersStore = createSlice({
  name: "folderStore",
  initialState: {
    folders: folderEntety.getInitialState(),
  },
  reducers: {
    initial: (state, action: PayloadAction<IFolder[]>) => {
      folderEntety.addMany(state.folders, action.payload)
    },
    addFolder: (state, action: PayloadAction<IFolder>) => {
      folderEntety.addOne(state.folders, {
        ...action.payload,
        id: `folders:${action.payload.id}`,
      });
    },
  },
});

const foldersReducer = FoldersStore.reducer;
export default foldersReducer;

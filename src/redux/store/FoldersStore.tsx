import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

export type IFolder = {
  title: string;
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
    addFolder: (state, action: PayloadAction<IFolder>) => {
      folderEntety.addOne(state.folders, {
        ...action.payload,
        order: state.folders.ids.length,
      });
    },
  },
});

const foldersReducer = FoldersStore.reducer;
export default foldersReducer;

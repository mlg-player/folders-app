import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

export type IFolder = {
  name: string;
  order?: number;
  id?: string;
  type?: string
};

const folderEntity = createEntityAdapter<IFolder>({
  selectId: (i) => i?.id,
  sortComparer: (a) => a?.order,
});

export const FoldersStore = createSlice({
  name: "folderStore",
  initialState: {
    folders: folderEntity.getInitialState(),
  },
  reducers: {
    initial: (state, action: PayloadAction<IFolder[]>) => {
      folderEntity.addMany(state.folders, action.payload);
    },
    addFolder: (state, action: PayloadAction<IFolder>) => {
      folderEntity.addOne(state.folders, {
        ...action.payload,
        id: `folders:${action.payload.id}`,
      });
    },
    removeFolder: (state, action: PayloadAction<string>) => {
      folderEntity.removeOne(state.folders, action.payload);
    },
  },
});

const foldersReducer = FoldersStore.reducer;
export default foldersReducer;

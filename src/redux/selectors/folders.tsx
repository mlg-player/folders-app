import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { iItem } from "../store/FolderItems";
import { IFolder } from "../store/FoldersStore";

type Selector<S> = (state: RootState) => S;

export const getAllFoldersList = createSelector(
  [(state: RootState) => state.folders.folders],
  (folders) =>
    Object.values(folders.entities).sort((a, b) => b?.order - a?.order)
);
export const getCurrentFolderId = createSelector([(state: RootState) => state.current.folder_id], (id) =>
id
);
export const getCurrentFolder = createSelector(
  [
    (state: RootState) => state.current.folder_id,
    (state: RootState) => state.folders.folders.entities,
  ],
  (id, folders) => {
    console.log(folders, id);
    return folders[id];
  }
);
export const getFolderItems = createSelector(
  [
    (state: RootState) => state.current.folder_id,
    (state: RootState) => state.items.items.entities,
  ],
  (id, items) => {
    const arr: iItem[] = [];
    for (const item in items){ 
      if(items[item].folder_id === id){
        arr.push(items[item]);
      } 
    }
    return arr;
  }
);

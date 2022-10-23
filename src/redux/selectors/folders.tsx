import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IFolder } from "../store/FoldersStore";
type Selector<S> = (state: RootState) => S;

export const getAllFoldersList = (): Selector<IFolder[]> =>
  createSelector([(state: RootState) => state.folders.folders], (folders) =>
    Object.values(folders.entities)
  );

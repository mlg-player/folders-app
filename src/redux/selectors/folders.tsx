import { createSelector, EntityId } from "@reduxjs/toolkit";
import { RootState } from "..";
import { iItem } from "../store/FolderItems";
import { IFolder } from "../store/FoldersStore";

const folderSelectors = {
    getAllFoldersList: createSelector(
        [(state: RootState) => state.folders.folders.ids],
        (folders) => folders
    ),
    getActiveFolder: createSelector(
        [
            (state: RootState, active: EntityId) =>
                state.folders.folders.entities[active],
        ],
        (folders) => folders as IFolder
    ),
    getCurrentFolderId: createSelector(
        [(state: RootState) => state.current.folder_id],
        (id) => id
    ),
    getCurrentFolder: createSelector(
        [
            (state: RootState) => state.current.folder_id,
            (state: RootState) => state.folders.folders.entities,
        ],
        (id, folders) => {
            return folders[id];
        }
    ),
    getFolderItems: createSelector(
        [
            (state: RootState) => state.current.folder_id,
            (state: RootState) => state.items.items.entities,
        ],
        (id, items) => {
            const arr: iItem[] = [];
            for (const item in items) {
                if (items[item].folder_id === id) {
                    arr.push(items[item]);
                }
            }
            return arr;
        }
    ),
    getFoldersCount: createSelector(
        [(state: RootState) => state.folders.folders.ids.length],
        (length) => length
    ),
};
export default folderSelectors
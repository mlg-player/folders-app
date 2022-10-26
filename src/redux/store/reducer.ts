import { combineReducers } from "redux";
import currentReducer from "./CurrentStateStore";
import folderItemsReducer from "./FolderItems";
import foldersReducer from "./FoldersStore";

const mainReducer = combineReducers({
  folders: foldersReducer,
  current: currentReducer,
  items: folderItemsReducer
});

export default mainReducer;

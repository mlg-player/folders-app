import { combineReducers } from "redux";
import foldersReducer from "./FoldersStore";

const mainReducer = combineReducers({
  folders: foldersReducer,
});

export default mainReducer;

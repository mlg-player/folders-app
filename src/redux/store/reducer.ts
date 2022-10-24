import { combineReducers } from "redux";
import currentReducer from "./CurrentStateStore";
import foldersReducer from "./FoldersStore";

const mainReducer = combineReducers({
  folders: foldersReducer,
  current: currentReducer,
});

export default mainReducer;

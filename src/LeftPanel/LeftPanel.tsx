import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux";
import { setCurrentFolder } from "../redux/actions/LeftPanelActions";
import folderSelectors from "../redux/selectors/folders";
import LeftPanelInput from "./components/LeftPanelInput/LeftPanelInput";
import LeftPanelItems from "./components/LeftPanelItems/LeftPanelItems";
import css from "./LeftPanel.module.scss";
const {
  getAllFoldersList,
  getCurrentFolderId,
} = folderSelectors
const LeftPanel = () => {
  const folders = useSelector(getAllFoldersList);
  const selected = useSelector(getCurrentFolderId);
  const dispatch = useAppDispatch();
  return (
      <div className={css.leftPanel}>
          <LeftPanelInput />

          <div className={css.folders}>
              {folders.map((folder, i) => (
                  <LeftPanelItems
                      key={folder}
                      active={selected === folder}
                      onClick={(e) =>
                          dispatch(setCurrentFolder(String(folder)))
                      }
                      id={folder}
                  />
              ))}
          </div>
      </div>
  );
};
export default LeftPanel;

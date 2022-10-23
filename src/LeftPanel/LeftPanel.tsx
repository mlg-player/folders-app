import React from "react";
import { useSelector } from "react-redux";
import { getAllFoldersList } from "../redux/selectors/folders";
import LeftPanelInput from "./components/LeftPanelInput/LeftPanelInput";
import LeftPanelItems from "./components/LeftPanelItems/LeftPanelItems";
import css from "./LeftPanel.module.scss";

const LeftPanel = () => {
  const folders = useSelector(getAllFoldersList());

  return (
    <div className={css.leftPanel}>
      <LeftPanelInput />
      <div className={css.folders}>
        {folders.reverse().map((folder, i) => (
          <LeftPanelItems key={folder?.id} folder={folder} />
        ))}
      </div>
    </div>
  );
};
export default LeftPanel;

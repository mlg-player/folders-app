import React from "react";
import { useSelector } from "react-redux";
import { getCurrentFolder } from "../redux/selectors/folders";

const CenterPanel = () => {
  const currentFolder = useSelector(getCurrentFolder)
  console.log(currentFolder)
  return (
    <div className="center-panel">
      {currentFolder ? (
        <div>Current Folder: {currentFolder?.title}</div>
      ) : (
        <div>Select a folder</div>
      )}
    </div>
  );
};
export default CenterPanel;

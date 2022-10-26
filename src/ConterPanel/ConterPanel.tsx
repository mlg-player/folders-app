import React from "react";
import { useSelector } from "react-redux";
import { getCurrentFolder, getFolderItems } from "../redux/selectors/folders";
import EmptyState from "./components/EmptyState/EmptyState";
import Header from "./components/Header/Header";
import './ConterPanel.scss'
const CenterPanel = () => {
  const currentFolder = useSelector(getCurrentFolder)
  const folderItems = useSelector(getFolderItems)
  
  console.log(folderItems)
  return (
    <div className="center-panel">
      <Header title={currentFolder?.name} />
      {!folderItems.length && <EmptyState />}
      {folderItems.length ? <>
        contents
      </> : <></>}
    </div>
  );
};
export default CenterPanel;

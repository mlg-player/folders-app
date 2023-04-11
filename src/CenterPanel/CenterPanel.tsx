import _ from "lodash";
import React from "react";
import { useAppSelector } from "@redux";
import folderSelectors from "@redux/selectors/folders";
const { getCurrentFolder, getFolderItems } = folderSelectors;
import EmptyState from "./components/EmptyState/EmptyState";
import Header from "./components/Header/Header";
import "./CenterPanel.scss";
import TooltipWrap from "@components/Tooltip";
const CenterPanel = () => {
    const currentFolder = useAppSelector(getCurrentFolder);
    const folderItems = useAppSelector(getFolderItems);
    if (!currentFolder)
        return (
            <div className="center-panel">
                <EmptyState type="selectFolder" />
            </div>
        );
    return (
        <div className="center-panel">
            <Header title={currentFolder?.name} type={currentFolder?.type} />
            {!folderItems.length && <EmptyState type="addItems" />}
            {folderItems.length ? <>contents</> : <></>}
        </div>
    );
};
export default React.memo(CenterPanel, _.isEqual);

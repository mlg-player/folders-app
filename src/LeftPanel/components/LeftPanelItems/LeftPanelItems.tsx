import React from "react";
import { isEqual } from "lodash";
import { IFolder } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelItems.module.scss";

const LeftPanelItems = (props: {
  folder: IFolder;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { folder, active, onClick } = props;

  return (
    <div
      className={`${css.folder} ${active ? css.active : ""}`}
      onClick={onClick}
    >
      {/* 
        // TODO ICONS
        <div>
            <Icon></Icon>
        </div> 
    */}
      <p>{folder?.name}</p>
      {/* <span>
        {folder?.order}
      </span> */}
    </div>
  );
};
export default React.memo(LeftPanelItems, isEqual);

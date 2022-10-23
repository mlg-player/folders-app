import React from "react";
import { isEqual } from "lodash";
import { IFolder } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelItems.module.scss";

const LeftPanelItems = (props: { folder: IFolder }) => {
  const { folder } = props;

  return (
    <div className={css.folder}>
      {/* 
        // TODO ICONS
        <div>
            <Icon></Icon>
        </div> 
    */}
      <p>{folder?.title}</p>
      {/* <span>
        {folder?.order}
      </span> */}
    </div>
  );
};
export default React.memo(LeftPanelItems, isEqual);

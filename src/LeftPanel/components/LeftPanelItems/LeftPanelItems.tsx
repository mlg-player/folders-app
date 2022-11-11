import React, { useState } from "react";
import { isEqual } from "lodash";
import { FoldersStore, IFolder } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelItems.module.scss";
import OnContextMenu from "./onContextMenu";
import { useAppDispatch } from "../../../redux";
import classNames from "classnames";

const LeftPanelItems = (props: {
  folder: IFolder;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { folder, active, onClick } = props;
  const [state, setState] = useState(null);
  const [edit, setEdit] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className={classNames(css.folder, {
          [`${css.active}`]: active || state,
          "has-own-context": true
        })}
        onClick={onClick}
        onContextMenu={(e) => {
          if (!edit) {
            setState(e);
          }
        }}
      >
        {/* 
          // TODO ICONS
          <div>
              <Icon></Icon>
          </div> 
        */}
        <p>{folder?.name}</p>
        {/* 
          <span>
            {folder?.order}
          </span> 
        */}
      </div>
      {state && (
        <OnContextMenu
          onClick={(e) => {
            if (e === "edit") {
              setEdit(true);
            } else if (e === "delete") {
              console.log('deleted')
              dispatch(FoldersStore.actions.removeFolder(folder.id));
            }
          }}
          action={state}
          onClose={() => setState(null)}
        />
      )}
    </>
  );
};
export default React.memo(LeftPanelItems, isEqual);

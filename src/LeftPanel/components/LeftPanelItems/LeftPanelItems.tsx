import React, { useState } from "react";
import { isEqual } from "lodash";
import { FoldersStore, IFolder } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelItems.module.scss";
import OnContextMenu from "./onContextMenu";
import { useAppDispatch } from "../../../redux";
import classNames from "classnames";
import RadioButton from "../../../icons/RadioButton";
import API from "../../../fetch";

const getIconByType = (type: string) => {
  switch (type) {
    case "folder":
      return <RadioButton />;

    default:
      return <></>;
  }
};

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
          [`${css.active}`]: active,
          [`${css.hovered}`]: state,
          "has-own-context": true,
        })}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault();
          if (!edit) {
            setState(e);
          }
        }}
      >
        {folder.type && getIconByType(folder.type)}

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
              new API().deleteFolder(folder.id)
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

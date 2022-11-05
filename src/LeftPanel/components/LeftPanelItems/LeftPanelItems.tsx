import React, { useState } from "react";
import { isEqual } from "lodash";
import { IFolder } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelItems.module.scss";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";
import useLocale from "../../../hooks/useLocale";

const LeftPanelItems = (props: {
  folder: IFolder;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const { folder, active, onClick } = props;
  const [state, setState] = useState(null);
  return (
    <>
      <div
        className={`${css.folder} ${active ? css.active : ""}`}
        onClick={onClick}
        onContextMenu={(e) => {
          setState(e);
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
        <ContextMenu onClose={() => setState(null)} action={state}>
          <>
            <div
              className={`${css.folder} ${active ? css.active : ""}`}
              onClick={onClick}
              onContextMenu={(e) => {
                setState(e);
              }}
            >
              {/* 
                  // TODO ICONS
                  <div>
                      <Icon></Icon>
                  </div> 
              */}
              <p>{useLocale("label.edit")}</p>
              {/*
               <span>
                  {folder?.order}
                </span> 
              */}
            </div>
            <div
              className={`${css.folder} ${active ? css.active : ""}`}
              onClick={onClick}
              onContextMenu={(e) => {
                setState(e);
              }}
            >
              {/* 
                  // TODO ICONS
                  <div>
                      <Icon></Icon>
                  </div> 
              */}
              <p>{useLocale("main.label.delete")}</p>
              {/* 
                <span>
                  {folder?.order}
                </span> 
              */}
            </div>
          </>
        </ContextMenu>
      )}
    </>
  );
};
export default React.memo(LeftPanelItems, isEqual);

import _ from "lodash";
import React from "react";
import css from "./ContextMenu.module.scss";
const ContextItems = (props: { title: string; onClick: () => void }) => {
  const { onClick, title } = props;
  return (
    <>
      <div className={css.contextItem} onClick={() => {
        console.log("CLICK")
        onClick()
      }}>
        <p>{title}</p>
      </div>
    </>
  );
};

export default React.memo(ContextItems, _.isEqual);

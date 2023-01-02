import _ from "lodash";
import React from "react";
import css from "./ContextMenu.module.scss";
const ContextItems = (props: { title: string; left?: JSX.Element; onClick: () => void }) => {
  const { onClick, title, left } = props;
  return (
    <>
      <div className={css.contextItem} onClick={() => {
        onClick()
      }}>
        {left && <div className={css.leftItem}>{left}</div>}
        <p>{title}</p>
      </div>
    </>
  );
};

export default React.memo(ContextItems, _.isEqual);

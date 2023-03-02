import _ from "lodash";
import React from "react";
import css from "./ContextMenu.module.scss";
const ContextItems = (props: { title: string; left?: JSX.Element; onClick: () => void }) => {
  const { onClick, title, left } = props;
  return (
    <>
      <div className={`has-own-context ${css.contextItem}`} onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick()
      }}>
        {left && <div className={css.leftItem}>{left}</div>}
        <p>{title}</p>
      </div>
    </>
  );
};

export default React.memo(ContextItems, _.isEqual);

import _ from "lodash";
import React, { useCallback, useState } from "react";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";
import More from "../../../icons/More";
import { getIconByType } from "../../../LeftPanel/components/LeftPanelItems/LeftPanelItems";
import css from "./Header.module.scss";
const Header = (props: { title: string; type?: string }) => {
  const { title, type } = props;
  const [contextAction, setContextAction] = useState(null);
  const onMore = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      // window.socket.emit("folders", {ev: "folders event emit"})
      setContextAction(e?.currentTarget);
    },
    []
  );
  return (
    <div className={css.title}>
      {type && getIconByType(type)}
      <p>{title}</p>
      <div onClick={onMore}>
        <More />
      </div>
      {contextAction && (
        <ContextMenu
          target={contextAction}
          closeClickInside
          onClose={() => {
            setContextAction(null);
          }}
          list={[
            {
              id: "0",
              title: "aa"
            },
          ]}
        />
      )}
    </div>
  );
};

export default React.memo(Header, _.isEqual);

import React from "react";
import css from "./LeftPanelItems.module.scss";

import _ from "lodash";
import ContextMenu from "@components/ContextMenu/ContextMenu";
import useLocale from "@hooks/useLocale";
import Delete from "@icons/Delete";
import Edit from "@icons/Edit";

const OnContextMenu = (props: {
  onClose: () => void;
  onClick: (e: "edit" | "delete") => void;
  action: React.MouseEvent<HTMLDivElement, MouseEvent>;
}) => {
  const { onClose, action, onClick } = props;
  return (
    <>
      <ContextMenu
        closeClickInside={true}
        list={[
          {
            title: useLocale("main.label.edit"),
            onClick: () => onClick("edit"),
            id: "1",
            left: <Edit />,
          },
          {
            title: useLocale("main.label.delete"),
            onClick: () => onClick("delete"),
            id: "2",
            left: <Delete />,
          },
        ]}
        onClose={onClose}
        event={action}
      />
    </>
  );
};

export default React.memo(OnContextMenu, _.isEqual);

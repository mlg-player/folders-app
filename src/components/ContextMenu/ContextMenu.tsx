import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ContextItems from "./ContextItems";
import "./ContextMenu.scss";
const ContextMenu = (props: {
  action: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
  children?: JSX.Element;
  list?: {
    title: string;
    onClick?: (id: string) => void;
    id: string;
  }[];
  closeClickInside?: boolean;
}) => {
  const { action, onClose, children, closeClickInside, list } = props;
  const [coords, setCoords] = useState(null);
  const getPostition = () => {
    const elem = action?.target as HTMLElement;
    const elemHeight = elem?.getBoundingClientRect().height;
    if (action?.clientY + elemHeight > window.innerHeight) {
      setCoords({
        top: window.innerHeight - elemHeight,
        left: action?.clientX,
      });
    } else {
      setCoords({
        top: action?.clientY,
        left: action?.clientX,
      });
    }
  };

  useEffect(() => {
    getPostition();
  }, []);
  useEffect(() => {
    window.addEventListener("resize", getPostition, false);
    return () => {
      window.removeEventListener("resize", getPostition, false);
    };
  }, [action]);
  const closeOutside = useCallback((e: MouseEvent) => {
    const elem = e.target as HTMLElement;
    setTimeout(() => {
      if (!elem.closest(".contextMenu") || closeClickInside) {
        onClose();
      }
    }, 250);
  }, []);
  useEffect(() => {
    window.addEventListener("mousedown", closeOutside, false);
    return () => {
      window.removeEventListener("mousedown", closeOutside, false);
    };
  }, []);

  return (
    <ContextMenuRoot>
      <div
        className="contextMenu"
        style={{
          ...coords,
        }}
      >
        {list
          ? list.map((e) => (
              <ContextItems
                key={e.id}
                onClick={() => e.onClick(e.id)}
                title={e.title}
              />
            ))
          : children}
      </div>
    </ContextMenuRoot>
  );
};

const ContextMenuRoot = (props: { children: JSX.Element }) => {
  const { children } = props;
  const root = document.getElementById("context-root");
  return createPortal(children, root);
};
export default React.memo(ContextMenu, _.isEqual);

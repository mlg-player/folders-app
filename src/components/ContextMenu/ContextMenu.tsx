import _ from "lodash";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./ContextMenu.scss";
const ContextMenu = (props: {
  action: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
  children: JSX.Element;
}) => {
  const { action, onClose, children } = props;
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
  useEffect(() => {
    const closeOutside = (e: MouseEvent) => {
      const elem = e.target as HTMLElement;
      if (!elem.closest(".contextMenu")) {
        onClose();
      }
    };
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
        {children}
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

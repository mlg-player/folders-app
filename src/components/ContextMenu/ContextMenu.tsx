import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ContextItems from "./ContextItems";
import "./ContextMenu.scss";
const ContextMenu = (props: {
  action: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
  children?: JSX.Element;
  list?: {
    left?: JSX.Element;
    title: string;
    onClick?: (id: string) => void;
    id: string;
  }[];
  closeClickInside?: boolean;
  customRoot?: string
}) => {
  const { action, onClose, children, closeClickInside, list, customRoot } = props;
  const [coords, setCoords] = useState(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const getPostition = () => {
    const elem = contentRef?.current as HTMLElement;
    const elemHeight = contentRef?.current?.getBoundingClientRect().height;
    const elemWidth = contentRef?.current?.getBoundingClientRect().width;
    console.groupCollapsed("contextPos");
    console.log("elem", elem);
    console.log("window.innerHeight", window.innerHeight);
    console.log("elemHeight", elemHeight);
    console.log("elemWidth", elemWidth);
    console.log("action?.clientX", action?.clientX);
    console.groupEnd();

    const getHorizontalPos = () => {
      if(action?.clientX + elemWidth > window.innerWidth) {
        return {
          left: "none",
          right: 0,
        }
      } else {
        return {
          left: action?.clientX,
        }
      }
    }

    const getVerticalPos = () => {
      if(action?.clientY + elemHeight > window.innerHeight) {
        return {
          top: window.innerHeight - elemHeight,
        }
      } else {
        return {
          top: action?.clientY,
        }
      }
    }
    setCoords({
      ...getVerticalPos(),
      ...getHorizontalPos(),
      visibility: "visible"
    });
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
      if (!elem.closest(".contextMenu")) {
        onClose();
      }
    }, 50);
  }, []);
  useEffect(() => {
    window.addEventListener("mousedown", closeOutside, false);
    return () => {
      window.removeEventListener("mousedown", closeOutside, false);
    };
  }, []);

  return (
    <ContextMenuRoot customRoot={customRoot}>
      <div
        className="contextMenu"
        style={{
          visibility: "hidden",
          ...coords,
        }}
        ref={contentRef}
      >
        {list
          ? list.map((e) => (
            <ContextItems
              key={e.id}
              onClick={() => {
                e.onClick(e.id);
                if (closeClickInside) {
                  setTimeout(() => {
                    onClose();
                  }, 50);
                }
              }}
              left={e.left}
              title={e.title}
            />
          ))
          : children}
      </div>
    </ContextMenuRoot>
  );
};

const ContextMenuRoot = (props: { children: JSX.Element, customRoot?: string }) => {
  const { children, customRoot = "context-root" } = props;
  const root = document.getElementById(customRoot);
  return createPortal(children, root);
};
export default React.memo(ContextMenu, _.isEqual);

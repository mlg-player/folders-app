import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CustomPortalRoot } from "../../hooks/CustomPortalRoot";
import ContextItems from "./ContextItems";
import "./ContextMenu.scss";
const ContextMenu = (props: {
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>;
    target?: HTMLElement;
    onClose: () => void;
    children?: JSX.Element;
    list?: {
        left?: JSX.Element;
        title: string;
        onClick?: (id: string) => void;
        id: string;
    }[];
    closeClickInside?: boolean;
    customRoot?: string;
}) => {
    const {
        event,
        target,
        onClose,
        children,
        closeClickInside,
        list,
        customRoot,
    } = props;
    const [coords, setCoords] = useState(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const getPosition = () => {
        const elemHeight = contentRef?.current?.getBoundingClientRect().height;
        const elemWidth = contentRef?.current?.getBoundingClientRect().width;
        const getHorizontalPos = () => {
            if (target) {
                const pos = target.getBoundingClientRect();
                return {
                    left: pos.left,
                    right: "none",
                };
            }
            if (event?.clientX + elemWidth > window.innerWidth) {
                return {
                    left: "none",
                    right: 0,
                };
            } else {
                return {
                    left: event?.clientX,
                };
            }
        };

        const getVerticalPos = () => {
            if (target) {
                const pos = target.getBoundingClientRect();
                return {
                    top: pos.bottom,
                };
            }
            if (event?.clientY + elemHeight > window.innerHeight) {
                return {
                    top: window.innerHeight - elemHeight,
                };
            } else {
                return {
                    top: event?.clientY,
                };
            }
        };
        setCoords({
            ...getVerticalPos(),
            ...getHorizontalPos(),
            visibility: "visible",
        });
    };

    useEffect(() => {
        window.addEventListener("resize", getPosition, false);
        getPosition();
        return () => {
            window.removeEventListener("resize", getPosition, false);
        };
    }, []);
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

const ContextMenuRoot = (props: {
    children: JSX.Element;
    customRoot?: string;
}) => {
    const { children, customRoot = "context-root" } = props;
    return <CustomPortalRoot children={children} customRoot={customRoot} />;
};
export default React.memo(ContextMenu, _.isEqual);

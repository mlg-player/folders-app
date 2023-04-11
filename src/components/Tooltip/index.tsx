import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import Tooltip from "./Tooltip";
import { CustomPortalRoot } from "@hooks/CustomPortalRoot";
import classNames from "classnames";
import _ from "lodash";
const tooltipWrap = "tooltip__wrap";
export const startWithReady = (func: () => void) => {
    try {
        if (document.readyState !== "loading") {
            try {
                func();
            } catch (e) {
                console.log(e);
            }
        } else {
            document.addEventListener("DOMContentLoaded", function () {
                try {
                    func();
                } catch (e) {
                    console.log(e);
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
};
startWithReady(() => {
    const root = document.getElementById("tooltip-root");
    let tooltipControl: ReturnType<typeof setTimeout> = null;
    let lastShowedItem: HTMLElement = null;

    const hideListTooltip = async () => {
        if (tooltipControl) {
            clearTimeout(tooltipControl);
            tooltipControl = null;
        }
        if (lastShowedItem) {
            lastShowedItem.dispatchEvent(new Event("hide-tooltip"));
            console.log(lastShowedItem.id)
            lastShowedItem = null;
        }
        if (root) {
            root?.classList?.remove("active");
        }
    };

    document.addEventListener("scroll", hideListTooltip, true);
    document.addEventListener("mouseup", async () => {
        hideListTooltip();
    });
    document.addEventListener("mousedown", async () => {
        hideListTooltip();
    });
    document.addEventListener("mousemove", async (e) => {
        const target = e.target as HTMLElement;
        const getTarget = () => {
            if (target?.classList?.contains(tooltipWrap)) {
                return target;
            } else {
                return target?.closest(`.${tooltipWrap}`) as HTMLElement;
            }
        };
        try {
            const currentTarget = getTarget();
            if (!currentTarget) {
                return hideListTooltip();
            }
            if (lastShowedItem && currentTarget) {
                if (currentTarget.id === lastShowedItem.id) {
                    return;
                } else {
                    hideListTooltip();
                    return;
                }
            }

            clearTimeout(tooltipControl);

            lastShowedItem = currentTarget;
            tooltipControl = setTimeout(() => {
                const showTooltip = () => {
                    root.classList.add("active");
                    clearTimeout(tooltipControl);
                    tooltipControl = null;
                    currentTarget?.dispatchEvent(
                        new CustomEvent("show-tooltip", { detail: e })
                    );
                };
                showTooltip();
            }, 400);
        } catch (e) {
            console.log(e);
        }
    });
});
const setPosition = (
    event: MouseEvent,
    ref: HTMLElement,
    arrow: "top" | "bottom" | "left" | "right"
) => {
    console.log(event, ref, arrow);
    if (ref?.style) {
        ref.style.left = `${event?.clientX}px`
        ref.style.top = `${event?.clientY}px`

    }
};

export const uuidv4 = () => {
    // @ts-expect-error
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
};
const TooltipWrap = (props: {
    className?: string;
    arrow?: "top" | "bottom" | "left" | "right";
    children: JSX.Element;
    hint: string;
}) => {
    const { className, arrow = "top", children } = props;
    const id = useRef(uuidv4());
    const ref = useRef<HTMLDivElement>(null);
    const event = useRef(null);
    const tooltipRoot = useRef(document.getElementById("tooltip-root"));
    const [show, setShow] = useState<boolean>(false);
    const disableTooltip = useCallback(() => {
        setShow(false);
    }, []);

    useLayoutEffect(() => {
        if (show) {
            setPosition(event.current, tooltipRoot.current, arrow);
        }
    }, [show]);

    useEffect(() => {
        /** Show Tooltip listener */
        const showTooltipListener = (e: any) => {
            if (!e.detail) return;
            event.current = e.detail;
            setShow(true);
        };

        /** Hide Tooltip listener */
        const hideTooltipListener = () => {
            setShow(false);
        };

        ref.current.addEventListener("show-tooltip", showTooltipListener, {
            once: true,
            passive: true,
        });

        ref.current.addEventListener("hide-tooltip", hideTooltipListener, {
            once: true
        });

        return () => {
            ref.current.removeEventListener(
                "show-tooltip",
                showTooltipListener
            );
            ref.current.removeEventListener(
                "hide-tooltip",
                hideTooltipListener
            );
        };
    }, [ref.current]);
    useEffect(() => {
        return () => {
            disableTooltip();
        };
    }, []);
    useEffect(() => {
        console.log(show);
    }, [show]);

    return (
        <div
            id={id.current}
            ref={ref}
            className={classNames(tooltipWrap, className)}
        >
            {show && (
                <CustomPortalRoot customRoot="tooltip-root">
                    <Tooltip {...props} arrow={arrow} />
                </CustomPortalRoot>
            )}
            {children}
        </div>
    );
};
export default TooltipWrap;

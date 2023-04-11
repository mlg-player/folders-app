import React from "react";
import Arrow from "@icons/Arrow";
import "./Tooltip.scss";
import classNames from "classnames";
interface Tooltip {
    arrow?: "top" | "bottom" | "left" | "right";
    className?: string;
    hint?: string;
    content?: string;
}
const Tooltip = (props: Tooltip) => {
    const { arrow = "bottom", className, hint, content } = props;
    const tooltipClassName = classNames(className, {
        tooltip: true,
        [`tooltip--arrow-${arrow}`]: arrow,
    });
    return (
        <>
            <div className={tooltipClassName}>
                <Arrow id="tooltip-arrow" className={"arrow"} />
                {hint && <div className="tooltip__title">{hint}</div>}
                {content && <div className="tooltip__content">{content}</div>}
            </div>
        </>
    );
};

export default React.memo(Tooltip);

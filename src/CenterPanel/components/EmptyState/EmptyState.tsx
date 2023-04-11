import _ from "lodash";
import React, { useMemo } from "react";
import useLocale from "@hooks/useLocale";
import css from "./EmptyState.module.scss";
import TooltipWrap from "@components/Tooltip";

const EmptyState = ({
    type = "selectFolder",
}: {
    type?: "selectFolder" | "addItems";
}) => {
    const typeText = useMemo(() => {
        if (type === "addItems") {
            return useLocale("center_panel.label.add_notes");
        } else {
            return useLocale("center_panel.label.select_a_folder");
        }
    }, [type]);
    return (
        <div className={css.wrapper}>
            <div>{typeText}</div>
            <TooltipWrap arrow="right" hint="Heello">
                <button>aaa</button>
            </TooltipWrap>
        </div>
    );
};

export default React.memo(EmptyState, _.isEqual);

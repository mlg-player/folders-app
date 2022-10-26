import _ from "lodash";
import React, { useMemo } from "react";
import css from "./EmptyState.module.scss";

const EmptyState = ({type = 'selectFolder'}: {type?: 'selectFolder' | 'addItems'}) => {
    const typeText = useMemo(() => {
        if(type === 'addItems') {
            return 'Add Notes'
        } else {
            return "Select a folder";
        }
    },[])
    return (
      <div className={css.wrapper}>
        <div>{typeText}</div>
      </div>
    );
}

export default React.memo(EmptyState, _.isEqual)
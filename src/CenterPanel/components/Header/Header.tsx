import _ from "lodash";
import React from "react";
import css from './Header.module.scss'
const Header = (props: {
    title: string;
}) => {
    const {title} = props;
    return <div className={css.title}>{title}</div>
}

export default React.memo(Header, _.isEqual)
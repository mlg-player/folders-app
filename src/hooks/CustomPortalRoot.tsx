import { useEffect } from "react";
import { createPortal } from "react-dom";

export const CustomPortalRoot = (props: {
    children: JSX.Element;
    customRoot?: string;
}) => {
    const { children, customRoot = "context-root" } = props;
    const root = document.getElementById(customRoot);
    useEffect(() => {
        root?.classList?.add('active')
        return () => {
            root?.classList?.remove('active')

        }
    }, [])
    return createPortal(children, root);
};

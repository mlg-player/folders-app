import React from "react";

const Arrow = (
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLSpanElement>,
        HTMLSpanElement
    >
) => {
    return (
        <span {...props}>
            <svg
                width="16"
                height="8"
                viewBox="0 0 16 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 8H16L7.99999 0L0 8Z"
                    fill="currentColor"
                />
            </svg>
        </span>
    );
};
export default Arrow;

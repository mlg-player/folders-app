import { isEqual } from "lodash";
import React, { useMemo } from "react";
import "./Checkbox.scss";
import classNames from "classnames";
const renderRest = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 0C21.8391 0 23.7613 1.78466 23.9794 4.06662L24 4.5V19.5C24 21.8391 22.2153 23.7613 19.9334 23.9794L19.5 24H4.5C2.1609 24 0.238653 22.2153 0.0205994 19.9334L0 19.5V4.5C0 2.1609 1.78466 0.238653 4.06662 0.0205994L4.5 0H19.5ZM19.5 3H4.5C3.67158 3 3 3.67158 3 4.5V19.5C3 20.3284 3.67158 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67158 20.3284 3 19.5 3Z"
        fill="white"
      />
    </svg>
  );
};
const renderChecked = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6062 8.32035C18.9408 7.98562 18.9408 7.44291 18.6062 7.10818C18.2714 6.77343 17.7287 6.77343 17.3939 7.10818L9.4286 15.0735L6.60612 12.251C6.27138 11.9163 5.72868 11.9163 5.39394 12.251C5.0592 12.5858 5.0592 13.1285 5.39394 13.4633L8.82252 16.8919C9.15725 17.2265 9.69996 17.2265 10.0347 16.8919L18.6062 8.32035Z"
        fill="white"
      />
      <path
        d="M4.59741 0C2.05833 0 0 2.05833 0 4.59741V19.4026C0 21.9417 2.05833 24 4.59741 24H19.4026C21.9417 24 24 21.9417 24 19.4026V4.59741C24 2.05833 21.9417 0 19.4026 0H4.59741ZM1.71429 4.59741C1.71429 3.00511 3.00511 1.71429 4.59741 1.71429H19.4026C20.9949 1.71429 22.2857 3.00511 22.2857 4.59741V19.4026C22.2857 20.9949 20.9949 22.2857 19.4026 22.2857H4.59741C3.00511 22.2857 1.71429 20.9949 1.71429 19.4026V4.59741Z"
        fill="white"
      />
    </svg>
  );
};
const Checkbox = (props: {
  checked?: boolean;
  name?: string;
  title?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}) => {
  const { title, checked, name = "", onChange, onClick } = props;
  const className = useMemo(
    () =>
      classNames("checkbox", {
        "": "",
      }),
    []
  );
  return (
    <label className={className}>
      <input
        className="checkbox-hidden"
        onChange={onChange}
        onClick={onClick}
        type={"checkbox"}
        checked={checked}
        name={name}
      />
      {checked ? renderChecked() : renderRest()}
      <span>{title}</span>
    </label>
  );
};
export default React.memo(Checkbox, isEqual);

import { isEqual, uniqueId } from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FoldersStore } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelInput.module.scss";

import API from "../../../fetch";
import { getFoldersCount } from "../../../redux/selectors/folders";
import useLocale from "../../../hooks/useLocale";
const LeftPanelInput = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(true);
  const [value, setValue] = useState("");
  const order = useSelector(getFoldersCount);
  const handleSubmit = useCallback(() => {
    if (value.length < 2) return;
    const item = {
      id: uniqueId(),
      name: value,
      type: 'folder'
    };
    new API().addFolder({ ...item, order: order });
    dispatch(FoldersStore.actions.addFolder(item));
    setValue("");
  }, [value, order]);
  const formInput = useMemo(() => {
    return (
      <form
        className={css.addFolderForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          className={css.addFolderInput}
          type="text"
          value={value}
          max="24"
          // pattern="/[\w ._-]+/gsi"
          autoCapitalize="on"
          ref={input}
          min="2"
          placeholder={useLocale("left_panel.button.add_new_folder")}
          onBlur={() => {
            // setShowInput(false);
          }}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    );
  }, [input, css, value]);
  return (
    <div className={css.addFolder}>
      {showInput && formInput}
      {!showInput && (
        <button
          className={css.createNewFolder}
          onClick={() => {
            setShowInput(true);
            setTimeout(() => {
              input?.current?.focus();
            }, 1);
          }}
        >
          <span>{useLocale("left_panel.button.add_new_folder")}</span>
        </button>
      )}
    </div>
  );
};
export default React.memo(LeftPanelInput, isEqual);

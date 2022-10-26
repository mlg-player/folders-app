import { isEqual, uniqueId } from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FoldersStore } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelInput.module.scss";

import API from "../../../fetch";
const LeftPanelInput = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(true);
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (value.length < 2) return;
    const item = {
      id: uniqueId(),
      name: value,
    }
    // name, id, order
    new API().addFolder(item)
    dispatch(
      FoldersStore.actions.addFolder(item)
    );
    setValue("");
  }, [value]);
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
          placeholder="Add new folder"
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
          <span>Add new folder</span>
        </button>
      )}
    </div>
  );
};
export default React.memo(LeftPanelInput, isEqual);

import { isEqual, uniqueId } from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FoldersStore } from "../../../redux/store/FoldersStore";
import css from "./LeftPanelInput.module.scss";
const LeftPanelInput = () => {
  const input = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(true);
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (value.length < 2) return;
    dispatch(
      FoldersStore.actions.addFolder({
        id: uniqueId(),
        title: value,
      })
    );
    setValue("");
  }, [value]);
  const formInput = useMemo(() =>{
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
    )
   } , [input, css, value])
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

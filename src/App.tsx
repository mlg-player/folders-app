import React, { useEffect } from "react";
import CenterPanel from "./CenterPanel/CenterPanel";
import API from "./fetch";
import ContextMenuHandler from "./hooks/ContextMenuHandler";
import LeftPanel from "./LeftPanel/LeftPanel";
import { useAppDispatch } from "./redux";
import socket from "./redux/socketEventListener";
import { FoldersStore } from "./redux/store/FoldersStore";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const _socket = socket();
    const getItems = async () => {
      const items = await new API().initState();
      dispatch(FoldersStore.actions.initial(items));
    };
    getItems();
    return () => {
      _socket();
    };
  }, []);
  return (
    <>
      <ContextMenuHandler />
      <LeftPanel />
      <CenterPanel />
    </>
  );
};

export default App;

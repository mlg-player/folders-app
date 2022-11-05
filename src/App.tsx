import React, { useEffect } from "react";
import CenterPanel from "./ConterPanel/ConterPanel";
import API from "./fetch";
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
      <LeftPanel />
      <CenterPanel />
    </>
  );
};

export default App;

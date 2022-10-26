import React, { useEffect } from "react";
import CenterPanel from "./ConterPanel/ConterPanel";
import API from "./fetch";
import LeftPanel from "./LeftPanel/LeftPanel";
import { useAppDispatch } from "./redux";
import { FoldersStore } from "./redux/store/FoldersStore";

const App = () => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const getItems = async () => {
      const items = await new API().initState()
      dispatch(FoldersStore.actions.initial(items))
    }
    getItems()
  },[])

  return (
    <>
      <LeftPanel />
      <CenterPanel />
    </>
  );
};

export default App;

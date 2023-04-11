import React, { useEffect } from "react";
import { useAppDispatch } from "@redux";

import CenterPanel from "./CenterPanel/CenterPanel";
import LeftPanel from "./LeftPanel/LeftPanel";

import API from "@fetch";
import { FoldersStore } from "@redux/store/FoldersStore";
import ContextMenuHandler from "@hooks/ContextMenuHandler";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // const _socket = socket();
        const getItems = async () => {
            const items = await new API().initState();
            if (items) dispatch(FoldersStore.actions.initial(items));
        };
        getItems();
        return () => {
            // _socket();
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

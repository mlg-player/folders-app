import _ from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LoginDialog from "../Dialogs/LoginDialog/LoginDialog";
import API from "../fetch";
import { CustomPortalRoot } from "../hooks/CustomPortalRoot";
import { useGlobalStorage } from "../hooks/customState";
import { getCookie } from "../hooks/tokenManagement";
import useLocale from "../hooks/useLocale";
import { useAppDispatch } from "../redux";
import { setCurrentFolder } from "../redux/actions/LeftPanelActions";
import folderSelectors from "../redux/selectors/folders";
import LeftPanelInput from "./components/LeftPanelInput/LeftPanelInput";
import LeftPanelItems from "./components/LeftPanelItems/LeftPanelItems";
import css from "./LeftPanel.module.scss";const { getAllFoldersList, getCurrentFolderId } = folderSelectors;

const LeftPanel = () => {
    const folders = useSelector(getAllFoldersList);
    const selected = useSelector(getCurrentFolderId);
    const dispatch = useAppDispatch();
    const cookie = getCookie("token");
    const [globalStorage, dispatcher] = useGlobalStorage();

    return (
        <div className={css.leftPanel}>
            <LeftPanelInput />

            <div className={css.folders}>
                {folders.map((folder, i) => (
                    <LeftPanelItems
                        key={folder}
                        active={selected === folder}
                        onClick={(e) =>
                            dispatch(setCurrentFolder(String(folder)))
                        }
                        id={folder}
                    />
                ))}
            </div>
            { globalStorage?.logged === false && <LoginDialog onLogin={() => {
                dispatcher((s) => ({...s, logged: true}))
            }} />}
            {/* <LoginDialog /> */}
        </div>
    );
};

export default LeftPanel;

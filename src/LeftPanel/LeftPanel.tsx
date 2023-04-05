import React from "react";
import css from "./LeftPanel.module.scss";

import _ from "lodash";
import { useAppDispatch } from "@redux";
import { useSelector } from "react-redux";

import LoginDialog from "@dialogs/LoginDialog/LoginDialog";

import { useGlobalStorage } from "@hooks/customState";
import { getCookie } from "@hooks/tokenManagement";

import folderSelectors from "@redux/selectors/folders";
import { setCurrentFolder } from "@redux/actions/LeftPanelActions";

import LeftPanelInput from "./components/LeftPanelInput/LeftPanelInput";
import LeftPanelItems from "./components/LeftPanelItems/LeftPanelItems";

const { getAllFoldersList, getCurrentFolderId } = folderSelectors;

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
            {globalStorage?.logged === false && (
                <LoginDialog
                    onLogin={() => {
                        dispatcher((s) => ({ ...s, logged: true }));
                    }}
                />
            )}
            {/* <LoginDialog /> */}
        </div>
    );
};

export default LeftPanel;

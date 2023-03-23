import _ from "lodash";
import React, { useCallback, useMemo, useRef, useState } from "react";
import API from "../../fetch";
import { CustomPortalRoot } from "../../hooks/CustomPortalRoot";
import { useGlobalDispatcher } from "../../hooks/customState";
import useLocale from "../../hooks/useLocale";
import css from "./LoginDialog.module.scss";
const LoginDialog = React.memo((props: {
    onLogin: () => void
}) => {
    const {onLogin} = props;
    const [type, setType] = useState<"login" | "register">("register");
    const values = useRef({
        login: "",
        password: "",
        name: "",
    });
    const handleChange = useCallback(
        (val: string, key: "login" | "password" | "name") => {
            values.current[key] = val;
        },
        []
    );
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (type === "register") {
            new API().register(values.current).then((res) => {
                if (res?.response === true) onLogin()
            });
        } else {
            new API().login(values.current).then((res) => {
                if (res === true) onLogin()
            });
        }
    };
    const addInput = (
        type: "login" | "password" | "name",
        placeholder: string
    ) => {
        return (
            <div className={css.inputWrapper}>
                <input
                    className={css.authInput}
                    type={type}
                    placeholder={placeholder}
                    name={type}
                    onChange={({ target }) => handleChange(target.value, type)}
                />
            </div>
        );
    };
    const loginInput = useMemo(() => addInput("login", "Login"), []);
    const passwordInput = useMemo(() => addInput("password", "Password"), []);
    const nameInput = useMemo(() => addInput("name", "Full name"), []);
    const submitBtnDescription = useMemo(() => {
        if (type === "login") {
            return (
                <p>
                    {useLocale("dialog.login.you_dont_have_an_account")}{" "}
                    <span
                        onClick={() => {
                            setType("register");
                        }}
                    >
                        {useLocale("dialog.login.sign_up")}
                    </span>
                </p>
            );
        }
        return (
            <p>
                {useLocale("dialog.login.you_already_have_an_account")}{" "}
                <span
                    onClick={() => {
                        setType("login");
                    }}
                >
                    {useLocale("dialog.login.sign_in")}
                </span>
            </p>
        );
    }, [type]);
    return (
        <CustomPortalRoot customRoot="dialog-root">
            <div className={css.loginWrapper}>
                <h1>
                    {useLocale(
                        type === "login"
                            ? "dialog.login.sign_in"
                            : "dialog.login.sign_up"
                    )}
                    !
                </h1>
                <div className={css.loginContent}>
                    <form className={css.loginForm} onSubmit={handleSubmit}>
                        {type === "register" ? nameInput : <></>}
                        {loginInput}
                        {passwordInput}
                        <div className={css.submitButtonWrapper}>
                            <button
                                className={`${css.inputWrapper} ${css.submitButton}`}
                                type={"submit"}
                            >
                                Send
                            </button>
                            {submitBtnDescription}
                        </div>
                        <div className={css.inputWrapper}></div>
                    </form>
                </div>
            </div>
        </CustomPortalRoot>
    );
}, _.isEqual);

export default LoginDialog;

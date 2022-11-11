import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import store from "./redux";
import "./index.scss";

initializeIcons();

const element = document.getElementById("root");
const root = createRoot(element as HTMLElement);
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

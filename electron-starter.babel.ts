import { BrowserWindow, app } from "electron";
const path = require("path");

const AppUrl = "http://localhost:1500/";

declare global {
  interface Window {
    ipcMain: Electron.IpcMain;
    ipcRenderer: Electron.IpcRenderer;
  }
}

app.disableHardwareAcceleration();
const mainWindow = () => {
  const win = new BrowserWindow({
    title: "Text",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "/preload.babel.ts"),
    },
    minWidth: 600,
    frame: false,
    minHeight: 800,
    // opacity: 0.5
  });
  win.loadURL(AppUrl);
  return win;
};
app.whenReady().then(() => {
  // @ts-expect-error
  app.allowRendererProcessReuse = true;
  if (app.dock) {
    app.dock.bounce();
  }
  mainWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

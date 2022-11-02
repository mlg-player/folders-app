import {
  BrowserWindow,
  app,
  ipcMain,
  ipcRenderer,
} from "electron";
const path = require("path");

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
    minHeight: 800,
    // opacity: 0.5
  });
  win.loadURL("http://localhost:1500/")
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

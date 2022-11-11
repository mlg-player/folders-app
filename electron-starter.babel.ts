import { BrowserWindow, app, Menu, ipcMain } from "electron";
const path = require("path");
const AppUrl = "http://localhost:1500/";

declare global {
  interface Window {
    ipcMain: Electron.IpcMain;
    ipcRenderer: Electron.IpcRenderer;
    appLanguage: string;
  }
}
const menu = Menu.buildFromTemplate([
  {
    label: "Menu",
    submenu: [
      {
        label: "app.label.close",
        click: () => {
          ipcMain?.emit("context-menu-command", "menu-item-1");
        },
      },
      {
        label: "app.label.close",
        click: () => {
          ipcMain?.emit("context-menu-command", "menu-item-1");
        },
      },
    ],
  },
  {
    label: "DevTools",
    click: () => {
      ipcMain?.emit("context-menu-command", "dev-tools");
    }
  },
]);
Menu.setApplicationMenu(menu);

app.disableHardwareAcceleration();
const mainWindow = () => {
  const win = new BrowserWindow({
    title: "Text",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "/preload.babel.ts"),
    },
    minWidth: 800,
    minHeight: 600,
    // opacity: 0.5
  });
  win.loadURL(AppUrl);
  ipcMain.on("context-menu-command", (args, type) => {
    if(typeof args === "string" && args === "dev-tools") {
      if(win.webContents.isDevToolsOpened()){
        win.webContents.closeDevTools()
      } else {
        win.webContents.openDevTools()
      }
    }
  });
  ipcMain.on("window-reload-app", () => {
    win.reload()
  })
  return win;
};
app.whenReady().then(() => {
  // @ts-expect-error
  app.allowRendererProcessReuse = true;

  
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

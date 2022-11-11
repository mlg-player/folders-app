// import { ipcMain } from "electron";

const { contextBridge, ipcRenderer } = require("electron");

// console.log(__ipcMain)/
contextBridge.exposeInMainWorld('electronApp', {
    onDownload: () => ipcRenderer.send('download-started'),
    reloadWindow: () => ipcRenderer.send("window-reload-app")
})
// if(window){
//   window.ipcMain = ipcMain;
//   window.ipcRenderer = ipcRenderer;
// }
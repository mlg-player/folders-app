// import { ipcMain } from "electron";

const { contextBridge, ipcRenderer } = require("electron");

// console.log(__ipcMain)/
contextBridge.exposeInMainWorld('electronApp', {
    onDownload: () => ipcRenderer.send('download-started')
})
// if(window){
//   window.ipcMain = ipcMain;
//   window.ipcRenderer = ipcRenderer;
// }
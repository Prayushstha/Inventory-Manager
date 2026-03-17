const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppUrl: () => ipcRenderer.invoke('get-app-url'),
});
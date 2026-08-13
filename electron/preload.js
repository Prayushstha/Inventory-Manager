import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('db', {
  addProduct: (product) => ipcRenderer.invoke('db:addProduct', product),
  getProducts: () => ipcRenderer.invoke('db:getProducts'),
  editProduct: (id, product) => ipcRenderer.invoke('db:editProduct', id, product),
  deleteProduct: (id) => ipcRenderer.invoke('db:deleteProduct', id),
});
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('db', {
  addProduct: (product) => ipcRenderer.invoke('db:addProduct', product),
  getProducts: () => ipcRenderer.invoke('db:getProducts'),
  editProduct: (id, product) => ipcRenderer.invoke('db:editProduct', id, product),
  deleteProduct: (id) => ipcRenderer.invoke('db:deleteProduct', id),
  getProductByName: (name) => ipcRenderer.invoke('db:getProductByName', name),
  getVariantBySize: (productId, bucketSize) => ipcRenderer.invoke('db:getVariantBySize', productId, bucketSize),
  addVariant: (productId, variant) => ipcRenderer.invoke('db:addVariant', productId, variant),
  addBase: (productId, baseName) => ipcRenderer.invoke('db:addBase', productId, baseName),
  addBaseStock: (baseId, variantId, stock) => ipcRenderer.invoke('db:addBaseStock', baseId, variantId, stock),
  pickImage: () => ipcRenderer.invoke('dialog:pickImage'),
  copyImage: (sourcePath) => ipcRenderer.invoke('db:copyImage', sourcePath),
  resolveImagePath: (relativePath) => ipcRenderer.invoke('db:resolveImagePath', relativePath),
  getBaseByName: (productId, baseName) => ipcRenderer.invoke('db:getBaseByName', productId, baseName),
});
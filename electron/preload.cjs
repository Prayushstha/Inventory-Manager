const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("db", {
  addProduct: (product) => ipcRenderer.invoke("db:addProduct", product),
  getProducts: () => ipcRenderer.invoke("db:getProducts"),
  editProduct: (id, product) =>
    ipcRenderer.invoke("db:editProduct", id, product),
  deleteProduct: (id) => ipcRenderer.invoke("db:deleteProduct", id),
  getProductByName: (name) => ipcRenderer.invoke("db:getProductByName", name),
  getVariantBySize: (productId, bucketSize) =>
    ipcRenderer.invoke("db:getVariantBySize", productId, bucketSize),
  addVariant: (productId, variant) =>
    ipcRenderer.invoke("db:addVariant", productId, variant),
  addBase: (productId, baseName) =>
    ipcRenderer.invoke("db:addBase", productId, baseName),
  addBaseStock: (baseId, variantId, stock) =>
    ipcRenderer.invoke("db:addBaseStock", baseId, variantId, stock),
  pickImage: () => ipcRenderer.invoke("dialog:pickImage"),
  copyImage: (sourcePath) => ipcRenderer.invoke("db:copyImage", sourcePath),
  resolveImagePath: (relativePath) =>
    ipcRenderer.invoke("db:resolveImagePath", relativePath),
  getBaseByName: (productId, baseName) =>
    ipcRenderer.invoke("db:getBaseByName", productId, baseName),
  addCustomer: (customer) => ipcRenderer.invoke("db:addCustomer", customer),
  addBill: (customerId, bill) =>
    ipcRenderer.invoke("db:addBill", customerId, bill),
  getCustomers: () => ipcRenderer.invoke("db:getCustomers"),
  deleteCustomer: (id) => ipcRenderer.invoke("db:deleteCustomer", id),
  deleteBill: (billId) => ipcRenderer.invoke("db:deleteBill", billId),
  editCustomer: (id, customer) =>
    ipcRenderer.invoke("db:editCustomer", id, customer),
  editBill: (billId, bill) => ipcRenderer.invoke("db:editBill", billId, bill),
  pickExcelFile: () => ipcRenderer.invoke("dialog:pickExcelFile"),
  importExcel: (filePath) => ipcRenderer.invoke("db:importExcel", filePath),
  addExpense: (expense) => ipcRenderer.invoke("db:addExpense", expense),
  getExpenses: () => ipcRenderer.invoke("db:getExpenses"),
  deleteExpense: (id) => ipcRenderer.invoke("db:deleteExpense", id),
  getSales: () => ipcRenderer.invoke("db:getSales"),
  getNetPosition: (period) => ipcRenderer.invoke("db:getNetPosition", period),
  recordImportExpense: (expenseMeta, items) =>
    ipcRenderer.invoke("db:recordImportExpense", expenseMeta, items),
  getExpenseDetails: (id) => ipcRenderer.invoke("db:getExpenseDetails", id),
  editExpense: (id, expense) =>
    ipcRenderer.invoke("db:editExpense", id, expense),
  editImportExpense: (id, expenseMeta, items) =>
    ipcRenderer.invoke("db:editImportExpense", id, expenseMeta, items),
});

/* global process */
import { app, BrowserWindow, ipcMain, dialog, protocol, net } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { pathToFileURL } from "url";
import {
  addProduct,
  getProducts,
  deleteProduct,
  editProduct,
  getProductByName,
  recordImportExpense,
  getVariantBySize,
  addVariant,
  importProductsFromExcel,
  addBase,
  addBaseStock,
  copyImageToDatabase,
  editCustomer,
  editBill,
  resolveImagePath,
  addCustomer,
  addBill,
  getCustomers,
  deleteCustomer,
  getBaseByName,
  deleteBill,
  addExpense,
  getExpenses,
  deleteExpense,
  getSales,
  getNetPosition,
} from "../src/Backend/server.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}
protocol.registerSchemesAsPrivileged([
  {
    scheme: "app-image",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
    },
  },
]);
app.whenReady().then(() => {
  protocol.handle("app-image", (request) => {
    try {
      const url = new URL(request.url);
      const filePath = url.searchParams.get("path");
      if (!filePath) {
        throw new Error("No path provided");
      }
      const fileUrl = pathToFileURL(filePath).href;
      return net.fetch(fileUrl);
    } catch (err) {
      console.error("app-image protocol error:", err.message, request.url);
      return new Response("Not found", { status: 404 });
    }
  });
  ipcMain.handle("db:addProduct", (_, product) => addProduct(product));
  ipcMain.handle("db:getProducts", () => getProducts());
  ipcMain.handle("db:deleteProduct", (_, id) => deleteProduct(id));
  ipcMain.handle("db:editProduct", (_, id, product) =>
    editProduct(id, product),
  );
  ipcMain.handle("db:addExpense", (_, expense) => addExpense(expense));
  ipcMain.handle("db:getExpenses", () => getExpenses());
  ipcMain.handle("db:deleteExpense", (_, id) => deleteExpense(id));
  ipcMain.handle("db:getSales", () => getSales());
  ipcMain.handle("db:getNetPosition", (_, period) => getNetPosition(period));
  ipcMain.handle("db:getProductByName", (_, name) => getProductByName(name));
  ipcMain.handle("db:getVariantBySize", (_, productId, bucketSize) =>
    getVariantBySize(productId, bucketSize),
  );
  ipcMain.handle("db:addVariant", (_, productId, variant) =>
    addVariant(productId, variant),
  );
  ipcMain.handle("db:addBase", (_, productId, baseName) =>
    addBase(productId, baseName),
  );
  ipcMain.handle("db:addBaseStock", (_, baseId, variantId, stock) =>
    addBaseStock(baseId, variantId, stock),
  );
  ipcMain.handle("db:getBaseByName", (_, productId, baseName) =>
    getBaseByName(productId, baseName),
  );
  ipcMain.handle("db:addCustomer", (_, customer) => addCustomer(customer));
  ipcMain.handle("db:addBill", (_, customerId, bill) =>
    addBill(customerId, bill),
  );
  ipcMain.handle("db:editCustomer", (_, id, customer) =>
    editCustomer(id, customer),
  );
  ipcMain.handle("db:editBill", (_, billId, bill) => editBill(billId, bill));
  ipcMain.handle("db:getCustomers", () => getCustomers());
  ipcMain.handle("db:deleteCustomer", (_, id) => deleteCustomer(id));
  ipcMain.handle("db:deleteBill", (_, billId) => deleteBill(billId));
  ipcMain.handle("db:resolveImagePath", (_, relativePath) =>
    resolveImagePath(relativePath),
  );
  ipcMain.handle("dialog:pickExcelFile", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Excel Files", extensions: ["xlsx", "xls"] }],
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths[0];
  });
ipcMain.handle("db:recordImportExpense", (_, expenseMeta, items) =>
  recordImportExpense(expenseMeta, items),
);
  ipcMain.handle("db:importExcel", (_, filePath) =>
    importProductsFromExcel(filePath),
  );
  ipcMain.handle("db:copyImage", (_, sourcePath) =>
    copyImageToDatabase(sourcePath),
  );
  ipcMain.handle("dialog:pickImage", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "webp"] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    return result.filePaths[0];
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

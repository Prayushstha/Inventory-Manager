/* global process */
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import {
  addProduct,
  getProducts,
  deleteProduct,
  editProduct,
  getProductByName,
  getVariantBySize,
  addVariant,
  addBase,
  addBaseStock,
  copyImageToDatabase,
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

app.whenReady().then(() => {
  ipcMain.handle("db:addProduct", (_, product) => addProduct(product));
  ipcMain.handle("db:getProducts", () => getProducts());
  ipcMain.handle("db:deleteProduct", (_, id) => deleteProduct(id));
  ipcMain.handle("db:editProduct", (_, id, product) =>
    editProduct(id, product),
  );
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
  ipcMain.handle('db:copyImage', (_, sourcePath) => copyImageToDatabase(sourcePath));
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

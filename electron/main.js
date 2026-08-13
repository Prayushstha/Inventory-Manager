/* global process */
import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { ipcMain } from "electron";
import {
  addProduct,
  getProducts,
  deleteProduct,
  editProduct,
} from "../src/Backend/server.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
